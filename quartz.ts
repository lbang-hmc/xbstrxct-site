import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"
import { PageTypeDispatcher } from "./quartz/plugins/pageTypes"
import SiteNav from "./quartz/components/abstraction/SiteNav"

// abstraction.wiki: only show a page's date when its frontmatter actually has one.
// Without this, created-modified-date fills a missing date with the build time.
// Keys mirror the aliases note-properties reads for `published`.
registerCondition("has-published-date", (props) => {
  const fm = props.fileData.frontmatter as Record<string, unknown> | undefined
  return ["published", "publishDate", "date"].some((k) => fm?.[k] != null && fm[k] !== "")
})

// abstraction.wiki: section links in the `header` slot (plugins cannot be placed there from YAML).
const header = [
  SiteNav([
    { label: "Essays", path: "essays/" },
    { label: "Concepts", path: "concepts/" },
    { label: "Tags", path: "tags/" },
  ]),
]

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout({
  defaults: { header },
  byPageType: Object.fromEntries(
    ["content", "folder", "tag", "canvas", "bases"].map((pageType) => [pageType, { header }]),
  ),
})

// Quartz v5.0.0 renders pages with a PageTypeDispatcher built inside loadQuartzConfig() from the
// un-overridden layout, and does not read the `layout` export above. Swap in one built from ours.
const dispatcherIndex = config.plugins.emitters.findIndex((e) => e.name === "PageTypeDispatcher")
if (dispatcherIndex === -1) throw new Error("quartz.ts: PageTypeDispatcher not found; revisit after upgrading Quartz")
config.plugins.emitters[dispatcherIndex] = PageTypeDispatcher(layout)
