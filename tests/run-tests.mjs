// abstraction.wiki checks. Run with ./test (or: node tests/run-tests.mjs).
//
// 1. Builds tests/fixture/ and checks inline #tags, link resolution and dates in the output.
// 2. Builds the real site (content/) and fails on broken internal links or unexpected warnings.

import { spawnSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
let failures = 0
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "  ok  " : "  FAIL"} ${name}${ok || !detail ? "" : `\n         ${detail}`}`)
  if (!ok) failures++
}

function build(contentDir) {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "abstraction-wiki-test-"))
  const r = spawnSync("npx", ["quartz", "build", "-d", contentDir, "-o", out], {
    cwd: root,
    encoding: "utf8",
  })
  const log = `${r.stdout}\n${r.stderr}`
  if (r.status !== 0) {
    console.error(log)
    throw new Error(`build of ${contentDir} failed`)
  }
  return { out, log }
}

const read = (out, p) => fs.readFileSync(path.join(out, p), "utf8")
const article = (html) => html.split("<article")[1].split("</article>")[0]
const tagLinks = (html) =>
  [...article(html).matchAll(/<a href="[^"]*\/tags\/([^"]+)" class="[^"]*tag-link[^"]*"/g)].map((m) => m[1])
const text = (html) => html.replace(/<[^>]+>/g, "")

// ---------- fixture ----------
console.log("Building tests/fixture …")
const fx = build("tests/fixture")
const index = JSON.parse(read(fx.out, "static/contentIndex.json"))

console.log("\nInline tags")
{
  const tags = index["notes/inline-tags"].tags
  const links = tagLinks(read(fx.out, "notes/inline-tags.html"))
  const expected = ["emergence", "representation", "mathematics/algebra", "topology"]
  check("frontmatter and inline tags merge into one set", JSON.stringify([...tags].sort()) === JSON.stringify([...expected].sort()), `got ${JSON.stringify(tags)}`)
  check("repeated tags are recorded once", tags.filter((t) => t === "representation").length === 1)
  check("inline tags become links to tag pages", ["emergence", "representation", "mathematics/algebra", "topology"].every((t) => links.includes(t)), `links: ${links}`)
  check("mixed case is normalised (#Topology -> topology)", tags.includes("topology") && !tags.includes("Topology"))
  check("nested tag keeps its full path", tags.includes("mathematics/algebra"))
  const notTags = tags.filter((t) => t.startsWith("not-a-tag") || /^\d+$/.test(t) || t === "include" || t === "heading-anchor")
  check("no tags from code, fences, URLs, math, anchors, numbers or (#parens)", notTags.length === 0, `unexpected: ${notTags}`)
  const tagIndex = read(fx.out, "tags/index.html")
  const rows = [...tagIndex.matchAll(/<li[^>]*><a class="internal tag-link" href="[^"]*tags\/([^"]+)">[^<]*<\/a><span class="tag-index-count">(\d+)<\/span>/g)].map((m) => `${m[1]}:${m[2]}`)
  check("tag index lists each tag once with its page count", JSON.stringify(rows) === JSON.stringify(["emergence:1", "mathematics:1", "mathematics/algebra:1", "representation:1", "topology:1"]), `rows: ${rows}`)
}

console.log("\nLinks")
{
  const html = article(read(fx.out, "notes/links-and-dates.html"))
  const slugs = [...html.matchAll(/class="([^"]*internal[^"]*)" data-slug="([^"]+)"/g)].map((m) => ({ cls: m[1], slug: m[2] }))
  const ok = slugs.filter((l) => l.slug === "notes/target-page" && !l.cls.includes("broken"))
  check("file name, title, alias, lowercase title, display text and anchor all resolve", ok.length === 6, `resolved ${ok.length}/6: ${JSON.stringify(slugs)}`)
  check("anchor is kept", /href="[^"]*notes\/target-page#section"/.test(html))
  const broken = slugs.filter((l) => l.cls.includes("broken"))
  check("missing page is marked broken", broken.length === 1 && broken[0].slug.toLowerCase().includes("nowhere"))
  check("broken link is reported at build time", /links-and-dates\.md: link to "Nowhere-at-all"/.test(fx.log))
  const backlinks = read(fx.out, "notes/target-page.html").split('class="backlinks')[1] ?? ""
  check("target page lists the linking page as a backlink", backlinks.includes("links-and-dates"))
}

console.log("\nDates")
{
  const meta = (p) => text((read(fx.out, p).match(/<p class="content-meta page-meta">.*?<\/p>/) ?? [""])[0])
  const ld = meta("notes/links-and-dates.html")
  check("published and revised dates shown", ld.includes("Published Mar 01, 2025") && ld.includes("Revised Jun 20, 2025"), ld)
  check("created date is not displayed", !ld.includes("2024"), ld)
  check("legacy `date` key is read as published", meta("notes/legacy-date.html").includes("Published Jan 15, 2025"))
  const tp = meta("notes/target-page.html")
  check("undated page shows no date", !/Published|Revised|Updated|\d{4}/.test(tp), tp)
  const listing = read(fx.out, "notes/index.html")
  const year = String(new Date().getFullYear())
  check("folder listing shows no invented (build-time) dates", !new RegExp(`<time[^>]*>[^<]*${year}`).test(listing) || year === "2025")
  check("folder listing orders by published date, newest first", listing.indexOf("links-and-dates") < listing.indexOf("legacy-date"))
}

// ---------- real site ----------
console.log("\nBuilding content/ …")
const site = build("content")
console.log("\nSite")
{
  const broken = site.log.split("\n").filter((l) => /: link to "/.test(l))
  check("no broken internal links", broken.length === 0, broken.join("\n         "))
  const other = site.log
    .split("\n")
    .filter((l) => /warn|error/i.test(l) && !/isn't yet tracked by git/.test(l) && !/: link to "/.test(l))
  check("no other build warnings or errors", other.length === 0, other.join("\n         "))
}

console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed")
process.exit(failures ? 1 : 0)
