import { useState } from 'react';

type FilterType = 'All' | 'UI/UX' | 'Development' | 'Branding' | '3D';

interface Project {
  id: number;
  title: string;
  description: string;
  category: FilterType[];
  image?: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Vertical Future Garden',
    description: 'Year-round local produce, sustainably grown in Hungary. Premium vegetables using Dutch precision agriculture and geothermal energy.',
    category: ['UI/UX', 'Development'],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJ0aWNhbCUyMGdhcmRlbiUyMGZhcm18ZW58MXx8fHwxNzcwMDU1OTI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://verticalgarden2.netlify.app/',
  },
  {
    id: 2,
    title: 'E-Commerce Platform Redesign',
    description: 'A complete overhaul of a fashion retail website focusing on user flow and conversion optimization.',
    category: ['UI/UX', 'Development'],
  },
  {
    id: 3,
    title: 'FinTech Mobile App',
    description: 'Intuitive mobile banking experience with seamless transactions and budget tracking.',
    category: ['UI/UX', 'Development'],
  },
  {
    id: 4,
    title: 'Sustainable Brand Identity',
    description: 'Comprehensive branding for an eco-friendly startup including logo, guidelines, and collateral.',
    category: ['Branding'],
  },
  {
    id: 5,
    title: 'Product Visualization',
    description: 'Photorealistic 3D renders and animations for a luxury watch collection launch.',
    category: ['3D'],
  },
  {
    id: 6,
    title: 'SaaS Dashboard Interface',
    description: 'Complex data visualization and workflow management for enterprise analytics platform.',
    category: ['UI/UX', 'Development'],
  },
];

const filters: FilterType[] = ['All', 'UI/UX', 'Development', 'Branding', '3D'];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Work
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
            A selection of projects showcasing our commitment to excellence.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer space-y-4">
              {/* Project image */}
              <div className="relative overflow-hidden aspect-[16/10] bg-gray-900 border border-gray-800 p-4">
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Project info */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="text-base text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags and Link */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {project.category.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-white text-black"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto px-4 py-1 text-xs bg-white text-black hover:bg-gray-200 transition-colors"
                    >
                      View Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}