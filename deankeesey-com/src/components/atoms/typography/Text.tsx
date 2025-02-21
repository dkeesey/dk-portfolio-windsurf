import { cn } from '@/lib/utils';
import { tokens } from '@/styles/design-system/tokens';
import { type VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      default: 'text-base leading-normal',
      lead: 'text-xl text-muted-foreground leading-relaxed',
      large: 'text-lg font-semibold leading-snug',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground leading-normal',
      blockquote: 'text-xl italic font-semibold leading-loose',
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
    variant: 'default',
    weight: 'normal',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, weight, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(textVariants({ variant, weight, className }))}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };
