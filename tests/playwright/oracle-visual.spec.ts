import { expect, test } from '@playwright/test';

test('Oracle Chat visual snapshot', async ({ page }) => {
  await page.goto('http://localhost:3000/oracle');

  await expect(page.getByPlaceholder('ask your oracle')).toBeVisible();
  await page.screenshot({ path: 'tests/screenshots/oracle-chat.png' });
});
