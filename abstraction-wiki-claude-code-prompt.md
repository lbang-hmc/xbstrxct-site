# Claude Code Prompt: Local Prototype of abstraction.wiki

## Project and goal

Build a **local prototype** of `abstraction.wiki`: a curated, extensively crosslinked collection of my writing about abstraction in mathematics, computer science, philosophy, cognitive science, art, and related fields. I will primarily write and maintain the site myself. This is a serious intellectual project, but I want it to be visually inviting, readable, and capable of hosting experiments.

The site should support:

- Essays, short concept/reference pages, and exploratory articles
- Extensive internal links, backlinks, and useful navigation
- Academic citations and bibliographies
- LaTeX mathematics, diagrams, images, and code
- Dates and metadata
- Inline `#tags`, frontmatter tags, an automatically generated tag index, and individual tag pages
- Full-text search
- Occasional embedded interactive browser-based demonstrations

I have **existing sample text** that we should use to judge the prototype. Work with that content rather than filling the site with generic placeholder articles.

**This is a local trial, not a deployment.** Do not create a remote repository, deploy, modify DNS, purchase services, or publish any content.

## Non-negotiable authoring philosophy

**Commit to plain-text Markdown as the primary authoring format, not to Obsidian or any other editor.** I may author with Micro, Helix, Vim, VS Code, a basic text editor, or another tool. No step in the writing, previewing, linking, citation, or publishing workflow may require Obsidian.

- Store prose as ordinary `.md` files, editable with any text editor.
- Prefer portable Markdown and widely supported extensions.
- Use YAML frontmatter for structured metadata.
- Support convenient `[[wiki links]]` and aliases where Quartz provides them, while acknowledging that this syntax is a Markdown extension, not standard Markdown.
- Support inline and display LaTeX, footnotes, images, fenced code, and diagrams.
- Support citation keys and a shared bibliography through a maintainable, documented solution.
- Support inline `#hashtags` as well as tags in frontmatter, but validate whether the chosen Quartz version actually supports inline hashtags. If it does not, investigate a maintained extension or a small, well-tested Markdown transformation. Do not falsely claim the feature works.
- Obsidian compatibility can be a welcome side effect; **do not optimize around, install, or require Obsidian**.
- A future migration to another static-site generator should not require rewriting all articles.

Ordinary authors should almost never need to write HTML. An HTML snippet for embedding a specialized demo is acceptable if necessary, but provide a reusable, simple authoring convention instead of requiring repetitive hand-written HTML.

## Technology and architectural direction

Use **Quartz** as the primary candidate for the static-site generator, favoring the current supported release. We previously discussed Quartz 5, but **verify the actual current release, documentation, and repository APIs before proceeding**. Avoid copying outdated Quartz 4 configuration examples or inventing unsupported plugins. Record the release/commit used and the setup instructions.

References:
- https://quartz.jzhao.xyz/
- https://github.com/jackyzha0/quartz

Use built-in Quartz capabilities for search, links, backlinks, tags, navigation, and math where they meet the requirements. Prefer maintained plugins over bespoke implementations. Keep custom styling and code isolated so upgrades remain manageable.

Interactive demonstrations should be browser-side JavaScript or TypeScript with SVG/Canvas when appropriate. The final generated site and demos must work on static hosting, including GitHub Pages with the custom domain `abstraction.wiki`. There is no need for server-side computation in this prototype.

A standalone demo with an embeddable view (for example, an iframe) is a reasonable default. Verify that its assets are copied into the actual generated output, that paths work on the eventual root domain, and that it survives client-side navigation and refreshes. Do not assume a directory next to Markdown content will automatically be published.

Keep dependencies and architecture simple. Do not introduce React or another major frontend framework for a tiny demo unless a concrete requirement justifies it.

## Working rules and checkpoints

**Proceed in phases. Stop after each checkpoint and wait for my explicit feedback before starting the next phase.** Do not interpret silence as approval.

At every checkpoint:
1. State what changed and where the relevant files are.
2. Run the local preview or give exact instructions for opening it.
3. Identify the specific pages/features I should inspect.
4. Report limitations, unresolved issues, and any decisions that need input.
5. Keep the current working state intact for revision.

