import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Course Generation Flow
 * Tests: Generate Course, View Generated Course
 */
test.describe('Course Generation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Note: These tests assume authentication is set up
    // In real tests, you'd need to authenticate first
    await page.goto('/login');
  });

  test('should show generate course form when authenticated', async ({ page }) => {
    // Skip if not authenticated - would need actual auth setup
    test.skip(true, 'Requires authentication setup');
    
    await page.goto('/generate-course');
    await expect(page.locator('input[name="subject"]')).toBeVisible();
  });

  test('should generate course and redirect to course details', async ({ page }) => {
    // Skip if not authenticated
    test.skip(true, 'Requires authentication setup');
    
    await page.goto('/generate-course');
    await page.fill('input[name="subject"]', 'Introduction to Quantum Physics');
    await page.click('button:has-text("Generate")');
    
    // Should redirect to course details page
    await expect(page).toHaveURL(/.*\/courses\/[a-f0-9-]+/);
    
    // Should show course title
    await expect(page.locator('h1')).toBeVisible();
  });
});


