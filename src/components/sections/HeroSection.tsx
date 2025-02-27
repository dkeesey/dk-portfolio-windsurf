import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.8;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced particle system with mouse interaction
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      originalX: number;
      originalY: number;
      
      constructor() {
        const canvas = canvasRef.current;
        if (!canvas) {
          this.x = this.originalX = 0;
          this.y = this.originalY = 0;
          this.vx = 0;
          this.vy = 0;
          this.size = 1;
          return;
        }
        this.x = this.originalX = Math.random() * canvas.width;
        this.y = this.originalY = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
      }

      update(mouseX: number, mouseY: number) {
        // Mouse repulsion
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 100;
          this.vx -= Math.cos(angle) * force * 0.5;
          this.vy -= Math.sin(angle) * force * 0.5;
        }

        // Return to original position
        const homeX = this.originalX - this.x;
        const homeY = this.originalY - this.y;
        this.vx += homeX * 0.05;
        this.vy += homeY * 0.05;

        // Apply velocity with damping
        this.vx *= 0.95;
        this.vy *= 0.95;
        
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(var(--primary), 0.1)';
        ctx.fill();
      }
    }

    // Initialize particles
    const particles: Particle[] = Array.from({ length: 50 }, () => new Particle());

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update(mousePosition.x, mousePosition.y);
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <section className="relative flex min-h-[80vh] items-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10"
        style={{ opacity: 0.7 }}
      />
      <Container>
        <div className="max-w-2xl">
          <h1 className="mb-6 text-5xl font-bold">Hi, I'm Dean Keesey</h1>
          <p className="mb-8 text-xl text-muted-foreground">
          Full Stack Developer specializing in modern web frameworks, SEO optimization, and digital marketing integration. I create high-performance websites that drive real-world results through improved search visibility and user engagement.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