Preserve original content. Do not silently rewrite prose, remove sections, manufacture citations, or invent publication dates. If conversion is necessary, retain the originals and explain the conversion.

Favor a modest working implementation over a sprawling system. The purpose is to evaluate the writing experience, presentation, information architecture, and interactive-demo integration.

---

# Phase 1: Inspect content and build the local foundation

### 1. Inspect the environment

- Inspect the current directory and relevant existing files before modifying anything.
- Check Node.js/npm versions and other prerequisites.
- Determine whether this is a new project or an existing Quartz project.
- Verify the current Quartz documentation, supported version, installation process, and configuration APIs.
- Do not overwrite existing work without my approval.

### 2. Inspect my sample content

I will provide a directory or set of files. If they are not yet available, ask me for their location before importing.

- Inventory file types and structure.
- Identify headings, internal links, quotations, equations, images, references, and citations.
- Look for existing dates and tags without inventing missing metadata.
- Explain any transformations required to use the material as Markdown.
- Recommend a small initial information architecture based on the *actual content*.

A possible structure is:

```text
content/
  index.md
  concepts/
  essays/
  explorations/
  assets/
```

Treat this as a starting idea, not a rigid taxonomy. A page may simultaneously concern mathematics, philosophy, and computation. Links and tags should express overlapping relationships.

### 3. Get Quartz running

- Initialize the project and import a useful representative sample of my content.
- Set up Markdown rendering, mathematical notation, internal links, and basic navigation.
- Ensure the local development server starts and changes are reflected in the preview.
- Avoid extensive visual customization at this stage.

### Checkpoint 1

Show a locally running site with actual content and working page navigation. Demonstrate the editor-agnostic workflow: edit a `.md` file with any text editor, save it, and observe the local preview update.

**Stop for feedback.**

---

# Phase 2: Establish the visual design

The site should feel like **a carefully typeset academic book, contemporary philosophical journal, and interconnected encyclopedia**, not Wikipedia, a typical documentation portal, or an unmodified notes template.

### Visual principles

- Restrained scholarly aesthetic; clear hierarchy and generous but purposeful spacing
- Warm off-white or paper-like light background; charcoal text; subtle accent colors
- Excellent typography, potentially serif titles/body paired with restrained sans-serif navigation
- Readable line lengths, strong headings, well-formatted blockquotes, notes, links, code, and mathematics
- Sparse borders and ornament; avoid a dashboard full of cards
- Comfortable reading on wide monitors and phones
- Dark mode if straightforward to implement cleanly

### Layout

Consider:

- A compact header with the site identity, search, and key navigation
- An unobtrusive left explorer or topic navigation, if useful
- A central reading column
- An optional right-side table of contents and backlinks
- Dates and tags displayed near article metadata
- Footnotes and references that are readable but do not dominate articles

Sidebars must not crowd the main text. Use responsive behavior rather than shrinking the reading column excessively.

### Page types

Allow a light distinction among:

1. **Concept pages:** definitions, examples, related ideas, backlinks
2. **Essays:** long-form arguments with a book-like reading experience
3. **Explorations:** writing combined with interactive elements

Keep this distinction simple, perhaps through a frontmatter field and a small number of layout conventions. Do not build an elaborate content management system.

### Homepage

Create a tasteful homepage with the name `abstraction.wiki`, a short provisional introduction, entry points into *actual* sample material, and access to search and tags. Do not invent dozens of placeholder topics.

### Checkpoint 2

Show representative actual pages on desktop and narrow screens. Invite feedback specifically on typography, math, color, links, page layout, navigation, and overall visual character. Iterate on this phase before proceeding.

**Stop for feedback.**

---

# Phase 3: Knowledge features and authoring workflow

### 1. Internal links and backlinks

Support convenient authoring such as:

```markdown
See [[Abstraction]], [[Equivalence Relations]], and
[[Abstract Interpretation|abstract interpreters]].
```

Implement automatic backlinks and sensible handling of cross-folder page names/aliases. Test for broken internal links. Optional graph navigation is fine if useful and unobtrusive, but prioritize actual links, backlinks, and search.

### 2. Dates and metadata

Prefer explicit frontmatter dates as the authoritative source when present:

```yaml
---
title: Equivalence Relations
created: 2026-10-09
modified: 2026-10-10
published: 2026-10-10
---
```

