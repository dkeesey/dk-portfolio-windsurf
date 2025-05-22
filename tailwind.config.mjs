import animate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        'gradient-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        // Circle path animations with different starting positions
        'path-1-slow': {
          '0%': { top: '5%', left: '10%' },
          '25%': { top: '60%', left: '65%' },
          '50%': { top: '40%', left: '75%' },
          '75%': { top: '25%', left: '30%' },
          '100%': { top: '5%', left: '10%' },
        },
        'path-2-medium': {
          '0%': { top: '65%', left: '20%' },
          '25%': { top: '30%', left: '70%' },
          '50%': { top: '10%', left: '50%' },
          '75%': { top: '45%', left: '85%' },
          '100%': { top: '65%', left: '20%' },
        },
        'path-3-fast': {
          '0%': { top: '25%', left: '80%' },
          '25%': { top: '75%', left: '40%' },
          '50%': { top: '35%', left: '20%' },
          '75%': { top: '55%', left: '60%' },
          '100%': { top: '25%', left: '80%' },
        },
        'path-4-slow': {
          '0%': { top: '20%', left: '45%' },
          '25%': { top: '65%', left: '15%' },
          '50%': { top: '80%', left: '60%' },
          '75%': { top: '25%', left: '75%' },
          '100%': { top: '20%', left: '45%' },
        },
        'path-5-medium': {
          '0%': { top: '35%', left: '75%' },
          '25%': { top: '15%', left: '40%' },
          '50%': { top: '60%', left: '25%' },
          '75%': { top: '45%', left: '65%' },
          '100%': { top: '35%', left: '75%' },
        },
        'path-6-fast': {
          '0%': { top: '70%', left: '25%' },
          '25%': { top: '55%', left: '70%' },
          '50%': { top: '30%', left: '35%' },
          '75%': { top: '40%', left: '50%' },
          '100%': { top: '70%', left: '25%' },
        },
        'path-7-slow': {
          '0%': { top: '15%', left: '60%' },
          '25%': { top: '65%', left: '30%' },
          '50%': { top: '45%', left: '70%' },
          '75%': { top: '25%', left: '15%' },
          '100%': { top: '15%', left: '60%' },
        },
        'path-8-medium': {
          '0%': { top: '50%', left: '15%' },
          '25%': { top: '30%', left: '55%' },
          '50%': { top: '20%', left: '85%' },
          '75%': { top: '75%', left: '55%' },
          '100%': { top: '50%', left: '15%' },
        },
        'path-9-fast': {
          '0%': { top: '55%', left: '40%' },
          '25%': { top: '25%', left: '85%' },
          '50%': { top: '65%', left: '65%' },
          '75%': { top: '85%', left: '25%' },
          '100%': { top: '55%', left: '40%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'blob': 'blob 15s infinite ease-in-out',
        'gradient-flow': 'gradient-flow 15s ease infinite',
        // Circle animations with different speeds based on size
        'path-1-slow': 'path-1-slow 60s ease-in-out infinite',
        'path-2-medium': 'path-2-medium 45s ease-in-out infinite',
        'path-3-fast': 'path-3-fast 30s ease-in-out infinite',
        'path-4-slow': 'path-4-slow 65s ease-in-out infinite',
        'path-5-medium': 'path-5-medium 48s ease-in-out infinite',
        'path-6-fast': 'path-6-fast 32s ease-in-out infinite',
        'path-7-slow': 'path-7-slow 70s ease-in-out infinite',
        'path-8-medium': 'path-8-medium 50s ease-in-out infinite',
        'path-9-fast': 'path-9-fast 35s ease-in-out infinite',
      },
    },
  },
  plugins: [animate, typography],
};
