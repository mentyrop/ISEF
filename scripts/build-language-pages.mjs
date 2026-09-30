import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { content } from '../src/content.ts'

const origin = 'https://isef.pro'
const template = await readFile('dist/index.html', 'utf8')
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const noScript = {
  ru: 'Для просмотра сайта ISEF включите JavaScript. Связаться с фондом:',
  en: 'Enable JavaScript to view the ISEF website. Contact the foundation:',
  es: 'Activa JavaScript para ver el sitio web de ISEF. Contacta con la fundación:',
}
const alternateLinks = Object.keys(content).map(language =>
  `<link rel="alternate" hreflang="${language}" href="${origin}/${language}/" />`).join('\n    ')

function pageHtml(language, path) {
  const copy = content[language]
  const url = `${origin}${path}`
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${language}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(copy.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(copy.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(copy.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/, `$1${escapeHtml(copy.description)}$2`)
    .replace(/<noscript>.*?<a /, `<noscript>${noScript[language]} <a `)
    .replace('</head>', `    <link rel="canonical" href="${url}" />
    <meta property="og:url" content="${url}" />
    ${alternateLinks}
    <link rel="alternate" hreflang="x-default" href="${origin}/" />
  </head>`)
}

// Real HTML files keep direct visits and reloads working on static GitHub Pages.
for (const language of Object.keys(content)) {
  await mkdir(`dist/${language}`, { recursive: true })
  await writeFile(`dist/${language}/index.html`, pageHtml(language, `/${language}/`))
}
await writeFile('dist/index.html', pageHtml('ru', '/'))
