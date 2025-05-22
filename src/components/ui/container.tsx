import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  as?: "div" | "section" | "main";
  className?: string;
  children?: React.ReactNode;
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