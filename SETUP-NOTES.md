# abstraction.wiki — Phase 1 setup notes

Local prototype only. Nothing has been deployed or pushed; the git repo has no `origin` remote.

## Versions

- Quartz **v5.0.0**, upstream commit `ab346fa66a895e12d63a308e70ce330ba795822a`
  (remote `upstream` = https://github.com/jackyzha0/quartz.git). Plugins are pinned in `quartz.lock.json`.
- Node **22** via user-level nvm (`.nvmrc`); Quartz requires Node ≥ 22 and npm ≥ 10.9.2.
  The system Node (18) is untouched.

## Commands

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
- `content-meta` gets `condition: not-index`: a page with no date is given *today's* date by the
  created-modified-date plugin, so the homepage's date line is hidden instead. Phase 3 handles dates in general.

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
   "What is this site?" section is inserted before "Thoughts"; list links `(slug)` became `(essays/slug)`.
3. Essay-to-essay links such as `[…](simondon)` are unchanged; they resolve via `markdownLinkResolution: shortest`.

Unpublished research notes (outside `content/`, never built): `research/todo.md` and two scanned PDFs
from Jamison, *Signs for Computing Terminology*. The PDFs are git-ignored to avoid accidental publication.
