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
    // Removed min-h-[80vh] and set to min-h-[90vh] to make it larger and added -mt-px to remove any gap
    <section className="relative flex min-h-[90vh] items-center overflow-hidden -mt-px">
      {/* Animated tileable gradient background */}
      <div
        className="absolute inset-0 z-0 animate-gradient-flow"
        style={{
          background: 'repeating-linear-gradient(135deg, #f472b6 0%, #c084fc 50%, #f472b6 100%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Multiple colored circles with different CSS animations */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        {/* Yellow Circle 1 (Large - Slow) */}
        <div
          className="absolute animate-path-1-slow"
          style={{
            background: 'radial-gradient(circle, rgba(255, 230, 100, 0.6) 0%, rgba(255, 215, 0, 0.25) 50%, rgba(255, 200, 0, 0) 70%)',
            filter: 'blur(15px)',
            width: '24rem',
            height: '24rem'
          }}
        />

        {/* Yellow Circle 2 (Medium - Medium speed) */}
        <div
          className="absolute animate-path-2-medium"
          style={{
            background: 'radial-gradient(circle, rgba(255, 230, 100, 0.5) 0%, rgba(255, 215, 0, 0.2) 50%, rgba(255, 200, 0, 0) 70%)',
            filter: 'blur(12px)',
            width: '16rem',
            height: '16rem'
          }}
        />

        {/* Yellow Circle 3 (Small - Fast) */}
        <div
          className="absolute animate-path-3-fast"
          style={{
            background: 'radial-gradient(circle, rgba(255, 230, 100, 0.4) 0%, rgba(255, 215, 0, 0.15) 50%, rgba(255, 200, 0, 0) 70%)',
            filter: 'blur(8px)',
            width: '10rem',
            height: '10rem'
          }}
        />

        {/* Pink Circle 1 (Large - Slow) */}
        <div
          className="absolute animate-path-4-slow"
          style={{
            background: 'radial-gradient(circle, rgba(249, 168, 212, 0.55) 0%, rgba(236, 72, 153, 0.22) 50%, rgba(219, 39, 119, 0) 70%)',
            filter: 'blur(15px)',
            width: '22rem',
            height: '22rem'
          }}
        />

        {/* Pink Circle 2 (Medium - Medium speed) */}
        <div
          className="absolute animate-path-5-medium"
          style={{
            background: 'radial-gradient(circle, rgba(249, 168, 212, 0.45) 0%, rgba(236, 72, 153, 0.18) 50%, rgba(219, 39, 119, 0) 70%)',
            filter: 'blur(10px)',
            width: '14rem',
            height: '14rem'
          }}
        />

        {/* Pink Circle 3 (Small - Fast) */}
        <div
          className="absolute animate-path-6-fast"
          style={{
            background: 'radial-gradient(circle, rgba(249, 168, 212, 0.35) 0%, rgba(236, 72, 153, 0.12) 50%, rgba(219, 39, 119, 0) 70%)',
            filter: 'blur(8px)',
            width: '8rem',
            height: '8rem'
          }}
        />

        {/* Previously Red Circle 1 - now Deep Purple (Large - Slow) */}
        <div
          className="absolute animate-path-7-slow"
          style={{
            background: 'radial-gradient(circle, rgba(192, 132, 252, 0.65) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(147, 51, 234, 0) 70%)',
            filter: 'blur(15px)',
            width: '20rem',
            height: '20rem'
          }}
        />

        {/* Previously Red Circle 2 - now Vibrant Purple (Medium - Medium speed) */}
        <div
          className="absolute animate-path-8-medium"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.55) 0%, rgba(147, 51, 234, 0.25) 50%, rgba(126, 34, 206, 0) 70%)',
            filter: 'blur(10px)',
            width: '12rem',
            height: '12rem'
          }}
        />

        {/* Previously Red Circle 3 - now Deep Pink (Small - Fast) */}
        <div
          className="absolute animate-path-9-fast"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.45) 0%, rgba(219, 39, 119, 0.2) 50%, rgba(190, 24, 93, 0) 70%)',
            filter: 'blur(8px)',
            width: '7rem',
            height: '7rem'
          }}
        />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-2xl bg-white/50 backdrop-blur-md p-8 rounded-xl shadow-lg">
          <MicrotextReact
            id="hero.headline"
            as="h1"
            className="mb-6 text-5xl font-bold text-gray-900"
            defaultValue={microtext.hero.headline}
            markdown={false}
          />

          <MicrotextReact
            id="hero.description"
            as="p"
            className="mb-8 text-xl text-gray-800"
            defaultValue={microtext.hero.description}
            markdown={false}
          />

          <div className="flex gap-4">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <a href="/projects">
                <MicrotextReact
                  id="hero.cta_primary"
                  defaultValue={microtext.hero.cta_primary}
                  markdown={false}
                />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-purple-600 text-purple-700 hover:bg-purple-50">
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
