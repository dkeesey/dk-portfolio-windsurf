import React from 'react';

// Re-export React types and functions
export const {
    forwardRef,
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useId,
    Children,
    cloneElement,
    isValidElement,
    Fragment,
    createElement,
    memo,
    useRef,
    useMemo,
} = React;

// Re-export React types
export type {
    ReactNode,
    ReactElement,
    ComponentPropsWithoutRef,
    ComponentPropsWithRef,
    ElementType,
    HTMLAttributes,
    ButtonHTMLAttributes,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    FormHTMLAttributes,
    SelectHTMLAttributes,
    RefAttributes,
    ForwardRefExoticComponent,
    PropsWithoutRef,
    PropsWithRef,
    RefObject,
    Ref,
    MutableRefObject,
    CSSProperties,
} from 'react'; 