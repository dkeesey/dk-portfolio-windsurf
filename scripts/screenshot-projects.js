#!/usr/bin/env node

/**
 * Project Screenshot Generator
 * 
 * Takes screenshots of project websites and processes them via Cloudinary
 * for use in the portfolio project cards.
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project URLs to screenshot
const projects = [
  {
    name: 'masumi-hayashi-archive',
    url: 'https://gallery.masumihayashi.com',
    title: 'Masumi Hayashi Digital Archive'
  },
  {
    name: 'megan-gredesky-therapy',
    url: 'https://megangredesky.com',
    title: 'Therapist Practice SEO'
  },
  {
    name: 'kanitha-for-oakland',
    url: 'https://kanithaforoakland.com',
    title: 'Political Campaign Website'
  },
  {
    name: 'sticking-place-security',
    url: 'https://thestickingplace.com',
    title: 'WordPress Security Remediation'
  },
  {
    name: 'strangeland-analytics',
    url: 'https://strangelandcomics.com',
    title: 'GA4 Analytics Implementation'
  }
];

async function takeScreenshot(project) {
  console.log(`📸 Taking screenshot of ${project.title}...`);
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1200,
      height: 800,
      deviceScaleFactor: 2 // High DPI for crisp images
    }
  });

  try {
    const page = await browser.newPage();
    
    // Set user agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
    
    // Navigate to the page
    await page.goto(project.url, { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait a bit for any animations/lazy loading
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), 'public', 'images', 'projects');
    await fs.mkdir(outputDir, { recursive: true });

    // Take screenshot
    const filename = `${project.name}-screenshot.png`;
    const filepath = path.join(outputDir, filename);
    
    await page.screenshot({
      path: filepath,
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 800
      }
    });

    console.log(`✅ Screenshot saved: ${filename}`);
    
    return {
      name: project.name,
      filename,
      filepath,
      title: project.title
    };

  } catch (error) {
    console.error(`❌ Failed to screenshot ${project.title}:`, error.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🚀 Starting project screenshot generation...\n');

  const results = [];
  
  // Take screenshots sequentially to avoid overwhelming servers
  for (const project of projects) {
    const result = await takeScreenshot(project);
    if (result) {
      results.push(result);
    }
    
    // Brief pause between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`\n📊 Screenshots completed: ${results.length}/${projects.length}`);
  
  if (results.length > 0) {
    console.log('\n📋 Generated files:');
    results.forEach(result => {
      console.log(`  • ${result.filename} (${result.title})`);
    });
    
    console.log('\n🎨 Next steps:');
    console.log('  1. Upload screenshots to Cloudinary');
    console.log('  2. Update project card image URLs');
    console.log('  3. Optimize image sizes for cards');
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { takeScreenshot, projects };
