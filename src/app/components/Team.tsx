import founderImage from 'figma:asset/75b1edfffedd8bb289f184bd6dd593c880ae3dea.png';

const members = [
  {
    name: 'Mile Máté',
    role: 'Founder',
    avatar: founderImage,
  },
  {
    name: 'Marcus Williams',
    role: 'Co-Founder - Design Lead',
    avatar: 'https://images.unsplash.com/photo-1660074127797-1c429fbb8cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBjcmVhdGl2ZSUyMGRpcmVjdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMDU1OTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Isabella Rodriguez',
    role: 'Brand Strategist',
    avatar: 'https://images.unsplash.com/photo-1758518729459-235dcaadc611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwZXhlY3V0aXZlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMDU1OTI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function Team() {
  return (
    <section className="bg-black py-16 md:py-32">
      <div className="mx-auto max-w-5xl border-t border-white/10 px-6">
        <span className="-ml-6 -mt-3.5 block w-max bg-black px-6 text-gray-400">
          Team
        </span>
        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Our dream team
            </h2>
          </div>
          <div className="mt-6 sm:mt-0">
            <p className="text-gray-400">
              During the working process, we perform regular fitting with the
              client because he is the only person who can feel whether a new
              suit fits or not.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div key={index} className="group overflow-hidden">
                <img
                  className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
                  src={member.avatar}
                  alt={member.name}
                  width="826"
                  height="1239"
                />
                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium text-white transition-all duration-500 group-hover:tracking-wider">
                      {member.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      _0{index + 1}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="inline-block translate-y-6 text-sm text-gray-400 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}