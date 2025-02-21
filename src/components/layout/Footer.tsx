export function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <p>© {new Date().getFullYear()} Dean Keesey</p>
          <div className="flex space-x-4">
            <a href="https://github.com/dkeesey" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              GitHub
            </a>
            <a href="https://linkedin.com/in/deankeesey" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
