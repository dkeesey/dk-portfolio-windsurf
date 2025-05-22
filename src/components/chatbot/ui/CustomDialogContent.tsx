import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from "@/lib/utils";

// This is a custom version of the DialogContent component that doesn't include the X close button
// but includes hidden accessibility elements
export const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title?: string;
    description?: string;
  }
>(({ className, children, title = "Dialog", description = "Dialog content", ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {/* Accessibility elements that are visually hidden */}
      <VisuallyHidden asChild>
        <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
      </VisuallyHidden>
      <VisuallyHidden asChild>
        <DialogPrimitive.Description>{description}</DialogPrimitive.Description>
      </VisuallyHidden>
      
      {children}
      {/* No close button here */}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

CustomDialogContent.displayName = "CustomDialogContent";
