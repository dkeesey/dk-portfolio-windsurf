declare module 'astro:content' {
    interface CollectionEntry {
        render(): Promise<{
            Content: import('astro').AstroComponentFactory;
            headings: { depth: number; slug: string; text: string }[];
            remarkPluginFrontmatter: Record<string, any>;
        }>;
    }
}

declare module '*.astro' {
    const component: import('astro').AstroComponentFactory;
    export default component;
}

declare module '@astrojs/react' {
    export function createElement(
        type: any,
        props: any,
        ...children: any[]
    ): JSX.Element;
}

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }
} 