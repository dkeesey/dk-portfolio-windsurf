export function Footer() {
  return (
    <footer className="mt-8 relative overflow-hidden">
      {/* Animated tileable gradient background - same as hero section */}
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
        
        {/* Purple Circle (Medium - Medium speed) */}
        <div 
          className="absolute animate-path-8-medium"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.55) 0%, rgba(147, 51, 234, 0.25) 50%, rgba(126, 34, 206, 0) 70%)',
            filter: 'blur(10px)',
            width: '12rem',
            height: '12rem'
          }}
        />
      </div>

      {/* Content with backdrop filter for better text readability */}
      <div className="container relative z-10 mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg">
            <h3 className="font-bold mb-4">Dean Keesey</h3>
            <p>© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg">
            <h3 className="font-bold mb-4">Navigation</h3>
            <nav className="space-y-2">
              <a href="/" className="block hover:text-purple-600">Home</a>
              <a href="/projects" className="block hover:text-purple-600">Projects</a>
              <a href="/blog" className="block hover:text-purple-600">Blog</a>
              <a href="/contact" className="block hover:text-purple-600">Contact</a>
            </nav>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg">
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/dkeesey"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/deankeesey"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600"
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
