import { Pen, Code, Palette, Box } from 'lucide-react';

const services = [
  {
    icon: Pen,
    title: 'UI/UX Design',
    description: 'Intuitive interfaces that prioritize user experience and aesthetic excellence.',
  },
  {
    icon: Code,
    title: 'Web/App Development',
    description: 'Robust, scalable applications built with cutting-edge technologies.',
  },
  {
    icon: Palette,
    title: 'Branding',
    description: 'Cohesive brand identities that tell your story and resonate with audiences.',
  },
  {
    icon: Box,
    title: '3D Animation',
    description: 'Immersive 3D experiences that bring concepts to life with stunning detail.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header with generous spacing */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black mb-4">
            Services
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            We offer comprehensive digital solutions tailored to elevate your brand.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {services.map((service) => (
            <div key={service.title} className="space-y-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-black flex items-center justify-center">
                <service.icon size={24} className="text-white" strokeWidth={1.5} />
              </div>

              {/* Service title */}
              <h3 className="text-2xl font-semibold text-black">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-base text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}