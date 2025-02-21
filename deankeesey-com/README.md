# Modern Astro Stack Template

A high-performance, developer-friendly template for modern web applications built with Astro. This template provides a solid foundation with best practices for type safety, performance, and maintainability.

## 🚀 Features

### Core Technologies
- **Astro 4.x** - Static Site Generation with Islands Architecture
- **React 19.x** - For interactive components
- **TypeScript 5.x** - With strict mode enabled
- **TailwindCSS** - With typography plugin and dark mode
- **ShadcN UI** - Accessible component library
- **MDX** - For content management

### Development Experience
- **ESLint** - Customized for Astro and React
- **Prettier** - Code formatting with plugins
- **Husky** - Git hooks for code quality
- **Path Aliases** - Clean and maintainable imports
- **Content Collections** - Type-safe content management

### Build Optimizations
- Optimized asset bundling
- CSS minification with lightningcss
- React vendor chunking
- HTML compression
- Dark mode support
- Typography optimization

## 📁 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/     # React and Astro components
│   ├── content/        # MDX content collections
│   │   ├── blog/
│   │   └── projects/
│   ├── layouts/        # Page layouts
│   ├── pages/          # Astro pages
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
└── tsconfig.json      # TypeScript configuration
```

## 🛠️ Getting Started

1. Clone this template:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check for code issues
- `npm run lint:fix` - Fix code issues
- `npm run format` - Format code with Prettier

## 🔧 Configuration

- **TypeScript** - Strict mode, path aliases, and enhanced type checking
- **Tailwind** - Custom color schemes, typography, and dark mode
- **Astro** - Optimized build settings and performance configurations
- **ESLint** - Custom ruleset for Astro and React
- **Prettier** - Configured with Tailwind plugin

## 📚 Documentation

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [ShadcN UI Documentation](https://ui.shadcn.com)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
