import { test, expect } from '@playwright/test';

// These tests assume your app runs on http://localhost:3000/counter-app

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/counter-app');
});

test('app loads and navbar shows 0', async ({ page }) => {
  const navBadge = page.locator('nav .badge');
  await expect(navBadge).toHaveText('0');
});

// TODO #2: add a test for clicking the increment button
// TODO #3: add a test for clicking the decrement button
// TODO #4: add a test for multiple increments and decrements
// TODO #5: add any remaining tests needed (e.g. the reset button, delete button, etc.)
