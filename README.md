# XBSTRXCT Blog Build System

A minimal static blog generator using Pandoc and Make.

## Directory Structure

```
.
├── md/                  # Source Markdown files
│   ├── index.md         # Homepage (edit to add links to new posts)
│   ├── heidegger.md
│   └── ...
├── posts/               # Generated HTML for posts
│   ├── heidegger.html
│   └── style.css
├── templates/           # Pandoc HTML template
│   └── page.html
├── index.html           # Generated homepage (at root for GitHub Pages)
├── style.css            # Site CSS (copied to posts/)
└── Makefile             # Build configuration
```

## How to Build the Site

```bash
make
```

```bash
make clean && make
```

## How to Add a New Post

1. Create `md/newpost.md`
2. Add `newpost` to the `POSTS` variable in the Makefile
3. Add a link to it in `md/index.md`
4. Run `make`

The post is generated as `posts/newpost.html`.

## Writing Markdown

Internal links use the bare page name (no `.html` extension):

```markdown
[Link text](pagename)
```

The build system converts these automatically — posts link at the same level (`pagename.html`), and the index prefixes with `posts/` (`posts/pagename.html`).

External links work normally.

## Customization

- **Template**: `templates/page.html` — controls page structure
- **Styles**: `style.css` — controls appearance, copied to `posts/` on build
