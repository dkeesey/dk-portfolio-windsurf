import { useEffect, useRef } from 'react';
import { Container } from '@/components/ui/primitives';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.8; // 80vh
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Create particles
    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
    }));

    // Animation loop
    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(var(--primary), 0.1)';
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10"
        style={{ opacity: 0.7 }}
      />
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">
            Hi, I'm Dean Keesey
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Full Stack Developer & Software Engineer crafting high-performance web applications
            with modern technologies and best practices.
          </p>
          <div className="flex gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              Contact Me
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
