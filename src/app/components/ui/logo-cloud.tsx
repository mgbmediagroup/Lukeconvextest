import { InfiniteSlider } from "@/app/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/app/components/ui/progressive-blur";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
  gap?: number;
  speed?: number;
  speedOnHover?: number;
};

export function LogoCloud({ logos, gap = 42, speed = 60, speedOnHover = 20 }: LogoCloudProps) {
  return (
    <div className="relative mx-auto max-w-7xl py-8">
      <InfiniteSlider gap={gap} reverse speed={speed} speedOnHover={speedOnHover}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-6 select-none md:h-8 brightness-0"
            height="auto"
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width="auto"
          />
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 h-full w-[160px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 h-full w-[160px]"
        direction="right"
      />
    </div>
  );
}
