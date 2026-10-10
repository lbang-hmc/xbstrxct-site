import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { classNames } from "../../util/lang"
import { FullSlug, pathToRoot } from "../../util/path"

// Key navigation shown above every page's content (layout slot `header`, see quartz.ts).
// `path` is relative to the site root; links stay relative so the site works from any base path.
export interface SiteNavLink {
  label: string
  path: string
}

export default ((links: SiteNavLink[]) => {
  function SiteNav({ fileData, displayClass }: QuartzComponentProps) {
    const slug = fileData.slug as FullSlug
    const root = pathToRoot(slug)
    const section = slug.split("/")[0]
    return (
      <nav class={classNames(displayClass, "site-nav")} aria-label="Site sections">
        {links.map(({ label, path }) => {
          const current = path.replace(/\/$/, "") === section
          return (
            <a href={`${root}/${path}`} aria-current={current ? "true" : undefined}>
              {label}
            </a>
          )
        })}
      </nav>
    )
  }
  return SiteNav
}) satisfies QuartzComponentConstructor<SiteNavLink[]>
