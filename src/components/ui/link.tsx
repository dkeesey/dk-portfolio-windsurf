import { cn } from "@/lib/utils";
import React from "react";

interface LinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
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