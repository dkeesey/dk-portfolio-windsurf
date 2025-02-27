import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAnalytics } from '@/hooks/useAnalytics';

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
    title: 'Masumi Hayashi Portfolio',
    description:
      'Modernized legacy art portfolio website with a scrolling UX inspired by short-form content platforms for better art discovery.',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Masumi+Hayashi+Portfolio',
    technologies: ['Astro', 'JavaScript', 'CSS Animations', 'Responsive Design'],
    category: 'Frontend',
    link: 'https://masumihayashi.com',
  },
  {
    title: 'Therapist Practice SEO',
    description:
      'Implemented comprehensive SEO strategy achieving consistent #2 placement in map pack and page 1 results for targeted keywords.',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Local+SEO+Optimization',
    technologies: ['SEO', 'WordPress', 'Local Business', 'Google Business Profile'],
    category: 'Digital Marketing',
    link: 'https://megangredesky.com',
  },
  {
    title: 'Political Campaign Website',
    description:
      'Elevated campaign site from obscurity to page 1 search results through technical SEO and content optimization strategies.',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Campaign+Website+SEO',
    technologies: ['WordPress', 'SEO', 'Content Strategy'],
    category: 'Digital Marketing',
    link: 'https://kanithaforoakland.com',
  },
  {
    title: 'WordPress Security Remediation',
    description:
      'Successfully removed malicious adware from a compromised website and implemented comprehensive security hardening measures.',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=WordPress+Security',
    technologies: ['WordPress', 'Security', 'PHP'],
    category: 'Web Security',
    link: 'https://thestickingplace.com',
  },
  {
    title: 'GA4 Analytics Implementation',
    description:
      'Configured Google Analytics 4 across multiple client websites with custom event tracking and conversion measurement.',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Analytics+Implementation',
    technologies: ['Google Analytics 4', 'Tag Manager', 'Conversion Tracking'],
    category: 'Analytics',
    link: 'https://strangelandcomics.com',
  },
];

export function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const { trackClick, trackProjectView } = useAnalytics();

  // Get unique categories and technologies
  const uniqueCategories = [...new Set(projects.map(p => p.category))];
  const technologies = [...new Set(projects.flatMap(p => p.technologies))];

  // Filter projects based on search, category, and tech
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    const matchesTech = !selectedTech || project.technologies.includes(selectedTech);
    return matchesSearch && matchesCategory && matchesTech;
  });

  // Handle category selection with analytics
  const handleCategorySelect = (category: string | null) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    if (newCategory) {
      trackClick('category_filter', { category: newCategory });
    }
  };

  // Handle tech selection with analytics
  const handleTechSelect = (tech: string | null) => {
    const newTech = selectedTech === tech ? null : tech;
    setSelectedTech(newTech);
    if (newTech) {
      trackClick('tech_filter', { technology: newTech });
    }
  };

  // Handle project click with analytics
  const handleProjectClick = (project: Project) => {
    trackProjectView(project.title, { 
      category: project.category, 
      technologies: project.technologies.join(','),
      link: project.link
    });
  };

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-8 space-y-6">
          {/* Search */}
          <div className="max-w-md">
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 2) {
                  trackClick('project_search', { query: e.target.value });
                }
              }}
              className="w-full"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={!selectedCategory ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleCategorySelect(null)}
            >
              All
            </Badge>
            {uniqueCategories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleCategorySelect(category)}
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
                onClick={() => handleTechSelect(tech)}
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
                  <a 
                    href={project.link}
                    onClick={() => handleProjectClick(project)}
                  >
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
