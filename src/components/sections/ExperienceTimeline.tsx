import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface TimelineItemProps {
  date: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  index: number;
}

function TimelineItem({ date, title, company, description, technologies, index }: TimelineItemProps) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative grid gap-4 pb-10 pl-8 last:pb-0 md:grid-cols-5"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-1 h-full w-px bg-border">
        <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-primary" />
      </div>

      {/* Date */}
      <div className="text-sm text-muted-foreground md:col-span-1">{date}</div>

      {/* Content */}
      <div className="md:col-span-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-muted-foreground">{company}</p>
        <p className="mt-2">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceTimeline() {
  const experiences = [
    {
      date: '2022 - Present',
      title: 'Senior Software Engineer',
      company: 'Example Corp',
      description: 'Led development of high-performance web applications using modern technologies.',
      technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
    },
    // Add more experiences...
  ];

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold">Experience</h2>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <TimelineItem key={index} {...experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
