import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { visit } from "unist-util-visit"
import { Element, Root } from "hast"
import { QuartzTransformerPlugin } from "../types"
import { FilePath, FullSlug, resolveRelative, simplifySlug, slugifyFilePath } from "../../util/path"

// XBSTRXCT: friendlier internal links.
//
// Quartz resolves [[target]] only when `target` matches a file name exactly (case-sensitive).
// This step runs after Quartz's link crawler and re-resolves any internal link that points at a
// page that does not exist, by matching (case-insensitively, ignoring spaces/hyphens/underscores)
// against every page's file name, `title` and `aliases`. So [[Abstraction]], [[Abstraction leak]],
// [[abstraction-leak]] and an alias like [[Leaky abstraction]] all reach the same page, and the
// page's backlinks include them. Ambiguous names (two pages share them) are left alone and warned
// about. Links that still lead nowhere get the class `broken` and a build warning.

export const normalizeName = (s: string) =>
  s
    .normalize("NFC")
    .toLowerCase()
    .replace(/\.md$/, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-|-$/g, "")

type NameIndex = { bySlug: Set<string>; byName: Map<string, FullSlug | null> }

function buildIndex(contentDir: string, files: FilePath[]): NameIndex {
  const bySlug = new Set<string>()
  const byName = new Map<string, FullSlug | null>()
  const add = (name: unknown, slug: FullSlug) => {
    if (typeof name !== "string" || name.trim() === "") return
    const key = normalizeName(name)
    const existing = byName.get(key)
    if (existing === undefined) byName.set(key, slug)
    else if (existing !== slug) byName.set(key, null) // ambiguous
  }
  for (const fp of files) {
    if (!fp.endsWith(".md")) continue
    const slug = slugifyFilePath(fp)
    bySlug.add(slug)
    bySlug.add(simplifySlug(slug))
    if (path.basename(fp) !== "index.md") add(path.basename(fp, ".md"), slug)
    try {
      const fm = matter(fs.readFileSync(path.join(contentDir, fp), "utf8")).data ?? {}
      add(fm.title, slug)
      const aliases = Array.isArray(fm.aliases) ? fm.aliases : fm.aliases ? [fm.aliases] : []
      for (const alias of aliases) add(alias, slug)
    } catch {
      // unreadable frontmatter: the page is still reachable by file name
    }
  }
  return { bySlug, byName }
}

export const ResolveLinks: QuartzTransformerPlugin = () => {
  let cache: { at: number; index: NameIndex } | undefined
  return {
    name: "ResolveLinks",
    htmlPlugins(ctx) {
      // Rebuilt at most once a second so title/alias edits are picked up by the live preview.
      const index = () => {
        if (!cache || Date.now() - cache.at > 1000) {
          cache = { at: Date.now(), index: buildIndex(ctx.argv.directory, ctx.allFiles) }
        }
        return cache.index
      }
      return [
        () => (tree: Root, file) => {
          const { bySlug, byName } = index()
          const here = file.data.slug as FullSlug
          const links = new Set(file.data.links ?? [])
          visit(tree, "element", (node: Element) => {
            if (node.tagName !== "a") return
            const classes = (node.properties.className ?? []) as string[]
            const target = node.properties["data-slug"] as string | undefined
            if (!classes.includes("internal") || classes.includes("tag-link") || !target) return
            if (target.startsWith("tags/") || bySlug.has(target) || bySlug.has(`${target}/index`)) return

            const resolved = byName.get(normalizeName(target.split("/").pop() ?? target))
            if (resolved) {
              const href = String(node.properties.href ?? "")
              const anchor = href.includes("#") ? href.slice(href.indexOf("#")) : ""
              node.properties.href = resolveRelative(here, resolved) + anchor
              node.properties["data-slug"] = resolved
              links.delete(simplifySlug(target as FullSlug))
              links.add(simplifySlug(resolved))
            } else {
              node.properties.className = [...classes, "broken"]
              const why = resolved === null ? "ambiguous name" : "no such page"
              console.warn(`Warning: ${file.data.relativePath}: link to "${target}" (${why})`)
            }
          })
          file.data.links = [...links]
        },
      ]
    },
  }
}
