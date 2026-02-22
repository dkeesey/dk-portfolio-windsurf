const { chromium } = require('playwright');

(async () => {
  let stepNumber = 1;
  const steps = [];
  const storyName = 'analytics-smoke';
  const url = 'https://deankeesey.com';
  let browser;
  const consoleErrors = [];

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (/TypeError|ReferenceError|SyntaxError|Uncaught/.test(text) && !/Failed to load resource|net::ERR|401|403|404|500/.test(text)) {
          consoleErrors.push(text);
        }
      }
    });

    // 1. Navigate to the homepage
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    process.stderr.write(`[STEP ${stepNumber}] Navigate to the homepage -> PASS\n`);
    steps.push({ step: stepNumber, action: 'Navigate to the homepage', result: 'PASS' });
    stepNumber++;

    // 2. Verify window.gtag is defined as a function
    const isGtagFunction = await page.evaluate(() => typeof window.gtag === 'function');
    if (!isGtagFunction) throw new Error('window.gtag is not a function');
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    process.stderr.write(`[STEP ${stepNumber}] Verify window.gtag is defined as a function -> PASS\n`);
    steps.push({ step: stepNumber, action: 'Verify window.gtag is defined as a function', result: 'PASS' });
    stepNumber++;

    // 3. Verify window.dataLayer exists and has at least one entry
    const dlSize = await page.evaluate(() => Array.isArray(window.dataLayer) ? window.dataLayer.length : -1);
    if (dlSize < 1) throw new Error(`window.dataLayer invalid or empty: ${dlSize}`);
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    process.stderr.write(`[STEP ${stepNumber}] Verify window.dataLayer exists and has at least one entry -> PASS\n`);
    steps.push({ step: stepNumber, action: 'Verify window.dataLayer exists and has at least one entry', result: 'PASS' });
    stepNumber++;

    // 4. Verify a script tag loading from googletagmanager.com is present in the DOM
    const gtmScript = page.locator('script[src*="googletagmanager.com"]').first();
    await gtmScript.waitFor({ state: 'attached', timeout: 5000 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    process.stderr.write(`[STEP ${stepNumber}] Verify script tag from googletagmanager.com -> PASS\n`);
    steps.push({ step: stepNumber, action: 'Verify script tag from googletagmanager.com', result: 'PASS' });
    stepNumber++;

    // 5. Verify a script tag loading from clarity.ms is present in the DOM
    const clarityScript = page.locator('script[src*="clarity.ms"]').first();
    await clarityScript.waitFor({ state: 'attached', timeout: 5000 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    process.stderr.write(`[STEP ${stepNumber}] Verify script tag from clarity.ms -> PASS\n`);
    steps.push({ step: stepNumber, action: 'Verify script tag from clarity.ms', result: 'PASS' });
    stepNumber++;

    // 6. Verify the string "G-R99SBB9SQKX" does not appear anywhere in the page source
    const pageSource = await page.content();
    if (pageSource.includes('G-R99SBB9SQKX')) throw new Error('Found wrong-site GA4 ID G-R99SBB9SQKX');
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    process.stderr.write(`[STEP ${stepNumber}] Verify forbidden GA4 ID is absent -> PASS\n`);
    steps.push({ step: stepNumber, action: 'Verify forbidden GA4 ID is absent', result: 'PASS' });
    stepNumber++;

    // 7. Verify no console errors mentioning gtag, dataLayer, or clarity
    const relevantErrors = consoleErrors.filter(err => /gtag|dataLayer|clarity/i.test(err));
    if (relevantErrors.length > 0) throw new Error(`Relevant console errors found: ${relevantErrors.join(', ')}`);
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    process.stderr.write(`[STEP ${stepNumber}] Verify no relevant console errors -> PASS\n`);
    steps.push({ step: stepNumber, action: 'Verify no relevant console errors', result: 'PASS' });
    stepNumber++;

    // Record dataLayer state for comparison
    const dlBefore = await page.evaluate(() => window.dataLayer.length);

    // 8. Click the Blog navigation link to trigger a ClientRouter soft navigation
    const blogLink = page.locator('a:has-text("Blog")').first();
    await blogLink.click();
    await page.waitForTimeout(2000); // Wait for transition
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    process.stderr.write(`[STEP ${stepNumber}] Click the Blog navigation link -> PASS\n`);
    steps.push({ step: stepNumber, action: 'Click the Blog navigation link', result: 'PASS' });
    stepNumber++;

    // 9. Verify the URL changes to /blog without a full page reload
    const currentUrl = page.url();
    if (!currentUrl.includes('/blog')) throw new Error(`URL did not change to /blog. Current: ${currentUrl}`);
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    process.stderr.write(`[STEP ${stepNumber}] Verify the URL changes to /blog -> PASS\n`);
    steps.push({ step: stepNumber, action: 'Verify the URL changes to /blog', result: 'PASS' });
    stepNumber++;

    // 10. Verify window.dataLayer has grown
    const dlAfter = await page.evaluate(() => window.dataLayer.length);
    if (dlAfter <= dlBefore) throw new Error(`dataLayer length did not increase. Before: ${dlBefore}, After: ${dlAfter}`);
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    process.stderr.write(`[STEP ${stepNumber}] Verify window.dataLayer has grown -> PASS\n`);
    steps.push({ step: stepNumber, action: 'Verify window.dataLayer has grown', result: 'PASS' });
    stepNumber++;

    // 11. Verify window.gtag is still defined after the soft navigation
    const isGtagStillFunction = await page.evaluate(() => typeof window.gtag === 'function');
    if (!isGtagStillFunction) throw new Error('window.gtag lost after navigation');
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    process.stderr.write(`[STEP ${stepNumber}] Verify window.gtag is still defined -> PASS\n`);
    steps.push({ step: stepNumber, action: 'Verify window.gtag is still defined', result: 'PASS' });
    stepNumber++;

    await browser.close();
    process.stdout.write(JSON.stringify({
      story: storyName,
      url: url,
      result: 'PASS',
      steps: steps
    }) + '\n');
    process.exit(0);

  } catch (err) {
    process.stderr.write(`[STEP ${stepNumber}] Workflow -> FAIL: ${err.message}\n`);
    if (browser) await browser.close();
    process.stdout.write(JSON.stringify({
      story: storyName,
      url: url,
      result: 'FAIL',
      steps: [...steps, { step: stepNumber, action: 'Workflow execution', result: `FAIL: ${err.message}` }]
    }) + '\n');
    process.exit(1);
  }
})();
