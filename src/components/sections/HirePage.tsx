import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Sparkles,
  Server,
  BarChart3,
  Layers,
  Clock,
  Globe,
  CheckCircle,
  ExternalLink,
  Zap,
  Network,
} from 'lucide-react';

// Motion tokens - consistent across all animations
const MOTION = {
  timing: {
    quick: 0.3,
    standard: 0.5,
    cinematic: 0.8,
  },
  spring: {
    snappy: { type: 'spring' as const, stiffness: 400, damping: 17 },
    bouncy: { type: 'spring' as const, stiffness: 300, damping: 12 },
  },
  stagger: {
    standard: 0.1,
    dramatic: 0.15,
  },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: MOTION.stagger.dramatic,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION.timing.standard,
      ease: 'easeOut',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: MOTION.timing.standard,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -8,
    transition: MOTION.spring.snappy,
  },
};

const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION.timing.cinematic,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Service packages data
const services = [
  {
    icon: Network,
    title: 'AI Infrastructure & Orchestration',
    tagline: 'The systems layer that protects your work',
    description:
      'Multi-agent coordination, model routing, hook architectures, and context management. Built on the same stack I run daily — every layer traceable, every decision attributable.',
    price: '$5,000 - $15,000',
    timeline: '3-6 weeks',
    technologies: ['Claude Code', 'Multi-model Routing', 'SQLite Coordination', 'Hook Systems'],
    highlights: [
      'Work product defensible by design',
      'Token economics built in (Haiku/Sonnet/Opus)',
      'Multi-agent state management',
      'Full audit trail in git',
    ],
    featured: true,
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Frontend',
    tagline: 'React + AI integration that ships',
    description:
      'Production React applications with AI features wired in — not bolted on. TypeScript, Framer Motion, and clean component architecture with real LLM integration.',
    price: '$3,000 - $8,000',
    timeline: '3-5 weeks',
    technologies: ['React', 'TypeScript', 'Astro', 'Framer Motion'],
    highlights: [
      'AI features built into component design',
      'Performance optimized (60fps animations)',
      'Motion design system included',
      'Accessible + WCAG informed',
    ],
    featured: false,
  },
  {
    icon: Server,
    title: 'Cloudflare Edge Platform',
    tagline: 'Infrastructure that scales globally',
    description:
      'Serverless Workers, cron jobs, webhooks, D1 databases, and KV storage deployed at the edge. Sub-50ms latency, zero cold starts, production-proven.',
    price: '$1,500 - $4,000',
    timeline: '1-3 weeks',
    technologies: ['Cloudflare Workers', 'D1', 'KV', 'Durable Objects'],
    highlights: [
      'Production workers deployed',
      'Cron job automation',
      'Webhook + Stripe integrations',
      'Sub-50ms global latency',
    ],
    featured: false,
  },
  {
    icon: BarChart3,
    title: 'Analytics Infrastructure',
    tagline: 'Data pipelines that actually run',
    description:
      'GA4, Search Console, BigQuery pipelines, and automated reporting. Daily data collection across multiple properties, automated to run without you.',
    price: '$1,500 - $3,500',
    timeline: '1-2 weeks',
    technologies: ['GA4', 'BigQuery', 'Search Console', 'Cloudflare Workers'],
    highlights: [
      'Automated daily collection',
      'Multi-site pipeline management',
      'Custom event tracking',
      'Reporting dashboards',
    ],
    featured: false,
  },
  {
    icon: Zap,
    title: 'Automation & Integration',
    tagline: 'n8n workflows that replace manual work',
    description:
      'Business process automation using n8n, webhooks, and API integrations. Slack notifications, email pipelines, Stripe events, and scheduled intelligence reports.',
    price: '$1,000 - $3,000',
    timeline: '1-2 weeks',
    technologies: ['n8n', 'Webhooks', 'Slack', 'Stripe'],
    highlights: [
      'Morning intelligence reports',
      'Stripe → Slack pipelines live',
      'Email digest automation',
      'Webhook event processing',
    ],
    featured: false,
  },
];

// Quick facts data
const quickFacts = [
  { icon: Clock, label: 'Response Time', value: '< 24 hours' },
  { icon: Globe, label: 'Timezone', value: 'PST (California)' },
  { icon: CheckCircle, label: 'Enterprise XP', value: '15+ years' },
];

// Proof badges
const proofBadges = [
  'Goldman Sachs',
  'SAP',
  'Oracle',
  'EA Games',
  'Claude Code',
  'Cloudflare',
  'TypeScript',
  'Multi-agent',
];

export function HirePage() {
  return (
    <div className="bg-gradient-to-b from-purple-50 via-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 -left-40 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl"
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <Container className="relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={heroTextVariants}>
              <Badge className="mb-4 bg-green-100 text-green-800 border-green-300">
                Available for Projects
              </Badge>
            </motion.div>

            <motion.h1
              variants={heroTextVariants}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              AI Systems Builder
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                for Hire
              </span>
            </motion.h1>

            <motion.p
              variants={heroTextVariants}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              The LLM is a cloud of possibilities. I build the orchestration systems
              that harness it — from multi-agent infrastructure through AI-powered
              frontends. Work product defensible by design.
            </motion.p>

            <motion.div
              variants={heroTextVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8"
              >
                <a
                  href="https://www.upwork.com/freelancers/~01d9be74f5ca10e8c8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hire on Upwork
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 text-lg px-8"
              >
                <a href="/contact">Direct Inquiry</a>
              </Button>
            </motion.div>

            {/* Enterprise proof badges */}
            <motion.div variants={heroTextVariants} className="mt-12">
              <p className="text-sm text-gray-500 mb-3">
                Enterprise experience from:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {proofBadges.map((badge, index) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                  >
                    <Badge variant="outline" className="text-gray-600">
                      {badge}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <Container>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.timing.standard }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Service Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized expertise with production evidence. Each package
              includes working code, tests, and documentation.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={cardVariants}
                  whileHover="hover"
                  className={service.featured ? 'md:col-span-2 lg:col-span-1' : ''}
                >
                  <Card
                    className={`h-full flex flex-col ${
                      service.featured
                        ? 'border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50'
                        : 'hover:shadow-lg'
                    }`}
                  >
                    {service.featured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="pt-8">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            service.featured
                              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                              : 'bg-purple-100 text-purple-600'
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <CardDescription>{service.tagline}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-600 mb-4">{service.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <ul className="space-y-2">
                        {service.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-2 border-t pt-6">
                      <div className="flex justify-between w-full text-sm">
                        <span className="text-gray-500">Price range:</span>
                        <span className="font-semibold text-gray-900">
                          {service.price}
                        </span>
                      </div>
                      <div className="flex justify-between w-full text-sm">
                        <span className="text-gray-500">Timeline:</span>
                        <span className="text-gray-700">{service.timeline}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Quick Facts Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {quickFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <motion.div
                  key={fact.label}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {fact.value}
                  </div>
                  <div className="text-gray-500">{fact.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.timing.cinematic }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start your project?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements. I typically respond within 24 hours
              and can start most projects within a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8"
              >
                <a
                  href="https://www.upwork.com/freelancers/~01d9be74f5ca10e8c8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Upwork Profile
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8"
              >
                <a href="/projects">See My Work</a>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
