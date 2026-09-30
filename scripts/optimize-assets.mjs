import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'

const sizes = {
  'a2f66.png': 1800,
  'd156b.png': 1100,
  'mission-ice.png': 1600,
  '9d28f.png': 192,
  '218e8.png': 1100,
  '39df7.png': 900,
  'cbe9e.png': 900,
  '2d17b.png': 900,
  'sergey-glazov.jpg': 320,
  ...Object.fromEntries(['a04bb', 'ea52a', '8b078', 'e88dc', 'b446a', '10764', '3b415', '9c645', '8633d'].map(id => [id + '.png', 144])),
  ...Object.fromEntries(['009ea', 'ae288', '50927', '1a437', 'aa036'].map(id => [id + '.png', 220])),
}

await mkdir('public/optimized', { recursive: true })
let before = 0
let after = 0
for (const [file, width] of Object.entries(sizes)) {
  const input = `public/assets/${file}`
  const output = `public/optimized/${file.replace(/\.(png|jpe?g)$/, '.webp')}`
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile(output)
  before += (await stat(input)).size
  after += (await stat(output)).size
}
await sharp('public/assets/9d28f.png').resize({ width: 96 }).png().toFile('public/favicon.png')
console.log(`Images: ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB`)
