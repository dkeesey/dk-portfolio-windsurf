import { Container } from '@/components/ui/container';
import { CommandMenu } from '@/components/ui/command-menu';
import { cn } from '@/lib/utils';
import { Link } from '@/components/ui/link';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header 
      className={cn(
        "border-b border-border backdrop-blur", 
        "bg-[#eee]", // Updated to #eee
        className
      )}
    >
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Portfolio</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/projects">Projects</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/design-system">Design System</Link>
            </nav>
            <CommandMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
