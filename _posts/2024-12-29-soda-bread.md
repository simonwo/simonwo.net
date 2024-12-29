---
title: My recipe for soda bread
category: stuff
excerpt: Not just delicious bread that cooks in a flash, also an exposé on Big Buttermilk!
image: "/content/bread.jpg"
recipe:
  ingredients:
    - 500g flour (ideally wholemeal, but any will do)
    - 2 tsp salt
    - 1 tsp bicarbonate of soda
    - 1 tbsp rosemary (optional, but highly recommended)
    - 400ml liquid (water is fine as above, but oat milk is preferred)
    - 30-40ml of food-grade acid (e.g. lemon juice or vinegar)
    - 2 tsp food-grade sugar (optional, e.g. honey, agave syrup, maple syrup)
  steps:
    - Pre-heat your fan oven to 180-190℃.
    - |
      Combine the above ingredients in a mixing bowl in the order specified. If you've got the amounts right, you should
      end up with a thick, sticky, moist mixture that would be difficult to work with your hands. You should be able to
      pour it out of your bowl with some cajoling, but it should retain some structure and not just be a liquid.
    - |
      Optionally, knead the mixture using the dough hook or dough blade attachment on your food processor or mixer.
      (You don't really knead to need it as long as the ingredients are well combined, but it does improve the texture
      of the final loaf.)
    - Grease a loaf tin with oil or butter, or better, line it with baking paper. Pour the mixture into the tin.
    - |
      Bake in the over for at least 45 minutes. If you didn't use baking paper, allow it to cool before trying to remove
      it from the tin, not just for the sake of your fingers, but also so that the loaf cools away from the sides and is
      easier to remove.
  prep: 5
  cook: 45
  basedOn: https://www.bbcgoodfood.com/recipes/simple-soda-bread
---

I started baking soda bread every day during the lockdown of the COVID-19
pandemic. Having fresh, warm bread was a small pleasure and also gave me
something to do (also, Celia is a big fan). Since then, I've baked this bread
regularly.

I'm recording this recipe here for myself and others, and also to share some
interesting notes on the chemistry of soda bread and why recipes for it always
(unnecessarily) call for buttermilk.

As with all online recipes, there are several paragraphs of boring preamble
before you get to the good stuff.

{% include image.liquid src=page.image alt="Soda bread I made" %}

## Why soda bread

Unlike sourdough which was also trendy af during lockdown and is objectively
more delicious, soda bread is very quick and simple to make. You can complete
the preparation steps for this recipe in only 5 minutes if you are well prepared
and rushing and can be eating lovely bread less than an hour later. You can use
a single bowl, spatula and tin, and there's no mess. It's easy.

(In fact, to prove it I once did a lunchtime lightning talk for a UK government
department where I made the bread on live video and then did a Blue Peter style
"here's one I made earlier" to finish).

But let me be clear – the bread this recipe produces is adequate at best. It
often has issues with an overly dense texture and the crust sometimes detaches
(I'm an amateur attempting to improve on those issues – your suggestions are
welcome). Other breads are better.

But for me the ability to whip up a fresh loaf quickly and easily justifies the
recipe – I really wouldn't be baking regularly if I had to go through all the
steps associated with sourdough. It's a success of the [80/20
rule](https://en.wikipedia.org/wiki/Pareto_principle) (80% of the quality in 20%
of the time) and I think it makes a great "daily bread". I would apologise for
it in front of guests but happily eat it myself.

## The scam of buttermilk

The original recipe for this bread comes from [Emma Freud of BBC Good Food](
{{ page.recipe.basedOn }}). Like most online recipes for soda bread, it tells you
to use buttermilk and offers you a back-up way to make it by combining lemon
juice and cow's milk.

If you make buttermilk by combining lemon juice and cow's milk, you'll see fatty
solids start to diffuse out of the milk and form lumps. It takes a few minutes.
Once I'd baked this loaf once, I had some questions about the buttermilk step
because I wanted to know if I get the same effect using the oat milk which I'd
normally drink, otherwise I'd have to buy cow milk especially.

If you look up the [chemical reaction that
occurs](https://en.wikipedia.org/w/index.php?title=Sodium_bicarbonate&oldid=1263890492#Cooking)
between the buttermilk and the bicarbonate of soda, you'll see that all that is
required is an acid base to provide hydrogen ions, which then produces the
carbon dioxide that forms bubbles in the dough as it cooks. So does that mean
you can skip the slow step to create buttermilk, and just put the lemon juice
and milk straight into the dough? And can you use other sources of acid, such as
vinegar?

In a word, yes. I experimented with using oat milk and lemon juice, and then
subsequently water and malt vingear, and skipping the buttermilk making step
completely. The bread rises just fine! You don't need buttermilk to get soda
bread to rise at all – just anything acidic. There are flavour implications,
but usefully it means you can cook soda bread even if you don't have enough or
any milk. This also means you can easily make soda bread completely vegan!

So why the obsession with buttermilk in all of these online recipes? Well,
imagine back to the days before refrigeration. Lemons and other food-grade acids
were simply not available. Buttermilk was a natural by-product of cheese-making
and milk fermentation, and readily had the acidic qualities needed for baking.
There also wasn't a lot else to do with it, other than drink it directly. So it
makes sense that "traditional" recipes for soda bread rely on buttermilk which
is what historically would have been readily available and appropriate. Those
traditional recipes have been passed down and evolved into without a lot of
thought into modern recipes.

But today, when we have other sources of acid, it's simply not necessary and
making it especially is a full waste of time.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "@id": {{ page.url | absolute_url | jsonify }},
  "name": {{ page.title | jsonify }},
  "description": {{ page.excerpt | jsonify }},
  "author": {
    "@type": "Person",
    "name": {{ site.author | jsonify }},
    "url": {{ site.url | absolute_url | jsonify }}
  },
  "url": {{ page.permalink | jsonify }},
  "image": {{ page.image | absolute_url | jsonify }},
  "recipeIngredient": [
    {% for ingredient in page.recipe.ingredients -%}
      {{ ingredient | jsonify }}
      {%- unless forloop.last %},{% endunless %}
    {% endfor %}
  ],
  "recipeInstructions": [
    {% for step in page.recipe.steps -%}
      {
        "@type": "HowToStep",
        "text": {{ step | jsonify }}
      }
      {%- unless forloop.last %},{% endunless %}
    {% endfor %}
  ],
  "prepTime": "PT{{ page.recipe.prep }}M",
  "cookTime": "PT{{ page.recipe.cook }}M"
}
</script>

## Ingredients

{% for ingredient in page.recipe.ingredients %}
* {{ ingredient }}
{% endfor %}

## Method

{% for step in page.recipe.steps %}
1. {{ step }}
{% endfor %}
