import { LogoCloud } from "@/app/components/ui/logo-cloud";

const clientLogos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Client 1",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Client 2",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "Client 3",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Client 4",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Client 5",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "Client 6",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Client 7",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Client 8",
  },
];

export function TrustedBySection() {
  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Trusted By Header */}
        <div className="text-center mb-8">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Trusted by
          </h3>
        </div>

        {/* Logo Cloud */}
        <LogoCloud logos={clientLogos} />
      </div>
    </section>
  );
}