---
title: Abstraction leak
aliases:
  - Leaky abstraction
description: "When the details an abstraction was meant to hide break through its surface."
tags: [programming, interfaces]
---

An abstraction leaks when details it was meant to hide break through its surface: the network timeout behind a "simple" file read, the spinning wheel behind a word processor. Joel Spolsky's "law of leaky abstractions" [-@spolsky2002law] says every non-trivial abstraction does this to some degree. A leak is the programmer's version of Heidegger's broken hammer: the tool suddenly becomes an object.

## Discussed in

- [[heidegger|Heidegger and Software]]
