import { expect, test } from '@playwright/test'

const concepts = ['ice', 'arena', 'atlas']
for (const design of concepts) {
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    test(`${design}: responsive content at ${width}px in three languages`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      const errors: string[] = []
      page.on('pageerror', error => errors.push(error.message))
      for (const lang of ['ru', 'en', 'es']) {
        await page.goto(`/concepts.html?design=${design}&lang=${lang}`)
        await page.evaluate(() => document.fonts.ready)
        await expect(page.locator('html')).toHaveAttribute('lang', lang)
        await expect(page.locator('h1')).toBeVisible()
        await expect(page.locator('.c-person')).toHaveCount(6)
        await expect(page.locator('.c-activity')).toHaveCount(6)
        await expect(page.locator('.c-route-track button')).toHaveCount(9)
        await page.locator('#contacts').scrollIntoViewIfNeeded()
        const overflows = await page.locator('h1,h2,h3,.c-contact-email,.c-concept-bar').evaluateAll(elements => elements.filter(e => e.scrollWidth > e.clientWidth + 2).map(e => e.textContent))
        expect(overflows, `${design}, ${width}, ${lang}: clipped text`).toEqual([])
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
        expect(overflow).toBe(false)
        const offscreenText = await page.locator('h1,h2,h3').evaluateAll(elements => elements.filter(e => {
          const box = e.getBoundingClientRect()
          return box.width > 0 && (box.right > innerWidth + 2 || box.left < -2)
        }).map(e => e.textContent))
        expect(offscreenText).toEqual([])
        const galleryFits = await page.locator('.c-gallery-grid').evaluate(grid => {
          const box = grid.getBoundingClientRect()
          return [...grid.querySelectorAll('.c-photo-button')].every(photo => photo.getBoundingClientRect().bottom <= box.bottom + 2)
        })
        expect(galleryFits, `${design}, ${width}, ${lang}: gallery stays within its section`).toBe(true)
      }
      expect(errors).toEqual([])
    })
  }

  test(`${design}: menu, gallery, country route, language, original and images`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`/concepts.html?design=${design}&lang=ru`)
    await page.getByRole('button', { name: 'Сделать пас', exact: true }).click()
    await expect(page.locator('.c-pass-count')).toContainText('01')
    await page.getByRole('button', { name: 'Открыть меню', exact: true }).click()
    const menu = page.locator('#concept-menu')
    await expect(menu).toBeVisible()
    await menu.getByRole('link', { name: 'География' }).click()
    await expect(menu).not.toBeVisible()
    await expect(page.locator('body')).not.toHaveClass(/c-locked/)
    await page.locator('.c-route-track').getByRole('button', { name: 'Китай', exact: true }).click()
    await expect(page.locator('.c-route-destination')).toContainText('Китай')
    await expect(page.locator('.c-route-track').getByRole('button', { name: 'Китай', exact: true })).toHaveAttribute('aria-pressed', 'true')
    if (design === 'atlas') {
      await page.getByRole('button', { name: 'Спортивный обмен', exact: true }).click()
      await expect(page.locator('#c-activity-1')).toBeVisible()
      await expect(page.locator('#c-activity-0')).not.toBeVisible()
    }
    const photo = page.locator('.c-photo-button').first()
    await photo.click()
    const gallery = page.locator('.c-lightbox')
    await expect(gallery).toBeVisible()
    await page.keyboard.press('ArrowRight')
    await expect(gallery.locator('figcaption')).toContainText('2 / 3')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowLeft')
    await expect(gallery.locator('figcaption')).toContainText('3 / 3')
    await page.keyboard.press('Escape')
    await expect(gallery).not.toBeVisible()
    await expect(photo).toBeFocused()
    await page.evaluate(async () => {
      const images = [...document.querySelectorAll('img')]
      images.forEach(image => { image.loading = 'eager' })
      await Promise.all(images.map(image => image.decode()))
    })
    expect(await page.locator('img').evaluateAll(images => images.every(i => (i as HTMLImageElement).naturalWidth > 0 && new URL((i as HTMLImageElement).currentSrc).origin === location.origin))).toBe(true)
    await expect(page.locator('address a[href="mailto:office@isef.pro"]')).toBeVisible()
    await expect(page.locator('address a[href="tel:+79995149199"]')).toBeVisible()
    await expect(page.locator('.c-map')).toHaveAttribute('href', /google\.com\/maps\/search\/\?api=1&query=/)
    await page.locator('.c-header').getByRole('button', { name: 'English', exact: true }).click()
    await expect(page).toHaveURL(/lang=en/)
    await page.reload()
    await expect(page.locator('h1')).toContainText('Connecting')
    await expect(page.locator('.c-original')).toHaveAttribute('href', '/?lang=en')
    await page.locator('.c-menu-button').click()
    await page.keyboard.press('Escape')
    await expect(page.locator('.c-menu-button')).toBeFocused()
    const nextConcept = concepts[(concepts.indexOf(design) + 1) % 3]
    await page.locator(`.c-concept-bar a[href*="design=${nextConcept}"]`).click()
    await expect(page).toHaveURL(new RegExp(`design=${nextConcept}&lang=en`))
    await expect(page.locator('html')).toHaveAttribute('data-concept', nextConcept)
  })
}

test('puck animation ends, supports repeated passes, and honors reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/concepts.html?design=ice&lang=ru')
  const pass = page.getByRole('button', { name: 'Сделать пас', exact: true })
  await pass.click()
  await expect(page.locator('.c-hero')).toHaveClass(/is-passing/)
  await expect(pass).toBeDisabled()
  await expect(pass).toBeEnabled({ timeout: 2500 })
  await expect(page.locator('.c-hero')).not.toHaveClass(/is-passing/)
  await pass.click()
  await expect(page.locator('.c-pass-count')).toContainText('02')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()
  await pass.click()
  await expect(pass).toBeEnabled()
  expect(await page.locator('.c-hero-puck').evaluate(e => getComputedStyle(e).animationName)).toBe('none')
})

test('direct concept section links land below navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/concepts.html?design=atlas&lang=es#contacts')
  await page.evaluate(() => document.fonts.ready)
  await expect.poll(() => page.locator('#contacts').evaluate(e => Math.round(e.getBoundingClientRect().top))).toBe(140)
})
