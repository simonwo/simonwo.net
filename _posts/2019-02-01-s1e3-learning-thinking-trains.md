---
title: "Weeknotes S1E3: A week of learning, thinking and trains"
category: weeknotes
excerpt: Talking to lots of cool data people in cool data places.
---

I’ve spent a lot of this week going up and down on trains, visiting and learning
from Defra people, and making heavy use of my Millenial’s Railcard. Here’s my
thoughts on what I found out!

## Defra: Making Data Findable
This week on Making Data Findable, we ran through all of the user stories we’ve
defined for alpha and marked off what we’ve still got left to achieve. Good news
— we’ve already done most of them by building on top of
[CKAN](https://ckan.org/)! But there’s still lots more we can do to highlight
the most helpful information in search results and increase the prominence of
data owners — testing of this to come. This flying start means that we’ll be
able to get the tool live sooner rather than later and start collecting feedback
from the wider group. We also finished deploying our alpha architecture for the
first time, and have learnt a lot along the way that’ll prepare us nicely for
going live.

I also visited the [Marine Management Organisation
(MMO)](https://twitter.com/The_MMO/) in Newcastle with [Beck, Lisa and
Pete](https://twitter.com/BeckStrickland/status/1090914214825332742). We met
their data team and told them a bit about the Data Strategy that’s coming soon,
and they showed us their own data portal. It was great! They’d built it
themselves on top of their existing Oracle database stack using the built-in
Oracle application platform. It can record some advanced metadata around data
lineage and trust that I’ve not seen before and was food for thought for me with
regard to what we’re doing centrally in the area. This sort of development is
great to see — people recognising their own user need, and then being able to
service it using the tools available. There’s some work to do here around
getting an automatic harvest of their portal into ours, and more widely around
how we can help them going forward.

## Defra: Authoritative data
This week I was also lucky enough to visit two great teams at the [Environment
Agency (EA)](https://twitter.com/dataenvagency) in Bristol with my colleague
Riz. It was nice to be in Bristol again — I’ve been there a bunch of times (once
to run the half marathon) and really like the city’s independent vibe.

The first team we spoke to manage a large data store of geospatial data and sit
in between internal and external data sources and a suite of downstream mapping
interfaces and other services. This gives them some unique challenges which
they’ve got impressive handling of — their maturity on how they handle their
data is really high! I took reams of notes on how they run things and it really
developed some thinking on what good communication looks like between publishers
and consumers. It’s also informed my thoughts on what roles are needed for good
data management — there are at least two distinct ownership roles that are
needed (one for the money and free rides, two for the domain knowledge, [all
rise](https://genius.com/4855334)) and they interact together and with other
parties at different times.

We also met Becky, the EA’s Data Standards Lead, and she told us about the
incredible work her and her team are doing around standardised lists. It’s
exactly the sort of thing that we’re trying to support across the organisation
and they’ve already making real change in EA. In my opinion they’re going about
it exactly the right way, working with domain experts to understand and build
consensus, and they’ve even documented the process they follow which I’m looking
forward to looking more at next week. Go data standards!

And aside from all *that*, I also chatted with Mark from the Data Access team and
he described the responsibilities his previous role had around managing
“thesauri” — or what I’d called a standardised vocabulary or categories. He laid
out the people involved and processes they followed — another useful case study.
😀

## Conclusion
This week has been mainly spent learning new things from people smarter than I
am, and that’s brilliant. This brain getting bigger feeling is something I
believe is really important in any role — when I stop growing, I’m not happy —
so it’s great to have gone big on that this week.

Outside of Defra work, we also found time to ship [our Register-powered
autocomplete maker on
Registers.app](https://twitter.com/RegDyn/status/1091369012964085760) — yay! I’m
looking forward to seeing more services powered by Registers soon.
