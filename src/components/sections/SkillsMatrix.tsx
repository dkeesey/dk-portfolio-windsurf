import { useEffect, useRef } from 'react';
import { Container } from '@/components/ui/primitives';
import { Badge } from '@/components/ui/badge';

type SkillCategory = {
  name: string;
  skills: {
    name: string;
    level: number; // 1-5
    description?: string;
  }[];
};

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 5, description: 'Advanced state management, custom hooks, performance optimization' },
      { name: 'TypeScript', level: 5, description: 'Type-safe development, generics, advanced patterns' },
      { name: 'Next.js', level: 4, description: 'Server-side rendering, static generation, API routes' },
      { name: 'CSS/Sass', level: 4, description: 'Modern layouts, animations, responsive design' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 4, description: 'RESTful APIs, authentication, middleware' },
      { name: 'Python', level: 4, description: 'Django, FastAPI, data processing' },
      { name: 'PostgreSQL', level: 4, description: 'Schema design, optimization, migrations' },
      { name: 'GraphQL', level: 3, description: 'Schema definition, resolvers, Apollo Server' },
    ],
  },
  {
    name: 'DevOps',
    skills: [
      { name: 'Docker', level: 4, description: 'Containerization, multi-stage builds' },
      { name: 'AWS', level: 3, description: 'EC2, S3, Lambda, CloudFront' },
      { name: 'CI/CD', level: 4, description: 'GitHub Actions, Jenkins pipelines' },
      { name: 'Kubernetes', level: 3, description: 'Container orchestration, deployments' },
    ],
  },
];

export function SkillsMatrix() {
  const matrixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-bar');
            bars.forEach((bar, i) => {
              setTimeout(() => {
                (bar as HTMLElement).style.width = `${(bar as HTMLElement).dataset.level}0%`;
                (bar as HTMLElement).style.opacity = '1';
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (matrixRef.current) {
      observer.observe(matrixRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20">
      <Container>
        <h2 className="text-3xl font-bold mb-12">Technical Skills</h2>
        <div ref={matrixRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="bg-card rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-6">{category.name}</h3>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="secondary">{skill.level}/5</Badge>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: '0%', opacity: 0 }}
                        data-level={skill.level * 2}
                      />
                    </div>
                    {skill.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
