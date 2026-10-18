import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const slidesDir = path.join(root, 'slides')
const distDir = path.join(root, 'dist')

const run = (cmd, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: root, stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}`)),
    )
  })

const marp = ['node_modules/.bin/marp', '--theme-set', 'themes']

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!kv) continue
    data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '')
  }
  return data
}

async function findDecks(dir) {
  const decks = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      decks.push(...(await findDecks(full)))
    } else if (entry.name === 'index.md') {
      const slug = path.relative(slidesDir, path.dirname(full)).split(path.sep).join('/')
      const meta = parseFrontMatter(await readFile(full, 'utf8'))
      decks.push({
        slug,
        title: meta.title || slug,
        author: meta.author || '',
        date: meta.date || '',
        description: meta.description || '',
      })
    }
  }
  return decks
}

function renderIndex(decks) {
  const items = decks
    .map(
      (deck) => `      <li>
        <a class="talk" href="./${deck.slug}/">
          <span class="title">${deck.title}</span>
          <span class="meta">${[deck.author, deck.date].filter(Boolean).join(' · ')}</span>
          ${deck.description ? `<span class="desc">${deck.description}</span>` : ''}
        </a>
        <a class="pdf" href="./${deck.slug}/index.pdf">PDF</a>
      </li>`,
    )
    .join('\n')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Talks</title>
  <style>
    :root { --fg: #1f2933; --muted: #64748b; --accent: #2563eb; --line: #e2e8f0; }
    * { box-sizing: border-box; }
    body {
      margin: 0 auto; max-width: 760px; padding: 4rem 1.5rem; color: var(--fg);
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.5;
    }
    h1 { letter-spacing: -0.03em; border-bottom: 3px solid var(--accent); padding-bottom: 0.3rem; }
    ul { list-style: none; padding: 0; margin: 2rem 0; }
    li { display: flex; align-items: center; gap: 1rem; border-bottom: 1px solid var(--line); padding: 1rem 0; }
    a { text-decoration: none; color: inherit; }
    .talk { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }
    .talk .title { font-weight: 600; font-size: 1.15rem; }
    .talk:hover .title { color: var(--accent); }
    .meta { color: var(--muted); font-size: 0.9rem; }
    .desc { color: var(--muted); font-size: 0.95rem; }
    .pdf {
      color: var(--accent); font-size: 0.85rem; font-weight: 600;
      border: 1px solid var(--accent); border-radius: 6px; padding: 0.2rem 0.6rem;
    }
  </style>
</head>
<body>
  <h1>Talks</h1>
  <ul>
${items}
  </ul>
</body>
</html>
`
}

async function stripMarkdown(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) await stripMarkdown(full)
    else if (entry.name.endsWith('.md')) await rm(full)
  }
}

async function main() {
  const decks = (await findDecks(slidesDir)).sort((a, b) =>
    (b.date || '').localeCompare(a.date || '') || a.slug.localeCompare(b.slug),
  )
  console.log(`Found ${decks.length} talk(s): ${decks.map((d) => d.slug).join(', ')}`)

  await rm(distDir, { recursive: true, force: true })
  await cp(slidesDir, distDir, { recursive: true })

  console.log('Building HTML...')
  await run(marp[0], [...marp.slice(1), '--html', 'dist'])

  console.log('Building PDF...')
  await run(marp[0], [...marp.slice(1), '--html', '--pdf', '--allow-local-files', 'dist'])

  console.log('Stripping Markdown sources...')
  await stripMarkdown(distDir)

  console.log('Generating landing page...')
  await mkdir(distDir, { recursive: true })
  await writeFile(path.join(distDir, 'index.html'), renderIndex(decks))

  console.log('Done. Output in dist/.')
}

main().catch((err) => {
  console.error(err)
  if (!existsSync(path.join(root, 'node_modules'))) {
    console.error('Dependencies missing. Run `npm install` first.')
  }
  process.exit(1)
})
