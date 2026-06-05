# XBSTRXCT Blog Build System

A minimal static blog generator using Pandoc and Make.

## Directory Structure

```
.
├── md/                  # Source Markdown files
│   ├── index.md
│   ├── heidegger.md
│   └── simondon.md
├── public/              # Generated HTML files (output)
│   ├── index.html
│   ├── heidegger.html
│   ├── simondon.html
│   └── style.css
├── templates/           # Pandoc HTML template
│   └── page.html
├── style.css           # Site CSS (copied to public/)
└── Makefile            # Build configuration
```

## How to Build the Site

Run the build:
```bash
make
```

Clean and rebuild:
```bash
make clean && make
```

Clean only (remove generated HTML):
```bash
make clean
```

## How the Build Pipeline Works

1. **Source files**: Markdown files live in `md/`
2. **Pandoc conversion**: Each `.md` file is converted to HTML using the template in `templates/page.html`
3. **Link fixing**: Obsidian-style links (e.g., `[text](simondon)`) are automatically converted to proper HTML links (e.g., `href="simondon.html"`)
4. **Output**: Generated HTML files are placed in `public/`
5. **Styling**: `style.css` is copied to `public/`

## How to Add New Pages

1. Create a new Markdown file in the `md/` directory:
   ```bash
   # Example: create a new post
   vim md/newpost.md
   ```

2. Edit the `Makefile` and add your new page to the `PAGES` variable:
   ```makefile
   PAGES = index heidegger simondon newpost
   ```

3. Run the build:
   ```bash
   make
   ```

4. Your new page will be generated as `public/newpost.html`

## Writing Markdown

- Use standard Markdown syntax
- For internal links, use Obsidian-style links without the `.html` extension:
  ```markdown
  [Link text](pagename)
  ```
  The build system will automatically convert these to `pagename.html`

- External links work normally:
  ```markdown
  [External link](https://example.com)
  ```

## Template Customization

The HTML template is in `templates/page.html`. It includes:
- Responsive viewport meta tag
- Link to `style.css`
- Header with "XBSTRXCT" link back to index
- Main content wrapper

Edit this file to change the page structure.

## Style Customization

Edit `style.css` to change the appearance. The current styles include:
- Responsive layout (max-width 700px, centered)
- Dark/light mode support via `color-scheme`
- Mobile-friendly typography
- Proper image scaling

After editing, run `make` to copy the updated CSS to `public/`.

## Notes

- The build system preserves Obsidian-style Markdown links
- No JavaScript, frameworks, or external dependencies
- All generated files go to `public/` for easy deployment
- The Makefile is intentionally simple for manual editing
