---
title: "Weeknotes S1E1: A week (and a bit) of Defra, data, and CSV on the Web"
category: weeknotes
image: /content/standards-workshop.jpeg
excerpt: |
    Starting a new role as a Technical Architect at Defra and
    chatting metadata and data standards with smart people across Government.
---

I’m already breaking the first rule of weeknotes because my note isn’t even
about a single week. I started at Defra on Wednesday 12th and so I’m starting my
week notes there too, and taking in a week and a half. Brace yourself for
similarly rebellious acts of bureaucracy to come.

## Wednesday 12th
Day 1 of my new role as a Technical Architect with
[@DefraData](https://twitter.com/DefraData).

They gave me a tiny ThinkPad. GDS lulled me into a false sense of security about
getting work stuff on your personal devices, and it’s been a culture shock only
being able to get org-issued email on org-issued hardware. Already a fistful of
times where I’ve needed my calendar on my iPhone. Apparently this is not
possible “due to security”, to which I can only say, what is this security and
how do I get rid of it? But that’s the last time I’ll rant about
“bring-your-own”, honest.

Today was spent mainly understanding Defra’s data transformation programme – the
new data strategy, all the projects in motion, and all the prototypes that’ve
been built so far. There was also the first team-wide update which served as a
great intro too. There are some great discovery projects happening looking at
how we can use emerging technologies like machine learning to actually improve
Defra’s services. It’s great to be able to input to all these and watch them
evolve.

## Thursday 13th
Today I was back at [GDS](https://twitter.com/gdsteam) – not because I couldn’t
take the heart-wrenching separation, but for a [cross-gov
workshop](https://www.eventbrite.co.uk/e/gov-csv-on-the-web-a-cross-government-group-discussion-tickets-53143324113)
about CSV on the Web and [Registers](https://www.registers.service.gov.uk/).
[Arnau](https://twitter.com/arnau_siches),
[Sunitha](https://twitter.com/ChackoSunitha),
[Andy](https://twitter.com/databasescaling), [David
Read](https://twitter.com/ReadDavid), myself and some lovely people from other
departments discussed problems with existing data publishing and where it was
appropriate for Registers or CSV on the Web to be used. This is going to be
worked into some GDS-issued guidance in the new year.

From what we discussed, I’m not sold on CSV on the Web. The stated advantage is
that one can add metadata to the CSV to describe things like column types or
prose about context. Both of these are things that are desperately needed in a
published dataset.

People like CSV because it’s a lowest common denominator – it’s vaguely
machine-readable but can also be edited in Excel, and that’s what everyone uses.
But the metadata is usually packaged as a supplementary file, which not only
can’t be edited in Excel but isn’t even visible – so to Excel users of the CSV
the metadata might as well not exist. You can wave a hand and say “it just needs
better tooling”, but if you’re going to force a new tool on people why pick CSV
at all, with all its warts? There’s much more in here worthy of a separate blog
post. And if you can recommend human-friendly tooling for CSV on the Web, get in
touch.

## Friday 14th
DCMS hosted a workshop today on Data Quality, bringing together
[Firoze](https://twitter.com/firoze_salim), Sue Bateman and colleagues from
[DCMS](https://twitter.com/DCMS), ONS and BEIS, and me and Lisa from Defra. We
all put up our perspectives on data quality – problems we’ve seen, what an
effective measure might look like, and what can be done to improve. It was very
refreshing to be talking about data and humans again. There’s some exciting
things planned for this working group, including getting more departments
involved – keen to see where it goes.

![Post-it notes on a whiteboard, somewhere in 100 Parliament
Street](/content/standards-workshop.jpeg)

## Monday 17th
Another meeting with fabulous DCMS today on metadata catalogues. We discussed
plans for a cross-gov catalogue of metadata from both public and private
datasets. It’s an ambitious project, especially considering that many
departments don’t have their own catalogues even nearly complete yet, but it was
reassuring to see people taking a federated approach to match the structure of
government. Because a complex system that works invariably evolves out of a
simple system that works, I’m happy to help them with their alpha by feeding
back how our efforts at Defra to produce the same type of catalogue internally
are going.

## Tuesday 18th
Highlight today was working out what happens next with Making Data Findable – a
Defra project to discover and make visible all of the datasets being used and
published around Defra and it’s 33 independent bodies. It’s a really important
strategic piece because once we can see the data we can look at what common
problems exist. That’s key for all the. discovery projects looking at quality,
management, and duplication. So we’re continuing development – focusing on
harvesting as much data as possible from across Defra to start analysing.


## Wednesday 19th
Reference data was the topic for today – I spent most of it discussing our
discovery project in this area with Andy and Riz. At the moment, Defra has no
central reference data service, so each independent body (and even each team)
collects and manages the reference data it needs to operate. This is no bad
thing! The data sits close to the people with domain knowledge and they have
full control to update and change it as necessary. But we also think it means
that reference data is hard to share and communicate around, and there might be
multiple copies of the same data across Defra.

So we’re launching a discovery to find out what reference data is out there, how
it’s managed and how it’s shared. We’re aiming to do this quickly, within 8
weeks, so that we can crack on with fixing whatever problems we find in an alpha
project.

## Thursday 20th
Today was a day off – but I did find time to go through our backlog for Making
Data Findable with Lisa, Ben, Nick and Lizel. There’s lots to do! It’s hammered
home to me how much we still need to learn about our users – both those who
publish and those who consume. So I’m hoping we can run some more user research
in the new year in tandem with developing all the technical features we need.

## And beyond
The theme of this week was “blasted Christmas, why does it have to get in the
way of all this work?” But fret not! I’m grinching it up by planning to do some
things over Christmas, so I’ll report back in the next weeknotes about how much
I actually got done, and also how my first Christmas as a vegetarian went down!
🎅
