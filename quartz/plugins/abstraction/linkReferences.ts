import { visit } from "unist-util-visit"
import { Element, ElementContent, Root, Text } from "hast"
import { QuartzTransformerPlugin } from "../types"

// XBSTRXCT: reference-list entries link to the work through their title instead of printing the
// URL. The citations plugin renders an entry's `url` or `doi` (bibliography.bib) as trailing text,
// e.g. `Locke, John. 1689. <i>An Essay…</i>. https://…`. This removes that text and turns the title
// into the link: the “quoted” title of an article or chapter, otherwise the first <i> (a book).
// Entries without a URL are left alone. Must run after the citations plugin (see quartz.ts).
// Also records the keys in each page's reference list as `citedKeys`, for the bibliography page.

const URL_RE = /\s*(https?:\/\/[^\s<]+?)\.?(?=\s*$)/

function linkTo(href: string, children: ElementContent[]): Element {
  return {
    type: "element",
    tagName: "a",
    properties: { href, className: ["external", "reference-link"], rel: ["noopener"] },
    children,
  }
}

// Removes the trailing URL (text node or <a>) from an entry and returns it.
function takeUrl(entry: Element): string | undefined {
  const last = entry.children[entry.children.length - 1]
  if (last?.type === "element" && last.tagName === "a" && typeof last.properties.href === "string") {
    entry.children.pop()
    const prev = entry.children[entry.children.length - 1]
    if (prev?.type === "text") prev.value = prev.value.trimEnd()
    return last.properties.href
  }
  if (last?.type !== "text") return undefined
  const m = last.value.match(URL_RE)
  if (!m) return undefined
  last.value = last.value.slice(0, m.index).trimEnd()
  if (!last.value) entry.children.pop()
  return m[1]
}

// Wraps the title in a link: the first “quoted” text before any <i>, else the first <i>.
function linkTitle(entry: Element, href: string) {
  for (let i = 0; i < entry.children.length; i++) {
    const child = entry.children[i]
    if (child.type === "text") {
      const m = child.value.match(/“([^”]+?)([.,;:]?)”/)
      if (!m || m.index === undefined) continue
      const before: Text = { type: "text", value: child.value.slice(0, m.index) + "“" }
      const title = linkTo(href, [{ type: "text", value: m[1] }])
      const after: Text = { type: "text", value: m[2] + "”" + child.value.slice(m.index + m[0].length) }
      entry.children.splice(i, 1, before, title, after)
      return
    }
    if (child.type === "element" && child.tagName === "i") {
      entry.children.splice(i, 1, linkTo(href, [child]))
      return
    }
  }
}

export const LinkReferences: QuartzTransformerPlugin = () => ({
  name: "LinkReferences",
  htmlPlugins() {
    return [
      () => (tree: Root, file) => {
        const keys: string[] = []
        visit(tree, "element", (node: Element) => {
          const classes = (node.properties.className ?? []) as string[]
          if (!classes.includes("csl-entry")) return
          const id = String(node.properties.id ?? "")
          if (id.startsWith("bib-")) keys.push(id.slice(4))
          const href = takeUrl(node)
          if (href) linkTitle(node, href)
        })
        file.data.citedKeys = keys
      },
    ]
  },
})

declare module "vfile" {
  interface DataMap {
    citedKeys: string[]
  }
}
