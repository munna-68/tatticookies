'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { mockData, CookieFlavor } from '@/lib/mockData';
import { useCart } from '@/lib/CartContext';
import { BicycleIcon } from '@/components/SVGIcons';
import PageHeader from '@/components/ui/PageHeader';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion/gsap';
import { MapPin, Package, Check, Plus, Minus, ArrowRight } from 'lucide-react';

type Fulfillment = 'Austin Pickup' | 'Austin Delivery' | 'Texas Shipping';

const options: { id: Fulfillment; title: string; fee: string; when: string; body: string; icon: React.ReactNode }[] = [
  {
    id: 'Austin Pickup',
    title: 'Austin pickup',
    fee: 'Free',
    when: 'Saturday 11 AM – 2 PM CST',
    body: 'South Congress / Travis Heights porch. Drive up, give your name, take your box.',
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    id: 'Austin Delivery',
    title: 'Austin delivery',
    fee: '$5 demo',
    when: 'Saturday afternoon',
    body: 'Contactless, within 15 miles of downtown (78701–78759). We text when it’s on the step.',
    icon: <BicycleIcon className="h-5 w-5" stroke="currentColor" />,
  },
  {
    id: 'Texas Shipping',
    title: 'Texas shipping',
    fee: '$8.50 demo',
    when: 'Ships Monday, USPS Priority',
    body: 'Insulated packs. Texas addresses only, required by the Texas Cottage Food Law.',
    icon: <Package className="h-5 w-5" />,
  },
];

function StepTitle({ n, children, right }: { n: number; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-3 font-display text-2xl sm:text-3xl">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg text-white">{n}</span>
        {children}
      </h2>
      {right}
    </div>
  );
}

