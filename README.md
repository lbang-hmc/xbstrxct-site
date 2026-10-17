# XBSTRXCT

Source of [xbstrxct.com](https://xbstrxct.com): micro-essays (and occasional full-sized essays) on abstraction,
blending programming, computation, mathematics and philosophy. Built with [Quartz](https://quartz.jzhao.xyz/) v5.

- `content/`: the writing (Markdown). `blurbs/`, `concepts/`, `readings/`; `about/authoring.md` shows every convention (draft, not published).
- `bibliography.bib`: shared bibliography for `[@key]` citations.
- `./serve`: live preview at http://localhost:8080 (`./serve --drafts` includes drafts).
- `./test`: checks for links, tags, dates and build warnings.
- `./publish`: builds the site into `docs/`, which GitHub Pages serves. Commit and push to publish.

Notes on setup, design and customisations: `NOTES.md`. Open items: `TODO.md`.
