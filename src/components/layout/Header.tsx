import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { CommandMenu } from '@/components/ui/command-menu';
import { cn } from '@/lib/utils';
import { Link } from '@/components/ui/link';
import { Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  className?: string;
  hideGradient?: boolean;
}

export function Header({ className, hideGradient = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header 
      className={cn(
        "border-b border-border backdrop-blur sticky top-0 z-50", 
        "bg-white", // Changed from #eee to white
        className
      )}
    >
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Dean Keesey</span>
          </Link>
          <div className="flex items-center gap-4">
            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/projects">Projects</Link>
              <Link href="/blog">Token Overflow</Link>
              <Link href="/prompt-engineering">Prompt Engineering</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            
            {/* Command Menu (Search) */}
            <CommandMenu />
            
            {/* Mobile Navigation Menu - Visible only on mobile */}
            <div className="md:hidden">
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-4 mt-2 bg-white rounded-md shadow-lg">
                  <DropdownMenuItem asChild className="py-3 px-4 text-base hover:bg-purple-50 hover:text-purple-700">
                    <Link href="/projects">Projects</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="py-3 px-4 text-base hover:bg-purple-50 hover:text-purple-700">
                    <Link href="/blog">Token Overflow</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="py-3 px-4 text-base hover:bg-purple-50 hover:text-purple-700">
                    <Link href="/prompt-engineering">Prompt Engineering</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="py-3 px-4 text-base hover:bg-purple-50 hover:text-purple-700">
                    <Link href="/contact">Contact</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Container>
      {/* Decorative gradient line */}
      {!hideGradient && (
        <div className="h-1 w-full" style={{background: "linear-gradient(90deg, #c084fc 0%, #f472b6 50%, #c084fc 100%)"}} />
      )}
    </header>
  );
}
