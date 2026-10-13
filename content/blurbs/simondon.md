---
title: What Might Simondon Think About Software And Programming?
date: 2025-02-01
---

In the early 1900s, starting a car took skill and a little courage. The driver set the choke and adjusted the spark timing by hand, walked around to the front of the car, and heaved on a crank; if the engine fired at the wrong moment, the crank could kick back hard enough to break a wrist. In 1912 Cadillac introduced Charles Kettering's electric starter, and the crank gave way to a switch, and later to a key turned in the ignition. Today many cars start with a single button that hides a whole sequence of events: the car confirms that the key fob is inside, exchanges a coded handshake with it to unlock the immobiliser, checks that your foot is on the brake, primes the fuel pump, and only then turns the engine over. At every step the driver has needed to know less about engines, and more people have been able to drive.

## Simondon on opacity and ubiquity of technology

Gilbert Simondon observed [-@simondon2017mode] that technologies tend to become more socially integrated as they grow *less* internally intelligible to their users. As devices evolve, their functions fold into self-regulating, interdependent systems that no longer require interpretive knowledge to operate. This process, that Simondon calls *[[concretization]]*, produces machines that work reliably and autonomously while concealing their inner logic. Opacity, rather than hindering adoption, is what allows technologies to become ubiquitous; they turn ordinary once they stop being complicated objects of inquiry and start working quietly in the background. Heidegger [proposed similar interpretations](heidegger) of technology use.

## Applying the idea to programming

Though Simondon was writing about machines rather than code, a similar pattern appears in programming, where abstraction separates interface from implementation. As code becomes more complex and layered, users of a programming abstraction, whether a function, module, or API, need only understand how to interact with its surface, not its internal machinery. Integration and encapsulation make a system more capable and, at the same time, more opaque! The most widely used software tools, from operating systems to machine-learning libraries, thrive on this asymmetry: they are trusted for their results rather than their mechanisms. In both technics and code, ubiquity grows in step with invisibility, as abstraction becomes the price and the precondition of shared collective use.

## A tension with explainable AI

This dynamic sets up an obvious tension in the age of LLM-generated code, text, and images. The same forces that drive the spread of AI (automation, integration, and ease of use) also make its inner workings opaque to most users. Large models become ubiquitous precisely because they function like Simondon’s concretized machines: reliable, efficient, and inscrutable. Yet the push for explainable AI demands the opposite: transparency, interpretability, and human understanding. The challenge is that the qualities that make AI widely usable are the very ones that create barriers to explanation.

## An observation on terminology

Interestingly, there seems to be a conflict of terminology. Simondon names *concretization* as the process whereby machines and other technologies become more opaque, and thereby more reliable, while increasing in simplicity of use. Meanwhile, most computer scientists would refer to the analogous process in programming as *abstraction*, while concretization is the *opposite* of abstraction. 

--- 

### Related 

- [Heidegger and software](heidegger)
