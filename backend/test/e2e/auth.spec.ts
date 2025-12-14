import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Authentication Flow
 * Tests: Login, Sign Up, Session Persistence
 */
test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to login page', async ({ page }) => {
    await page.click('text=Login');
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.locator('h2')).toContainText('Welcome Back');
  });

  test('should show sign up link on login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('text=Sign up')).toBeVisible();
  });

  test('should redirect unauthenticated users from protected routes', async ({ page }) => {
    await page.goto('/courses');
    // Should redirect to home or login
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/(login|$)/);
  });
});


