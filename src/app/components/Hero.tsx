import { WebGLShader } from "@/app/components/ui/web-gl-shader";
import { Button } from '@/app/components/ui/neon-button';
import { InfiniteSlider } from "@/app/components/ui/infinite-slider";
import mgbLogo from 'figma:asset/9eaf8d1fa69868918f60ca6c8ad47abee34590eb.png';

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden h-screen max-h-[1100px]">
      {/* WebGL Shader Background - Clipped to Hero Section */}
      <div className="absolute inset-0 overflow-hidden">
        <WebGLShader />
        {/* Bottom Gradient Fade */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "300px",
            background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 50%, #000000 100%)",
          }}
        />
      </div>
      
      {/* Header Navigation */}
      <header className="absolute top-0 left-0 right-0 z-20 flex flex-row justify-between items-center px-8 lg:px-16 py-6">
        {/* Logo */}
        <div>
          <img src={mgbLogo} alt="MGB Design" className="h-10 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex flex-row items-center gap-8" aria-label="Main navigation">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#FFFFFF",
            }}
          >
            Home
          </button>
          <button
            onClick={scrollToPortfolio}
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#FFFFFF",
            }}
          >
            Portfolio
          </button>
          <button
            onClick={scrollToAbout}
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#FFFFFF",
            }}
          >
            About
          </button>
          <button
            onClick={scrollToContact}
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#FFFFFF",
            }}
          >
            Contact
          </button>
        </nav>

        {/* Contact Button */}
        <button
          onClick={scrollToContact}
          className="px-6 py-2.5 rounded-full transition-all hover:scale-105"
          style={{
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
            fontWeight: 400,
            color: "#FFFFFF",
          }}
        >
          Contact
        </button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-start justify-center w-full px-4 pt-32">
        <div className="relative w-full mx-auto max-w-3xl">
          <main className="relative py-10 overflow-hidden">
            <h1 className="mb-3 text-white text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">
              Design Is Everything
            </h1>
            <p className="text-white/60 px-6 text-center text-xs md:text-sm lg:text-lg">
              Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.
            </p>
            <div className="my-8 flex items-center justify-center gap-1">
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <p className="text-sm text-green-500">Available for New Projects</p>
            </div>
            
            <div className="flex justify-center"> 
              <button
                onClick={scrollToContact}
                className="relative px-8 py-3 rounded-full transition-all hover:scale-105 overflow-hidden group"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                }}
              >
                <span className="relative z-10">Book a Meeting</span>
                <span 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                  }}
                />
              </button>
            </div> 
          </main>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full overflow-hidden pb-8">
        {/* "Trusted by" Text */}
        <div className="text-center mb-8">
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.5)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Trusted by
          </span>
        </div>

        {/* Scrolling Brands */}
        <InfiniteSlider
          gap={80}
          duration={40}
          durationOnHover={60}
          className="w-full"
        >
          {['NVIDIA', 'Supabase', 'OpenAI', 'Vercel', 'GitHub', 'Claude', 'Turso', 'Clerk'].map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center hover:opacity-100 transition-opacity"
              style={{
                minWidth: "200px",
                height: "80px",
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "rgba(255, 255, 255, 0.6)",
                  letterSpacing: "-0.02em",
                }}
              >
                {brand}
              </div>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
}