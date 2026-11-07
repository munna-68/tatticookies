'use client';

import React, { useEffect, useState } from 'react';

export function useDropCountdown() {
  // Demo target: Friday 12:00 PM CST — starts at a fixed offset so recordings look the same.
  const [t, setT] = useState({ days: 1, hours: 14, minutes: 22, seconds: 45 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((p) => {
        if (p.seconds > 0) return { ...p, seconds: p.seconds - 1 };
        if (p.minutes > 0) return { ...p, minutes: p.minutes - 1, seconds: 59 };
        if (p.hours > 0) return { ...p, hours: p.hours - 1, minutes: 59, seconds: 59 };
        if (p.days > 0) return { days: p.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const pad = (n: number) => String(n).padStart(2, '0');

interface DropCountdownProps {
  /** inline typewriter string, used inside cards */
  compact?: boolean;
  className?: string;
}

export default function DropCountdown({ compact = false, className = '' }: DropCountdownProps) {
  const t = useDropCountdown();

  if (compact) {
    return (
      <span className={`font-type tabular-nums ${className}`}>
        {t.days}d {pad(t.hours)}h {pad(t.minutes)}m {pad(t.seconds)}s
      </span>
    );
  }

  const cells = [
    { v: pad(t.days), l: 'days' },
    { v: pad(t.hours), l: 'hours' },
    { v: pad(t.minutes), l: 'min' },
    { v: pad(t.seconds), l: 'sec' },
  ];

  return (
    <div className={`flex items-end gap-2 sm:gap-3 ${className}`} role="timer" aria-label="Time until this drop closes">
      {cells.map((c) => (
        <div key={c.l} className="flex min-w-[3.6rem] flex-col items-center rounded-2xl bg-white/10 px-2 py-2.5 sm:min-w-[4.2rem]">
          <span className="font-display text-3xl leading-none text-mustard tabular-nums sm:text-4xl">{c.v}</span>
          <span className="mt-1 font-type text-[11px] text-white/70">{c.l}</span>
        </div>
      ))}
    </div>
  );
}
