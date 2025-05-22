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

## Component Architecture Guidelines

### React-Astro Integration Pattern
- Each UI component requires two implementations:
  1. React (.tsx) for client-side interactivity
  2. Astro (.astro) for server-side rendering
- Astro components must include:
  - Proper frontmatter delimiters (---)
  - TypeScript interfaces for props
  - Proper client:load directives where needed
  - Must follow this structure:
    ```astro
    ---
    // imports
    // interfaces
    // props destructuring
    ---
    
    // component template
    ```

### Component Organization
- Group components by functionality:
  - /ui: Base UI components
  - /layout: Structural components
  - /sections: Page-specific sections
  - /features: Feature-specific components
- Each component group should have:
  - Index file for exports
  - Consistent naming convention
  - Proper TypeScript types
  - Documentation comments

### Props Handling
- Use consistent interface naming (Props)
- Handle both class and className props
- Implement proper prop spreading
- Include proper TypeScript types
- Document required vs optional props

## Git Workflow Standards

### Commit Organization
- Group related components together
- Include associated utilities with components
- Use conventional commit format:
  - feat: New features
  - fix: Bug fixes
  - chore: Maintenance
  - docs: Documentation
  - style: Formatting
  - refactor: Code restructuring
  - test: Testing
- Include detailed bullet points in commit body
- Regular pushes to remote

### Branch Strategy
- Feature branches for new development
- Main branch for production code
- Regular rebasing to keep history clean
- Clear branch naming convention

## Project Phases & Tasks

### 1. Foundation Setup ✅

- [x] Initialize Astro project with TypeScript
- [x] Configure development environment
  - ESLint with custom ruleset
  - Prettier with Tailwind plugin
  - Husky for pre-commit hooks
  - VSCode settings sync
- [x] Set up core dependencies
  - React
  - TailwindCSS
  - ShadcN UI
  - MDX
  - ContentLayer for type-safe content
- [x] Configure build tooling
  - astro.config.mjs optimization
  - Tailwind purge settings
  - TypeScript strict mode
  - Bundle analysis setup

### 2. Core Infrastructure

#### 2.1 Design System Foundation
- [x] Define design tokens
  1. ✓ Colors (primary, secondary, accent, neutral)
  2. ✓ Typography (font families, sizes, weights)
  3. ✓ Spacing scale
  4. ✓ Breakpoints
  5. ✓ Shadows and elevations
  6. ✓ Border radiuses
  7. ✓ Animation timings

#### 2.2 Component Primitives
- [x] Set up base components
  1. ✓ Button
  2. ✓ Input
  3. ✓ Card
  4. ✓ Navigation (Header component)
  5. ✓ Typography components (via TypographyDemo)
  6. ✓ Container layouts
  7. ✓ Grid system

#### 2.3 Layout System
- [x] Create layout components
  1. ✓ Base layout shell
  2. ✓ Header component
  3. ✓ Footer component
  4. ✓ Main content area
  5. ✓ Sidebar (not needed for current design)
  6. ✓ Blog post layout
  7. ✓ Project showcase layout

#### 2.4 Performance & SEO Infrastructure
- [ ] Set up monitoring
  1. ✓ Install and configure Vercel Analytics
  2. ✓ Set up Web Vitals tracking
  3. ✓ Configure custom performance metrics
- [x] Implement SEO foundation
  1. ✓ Create SEO component
  2. ✓ Configure meta tags
  3. ✓ Set up JSON-LD
  4. ✓ Generate sitemap
  5. ✓ Create RSS feed

### 3. Feature Implementation

#### 3.1 Core Pages
- [x] Build essential pages
  1. ✓ Home page with hero section
  2. ✓ About page
  3. ✓ Projects listing
  4. ✓ Blog index
  5. ✓ Contact page

#### 3.2 Interactive Components
- [x] Develop interactive features
  1. ✓ Hero section animations
  2. ✓ Experience timeline
  3. ✓ Skills matrix
  4. ✓ Project filters
  5. ✓ Contact form
  6. ✓ Search functionality

#### 3.3 Content System
- [ ] Enhance content management
  1. ✓ MDX components
  2. ✓ Code syntax highlighting
  3. ⚡ Image optimization pipeline
    - ✓ Basic responsive images
    - ✓ Format conversion (webp, avif)
    - ✓ Lazy loading implementation
    - [ ] Art direction support
    - [ ] Placeholder generation
  4. ✓ Category system
  5. [ ] Related content system

#### 3.4 Theme System
- [ ] Implement theming
  1. Dark mode toggle
  2. Theme persistence
  3. System preference detection
  4. Transition animations

### 4. Performance Optimization

- [ ] Image optimization pipeline
  - ✓ Responsive images
  - ✓ Next-gen formats (webp, avif)
  - ✓ Lazy loading strategy
  - [ ] Placeholder images
  - [ ] Art direction
  - [ ] Image preloading for critical images
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

## Success Criteria
- Lighthouse score > 95
- TypeScript strict mode with no errors
- All interactive components work without JS enabled
- WCAG 2.1 AA compliant
- < 50kb initial JS bundle
- < 1.2s First Contentful Paint
