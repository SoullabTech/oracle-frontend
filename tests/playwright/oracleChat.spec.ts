// tests/playwright/oracleChat.spec.ts
import { expect, test } from '@playwright/test';

test('oracle chat loads', async ({ page }) => {
  await page.goto('http://localhost:3000/oracle');
  await expect(page.getByPlaceholder('ask your oracle')).toBeVisible();
});
