---
title: "Weeknotes S2E2: Beyond showing the thing"
category: weeknotes
image: /content/looking-up-the-whitechapel-building-atrium.jpg
excerpt: When people say it's important to "show the thing", what thing are we talking about? Thoughts on linked data, fixing the plumbing and Personal Data Exchange.
---
I’ve had a great few weeks since the [last #weeknotes]({% assign last = site.posts | where: "slug", "s2e1-datas-gonna-date" | first %}{{ last.url }}). I’ve been building interesting product features and having conversations with great people. Thoughts also have been nucleating around a recurrent problem – read on and see if you can spot it.

![Looking up the White Chapel Building atirum](/content/looking-up-the-whitechapel-building-atrium.jpg)

## Linked data and user needs

I had a great unhurried chat with [Brigette Metzler](https://twitter.com/BrigetteMetzler). One conversation that stood out to me was our discussion of linked data. We both agreed that making linked data accessible to a broad audience is a struggle.

I’ve long held the view that people talk about linked data in a way that focuses too much on the detail and the mechanism. As I’ve had cause to be reminded several times this week, the tech isn’t the important thing. What users really want to know is [what new superpowers they can get](https://www.ben-evans.com/benedictevans/2017/5/24/not-even-wrong-ways-to-dismiss-technology).

Failing to articulate the new superpower is the ditch many new technologies die in (I’m looking at you, [Personal Data Stores](https://medium.com/@shevski/are-personal-data-stores-about-to-become-the-next-big-thing-b767295ed842)). I think we need to radically change the way we talk about linked data technologies so the value is clear. We should be talking about what the user needs are and why linked data is the right shape to meet them.

## Fixing the plumbing

I’m reminded often about the need for more and better data infrastructure in Government. The last IfG Data Bites featured [a fantastic talk by Adam Locker](https://www.youtube.com/watch?v=m9a-uYJIjbY&list=PLIrQVU7dFIUXNu6OmSO4EGTjGHopePBHH&index=16&t=0s) where he presented a selection of key principles we need to start applying to Government. It’s a great summary and if you’ve not seen it I seriously suggest you go and watch – it’s only 8 minutes! Also take a look at [Ben Coleman's talk](https://www.youtube.com/watch?v=dq3VrAzfI0g&list=PLIrQVU7dFIUXNu6OmSO4EGTjGHopePBHH&index=28&t=0s) for a great real-world example of the problems.

What occured to me from Data Bites was that to some extent we already know how to solve these problems. The technology exists and we know how to apply it. But as I mentioned before, the hard problem is not the how. It’s actually showing more people what the problems are, what causes them, and why they are worth solving.

The question, then, is which people do we need to show and what do we need to show them?

## A blog series to help understand custodians

With this sort of problem in mind, we launched a new series of blog posts focusing on dataset custodians (particularly Registers). Our first interview is with [Mark Coram from MHCLG](https://registers.blog/custodian-spotlight-mark-coram) who manages the [Local Authority](https://registers.app/browse/ministry-of-housing-communities-and-local-government/local-authority-eng) and [Local Authority Type](https://registers.app/browse/ministry-of-housing-communities-and-local-government/local-authority-type) Registers.

We’ve found that almost every dataset has quirks which give custodians interesting problems. In Mark’s case, publishing changes to his Register too early causes citizens to start making Freedom of Information requests to local authorities that don’t exist yet! Soon after, the Information Commissioner gets very grumpy that FOIs aren’t responded to on time.

Call me a geek if you like but I honestly find this sort of unintended consequence totally fascinating! They say no process lasts long when in contact with the real world and this is why. Second- or third-order effects are hard to foresee and it takes some serious insight to design for them up front.

So we’re going to keep publishing spotlights and I’m looking forward to seeing what quirks of data maintenance crop up. If you’re a custodian (or know one) who has some interesting stories to tell about their data, please [get in touch](mailto:simon@register-dynamics.co.uk)!

## Reflecting on Personal Data Exchange

![An early whiteboard session from Personal Data Exchange.](/content/early-personal-data-exchange-whiteboard.jpg)

I’ve also been talking quite a lot about [Personal Data Exchange](https://alphagov.github.io/paused/projects/attributes.html) recently. It’s come up in lots of contexts as a great example: of rapid prototyping, of the difficulties with building infrastructure in a Government delivery environment and of a team I enjoyed working with.

I was also asked by GDS to come and talk to a team looking into the work. This is the third time a GDS team has made use of our research and prototypes (fifth if you include other departments too). We must have been doing something right! David Durant also [suggested](https://twitter.com/cholten99/status/1182810926048862208) that the new CDIO should be taking an interest – when we find out who that person is, I’ll do my best to get in touch!

Upon reflection, I’m still attached to the technical and operational ideas at the heart of PDE. I’ve not seen anything that has progressed beyond the ideas there so I still believe it’s cutting-edge. (Of course, if you think I’ve missed something great, let me know!) Chalk up another example of a good technical solution being let down.

## If you build it, no-one will come

Hopefully by now the consistent theme that emerged when I reflected on these conversations is also clear to you: tech is only so useful as our ability to sell it. Even technology that is free and open-source still needs a "sale" – you need to convince people it's worth their time. Boiling the technology down so that the value to people is clear and obvious is a crucial task. I’d be lying if I claimed I was good at it!

So I’ve decided to try and improve. I’ve got some books that focus on this sort of thing – it’s time to pick them up. Role-playing as an explainer or salesman to somebody else has also been suggested to me. If you’ve got a tech concept that you don’t see the point of, let me know and I can try and sell you it’s value!

I'm looking forward to getting better at this in the coming weeks. Look out for more [#weeknotes](https://weeknot.es) on this topic hopefully soon. Laters.