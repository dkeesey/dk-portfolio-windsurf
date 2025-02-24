import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface ContainerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  as?: 'div' | 'section' | 'main';
  class?: string;
  className?: string;
}

export function Container({ 
  as: Component = 'div',
  class: classAstro,
  className,
  ...props 
}: ContainerProps) {
  return (
    <Component 
      className={cn("container mx-auto px-4", classAstro || className)}
      {...props}
    />
  );
} 