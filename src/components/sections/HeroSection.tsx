import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden -mt-px">
      {/* Marble run hero image background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/marble-run-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 z-[1] bg-black/55" />

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-5xl font-bold text-white leading-tight">
            I provide the judgment.<br />Claude implements.
          </h1>
          <p className="mb-8 text-xl text-gray-200">
            AI Systems Architect. Multi-agent orchestration, enterprise automation, and production AI infrastructure. The gap between AI tools and AI results is architectural.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <a href="/projects">View Case Studies</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white/10">
              <a href="/contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
