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
    description:
      'Led development of high-performance web applications using modern technologies.',
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Tech Innovators',
    period: '2020 - 2022',
    description:
      'Built scalable microservices and responsive front-end applications.',
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

    const timelineItems =
      timelineRef.current?.querySelectorAll('.timeline-item');
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-muted/30 py-20">
      <Container>
        <h2 className="mb-12 text-3xl font-bold">Experience</h2>
        <div ref={timelineRef} className="relative">
          {/* Line */}
          <div className="absolute left-0 h-full w-px -translate-x-1/2 bg-border md:left-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`timeline-item relative mb-12 flex flex-col gap-8 opacity-0 transition-all duration-500 md:flex-row md:gap-16 ${
                index % 2 === 0
                  ? 'translate-x-12 md:flex-row-reverse'
                  : '-translate-x-12'
              }`}
              style={
                { '--stagger-delay': `${index * 100}ms` } as React.CSSProperties
              }
            >
              {/* Dot */}
              <div className="absolute left-0 h-4 w-4 -translate-x-1/2 translate-y-1.5 rounded-full bg-primary md:left-1/2" />

              {/* Content */}
              <div className="pl-8 md:w-1/2 md:pl-0">
                <div className="rounded-lg bg-card p-6 shadow-sm">
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <Badge variant="secondary">{exp.period}</Badge>
                  </div>
                  <p className="mb-2 text-lg text-muted-foreground">
                    {exp.company}
                  </p>
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
