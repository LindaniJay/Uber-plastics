import { test, expect } from '@playwright/test'

const routes = [
  '/',
  '/login',
  '/mock-login',
  '/individual',
  '/individual/dashboard',
  '/individual/checkout',
  '/individual/rewards',
  '/scan',
  '/collector',
  '/collector/navigation',
  '/depot',
  '/hub',
  '/insights',
]

for (const route of routes) {
  test(`route responds: ${route}`, async ({ page }) => {
    const res = await page.goto(route, { waitUntil: 'domcontentloaded' })
    expect(res?.ok()).toBeTruthy()
    await expect(page.locator('body')).toBeVisible()
  })
}

test('scan workflow UI elements render', async ({ page }) => {
  await page.goto('/scan')
  await expect(page.locator('text=AI Bottle Scanner')).toBeVisible()
})



