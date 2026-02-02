import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { BackgroundGlow } from '@/app/components/ui/background-glow';

export function AboutMGB() {
  return (
    <section id="about" className="relative py-32 md:py-48 bg-black overflow-hidden">
      {/* Yellow Glow Background */}
      <BackgroundGlow />
      
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient background blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-gray-800/40 via-gray-900/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-gray-700/30 via-gray-800/15 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Main heading */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-tight text-white">
            <span className="font-light">Every </span>
            <span className="font-bold">Experience</span>
            <br />
            <span className="font-light">Begins With a </span>
            <span className="font-bold">Feeling</span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          We blend creativity, emotion, and innovation to craft digital worlds that invite
          <br className="hidden md:block" />
          exploration <span className="text-gray-400">and inspire connection.</span>
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              ABOUT US
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}