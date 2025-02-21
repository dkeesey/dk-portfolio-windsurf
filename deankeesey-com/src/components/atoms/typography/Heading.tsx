import { cn } from '@/lib/utils';
import { tokens } from '@/styles/design-system/tokens';
import { type VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const headingVariants = cva('font-heading text-foreground scroll-m-20', {
  variants: {
    level: {
      h1: 'text-4xl leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-7xl',
      h2: 'text-3xl leading-tight tracking-tight sm:text-4xl',
      h3: 'text-2xl leading-snug tracking-tight sm:text-3xl',
      h4: 'text-xl leading-snug tracking-tight sm:text-2xl',
      h5: 'text-lg leading-snug tracking-tight sm:text-xl',
      h6: 'text-base leading-snug tracking-tight sm:text-lg',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    tracking: {
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
      widest: 'tracking-widest',
    },
  },
  defaultVariants: {
    level: 'h1',
    weight: 'bold',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, weight, as, ...props }, ref) => {
    const Component = as || level || 'h1';

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, weight, className }))}
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };
