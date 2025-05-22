export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishDate?: Date;
  author?: string;
}

export interface LayoutProps {
  seo?: SEOProps;
}

export interface ContainerProps {
  as?: keyof HTMLElementTagNameMap;
  class?: string;
  children: React.ReactNode;
} 