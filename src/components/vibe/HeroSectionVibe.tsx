import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MicrotextReact } from '@/components/vibe/MicrotextReact';

interface Props {
  microtext: {
    hero: {
      headline: string;
      description: string;
      cta_primary: string;
      cta_secondary: string;
    };
  };
}

export function HeroSectionVibe({ microtext }: Props) {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden -mt-px">
      {/* Marble run hero image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/marble-run-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark overlay for text legibility — 65% ensures WCAG AA contrast for white text */}
      <div className="absolute inset-0 z-[1] bg-black/65" />

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <MicrotextReact
            id="hero.headline"
            as="h1"
            className="mb-6 text-5xl font-bold text-white leading-tight"
            defaultValue={microtext.hero.headline}
            markdown={false}
          />

          <MicrotextReact
            id="hero.description"
            as="p"
            className="mb-8 text-xl text-gray-100"
            defaultValue={microtext.hero.description}
            markdown={false}
          />

          <div className="flex gap-4">
            {/* Primary: dark text on white bg — contrast ~21:1, WCAG AAA */}
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
              <a href="/projects">
                <MicrotextReact
                  id="hero.cta_primary"
                  defaultValue={microtext.hero.cta_primary}
                  markdown={false}
                />
              </a>
            </Button>
            {/* Secondary: white text on white/20 bg over dark overlay — contrast >4.5:1, WCAG AA */}
            <Button variant="outline" size="lg" asChild className="border-2 border-white text-white bg-white/15 hover:bg-white/25 font-semibold">
              <a href="/contact">
                <MicrotextReact
                  id="hero.cta_secondary"
                  defaultValue={microtext.hero.cta_secondary}
                  markdown={false}
                />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
