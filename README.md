# DK Portfolio Windsurf

## UI Framework

This project uses the [ShadCN UI](https://ui.shadcn.com) component library, which is an unusual choice for an Astro project. ShadCN UI is built with Radix UI and Tailwind CSS.

While Astro doesn't officially support Tailwind CSS, this project integrates it to take advantage of the pre-built ShadCN UI components. This allows for rapid UI development while still leveraging Astro's performance optimizations.

Some key things to note about using ShadCN UI with Astro:
- Tailwind CSS is configured in `tailwind.config.js` 
- The ShadCN UI components are imported and used in Astro components
- Some custom Tailwind CSS styles may be needed to augment the ShadCN UI components
- Be mindful of Tailwind class usage to avoid unnecessary CSS bloat in production

## Supabase Integration

This project uses Supabase for backend functionality, including:

- **Database** - PostgreSQL database for storing application data
- **Authentication** - User authentication with email/password and GitHub OAuth
- **Row Level Security** - Secure access control for database tables

For detailed documentation about the Supabase integration, see [SUPABASE.md](./SUPABASE.md).

### Quick Reference

- **Supabase Project URL**: `https://clzvndqgtmbsugmdpdsq.supabase.co`
- **Database Schema**: Located in `src/lib/supabase.ts` (as TypeScript interfaces)
- **Helper Functions**: Various database operation functions in `src/lib/supabase.ts`
- **Test Script**: Run `node scripts/test-supabase.js` to test the Supabase connection

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in the required variables
4. Start the development server: `npm run dev`

## Documentation

- [UI Components](https://ui.shadcn.com/docs)
- [Supabase Integration](./SUPABASE.md)

## TypeScript and React Integration Issues

### Problem

This project encountered TypeScript errors related to React's forwardRef and hooks when using shadcn/ui components:

```
Property 'forwardRef' does not exist on type 'typeof import("react")'.
Type 'HTMLAttributes' is not generic.
```

These errors occur due to how TypeScript interprets React imports and are common in projects using React with strict TypeScript configurations.

### Current Solution

We implemented a pragmatic solution using `// @ts-ignore` comments before problematic lines in components like:
- `src/components/ui/table.tsx`
- `src/components/ui/select.tsx`
- `src/components/chatbot/hooks/useChat.ts`

This approach:
- Allows the code to build successfully
- Doesn't affect runtime behavior
- Is a common workaround in React projects with strict TypeScript settings

### Alternative Solutions

For a more type-safe approach, consider:

1. **Update tsconfig.json**: Modify TypeScript configuration to be less strict with React types:
   ```json
   {
     "compilerOptions": {
       "jsx": "react-jsx",
       "esModuleInterop": true,
       "skipLibCheck": true
     }
   }
   ```

2. **Use different import style**: Try alternative import patterns:
   ```typescript
   import React from 'react';
   // or
   import { forwardRef, useState } from 'react';
   ```

3. **Install specific @types/react**: Ensure you have the correct type definitions:
   ```bash
   npm install --save-dev @types/react@^18.0.0
   ```

4. **Use JSX namespace**: In some cases, using the JSX namespace can help:
   ```typescript
   const Component = React.forwardRef<HTMLDivElement, JSX.IntrinsicElements['div']>((props, ref) => {
     // Component code
   });
   ```
