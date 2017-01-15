---
title: Clearer types using alias templates in C++
category: code
excerpt: How we can make C++ more human-friendly.
---

Today I stumbled upon _alias templates_, a [C++11 feature](http://en.cppreference.com/w/cpp/language/type_alias) which essentially allows you to template a `typedef`. You can use this to do something really cool:

```
template <typename T>
using ptr = T*;
```

Now we can write:

```
ptr<const char> text = "Hello, World!";
```

That `ptr<const char>` is not a special type or something that behaves like a pointer, it _is_ just a classic raw pointer. We're just referring to it by a different syntax that looks more like a template. There is an extended example [here](https://gist.github.com/simonwo/f1be28ebcbf7a8787f19).

Now before you stop the music and call security to chuck me out, let me explain the pros of writing code like this. None of these reasons are technical differences, because `ptr<const char>` is not technically different from `const char *` – they're all about code _style_ and how we read and understand computer programs.

1.  Pointers are different types

    This syntax reinforces the point that a pointer is a completely different type from the thing that it is pointing at.

    How is a `double` related to a `double*`? They most probably aren't related at all – one represents a floating-point number and the other represents an address in memory. The concept and memory requirements are fundamentally different, but the syntax makes these things look very similar to each other. The fact that a pointer has to point at a specific type is almost irrelevant to everybody except the type checker.

    Now compare a `double` to a `vector<double>` – it's immediately clear that these two things are very different. I posit that pointers are as different from the types they point to as vectors are from the types they contain, and they should be treated as such. `ptr<T>` reinforces that distinction.

    Chuck also into the mix that sometimes people like to make the `*` part of the name instead:

    ```
    const string *string1;
    const string* string2;
    ptr<const string> string3;
    // Three variables of the same type
    ```

    C++ like most languages uses whitespace to separate tokens, but for whatever reason the * or & on the type can float over the name instead. This sucks because your brain uses the whitespace to split up the code – at first glance it sees the `const`, it sees the `string` and then it sees a third token which must be the name. You have to actually work harder to recognise that the * is not part of the name but part of the type. Using `ptr<const string>` removes this ambiguity, as it's immediately clear what is the type and what is the identifier.

2.  Consistency with smart pointer classes

    When you want to use any of the standard library smart pointer types, a template instantiation is involved to give a pointer of the correct type. This alias makes raw pointers look and feel more like their smart counterparts:

    ```
    shared_ptr<int> a;
    unique_ptr<int> b;
    ptr<int> c;
    // int* d;
    ```

    This makes C++ more consistent as a language and creates harmony between all these things which we understand as “pointers”. Does `int*` encapsulate the same concept as `shared_ptr<int>`? They don't _look_ the same – why should they do the same thing? Your brain notices the difference. That smart pointers act the same way as “this funny-looking thing with a star” is one less fact that a developer's brain need understand – it's clear from the symmetry of the syntax that these all represent the same concept.

    It's also more consistent with the way we think about some other standard types. A `vector<int>` is a “thing that contains ints”, a `static_cast<int>` is a “thing that casts to an int” and so, naturally, `ptr<int>` is a “thing that points to an int”, which is exactly how many people verbalise `int*` in the first place.

3.  Less confusion with additional uses of & and *

    I can count at least three different uses for `*` and a whopping six different uses for `&` in C++. That's a lot of different context-switching that we have to do to understand something – essentially, your brain has to act like a parser to read the code. But the point is, you _shouldn't_ have to work that hard. Using `ptr<T>` is one less meaning that we have to consider when looking at a `*`. Anything which makes code clearer and easier to understand is a good thing.

4.  100% compatibility with existing code

    This isn't a new type, just a different way of writing the old type, so you can use the new syntax and existing code doesn't have to change.

Right now you may be thinking, “Yes, but I've been programming C++ for _N_ years! I am perfectly comfortable with `int*`. It is as clear to me as anything could be.” Fair enough, but how about it's not all about you, gramps? There are always going to be new C++ programmers, and pointers and references are one of the main sources of confusion for people approaching C++ from other languages. C++ is already naturally optimised for ease of use by experts as opposed to ease of learning, so anything one can do to make the language easier to understand for these people is a good thing.

So next time you approach a C++ project, new or existing, consider making these declarations and see if they make a difference for you. Hopefully, you'll find that what was once horribly complex (let's face it, most C++ is like this) is now easier to understand, decode and improve – fundamentally, more suitable for use by real humans.
