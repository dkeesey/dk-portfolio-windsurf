import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-gray-400 bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground bg-white border-gray-300',
        skill: 'text-foreground bg-white border-gray-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
    VariantProps<typeof badgeVariants> {
  class?: string;
  className?: string;
}

function Badge({
  class: classAstro,
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), classAstro || className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
