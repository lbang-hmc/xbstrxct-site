import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { FullSlug, resolveRelative } from "../../util/path"

// The homepage lists, generated so they never drift from the pages themselves: every blurb
// (newest first, by published date) and every concept (A–Z), each by its frontmatter title.
// Renders only on the homepage; drafts are already filtered out of allFiles.

type Entry = { title: string; slug: FullSlug; published?: Date }

export default (() => {
  function HomeIndex({ fileData, allFiles }: QuartzComponentProps) {
    if (fileData.slug !== "index") return null
    const here = fileData.slug as FullSlug

    const inFolder = (folder: string): Entry[] =>
      allFiles
        .filter((f) => f.slug?.startsWith(`${folder}/`) && !f.slug.endsWith("/index"))
        .map((f) => ({
          title: String(f.frontmatter?.title ?? f.slug),
          slug: f.slug as FullSlug,
          published: f.authoredDates?.published,
        }))

    const blurbs = inFolder("blurbs").sort(
      (a, b) => (b.published?.getTime() ?? 0) - (a.published?.getTime() ?? 0),
    )
    const concepts = inFolder("concepts").sort((a, b) => a.title.localeCompare(b.title))

    const list = (entries: Entry[]) => (
      <ul>
        {entries.map((e) => (
          <li>
            <a class="internal" href={resolveRelative(here, e.slug)}>
              {e.title}
            </a>
          </li>
        ))}
      </ul>
    )

    return (
      <div class="home-index">
        <h2 id="blurbs">Blurbs</h2>
        {list(blurbs)}
        <h2 id="concepts">Concepts</h2>
        {list(concepts)}
        <p>
          Browse <a href={resolveRelative(here, "tags/index" as FullSlug)}>all tags</a> or search the
          site.
        </p>
      </div>
    )
  }
  return HomeIndex
}) satisfies QuartzComponentConstructor
