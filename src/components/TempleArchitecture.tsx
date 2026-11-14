import React from 'react';

// Ornate South Indian Brass Kuthuvilakku Lamp Component
export const KuthuvilakkuLamp: React.FC<{
  className?: string;
  height?: number;
  glow?: boolean;
}> = ({ className = '', height = 320, glow = true }) => {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`} style={{ height }}>
      {/* Top Auspicious Annapakshi / Peacock Motif */}
      <svg
        width="38"
        height="32"
        viewBox="0 0 38 32"
        fill="none"
        className="text-[#C5A064] drop-shadow-[0_2px_4px_rgba(72,28,37,0.4)]"
      >
        <path
          d="M19 2C21 6 26 8 29 7C32 6 34 8 32 12C30 16 26 18 24 21C22 24 21 28 19 30C17 28 16 24 14 21C12 18 8 16 6 12C4 8 6 6 9 7C12 8 17 6 19 2Z"
          fill="currentColor"
        />
        <circle cx="19" cy="8" r="2.5" fill="#FFE8A3" />
      </svg>

      {/* Main Flame */}
      <div className="relative -mt-1 mb-1">
        <div className={`w-3.5 h-6 bg-gradient-to-t from-[#F5B014] via-[#FFE8A3] to-white rounded-full blur-[0.6px] animate-[pulse_2.2s_ease-in-out_infinite] ${glow ? 'shadow-[0_0_18px_#F5B014]' : ''}`} />
        {glow && (
          <div className="absolute -inset-2 bg-[#F5B014]/25 rounded-full blur-md pointer-events-none" />
        )}
      </div>

      {/* Oil Basin (Thattu) with 5 Wick Points */}
      <div className="w-16 h-3.5 bg-gradient-to-r from-[#9B7637] via-[#ECC880] to-[#9B7637] rounded-full shadow-md border-b border-[#38241C]/40" />

      {/* Turned Brass Stem Segments */}
      <div className="w-3 flex-1 bg-gradient-to-r from-[#805D26] via-[#DDB872] to-[#805D26] relative my-0.5 shadow-inner">
        {/* Tiered Decorative Rings */}
        <div className="absolute top-1/4 -left-2 right-[-8px] h-2 bg-[#C5A064] rounded-full border-t border-[#FFE8A3]/60 shadow" />
        <div className="absolute top-2/4 -left-3 right-[-12px] h-2.5 bg-gradient-to-r from-[#9B7637] via-[#ECC880] to-[#9B7637] rounded-full shadow" />
        <div className="absolute top-3/4 -left-2 right-[-8px] h-2 bg-[#C5A064] rounded-full border-t border-[#FFE8A3]/60 shadow" />
      </div>

      {/* Base Basin & Pedestal */}
      <div className="w-14 h-4 bg-gradient-to-r from-[#9B7637] via-[#ECC880] to-[#9B7637] rounded-t-lg shadow-md" />
      <div className="w-20 h-3.5 bg-gradient-to-r from-[#704F1E] via-[#C5A064] to-[#704F1E] rounded-b-md shadow-lg border-t border-[#FFE8A3]/40" />
    </div>
  );
};

// Hanging Brass Temple Bell with subtle swing animation
export const TempleBell: React.FC<{
  className?: string;
  chainLength?: number;
  delay?: number;
}> = ({ className = '', chainLength = 120, delay = 0 }) => {
  return (
    <div
      className={`flex flex-col items-center origin-top select-none pointer-events-none transition-transform ${className}`}
      style={{
        animation: `swing 4.5s ease-in-out infinite alternate ${delay}s`,
      }}
    >
      {/* Brass Chain Links */}
      <div
        className="w-1 bg-gradient-to-b from-[#805D26] via-[#C5A064] to-[#805D26]"
        style={{ height: chainLength }}
      />
      {/* Bell Cap */}
      <div className="w-5 h-2 bg-[#ECC880] rounded-t-full shadow" />
      {/* Bell Body */}
      <div className="w-9 h-10 bg-gradient-to-r from-[#805D26] via-[#ECC880] to-[#805D26] rounded-b-3xl relative shadow-lg flex items-end justify-center pb-1">
        {/* Clapper */}
        <div className="w-2.5 h-3.5 bg-[#481C25] rounded-full -mb-2 shadow" />
      </div>
    </div>
  );
};

