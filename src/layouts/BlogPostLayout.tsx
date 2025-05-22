import { Container } from "@/components/ui/container";
import { MainContent } from "@/components/layout/MainContent";
import React from "react";

interface BlogPostLayoutProps {
  title: string;
  date: string;
  author: string;
  children?: React.ReactNode;
}

export function BlogPostLayout({
  title,
  date,
  author,
  children,
}: BlogPostLayoutProps) {
  return (
    <Container as="section">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-gray-500">By {author} on {date}</p>
      </header>
      <MainContent className="prose prose-lg dark:prose-invert mx-auto">
        {children}
      </MainContent>
    </Container>
  );
} 