'use client';

import React from 'react';
import Image from 'next/image';
import { CookieFlavor } from '@/lib/mockData';
import { useCart } from '@/lib/CartContext';
import { Plus } from 'lucide-react';

export const TILE_TONES = ['bg-peach', 'bg-coral', 'bg-salmon', 'bg-sky'] as const;

interface CookieCardProps {
  cookie: CookieFlavor;
  index?: number;
}

export default function CookieCard({ cookie, index = 0 }: CookieCardProps) {
  const { addFlavorToBox, selectedFlavors, setActiveModalCookie } = useCart();
  const count = selectedFlavors[cookie.id] || 0;
  const tone = TILE_TONES[index % TILE_TONES.length];

  return (
    <article className="group flex flex-col">
      <button
        type="button"
        onClick={() => setActiveModalCookie(cookie)}
        className={`relative block aspect-[4/4.2] w-full overflow-hidden rounded-[2rem] p-3 text-left ${tone}`}
        aria-label={`See details for ${cookie.name}`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
          <Image
            src={cookie.image}
            alt={cookie.name}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        </div>
        <span className="absolute left-6 top-6 rounded-full bg-white px-3 py-1 font-type text-xs font-bold text-ink">
          ${cookie.demoPrice.toFixed(2)}
        </span>
        {(cookie.isFeatured || cookie.isSeasonal) && (
          <span className="sticker absolute right-5 top-5 text-sm font-display" style={{ ['--r' as string]: '4deg' }}>
            {cookie.isSeasonal ? 'Seasonal' : 'Fan pick'}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-3 px-1 pt-4">
        <div>
          <h3 className="font-display text-2xl leading-tight text-ink">{cookie.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-cream-800">{cookie.tagline}</p>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <button onClick={() => addFlavorToBox(cookie)} className="btn btn-dark btn-sm">
            <Plus className="h-4 w-4" />
            <span>{count > 0 ? `In your box (${count})` : 'Add to box'}</span>
          </button>
          <button onClick={() => setActiveModalCookie(cookie)} className="btn btn-ghost btn-sm">
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
