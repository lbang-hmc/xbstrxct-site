import { Element, Root } from "hast"
import { visit } from "unist-util-visit"
import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { htmlToJsx } from "../../util/jsx"
import { FilePath, FullSlug, resolveRelative } from "../../util/path"

// The /bibliography page: every entry in bibliography.bib (the page sets `noCite: ["@*"]`, so the
// citations plugin formats all of them), each followed by links to the pages that cite it. The
// cited keys per page are recorded by plugins/abstraction/linkReferences.ts. The plugin's own
// reference list on this page is hidden by CSS and replaced by this one.

export default (() => {
  function BibliographyIndex({ fileData, allFiles, tree }: QuartzComponentProps) {
    if (fileData.slug !== "bibliography") return null
    const here = fileData.slug as FullSlug

    const citedBy = new Map<string, { title: string; slug: FullSlug }[]>()
    for (const f of allFiles) {
      if (!f.slug || f.slug === here) continue
      for (const key of f.citedKeys ?? []) {
        const list = citedBy.get(key) ?? []
        list.push({ title: String(f.frontmatter?.title ?? f.slug), slug: f.slug as FullSlug })
        citedBy.set(key, list)
      }
    }

    const entries: Element[] = []
    visit(tree as Root, "element", (node: Element) => {
      const classes = (node.properties.className ?? []) as string[]
      if (classes.includes("csl-entry")) entries.push(node)
    })

    return (
      <div class="bibliography-index">
        <p class="bibliography-summary">{entries.length} works</p>
        {entries.map((entry) => {
          const key = String(entry.properties.id ?? "").replace(/^bib-/, "")
          const pages = (citedBy.get(key) ?? []).sort((a, b) => a.title.localeCompare(b.title))
          return (
            <div class="bibliography-entry" id={`ref-${key}`}>
              {htmlToJsx(fileData.filePath as FilePath, { type: "root", children: entry.children } as Root)}
              <p class="cited-in">
                {pages.length === 0
                  ? "Not cited on a page yet."
                  : ["Cited in ", ...pages.flatMap((p, i) => [
                      i > 0 ? ", " : "",
                      <a class="internal" href={resolveRelative(here, p.slug)}>
                        {p.title}
                      </a>,
                    ])]}
              </p>
            </div>
          )
        })}
      </div>
    )
  }
  return BibliographyIndex
}) satisfies QuartzComponentConstructor