Distinguish created, modified, and published. Decide which date appears on which page type and document the behavior. Avoid relying only on filesystem modification times, which can change during file transfers. If a source date is unknown, omit it or label it unknown; never make one up. Make the handling of future edits predictable and easy.

### 3. Tags and inline hashtags

Support both:

```yaml
---
tags:
  - abstraction
  - mathematics
  - philosophy
---
```

and in ordinary prose:

```markdown
This relates to #emergence and #representation.
```

Requirements:

- Both conventions produce the same underlying tag identities.
- Inline tags become navigable links, not just visually highlighted text.
- Multiple occurrences do not create duplicate tag assignments.
- Code spans/blocks, headings, URLs, and math containing `#` do not accidentally become tags.
- Nested tags such as `#mathematics/algebra` should work if supported cleanly.
- Clearly document any restrictions on tag syntax.

**Verify the real behavior of the chosen Quartz version.** If inline hashtags require extra processing, choose the smallest robust approach and write tests for it.

### 4. Tag index and individual tag pages

Provide a polished, automatically generated `/tags/` page accessible from the main navigation. It should display each tag, a count of associated pages, and a link to that tag's page.

Each tag page should list its associated content, with titles, descriptions if available, and useful dates. Use straightforward sorting (alphabetical or most recently modified) rather than an elaborate interface. Check what Quartz generates by default and customize only as needed.

### 5. Full-text search

Implement local, static-host-compatible search that indexes titles and content, and ideally tags/descriptions/aliases where supported. Test actual queries from my sample material, including titles and terms buried in article text. Make search easy to reach with mouse and keyboard.

### 6. Citations and bibliography

I want convenient academic citations without hand-formatting every reference. Investigate a maintained and **Quartz-compatible** way to maintain a central `.bib` bibliography and write citation keys, for example:

```markdown
This result is discussed in [@author2020].
```

Assess BibTeX/BibLaTeX, Citation Style Language (CSL), citation processors, existing plugins, and possible Zotero export workflows. **Do not require Zotero or any other editor/service to author pages.** Zotero may be a convenient optional bibliography manager.

Prefer a standard syntax, support multiple citations/page numbers if feasible, and demonstrate correctly formatted references from authentic bibliography entries. Keep bibliographic citations distinct from ordinary footnotes. Do not invent references. If no reliable maintained integration exists, explain options and obtain approval before implementing a substantial custom pipeline.

### 7. Mathematics and diagrams

Verify inline/display LaTeX with fractions, quantifiers, relations, matrices, and multiline expressions. Use Mermaid if a supported integration is available; otherwise document a straightforward text-to-SVG or static SVG alternative. Avoid multiple overlapping diagram systems. Ensure math and diagrams behave well on mobile.

### 8. Authoring demonstration

Provide a concise example Markdown page showing the actual conventions for frontmatter, dates, tags, `[[links]]`, equations, citations, footnotes, and a diagram. Every showcased syntax must work in the local prototype rather than being aspirational.

### Checkpoint 3

Show functioning wiki links, backlinks, explicit dates, inline/frontmatter tags, the global tag index, an individual tag page, full-text search, citations, math, and at least one diagram. Demonstrate the authoring process in a plain text editor, with no specialized editor required.

**Stop for feedback.**

---

# Phase 4: Interactive demonstration of abstraction

Now verify that the static site can host a real interactive mathematical experience.

## Demo concept: equivalence classes

Take the concrete domain:

\[
X = \{0,1,2,3,4,5,6,7\}.
\]

An abstraction function maps elements to abstract values. For parity:

\[
\alpha(n) = n \bmod 2.
\]

It induces an equivalence relation:

\[
x \sim y \iff \alpha(x)=\alpha(y).
\]

The equivalence classes are the evens and odds. The quotient set contains one class for each abstract value. Changing the abstraction changes which concrete distinctions are retained.

## Interface

Build a small, attractive, responsive visualization showing:

- Eight labeled concrete elements
- An indication of the currently selected abstraction function
- The resulting abstract values/equivalence classes
- A clear visualization of which concrete elements map into which class
- A concise explanation of what information is forgotten

Provide three preset abstractions:

