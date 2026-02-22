import { test, expect } from '@playwright/test';

/**
 * Analytics Stack E2E Tests
 *
 * Written TDD-style: run against dev server before the analytics fix to confirm
 * failures, then run again after to confirm all green.
 *
 * GA4/Clarity IDs are hardcoded fallbacks in RootLayout.astro (no env vars needed).
 */

test.describe('Analytics Stack', () => {

  test.describe('GA4', () => {
    test('gtag.js loads via network request', async ({ page }) => {
      const gtagRequest = page.waitForRequest(
        req => req.url().includes('googletagmanager.com/gtag/js'),
        { timeout: 10000 }
      );
      await page.goto('/');
      const request = await gtagRequest;
      expect(request.url()).toContain('gtag/js');
    });

    test('window.dataLayer is initialized with events after page load', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const len = await page.evaluate(() => (window as any).dataLayer?.length ?? 0);
      expect(len).toBeGreaterThan(0);
    });

    test('page_view fires on ClientRouter soft navigation', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const before = await page.evaluate(() => (window as any).dataLayer?.length ?? 0);

      // Use click to trigger ClientRouter soft nav (page.goto() bypasses ClientRouter
      // and does a hard navigation, which would restart the whole page).
      const blogLink = page.locator('a[href="/blog"]').first();
      await blogLink.click();
      await page.waitForURL('/blog', { timeout: 10000 });
      await page.waitForLoadState('networkidle');

      const after = await page.evaluate(() => (window as any).dataLayer?.length ?? 0);
      expect(after).toBeGreaterThan(before);
    });
  });

  test.describe('Microsoft Clarity', () => {
    test('Clarity script request fires on page load', async ({ page }) => {
      const clarityRequest = page.waitForRequest(
        req => req.url().includes('clarity.ms/tag/'),
        { timeout: 10000 }
      );
      await page.goto('/');
      await clarityRequest;
    });
  });

  test.describe('File integrity', () => {
    test('wrong-site analytics-tracking.js is never requested', async ({ page }) => {
      // This file belongs to megangredesky.com — must never load on deankeesey.com
      const wrongFile: string[] = [];
      page.on('request', req => {
        if (req.url().includes('analytics-tracking')) wrongFile.push(req.url());
      });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      expect(wrongFile).toHaveLength(0);
    });

    test('Megan Gredesky GA4 property ID is not in page source', async ({ page }) => {
      await page.goto('/');
      const html = await page.content();
      // G-R99SBB9SQKX is hardcoded in the Megan Gredesky analytics-tracking.js
      expect(html).not.toContain('G-R99SBB9SQKX');
    });
  });

  test.describe('Console health', () => {
    test('no errors from analytics scripts', async ({ page }) => {
      const analyticsErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          const text = msg.text();
          if (
            text.toLowerCase().includes('gtag') ||
            text.toLowerCase().includes('datalayer') ||
            text.toLowerCase().includes('clarity') ||
            text.toLowerCase().includes('fbq')
          ) {
            analyticsErrors.push(text);
          }
        }
      });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      expect(analyticsErrors).toHaveLength(0);
    });
  });

});
