import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const alertVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

interface AlertProps extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> { }

// Simplified version without forwardRef
function Alert({ className, variant, ...props }: AlertProps) {
    return (
        <div
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        />
    );
}

interface AlertTitleProps extends React.ComponentProps<"h5"> { }

function AlertTitle({ className, ...props }: AlertTitleProps) {
    return (
        <h5
            className={cn("mb-1 font-medium leading-none tracking-tight", className)}
            {...props}
        />
    );
}

interface AlertDescriptionProps extends React.ComponentProps<"div"> { }

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
    return (
        <div
            className={cn("text-sm [&_p]:leading-relaxed", className)}
            {...props}
        />
    );
}

export { Alert, AlertTitle, AlertDescription } 