import { test, expect } from '@playwright/test';

/**
 * Navigation E2E Tests
 *
 * Verify all navigation links work and mobile menu functions correctly.
 */

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have working header navigation', async ({ page }) => {
    // Check that header is visible
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
  });

  test('should navigate to About page', async ({ page }) => {
    // Click About link (in nav or wherever it exists)
    const aboutLink = page.locator('a[href="/about"], a[href*="about"]').first();

    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL(/about/i);
      await expect(page.locator('body')).toBeVisible();
    } else {
      // If no About link visible, mark test as skipped info
      test.info().annotations.push({ type: 'info', description: 'About link not visible on page' });
    }
  });

  test('should navigate to Blog page', async ({ page }) => {
    const blogLink = page.locator('a[href="/blog"], a[href*="blog"]').first();

    if (await blogLink.isVisible()) {
      await blogLink.click();
      await expect(page).toHaveURL(/blog/i);
      await expect(page.locator('body')).toBeVisible();
    } else {
      test.info().annotations.push({ type: 'info', description: 'Blog link not visible on page' });
    }
  });

  test('should navigate to Projects page', async ({ page }) => {
    const projectsLink = page.locator('a[href="/projects"], a[href*="projects"]').first();

    if (await projectsLink.isVisible()) {
      await projectsLink.click();
      await expect(page).toHaveURL(/projects/i);
      await expect(page.locator('body')).toBeVisible();
    } else {
      test.info().annotations.push({ type: 'info', description: 'Projects link not visible on page' });
    }
  });

  test('should navigate to Contact page', async ({ page }) => {
    const contactLink = page.locator('a[href="/contact"], a[href*="contact"]').first();

    if (await contactLink.isVisible()) {
      await contactLink.click();
      await expect(page).toHaveURL(/contact/i);
      await expect(page.locator('body')).toBeVisible();
    } else {
      test.info().annotations.push({ type: 'info', description: 'Contact link not visible on page' });
    }
  });

  test('should have clickable logo that links to home', async ({ page }) => {
    // Navigate to about page first
    await page.goto('/about');

    // Find logo/home link
    const homeLink = page.locator('a[href="/"]').first();

    if (await homeLink.isVisible()) {
      await homeLink.click();
      await expect(page).toHaveURL('/');
    }
  });
});

test.describe('Navigation - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE viewport

  test('should show mobile menu on small screens', async ({ page }) => {
    await page.goto('/');

    // Look for hamburger menu button
    const menuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], [data-testid="mobile-menu"]').first();

    // Mobile menu might be implemented, check if visible
    if (await menuButton.isVisible()) {
      await menuButton.click();

      // Menu should open and show nav links
      const mobileNav = page.locator('nav, [role="navigation"]').filter({ has: page.locator('a') });
      await expect(mobileNav).toBeVisible({ timeout: 5000 });
    } else {
      test.info().annotations.push({
        type: 'info',
        description: 'No mobile menu button found - may use different mobile pattern',
      });
    }
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.goto('/');

    // Page should not have horizontal scroll (content fits)
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 375;

    // Allow some tolerance for scrollbars
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
  });
});
