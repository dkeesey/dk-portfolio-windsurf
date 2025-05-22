#!/usr/bin/env node

/**
 * Retake Kanitha Screenshot - Focused Version
 * 
 * Captures a better screenshot of the Kanitha for Oakland website
 * focused on the candidate section rather than any video content.
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function retakeKanithaScreenshot() {
  console.log('📸 Retaking Kanitha for Oakland screenshot with better focus...');
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1200,
      height: 800,
      deviceScaleFactor: 2
    }
  });

  try {
    const page = await browser.newPage();
    
    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
    
    // Navigate to the page
    console.log('🌐 Loading kanithaforoakland.com...');
    await page.goto('https://kanithaforoakland.com', { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Try to scroll down to find the candidate section
    console.log('📜 Looking for candidate introduction section...');
    
    // Look for Kanitha's section - try different possible selectors
    const candidateSection = await page.$eval('*', () => {
      // Look for text containing "I'm Kanitha" or "Kanitha Matourey"
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      let node;
      while (node = walker.nextNode()) {
        if (node.textContent && 
            (node.textContent.includes("I'm Kanitha") || 
             node.textContent.includes("Kanitha Matourey") ||
             node.textContent.includes("Candidate for Oakland"))) {
          const element = node.parentElement;
          const rect = element.getBoundingClientRect();
          return {
            found: true,
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            element: element.tagName
          };
        }
      }
      return { found: false };
    });

    if (candidateSection.found) {
      console.log('✅ Found candidate section, scrolling to position...');
      // Scroll to center the candidate section
      await page.evaluate((top) => {
        window.scrollTo(0, Math.max(0, top - 200));
      }, candidateSection.top);
      
      // Wait for scroll to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
      console.log('⚠️  Candidate section not found, trying manual scroll...');
      // Scroll down a bit to get past any hero video
      await page.evaluate(() => {
        window.scrollTo(0, 400);
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Try to hide any video overlays or pause videos
    await page.evaluate(() => {
      // Pause any videos
      document.querySelectorAll('video').forEach(video => {
        video.pause();
        video.style.display = 'none';
      });
      
      // Hide common overlay elements
      document.querySelectorAll('.video-overlay, .modal, .popup').forEach(el => {
        el.style.display = 'none';
      });
    });

    // Wait a moment for changes to take effect
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create output directory
    const outputDir = path.join(process.cwd(), 'public', 'images', 'projects');
    await fs.mkdir(outputDir, { recursive: true });

    // Take the new screenshot
    const filename = 'kanitha-for-oakland-screenshot.png';
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

    console.log(`✅ New screenshot saved: ${filename}`);
    console.log('🎯 Focused on candidate introduction section');
    
    return { success: true, filename, filepath };

  } catch (error) {
    console.error(`❌ Failed to retake screenshot:`, error.message);
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🔄 Retaking Kanitha for Oakland screenshot with better focus...\n');
  
  const result = await retakeKanithaScreenshot();
  
  if (result.success) {
    console.log('\n✨ Screenshot updated successfully!');
    console.log('📋 Next steps:');
    console.log('  1. Check the new screenshot in /public/images/projects/');
    console.log('  2. If it looks good, commit and push the changes');
    console.log('  3. The updated image will automatically deploy');
  } else {
    console.log('\n❌ Screenshot update failed:', result.error);
    console.log('💡 You may need to manually capture this screenshot');
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { retakeKanithaScreenshot };
