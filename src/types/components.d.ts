import type {
  HTMLAttributes,
  RefAttributes,
  ButtonHTMLAttributes,
} from 'react';
import type { ComponentPropsWithoutRef } from 'react';

// Define a base props interface that includes both class and className
export interface BaseProps extends HTMLAttributes<HTMLElement> {
  class?: string;
  className?: string;
}

// Extend this for specific element types if needed
export interface DivProps
  extends BaseProps,
    HTMLAttributes<HTMLDivElement>,
    RefAttributes<HTMLDivElement> {}

// Button props that support both class and className
export interface ButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  class?: string;
  className?: string;
}

// Generic Radix component props that support both class and className
export type RadixComponentProps<T> = Omit<
  ComponentPropsWithoutRef<T>,
  'className'
> & {
  class?: string;
  className?: string;
};
