# Meaningless Symbols in Twentieth Century Symbolic Reasoning  

## Hilbert, Gödel, and the Rise of Formalism  

A crucial turning point in the history of formal reasoning occurred in 1900, when David Hilbert challenged the world’s leading mathematicians to show that all mathematical truths could be confirmed through formal proof[^1]. This project ignited an intense focus on grounding mathematics in logic and set theory, until results by Gödel, Turing, Church, and others revealed fundamental limits on formal provability[^2]. Within this climate of ambition, Bertrand Russell and Alfred North Whitehead produced their monumental *Principia Mathematica*[^3], a purely symbolic treatment of arithmetic intended to demonstrate that rigorous manipulation of formal notation could serve as the foundation of mathematical truth.  

Whitehead, reflecting on years of labor devoted to symbolic representation, articulated an influential defense of abstraction in *An Introduction to Mathematics*[^4]:  

> By relieving the brain of all unnecessary work, a good notation sets it free to concentrate on more advanced problems and, in effect, increases the mental power of the race [...] It is a profoundly erroneous truism [...] that we should cultivate the habit of thinking of what we are doing. The precise opposite is the case. Civilization advances by extending the number of important operations we can perform without thinking about them.

Whitehead draws attention to the power of symbol manipulation separated from semantic content. Progress, in his view, depends on freeing thought from the burden of details so that higher level reasoning can flourish. This is perhaps the clearest declaration of the abstractionist ethos in the entire historical record. Similar values persist in contemporary design culture, echoed in Steve Krug’s *Don’t Make Me Think*[^5]. While abstraction allows us to manage complexity, we encourage modern software engineers to think critically about the decisions that abstraction quietly hides.  

## Abstraction in Computing  

Edsger Dijkstra later expressed a related ideal, celebrating the manipulation of symbols without regard for their meaning[^6]:  

> I must mention our desire to let the symbols do the work, more precisely: as much of the work as profitably possible. The formalist prefers to manipulate his formulae, temporarily ignoring all interpretations they might admit; the rules for the permissible symbol manipulations being formulated in terms of those symbols. The formalist calculates with uninterpreted formulae.

Claude Shannon took a similar position in the early foundations of information theory[^7]:  

> The fundamental problem of communication is that of reproducing at one point either exactly or approximately a message selected at another point. Frequently the messages have meaning; that is, they refer to or are correlated according to some system with certain physical or conceptual entities. These semantic aspects of communication are irrelevant to the engineering problem.

Nathaniel Borenstein later satirized abstractionist tendencies in software engineering[^8]:  

> It should be noted that no ethically trained software engineer would ever consent to write a `DestroyBaghdad` procedure. Basic professional ethics would instead require him to write a `DestroyCity` procedure, to which Baghdad could be given as a parameter.

This short historical tour illustrates that abstractionism has shaped computational thinking long before the formal birth of computer science. The question we inherit is how to balance the power of forgetting details with the moral and practical responsibilities that abstraction obscures.

[^1]: D. Hilbert. *Mathematische Probleme*, 1900; *Mathematical Problems*, 1902.  
[^2]: R. Smullyan. *Gödel's Theorem*, 1992; A. Turing. *On Computable Numbers*, 1936; A. Church. *An Unsolvable Problem*, 1936.  
[^3]: A. N. Whitehead and B. Russell. *Principia Mathematica*, 1927.  
[^4]: A. N. Whitehead. *An Introduction to Mathematics*, 1911.  
[^5]: S. Krug. *Do not Make Me Think, Revisited*, 2013.  
[^6]: E. Dijkstra. *EWD1300*, 2002.  
[^7]: C. Shannon. *A Mathematical Theory of Communication*, 1948.  
[^8]: N. Borenstein. *Programming as if People Mattered*, 1991.
