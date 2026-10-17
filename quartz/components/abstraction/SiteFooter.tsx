import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { classNames } from "../../util/lang"
import { FullSlug, pathToRoot } from "../../util/path"

// Site footer (layout slot `footer`, see quartz.ts), carried over from the original xbstrxct.com:
// year, site name, RSS link and a contact address. The address is assembled in the browser so it
// does not appear in the HTML; readers without JavaScript see the footer without it.
export interface SiteFooterOptions {
  name: string
  user: string
  domain: string
}

export default ((opts: SiteFooterOptions) => {
  function SiteFooter({ fileData, displayClass }: QuartzComponentProps) {
    const root = pathToRoot(fileData.slug as FullSlug)
    return (
      <footer class={classNames(displayClass, "site-footer")}>
        <p>
          &copy; {new Date().getFullYear()} {opts.name} &mdash; <a href={`${root}/index.xml`}>RSS</a>
        </p>
        <p class="site-footer-contact" data-user={opts.user} data-domain={opts.domain} hidden>
          For comments or conversation: <span></span>
        </p>
      </footer>
    )
  }

  SiteFooter.afterDOMLoaded = `
document.addEventListener("nav", () => {
  for (const p of document.querySelectorAll(".site-footer-contact")) {
    const span = p.querySelector("span")
    if (!span || span.childElementCount) continue
    const address = p.dataset.user + "@" + p.dataset.domain
    const a = document.createElement("a")
    a.href = "mailto:" + address
    a.textContent = address
    span.appendChild(a)
    p.hidden = false
  }
})
`
  return SiteFooter
}) satisfies QuartzComponentConstructor<SiteFooterOptions>
