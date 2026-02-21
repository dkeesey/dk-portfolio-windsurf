export function Footer() {
  return (
    <footer className="relative">
      {/* Gradient separator line */}
      <div 
        className="h-1 w-full" 
        style={{
          background: 'linear-gradient(90deg, #c084fc 0%, #f472b6 50%, #c084fc 100%)',
        }}
      />
      
      {/* Dark footer with subtle pattern */}
      <div className="bg-gray-900 relative">
        {/* Subtle dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#f472b6 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-white">
              <h3 className="font-bold text-lg mb-4 text-purple-300">Dean Keesey</h3>
              <p className="text-gray-300">AI Systems Builder. I build orchestration systems that harness LLMs and focus them on specific, reliable outcomes.</p>
              <p className="mt-4 text-gray-400">© {new Date().getFullYear()} All Rights Reserved</p>
            </div>
            
            <div className="text-white">
              <h3 className="font-bold text-lg mb-4 text-purple-300">Navigation</h3>
              <nav className="space-y-2">
                <a href="/" className="block text-gray-300 hover:text-purple-300 transition-colors">Home</a>
                <a href="/projects" className="block text-gray-300 hover:text-purple-300 transition-colors">Projects</a>
                <a href="/blog" className="block text-gray-300 hover:text-purple-300 transition-colors">Blog</a>
                <a href="/contact" className="block text-gray-300 hover:text-purple-300 transition-colors">Contact</a>
              </nav>
            </div>
            
            <div className="text-white">
              <h3 className="font-bold text-lg mb-4 text-purple-300">Connect</h3>
              <div className="space-y-2">
                <a
                  href="https://github.com/dkeesey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-purple-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/deankeesey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-purple-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
              <div className="mt-6">
                <a 
                  href="/contact" 
                  className="inline-block px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom bar with subtle gradient */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-center text-gray-500 text-sm">
              Designed and developed with ♥ by Dean Keesey
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
