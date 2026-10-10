import readingTime from "reading-time"
import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { classNames } from "../../util/lang"
import { i18n } from "../../i18n"

// The line under a page title: authored dates (see plugins/abstraction/authoredDates.ts) and
// reading time. Shows "Published …", plus "Revised …" when `modified` is a different day.
// `created` is recorded but not shown. Pages without dates show only the reading time.

function formatDate(d: Date, locale: string) {
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "2-digit" })
}

function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString()
}

export default (() => {
  function PageMeta({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    if (!text) return null
    const locale = cfg.locale ?? "en-US"
    const { published, modified } = fileData.authoredDates ?? {}

    const parts = []
    if (published) {
      parts.push(
        <span>
          Published <time datetime={published.toISOString()}>{formatDate(published, locale)}</time>
        </span>,
      )
    }
    if (modified && !(published && sameDay(modified, published))) {
      parts.push(
        <span>
          {published ? "Revised" : "Updated"}{" "}
          <time datetime={modified.toISOString()}>{formatDate(modified, locale)}</time>
        </span>,
      )
    }
    const minutes = Math.ceil(readingTime(text).minutes)
    parts.push(<span>{i18n(locale).components.contentMeta.readingTime({ minutes })}</span>)

    return <p class={classNames(displayClass, "content-meta", "page-meta")}>{parts}</p>
  }
  return PageMeta
}) satisfies QuartzComponentConstructor
