import { Container } from "@/components/ui/container";
import { MainContent } from "@/components/layout/MainContent";
import React from "react";

interface ProjectShowcaseLayoutProps {
  title: string;
  description: string;
  technologies: string[];
  children?: React.ReactNode;
}

export function ProjectShowcaseLayout({
  title,
  description,
  technologies,
  children,
}: ProjectShowcaseLayoutProps) {
  return (
    <Container as="section">
      <header className="py-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
      </header>
      <MainContent>
        {children}
      </MainContent>
    </Container>
  );
} 