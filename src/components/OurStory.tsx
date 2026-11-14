import React, { useState } from 'react';
import { WeddingData } from '../data/weddingData';
import { ChevronRight, Heart } from 'lucide-react';

interface OurStoryProps {
  data: WeddingData;
}

export const OurStory: React.FC<OurStoryProps> = ({ data }) => {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      num: '01',
      tag: 'CHAPTER 01',
      title: data.story.chapter1Title,
      quote: data.story.chapter1Quote,
      photo: data.story.chapter1Photo,
      details: 'A casual conversation over coffee in a sunlit courtyard turned into hours of shared laughter and an undeniable feeling that destiny was at work.',
    },
    {
      num: '02',
      tag: 'CHAPTER 02',
      title: data.story.chapter2Title,
      quote: data.story.chapter2Quote,
      photo: data.story.chapter2Photo,
      details: 'From late-night talks and discovering mutual passions to navigating life hand in hand, every shared moment solidified our bond.',
    },
    {
      num: '03',
      tag: 'CHAPTER 03',
      title: data.story.chapter3Title,
      quote: data.story.chapter3Quote,
      photo: data.story.chapter3Photo,
      details: 'Surrounded by our loving families, traditional mantras, and sacred blessings, we exchanged rings and made our sacred promise of forever.',
    },
    {
      num: '04',
      tag: 'CHAPTER 04',
      title: data.story.chapter4Title,
      quote: data.story.chapter4Quote,
      photo: data.story.chapter4Photo,
      details: 'Cherishing stolen glances, traditional heritage shoots, and heartfelt anticipation as we countdown to the sacred mandapam.',
    },
  ];

  return (
    <section
      id="story"
      className="relative min-h-screen w-full py-24 px-6 bg-[#FDF9F3] text-[#38241C] overflow-hidden"
    >
      {/* Background Subtle Floral Watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(197,160,100,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mb-12">
          <p className="font-jost text-xs uppercase tracking-[0.3em] text-[#C5A064] font-semibold mb-2">
            The Journey of Two Souls
          </p>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-[#481C25] uppercase tracking-wide mb-4">
            Every Love Story Has Its Own Magic
          </h2>
          <div className="w-24 h-[1px] bg-[#C5A064] mx-auto mb-4" />
          <p className="font-script text-2xl text-[#805D26]">
            And ours is our favorite...
          </p>
        </div>

        {/* Chapter Selector Tabs (Anti-pill clean segmented style) */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-10 w-full max-w-3xl border-b border-[#C5A064]/30 pb-4">
          {chapters.map((chap, idx) => {
            const isActive = activeChapter === idx;
            return (
              <button
                key={chap.num}
                onClick={() => setActiveChapter(idx)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-jost tracking-wider uppercase transition-all border-b-2 -mb-[18px] cursor-pointer ${
                  isActive
                    ? 'border-[#481C25] text-[#481C25] font-semibold'
                    : 'border-transparent text-[#38241C]/60 hover:text-[#481C25]'
                }`}
              >
                <span>{chap.num}.</span>
                <span>{chap.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Showcase Card */}
        <div className="w-full bg-[#FAF5EC] border border-[#C5A064]/40 rounded-3xl p-6 md:p-10 shadow-[0_10px_40px_rgba(72,28,37,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500">
          {/* Photograph Container with Mask and Arch Frame */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl shadow-lg border-2 border-[#C5A064]/50">
            <div className="relative h-[340px] md:h-[460px] w-full overflow-hidden bg-[#24130E]">
              <img
                src={chapters[activeChapter].photo}
                alt={chapters[activeChapter].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Gold Ornamental Inner Frame */}
              <div className="absolute inset-3 border border-[#FFE8A3]/40 rounded-xl pointer-events-none" />

              {/* Badge Tag */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-jost uppercase tracking-widest text-[#FFE8A3]">
                <Heart className="w-3.5 h-3.5 text-[#E05338] fill-[#E05338]" />
                <span>{chapters[activeChapter].tag}</span>
              </div>
            </div>
          </div>

          {/* Chapter Story Copy */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <span className="font-jost text-xs uppercase tracking-[0.3em] text-[#C5A064] font-semibold mb-2">
              {chapters[activeChapter].tag}
            </span>

            <h3 className="font-bodoni text-3xl md:text-4xl text-[#481C25] mb-4">
              {chapters[activeChapter].title}
            </h3>

            <div className="w-16 h-[1.5px] bg-[#C5A064] mb-6" />

            <blockquote className="font-script text-2xl md:text-3xl text-[#805D26] leading-relaxed mb-6 italic">
              "{chapters[activeChapter].quote}"
            </blockquote>

            <p className="font-jost text-sm text-[#38241C]/80 leading-relaxed mb-8">
              {chapters[activeChapter].details}
            </p>

            {/* Next Chapter Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveChapter((prev) => (prev + 1) % chapters.length)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#481C25] text-[#FFE8A3] text-xs font-jost uppercase tracking-widest rounded-full hover:bg-[#5C2430] transition-colors"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A064]" />
              </button>

              <span className="text-xs font-jost text-[#805D26]">
                {activeChapter + 1} of {chapters.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
