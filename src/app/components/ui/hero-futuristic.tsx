'use client';

import { useEffect, useState } from 'react';
import { ShaderAnimation } from '@/app/components/ui/shader-lines';

export const HeroFuturistic = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen relative" style={{ backgroundColor: '#000000' }}>
      {/* Shader Lines Background */}
      <ShaderAnimation />
      
      {/* Content - positioned at bottom */}
      <div className="h-screen w-full absolute z-[60] px-6 md:px-12 lg:px-16 flex items-end pb-12 md:pb-16 lg:pb-20">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            {/* Left Content */}
            <div className={`space-y-4 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-white">
                Design That Feels.
                <br />
                Experiences That Resonate.
              </h1>
              
              <p className="text-sm md:text-base text-white/70 max-w-sm leading-relaxed">
                We blend creativity, emotion, and innovation to create digital worlds that your audience can connect with.
              </p>
              
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-xs font-medium hover:bg-gray-200 transition-all duration-300 pointer-events-auto"
              >
                LET'S TALK
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path 
                    d="M1 8H15M15 8L8 1M15 8L8 15" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Right Content */}
            <div className={`space-y-4 ${isVisible ? 'fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-md">
                Whether through intuitive interfaces, immersive 3D, or bold visual storytelling,{' '}
                <span className="font-normal text-white">we design moments that people don't just see — they feel.</span>
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 border border-white/30 rounded-full text-white text-xs">
                  UI/UX
                </span>
                <span className="px-3 py-1.5 border border-white/30 rounded-full text-white text-xs">
                  3D VISUALIZATION
                </span>
                <span className="px-3 py-1.5 border border-white/30 rounded-full text-white text-xs">
                  DEVELOPMENT
                </span>
                <span className="px-3 py-1.5 border border-white/30 rounded-full text-white text-xs flex items-center justify-center w-8 h-8">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 0L4 8M0 4L8 4" stroke="white" strokeWidth="1.5"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFuturistic;