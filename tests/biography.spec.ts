import { expect, test } from '@playwright/test'

test('biographies support keyboard navigation, wrapping and focus restoration', async ({ page }) => {
  await page.goto('/?lang=ru#team')
  const trigger = page.getByRole('button', { name: 'Открыть биографию: Владимир Миляев', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Владимир Миляев', exact: true })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Закрыть', exact: true })).toBeFocused()
  await expect(page.locator('body')).toHaveClass('dialog-open')
  await page.keyboard.press('ArrowLeft')
  await expect(page.locator('#biography-name')).toHaveText('Сергей Глазов')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await expect(page.locator('#biography-name')).toHaveText('Александр Глазов')
  await expect(page.locator('.biography-text')).toContainText('Glazov Branding')
  await page.keyboard.press('Escape')
  await expect(page.locator('#biography-dialog')).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await expect(page.locator('body')).not.toHaveClass('dialog-open')
  // A closed profile must be safe to reopen after its content is unmounted.
  await trigger.press('Enter')
  await expect(page.getByRole('dialog', { name: 'Владимир Миляев', exact: true })).toBeVisible()
})

test('long mobile biographies scroll independently and reset for the next person', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto('/?lang=ru#team')
  await page.getByRole('button', { name: 'Открыть биографию: Александр Глазов', exact: true }).click()
  const area = page.locator('.biography-scroll')
  expect(await area.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true)
  await area.evaluate(el => { el.scrollTop = el.scrollHeight })
  const next = page.getByRole('button', { name: 'Следующий профиль: Валерий Афанасьев', exact: true })
  await expect(next).toBeInViewport()
  await expect(page.getByRole('button', { name: 'Закрыть', exact: true })).toBeInViewport()
  await next.click()
  await expect(page.locator('#biography-name')).toHaveText('Валерий Афанасьев')
  await expect.poll(() => area.evaluate(el => el.scrollTop)).toBe(0)
  const bounds = await page.locator('#biography-dialog').evaluate(el => ({ width: el.clientWidth, scroll: el.scrollWidth, height: el.getBoundingClientRect().height, viewport: innerHeight }))
  expect(bounds.scroll).toBeLessThanOrEqual(bounds.width)
  expect(bounds.height).toBeLessThan(bounds.viewport)
})

for (const [lang, trigger, expected] of [
  ['en', 'Read biography: Alexander Glazov', 'Responsible for the foundation'],
  ['es', 'Leer biografía: Alexander Glazov', 'Responsable de la estrategia'],
] as const) {
  test(`the biography and its controls are translated into ${lang}`, async ({ page }) => {
    await page.goto(`/?lang=${lang}#team`)
    await page.getByRole('button', { name: trigger, exact: true }).click()
    await expect(page.locator('.biography-text')).toContainText(expected)
    await expect(page.locator('.biography-text')).not.toContainText('Отвечает за')
  })
}
