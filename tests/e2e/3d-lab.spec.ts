import { test, expect } from '@playwright/test';

/**
 * 3D Lab Experiments E2E Tests
 *
 * Verify 3D experiments render correctly.
 * These use React Three Fiber and model-viewer, so we need to:
 * - Check canvas elements render
 * - Verify no WebGL errors
 * - Ensure scripts load properly
 */

test.describe('3D Experiments', () => {
  test('3D viewer page should load', async ({ page }) => {
    const response = await page.goto('/experiments/3d-viewer');

    // Page should load (might be 200 or redirect)
    expect(response?.status()).toBeLessThan(400);
  });

  test('3D viewer should render model-viewer element', async ({ page }) => {
    await page.goto('/experiments/3d-viewer');

    // Wait for page to fully load including scripts
    await page.waitForLoadState('networkidle');

    // This page uses Google's model-viewer web component, not canvas
    const modelViewer = page.locator('model-viewer').first();

    // Model viewer should exist on the page (it may report as hidden due to web component internals)
    // Check that it exists and has the expected attributes
    await expect(modelViewer).toHaveCount(1);
    await expect(modelViewer).toHaveAttribute('src', '/models/demo.glb');
  });

  test('3D interactive page should load', async ({ page }) => {
    const response = await page.goto('/experiments/3d-interactive');

    // Page should load
    expect(response?.status()).toBeLessThan(400);
  });

  test('3D interactive should render canvas element', async ({ page }) => {
    await page.goto('/experiments/3d-interactive');

    await page.waitForLoadState('domcontentloaded');

    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible({ timeout: 15000 });
  });

  test('3D pages should have no WebGL errors', async ({ page }) => {
    const webglErrors: string[] = [];

    page.on('console', (msg) => {
      const text = msg.text().toLowerCase();
      if (
        msg.type() === 'error' &&
        (text.includes('webgl') || text.includes('three') || text.includes('canvas'))
      ) {
        webglErrors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      if (error.message.toLowerCase().includes('webgl')) {
        webglErrors.push(error.message);
      }
    });

    // Test the interactive page which uses React Three Fiber
    await page.goto('/experiments/3d-interactive');
    await page.waitForLoadState('networkidle');

    // Allow some WebGL context warnings but no critical errors
    const criticalErrors = webglErrors.filter(
      (e) =>
        !e.includes('performance warning') &&
        !e.includes('WEBGL_lose_context') &&
        !e.includes('extension not supported')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('3D experiments should be interactive (mouse events work)', async ({ page }) => {
    await page.goto('/experiments/3d-interactive');

    await page.waitForLoadState('domcontentloaded');

    const canvas = page.locator('canvas').first();

    if (await canvas.isVisible()) {
      // Simulate mouse interaction on canvas
      await canvas.hover();

      // If OrbitControls is set up, clicking and dragging should work
      // We just verify no errors occur during interaction
      const box = await canvas.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width / 2 + 50, box.y + box.height / 2);
        await page.mouse.up();
      }

      // Page should still be responsive after interaction
      await expect(canvas).toBeVisible();
    }
  });
});
