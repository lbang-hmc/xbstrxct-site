import { visit } from "unist-util-visit"
import { Element, Root, Text } from "hast"
import { QuartzTransformerPlugin } from "../types"

// abstraction.wiki: tags are case-insensitive. Frontmatter `tags:` and inline #tags are
// lowercased and de-duplicated, so #Topology, #topology and `tags: [Topology]` are one tag.
// Runs after Quartz has collected both kinds of tags (frontmatter + inline).

export const NormalizeTags: QuartzTransformerPlugin = () => ({
  name: "NormalizeTags",
  htmlPlugins() {
    return [
      () => (tree: Root, file) => {
        const fm = file.data.frontmatter
        if (fm && Array.isArray(fm.tags)) {
          fm.tags = [...new Set(fm.tags.map((t) => String(t).toLowerCase()))]
        }
        visit(tree, "element", (node: Element) => {
          const classes = (node.properties.className ?? []) as string[]
          if (node.tagName !== "a" || !classes.includes("tag-link")) return
          const href = String(node.properties.href ?? "")
          const at = href.indexOf("tags/")
          if (at !== -1) node.properties.href = href.slice(0, at) + href.slice(at).toLowerCase()
          if (typeof node.properties["data-slug"] === "string") {
            node.properties["data-slug"] = node.properties["data-slug"].toLowerCase()
          }
          for (const child of node.children) {
            if (child.type === "text") (child as Text).value = (child as Text).value.toLowerCase()
          }
        })
      },
    ]
  },
})
