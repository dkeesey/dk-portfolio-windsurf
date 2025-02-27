import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Skill {
  name: string;
  level: number;
  description: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 5, description: 'Advanced state management, custom hooks, performance optimization' },
      { name: 'TypeScript', level: 5, description: 'Type-safe development, generics, advanced patterns' },
      { name: 'CSS/Sass', level: 5, description: 'Modern layouts, animations, responsive design, cross-browser compatibility' },
      { name: 'Next.js', level: 4, description: 'Server-side rendering, static generation, API routes' },
      { name: 'Astro', level: 4, description: 'Static site generation, component islands, content-focused sites' },
      { name: 'Tailwind', level: 4, description: 'Utility-first CSS, responsive design, component styling' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 4, description: 'RESTful APIs, authentication, middleware' },
      { name: 'Azure', level: 3, description: 'App Services, Functions, Storage, deployment workflows' },
      { name: 'Python', level: 2, description: 'Basic scripting, conceptual understanding of frameworks' },
      { name: 'PostgreSQL', level: 2, description: 'Database concepts, basic queries' },
      { name: 'GraphQL', level: 2, description: 'API consumption, basic query structure' },
    ],
  },
  {
    name: 'Dev Tools & Infrastructure',
    skills: [
      { name: 'CI/CD', level: 4, description: 'GitHub Actions, automated deployment workflows' },
      { name: 'WordPress', level: 4, description: 'Theme customization, plugin integration, content management' },
      { name: 'AI Toolchain', level: 4, description: 'Effective prompt engineering, API integration, LLM workflow optimization' },
      { name: 'Docker', level: 3, description: 'Development environments, basic containerization' },
      { name: 'AWS', level: 3, description: 'S3, basic deployment configurations' },
    ],
  },
  {
    name: 'Digital Marketing',
    skills: [
      { name: 'SEO', level: 4, description: 'On-page optimization, local SEO strategy, keyword research' },
      { name: 'Analytics', level: 3, description: 'GA4 implementation, conversion tracking, performance reporting' },
    ],
  },
  {
    name: 'Security',
    skills: [
      { name: 'WordPress Security', level: 5, description: 'Advanced hardening, malware removal, attack mitigation, security audits' },
      { name: 'Web Security', level: 3, description: 'Vulnerability assessment, secure coding practices, penetration testing' },
    ],
  },
];

function SkillBar({ level, isHovered }: { level: number; isHovered: boolean }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-muted">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? `${(level / 5) * 100}%` : '0%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group relative overflow-hidden transition-all hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">{skill.name}</h3>
            <Badge variant="outline">Level {skill.level}</Badge>
          </div>
          <SkillBar level={skill.level} isHovered={isHovered} />
          <motion.p
            className="mt-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {skill.description}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="py-16 bg-[#eee]">
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold">Technical Skills</h2>
        
        <div className="mb-8 flex flex-wrap gap-2">
          {skillCategories.map((category) => (
            <Badge
              key={category.name}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(
                selectedCategory === category.name ? null : category.name
              )}
            >
              {category.name}
            </Badge>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories
            .filter((category) => !selectedCategory || category.name === selectedCategory)
            .map((category) =>
              category.skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))
            )}
        </div>
      </div>
    </section>
  );
}
