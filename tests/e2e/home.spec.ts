import { test, expect } from '@playwright/test';

/**
 * Home Page E2E Tests
 *
 * Critical tests to catch regressions like the Jan 2026 home page break.
 * These tests verify the home page loads correctly and key elements render.
 */

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page before each test
    await page.goto('/');
  });

  test('should load successfully with 200 status', async ({ page }) => {
    // The page should respond with 200
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Dean Keesey/i);
  });

  test('should render the hero section', async ({ page }) => {
    // Wait for React hydration - the hero headline is rendered by HeroSectionVibe
    // Look for visible h1 containing "Dean" (the headline text from microtext)
    const heroHeadline = page.locator('h1:visible').first();
    await expect(heroHeadline).toBeVisible({ timeout: 15000 });

    // Verify it contains expected text
    await expect(heroHeadline).toContainText(/Dean/i);
  });

  test('should render hero description text', async ({ page }) => {
    // The description is in a <p> tag within the hero
    // Wait for React hydration
    await page.waitForLoadState('networkidle');

    // Look for visible paragraph with key phrases
    const description = page.locator('p:visible').filter({
      hasText: /Full Stack Developer|Frontend Engineer|web frameworks|SEO/i,
    }).first();
    await expect(description).toBeVisible({ timeout: 15000 });
  });

  test('should render CTA buttons', async ({ page }) => {
    // Look for View Projects or Contact buttons
    const ctaButton = page.locator('a, button').filter({ hasText: /View Projects|Projects|Contact/i }).first();
    await expect(ctaButton).toBeVisible({ timeout: 10000 });
  });

  test('should have no critical console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Filter out expected/benign errors
    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes('favicon') &&
        !error.includes('Failed to load resource') &&
        !error.includes('net::ERR_') && // Network errors during dev
        !error.includes('partytown') && // Partytown script loading
        !error.includes('postMessage') && // Cross-origin messaging
        !error.includes('hydration') && // React hydration warnings
        !error.includes('Warning:') && // React warnings
        !error.includes('Content Security Policy') && // CSP blocks in dev (analytics, tracking)
        !error.includes('violates the following') && // CSP violation messages
        !error.includes('analytics.google.com') && // GA blocked by CSP in dev
        !error.includes('facebook.net') && // FB Pixel blocked by CSP in dev
        !error.includes('clarity.ms') && // Microsoft Clarity blocked by CSP
        !error.includes('youtube.com') && // YouTube embeds blocked by CSP
        !error.includes('Astro') // Astro dev mode audit errors
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Page should load in under 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  test('should render enterprise experience section', async ({ page }) => {
    // Wait for all content to load (including lazy-loaded sections)
    await page.waitForLoadState('networkidle');

    // Look for experience/timeline section - this uses client:visible so needs scroll
    // The section should exist somewhere on the page
    const experienceSection = page.locator('section, div').filter({
      hasText: /SAP|Oracle|Goldman|EA|Experience|Timeline|Enterprise/i,
    }).first();

    // Scroll to make sure lazy-loaded content triggers
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(1000);

    await expect(experienceSection).toBeVisible({ timeout: 15000 });
  });

  test('should render skills section', async ({ page }) => {
    // Look for skills section
    const skillsSection = page.locator('text=/React|TypeScript|Skills|Technologies/i').first();
    await expect(skillsSection).toBeVisible({ timeout: 15000 });
  });
});
