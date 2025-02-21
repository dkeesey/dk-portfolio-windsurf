/**
 * Design System Tokens
 * 
 * This follows Tailwind's default scale where applicable.
 * For values not provided by Tailwind, we maintain consistency
 * with Tailwind's design principles.
 */

export const tokens = {
  typography: {
    // Font families - using CSS variables for runtime customization
    fonts: {
      sans: 'var(--font-sans)',
      mono: 'var(--font-mono)',
      heading: 'var(--font-heading)',
    },
    // Font sizes - Tailwind defaults
    sizes: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
      '8xl': '6rem',     // 96px
      '9xl': '8rem',     // 128px
    },
    // Font weights - Tailwind defaults
    weights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    // Line heights - Tailwind defaults
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    // Letter spacing - Tailwind defaults
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  // Spacing scale - Tailwind defaults
  // https://tailwindcss.com/docs/customizing-spacing
  spacing: {
    // Core spacing scale
    px: '1px',         // 1px
    0: '0px',          // 0px
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
    36: '9rem',        // 144px
    40: '10rem',       // 160px
    44: '11rem',       // 176px
    48: '12rem',       // 192px
    52: '13rem',       // 208px
    56: '14rem',       // 224px
    60: '15rem',       // 240px
    64: '16rem',       // 256px
    72: '18rem',       // 288px
    80: '20rem',       // 320px
    96: '24rem',       // 384px
  },
  colors: {
    // Core palette
    primary: {
      50: 'hsl(var(--primary-50))',
      100: 'hsl(var(--primary-100))',
      200: 'hsl(var(--primary-200))',
      300: 'hsl(var(--primary-300))',
      400: 'hsl(var(--primary-400))',
      500: 'hsl(var(--primary-500))',
      600: 'hsl(var(--primary-600))',
      700: 'hsl(var(--primary-700))',
      800: 'hsl(var(--primary-800))',
      900: 'hsl(var(--primary-900))',
      950: 'hsl(var(--primary-950))',
    },
    // Semantic colors
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))',
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  animation: {
    durations: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
    },
    easings: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  radii: {
    none: '0',
    sm: 'calc(var(--radius) - 4px)',
    DEFAULT: 'var(--radius)',
    md: 'calc(var(--radius) + 2px)',
    lg: 'calc(var(--radius) + 4px)',
    full: '9999px',
  },
} as const;
