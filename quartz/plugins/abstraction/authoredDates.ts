import { QuartzTransformerPlugin } from "../types"

// abstraction.wiki: dates come only from frontmatter, never from the build clock or the filesystem.
//
//   published: when the page was published   (legacy alias: `date`)
//   modified:  last substantive revision      (aliases: `updated`, `lastmod`)
//   created:   when writing started           (recorded, not displayed)
//
// Missing values stay missing. `authoredDates` holds exactly what the frontmatter says (used by
// PageMeta). `dates` is what Quartz's listings read: it is set only when the page has a `published`
// date, so undated pages appear without a date instead of with the build time.

export type AuthoredDates = { created?: Date; modified?: Date; published?: Date }

const keys: Record<keyof AuthoredDates, string[]> = {
  published: ["published", "date"],
  modified: ["modified", "updated", "lastmod"],
  created: ["created"],
}

// Date-only values (2025-01-15) mean that calendar day in the build's local time zone,
// matching how Quartz formats dates. YAML may already have parsed them as UTC midnight.
export function parseFrontmatterDate(value: unknown): Date | undefined {
  if (value instanceof Date) {
    if (isNaN(value.getTime())) return undefined
    const utcMidnight =
      value.getUTCHours() === 0 && value.getUTCMinutes() === 0 && value.getUTCSeconds() === 0
    return utcMidnight
      ? new Date(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate())
      : value
  }
  if (typeof value !== "string" || value.trim() === "") return undefined
  const s = value.trim()
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  const d = dateOnly ? new Date(+dateOnly[1], +dateOnly[2] - 1, +dateOnly[3]) : new Date(s)
  return isNaN(d.getTime()) ? undefined : d
}

export const AuthoredDates: QuartzTransformerPlugin = () => ({
  name: "AuthoredDates",
  markdownPlugins() {
    return [
      () => (_tree, file) => {
        const fm = (file.data.frontmatter ?? {}) as Record<string, unknown>
        const authored: AuthoredDates = {}
        for (const [field, aliases] of Object.entries(keys) as [keyof AuthoredDates, string[]][]) {
          for (const key of aliases) {
            const raw = fm[key]
            if (raw == null) continue
            const parsed = parseFrontmatterDate(raw)
            if (parsed) {
              authored[field] = parsed
              break
            }
            console.warn(`Warning: ${file.data.relativePath}: unreadable date ${key}: ${String(raw)}`)
          }
        }
        file.data.authoredDates = authored
        if (authored.published) {
          file.data.dates = {
            published: authored.published,
            created: authored.created ?? authored.published,
            modified: authored.modified ?? authored.published,
          }
        } else {
          delete file.data.dates
        }
      },
    ]
  },
})

declare module "vfile" {
  interface DataMap {
    authoredDates: AuthoredDates
  }
}
