export function ClientsMarquee() {
  // Array of placeholder clients - can be replaced with actual logos later
  const clients = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`,
  }));

  return (
    <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
      <div className="mb-8 px-6">
        <h3 className="text-sm font-medium text-gray-500 text-center uppercase tracking-wider">
          Trusted by
        </h3>
      </div>

      {/* Marquee container */}
      <div className="relative flex">
        <div className="flex animate-scroll-left gap-6">
          {/* First set */}
          {clients.map((client) => (
            <div
              key={`first-${client.id}`}
              className="flex-shrink-0 w-32 h-20 bg-gray-100 flex items-center justify-center"
            >
              <span className="text-xs text-gray-400">{client.name}</span>
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex animate-scroll-left gap-6" aria-hidden="true">
          {clients.map((client) => (
            <div
              key={`second-${client.id}`}
              className="flex-shrink-0 w-32 h-20 bg-gray-100 flex items-center justify-center"
            >
              <span className="text-xs text-gray-400">{client.name}</span>
            </div>
          ))}
        </div>
        {/* Third set to ensure no gaps */}
        <div className="flex animate-scroll-left gap-6" aria-hidden="true">
          {clients.map((client) => (
            <div
              key={`third-${client.id}`}
              className="flex-shrink-0 w-32 h-20 bg-gray-100 flex items-center justify-center"
            >
              <span className="text-xs text-gray-400">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}