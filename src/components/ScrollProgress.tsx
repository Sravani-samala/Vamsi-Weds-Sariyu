import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'entrance', label: 'Entrance' },
  { id: 'welcome', label: 'Invitation' },
  { id: 'groom', label: 'Vamshi' },
  { id: 'bride', label: 'Sariyu' },
  { id: 'story', label: 'Our Story' },
  { id: 'haldi', label: 'Haldi' },
  { id: 'dj', label: 'DJ Night' },
  { id: 'muhurtam', label: 'Muhurtam' },
  { id: 'venue', label: 'Venue' },
  { id: 'thankyou', label: 'Blessings' },
];

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('entrance');

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const current = window.scrollY;
      setProgress((current / total) * 100);

      // Determine active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside className="fixed right-4 md:right-7 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-2 select-none pointer-events-auto">
      {/* Golden tracker line */}
      <div className="w-[1px] h-32 bg-[#C5A064]/20 relative overflow-hidden my-2">
        <div
          className="w-full bg-[#C5A064] absolute top-0 left-0 transition-all duration-150"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Chapter navigation dots */}
      <div className="flex flex-col items-center gap-3">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="group relative flex items-center justify-center p-1"
              aria-label={sec.label}
            >
              <span
                className={`block transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2 h-2 bg-[#481C25] ring-2 ring-[#C5A064] ring-offset-1 ring-offset-[#F8F0E3]'
                    : 'w-1.5 h-1.5 bg-[#C5A064]/50 hover:bg-[#481C25]'
                }`}
              />
              {/* Tooltip on hover */}
              <span className="absolute right-6 px-2 py-0.5 rounded text-[10px] tracking-wider font-jost uppercase bg-[#481C25] text-[#FFE8A3] shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {sec.label}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
};
