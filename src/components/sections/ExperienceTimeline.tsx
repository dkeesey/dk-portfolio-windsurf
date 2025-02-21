import { useRef, useEffect } from 'react';
import { Container } from '@/components/ui/primitives';
import { Badge } from '@/components/ui/badge';

type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
};

const experiences: Experience[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Example Corp',
    period: '2022 - Present',
    description: 'Led development of high-performance web applications using modern technologies.',
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Tech Innovators',
    period: '2020 - 2022',
    description: 'Built scalable microservices and responsive front-end applications.',
    technologies: ['Vue.js', 'Python', 'Docker', 'PostgreSQL'],
  },
  // Add more experiences here
];

export function ExperienceTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
    });

    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <h2 className="text-3xl font-bold mb-12">Experience</h2>
        <div ref={timelineRef} className="relative">
          {/* Line */}
          <div className="absolute left-0 md:left-1/2 h-full w-px bg-border -translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`timeline-item relative flex flex-col md:flex-row gap-8 md:gap-16 mb-12 opacity-0 transition-all duration-500 ${
                index % 2 === 0
                  ? 'md:flex-row-reverse translate-x-12'
                  : '-translate-x-12'
              }`}
              style={{ '--stagger-delay': `${index * 100}ms` } as React.CSSProperties}
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 translate-y-1.5" />

              {/* Content */}
              <div className="md:w-1/2 pl-8 md:pl-0">
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <Badge variant="secondary">{exp.period}</Badge>
                  </div>
                  <p className="text-lg text-muted-foreground mb-2">{exp.company}</p>
                  <p className="mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
