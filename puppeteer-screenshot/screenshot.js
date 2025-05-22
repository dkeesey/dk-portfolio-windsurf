const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Create the images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// List of projects to screenshot
const projects = [
  {
    url: 'https://gallery.masumihayashi.com',
    name: 'masumi-hayashi',
    viewport: { width: 1280, height: 800 }
  },
  {
    url: 'https://megangredesky.com',
    name: 'therapist-seo',
    viewport: { width: 1280, height: 800 }
  },
  {
    url: 'https://kanithaforoakland.com',
    name: 'campaign-website',
    viewport: { width: 1280, height: 800 }
  },
  {
    url: 'https://thestickingplace.com',
    name: 'wordpress-security',
    viewport: { width: 1280, height: 800 }
  },
  {
    url: 'https://strangelandcomics.com',
    name: 'analytics-implementation',
    viewport: { width: 1280, height: 800 }
  }
];

(async () => {
  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const project of projects) {
    try {
      console.log(`Capturing screenshot for ${project.url}`);
      
      // Create a new page
      const page = await browser.newPage();
      
      // Set viewport size
      await page.setViewport(project.viewport);
      
      // Navigate to the page with a timeout of 30 seconds
      await page.goto(project.url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait an additional 2 seconds for any animations to complete
      await page.waitForTimeout(2000);
      
      // Take screenshot
      const screenshotPath = path.join(imagesDir, `${project.name}.png`);
      await page.screenshot({ 
        path: screenshotPath,
        fullPage: false
      });
      
      console.log(`✅ Screenshot saved to ${screenshotPath}`);
      
      // Close the page
      await page.close();
    } catch (error) {
      console.error(`❌ Error capturing ${project.url}:`, error.message);
    }
  }
  
  // Close the browser
  await browser.close();
  console.log('All screenshots completed');
})();
