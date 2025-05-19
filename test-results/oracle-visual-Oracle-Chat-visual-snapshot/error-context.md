# Test info

- Name: Oracle Chat visual snapshot
- Location: /Users/andreanezat/Projects/oracle-frontend/tests/playwright/oracle-visual.spec.ts:3:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByPlaceholder('ask your oracle')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByPlaceholder('ask your oracle')

    at /Users/andreanezat/Projects/oracle-frontend/tests/playwright/oracle-visual.spec.ts:6:58
```

# Test source

```ts
  1 | import { expect, test } from '@playwright/test';
  2 |
  3 | test('Oracle Chat visual snapshot', async ({ page }) => {
  4 |   await page.goto('http://localhost:3000/oracle');
  5 |
> 6 |   await expect(page.getByPlaceholder('ask your oracle')).toBeVisible();
    |                                                          ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  7 |   await page.screenshot({ path: 'tests/screenshots/oracle-chat.png' });
  8 | });
  9 |
```