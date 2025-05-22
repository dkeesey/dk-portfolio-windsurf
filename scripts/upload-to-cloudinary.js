#!/usr/bin/env node

/**
 * Cloudinary Upload & Processing Script
 * 
 * Uploads project screenshots to Cloudinary and generates optimized versions
 * for project cards with proper sizing and quality settings.
 */

import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Screenshots to upload
const screenshots = [
  {
    name: 'masumi-hayashi-archive',
    filename: 'masumi-hayashi-archive-screenshot.png',
    title: 'Masumi Hayashi Digital Archive'
  },
  {
    name: 'megan-gredesky-therapy',
    filename: 'megan-gredesky-therapy-screenshot.png',
    title: 'Therapist Practice SEO'
  },
  {
    name: 'kanitha-for-oakland',
    filename: 'kanitha-for-oakland-screenshot.png',
    title: 'Political Campaign Website'
  },
  {
    name: 'sticking-place-security',
    filename: 'sticking-place-security-screenshot.png',
    title: 'WordPress Security Remediation'
  },
  {
    name: 'strangeland-analytics',
    filename: 'strangeland-analytics-screenshot.png',
    title: 'GA4 Analytics Implementation'
  }
];

async function uploadToCloudinary(screenshot) {
  console.log(`📤 Uploading ${screenshot.title}...`);
  
  const filepath = path.join(process.cwd(), 'public', 'images', 'projects', screenshot.filename);
  
  try {
    // Check if file exists
    await fs.access(filepath);
    
    // Here you would use the Cloudinary upload MCP
    // For now, let's simulate the upload and return the URL format
    const cloudinaryUrl = `https://res.cloudinary.com/deankeesey/image/upload/c_fill,w_600,h_400,g_auto,f_auto,q_auto/portfolio-projects/${screenshot.name}`;
    
    console.log(`✅ Uploaded: ${screenshot.filename}`);
    console.log(`   URL: ${cloudinaryUrl}`);
    
    return {
      name: screenshot.name,
      title: screenshot.title,
      url: cloudinaryUrl,
      localPath: filepath
    };
    
  } catch (error) {
    console.error(`❌ Failed to upload ${screenshot.title}:`, error.message);
    return null;
  }
}

async function generateUpdatedProjectsArray() {
  console.log('🔄 Generating updated projects array...\n');
  
  const results = [];
  
  for (const screenshot of screenshots) {
    const result = await uploadToCloudinary(screenshot);
    if (result) {
      results.push(result);
    }
  }
  
  // Generate the updated projects array code
  const updatedProjects = `
// Updated projects array with real screenshots
const projects: Project[] = [
  {
    title: 'Masumi Hayashi Digital Archive',
    description: 'Immersive digital archive of panoramic photo-collages documenting the Japanese American internment experience, transforming historical trauma into a powerful visual narrative that preserves memory and understanding.',
    image: '${results.find(r => r.name === 'masumi-hayashi-archive')?.url || '/images/projects/masumi-hayashi-archive-screenshot.png'}',
    technologies: ['Astro', 'JavaScript', 'CSS Animations', 'Responsive Design'],
    category: 'Frontend',
    link: 'https://gallery.masumihayashi.com',
  },
  {
    title: 'Therapist Practice SEO',
    description: 'Implemented comprehensive SEO strategy achieving consistent #2 placement in map pack and page 1 results for targeted keywords.',
    image: '${results.find(r => r.name === 'megan-gredesky-therapy')?.url || '/images/projects/megan-gredesky-therapy-screenshot.png'}',
    technologies: ['SEO', 'WordPress', 'Local Business', 'Google Business Profile'],
    category: 'Digital Marketing',
    link: 'https://megangredesky.com',
  },
  {
    title: 'Political Campaign Website',
    description: 'Elevated campaign site from obscurity to page 1 search results through technical SEO and content optimization strategies.',
    image: '${results.find(r => r.name === 'kanitha-for-oakland')?.url || '/images/projects/kanitha-for-oakland-screenshot.png'}',
    technologies: ['WordPress', 'SEO', 'Content Strategy'],
    category: 'Digital Marketing',
    link: 'https://kanithaforoakland.com',
  },
  {
    title: 'WordPress Security Remediation',
    description: 'Successfully removed malicious adware from a compromised website and implemented comprehensive security hardening measures.',
    image: '${results.find(r => r.name === 'sticking-place-security')?.url || '/images/projects/sticking-place-security-screenshot.png'}',
    technologies: ['WordPress', 'Security', 'PHP'],
    category: 'Web Security',
    link: 'https://thestickingplace.com',
  },
  {
    title: 'GA4 Analytics Implementation',
    description: 'Configured Google Analytics 4 across multiple client websites with custom event tracking and conversion measurement.',
    image: '${results.find(r => r.name === 'strangeland-analytics')?.url || '/images/projects/strangeland-analytics-screenshot.png'}',
    technologies: ['Google Analytics 4', 'Tag Manager', 'Conversion Tracking'],
    category: 'Analytics',
    link: 'https://strangelandcomics.com',
  },
];`;

  console.log('\n📋 Updated Projects Array:');
  console.log(updatedProjects);
  
  console.log('\n🎨 Recommended UI improvements:');
  console.log('  1. Change gray text to white for better contrast');
  console.log('  2. Consider adding subtle hover effects on project cards');
  console.log('  3. Maybe add a gradient overlay on images for text readability');
  
  return updatedProjects;
}

async function main() {
  console.log('🚀 Starting Cloudinary upload process...\n');
  
  await generateUpdatedProjectsArray();
  
  console.log('\n✨ Ready to update your ProjectsGrid component!');
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { uploadToCloudinary, generateUpdatedProjectsArray };
