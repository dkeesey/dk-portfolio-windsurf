# Portfolio Website Development Meta-Prompt for Dean Keesey

## Project Vision

Creating a high-performance, developer-friendly portfolio that showcases Dean's expertise in modern web development, with a focus on DX, performance, and clean architecture.

## Core Technologies

- Astro 4.x (Static Site Generation)
- React 18+ (Interactive Islands)
- TailwindCSS 3.x
- TypeScript 5.x
- ShadcN UI Components

## Architecture Principles

- Islands Architecture for optimal performance
- Type-safe throughout
- Component-driven development
- Mobile-first responsive design
- Performance budget targets:
  - Lighthouse Performance: 95+
  - First Contentful Paint: < 1.2s
  - Time to Interactive: < 2.5s

## Project Phases & Tasks

### 1. Foundation Setup

- [ ] Initialize Astro project with TypeScript
- [ ] Configure development environment
  - ESLint with custom ruleset
  - Prettier with Tailwind plugin
  - Husky for pre-commit hooks
  - VSCode settings sync
- [ ] Set up core dependencies
  - React
  - TailwindCSS
  - ShadcN UI
  - MDX
  - ContentLayer for type-safe content
- [ ] Configure build tooling
  - astro.config.mjs optimization
  - Tailwind purge settings
  - TypeScript strict mode
  - Bundle analysis setup

### 2. Core Infrastructure

- [ ] Implement atomic design system
  - Typography scale
  - Color system
  - Spacing units
  - Component primitives
- [ ] Set up layouts
  - Base layout with islands
  - Blog post layout
  - Project showcase layout
- [ ] Configure performance monitoring
  - Vercel Analytics
  - Web Vitals tracking
  - Custom performance metrics
- [ ] Implement SEO architecture
  - Dynamic meta tags
  - JSON-LD structured data
  - Sitemap generation
  - RSS feed

### 3. Feature Implementation

- [ ] Build interactive components
  - Hero section with particle effects
  - Experience timeline with animations
  - Technical skills matrix
  - Project cards with filtering
  - Contact form with validation
- [ ] Create content management system
  - MDX processing
  - Content collections
  - Category system
  - Search functionality
- [ ] Implement dark mode
  - System preference detection
  - Smooth transitions
  - Persistent preference storage

### 4. Performance Optimization

- [ ] Image optimization pipeline
  - Responsive images
  - Next-gen formats
  - Lazy loading strategy
- [ ] JavaScript optimization
  - Code splitting
  - Dynamic imports
  - Bundle size monitoring
- [ ] CSS optimization
  - Critical CSS extraction
  - Unused CSS removal
  - Animation performance

### 5. Testing & Quality Assurance

- [ ] Implement testing suite
  - Component tests (Vitest)
  - E2E tests (Playwright)
  - Lighthouse CI
- [ ] Accessibility compliance
  - WCAG 2.1 AA standards
  - Keyboard navigation
  - Screen reader testing
- [ ] Cross-browser testing
  - Modern browsers
  - Mobile devices
  - Progressive enhancement

### 6. Deployment & Monitoring

- [ ] Configure Vercel deployment
  - Environment variables
  - Build caching
  - Edge functions setup
- [ ] Set up monitoring
  - Error tracking
  - Performance monitoring
  - User analytics
- [ ] Documentation
  - README updates
  - Component documentation
  - Deployment guides
