import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  as?: "div" | "section" | "main";
}

export function Container({ 
  as: Component = "div", 
  className, 
  children, 
  ...props 
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
} 