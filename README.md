# skiadas-talks

A single place to host multiple presentations written in [Marp](https://marp.app/)
Markdown, built to HTML/PDF and deployed to GitHub Pages.

Live site: <https://skiadas.github.io/skiadas-talks>

## Requirements

- Node.js 20+ (CI uses 22)
- A Chrome/Edge/Firefox browser locally only if you want PDF export (`npm run build`)

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local preview server with live conversion (`http://localhost:8080`) |
| `npm run build` | Build every talk to HTML + PDF into `dist/`, plus the landing page |
| `npm run preview` | Build, then serve `dist/` to preview the real site |

## Adding a talk

1. Create a folder: `slides/<slug>/index.md` (the slug becomes the URL: `/<slug>/`).
2. Put images in `slides/<slug>/assets/` and reference them relatively, e.g. `./assets/foo.png`.
3. Add front matter:

   ```markdown
   ---
   title: My Talk
   author: Haris Skiadas
   date: 2026-03-01
   description: One-line summary shown on the landing page.
   theme: talks
   paginate: true
   ---
   ```

4. Commit and push. The landing page and site update automatically.

## Writing slides

- Separate slides with `---`.
- `<!-- _class: lead -->` on a slide centres it (used for title slides).
- Speaker notes are HTML comments (`<!-- ... -->`); press `p` in the browser for
  presenter view. Notes are **not** published (Markdown sources are stripped at build).
- Code blocks, `$math$` (KaTeX), and ` ```mermaid ` diagrams work out of the box.

## How it works

The build mirrors `slides/` into `dist/` and runs Marp in place, so each `index.md`
becomes an `index.html` next to its assets and every relative image path resolves.
Marp does not copy assets itself, which is why the tree is mirrored first.

Each talk is also exported to PDF (`index.pdf`) with images embedded. Themes from
`themes/` are inlined into the HTML at build time.

## Deployment

Pushing to `main` runs `.github/workflows/pages.yml`, which builds the site and
deploys `dist/` to GitHub Pages. `actions/configure-pages` enables Pages
(Source = GitHub Actions) automatically on the first run.
