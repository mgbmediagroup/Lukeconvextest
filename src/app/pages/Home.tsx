import { Hero } from '@/app/components/Hero';
import { AboutMGB } from '@/app/components/AboutMGB';
import { Portfolio } from '@/app/components/Portfolio';
import { Team } from '@/app/components/Team';
import { Contact } from '@/app/components/Contact';
import { Footer } from '@/app/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] overflow-x-hidden">
      <Hero />
      <AboutMGB />
      <Portfolio />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}