function OrderContent() {
  const searchParams = useSearchParams();
  const {
    currentBoxSize,
    setCurrentBoxSize,
    selectedFlavors,
    addFlavorToBox,
    removeFlavorFromBox,
    clearCurrentBox,
    totalFlavorsInBox,
    isBoxFull,
    fulfillment,
    setFulfillment,
    selectedDateId,
    setSelectedDateId,
    addCurrentBoxToCart,
  } = useCart();
  const boxRef = useRef<HTMLDivElement>(null);
  const prevFilled = useRef(0);

  useEffect(() => {
    const sizeParam = searchParams.get('size');
    if (sizeParam && ['4', '6', '10'].includes(sizeParam)) setCurrentBoxSize(Number(sizeParam));
    const f = searchParams.get('fulfillment');
    if (f === 'pickup') setFulfillment('Austin Pickup');
    else if (f === 'delivery') setFulfillment('Austin Delivery');
    else if (f === 'shipping') setFulfillment('Texas Shipping');
  }, [searchParams, setCurrentBoxSize, setFulfillment]);

  const currentTier = mockData.boxTiers.find((b) => b.size === currentBoxSize) || mockData.boxTiers[1];
  const selectedDate = mockData.dropDates.find((d) => d.id === selectedDateId) || mockData.dropDates[0];

  const filledSlots: CookieFlavor[] = [];
  Object.entries(selectedFlavors).forEach(([flavorId, qty]) => {
    const cookie = mockData.menuItems.find((m) => m.id === flavorId);
    if (cookie) for (let i = 0; i < qty; i++) filledSlots.push(cookie);
  });
  const emptySlotsCount = Math.max(0, currentBoxSize - filledSlots.length);

  // A cookie drops into its slot when it's added.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const slots = boxRef.current?.querySelectorAll('[data-slot="filled"]');
        if (slots && filledSlots.length > prevFilled.current) {
          const last = slots[slots.length - 1];
          gsap.fromTo(last, { scale: 0.2, rotation: -90, y: -40 }, { scale: 1, rotation: 0, y: 0, duration: 0.6, ease: 'back.out(2)' });
        }
        prevFilled.current = filledSlots.length;
      });
    },
    { scope: boxRef, dependencies: [filledSlots.length] }
  );

  return (
    <div className="pb-24">
      <PageHeader
        kicker="Demo checkout, no real payment is taken"
        title="Build"
        accent="your box"
        lead="Choose how it reaches you, pick an open Saturday, then fill every slot with the flavors you want."
        asideTone="bg-peach"
        aside={
          <div>
            <p className="font-type text-xs text-ink/70">Your box right now</p>
            <p className="mt-1 font-display text-4xl leading-none">
              {totalFlavorsInBox}/{currentBoxSize}
            </p>
            <p className="mt-2 text-sm leading-snug">
              {currentTier.name.replace(/\s*\(.*\)/, '')}, {options.find((o) => o.id === fulfillment)?.title}
            </p>
          </div>
        }
      />

      <div className="mx-auto mt-10 grid max-w-[1400px] grid-cols-1 gap-6 px-4 sm:mt-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* ---------- Left: fulfillment + date ---------- */}
        <div className="space-y-6 lg:col-span-5">
          <section className="bento space-y-5 bg-white p-5 shadow-card sm:p-7">
            <StepTitle n={1}>How it reaches you</StepTitle>
            <div className="space-y-3" role="radiogroup" aria-label="Fulfillment">
              {options.map((o) => {
                const on = fulfillment === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setFulfillment(o.id)}
                    className={`flex w-full items-start gap-3.5 rounded-[1.4rem] p-4 text-left transition-colors ${
                      on ? 'bg-ink text-white' : 'bg-ground text-ink hover:bg-peach/60'
                    }`}
                  >
                    <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${on ? 'bg-mustard text-ink' : 'bg-white text-ink'}`}>
                      {o.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-xl">{o.title}</span>
                        <span className={`rounded-full px-2.5 py-0.5 font-type text-xs font-bold ${on ? 'bg-white/15 text-mustard' : 'bg-white text-ink'}`}>{o.fee}</span>
                      </span>
                      <span className={`mt-0.5 block text-sm font-medium ${on ? 'text-white/85' : 'text-ink/80'}`}>{o.when}</span>
                      <span className={`mt-1 block text-xs leading-relaxed ${on ? 'text-white/65' : 'text-ink/60'}`}>{o.body}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="bento space-y-5 bg-white p-5 shadow-card sm:p-7">
            <StepTitle n={2}>Pick a Saturday</StepTitle>
            <p className="text-sm text-ink/65">Each drop closes Friday at 12 PM CST, or earlier if all 45 boxes go.</p>
            <div className="space-y-3" role="radiogroup" aria-label="Drop date">
              {mockData.dropDates.map((d) => {
                const on = selectedDateId === d.id;
                const soldOut = d.status === 'sold-out';
                const pct = Math.round((d.orders / d.capacity) * 100);
                return (
                  <button
                    key={d.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    disabled={soldOut}
                    onClick={() => setSelectedDateId(d.id)}
                    className={`w-full rounded-[1.4rem] p-4 text-left transition-colors ${
                      soldOut ? 'cursor-not-allowed bg-ground opacity-50' : on ? 'bg-ink text-white' : 'bg-ground hover:bg-peach/60'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-semibold">{d.dateLabel}</span>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          soldOut ? 'bg-ink/10 text-ink' : d.status === 'filling' ? 'bg-coral text-ink' : on ? 'bg-mustard text-ink' : 'bg-sky text-ink'
                        }`}
                      >
                        {soldOut ? 'Sold out' : d.status === 'filling' ? `${d.capacity - d.orders} left` : 'Open'}
                      </span>
                    </span>
                    <span className={`mt-2 block h-1.5 overflow-hidden rounded-full ${on ? 'bg-white/15' : 'bg-ink/10'}`}>
                      <span className={`block h-full rounded-full ${on ? 'bg-mustard' : 'bg-coral'}`} style={{ width: `${pct}%` }} />
                    </span>
                    <span className={`mt-2 block font-type text-xs ${on ? 'text-white/65' : 'text-ink/60'}`}>{d.cutoffText}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* ---------- Right: box builder ---------- */}
        <section className="bento space-y-6 bg-white p-5 shadow-card sm:p-8 lg:col-span-7">
          <StepTitle
            n={3}
            right={
              <div className="inline-flex shrink-0 rounded-full bg-peach p-1" role="radiogroup" aria-label="Box size">
                {mockData.boxTiers.map((b) => (
                  <button
                    key={b.size}
                    type="button"
                    role="radio"
                    aria-checked={currentBoxSize === b.size}
                    onClick={() => setCurrentBoxSize(b.size)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${currentBoxSize === b.size ? 'bg-ink text-white' : 'text-ink hover:bg-white/60'}`}
                  >
                    {b.size}
                  </button>
                ))}
              </div>
            }
          >
            Fill the box
          </StepTitle>

          {/* The box */}
          <div ref={boxRef} className="doodles-dark rounded-[1.75rem] bg-cocoa p-4 sm:p-6">
            <div className="relative z-10 mb-4 flex items-center justify-between text-white">
              <p className="font-type text-sm">
                {totalFlavorsInBox} of {currentBoxSize} slots filled
              </p>
              {totalFlavorsInBox > 0 && (
                <button type="button" onClick={clearCurrentBox} className="text-sm font-semibold text-mustard underline-offset-4 hover:underline">
                  Empty the box
                </button>
              )}
            </div>
            <div className={`relative z-10 grid gap-3 ${currentBoxSize === 4 ? 'grid-cols-2 sm:grid-cols-4' : currentBoxSize === 6 ? 'grid-cols-3' : 'grid-cols-3 sm:grid-cols-5'}`}>
              {filledSlots.map((cookie, idx) => (
                <div key={`${cookie.id}-${idx}`} className="group relative aspect-square rounded-full bg-peach p-1.5">
                  <div data-slot="filled" className="relative h-full w-full overflow-hidden rounded-full">
                    <Image src={cookie.image} alt={cookie.name} fill sizes="120px" className="object-cover" />
                  </div>
                  <button
                    onClick={() => removeFlavorFromBox(cookie.id)}
                    className="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow-card transition-colors hover:bg-coral"
                    aria-label={`Remove one ${cookie.name}`}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {Array.from({ length: emptySlotsCount }).map((_, idx) => (
                <div key={'empty_' + idx} className="flex aspect-square items-center justify-center rounded-full border-2 border-dashed border-white/20 font-type text-xs text-white/40">
                  {filledSlots.length + idx + 1}
                </div>
              ))}
            </div>
            <p className="relative z-10 mt-4 text-center text-sm text-white/80">
              {isBoxFull ? (
                <span className="inline-flex items-center gap-1.5 font-semibold text-mustard">
                  <Check className="h-4 w-4" /> Box is full. Add it to your order below.
                </span>
              ) : (
                <>
                  Add <strong className="text-white">{emptySlotsCount}</strong> more cookie{emptySlotsCount !== 1 && 's'} to fill it.
                </>
              )}
            </p>
          </div>

          {/* Flavor list */}
          <div>
            <h3 className="font-display text-2xl">Flavors</h3>
            <ul className="mt-3 divide-y divide-[var(--line)] lg:max-h-[480px] lg:overflow-y-auto lg:pr-1">
              {mockData.menuItems.map((cookie) => {
                const qty = selectedFlavors[cookie.id] || 0;
                return (
                  <li key={cookie.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-peach">
                        <Image src={cookie.image} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{cookie.name}</p>
                        <p className="truncate text-xs text-ink/60">{cookie.tagline}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        disabled={qty <= 0}
                        onClick={() => removeFlavorFromBox(cookie.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-ground text-ink transition-colors hover:bg-peach disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label={`Remove one ${cookie.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-5 text-center font-type text-sm font-bold">{qty}</span>
                      <button
                        type="button"
                        disabled={isBoxFull}
                        onClick={() => addFlavorToBox(cookie)}
                        className="plus-btn h-9 w-9 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label={`Add one ${cookie.name}`}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Summary + add */}
          <div className="space-y-3 rounded-[1.5rem] bg-peach p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-display text-xl leading-tight">{currentTier.name.replace(/\s*\(.*\)/, '')}</p>
                <p className="mt-1 text-xs text-ink/70">
                  {fulfillment}, {selectedDate.dateLabel}
                </p>
              </div>
              <p className="text-right font-display text-3xl leading-none">
                ${currentTier.demoPrice.toFixed(2)}
                <span className="block font-type text-[11px] font-normal text-ink/60">demo price</span>
              </p>
            </div>
            <button type="button" onClick={addCurrentBoxToCart} className={`btn btn-lg w-full ${isBoxFull ? 'btn-dark' : 'btn-light'}`}>
              {isBoxFull ? `Add box of ${currentBoxSize} to order` : `Add ${currentBoxSize - totalFlavorsInBox} more to finish the box`}
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-ink/60">Sales demo. No card is charged.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1400px] px-4 py-24 text-center">
          <p className="font-display text-3xl">Warming up the oven…</p>
        </div>
      }
    >
      <OrderContent />
    </Suspense>
  );
}
