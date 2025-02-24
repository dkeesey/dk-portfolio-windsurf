import { Container } from '@/components/ui/container';
import { CommandMenu } from '@/components/search/CommandMenu';

export function Header() {
  return (
    <header className="border-b">
      <Container className="flex items-center justify-between py-4">
        <a href="/" className="text-2xl font-bold">
          DK
        </a>
        <div className="flex items-center gap-4">
          <CommandMenu />
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/projects" className="hover:text-blue-600">
                  Projects
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-blue-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="/design-system" className="hover:text-blue-600">
                  Design System
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
