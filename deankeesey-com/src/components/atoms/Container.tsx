import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const containerVariants = cva('mx-auto px-4 w-full', {
  variants: {
    size: {
      default: 'max-w-7xl',  // 1280px
      sm: 'max-w-3xl',       // 768px
      md: 'max-w-4xl',       // 896px
      lg: 'max-w-6xl',       // 1024px
      xl: 'max-w-7xl',       // 1280px
      '2xl': 'max-w-[1536px]', // 1536px
      full: 'max-w-none',
    },
    padding: {
      default: 'py-8 md:py-12',
      sm: 'py-4 md:py-6',
      lg: 'py-12 md:py-16',
      none: 'py-0',
    },
  },
  defaultVariants: {
    size: 'default',
    padding: 'default',
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding, className }))}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

export { Container, containerVariants };
