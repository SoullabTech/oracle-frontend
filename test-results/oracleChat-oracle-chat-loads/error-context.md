# Test info

- Name: oracle chat loads
- Location: /Users/andreanezat/Projects/oracle-frontend/tests/playwright/oracleChat.spec.ts:4:1

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByPlaceholder('ask your oracle')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByPlaceholder('ask your oracle')

    at /Users/andreanezat/Projects/oracle-frontend/tests/playwright/oracleChat.spec.ts:6:58
```

# Test source

```ts
  1 | // tests/playwright/oracleChat.spec.ts
  2 | import { expect, test } from '@playwright/test';
  3 |
  4 | test('oracle chat loads', async ({ page }) => {
  5 |   await page.goto('http://localhost:3000/oracle');
> 6 |   await expect(page.getByPlaceholder('ask your oracle')).toBeVisible();
    |                                                          ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  7 | });
  8 |
```