import { useEffect, useRef } from 'react'

interface LogoWaterfallProps {
  className?: string
}

export default function LogoWaterfall({ className = '' }: LogoWaterfallProps) {
  // Placeholder client names - replace with actual logos later
  const clients = [
    'Client 1',
    'Client 2',
    'Client 3',
    'Client 4',
    'Client 5',
    'Client 6',
    'Client 7',
    'Client 8',
    'Client 9',
    'Client 10',
    'Client 11',
    'Client 12',
  ]

  return (
    <div className={`w-full py-16 bg-white border-y border-black/10 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
        <p className="text-sm text-black/50 uppercase tracking-wider font-medium">
          Trusted by industry leaders
        </p>
      </div>

      {/* Infinite scroll container */}
      <div className="relative flex overflow-hidden">
        {/* First set of logos */}
        <div className="flex animate-scroll-left gap-8 pr-8">
          {clients.map((client, index) => (
            <div
              key={`set1-${index}`}
              className="flex-shrink-0 w-40 h-24 bg-black/5 border border-black/10 rounded flex items-center justify-center hover:bg-black/10 transition-colors duration-300"
            >
              <span className="text-black/40 text-sm font-medium">{client}</span>
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex animate-scroll-left gap-8 pr-8" aria-hidden="true">
          {clients.map((client, index) => (
            <div
              key={`set2-${index}`}
              className="flex-shrink-0 w-40 h-24 bg-black/5 border border-black/10 rounded flex items-center justify-center hover:bg-black/10 transition-colors duration-300"
            >
              <span className="text-black/40 text-sm font-medium">{client}</span>
            </div>
          ))}
        </div>

        {/* Third set to ensure no gaps */}
        <div className="flex animate-scroll-left gap-8 pr-8" aria-hidden="true">
          {clients.map((client, index) => (
            <div
              key={`set3-${index}`}
              className="flex-shrink-0 w-40 h-24 bg-black/5 border border-black/10 rounded flex items-center justify-center hover:bg-black/10 transition-colors duration-300"
            >
              <span className="text-black/40 text-sm font-medium">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}