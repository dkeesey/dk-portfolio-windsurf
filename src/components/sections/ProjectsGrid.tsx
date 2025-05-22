import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ExternalLink } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link: string;
};

// Real screenshots of live projects
const projects: Project[] = [
  {
    title: 'Masumi Hayashi Digital Archive',
    description:
      'Immersive digital archive of panoramic photo-collages documenting the Japanese American internment experience, transforming historical trauma into a powerful visual narrative that preserves memory and understanding.',
    image: '/images/projects/masumi-hayashi-archive-screenshot.png',
    technologies: ['Astro', 'JavaScript', 'CSS Animations', 'Responsive Design'],
    category: 'Frontend',
    link: 'https://gallery.masumihayashi.com',
  },
  {
    title: 'Therapist Practice SEO',
    description:
      'Implemented comprehensive SEO strategy achieving consistent #2 placement in map pack and page 1 results for targeted keywords.',
    image: '/images/projects/megan-gredesky-therapy-screenshot.png',
    technologies: ['SEO', 'WordPress', 'Local Business', 'Google Business Profile'],
    category: 'Digital Marketing',
    link: 'https://megangredesky.com',
  },
  {
    title: 'Political Campaign Website',
    description:
      'Elevated campaign site from obscurity to page 1 search results through technical SEO and content optimization strategies.',
    image: '/images/projects/kanitha-for-oakland-screenshot.png',
    technologies: ['WordPress', 'SEO', 'Content Strategy'],
    category: 'Digital Marketing',
    link: 'https://kanithaforoakland.com',
  },
  {
    title: 'WordPress Security Remediation',
    description:
      'Successfully removed malicious adware from a compromised website and implemented comprehensive security hardening measures.',
    image: '/images/projects/sticking-place-security-screenshot.png',
    technologies: ['WordPress', 'Security', 'PHP'],
    category: 'Web Security',
    link: 'https://thestickingplace.com',
  },
  {
    title: 'GA4 Analytics Implementation',
    description:
      'Configured Google Analytics 4 across multiple client websites with custom event tracking and conversion measurement.',
    image: '/images/projects/strangeland-analytics-screenshot.png',
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
        <div className="mb-8 space-y-6 bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Projects</h1>
          
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
                variant={selectedTech === tech ? 'secondary' : 'skill'}
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
                <Card className="group h-full hover:shadow-lg overflow-hidden">
                  {/* Screenshot section with overlay text */}
                  <div className="relative h-48">
                    <div 
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${project.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">
                        {project.title}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className="mt-2 bg-primary/90 text-white border-none"
                      >
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Project details */}
                  <CardContent className="pt-6">
                    <p className="text-gray-900 leading-relaxed">{project.description}</p>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col items-start">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map(tech => (
                        <Badge
                          key={tech}
                          variant="skill"
                          className={tech === selectedTech ? 'bg-primary text-primary-foreground' : ''}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <a 
                      href={project.link}
                      onClick={() => handleProjectClick(project)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                    >
                      View Project <ExternalLink size={16} />
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-lg text-center mt-8 mb-8 shadow"
          >
            <p className="text-muted-foreground">No projects found matching your criteria</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
