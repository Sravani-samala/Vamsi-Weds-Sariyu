/**
 * SARIYU WEDS VAMSHI
 * Premium South Indian Wedding Invitation
 * Maroon, Gold, and White Luxury Editorial Aesthetic
 * 
 * Section 01: Full-screen Cinematic Temple Hero (Locked scrolling until "TAP TO ENTER" is tapped)
 * Section 02: Meet the Groom (Kandagatla Vamsi) & Bride (Madas Sariyu) with Sequential Scroll-triggered Reveal
 * Section 03: How We Met (Cinematic 16:9 Video Storytelling with 5-Second Playback Pin)
 * Sections 04+: Traditional Haldi, Muhurtam, Venue & Directions, Thank You & Blessings
 */

import React, { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { defaultWeddingData, WeddingData } from './data/weddingData';
import { TempleHeroSection } from './components/TempleHeroSection';
import { MeetCoupleSection } from './components/MeetCoupleSection';
import { HowWeMetSection } from './components/HowWeMetSection';
import { EngagementSection } from './components/EngagementSection';
import { WeddingAnnouncementSection } from './components/WeddingAnnouncementSection';
import { HaldiSection } from './components/HaldiSection';
import { MuhurtamSection } from './components/MuhurtamSection';
import { VenueSection } from './components/VenueSection';
import { ThankYouSection } from './components/ThankYouSection';
import { ModelInspectorModal } from './components/ModelInspectorModal';
import { WeddingAudioPlayer } from './components/WeddingAudioPlayer';

export default function App() {
  const lenisRef = useLenis();
  const [weddingData, setWeddingData] = useState<WeddingData>(defaultWeddingData);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Lock scrolling initially until "TAP TO ENTER" is clicked
  useEffect(() => {
    // Ensure on reload the page starts at top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    if (!isUnlocked) {
      // Keep viewport at top if user attempts to scroll before entering
      const handleScrollLock = () => {
        if (!isUnlocked && window.scrollY > 0) {
          window.scrollTo(0, 0);
        }
      };

      const handleWheelLock = (e: WheelEvent) => {
        if (!isUnlocked && e.deltaY > 0) {
          e.preventDefault();
        }
      };

      const handleTouchLock = (e: TouchEvent) => {
        if (!isUnlocked) {
          const target = e.target as HTMLElement | null;
          // Don't intercept tap on buttons
          if (target && target.closest('button')) return;
          e.preventDefault();
        }
      };

      window.addEventListener('scroll', handleScrollLock, { passive: true });
      window.addEventListener('wheel', handleWheelLock, { passive: false });
      window.addEventListener('touchmove', handleTouchLock, { passive: false });

      return () => {
        window.removeEventListener('scroll', handleScrollLock);
        window.removeEventListener('wheel', handleWheelLock);
        window.removeEventListener('touchmove', handleTouchLock);
      };
    }
  }, [isUnlocked]);

  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.start();
      lenisRef.current.resize();
      try {
        lenisRef.current.scrollTo(el, { offset: -20, duration: 1.2 });
      } catch {}
    }

    const targetTop = el.getBoundingClientRect().top + window.pageYOffset - 20;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });

    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {}
  };

  const handleEnterWedding = () => {
    // 1. Immediately unlock scrolling & trigger background wedding song if awaiting gesture
    setIsUnlocked(true);
    window.dispatchEvent(new CustomEvent('wedding:enter'));

    // 2. Resume Lenis & recalculate dimensions
    if (lenisRef.current) {
      lenisRef.current.start();
      lenisRef.current.resize();
    }

    // 3. Smoothly navigate to Section 02 (#groom) with triple-layer support for Desktop & Mobile
    const targetEl = document.getElementById('groom');
    if (!targetEl) return;

    const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 20;

    // A. Native Window smooth scroll
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });

    // B. Lenis smooth scroll
    if (lenisRef.current) {
      try {
        lenisRef.current.scrollTo(targetEl, { offset: -20, duration: 1.3 });
      } catch {}
    }

    // C. Native element scrollIntoView (reliable on mobile iOS Safari / Android)
    try {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {}
  };

  const handleUpdateData = (partial: Partial<WeddingData>) => {
    setWeddingData((prev) => ({
      ...prev,
      ...partial,
      groomFullName: partial.groomSurname && prev.groomName 
        ? `${partial.groomSurname} ${prev.groomName}` 
        : (partial.groomSurname ? `${partial.groomSurname} Vamsi` : (partial.groomFullName || prev.groomFullName)),
      brideFullName: partial.brideSurname && prev.brideName 
        ? `${partial.brideSurname} ${prev.brideName}` 
        : (partial.brideSurname ? `${partial.brideSurname} Sariyu` : (partial.brideFullName || prev.brideFullName)),
    }));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF7F2] text-[#3E0B12] selection:bg-[#C5A064]/30 selection:text-[#58111A] font-jost overflow-x-hidden">
      {/* SECTION 01 — Full-Screen Cinematic Temple Hero (Locked scrolling until "TAP TO ENTER" is tapped) */}
      <TempleHeroSection
        data={weddingData}
        onEnter={handleEnterWedding}
      />

      {/* SECTION 02 — Sequential Scroll-triggered Meet the Groom & Bride */}
      <MeetCoupleSection data={weddingData} />

      {/* SECTION 03 — How We Met: Dark Cinematic 16:9 Video Storytelling */}
      <HowWeMetSection
        data={weddingData}
        onExploreNext={() => scrollTo('engagement')}
      />

      {/* SECTION 03B — Sacred Engagement: 130-Frame Ring Animation & Photo Experience */}
      <EngagementSection
        data={weddingData}
        onExploreNext={() => scrollTo('haldi')}
      />

      {/* SECTION 05 — The Biggest Chapter Begins: Wedding Announcement */}
      <WeddingAnnouncementSection />

      {/* SECTION 04 — Traditional Haldi Ceremony */}
      <div id="haldi" className="scroll-mt-14">
        <HaldiSection data={weddingData} />
      </div>

      {/* SECTION 05 — Sacred Muhurtam Ceremony */}
      <div id="muhurtam" className="scroll-mt-14">
        <MuhurtamSection data={weddingData} />
      </div>

      {/* SECTION 06 — Venue & Directions */}
      <div id="venue" className="scroll-mt-14">
        <VenueSection data={weddingData} />
      </div>

      {/* SECTION 07 — Thank You & Blessings */}
      <ThankYouSection
        data={weddingData}
        onBackToTop={() => scrollTo('cover')}
      />

      {/* Ceremony Details Configuration Modal */}
      <ModelInspectorModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        data={weddingData}
        onUpdateData={handleUpdateData}
      />
      {/* Background South Indian Wedding Song & Mute Toggle */}
      <WeddingAudioPlayer />
    </div>
  );
}
