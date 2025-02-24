import { Layout } from "@/components/layout/Layout";
import { MainContent } from "@/components/layout/MainContent";
import { Badge } from "@/components/ui/badge";
import type { PropsWithChildren } from "react";

interface ProjectShowcaseLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export function ProjectShowcaseLayout({
  children,
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  imageUrl,
}: ProjectShowcaseLayoutProps) {
  return (
    <Layout>
      <MainContent>
        <article className="mx-auto max-w-4xl">
          {imageUrl && (
            <div className="mb-8 overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={`${title} project screenshot`}
                className="w-full object-cover"
                width={800}
                height={400}
              />
            </div>
          )}
          
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">{title}</h1>
            <p className="mb-4 text-xl text-muted-foreground">{description}</p>
            
            <div className="mb-4 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  View on GitHub
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Visit Live Site
                </a>
              )}
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert">
            {children}
          </div>
        </article>
      </MainContent>
    </Layout>
  );
} 