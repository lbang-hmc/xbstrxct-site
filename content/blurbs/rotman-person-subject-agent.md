---
title: "Person, Subject, Agent: Rotman's Semiotics and Programming"
date: 2026-10-17
description: "Brian Rotman's three semiotic positions in mathematics (Person, Subject, Agent) map onto the programmer, the computational model and the machine."
tags: [philosophy, semiotics, mathematics, programming, ethics]
---

## What Semiotics Offers

Semiotics is the study of signs and symbols: how they are constructed, interpreted, and used to convey meaning [@peirce1931collected; @saussure1983course]. Originating in the work of Charles Sanders Peirce and Ferdinand de Saussure, semiotics offers a powerful lens through which to understand programming as a symbolic practice [@tanakaishii2010semiotics]. In software development, programmers do not manipulate reality directly; they manipulate signs that represent data, behaviors, and possibly other symbolic abstracted concepts. As Peirce noted, reasoning about symbols often involves constructing "a sort of skeleton diagram, or outline sketch," which we then examine to see what holds across cases [@peirce1931collected]. Programming is exactly such a symbolic activity: we create abstract representations, imagine their behavior, and reason about them as stand-ins for real or possible systems.

Semiotic theory is especially relevant to discussions of [[abstraction]], because abstraction involves the transformation into a higher-level symbolic form. When software abstractions are mistaken for the reality they model, or worse, when they displace that reality, we risk losing sight of the ethical and epistemic responsibilities attached to those symbols. Brian Rotman's semiotics of mathematics helps illuminate how symbolic roles function in both mathematics and programming.

## Rotman's Three Positions

Brian Rotman, in *Mathematics as Sign: Writing, Imagining, Counting* [-@rotman2000mathematics], develops a semiotic framework inspired by Peirce that helps illuminate the roles involved in symbolic practices such as mathematics and, by extension, programming. Rotman identifies three distinct semiotic positions:

- **Person:** The actual human being who engages with symbolic systems, able to reflect and speak in first-person terms ("I"). The Person navigates contexts, meanings, ethics, and concrete realities.
- **Subject:** A constructed entity defined within the symbolic discourse. In mathematics the Subject is a hypothetical or abstract figure to whom instructions are directed by statements like "let *x* be a prime number…" or "consider an infinite set": a typically identityless placeholder within the symbolic system.
- **Agent:** An idealized executor capable of indefinitely performing operations within the symbolic domain as needed (for example, computing potentially infinite sums), embodying automation or algorithmic execution without consciousness or reflective awareness, not even that of the imagined Subject one level above.

## Mapping onto Programming

When mapped onto software development, these three roles align with familiar concepts:

- **The Person** corresponds to the **programmer**, capable of reasoning consciously, ethically, and contextually.
- **The Subject** aligns with **abstract computational models** (a conceptual machine or an abstract data structure): entities defined symbolically by the programmer but not actualized as tangible hardware, which the programmer instructs through a programming language.
- **The Agent** corresponds to the **computer hardware or CPU**, tirelessly executing symbolic instructions without reflection or awareness.

| Semiotic actor | Mathematics | Programming |
|---|---|---|
| **Person** | The mathematician engaging with symbolic systems, reflecting consciously, ethically, and contextually. | The programmer, consciously reflecting on the ethical implications and real-world contexts of code. |
| **Subject** | Abstract entities, the subject of symbolic discourse ("let *x* be…"), existing only symbolically. | Computational models or symbolic structures: theoretical machines, data structures, algorithms defined by the programmer. |
| **Agent** | Idealized executor performing indefinite symbolic manipulations automatically, without reflection or awareness. | Computer hardware or CPU, executing instructions automatically and mechanically without conscious reflection or ethical awareness. |

Rotman's semiotic trichotomy of mathematics, projected onto programming, reveals how abstractionism collapses crucial distinctions among these roles, privileging abstract Subjects and mechanical Agents at the direction of a Person who is sometimes reflective and sometimes not. Software abstractions thus risk becoming disconnected from human understanding and ethical responsibility precisely when the symbolic system replaces reflective human judgment with automated, unreflective execution.

## Keeping the Person in View

What Rotman's scheme offers is a name for each role, including the one that is easiest to forget. Every program is written by a Person, addressed to a Subject, and carried out by an Agent, and only the first of these can ask what the program is for. Abstraction makes it easy to spend the whole day talking to the Subject while the Agent does the work. The question worth keeping in view is where the Person went.
