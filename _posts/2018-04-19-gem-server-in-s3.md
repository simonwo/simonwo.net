---
title: Running a static Gem server from an S3 bucket
category: code
excerpt: Deploy and consume Ruby development artifacts on a shoestring.
---
So, you're developing in Ruby. Like a good citizen you're using a CI tool to build and test your gem for every push. You want access to the build artefacts, maybe to use in a downstream project or just for inter-release use, but you don't want to push every build to Rubygems or Github Releases. After all, you still want to run the build for development commits – but not every commit you build is necessarily something you want to release. Where do you put the build artefacts so that they're accessible?

This was the position I found myself in developing [aquae-ruby](https://github.com/alphagov/aquae-ruby), a Ruby implementation of the [AQuAE specification](https://github.com/alphagov/aquae-specification) for personal data exchange in the UK Government. I wanted to use the library gem in downstream Ruby-based applications and needed to have access to the build artefacts of my development commits.

We had a simple [Travis](https://travis-ci.org) build and I didn't want to waste my energy setting up special CI or servers just to serve some gems. The solution that I ended up with was serving gems from an Amazon S3 bucket that walked and talked like a gem server. Pretty convenient, because there's no server to run or manage and you still get the familiar `gem install` and Gemfile behaviours you'd expect. This post is about how it works.

## S3 buckets

Amazon S3 is, in essence, a key-value store. In this case, we use S3 as a file store by using files as the values and filenames as the keys. Any filenames that contain a slash are presented as being in folders. S3 will serve our bucket from a specific URL, and we can access the files by appending the filename to this base URL.

When you run `gem install`, Rubygems examines the relevant gem sources (normally [RubyGems.org](https://rubygems.org) if you didn't specify anywhere else) and downloads an _index_ from a known location which describes all the available gems and their versions. By putting an index on S3 in the right place, we can get the usual behaviour from `gem` and use the S3 bucket as a source in our Gemfiles.

We don't need to set up anything more than a normal S3 bucket to serve our gems from, and there aren't any special requirements other than that the bucket is public. I won't go into the details of setting up an S3 bucket here because there are plenty of good guides out there if it's your first rodeo. Use your [favourite search engine](https://ddg.gg).

## Generating the Gem index

We need three indicies to be available in the root directory of our bucket: one for all gem versions, one for just the latest gem versions and a separate one for pre-release gems. We also need all the gems to be available in `./gems` and quickly-parsable versions of the gemspecs to be in `./quick` to allow resolution of dependencies. These will have to be regenerated whenever we push a new gem version.

Thankfully, it's easy to create these files by calling `gem generate_index`. This will look at all the gems in the `./gems` folder and write out index files for them. However, index generation needs to be run over _all_ the gem versions that are in the gemserver. This means we need to have access to all the previous gem versions too. So we first download all the previous gems from S3 and then run `gem generate_index` over the entire contents.

For convenience, I chose to update the index at the end of the Travis job. First I run a Rake task to download all the gems in S3, then another task to generate the gem index, and then use Travis's built-in deployment feature to upload the entire gem repository back to S3.

    REPO_DIR = './repo'
    GEM_DIR  = File.join REPO_DIR, './gems'
    directory REPO_DIR
    directory GEM_DIR => REPO_DIR

    desc 'Downloads existing artifacts from S3'
    task :gems => GEM_DIR do
      require 'aws-sdk-s3'
      creds = Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY'])
      bucket = Aws::S3::Resource.new(region: 'eu-west-2', credentials: creds).bucket('aquae-ruby')
      bucket.objects(delimiter: '/', prefix: 'gems/').reject {|f| f.key == 'gems/' }.each do |gem|
        outfile = File.join REPO_DIR, gem.key
        rake_output_message "cp s3://aquae-ruby/#{gem.key} #{outfile}"
        File.open(outfile, 'wb') do |out|
          gem.get &out.method(:write)
        end
      end
    end

    desc 'Generates Gem indexes for a static Gemserver'
    task :repo => REPO_DIR do
      sh "cd #{REPO_DIR} && gem generate_index ."
    end

You will notice that this requires specifying some environment variable for the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, which we need to do in the Travis configuration.

## Deploying to S3

Now that we've built our gem repository, we need to put it on S3. We can get Travis to upload the entire directory we specify to the S3 bucket of our choice using a `deploy` section.

So, to those environment variables. The `AWS_ACCESS_KEY_ID` can be stored in plaintext but the `AWS_SECRET_ACCESS_KEY` needs to be encrypted. You can do that using the [`travis` command line tool](https://github.com/travis-ci/travis.rb#encrypt), which will encrypt the value so that only Travis can read it. Due to the manual S3 download, you'll need to add it in two places: first in the `env.global` section so that it's picked up by the Rake tasks, and then also in the `deploy` section that will upload to S3.

An example `.travis.yml` is shown below.

    ---
    env:
      global:
        - AWS_ACCESS_KEY_ID=AKIAIWRSDO533NY4GO6A
        - secure: vcR4EXQSgPK8VSFHuJajSVzhEhUyiwr7KUfVdTlkZc5BLXl+S18QMwWqQhurjoT5tVM5GDkgPr/sLjeR8ZCmdio318eTo90/KeZzK+Gok0X45YcKqu6Tr9GFpHQMi7BH7fK4u4G/0z49ek/l4NUUIAxZTO/5sZ00wcLxXAY0M1A/PMYRqgJAN7QzltCCCRuIyhiAPtGGYV1ErUo8dxOzBepPa8RVLz96OWyfPwPiMg+Y11qjR+vnMzW5owVcxkZV2MIJTPfmmNiDMx7nsLncMSClPWsCVssg1a3SKa05bWutoUPMBvCmiDw1R7T0SdhhvrswAnzB6HlVCWa7UqWR2DZokqphVE2OJ+WjNstgLrcDaYR19IVHQ9hxbwFsG09/+qpLnI1pAtUaK16reb9YeqC8ii/094Nih5WH6lhMaIUdVhvVXQTl0A3WdX9lMwNzma7BEgFZD3Hf9KyRv2Qg3ijtlrbMBBlrtMT9Iyff4CyOjD530d+hs6KMXCp8kbS0uc1PtpRSEGw9hfCO1/T35Y81RtF1Qmpat9xrEqksBgJrcvrue1wSRKR51mM5WljMLefMQ6gozI/1LtPrSUXdXytr6vuN+zhugIB/kRrclF7IInUsd6mVmtBNcI4nPTkYGNCmyNUFn5AJpixWlZ1u8j2oJoMugmvfyO4GQ0R+++Q=

    script: bundle exec rake  # Or whatever steps are required to build your gem

    before_deploy:  # Doing this here means we'll only generate if we're about to deploy, so not if the build fails.
    - rake gems
    - cp ./pkg/*.gem ./repo/gems  # Make sure the gem you just built is in the repo!
    - rake repo

    deploy:
    - provider: s3
      region: eu-west-2
      bucket: aquae-ruby
      access_key_id: AKIAIWRSDO533NY4GO6A
      secret_access_key:
        secure: 3MYjEwP7A2X5hsGuzYetHm2QikC5UBmp06IVxWRnAyjwwXfjZhezhloOjYl14aGbHTcY3YQn0g8p3ZRzO1q4R4wmCRgh+OZKfaQ3L+cbguuU71BOcrZ4ufHVcBl0qewxkcs4HXzYIuSMgALQ5Uov6Ym6hMbLv7imWUUI2usQajlYd4MG520bVUN7UuHSo7Fx3+zC5lIoR1lW7jYuMnLO+URQFFCMDQHjafIfpzUxSbw/BB1jg7FavQRz/op83jLp/x5A+RvTqW6WzYLXXdG9DHqcGWKDYe3rJW8C3AT4eeeJlT4M9btOgDs8mnfWaZCdQsvSwUgQDqaRrqDWteMmjQRo+zsauud3SwqxV7b0Ao+pXyWLHfQv6HVA7LrHCiPqZk7soYFrHcNKx5vAy7myv2Mus3ZSusuoXZC0FU6bVWcTPBjP4F0pb42x581k7+YlYfnzXNdeBJeaBI4NtvvJ93UZS3/pLgVEFdjCKb+M/EvVQIDHoPxn4G/oQkDIjGv4lNVucb9Eeb0pVFc2PSnBbu3e3tSnYy9pdHP2jEx5xFXPyE1mTF7fXRB3by4r2/KwqMmJ/z1X1PPEf8spHkYJYKdxGp6SOYmbglLW3fhswr4/+Oi0HLrVJGE2BnW660HseWAyutazuuDTDpvUVAvj9RjfUfCvQdtP7NLFdJPoioI=
      acl: public_read  # Make sure your new gems are readable
      local_dir: "./repo"  # Upload the whole gem repo
      skip_cleanup: true  # Otherwise the gems and new index will be deleted...
      on:
        all_branches: true  # Build for development branches too

You might say that all this uploading and downloading is inefficient, and certainly the way S3 pricing works it will cost money this way. You could do the upload manually with another Rake task and only send the new gem version and updated index. Or another way to do this would be to trigger an AWS Lambda job that runs the index refresh whenever a new gem is pushed. This is left as an exercise for the reader.

## Using the gems

Once you've pushed a few gems to S3, you can use the bucket like any other gem source. In a Gemfile you can specify the base URL of the bucket with a command like `source 'https://aquae-ruby.s3.amazonaws.com'` and this will make gems available to the Gemfile or the gemspec without further qualification.

The final note is on versioning. Because we want gems for every commit to be available, we have to version our gems uniquely for each commit otherwise the most recent build will overwrite previous builds. I did this by querying Git from within the gemspec for the hash of the current commit, and appending that if there was no version tag pointing at the commit. Note that commit hashes are not ordered, so you should specify pre-release versions exactly in downstream projects.

    # Count the number of commits between us and the last release.
    # Use this to give the Gem package a unique build number.
    # Make sure we're in the right working-dir before doing this,
    # so the specification is accurate when loaded in other projects.
    version_tag = /v\d\.\d+/
    head    = `git -C "#{File.dirname __FILE__}" rev-parse HEAD`.chomp
    release = `git -C "#{File.dirname __FILE__}" tag --points-at HEAD`.split("\n").any? do |tag|
      tag =~ version_tag
    end

    # Still use Aquae::VERSION as the base version, and then add
    # the commit short hash as a patch.
    spec.version = "#{Aquae::VERSION}#{release ? '' : ".pre.#{head[0..8]}"}"

With all of this in place, you'll get a gem for every commit available for install by specifying your bucket URL as the gem source. Neato!