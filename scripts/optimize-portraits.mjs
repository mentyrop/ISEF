import sharp from 'sharp'
import { mkdir, readdir, stat, unlink } from 'node:fs/promises'

const source = 'src/assets/people'
const destination = `${source}/optimized`
const files = (await readdir(source)).filter(file => /\.(avif|jpe?g|png|webp)$/i.test(file))
const outputName = file => file.replace(/\.[^.]+$/, '.webp')
await mkdir(destination, { recursive: true })
for (const file of files) {
  const input = `${source}/${file}`
  const output = `${destination}/${outputName(file)}`
  const existing = await stat(output).catch(() => null)
  if (existing && existing.mtimeMs >= (await stat(input)).mtimeMs) continue
  await sharp(input).rotate().resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 86, effort: 6 }).toFile(output)
}
for (const file of await readdir(destination)) {
  if (file.endsWith('.webp') && !files.some(input => outputName(input) === file)) await unlink(`${destination}/${file}`)
}
