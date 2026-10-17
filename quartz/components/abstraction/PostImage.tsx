import { QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { classNames } from "../../util/lang"
import { escapeHTML } from "../../util/escape"
import { FullSlug, pathToRoot } from "../../util/path"

// A page's lead image, shown under the date line when the frontmatter has `image` (a path relative
// to content/, e.g. images/x.jpg), with optional `imageAlt` and `imageCaption`. The caption allows
// *italics* and [links](url). Clicking the image opens it full size in an overlay (Esc or click to
// close); without JavaScript the link opens the image file itself.

function captionHTML(caption: string) {
  return escapeHTML(caption)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
}

export default (() => {
  function PostImage({ fileData, displayClass }: QuartzComponentProps) {
    const fm = fileData.frontmatter as Record<string, unknown> | undefined
    const image = fm?.image
    if (typeof image !== "string" || !image) return null
    const src = `${pathToRoot(fileData.slug as FullSlug)}/${image.replace(/^\/+/, "")}`
    const alt = typeof fm?.imageAlt === "string" ? fm.imageAlt : ""
    const caption = typeof fm?.imageCaption === "string" ? fm.imageCaption : ""
    return (
      <figure class={classNames(displayClass, "post-image")}>
        <a href={src} class="post-image-link" aria-label="View larger image" data-router-ignore>
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        </a>
        {caption && <figcaption dangerouslySetInnerHTML={{ __html: captionHTML(caption) }} />}
      </figure>
    )
  }

  PostImage.afterDOMLoaded = `
document.addEventListener("nav", () => {
  for (const link of document.querySelectorAll("a.post-image-link")) {
    if (link.dataset.bound) continue
    link.dataset.bound = "1"
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const dialog = document.createElement("dialog")
      dialog.className = "post-image-overlay"
      const img = document.createElement("img")
      img.src = link.href
      img.alt = link.querySelector("img")?.alt ?? ""
      dialog.appendChild(img)
      dialog.addEventListener("click", () => dialog.close())
      dialog.addEventListener("close", () => dialog.remove())
      document.body.appendChild(dialog)
      dialog.showModal()
    })
  }
})
`
  return PostImage
}) satisfies QuartzComponentConstructor
