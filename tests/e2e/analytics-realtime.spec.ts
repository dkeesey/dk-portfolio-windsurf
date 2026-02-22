import { test, expect } from '@playwright/test';
import { readFileSync, existsSync } from 'fs';

/**
 * GA4 Analytics Pipeline Test — Two layers
 *
 * Layer 1 (browser-side, hard assertions):
 *   gtag initialized, dataLayer populated, astro:page-load handler fires on
 *   ClientRouter soft-nav. These pass with headless Playwright.
 *
 * Layer 2 (full pipeline to GA4 Realtime, informational):
 *   Queries the GA4 Realtime API after navigation to confirm hits landed on
 *   Google's servers. GA4 filters headless Playwright as bot traffic, so this
 *   only shows results when run from a real (headed) Chrome browser.
 *   Logs results without failing — CI stays green regardless.
 *
 *   To test full pipeline with a real browser:
 *     source ~/.claude/secrets.env
 *     npx playwright test tests/e2e/analytics-realtime.spec.ts --headed
 *
 * Token setup (required for Layer 2, lasts ~1 hour):
 *   python3 ~/Workspace/analytics-platform/scripts/refresh_google_token.py \
 *     --out /tmp/ga4_token.json
 */

const LIVE_URL = 'https://deankeesey.com';
const GA4_PROPERTY_ID = process.env.GA4_DEANKEESEY_PROPERTY_ID;
const TOKEN_FILE = '/tmp/ga4_token.json';
const POLL_TIMEOUT_MS = 30_000;
const POLL_INTERVAL_MS = 5_000;

interface TokenFile {
  access_token: string;
  expires_at: string | null;
}

function loadAccessToken(): string | null {
  if (!existsSync(TOKEN_FILE)) return null;
  try {
    const { access_token, expires_at } = JSON.parse(
      readFileSync(TOKEN_FILE, 'utf-8')
    ) as TokenFile;
    if (expires_at && new Date(expires_at) < new Date()) return null;
    return access_token;
  } catch {
    return null;
  }
}

async function queryRealtimePageViews(accessToken: string): Promise<number> {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runRealtimeReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metrics: [{ name: 'screenPageViews' }],
        minuteRanges: [{ startMinutesAgo: 29, endMinutesAgo: 0 }],
      }),
    }
  );
  const data = (await res.json()) as any;
  if (data.error) throw new Error(`GA4 Realtime API error: ${data.error.message}`);
  return parseInt(data.totals?.[0]?.metricValues?.[0]?.value ?? '0', 10);
}

// ─── Layer 1: Browser-side assertions (always run) ───────────────────────────

test.describe('GA4 browser-side pipeline', () => {
  test('gtag initializes and dataLayer grows on ClientRouter soft-nav', async ({ page }) => {
    await page.goto(LIVE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(2000); // let analytics scripts initialize post-load

    const homeState = await page.evaluate(() => {
      const dl: any[] = (window as any).dataLayer ?? [];
      return {
        length: dl.length,
        gtagDefined: typeof (window as any).gtag === 'function',
        sample: JSON.stringify(dl.slice(0, 4)),
      };
    });
    console.log(
      `Homepage: gtag=${homeState.gtagDefined} dataLayer.length=${homeState.length}\n` +
        `  sample: ${homeState.sample}`
    );

    expect(homeState.gtagDefined, 'window.gtag must be a function').toBe(true);
    expect(homeState.length, 'dataLayer must have events after homepage load').toBeGreaterThan(0);

    // Soft-nav — exercises the astro:page-load handler
    const blogLink = page.locator('a[href="/blog"]').first();
    await blogLink.click();
    await page.waitForURL(`${LIVE_URL}/blog`, { timeout: 10_000 });
    await page.waitForTimeout(2000); // let analytics scripts initialize post-load

    const afterNav = await page.evaluate(() => (window as any).dataLayer?.length ?? 0);
    console.log(`After /blog soft-nav: dataLayer.length=${afterNav}`);

    expect(afterNav, 'dataLayer must grow after ClientRouter soft-nav').toBeGreaterThan(
      homeState.length
    );
  });
});

// ─── Layer 2: Full pipeline → GA4 Realtime API (informational, no hard fail) ─

test.describe('GA4 full-pipeline to Realtime API', () => {
  test.skip(
    () => !GA4_PROPERTY_ID || !loadAccessToken(),
    'GA4 credentials not ready — source ~/.claude/secrets.env and refresh token'
  );

  test(
    'page_view hits land in GA4 Realtime after live-site navigation',
    async ({ page }) => {
      const accessToken = loadAccessToken()!;

      const baselineViews = await queryRealtimePageViews(accessToken);
      console.log(`Baseline GA4 Realtime pageViews (last 29 min): ${baselineViews}`);

      await page.goto(LIVE_URL, { waitUntil: 'load' });
      await page.waitForTimeout(2000); // let analytics scripts initialize post-load

      const blogLink = page.locator('a[href="/blog"]').first();
      await blogLink.click();
      await page.waitForURL(`${LIVE_URL}/blog`, { timeout: 10_000 });
      await page.waitForTimeout(2000); // let analytics scripts initialize post-load

      // Poll GA4 Realtime for up to 30s
      let realtimeViews = baselineViews;
      const started = Date.now();

      while (Date.now() - started < POLL_TIMEOUT_MS) {
        await page.waitForTimeout(POLL_INTERVAL_MS);
        realtimeViews = await queryRealtimePageViews(accessToken);
        const elapsed = Math.round((Date.now() - started) / 1000);
        console.log(
          `[${elapsed}s] GA4 Realtime: ${realtimeViews} pageViews (baseline: ${baselineViews})`
        );
        if (realtimeViews > baselineViews) break;
      }

      // Informational — log result but never fail CI.
      // Headless Playwright traffic is filtered by GA4 bot detection.
      // Run with --headed to get real results from a non-headless Chrome session.
      if (realtimeViews > baselineViews) {
        console.log(
          `✓ Full pipeline verified: GA4 Realtime +${realtimeViews - baselineViews} pageViews`
        );
      } else {
        console.warn(
          `⚠ GA4 Realtime still at baseline after ${POLL_TIMEOUT_MS / 1000}s. ` +
            `Likely bot-filtered (headless). Re-run with --headed to verify full pipeline.`
        );
      }
    },
    { timeout: 90_000 }
  );
});
