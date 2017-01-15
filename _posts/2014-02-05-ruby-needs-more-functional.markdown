---
title: Ruby needs to get its functional on
category: technical
excerpt: First-class functions are the way forward, but Ruby is missing a few tricks.
---

Ruby, as a language, has managed to achieve a pretty good blend of both object-oriented and functional programming ideas. It’s Enumerable module, for example, makes a lot of common list-based manipulations trivial and reminds me strongly of Scheme’s (and presumably Smalltalk’s) analogous libraries. Ruby also makes heavy use of the idea of passing blocks or lambdas around – another idea borrowed from functional land.

One area where it’s a bit lacking, though, is first-class functions (the ability to refer to a function as an object, and pass them around as variables). Once you’ve used a language with proper first-class function support anything that doesn’t have them feels bloated and slow. Ruby _does_ support them, to a point, but the syntax for them is heavy, inconsistent and illogical – in short, it _sucks_. Having a terse and clear syntax for this is crucial.

Let me show you why having first-class functions makes things easier. Consider the following – I want all the even numbers between 1 and 1000 as symbols.

```
(1..1000).select {|i| i.even?}.map {|i| i.to_sym}
```

This line is cluttered with a lot of unnecessary stuff. I’ve had to sprinkle curly braces liberally and introduce two unnecessary local variables, which both make the code harder to read and understand. What I really need is to just give the function’s _name_ that I want to call and have Ruby automatically call it for each item. That way, I don’t have to write out the entire block when it’s just not necessary. This is how it works in Lispy-languages, like Scheme.

But, I can’t do that because I can’t write down my function’s name without calling it – using parentheses to call functions is optional in Ruby. You just write the function name and bam! You’ve called it. So because I can’t easily get a reference to the function, I have to write code to call the function manually in each block. Lame! Actually, in this particular case there is a way to pull this off in Ruby.

### The & operator

```
(1..100).select(&:even?).map(&:to_sym)
```

Great! We’ve made the code more readable and at the same time removed entirely unnecessary local variables. This works because the & operator calls `to_proc` on it’s argument, and for a symbol `to_proc` _just happens_ to be defined to create a Proc that calls the method of the same name on whatever object is passed to it.

This is a very convenient short-cut, but it’s obviously a **massive hack**. There’s no _logical_ or fundamental reason that trying to convert a symbol into a proc should yield something that has this behaviour. In fact, there’s no real reason that `to_proc` should even be defined for a symbol.

Calling a `to_*` function should return a representation of that object in the new datatype – i.e. calling `to_s` on a number returns a representation of that number as a string. But calling `to_proc` on a symbol doesn’t return a representation of that symbol as a proc, because there’s no such thing. The two aren’t related at all (not in Ruby, anyway). If you did want to define such a method the only logical approach would be to return a proc that `eval`s the symbol, but instead we return something else entirely. It’s all just there to facilitate this convenient notation. But really this is an abuse of notation – there should be proper syntax for this sort of thing.

### Making unbound methods first-class

To make matters worse, what are we meant to do if the function we want to use isn’t on the objects we’re mapping or filtering, but is defined somewhere else? Suppose I want to define a (terribly inefficient) method of finding all the prime numbers between 1 and 1000. This time, I have to use `method`.

```
def prime? number
  (2...number).none? {|i| i % number == 0}
end

(1..1000).select(&method(:prime?))
```

Ugh. All those parentheses flying around are less than pretty, having to write `method` doesn’t add anything to the clarity and the whole thing is just generally more difficult to read than it’s attribute-calling cousin. In fact, this isn’t any better than just writing out a block. Consider the same thing in Scheme.

```
(define (prime? number)
  (not (any? (lambda i (eql? (% i number) 0))
    (iota number 2)))

(filter prime? (iota 1000 1))
```

On that last line it’s far clearer what’s going on – there’s no extraneous stuff flying about. Ruby’s offering is so weak in comparison.

### What to do?

Die-hard Rubyists will probably say that Ruby is optimised for the most common case which is calling methods on functions. I agree that it does make a lot of code more readable through the lack of any parentheses or other punctuation, but that doesn’t preclude at least a simpler syntax for referring to functions. This is something that is genuinely incomplete if Ruby wishes to support proper functional programming, and really **it’s an issue that needs to be tackled at the language level**. That horrible `&:symbol` hack should be ripped out and replaced and we’re totally missing something that works for the other case.

For the latter, you could quite easily use `&methodname`, for example, and the only real conflict it would create would be in the case where you’re trying to pass a lambda returned from a function as a block to another function – not something I’ve seen much in any high-profile Ruby libraries. Or if that conflicts too much for your liking Ruby could choose a different symbol and support something like `~methodname`.

Until then, what is one to do? If you’re feeling this pain you might like to consider the [ampex](http://cirw.in/blog/ampex) gem. This cleverly use a `&X` notation to make methods first-class, and it even includes a quick syntax to map a Hash to a specific key which is a bit of a pain with plain Ruby. The syntax isn’t perfect but it’s the best you’re gonna get. Give it a try and feel the levity of first-class functions in Ruby!
