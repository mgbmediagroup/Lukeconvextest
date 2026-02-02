import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface DesignIcon {
  icon: React.ReactNode;
  label: string;
  position: { x: string; y: string };
}

interface MGBHeroProps {
  logo?: React.ReactNode;
  navigation?: Array<{
    label: string;
    onClick?: () => void;
  }>;
  contactButton?: {
    label: string;
    onClick: () => void;
  };
  title: string;
  highlightedText?: string;
  subtitle: string;
  ctaButton?: {
    label: string;
    onClick: () => void;
  };
  designIcons?: DesignIcon[];
  trustedByText?: string;
  brands?: Array<{
    name: string;
    logo: React.ReactNode;
  }>;
  className?: string;
  children?: React.ReactNode;
}

export function MGBHero({
  logo,
  navigation = [],
  contactButton,
  title,
  highlightedText = "Design That Feels",
  subtitle,
  ctaButton,
  designIcons = [],
  trustedByText = "Trusted by",
  brands = [],
  className,
  children,
}: MGBHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-screen flex flex-col overflow-hidden bg-black",
        className
      )}
      role="banner"
      aria-label="Hero section"
    >
      {/* Radial Glow Background - Warm golden tones */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute"
          style={{
            width: "1200px",
            height: "1200px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(218, 165, 32, 0.15) 0%, rgba(218, 165, 32, 0) 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex flex-row justify-between items-center px-8 lg:px-16"
        style={{
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        {/* Logo */}
        <div className="text-white">
          {logo}
        </div>

        {/* Navigation */}
        {navigation.length > 0 && (
          <nav className="hidden lg:flex flex-row items-center gap-8" aria-label="Main navigation">
            {navigation.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="hover:opacity-70 transition-opacity text-white text-[15px] font-light"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        {/* Contact Button */}
        {contactButton && (
          <button
            onClick={contactButton.onClick}
            className="px-6 py-2.5 rounded-none transition-all hover:bg-white/10 border border-white/30 text-white text-[15px] font-light"
          >
            {contactButton.label}
          </button>
        )}
      </motion.header>

      {/* Main Content */}
      {children ? (
        <div className="relative z-10 flex-1 flex items-center justify-center w-full">
          {children}
        </div>
      ) : (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
          {/* Floating Design Icons */}
          {designIcons.map((icon, index) => (
            <motion.div
              key={index}
              className="absolute flex flex-col items-center gap-2 hidden lg:flex"
              style={{
                left: icon.position.x,
                top: icon.position.y,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -20, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
                scale: { duration: 0.6, delay: 0.3 + index * 0.1 },
                y: {
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "0",
                  background: "rgba(218, 165, 32, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(218, 165, 32, 0.3)",
                  boxShadow: "0 0 40px rgba(218, 165, 32, 0.2)",
                }}
              >
                {icon.icon}
              </div>
              <span
                className="text-white text-[12px] font-semibold uppercase tracking-wider"
              >
                {icon.label}
              </span>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center text-center max-w-4xl"
            style={{ gap: "32px" }}
          >
            {/* Title */}
            <h1
              className="text-white leading-tight tracking-tight"
              style={{
                fontWeight: 300,
                fontSize: "clamp(32px, 5vw, 64px)",
                lineHeight: "1.2",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
              <br />
              <span
                className="font-bold"
                style={{
                  background: "linear-gradient(90deg, #DAA520 0%, #FFD700 50%, #DAA520 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {highlightedText}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-gray-400 max-w-[500px]"
              style={{
                fontWeight: 300,
                fontSize: "clamp(14px, 2vw, 16px)",
                lineHeight: "1.6",
              }}
            >
              {subtitle}
            </p>

            {/* CTA Button */}
            {ctaButton && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                onClick={ctaButton.onClick}
                className="px-8 py-3 rounded-none transition-all bg-transparent border border-white/30 text-white text-[15px] font-medium hover:bg-white/10"
                style={{
                  boxShadow: "0 4px 20px rgba(218, 165, 32, 0.2)",
                }}
              >
                {ctaButton.label}
              </motion.button>
            )}
          </motion.div>
        </div>
      )}

      {/* Brand Slider */}
      {brands.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative z-10 w-full overflow-hidden"
          style={{
            paddingTop: "60px",
            paddingBottom: "60px",
          }}
        >
          {/* "Trusted by" Text */}
          <div className="text-center mb-8">
            <span
              className="text-gray-500 uppercase tracking-widest"
              style={{
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.1em",
              }}
            >
              {trustedByText}
            </span>
          </div>

          {/* Gradient Overlays */}
          <div
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: "200px",
              background: "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: "200px",
              background: "linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
            }}
          />

          {/* Scrolling Brands */}
          <motion.div
            className="flex items-center"
            animate={{
              x: [0, -(brands.length * 200)],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: brands.length * 5,
                ease: "linear",
              },
            }}
            style={{
              gap: "80px",
              paddingLeft: "80px",
            }}
          >
            {/* Duplicate brands for seamless loop */}
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center opacity-40 hover:opacity-70 transition-opacity"
                style={{
                  width: "120px",
                  height: "40px",
                }}
              >
                {brand.logo}
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
