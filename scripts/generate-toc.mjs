#!/usr/bin/env node
/**
 * Generates VitePress sidebar (toc.ts) and chapter heading stubs from EPUB nav.xhtml
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const TRANSLATIONS = JSON.parse(
  readFileSync(join(__dirname, 'toc-translations.json'), 'utf8'),
)

/** ترجمه عنوان فهرست — اصطلاحات فنی حفظ می‌شوند */
function t(en) {
  return TRANSLATIONS[en] ?? en
}
const EPUB =
  process.env.EPUB_PATH ||
  '/Users/mohammad/Documents/react-application-architecture-production-2nd/react-application-architecture-production-2nd.epub'
const TMP = join(ROOT, '.tmp-epub')
const NAV = join(TMP, 'EPUB/nav.xhtml')
const OUT_TOC = join(ROOT, 'docs/.vitepress/toc.ts')
const CHAPTERS_DIR = join(ROOT, 'docs/chapters')

function extractEpub() {
  mkdirSync(TMP, { recursive: true })
  execSync(`unzip -qo "${EPUB}" -d "${TMP}"`)
}

function parseNav(html) {
  const items = []
  const linkRe = /<a href="([^"]+)">([^<]+)<\/a>/g
  let match
  while ((match = linkRe.exec(html)) !== null) {
    const [, href, text] = match
    const t = text.trim()
    if (!t || t === 'React Application Architecture for Production') continue
    const [file, anchor] = href.split('#')
    items.push({ file, anchor, text: t })
  }
  return items
}

function chapterNum(file) {
  const m = file.match(/Chapter_(\d+)/)
  return m ? parseInt(m[1], 10) : null
}

function headingLevel(anchor) {
  if (!anchor) return 1
  if (anchor.startsWith('h3_')) return 3
  if (anchor.startsWith('h2_')) return 2
  if (anchor.startsWith('h1_')) return 1
  return 2
}

function isChapterTitle(text) {
  return /^Chapter \d+:/.test(text)
}

function isSkipSection(text, file) {
  if (file === 'Preface.xhtml') return false
  if (file?.startsWith('Chapter_14')) return true
  if (file === 'Other_books_you_may_enjoy.xhtml') return true
  if (file === 'Index.xhtml') return true
  if (text.includes('Free Benefits') || text.includes('Unlock')) return false
  return false
}

const PREFACE_SKIP_ANCHORS = new Set(['h1_9'])

function buildTree(items) {
  const tree = {
    preface: { link: '/preface', items: [] },
    chapters: [],
  }

  let currentChapter = null
  let sectionStack = [{ level: 0, items: tree.chapters }]

  for (const item of items) {
    const num = chapterNum(item.file)

    if (item.file === 'Preface.xhtml') {
      if (item.text === 'Preface') continue
      if (PREFACE_SKIP_ANCHORS.has(item.anchor)) continue
      tree.preface.items.push({
        text: t(item.text),
        link: `/preface#${item.anchor}`,
        anchor: item.anchor,
        level: headingLevel(item.anchor),
      })
      continue
    }

    if (num !== null) {
      if (isSkipSection(item.text, item.file) && !isChapterTitle(item.text)) continue

      if (isChapterTitle(item.text)) {
        const chNum = num
        currentChapter = {
          num: chNum,
          text: t(item.text),
          link: `/chapters/chapter-${String(chNum).padStart(2, '0')}`,
          items: [],
          headings: [],
        }
        tree.chapters.push(currentChapter)
        sectionStack = [{ level: 0, items: currentChapter.items }]
        currentChapter.headings.push({ level: 1, text: t(item.text), anchor: item.anchor })
        continue
      }

      if (!currentChapter || num !== currentChapter.num) continue

      const level = headingLevel(item.anchor)
      const title = t(item.text.replace(/^Chapter \d+:\s*/, ''))
      const node = {
        text: title,
        link: `${currentChapter.link}#${item.anchor}`,
        anchor: item.anchor,
        level,
        items: [],
      }

      currentChapter.headings.push({ level, text: title, anchor: item.anchor })

      while (sectionStack.length > 1 && sectionStack[sectionStack.length - 1].level >= level) {
        sectionStack.pop()
      }

      sectionStack[sectionStack.length - 1].items.push(node)
      sectionStack.push({ level, items: node.items })
    }
  }

  return tree
}

function toSidebarItems(items, depth = 0) {
  return items.map((item) => {
    if (item.items?.length) {
      const entry = {
        text: item.text,
        collapsed: true,
        items: toSidebarItems(item.items, depth + 1),
      }
      if (item.link) entry.link = item.link
      return entry
    }
    return { text: item.text, link: item.link }
  })
}

function generateChapterMd(chapter) {
  const lines = [
    `# ${chapter.text}`,
    '',
    '<div class="translation-notice">',
    '',
    'محتوای این فصل هنوز ترجمه نشده است. متن انگلیسی: `source/en/chapter-' +
      String(chapter.num).padStart(2, '0') +
      '.md`',
    '',
    '</div>',
    '',
  ]

  for (const h of chapter.headings.slice(1)) {
    const prefix = '#'.repeat(Math.min(h.level + 1, 6))
    lines.push(`${prefix} ${h.text} {#${h.anchor}}`, '')
  }

  return lines.join('\n')
}

function generatePrefaceMd(prefaceItems) {
  const lines = [
    '# پیش‌گفتار',
    '',
    '<div class="translation-notice">',
    '',
    'محتوای این بخش هنوز ترجمه نشده است. متن انگلیسی: `source/en/preface.md`',
    '',
    '</div>',
    '',
  ]
  for (const item of prefaceItems) {
    const prefix = item.level <= 1 ? '##' : '###'
    lines.push(`${prefix} ${item.text} {#${item.anchor}}`, '')
  }
  return lines.join('\n')
}

function generateTocTs(tree) {
  const prefaceSidebar = [
    { text: 'پیش‌گفتار', link: '/preface' },
    ...tree.preface.items.map((i) => ({ text: i.text, link: i.link })),
  ]

  const chapterSidebar = tree.chapters
    .filter((ch) => ch.num <= 13)
    .map((ch) => ({
      text: ch.text,
      collapsed: true,
      items: [{ text: 'نمای کلی', link: ch.link }, ...toSidebarItems(ch.items)],
    }))

  const sidebar = [
    { text: 'مقدمه', items: prefaceSidebar },
    { text: 'فصل‌ها', items: chapterSidebar },
  ]

  return `// Auto-generated by scripts/generate-toc.mjs — do not edit manually
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.SidebarItem[] = ${JSON.stringify(sidebar, null, 2)}
`
}

// --- run ---
extractEpub()
const html = readFileSync(NAV, 'utf8')
const items = parseNav(html)
const tree = buildTree(items)

writeFileSync(join(ROOT, 'docs/preface.md'), generatePrefaceMd(tree.preface.items))

for (const ch of tree.chapters) {
  if (ch.num > 13) continue
  const file = join(CHAPTERS_DIR, `chapter-${String(ch.num).padStart(2, '0')}.md`)
  writeFileSync(file, generateChapterMd(ch))
}

writeFileSync(OUT_TOC, generateTocTs(tree))

console.log(`Generated TOC: ${tree.chapters.length} chapters, ${tree.chapters.reduce((n, c) => n + c.headings.length, 0)} headings`)
