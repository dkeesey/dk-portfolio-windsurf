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
    name: 'LLM Orchestration & Agent Design',
    skills: [
      { name: 'Multi-Agent Coordination', level: 5, description: 'Claude Code Swarm, parallel worker orchestration, task delegation, conflict detection' },
      { name: 'Claude API & MCP', level: 5, description: 'Model Context Protocol servers, tool use, streaming, multi-turn orchestration' },
      { name: 'Prompt & Context Engineering', level: 5, description: 'System instructions, chain-of-thought, context window optimization, knowledge priming' },
      { name: 'RAG & Knowledge Systems', level: 4, description: 'Retrieval-Augmented Generation, vector databases, semantic search, knowledge bases' },
      { name: 'AI Pipeline Automation', level: 4, description: 'n8n workflows, automated classification, LLM-in-the-loop pipelines, webhook orchestration' },
    ],
  },
  {
    name: 'Enterprise AI Strategy',
    skills: [
      { name: 'AI Readiness Assessment', level: 4, description: 'Evaluating organizational AI maturity, identifying high-leverage automation opportunities' },
      { name: 'Build vs Buy Analysis', level: 4, description: 'Custom LLM infrastructure vs SaaS AI tools — cost modeling, capability mapping, vendor evaluation' },
      { name: 'AI Governance & Safety', level: 4, description: 'Output validation, human-in-the-loop design, content policy, audit trails' },
    ],
  },
  {
    name: 'Platform & Infrastructure',
    skills: [
      { name: 'Cloudflare (Workers, Pages, R2, D1)', level: 5, description: 'Edge compute, serverless functions, static hosting, object storage, SQLite-at-edge' },
      { name: 'GCP (BigQuery, Cloud Functions)', level: 4, description: 'Data warehousing, analytics pipelines, serverless compute, service accounts' },
      { name: 'CI/CD & DevOps', level: 4, description: 'GitHub Actions, automated testing, deployment pipelines, infrastructure as code' },
      { name: 'Supabase & PostgreSQL', level: 4, description: 'Auth, real-time subscriptions, row-level security, database migrations' },
    ],
  },
  {
    name: 'Implementation',
    skills: [
      { name: 'TypeScript', level: 5, description: 'Type-safe development, generics, advanced patterns, strict mode' },
      { name: 'Python', level: 4, description: 'Automation scripts, API integrations, data processing, CLI tools' },
      { name: 'React & Astro', level: 5, description: 'Component architecture, SSR/SSG, content sites, interactive applications' },
      { name: 'Node.js', level: 4, description: 'API servers, middleware, webhook handlers, streaming responses' },
    ],
  },
  {
    name: 'Domain Expertise',
    skills: [
      { name: 'Financial Services (Fortune 50)', level: 5, description: 'Goldman Sachs, Prudential — compliance-aware systems, high-security environments' },
      { name: 'Healthcare IT', level: 4, description: 'EMR systems (iKnowMed/McKesson), life-critical software, oncology networks' },
      { name: 'Enterprise SaaS', level: 5, description: 'SAP SuccessFactors, SupportLogic, Guidewire — B2B platforms at scale' },
      { name: 'Nonprofit Technology', level: 4, description: 'Masumi Hayashi Foundation — museum partnerships, donation pipelines, digital preservation' },
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
          <div className="mb-4">
            <h3 className="font-semibold">{skill.name}</h3>
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
        <h2 className="mb-8 text-3xl font-bold">Capabilities</h2>
        
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
