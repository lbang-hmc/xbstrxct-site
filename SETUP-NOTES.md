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
- `content-meta` gets `condition: has-published-date`, a custom layout condition registered in
  `quartz.ts` via Quartz's `registerCondition()` API. The created-modified-date plugin fills a missing date
  with the build time, so the date line is shown only when the frontmatter has `published`/`publishDate`/`date`.
  **Known gap (Phase 3):** folder and tag listings (e.g. `/concepts/`, `/tags/placeholder`) still show the
  build time for undated pages.

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

- `quartz.config.yaml`: fonts (`title`/`body` Source Serif 4, `header` Source Sans 3 for UI, `code` Source Code Pro),
  paper/charcoal palette with ink-blue links for light and dark mode, and plugin placement: table of contents on the right
  (only when a page has headings), graph below backlinks, tag-list on (tags shown under the date), the properties table hidden,
  reader mode off, breadcrumbs off (redundant with the nav row). Links are oxblood (`#7d2a1e`; `#d88f7b` in dark mode).
- `quartz/styles/custom.scss`: the design layer (reading column ~40rem, type scale, quiet underlined links, quotations,
  footnotes, sidebars, per-folder page types, homepage).
- `quartz/components/abstraction/SiteNav.tsx`: the Essays · Concepts · Tags row above each page.
- `quartz.ts`: registers the date condition and the nav. **Quartz quirk:** v5.0.0 ignores the `layout` exported from
  `quartz.ts` (docs say otherwise) and renders with a PageTypeDispatcher built inside `loadQuartzConfig()`. `quartz.ts` swaps that
  dispatcher for one built from our layout and throws a clear error if a future Quartz version renames it.

Page types follow folders: `content/essays/` (book-like, larger opening paragraph) and `content/concepts/` (compact).
`content/essays/index.md` and `content/concepts/index.md` only supply folder titles.

Fixes for issues the author reported:
- Footnote markers widened line spacing: `sup` now has `line-height: 0` and is raised with relative positioning.
- Multi-line titles in the explorer, TOC and backlinks were ambiguous: entries now have a hanging indent and a gap between items.

Also fixed: the explorer calls `scrollIntoView()` on the current page, which scrolled the window and hid the title on first load
(upstream behaviour). A CSS `scroll-margin-top` on the active entry keeps the page at the top.

Homepage restructuring (text unchanged): title `abstraction.wiki`; the "What is this site?" paragraph is now the opening
paragraph (heading removed); the dictionary entry has an `## Abstraction` heading (formerly the page's H1); a Concepts list and a
tags link were added.

### Graph: vendored plugin with a small patch (`plugins/graph/`)

The upstream graph plugin (quartz-community/graph @ `701bda4`) has no options for these, so a copy lives in
`plugins/graph/` and is referenced as `source: ./plugins/graph` (Quartz symlinks it into `.quartz/plugins/graph`).
Changes, each marked `abstraction.wiki patch`:

- `src/components/Graph.tsx`: pages with a `shortTitle` frontmatter field pass it to the graph as their label.
- `src/components/scripts/graph.inline.ts`: folder pages (`essays/index`, `concepts/index`) are left out of the graph, and
  labels use `shortTitle` when present. Titles elsewhere (search, lists, page headings) are unaffected.

`dist/` is committed because Quartz loads the built output. After editing the source: `cd plugins/graph && npm ci && npm run build`
(the "DTS build error" about `vitest/globals` also happens upstream; the JavaScript build succeeds). Upgrading: diff against
upstream and re-apply the two marked patches. Note `quartz.lock.json` records this plugin's absolute local path.

`shortTitle` values on the essays are proposals awaiting the author's approval.
