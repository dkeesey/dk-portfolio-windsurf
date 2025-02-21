export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">DK</a>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/projects" className="hover:text-blue-600">Projects</a></li>
            <li><a href="/blog" className="hover:text-blue-600">Blog</a></li>
            <li><a href="/design-system" className="hover:text-blue-600">Design System</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
