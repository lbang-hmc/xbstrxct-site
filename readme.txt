Prompt for AI Coding Agent: Build My Simple Pandoc Blog System

I have a small Obsidian vault with Markdown files that I want to turn into a simple static blog. I want your help designing a minimal build system that uses Pandoc to convert Markdown to HTML. The goal is simplicity, easy manual editing, and no complex frameworks.

Files I already have

index.md (my home page) 

index

heidegger.md (a blog post) 

heidegger

simondon.md (a blog post) 

simondon

style.css (basic styling) 

style

build (a small script for inspiration)

What I want you to build

Create a very small static-site structure for me:

Use only Pandoc to turn each .md file into .html.

The generated pages should use only standard Obsidian-style Markdown. No custom extensions.

Each generated page should have a simple header at the very top that says XBSTRXCT, and that text should link back to the generated index.html.

The site should look clean on both mobile and desktop using my existing style.css.

I want a Makefile that:

builds all pages, where source markdown files live in a folder named md

lets me add more pages later by editing the Makefile manually

produces output into a public/ directory

Pandoc templates should be minimal. Just enough HTML wrapper to load style.css, include the header link, and wrap the content.

I am fine manually writing titles, dates, and links inside index.md myself. The system does not need to auto-discover files.

Keep everything extremely simple. I value readability and minimalism over automation.

Deliverables I want from you

A directory structure

A Pandoc HTML template file

An updated style.css only if necessary

A Makefile that builds the whole site

A small shell script, if helpful, to keep commands clean

Clear instructions for how to add new pages in the future

A walk-through of how the build pipeline works

Constraints

No JavaScript

No external libraries

No frameworks

No templating systems besides Pandoc’s built-in template

No bundlers

Everything must remain simple enough that I can maintain it by hand

How pages should look

At the top:

<header>
  <a href="index.html">XBSTRXCT</a>
</header>


Then the Markdown content

Use my style.css for layout and typography

Pages should respect mobile width limits and scale images correctly

Should render cleanly on desktop and mobile without layout shifts

What I want from you right now

Produce the full working system:
Makefile, Pandoc template, folder layout, example commands, and any other necessary files.
Then show me exactly how to run the build and how to add new pages later.