// Hanging Garland of Jasmine & Marigold
export const GarlandToran: React.FC<{
  className?: string;
  width?: string;
}> = ({ className = '', width = '100%' }) => {
  return (
    <div className={`relative flex items-center justify-around overflow-hidden py-2 select-none pointer-events-none ${className}`} style={{ width }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          {/* Marigold flower */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F5B014] to-[#D97706] shadow-sm flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#FFE8A3]" />
          </div>
          {/* Hanging jasmine strand */}
          <div className="flex flex-col items-center gap-1 mt-0.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFFDF7] shadow-xs" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFFDF7] shadow-xs" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFFDF7] shadow-xs" />
            <div className="w-3.5 h-4 rounded-full bg-[#E05338] shadow-xs" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Dravidian Temple Stone Pillar
export const DravidianPillar: React.FC<{
  side?: 'left' | 'right';
  className?: string;
}> = ({ side = 'left', className = '' }) => {
  return (
    <div
      className={`relative w-20 md:w-28 flex flex-col items-center select-none pointer-events-none ${className}`}
    >
      {/* Capital with Bracket Carving */}
      <div className="w-full h-12 bg-gradient-to-r from-[#9F8261] via-[#C3A17C] to-[#9F8261] rounded-t-sm shadow-md relative border-b border-[#38241C]/30">
        <div className="absolute inset-x-2 top-2 h-2 bg-[#70553A] rounded-xs opacity-60" />
        <div className="absolute bottom-1 inset-x-3 text-center text-[10px] text-[#38241C] font-serif tracking-widest opacity-70">
          ॐ
        </div>
      </div>

      {/* Shaft with Fluted Stone Grooves */}
      <div className="w-3/4 flex-1 bg-gradient-to-r from-[#8C7152] via-[#C3A17C] to-[#8C7152] relative shadow-inner min-h-[400px]">
        {/* Fluted Vertical Lines */}
        <div className="absolute inset-y-0 left-1/4 w-[1px] bg-[#5C452E]/30" />
        <div className="absolute inset-y-0 left-2/4 w-[1px] bg-[#5C452E]/40" />
        <div className="absolute inset-y-0 left-3/4 w-[1px] bg-[#5C452E]/30" />

        {/* Decorative Ring Carvings */}
        <div className="absolute top-1/4 inset-x-0 h-4 bg-gradient-to-r from-[#70553A] via-[#C5A064] to-[#70553A] shadow-xs" />
        <div className="absolute top-2/4 inset-x-0 h-4 bg-gradient-to-r from-[#70553A] via-[#C5A064] to-[#70553A] shadow-xs" />
        <div className="absolute top-3/4 inset-x-0 h-4 bg-gradient-to-r from-[#70553A] via-[#C5A064] to-[#70553A] shadow-xs" />
      </div>

      {/* Base Plinth */}
      <div className="w-full h-14 bg-gradient-to-r from-[#7A6044] via-[#B8946E] to-[#7A6044] rounded-b-sm shadow-lg border-t border-[#FFE8A3]/20" />
    </div>
  );
};

// Auspicious Ganesha Emblem SVG
export const GaneshaEmblem: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 64, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={`text-[#C5A064] select-none ${className}`}
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1" />
      {/* Stylized Lord Ganesha line art */}
      <path
        d="M50 20C43 20 38 25 38 31C38 38 43 42 46 47C49 52 48 57 44 61C40 65 37 72 43 78C49 84 57 82 62 76C66 71 66 65 64 58C62 51 55 46 54 41C53 35 57 32 60 32C64 32 68 35 68 39"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="45" cy="32" r="2" fill="currentColor" />
      {/* Crown Trishul mark */}
      <path
        d="M49 14V22M45 17L49 20L53 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Auspicious Modak */}
      <circle cx="68" cy="62" r="3.5" fill="#F5B014" />
    </svg>
  );
};
