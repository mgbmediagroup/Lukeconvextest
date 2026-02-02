import { Navigation } from '@/app/components/Navigation';
import { HeroFuturistic } from '@/app/components/ui/hero-futuristic';

export const HeroWithScene = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Navigation />
      <HeroFuturistic />
    </div>
  );
};