import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/app/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-xl font-bold">MGB</div>
        </div>
      </nav>

      {/* Main Content - Full Screen */}
      <section className="h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-12">
            <span className="font-light">We Are </span>
            <span className="font-bold">MGB Design</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            At MGB Design, we believe that great design transcends aesthetics. It's about crafting 
            experiences that resonate on an emotional level, creating connections that last beyond 
            the first impression. We're collaborators, problem-solvers, and storytellers who care 
            deeply about bringing your vision to life.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}