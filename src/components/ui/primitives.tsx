import * as React from 'react';
import { cn } from '@/lib/utils';

// Text primitive for consistent typography
export function Text({
  as: Component = 'p',
  size = 'base',
  className,
  ...props
}: {
  as?: React.ElementType;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  children: React.ReactNode;
}) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };

  return (
    <Component
      className={cn(sizeClasses[size], 'leading-normal', className)}
      {...props}
    />
  );
}

// Stack primitive for vertical layouts
export function Stack({
  as: Component = 'div',
  gap = 4,
  className,
  ...props
}: {
  as?: React.ElementType;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Component
      className={cn('flex flex-col', `gap-${gap}`, className)}
      {...props}
    />
  );
}

// Grid primitive for grid layouts
export function Grid({
  as: Component = 'div',
  cols = 1,
  gap = 4,
  className,
  ...props
}: {
  as?: React.ElementType;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Component
      className={cn(
        'grid',
        `grid-cols-${cols}`,
        `gap-${gap}`,
        className
      )}
      {...props}
    />
  );
}

// Container primitive for consistent max-widths
export function Container({
  as: Component = 'div',
  size = 'default',
  className,
  ...props
}: {
  as?: React.ElementType;
  size?: 'sm' | 'default' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}) {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    default: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
  };

  return (
    <Component
      className={cn(
        'mx-auto w-full px-4',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}

// Flex primitive for flexible layouts
export function Flex({
  as: Component = 'div',
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  gap = 4,
  className,
  ...props
}: {
  as?: React.ElementType;
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Component
      className={cn(
        'flex',
        `flex-${direction}`,
        `items-${align}`,
        `justify-${justify}`,
        `gap-${gap}`,
        className
      )}
      {...props}
    />
  );
}
