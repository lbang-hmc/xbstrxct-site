import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { PageTypeDispatcher } from "./quartz/plugins/pageTypes"
import { FullPageLayout } from "./quartz/cfg"
import { QuartzComponent } from "./quartz/components/types"
import { AuthoredDates } from "./quartz/plugins/abstraction/authoredDates"
import { ResolveLinks } from "./quartz/plugins/abstraction/resolveLinks"
import { NormalizeTags } from "./quartz/plugins/abstraction/normalizeTags"
import { LinkReferences } from "./quartz/plugins/abstraction/linkReferences"
import SiteNav from "./quartz/components/abstraction/SiteNav"
import PageMeta from "./quartz/components/abstraction/PageMeta"
import TagIndex from "./quartz/components/abstraction/TagIndex"
import SiteFooter from "./quartz/components/abstraction/SiteFooter"
import PostImage from "./quartz/components/abstraction/PostImage"
import HomeIndex from "./quartz/components/abstraction/HomeIndex"

// XBSTRXCT customisations. Everything site-specific that is not plain configuration
// lives here or in quartz/components/abstraction, quartz/plugins/abstraction, quartz/styles/custom.scss.

const config = await loadQuartzConfig()
export default config

// Pages with `draft: true` are never published. `./serve --drafts` sets ABSTRACTION_DRAFTS=1 to
// include them in the local preview (they are labelled "Draft").
if (process.env.ABSTRACTION_DRAFTS === "1") {
  config.plugins.filters = config.plugins.filters.filter((f) => f.name !== "RemoveDrafts")
}

// Dates come only from frontmatter. Runs after the stock date plugins and overrides their result.
config.plugins.transformers.push(AuthoredDates())

// [[Links]] by title, alias or file name in any folder, case-insensitive; flags broken links.
// Runs after Quartz's own link crawler.
config.plugins.transformers.push(ResolveLinks())

// Tags are case-insensitive: #Topology and `tags: [topology]` are the same tag.
config.plugins.transformers.push(NormalizeTags())

// Reference-list entries link to the work through their title; the printed URL is removed.
// Runs after the citations plugin, which is configured in quartz.config.yaml.
config.plugins.transformers.push(LinkReferences())

// Section links in the `header` slot (plugins cannot be placed there from YAML).
const header = [
  SiteNav([
    { label: "Blurbs", path: "blurbs/" },
    { label: "Concepts", path: "concepts/" },
    // { label: "Readings", path: "readings/" },  (restore when the first reading is published)
    { label: "Tags", path: "tags/" },
  ]),
]

// Footer from the original xbstrxct.com (year, RSS, contact), replacing Quartz's "Created with" footer.
const footer = SiteFooter({ name: "XBSTRXCT", user: "xbstrxct", domain: "proton.me" })

// Date and reading-time line, then the lead image (frontmatter `image`), directly after the article title.
const pageMeta = PageMeta()
const postImage = PostImage()
function withPageMeta(beforeBody: QuartzComponent[] = []): QuartzComponent[] {
  const titleIndex = beforeBody.findIndex((c) => c.displayName === "ArticleTitle" || c.name === "ArticleTitle")
  const at = titleIndex === -1 ? 0 : titleIndex + 1
  return [...beforeBody.slice(0, at), pageMeta, postImage, ...beforeBody.slice(at)]
}

const base = await loadQuartzLayout()
const contentOverrides: Partial<FullPageLayout> = {
  header,
  footer,
  beforeBody: withPageMeta(base.byPageType.content?.beforeBody ?? base.defaults.beforeBody),
  // Generated blurb and concept lists on the homepage (renders nothing elsewhere).
  afterBody: [HomeIndex(), ...(base.byPageType.content?.afterBody ?? base.defaults.afterBody ?? [])],
}
// Compact tag index on /tags/ (renders nothing on individual tag pages).
const tagOverrides: Partial<FullPageLayout> = {
  header,
  footer,
  beforeBody: [...(base.byPageType.tag?.beforeBody ?? base.defaults.beforeBody ?? []), TagIndex()],
}

export const layout = await loadQuartzLayout({
  defaults: { header, footer },
  byPageType: {
    content: contentOverrides,
    tag: tagOverrides,
    ...Object.fromEntries(["folder", "canvas", "bases"].map((t) => [t, { header, footer }])),
  },
})

// Quartz v5.0.0 renders pages with a PageTypeDispatcher built inside loadQuartzConfig() from the
// un-overridden layout, and does not read the `layout` export above. Swap in one built from ours.
const dispatcherIndex = config.plugins.emitters.findIndex((e) => e.name === "PageTypeDispatcher")
if (dispatcherIndex === -1) {
  throw new Error("quartz.ts: PageTypeDispatcher not found; revisit after upgrading Quartz")
}
config.plugins.emitters[dispatcherIndex] = PageTypeDispatcher(layout)
