import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/primitives';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    description:
      'A modern e-commerce platform built with Next.js and Stripe integration.',
    image: '/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    category: 'Full Stack',
    link: 'https://github.com/username/ecommerce',
  },
  {
    title: 'Task Management API',
    description:
      'RESTful API for task management with authentication and real-time updates.',
    image: '/projects/task-api.jpg',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    category: 'Backend',
    link: 'https://github.com/username/task-api',
  },
  // Add more projects here
];

const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

export function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Get unique categories and technologies
  const categories = [...new Set(projects.map(p => p.category))];
  const technologies = [...new Set(projects.flatMap(p => p.technologies))];

  // Filter projects based on search, category, and tech
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    const matchesTech = !selectedTech || project.technologies.includes(selectedTech);
    return matchesSearch && matchesCategory && matchesTech;
  });

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-8 space-y-6">
          {/* Search */}
          <div className="max-w-md">
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={!selectedCategory ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(
                  selectedCategory === category ? null : category
                )}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Technology filters */}
          <div className="flex flex-wrap gap-2">
            {technologies.map(tech => (
              <Badge
                key={tech}
                variant={selectedTech === tech ? 'secondary' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedTech(
                  selectedTech === tech ? null : tech
                )}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="group h-full hover:shadow-lg">
                  <a href={project.link}>
                    {project.image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <motion.img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="h-full w-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className={tech === selectedTech ? 'bg-primary text-primary-foreground' : ''}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </a>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground mt-8"
          >
            No projects found matching your criteria
          </motion.p>
        )}
      </div>
    </section>
  );
}
