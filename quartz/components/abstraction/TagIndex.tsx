import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { FullSlug, getAllSegmentPrefixes, resolveRelative } from "../../util/path"

// The /tags/ page: every tag with its page count, linked to the tag's own page, followed by the
// titles of its pages. Nested tags (mathematics/algebra) sit under their parent. Replaces the
// stock tag index, which repeats each listing (see custom.scss, "Tag pages").

export default (() => {
  function TagIndex({ fileData, allFiles }: QuartzComponentProps) {
    if (fileData.slug !== "tags/index") return null
    const here = fileData.slug as FullSlug

    const pagesByTag = new Map<string, { title: string; slug: FullSlug }[]>()
    for (const file of allFiles) {
      const tags = (file.frontmatter?.tags ?? []) as string[]
      if (!file.slug || file.slug.startsWith("tags/")) continue
      for (const tag of new Set(tags.flatMap(getAllSegmentPrefixes))) {
        const list = pagesByTag.get(tag) ?? []
        list.push({ title: String(file.frontmatter?.title ?? file.slug), slug: file.slug as FullSlug })
        pagesByTag.set(tag, list)
      }
    }
    const tags = [...pagesByTag.keys()].sort((a, b) => a.localeCompare(b))

    return (
      <div class="tag-index">
        <p class="tag-index-summary">
          {tags.length} {tags.length === 1 ? "tag" : "tags"}
        </p>
        <ul>
          {tags.map((tag) => {
            const pages = pagesByTag.get(tag)!.sort((a, b) => a.title.localeCompare(b.title))
            const depth = tag.split("/").length - 1
            return (
              <li style={depth ? `margin-left: ${depth * 1.5}rem` : undefined}>
                <a class="internal tag-link" href={resolveRelative(here, `tags/${tag}` as FullSlug)}>
                  {depth ? tag.split("/").pop() : tag}
                </a>
                <span class="tag-index-count">{pages.length}</span>
                <span class="tag-index-pages">{pages.map((p) => p.title).join(" · ")}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return TagIndex
}) satisfies QuartzComponentConstructor
