import { cn } from '@/lib/utils';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children, className, ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'transition-colors hover:text-foreground/80 text-foreground/60',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
