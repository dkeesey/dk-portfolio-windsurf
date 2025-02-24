import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface LinkProps extends ComponentPropsWithoutRef<"a"> {
  href: string;
  className?: string;
}

export function Link({ href, className, children, ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "font-medium text-foreground underline-offset-4 hover:underline",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
} 