# Opening drafts (for review, not on the site)

Drafted 2026-10-17 in the style of the other four openings: a short concrete scene before the first heading.
If approved, each goes at the top of its blurb, before the existing first paragraph. Neither is inserted yet.

## Locke, Abstraction, and the Programmer's Toolbox (`content/blurbs/locke-sicp.md`)

A first-year student is writing a program to grade a class's quizzes. The code to average the first quiz takes a few lines: add up the scores, divide by the number of students, round to one decimal place. The second quiz needs the same lines, so the student copies them and changes the name. By the fifth quiz there are five copies, and when the instructor asks for two decimal places instead of one, the student has to find and fix every one of them, and misses one. The next week, the student writes it once: a small function called `average` that takes any list of scores. The five copies collapse into five short calls, and the rounding rule now lives in exactly one place. Nothing about the quizzes has changed. What has changed is that the student has stopped thinking about quiz one, quiz two and quiz three, and started thinking about *a quiz*.

## Meaningless Symbols in Twentieth Century Symbolic Reasoning (`content/blurbs/symbolic-reasoning-math-logic-cs.md`)

A high-school student faces the equation 3*x* + 7 = 22. The teacher's advice is a recipe: move the 7 to the other side and flip its sign, then divide both sides by 3. The student does exactly that, without picturing anything at all (no scales in balance, no unknown quantity, no meaning for *x*) and arrives at *x* = 5. The answer is correct. The same recipe works for equations about money, distances, temperatures, and things the student will never encounter, because it never asks what the symbols stand for. It only asks where they are on the page. The student has just learned the most powerful trick in mathematics: you can get the right answer by pushing marks around, as long as you push them by the rules.
