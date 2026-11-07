import React from 'react';

export function WhiskIcon({ className = "w-6 h-6", stroke = "#3B1E14" }: { className?: string; stroke?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.5 4.5l-6 6" />
      <path d="M13.5 10.5C12 12 10 14 10 16c0 2.2 1.8 4 4 4 2 0 4-2 5.5-3.5" />
      <path d="M12 12c-1.5 1.5-3.5 3.5-3.5 5.5 0 2.2 1.8 4 4 4 2 0 4-2 5.5-3.5" />
      <path d="M10.5 13.5C9 15 7 17 7 19c0 1.5 1 2.5 2.5 2.5 2 0 4-2 5.5-3.5" />
      <path d="M18 3l3 3" />
    </svg>
  );
}

export function ApronIcon({ className = "w-6 h-6", stroke = "#3B1E14" }: { className?: string; stroke?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3a3 3 0 0 1 6 0" />
      <path d="M8 7h8l2 6v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7l2-6z" />
      <path d="M9 13h6v4H9z" />
      <path d="M6 13H3" />
      <path d="M18 13h3" />
    </svg>
  );
}

export function BicycleIcon({ className = "w-6 h-6", stroke = "#3B1E14" }: { className?: string; stroke?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6a1 1 0 0 1 1-1h2" />
      <path d="M12 17.5V14l3-6h3" />
      <path d="M5.5 17.5l4-8h4.5" />
      <path d="M9.5 9.5l2.5 8" />
      <path d="M16 8l2-2" />
      {/* Cookie Box on rear rack */}
      <rect x="3.5" y="10" width="4" height="3" rx="0.5" fill="#F9D3A5" stroke={stroke} strokeWidth="1.2" />
    </svg>
  );
}

export function CookieBakeIcon({ className = "w-6 h-6", stroke = "#3B1E14" }: { className?: string; stroke?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="9" r="1.2" fill={stroke} />
      <circle cx="15" cy="10" r="1.5" fill={stroke} />
      <circle cx="10" cy="15" r="1.3" fill={stroke} />
      <circle cx="14" cy="14.5" r="1.2" fill={stroke} />
      <circle cx="12" cy="11.5" r="1" fill={stroke} />
    </svg>
  );
}

export function FlourIcon({ className = "w-6 h-6", stroke = "#3B1E14" }: { className?: string; stroke?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 19a4 4 0 0 0 8 0c0-3-4-8-4-8s-4 5-4 8z" />
      <path d="M15 13a3 3 0 0 1 6 0c0 2-3 5-3 5s-3-3-3-5z" />
    </svg>
  );
}

export function TexasStarIcon({ className = "w-5 h-5", stroke = "#3B1E14" }: { className?: string; stroke?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
