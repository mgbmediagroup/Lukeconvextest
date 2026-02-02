import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/3256d460c3982e2388646b90bad785032d0ae47d.png';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true); // Start with true for hero section

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine if we're over a dark or light section
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hero section (black background) - first screen
      const heroHeight = windowHeight;
      
      // Check if we're in the portfolio section (black background)
      // Use a smaller threshold for faster color switching
      const navHeight = 100; // Navigation height buffer
      const portfolioSection = document.getElementById('portfolio');
      const portfolioInView = portfolioSection ? (
        scrollPosition + navHeight >= portfolioSection.offsetTop - 50 &&
        scrollPosition + navHeight <= portfolioSection.offsetTop + portfolioSection.offsetHeight
      ) : false;
      
      // Footer detection - check if we're near the bottom with tighter threshold
      const footerThreshold = documentHeight - windowHeight - 100;
      
      if (scrollPosition < heroHeight - 150) {
        // We're in the hero section (black background)
        setIsDarkBackground(true);
      } else if (portfolioInView) {
        // We're in the portfolio section (black background)
        setIsDarkBackground(true);
      } else if (scrollPosition > footerThreshold) {
        // We're in the footer section (black background)
        setIsDarkBackground(true);
      } else {
        // We're in the middle sections (white/light backgrounds)
        setIsDarkBackground(false);
      }
    };
    
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Add a slight delay to recheck after initial render
    const timer = setTimeout(handleScroll, 100);
    const timer2 = setTimeout(handleScroll, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Left: Logo + Separator + Icon */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative cursor-pointer group"
            >
              <img 
                src={logoImage} 
                alt="MGB" 
                className="h-24 w-auto transition-all duration-300" 
                style={{ filter: isDarkBackground ? 'invert(0)' : 'invert(1)' }} 
              />
            </motion.div>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`transition-colors text-sm ${isDarkBackground ? 'text-white hover:text-white/60' : 'text-black hover:text-gray-600'}`}
            >
              Home
            </button>
          </div>

          {/* Right: Let's Talk + Separator + Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className={`hidden md:flex items-center gap-1 transition-colors text-sm font-medium ${isDarkBackground ? 'text-white hover:text-white/60' : 'text-black hover:text-gray-600'}`}
            >
              Let's talk
              <ArrowUpRight size={16} className={isDarkBackground ? 'text-white' : 'text-black'} />
            </button>
            <span className={`hidden md:block transition-colors duration-300 ${isDarkBackground ? 'text-white/40' : 'text-gray-400'}`}>|</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`transition-colors ${isDarkBackground ? 'text-white hover:text-white/60' : 'text-black hover:text-gray-600'}`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-6 py-6 space-y-4">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-black hover:text-gray-600 transition-colors py-2 text-sm"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-black hover:text-gray-600 transition-colors py-2 text-sm font-medium"
            >
              Let's talk
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}