import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"

// abstraction.wiki: only show a page's date when its frontmatter actually has one.
// Without this, created-modified-date fills a missing date with the build time.
// Keys mirror the aliases note-properties reads for `published`.
registerCondition("has-published-date", (props) => {
  const fm = props.fileData.frontmatter as Record<string, unknown> | undefined
  return ["published", "publishDate", "date"].some((k) => fm?.[k] != null && fm[k] !== "")
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
