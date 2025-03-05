import * as React from 'react';

declare module 'react' {
    export type PropsWithChildren<P = unknown> = P & { children?: React.ReactNode };
    export type ComponentPropsWithoutRef<T extends React.ElementType> = React.ComponentProps<T> & {
        ref?: never;
    };
    export type ElementRef<T extends React.ElementType> = React.RefObject<React.ComponentProps<T>>;
    export type ReactNode = React.ReactNode;
    export type ElementType = React.ElementType;
    export type JSX = React.JSX;
    export type ReactElement = React.ReactElement;
    export type HTMLAttributes<T> = React.HTMLAttributes<T>;
    export type InputHTMLAttributes<T> = React.InputHTMLAttributes<T>;
    export type TextareaHTMLAttributes<T> = React.TextareaHTMLAttributes<T>;
} 