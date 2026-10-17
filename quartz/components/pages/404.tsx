import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint">
      <h1>404</h1>
      {/* XBSTRXCT: site-voice message and links (was the stock "not found" text) */}
      <p>This page has been abstracted away. Whatever was here, only its general idea remains.</p>
      <p>
        <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a> ·{" "}
        <a href={`${baseDir.replace(/\/$/, "")}/blurbs/`}>Blurbs</a> ·{" "}
        <a href={`${baseDir.replace(/\/$/, "")}/concepts/`}>Concepts</a>
      </p>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
