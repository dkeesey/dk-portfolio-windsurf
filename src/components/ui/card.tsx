import * as React from "react"

import { cn } from "@/lib/utils"

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  class?: string;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ class: classAstro, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        classAstro || className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & { class?: string; className?: string }
>(({ class: classAstro, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", classAstro || className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className'> & { class?: string; className?: string }
>(({ class: classAstro, className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      classAstro || className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  Omit<React.HTMLAttributes<HTMLParagraphElement>, 'className'> & { class?: string; className?: string }
>(({ class: classAstro, className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", classAstro || className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & { class?: string; className?: string }
>(({ class: classAstro, className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", classAstro || className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & { class?: string; className?: string }
>(({ class: classAstro, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", classAstro || className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
