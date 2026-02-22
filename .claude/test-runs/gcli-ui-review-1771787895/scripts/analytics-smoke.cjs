const { chromium } = require('playwright');

(async () => {
  const url = 'https://deankeesey.com';
  const storyName = 'analytics-smoke';
  let stepNumber = 1;
  const steps = [];
  const consoleErrors = [];

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (/TypeError|ReferenceError|SyntaxError|Uncaught/.test(text) && 
            !/Failed to load resource|net::ERR|401|403|404|500/.test(text)) {
          if (/gtag|dataLayer|clarity/.test(text)) {
            consoleErrors.push(text);
          }
        }
      }
    });

    page.on('pageerror', err => {
      const text = err.message;
      if (/gtag|dataLayer|clarity/.test(text)) {
        consoleErrors.push(text);
      }
    });

    // 1. Navigate to the homepage
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    steps.push({ step: stepNumber, action: 'Navigate to the homepage', result: 'PASS' });
    process.stderr.write(`[STEP ${stepNumber}] Navigate to the homepage -> PASS\n`);
    stepNumber++;

    // 2. Verify window.gtag is defined as a function
    const isGtagFunc = await page.evaluate(() => typeof window.gtag === 'function');
    if (!isGtagFunc) throw new Error('window.gtag is not a function');
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    steps.push({ step: stepNumber, action: 'Verify window.gtag is defined as a function', result: 'PASS' });
    process.stderr.write(`[STEP ${stepNumber}] Verify window.gtag is defined as a function -> PASS\n`);
    stepNumber++;

    // 3. Verify window.dataLayer exists and has at least one entry
    const dlInfo = await page.evaluate(() => {
      return {
        exists: Array.isArray(window.dataLayer),
        length: Array.isArray(window.dataLayer) ? window.dataLayer.length : 0
      };
    });
    if (!dlInfo.exists || dlInfo.length === 0) throw new Error('window.dataLayer invalid or empty');
    const initialDLLength = dlInfo.length;
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    steps.push({ step: stepNumber, action: 'Verify window.dataLayer exists and has at least one entry', result: 'PASS' });
    process.stderr.write(`[STEP ${stepNumber}] Verify window.dataLayer exists and has at least one entry -> PASS\n`);
    stepNumber++;

    // 4. Verify googletagmanager.com script
    const gtmLoc = page.locator('script[src*="googletagmanager.com"]').first();
    await gtmLoc.waitFor({ state: 'attached', timeout: 10000 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    steps.push({ step: stepNumber, action: 'Verify googletagmanager.com script', result: 'PASS' });
    process.stderr.write(`[STEP ${stepNumber}] Verify googletagmanager.com script -> PASS\n`);
    stepNumber++;

    // 5. Verify clarity.ms script
    const clarityLoc = page.locator('script[src*="clarity.ms"]').first();
    await clarityLoc.waitFor({ state: 'attached', timeout: 10000 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    steps.push({ step: stepNumber, action: 'Verify clarity.ms script', result: 'PASS' });
    process.stderr.write(`[STEP ${stepNumber}] Verify clarity.ms script -> PASS\n`);
    stepNumber++;

    // 6. Verify "G-R99SBB9SQKX" not present
    const pageHtml = await page.content();
    if (pageHtml.includes('G-R99SBB9SQKX')) throw new Error('Incorrect GA4 ID G-R99SBB9SQKX found');
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    steps.push({ step: stepNumber, action: 'Verify wrong GA4 ID not present', result: 'PASS' });
    process.stderr.write(`[STEP ${stepNumber}] Verify wrong GA4 ID not present -> PASS\n`);
    stepNumber++;

    // 7. Verify no console errors
    if (consoleErrors.length > 0) throw new Error('Found console errors: ' + consoleErrors[0]);
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    steps.push({ step: stepNumber, action: 'Verify no console errors', result: 'PASS' });
    process.stderr.write(`[STEP ${stepNumber}] Verify no console errors -> PASS\n`);
    stepNumber++;

    // 8. Click Blog navigation link
    const blogBtn = page.locator('a:has-text("Blog")').first();
    await blogBtn.click();
    await page.waitForTimeout(2000); 
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    steps.push({ step: stepNumber, action: 'Click Blog navigation link', result: 'PASS' });
    process.stderr.write(`[STEP ${stepNumber}] Click Blog navigation link -> PASS\n`);
    stepNumber++;

    // 9. Verify URL changes to /blog
    if (!page.url().includes('/blog')) throw new Error('URL did not change to /blog');
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    steps.push({ step: stepNumber, action: 'Verify URL changes to /blog', result: 'PASS' });
    process.stderr.write(`[STEP ${stepNumber}] Verify URL changes to /blog -> PASS\n`);
    stepNumber++;

    // 10. Verify dataLayer grown
    const finalDLLength = await page.evaluate(() => window.dataLayer.length);
    if (finalDLLength <= initialDLLength) throw new Error('dataLayer did not grow');
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    steps.push({ step: stepNumber, action: 'Verify window.dataLayer has grown', result: 'PASS' });
    process.stderr.write(`[STEP ${stepNumber}] Verify window.dataLayer has grown -> PASS\n`);
    stepNumber++;

    // 11. Verify window.gtag still defined
    const isGtagStillFunc = await page.evaluate(() => typeof window.gtag === 'function');
    if (!isGtagStillFunc) throw new Error('window.gtag lost after navigation');
    await page.waitForTimeout(300);
    await page.screenshot({ path: process.env.SCREENSHOTS_DIR + '/step_' + stepNumber + '.png', fullPage: false });
    steps.push({ step: stepNumber, action: 'Verify window.gtag still defined', result: 'PASS' });
    process.stderr.write(`[STEP ${stepNumber}] Verify window.gtag still defined -> PASS\n`);
    stepNumber++;

    process.stdout.write(JSON.stringify({
      story: storyName,
      url: url,
      result: 'PASS',
      steps: steps
    }) + '\n');
    await browser.close();
    process.exit(0);

  } catch (err) {
    const errorMsg = err.message;
    process.stderr.write(`[STEP ${stepNumber}] Execution -> FAIL: ${errorMsg}\n`);
    process.stdout.write(JSON.stringify({
      story: storyName,
      url: url,
      result: 'FAIL',
      steps: steps.concat([{ step: stepNumber, action: 'Step ' + stepNumber, result: 'FAIL: ' + errorMsg }])
    }) + '\n');
    if (browser) await browser.close();
    process.exit(1);
  }
})();
