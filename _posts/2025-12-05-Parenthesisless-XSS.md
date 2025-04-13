---
layout: post
title: "Parenthesisless XSS"
categories: posts
description: Post explaining cool payloads that require some knowldedge of JS
date: 2025-04-12 
en: true
authors: 
    - kappa
---

## TL;DR

Sometimes I'm knee-deep in the hunt for a great XSS payload - one that works against different WAFs. Then, after some research, I stumble upon one ridicolous one-liner that looks written by the JavaScript creator and has 0 sense at first sight.
Of course it's not black magic. It's just the work of a ridiculously smart security researcher who understand JavaScript .

That’s why I’m writing this blog — to dissect these stupidly brilliant payloads, wrap my head around the JS behind them, and maybe (just maybe) level up from "script kiddie" to "kinda gets it". I also feel like if I document them now, future me might actually remember how they work instead of ctrl+c ctrl+v them against an input bar xd.

<img src="{{ 'assets/img/commons/Parenthesisless-XSS/catmeme.png' | relative_url }}" alt="Resumen del soporte" class="center-image" style="width: 400px; height: 400px;display: block;
  margin: 0 auto;" />

Special mention to the book JavaScript for hackers - it is the main reason I'm writting this blog, it is an amazing resource but I feel that I don't even know the basics to get to fully understand the book. 

### valueOf=alert;window+1

#### JavaScript concepts

First we have to understand what is a primitive, an object, a context and some basic things in Javascript.

> Context

It is the "this" value inside a function or an object. It determines to which object belongs the function that is currently executing.

> Object

Object is a data type that is used to store various keyed collections and methods associated.
```javascript
const exampleobject = {
    name : "kappa",
    repo : "ya",
    yapping(){ console.log("professional yapper"); }
}
```

Almost every object in js is an instance of Object. So to clarify, the philosophy of js is that every object is an instance of another.
![Resumen del soporte]({{ 'assets/img/commons/Parenthesisless-XSS/prototype.png' | relative_url }}){: .center-image }

> Primitives in JS

Basic and fundamental values that are not an object and have no methods or properties. Nevertheless js have different ways for accessing some methods via autoboxing.
Types of primitives: `string, number, boolean, null, undefined, symbol, biging`
Primitives have the following properties:
1. Inmutable - They can't be modified after their creation
2. They compare by value
3. They are **NOT** objects - They don't have methods or attributes/properties, but js converts the primitives to objects for allowing methods like *toUpperCase()*

> Autoboxing

js temporarily wraps a primitive value in an object so you can access properties or methods that belong to its corresponding object type. 
**Example**
```js
const name = "kappa";
console.log(name.toUpperCase()); 
```
1. Javascript sees that name is a primitive string (inmutable)
2. Creates temporal String object wrapper around name
3. .toUpperCase() method is called on the String Object
4. The result is returned

> Operations in javascript

JavaScript converts an object to a primitive value in 3 main situations:
- Mathematical operations like `+ - * /  > <`
- String concatenation
- Contexts that expect a primitive (alert(obj), String(obj), Number(obj))

How does js perform this conversion of an object into a primitive?

`valueOf()` - converts an object into a primitive value. It defines the function that is called when performing this conversion.

So it invokes the method **valueOf()** over the object, expecting a primitive.
- It returns a primitive -> js uses the primitive to perform the operation
- It doesn't return a primitive -> attemps to call the method **toString()** to see if it returns a primitive

#### Final explanation

This payload ``valueOf=alert; window+1`` is a brilliant example of how understanding JavaScript's core mechanics like primitive conversion, object contexts, and method overriding can lead to clever (and sometimes unexpected) exploits. To summarize the process is the following:

Javascript automatically calls `valueOf()` or `toString()` when an object is used in a context of a primitive (like `+` operations). So the first step is to override `window.valueOf` with the function that we want to call. In this case we use the window context the function `alert` needs to be called in a context (this) of a window.

#### Personal improvements

When understanding this payload I faced the problem of passing arguments to the function in order to have real impact on the application (as Gareth Heyes did). I started researching about how I possibly could pass arguments to a function without `()` - Initially I tried to modify the arguments inside the function with the `call` function or accessing the `arguments[0]` property. However arguments is only accessible inside the creation of the function and the call function led me to a strange payload that did the same as the one that I ended up getting.

> call

Call is a property of every function that allows you to call it and change the context (this value) and subsequent arguments. So my approach was to leverage this function to change the arguments, but it is impossible without ()

```javascript
valueOf=alert;valueOf['call'](window,1337) // Cool one without . - but not without () that is the objective
valueOf=alert;valueOf.call(window,1337) // Uses ()
```


It seems so cool! But is totally useless to be honest xD. Even if I could use backticks as tagged templates and could change the arguments it would lead to the same result as doing simply:
```javascript
valueOf=alert`1337`;window+1
```
So this is my small contribution, it is not a new attack vector and it's not any innovative research, but I'm looking forward to find new way to call JavaScript without parenthesis. I know it is a vast sea and a very hard topic but writting this post scratched that part of my mind and motivated me to research a little bit more.