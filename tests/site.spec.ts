import { expect, test } from '@playwright/test'

test('a direct section URL opens below the fixed header', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?lang=es#about')
  await page.evaluate(() => document.fonts.ready)
  const headerBottom = await page.locator('.header').evaluate(el => el.getBoundingClientRect().bottom)
  await expect.poll(() => page.locator('#about').evaluate(el => Math.round(el.getBoundingClientRect().top))).toBe(Math.round(headerBottom + 20))
})

for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  test(`responsive layout at ${width}px in all languages`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    for (const lang of ['ru', 'en', 'es']) {
      await page.goto(`/?lang=${lang}`)
      await page.evaluate(() => document.fonts.ready)
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.locator('.country')).toHaveCount(9)
      await expect(page.locator('.person')).toHaveCount(6)
      await expect(page.locator('.activity-body:visible')).toHaveCount(6)
      await page.locator('#contacts').scrollIntoViewIfNeeded()
      const sizes = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }))
      expect(sizes.scroll).toBeLessThanOrEqual(sizes.width)
      const clippedText = await page.locator('h1,h2,h3,.country>span:not(.flag)').evaluateAll(elements => elements
        .filter(el => !el.classList.contains('sr-only') && el.scrollWidth > el.clientWidth + 2)
        .map(el => el.textContent))
      expect(clippedText).toEqual([])
    }
    expect(errors).toEqual([])
  })
}

test('language changes all content and survives reload', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Español', exact: true }).click()
  await expect(page.locator('h1')).toHaveText('Unimos países a través del hielo')
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await page.reload()
  await expect(page.locator('h1')).toHaveText('Unimos países a través del hielo')
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await page.getByRole('button', { name: 'English', exact: true }).click()
  await expect(page.locator('#contacts h2')).toHaveText('Contact')
  await expect(page).toHaveTitle('ISEF — Connecting countries through ice')
})

test('mobile menu supports navigation, language switching and Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Открыть меню', exact: true }).click()
  const menu = page.getByRole('dialog')
  await expect(menu).toBeVisible()
  await menu.getByRole('button', { name: 'English', exact: true }).click()
  await menu.getByRole('link', { name: 'Contact' }).click()
  await expect(menu).not.toBeVisible()
  await expect(page).toHaveURL(/#contacts$/)
  await expect(page.locator('body')).not.toHaveClass('dialog-open')
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.getByRole('button', { name: 'Open menu', exact: true }).click()
  await page.keyboard.press('Escape')
  await expect(menu).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toBeFocused()
})

test('gallery keyboard controls and focus restoration', async ({ page }) => {
  await page.goto('/')
  const photo = page.locator('.gallery-photo').first()
  await photo.click()
  const gallery = page.getByRole('dialog')
  await expect(gallery).toBeVisible()
  await expect(page.locator('.gallery-photo')).toHaveCount(6)
  await expect(gallery.locator('figcaption')).toContainText('1 / 6')
  await page.keyboard.press('ArrowRight')
  await expect(gallery.locator('figcaption')).toContainText('2 / 6')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowLeft')
  await expect(gallery.locator('figcaption')).toContainText('6 / 6')
  await page.keyboard.press('Escape')
  await expect(gallery).not.toBeVisible()
  await expect(photo).toBeFocused()
  await expect(page.locator('body')).not.toHaveClass('dialog-open')
})

test('every rendered image loads locally and contact links work', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('img'))
    images.forEach(img => { img.loading = 'eager' })
    await Promise.all(images.map(img => img.decode()))
  })
  const images = await page.locator('img').evaluateAll(elements => elements.map(img => ({
    src: (img as HTMLImageElement).currentSrc,
    valid: (img as HTMLImageElement).naturalWidth > 0,
  })))
  expect(images.every(img => img.valid && img.src.startsWith('http://127.0.0.1:4173/'))).toBe(true)
  await expect(page.locator('address a[href="mailto:office@isef.pro"]')).toBeAttached()
  await expect(page.locator('address a[href="tel:+79995149199"]')).toBeAttached()
  await expect(page.locator('.map-link')).toHaveAttribute('href', /google\.com\/maps\/search\/\?api=1&query=/)
})
