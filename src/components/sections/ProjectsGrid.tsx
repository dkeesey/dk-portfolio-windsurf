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
import { ArrowRight } from 'lucide-react';

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
    title: 'Multi-Agent Coordination System',
    description:
      'Context architecture and failure pattern recognition for agentic AI: MCP servers, CLI orchestration, tmux-based session management, SQLite coordination databases, and cross-session task delegation. Complex debugging: 6+ hours → 2 hours.',
    image: '/images/projects/multi-agent-coordination.png',
    technologies: ['Claude API', 'MCP', 'Python', 'TypeScript', 'SQLite', 'tmux', 'Bash'],
    category: 'AI Orchestration',
    link: '/projects/multi-agent-coordination',
  },
  {
    title: 'Slack Analytics Intelligence',
    description:
      'Analytics data from GA4, Facebook Pixel, and Microsoft Clarity flows through BigQuery ETL into Slack channels. One architect built the intelligence layer that an entire organization queries daily — no dashboards, no analyst queue, no context switching.',
    image: '/images/projects/slack-analytics-intelligence.png',
    technologies: ['BigQuery', 'GA4', 'n8n', 'Slack API', 'Python', 'Cloud Functions', 'ETL'],
    category: 'Data Intelligence',
    link: '/projects/slack-analytics-intelligence',
  },
  {
    title: 'Enterprise Automation Pipeline',
    description:
      'End-to-end automation infrastructure connecting email intelligence, webhook orchestration, and LLM-powered classification. 10+ n8n workflows coordinate across Slack, Gmail, calendar, and CRM — turning manual processes into autonomous pipelines.',
    image: '/images/projects/enterprise-automation-pipeline.png',
    technologies: ['n8n', 'Claude API', 'Slack API', 'Gmail API', 'Cloudflare Workers', 'Python', 'webhooks'],
    category: 'AI Automation',
    link: '/projects/enterprise-automation-pipeline',
  },
  {
    title: 'Prometheus Careers',
    description:
      'AI career coaching that starts with the job, not the resume. Output is always f(career_data, job_description) — the JD is the anchor, career data is provenance-tracked against it. Full-stack SaaS on Claude API with a free tier powered by open LLM APIs.',
    image: '/images/projects/prometheus-careers-screenshot.png',
    technologies: ['Claude API', 'Claude Haiku', 'Astro', 'React', 'TypeScript', 'Cloudflare Pages', 'Supabase', 'TipTap'],
    category: 'AI Product',
    link: '/projects/prometheus-careers',
  },
  {
    title: 'Prettify AI',
    description:
      'LLM output comes out as markdown. Prettify turns it into a document a human would actually hand to another human — themed PDFs via browser print, ATS-optimized DOCX via the docx library. Zero server-side AI required. Shares editor DNA with Prometheus Careers.',
    image: '/images/projects/prettify-ai-screenshot.png',
    technologies: ['Astro', 'React', 'TipTap 3.x', 'TypeScript', 'Cloudflare Pages', 'docx library', 'Supabase'],
    category: 'AI Product',
    link: '/projects/prettify-ai',
  },
  {
    title: 'Masumi Hayashi Foundation',
    description:
      'Fractional CTO for nonprofit preserving globally renowned Japanese-American artist legacy. Built the entire technical platform — 523-page site serving 30K+ annual visitors, Stripe donation pipeline, analytics infrastructure filtering 92% bot traffic, and museum partnership integrations worldwide.',
    image: '/images/projects/masumi-hayashi-foundation-screenshot.png',
    technologies: ['React', 'Astro', 'GCP', 'Cloudflare', 'Stripe API', 'BigQuery', 'Python', 'Node.js'],
    category: 'CTO & Technical Leadership',
    link: '/projects/masumi-hayashi-foundation',
  },
  {
    title: 'ClientEngine AI',
    description:
      'Service businesses lose deals in the follow-up gap — the owner is on a job site when the lead calls. An n8n + Claude qualification agent responds in under 60 seconds, qualifies through conversation, and books appointments before the competitor answers. A 3-person team at 10-person capacity.',
    image: '/images/projects/clientengineai-screenshot.png',
    technologies: ['Claude API', 'n8n', 'Astro', 'React', 'TypeScript', 'Cloudflare', 'Twilio SMS'],
    category: 'AI Startup',
    link: '/projects/clientengine-ai',
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Studies</h1>
          <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl">
            Every project here is a different layer of the same problem: making AI reliable in production. The coordination infrastructure manages the agents. The analytics intelligence makes data actionable without dashboards. The automation pipeline eliminates the manual work between systems. The products — Prometheus, Prettify, ClientEngine — put that infrastructure in front of users who need outcomes, not tools. The layers build on each other, and each case study is a record of what it took to make one of them actually work.
          </p>

          {/* Search */}
          <div className="max-w-md">
            <Input
              type="search"
              placeholder="Search case studies..."
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
                      className="text-primary hover:text-primary/80 flex items-center gap-1 transition-colors font-medium"
                    >
                      Read Case Study <ArrowRight size={16} />
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
