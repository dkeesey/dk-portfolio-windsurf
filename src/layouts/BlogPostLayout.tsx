import { Layout } from "@/components/layout/Layout";
import { MainContent } from "@/components/layout/MainContent";
import type { PropsWithChildren } from "react";

interface BlogPostLayoutProps extends PropsWithChildren {
  title: string;
  date: string;
  author: string;
  readingTime?: string;
}

export function BlogPostLayout({
  children,
  title,
  date,
  author,
  readingTime,
}: BlogPostLayoutProps) {
  return (
    <Layout>
      <MainContent className="prose prose-lg dark:prose-invert mx-auto">
        <article>
          <header className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">{title}</h1>
            <div className="text-sm text-muted-foreground">
              <span>{author}</span>
              <span className="mx-2">•</span>
              <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
              {readingTime && (
                <>
                  <span className="mx-2">•</span>
                  <span>{readingTime}</span>
                </>
              )}
            </div>
          </header>
          {children}
        </article>
      </MainContent>
    </Layout>
  );
} 