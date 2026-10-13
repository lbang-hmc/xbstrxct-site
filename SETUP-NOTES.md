# abstraction.wiki — Phase 1 setup notes

Local prototype only. Nothing has been deployed or pushed; the git repo has no `origin` remote.

## Versions

- Quartz **v5.0.0**, upstream commit `ab346fa66a895e12d63a308e70ce330ba795822a`
  (remote `upstream` = https://github.com/jackyzha0/quartz.git). Plugins are pinned in `quartz.lock.json`.
- Node **22** via user-level nvm (`.nvmrc`); Quartz requires Node ≥ 22 and npm ≥ 10.9.2.
  The system Node (18) is untouched.

## Commands

`./serve` does all of the following on first run and then starts the live preview at
http://localhost:8080 (extra args go to `quartz build`, e.g. `./serve --port 8081`). Manual equivalent:

```sh
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use   # once per shell
npm ci                       # install dependencies
npx quartz plugin install    # install the plugins pinned in quartz.lock.json
npx quartz build --serve     # live preview at http://localhost:8080
npx quartz build             # production build into public/
```

How this was created: `git checkout v5.0.0 -- .`, `npm ci`,
`npx quartz create -t default -X new -l shortest -b abstraction.wiki`, `npx quartz plugin install`.
(The Quartz homepage mentions `plugin install --from-config`; that flag does not exist in v5.0.0.)

## Changes to `quartz.config.yaml` (from the generated default)

- `pageTitle: abstraction.wiki`, `baseUrl: abstraction.wiki`, `analytics: null`
- Footer links to the Quartz GitHub/Discord removed
- `defaultDateType: published`: in this version the frontmatter key `date` is read as both
  `created` and `published` (note-properties plugin), while `modified` falls back to git/filesystem
  time. Showing `published` displays the authored dates rather than the import date.
- (Phase 1 workaround for invented dates, superseded in Phase 3 by `authoredDates.ts`; see below.)

## Content provenance

Canonical source: `/home/bang/xbstrxct-site/md/` (git HEAD of that repo, clean tree), copied verbatim to
`sources/xbstrxct-site-md/`. Older copies in `/home/bang/Sync/xbstrxct-website/` differ only by superseded
typos/placeholders and are not imported, with one exception: the August-2026 snapshot `index.md`
(`sources/snapshot-august-2026-index.md`) has the unique "What is this site?" paragraph, which is merged into the homepage.

Dates: the 2025 values from git HEAD are authoritative (the snapshot has the same month/day in 2026;
older copies show inline dates such as 11.11.2024). Nothing was added.

Transformations applied to `content/`:

1. `content/essays/*.md`: removed the body `# H1` that duplicated the frontmatter `title` (Quartz renders the
   title itself). Everything else is byte-identical. Note: heidegger's H1 was "Heidegger and software", and its title is "Heidegger and Software".
2. `content/index.md`: the original H1 `# Abstraction` became `title: Abstraction`; the snapshot's
   "What is this site?" section is inserted before "Thoughts", with "XBSTRXCT" replaced by "abstraction.wiki"
   (at the author's request); list links `(slug)` became `(essays/slug)`.
3. Essay-to-essay links such as `[…](simondon)` are unchanged; they resolve via `markdownLinkResolution: shortest`.
4. `content/concepts/*.md`: six placeholder pages created at the author's request (no prose, no dates),
   tagged `placeholder`, `type: concept`; each links only to the essays where the term actually occurs.

Unpublished research notes (outside `content/`, never built): `research/todo.md` and two scanned PDFs
from Jamison, *Signs for Computing Terminology*. The PDFs are git-ignored to avoid accidental publication.

## Phase 2: visual design

All customisation lives in four places:

- `quartz.config.yaml`: fonts (`title`/`body` Literata, chosen over Source Serif 4, Newsreader, EB Garamond and Crimson Pro; `header` Source Sans 3 for UI, `code` Source Code Pro),
  paper/charcoal palette with ink-blue links for light and dark mode, and plugin placement: table of contents on the right
  (only when a page has headings), tag-list on (tags shown under the date), the properties table hidden,
  reader mode off, breadcrumbs off (redundant with the nav row). Links are oxblood (`#7d2a1e`; `#d88f7b` in dark mode).
- `quartz/styles/custom.scss`: the design layer (reading column ~40rem, type scale, quiet underlined links, quotations,
  footnotes, sidebars, per-folder page types, homepage).
- `quartz/components/abstraction/SiteNav.tsx`: the Blurbs · Concepts · Readings · Tags row above each page.
- `quartz.ts`: registers the date condition and the nav. **Quartz quirk:** v5.0.0 ignores the `layout` exported from
  `quartz.ts` (docs say otherwise) and renders with a PageTypeDispatcher built inside `loadQuartzConfig()`. `quartz.ts` swaps that
  dispatcher for one built from our layout and throws a clear error if a future Quartz version renames it.

Page types follow folders: `content/blurbs/` (book-like, larger opening paragraph) and `content/concepts/` (compact).
`content/blurbs/index.md` and `content/concepts/index.md` only supply folder titles.
`content/readings/` (close readings of single papers; added 2026-10-12, so far only a placeholder `index.md`) uses the default
page style until the first reading exists, and has its own entry in the nav row.
2026-10-12: the Essays section was renamed **Blurbs** (folder `content/essays/` → `content/blurbs/`, so URLs moved from
`/essays/…` to `/blurbs/…`). Older notes in this file that say "essays" mean these pages.

Fixes for issues the author reported:
- Footnote markers widened line spacing: `sup` now has `line-height: 0` and is raised with relative positioning.
- Multi-line titles in the explorer, TOC and backlinks were ambiguous: entries now have a hanging indent and a gap between items.

Also fixed: the explorer calls `scrollIntoView()` on the current page, which scrolled the window and hid the title on first load
(upstream behaviour). A CSS `scroll-margin-top` on the active entry keeps the page at the top.

Homepage restructuring (text unchanged): title `abstraction.wiki`; the "What is this site?" paragraph is now the opening
paragraph (heading removed); the dictionary entry has an `## Abstraction` heading (formerly the page's H1); a Concepts list and a
tags link were added.

The graph is disabled (author's choice, Phase 2). An earlier patched copy that supported `shortTitle` graph labels
and hid folder nodes is in git history (commit `6d72898`) if the graph returns.

## Phase 3: knowledge features

Run the checks with `./test` (builds `tests/fixture/` and the real site; 21 checks).

Custom code (all registered in `quartz.ts`):

| File | Purpose |
|---|---|
| `quartz/plugins/abstraction/authoredDates.ts` | Dates come only from frontmatter: `published` (alias `date`), `modified` (`updated`, `lastmod`), `created`. Undated pages show no date anywhere; listings sort dated pages newest-first, undated after. |
| `quartz/components/abstraction/PageMeta.tsx` | "Published … · Revised … · N min read" under the title (replaces content-meta). `created` is recorded, not shown. |
| `quartz/plugins/abstraction/resolveLinks.ts` | `[[Links]]` resolve case-insensitively by file name, title or alias in any folder; backlinks include them; links to nothing get class `broken` and a build warning. |
| `quartz/plugins/abstraction/normalizeTags.ts` | Tags are case-insensitive (`#Topology` = `topology`). |
| `quartz/components/abstraction/TagIndex.tsx` | Compact `/tags/` page: tag, count, page titles; nested tags under parents. |

Configuration: `citations` enabled (`bibliography.bib`, `csl: chicago` author-date, linked citations);
`crawl-links` `prettyLinks: false` (it shortened any link text containing "/", e.g. nested tags).

Verified behaviour of Quartz v5 itself:
- Inline `#tags` are parsed by remark-obsidian at the tokenizer level: not in code, fences, URLs, math, `(#x)`, or `#123`.
  A tag needs a space or line start before `#`. Nested tags (`#a/b`) also count toward the parent on the tag index.
- Search (Ctrl/Cmd+K) indexes titles, body text and tags; not aliases, descriptions or the formatted bibliography.
- Mermaid is rendered client-side from cdnjs (needs network in the reader's browser); KaTeX is rendered at build time.

Upstream issues worked around:
- tag-page plugin renders a tag page's listing twice; CSS hides the duplicate and TagIndex replaces the index body.
- Mermaid receives the translucent `--highlight` as an opaque edge-label colour; CSS overrides it.
- BibTeX parser: no `@` inside `@comment`, no bare `%` lines, and `{{Braces and Ampersands}}` for publishers containing "and".

`content/about/authoring.md` is the working example of every convention.

### Phase 3 follow-up (author feedback)

- **Essays now cite via `bibliography.bib`.** Every original footnote was a source reference; each `[^n]` became a
  Pandoc citation (`[@key]`, or `[-@key]` "year only" where the sentence already names the author) and the footnote
  definitions were removed. Prose is otherwise unchanged; originals remain in `sources/xbstrxct-site-md/`.
  Entries transcribed from footnotes are marked `keywords = {incomplete}` in the .bib for later completion.
  This also removed a stray "2017." in the Simondon essay: its multi-line footnote ended with a line `2017.`,
  which Markdown parses as an empty ordered-list item numbered 2017.
- **Concept-link trial:** the first mention of each concept term in the essays is now a `[[wiki link]]`
  (wording unchanged), so concept pages get backlinks from the essays.
- **Drafts:** `draft: true` keeps a page out of every build. `./serve --drafts` previews drafts locally (labelled
  "Draft"). `content/about/` (the authoring example) is a draft. Note: the live preview does not delete stale output
  files; restart `./serve` after drafting a previously published page.
- The live preview does not watch `bibliography.bib` (it is outside `content/`): restart `./serve` after editing it.
