import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface MainContentProps extends PropsWithChildren {
  className?: string;
  fullWidth?: boolean;
}

export function MainContent({ 
  children, 
  className,
  fullWidth = false 
}: MainContentProps) {
  return (
    <main
      className={cn(
        "flex-1 py-8",
        !fullWidth && "container mx-auto px-4",
        className
      )}
    >
      {children}
    </main>
  );
} 