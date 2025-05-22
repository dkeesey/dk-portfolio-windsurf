import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export const Pre = ({ className, ...props }: ComponentProps<'pre'>) => {
  return (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4',
        className
      )}
      {...props}
    />
  );
};

export const Code = ({ className, ...props }: ComponentProps<'code'>) => {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className
      )}
      {...props}
    />
  );
};

export const MDXComponents = {
  pre: Pre,
  code: Code,
  // Add more components as needed
}; 