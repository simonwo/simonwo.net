module Jekyll
  module Beautify
    require 'htmlbeautifier'

    Jekyll::Hooks.register(:site, :post_write) do |site|
      site.each_site_file do |page|
        next unless page.destination(site.dest).end_with? '.html'

        File.open(page.destination(site.dest), 'w') do |file|
          file.write(HtmlBeautifier.beautify(page.output))
        end
      end
    end

  end
end      
