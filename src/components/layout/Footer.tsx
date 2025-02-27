export function Footer() {
  return (
    <footer className="mt-8 border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Dean Keesey</h3>
            <p>© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Navigation</h3>
            <nav className="space-y-2">
              <a href="/" className="block hover:text-blue-600">Home</a>
              <a href="/projects" className="block hover:text-blue-600">Projects</a>
              <a href="/blog" className="block hover:text-blue-600">Blog</a>
              <a href="/contact" className="block hover:text-blue-600">Contact</a>
            </nav>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/dkeesey"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/deankeesey"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
