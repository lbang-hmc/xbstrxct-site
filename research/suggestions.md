# Suggestions

Written 2026-10-17. Not published.

**Status (2026-10-17, round 3):** the tags below are applied, and every improvement is done, except:
- the About page (skipped by choice: the author and the name stay mysterious)
- opening stories, drafted in `opening-drafts.md` but not yet inserted
- the equivalence-class demo (deferred)
- SVG figures (skipped; no image work beyond the three lead images)
- the Overleaf link (covered by `overleaf-sources.md`)
- Enforce HTTPS (done only when publishing)

## Suggested tags

The vocabulary is small and lowercase:
- Discipline: `philosophy` `history` `logic` `mathematics` `programming` `ai`
- Theme: `technology` `phenomenology` `embodiment` `formalism` `notation` `automation` `ethics` `opacity`

| Page | Tags |
|---|---|
| Heidegger | philosophy, phenomenology, technology, embodiment, interfaces |
| Simondon | philosophy, technology, programming, ai, opacity |
| Llull–Leibniz | history, logic, automation, ethics |
| Ancient Greece | history, logic, formalism |
| Meaningless Symbols | history, logic, mathematics, formalism, notation, ethics |
| Locke/SICP | philosophy, programming, composition |
| abstraction | philosophy, programming, mathematics |
| abstraction leak | programming, interfaces |
| characteristica universalis | history, logic, notation |
| concretization | philosophy, technology |
| ready-to-hand | phenomenology, embodiment |
| syllogism | logic, history, formalism |

## Improvements

**Content and consistency:**
- Homepage titles don't match the page titles ("Locke, Abstraction, SICP, and…" vs "Locke, Abstraction, and…"; "Heidegger and software").
- Typo "occassional" on the homepage.
- Slug typos: `abstraction-lock-sicp` should be Locke and `lull-leibniz` should be Llull. Rename them, keeping the old URLs through aliases.
- "See moravec" is visible on the live Heidegger page. Remove it or turn it into a draft note.
- The dictionary definition has no source (it looks like Oxford Languages). Cite it or rewrite it in your own words.
- The hand-written "Related" lists duplicate the automatic backlinks.
- The Locke/SICP and Meaningless Symbols blurbs have no opening story.
- Add `description:` frontmatter to every page, for link previews and search snippets.

**Structure:**
- The homepage "Thoughts" list is maintained by hand. Generate it, or link to `/blurbs/`.
- "Readings" appears in the nav but is empty. Hide it until the first reading exists.
- Add an About page: who writes the site, and what the name means and how to pronounce it.
- Add a "suggested reading order" or "start here" path.

**Look and branding:**
- The favicon and default OG image are still Quartz's (`quartz/static/icon.png`, `og-image.png`). Make an XBSTRXCT mark.
- Use a wordmark style for the title.
- Customize the 404 page.

**Hosting and maintenance:**
- Turn on Enforce HTTPS.
- Have `./publish` fail on build warnings.
- `.gitignore` lists itself (a Quartz upstream quirk); harmless, but odd.
- Pin Node in the scripts as already done; consider a Makefile-free one-command `./publish --push`.

**Features:**
- The equivalence-class demo (Phase 4), seeded by the galois talk's sign-domain walkthrough and the symbolic-regression example.
- Image convention plus figures re-rendered as SVG from the TikZ diagrams.
- A per-blurb "sources in progress" link back to the Overleaf material (private, never published).

- The abstraction-leak concept draft mentions Joel Spolsky's "law of leaky abstractions" without a citation; add a `.bib` entry (2002 blog post) if kept.
