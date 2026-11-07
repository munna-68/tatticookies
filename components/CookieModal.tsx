'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { X, Sparkles, AlertTriangle, ShieldCheck, Plus, Check } from 'lucide-react';

export default function CookieModal() {
  const { activeModalCookie, setActiveModalCookie, addFlavorToBox, selectedFlavors } = useCart();

  if (!activeModalCookie) return null;

  const currentCount = selectedFlavors[activeModalCookie.id] || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" data-lenis-prevent>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-[2px] animate-[fade-in_0.3s_ease-out]"
        onClick={() => setActiveModalCookie(null)}
      />

      <div className="relative bg-ground rounded-[2rem] max-w-xl w-full overflow-hidden shadow-2xl z-10 animate-[pop-in_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveModalCookie(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center hover:bg-mustard transition-colors shadow-card"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Cookie Photo */}
        <div className="relative h-64 sm:h-72 w-full bg-coral p-3 overflow-hidden">
          <Image
            src={activeModalCookie.image}
            alt={activeModalCookie.name}
            fill
            className="object-cover object-center rounded-[1.5rem]"
          />
                    
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <span className="sticker font-display text-base">
              {activeModalCookie.category}
            </span>
            <span className="font-type text-sm font-bold bg-white text-ink px-3 py-1 rounded-full">
              ${activeModalCookie.demoPrice.toFixed(2)} demo
            </span>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-display text-3xl sm:text-4xl text-ink">
              {activeModalCookie.name}
            </h3>
            <p className="text-sm font-medium text-burgundy-700">
              {activeModalCookie.tagline}
            </p>
            <p className="text-sm text-cream-800 leading-relaxed pt-2">
              {activeModalCookie.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {activeModalCookie.tags.map((t, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full bg-peach text-ink font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Ingredients & Allergens Box */}
          <div className="space-y-3 bg-white rounded-[1.5rem] p-4 sm:p-5 shadow-card text-xs">
            <div>
              <p className="font-semibold text-ink text-sm mb-1">
                Ingredients
              </p>
              <p className="text-cream-800 leading-relaxed">
                {activeModalCookie.ingredients}
              </p>
            </div>

            <div className="pt-2 border-t border-cream-100 flex items-start gap-2 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Allergens: </strong>
                <span>{activeModalCookie.allergens.join(', ')}.</span>
                <span className="block text-[10px] text-cream-800/70 mt-0.5">
                  Baked under Texas Cottage Food Law in a facility that also processes tree nuts.
                </span>
              </div>
            </div>
          </div>

          {/* Reheat advice */}
          <div className="bg-sky rounded-[1.25rem] p-3.5 text-xs text-ink flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-burgundy-700 shrink-0" />
            <p>
              <strong>Bakery Tip:</strong> Microwave for 10–12 seconds for that molten center straight out of our Austin kitchen!
            </p>
          </div>

          {/* Add to Box CTA */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <button
              onClick={() => {
                addFlavorToBox(activeModalCookie);
              }}
              className="btn btn-dark btn-lg flex-1"
            >
              <Plus className="w-4 h-4" />
              <span>{currentCount > 0 ? `Add another (${currentCount} in your box)` : 'Add to my box'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
