"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

interface LabelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>, 'className'>,
    VariantProps<typeof labelVariants> {
  class?: string;
  className?: string;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ class: classAstro, className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), classAstro || className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
