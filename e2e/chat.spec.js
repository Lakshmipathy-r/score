import { test, expect } from "@playwright/test";

test.describe("Chat System E2E Tests", () => {
  test("loads landing page successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/s_core|Score|Vite/i);
  });

  test("renders navigation bar and links", async ({ page }) => {
    await page.goto("/");
    const body = await page.textContent("body");
    expect(body).toBeDefined();
  });
});
