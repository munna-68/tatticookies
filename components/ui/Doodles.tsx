import React from 'react';

/** Hand-drawn cookie with a bite — the sticker that sits on card corners. */
export function CookieSticker({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <path
        d="M60 6c10 0 19 3 27 8-2 6 1 13 8 15 3 1 6 1 8 0 6 8 10 19 10 31 0 30-24 54-53 54S7 90 7 60 30 6 60 6z"
        fill="#E6A15A"
        stroke="#3B1E14"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M60 16c8 0 15 2 21 6-1 9 6 17 15 17h2c4 6 6 13 6 21 0 25-20 44-44 44S16 85 16 60 36 16 60 16z"
        fill="#F0B56E"
      />
      {[
        [40, 40, 6],
        [62, 34, 5],
        [34, 64, 6.5],
        [56, 58, 7],
        [80, 60, 5.5],
        [48, 84, 6],
        [72, 82, 6.5],
        [88, 44, 4],
      ].map(([cx, cy, r], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.82} fill="#3B1E14" transform={`rotate(${i * 23} ${cx} ${cy})`} />
      ))}
    </svg>
  );
}

/** Rotating stamp: circular text that fits its path exactly via textLength. */
export function Stamp({ text, className = '' }: { text: string; className?: string }) {
  const r = 46;
  const circ = 2 * Math.PI * r;
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path id="stamp-circle" d={`M60,60 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`} />
      </defs>
      <circle cx="60" cy="60" r="58" fill="#E9B23F" stroke="#3B1E14" strokeWidth="3" />
      <text fontSize="11.5" fill="#3B1E14" style={{ fontFamily: 'var(--font-type)', fontWeight: 700 }}>
        <textPath href="#stamp-circle" textLength={circ - 4} lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

/** Little "spark" strokes drawn next to things that just happened (reference ornaments). */
export function Sparks({ className = '', color = '#fff' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 22c2-6 5-10 9-13" />
      <path d="M16 30c4-5 9-8 15-9" />
      <path d="M20 8l3-5" />
    </svg>
  );
}
