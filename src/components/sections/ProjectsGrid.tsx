import { useState } from 'react';
import { Container } from '@/components/ui/primitives';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link: string;
};

const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform built with Next.js and Stripe integration.',
    image: '/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    category: 'Full Stack',
    link: 'https://github.com/username/ecommerce',
  },
  {
    title: 'Task Management API',
    description: 'RESTful API for task management with authentication and real-time updates.',
    image: '/projects/task-api.jpg',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    category: 'Backend',
    link: 'https://github.com/username/task-api',
  },
  // Add more projects here
];

const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

export function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects = projects.filter(
    (project) => selectedCategory === 'All' || project.category === selectedCategory
  );

  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="min-w-[100px]"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block transform transition-transform duration-300 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="h-full overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transform transition-transform duration-300"
                    style={{
                      transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle>{project.title}</CardTitle>
                    <Badge>{project.category}</Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