1. **Parity:** `n mod 2`
2. **Modulo 3:** `n mod 3`
3. **Threshold:** `n < 4` versus `n >= 4`

Allow readers to switch between the three and see the grouping update immediately. Keep the animation subtle and secondary to clarity.

### Optional extension: custom partitions

If modest in scope, allow visitors to assign the eight elements to groups and watch the quotient set change. Maintain a valid partition: every element in exactly one class, with no empty classes in the displayed quotient. Clearly explain that any partition induces an equivalence relation, and that grouped objects remain distinct concretely even if the abstraction treats them as equivalent.

Do not let the optional editing UI delay completion of the simple working preset demo.

## Integration

Create a Markdown article such as `content/explorations/equivalence-classes.md` with an explanation, LaTeX equations, related wiki links, and the embedded demo.

Prefer an independent client-side JavaScript/TypeScript implementation that can also be opened at its own URL. An iframe is acceptable if it provides a stable, reusable integration. If a shortcode, custom Quartz component, or other embedding approach makes Markdown authoring substantially cleaner, evaluate it, but do not tightly couple the demo to Quartz internals unnecessarily.

The demo should:

- Work with static hosting and no backend
- Require no paid services or remote API
- Work on mouse, touch, and keyboard reasonably well
- Behave correctly after Quartz navigation and full refreshes
- Avoid leaking event listeners or breaking other articles
- Have accessible labels and explanatory text
- Reuse the site's design language
- Be copied into the production build with correct asset paths

Verify both standalone and embedded use. Test the built site, not only the development preview.

### Checkpoint 4

Show the interactive equivalence-class demo inside its Markdown article and at a standalone URL. Demonstrate that switching parity/modulo-3/threshold works, including after navigating away and back.

Explain whether this integration is a good foundation for later coarse-graining, graph abstraction, abstract interpretation, and multiple-realizability demos. **Do not implement those demos yet.**

**Stop for feedback.**

---

# Phase 5: Documentation and final local validation

After the earlier phases have been reviewed and approved:

### Authoring guide

Create `AUTHORING.md` with concise, copyable instructions for:

- Adding and editing a Markdown article using **any plain-text editor**
- Titles, dates, descriptions, and other frontmatter
- Inline hashtags and frontmatter tags
- Wiki links, aliases, and backlinks
- Equations, figures, diagrams, and footnotes
- Bibliographic references
- Inserting an existing interactive demo
- Running a local preview

### Technical documentation

Create or update `README.md` with:

- Runtime prerequisites and versions
- Dependency installation and local preview commands
- Production build and local production-preview commands
- Project structure
- Quartz version and configuration choices
- Plugins and any custom extensions
- Known limitations and maintenance considerations
- A short outline of *future* GitHub Pages deployment, with no actual deployment

### Validation

Run and document checks for:

- Successful production build
- Valid internal links
- Loaded images and other assets
- Search results
- Accurate tag index and tag pages
- Correct interpretation of inline hashtags
- Dates and sorting
- Citation rendering and bibliography
- Math and diagrams
- Responsive layouts
- Embedded and standalone demo behavior
- Navigation, back/forward, and refresh behavior

Summarize what works, what remains incomplete or fragile, and whether Quartz remains the right choice based on actual prototype results. Prefer fixing practical defects over proposing unneeded infrastructure.

---

## Constraints recap

1. **No Obsidian dependency.** Plain Markdown files editable with any text editor are fundamental.
2. **No deployment or remote publication.** Local prototype only.
3. **Use my sample content.** Preserve meaning and original files.
4. **Verify the installed Quartz version and real APIs.** Do not assume previous-version behavior.
5. **Implement working features, not screenshots or mockups.** In particular, test inline tags, search, citations, and demo embedding.
6. **Stop at review checkpoints.** Do not implement subsequent phases without approval.
7. **Keep source portable and maintainable.** Minimize lock-in and custom syntax.
8. **Prioritize design and reading quality.** A beautiful, restrained, mathematically literate website is the goal.

## Your first action

**Begin Phase 1 only.** Inspect the environment and existing files, identify the Quartz release and requirements, and ask for the location of my sample content if it is not present. Propose a small content structure grounded in those files, then establish the local preview. Stop at Checkpoint 1 for my review.
