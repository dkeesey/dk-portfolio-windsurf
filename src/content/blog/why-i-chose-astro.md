---
title: "Why I Chose Astro for My Portfolio Site"
description: "The benefits of using Astro for content-focused websites, including performance advantages, the islands architecture, and integration with modern tools."
publishDate: 2024-01-20
tags: ["astro", "web development", "performance", "SSR", "jamstack"]
image: "/images/blog/astro-benefits.jpg"
readingTime: 5
author: "Dean Keesey"
---

# Why I Chose Astro for My Portfolio Site

When rebuilding my portfolio website, I wanted a framework that would deliver exceptional performance while still allowing me to use modern development tools and techniques. After evaluating several options, I chose Astro, and it has proven to be an excellent decision.

## The Performance Problem

Most modern JavaScript frameworks are designed primarily for building web applications, not content sites. This often results in portfolios and blogs that:

1. Send megabytes of JavaScript to the browser
2. Take seconds to become interactive
3. Score poorly on Core Web Vitals
4. Rank lower in search results due to performance issues

As a developer who cares about user experience, I wanted to avoid these problems while still having a modern development experience.

## Enter Astro: The Content-Focused Framework

Astro takes a fundamentally different approach than frameworks like Next.js or Gatsby. Its philosophy is simple: ship less JavaScript by default.

Astro's architecture (sometimes called "islands" architecture) allows you to:

1. Render most content as static HTML on the server
2. Hydrate only the interactive components that need it
3. Choose the framework for each component (React, Vue, Svelte, etc.)
4. Control exactly when components load and hydrate

This approach is perfect for a portfolio site where most content doesn't need client-side interactivity.

## Real-World Performance Results

After moving my portfolio to Astro, the performance improvements were dramatic:

| Metric | Previous Site (Next.js) | Current Site (Astro) |
|--------|-------------------------|----------------------|
| JS Bundle Size | 287KB | 31KB |
| Largest Contentful Paint | 2.7s | 0.9s |
| Time to Interactive | 3.2s | 1.1s |
| Lighthouse Score | 78 | 98 |

These improvements aren't just theoretical - they translate to a dramatically better user experience, especially on mobile devices and slower connections.

## Partial Hydration: The Secret Sauce

The most powerful feature of Astro is its approach to hydration. Let me show you how I used it in my site's contact form:

```astro
---
// Contact.astro
import ContactForm from '../components/forms/ContactForm.tsx';
import ContactInfo from '../components/ContactInfo.astro';
import { Container } from '../components/ui/container.tsx';
---

<Container as="section" className="py-12">
  <h2 class="text-3xl font-bold mb-6">Get in Touch</h2>
  
  <div class="grid md:grid-cols-2 gap-8">
    <!-- This component never ships JS to the client -->
    <ContactInfo />
    
    <!-- This component only hydrates when visible -->
    <ContactForm client:visible />
  </div>
</Container>
```

The `client:visible` directive tells Astro to:
1. Initially render the form as static HTML
2. Load its JavaScript only when it becomes visible
3. Hydrate it only when needed

Astro offers several client directives:
- `client:load` - Hydrate immediately on page load
- `client:visible` - Hydrate when visible in viewport
- `client:idle` - Hydrate when the browser is idle
- `client:media` - Hydrate when a media query matches
- `client:only` - Skip server rendering entirely

This level of control is a game-changer for performance.

## Content Collections: Type-Safe Content

Another standout feature is Astro's content collections. For my project showcase section, I defined a schema for projects:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    categories: z.array(z.string()).default([]),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    publishDate: z.date().optional(),
  }),
});

export const collections = {
  projects: projectCollection,
};
```

This gives me type-safe content with validation, autocomplete, and error checking - a huge improvement over working with unstructured Markdown files.

## The Best of Both Worlds: Static + Dynamic

While I primarily use Astro for static site generation, it also supports server-side rendering when needed. This hybrid approach allows me to:

1. Pre-render most pages for maximum performance
2. Use server endpoints for dynamic features like contact forms
3. Implement server-side authentication when needed
4. Fetch fresh data for specific components

For example, my project filter system uses a mix of static and dynamic approaches:

```astro
---
// src/pages/projects/index.astro
import { getCollection } from 'astro:content';
import ProjectFilters from '../../components/projects/ProjectFilters.tsx';
import ProjectGrid from '../../components/projects/ProjectGrid.astro';

// Get all projects at build time
const allProjects = await getCollection('projects', (project) => {
  return import.meta.env.PROD ? !project.data.draft : true;
});

// Sort projects with featured ones first
const sortedProjects = allProjects.sort((a, b) => {
  if (a.data.featured && !b.data.featured) return -1;
  if (!a.data.featured && b.data.featured) return 1;
  return 0;
});

// Extract all unique technologies and categories for filters
const technologies = [...new Set(
  allProjects.flatMap(project => project.data.technologies)
)];

const categories = [...new Set(
  allProjects.flatMap(project => project.data.categories)
)];
---

<Layout>
  <Container>
    <!-- Client-side filtering with all data loaded at build time -->
    <ProjectFilters 
      technologies={technologies}
      categories={categories}
      client:idle
    />
    
    <!-- Pre-rendered grid of all projects -->
    <ProjectGrid projects={sortedProjects} />
  </Container>
</Layout>
```

This approach delivers instant initial page loads while still providing interactive filtering without additional server requests.

## Framework Integration and UI Components

Despite Astro's focus on static content, it works seamlessly with React components. I use React for interactive elements like:

- The image carousel in project details
- The contact form with validation
- The filter system for projects
- The theme switcher for dark/light mode

For UI components, I integrated Tailwind CSS and shadcn/ui, which work perfectly with Astro. This gives me a robust design system without reinventing the wheel.

## Deployment and Development Experience

Astro sites can be deployed nearly anywhere. I chose Netlify for its simple deployment process, excellent performance, and serverless functions support.

The development experience has been excellent:

- Fast HMR (Hot Module Replacement)
- Great error messages
- Simple configuration
- Excellent documentation
- Growing ecosystem of integrations

## Conclusion: The Right Tool for the Job

The web development ecosystem offers many excellent frameworks, but choosing the right one for your specific needs is crucial. For a content-focused site like my portfolio, Astro's approach of shipping minimal JavaScript while still enabling modern development practices has been ideal.

If you're building a portfolio, blog, or marketing site, I highly recommend giving Astro a try. Your visitors will appreciate the performance, and you'll enjoy the development experience.

Are you using Astro for your projects? I'd love to hear about your experience in the comments below.
