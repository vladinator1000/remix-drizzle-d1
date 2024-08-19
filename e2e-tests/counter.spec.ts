import { test, expect } from '@playwright/test';

test('counter', async ({ page }) => {
  await page.goto('http://localhost:5173/counter');

  let button = page.getByRole('button', { name: 'Increment' })
  
  await button.click()
  await button.click()

  let count = page.getByText('Count: 2')
  await expect(count).toBeVisible();
});
