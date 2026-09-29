import { expect, test } from '@playwright/test'

test('Telegram scrolls content below an in-flow header and keeps section navigation usable', async ({ page }) => {
  // Emulate the injected bridge signature, not Telegram's native renderer.
  await page.addInitScript(() => {
    const nativeCall = () => { throw new Error('The native bridge must not be called') }
    Object.assign(window, {
      TelegramWebviewProxy: { postEvent: nativeCall },
      webkit: { messageHandlers: { performAction: { postMessage: nativeCall } } },
    })
  })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?lang=ru#activities')
  await page.evaluate(() => document.fonts.ready)
  const header = page.locator('.header')
  const pane = page.locator('.site')
  const documentScroll = () => page.evaluate(() => window.scrollY)
  const sectionGap = (id: string) => page.evaluate(id => {
    return document.getElementById(id)!.getBoundingClientRect().top
      - document.querySelector('.header')!.getBoundingClientRect().bottom
  }, id)
  await expect.poll(() => sectionGap('activities')).toBeCloseTo(20, 0)
  const originalScroll = await pane.evaluate(el => el.scrollTop)
  await page.locator('.activity-body').first().hover()
  await page.mouse.wheel(0, 700)
  await expect.poll(() => pane.evaluate(el => el.scrollTop)).toBeGreaterThan(originalScroll)
  expect(await documentScroll()).toBe(0)
  expect(await header.evaluate(el => el.getBoundingClientRect().top)).toBe(0)

  for (const size of [{ width: 390, height: 650 }, { width: 844, height: 390 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(size)
    expect(await documentScroll()).toBe(0)
    expect(await header.evaluate(el => el.getBoundingClientRect().top)).toBe(0)
    expect(await pane.evaluate(el => el.getBoundingClientRect().bottom)).toBe(size.height)
  }

  await page.getByRole('link', { name: 'ISEF — Ice Sport Exchange Foundation', exact: true }).click()
  await page.getByRole('link', { name: 'Узнать о фонде', exact: true }).click()
  await expect.poll(() => sectionGap('activities')).toBeCloseTo(20, 0)
  await page.getByRole('button', { name: 'Открыть меню', exact: true }).click()
  await expect(pane).toHaveCSS('overflow-y', 'hidden')
  await page.getByRole('dialog').getByRole('link', { name: 'Руководство' }).click()
  await expect.poll(() => sectionGap('team')).toBeCloseTo(20, 0)
  await page.getByRole('button', { name: 'Открыть биографию: Александр Сазыкин', exact: true }).click()
  await expect(page.locator('#biography-dialog')).toBeVisible()
  await expect(pane).toHaveCSS('overflow-y', 'hidden')
  await page.getByRole('dialog').getByRole('button', { name: 'Закрыть', exact: true }).click()
  await expect(pane).toHaveCSS('overflow-y', 'auto')
  expect(await documentScroll()).toBe(0)
  await page.goBack()
  await expect.poll(() => sectionGap('activities')).toBeCloseTo(20, 0)
})
