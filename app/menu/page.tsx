'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { mockData } from '@/lib/mockData';
import { useCart } from '@/lib/CartContext';
import CookieCard from '@/components/CookieCard';
import PageHeader from '@/components/ui/PageHeader';
import DropCountdown from '@/components/DropCountdown';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion/gsap';
import { Search, ArrowRight } from 'lucide-react';

const categories = ['All', 'Nuts & Pistachio', "Stuffed & S'mores", 'Nuts & Caramel', 'Classic & Brown Butter', 'Seasonal'];

export default function MenuPage() {
  const { currentBoxSize, setCurrentBoxSize, totalFlavorsInBox, isBoxFull } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const grid = useRef<HTMLDivElement>(null);

  const filteredCookies = useMemo(() => {
    return mockData.menuItems.filter((cookie) => {
      const matchesCategory = selectedCategory === 'All' || cookie.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cookie.name.toLowerCase().includes(q) ||
        cookie.tagline.toLowerCase().includes(q) ||
        cookie.description.toLowerCase().includes(q) ||
        cookie.ingredients.toLowerCase().includes(q) ||
        cookie.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cards rise in when the grid first enters, and again whenever the filter changes.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(grid.current!.querySelectorAll('article'), {
          y: 60,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: grid.current, start: 'top 88%', once: true },
        });
      });
    },
    { scope: grid, dependencies: [selectedCategory, searchQuery.length === 0], revertOnUpdate: true }
  );

  return (
    <div className="pb-36">
      <PageHeader
        kicker="Drop #42 menu, baked to order"
        title="Flavors"
        accent="this week"
        lead="Nine stuffed cookies, all baked in small batches in Austin. Pick a box size, then add any mix of flavors until it's full."
        asideTone="bg-coral"
        aside={
          <div>
            <p className="font-display text-2xl leading-tight">Drop closes in</p>
            <DropCountdown compact className="mt-1 block text-sm font-bold" />
            <p className="mt-3 font-type text-xs leading-snug text-ink/75">Orders lock Friday 12 PM CST for Saturday pickup and Monday shipping.</p>
          </div>
        }
      />

      {/* Box size + filters */}
      <div className="mx-auto mt-10 max-w-[1400px] space-y-6 px-4 sm:mt-14 sm:px-6 lg:px-8">
        <div className="grid items-center gap-5 lg:grid-cols-[auto_minmax(0,1fr)]">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-display text-2xl">Box size</p>
            <div className="inline-flex rounded-full bg-peach p-1" role="radiogroup" aria-label="Box size">
              {mockData.boxTiers.map((tier) => {
                const on = currentBoxSize === tier.size;
                return (
                  <button
                    key={tier.id}
                    role="radio"
                    aria-checked={on}
                    onClick={() => setCurrentBoxSize(tier.size)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${on ? 'bg-ink text-white' : 'text-ink hover:bg-white/60'}`}
                  >
                    {tier.size} <span className={`font-type text-xs ${on ? 'text-mustard' : 'text-ink/60'}`}>${tier.demoPrice.toFixed(0)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative w-full lg:ml-auto lg:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/60" />
            <label htmlFor="flavor-search" className="sr-only">
              Search flavors
            </label>
            <input
              id="flavor-search"
              type="text"
              placeholder="Search pistachio, Nutella, Biscoff…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border-2 border-ink/10 bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
            />
          </div>
        </div>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((cat) => {
            const on = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  on ? 'bg-coral text-ink' : 'bg-white text-ink/80 shadow-[inset_0_0_0_2px_var(--line)] hover:text-ink'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div ref={grid} className="mx-auto mt-10 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {filteredCookies.length === 0 ? (
          <div className="bento flex flex-col items-center gap-4 bg-peach px-6 py-16 text-center">
            <p className="font-display text-3xl">Nothing matches “{searchQuery}”</p>
            <p className="max-w-sm text-sm text-ink/70">Try an ingredient like pecan, Nutella or white chocolate, or clear the filters to see all nine.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn btn-dark btn-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCookies.map((cookie, i) => (
              <CookieCard key={cookie.id} cookie={cookie} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Floating box progress */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 mx-auto max-w-xl px-4">
        <div className="pointer-events-auto flex items-center justify-between gap-4 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-white shadow-warm-hover">
          <div className="min-w-0">
            <p className="text-sm font-semibold">
              Box of {currentBoxSize} <span className="font-type text-mustard">{totalFlavorsInBox}/{currentBoxSize}</span>
            </p>
            <div className="mt-1.5 h-1.5 w-32 overflow-hidden rounded-full bg-white/15 sm:w-44">
              <div className="h-full rounded-full bg-mustard transition-all duration-500" style={{ width: `${Math.min(100, (totalFlavorsInBox / currentBoxSize) * 100)}%` }} />
            </div>
          </div>
          <Link href="/order" className={`btn btn-sm ${isBoxFull ? 'btn-mustard' : 'btn-light'}`}>
            {isBoxFull ? 'Review & order' : `${currentBoxSize - totalFlavorsInBox} left to fill`}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
