'use client';

import React, { useRef, useState } from 'react';
import { gsap, useGSAP, PRELOADER_DONE } from '@/lib/motion/gsap';
import { img } from '@/lib/images';

const WORD = 'TATTI';

function markDone() {
  (window as unknown as { __tattiPreloaderDone?: boolean }).__tattiPreloaderDone = true;
  window.dispatchEvent(new Event(PRELOADER_DONE));
}

/**
 * Preloader that becomes the hero.
 * A chocolate cover with "TATTI" punched out of it (SVG mask). The letters fill
 * bottom-up with the cookie photo behind while the counter runs 000 → 100,
 * then the mask dives into the stem of the first T, the photo fills the screen
 * and shrinks into the hero card, which takes over.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (html.classList.contains('preloaded') || !html.classList.contains('js-motion')) {
        setGone(true);
        markDone();
        return;
      }

      const el = root.current!;
      const svg = el.querySelector<SVGSVGElement>('svg')!;
      const maskText = el.querySelector<SVGTextElement>('#pl-mask-text')!;
      const outline = el.querySelector<SVGTextElement>('#pl-outline')!;
      const group = el.querySelector<SVGGElement>('#pl-mask-group')!;
      const stops = el.querySelectorAll<SVGStopElement>('#pl-fill stop');
      const cover = el.querySelector<SVGRectElement>('#pl-cover')!;
      const photoWrap = el.querySelector<HTMLDivElement>('[data-pl-photo]')!;
      const photo = photoWrap.querySelector('img')!;
      const counter = el.querySelector<HTMLSpanElement>('[data-pl-count]')!;
      const labels = el.querySelectorAll('[data-pl-label]');

      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
      html.style.overflow = 'hidden';

      let tl: gsap.core.Timeline | null = null;
      let cancelled = false;

      const fonts = Promise.race([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        new Promise((r) => setTimeout(r, 1200)),
      ]);

      fonts.then(() => {
        if (cancelled) return;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Size the word to ~78% of the width (capped by height), measure, then refine.
        const setSize = (fs: number) => {
          [maskText, outline].forEach((t) => {
            t.setAttribute('font-size', String(fs));
            t.setAttribute('x', String(vw / 2));
            t.setAttribute('y', String(vh / 2 + fs * 0.34));
          });
        };
        setSize(100);
        let w = 100;
        try {
          w = maskText.getBBox().width || 100;
        } catch {}
        const fs = Math.min((100 * vw * 0.78) / w, vh * 0.5);
        setSize(fs);

        requestAnimationFrame(() => {
          if (cancelled) return;
          // Find the stem of the first T to dive into.
          let sx = vw / 2;
          let sy = vh / 2;
          try {
            const ext = maskText.getExtentOfChar(0);
            sx = ext.x + ext.width / 2;
            sy = ext.y + ext.height * 0.68;
          } catch {
            sx = vw / 2 - fs * 1.15;
          }

          let len = 2000;
          try {
            len = outline.getComputedTextLength() * 14 || 6000;
          } catch {}
          gsap.set(outline, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });

          const fill = { p: 0 };
          const count = { n: 0 };

          tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            onComplete: () => {
              try {
                sessionStorage.setItem('tatti-preloaded', '1');
              } catch {}
              html.classList.add('preloaded');
              html.style.overflow = '';
              setGone(true);
            },
          });

          tl.fromTo(photo, { scale: 1.35 }, { scale: 1, duration: 3, ease: 'power2.out' }, 0)
            .to(outline, { strokeDashoffset: 0, duration: 1.35, ease: 'power1.inOut' }, 0)
            .to(
              fill,
              {
                p: 1,
                duration: 1.5,
                onUpdate: () => stops.forEach((s) => s.setAttribute('offset', String(fill.p))),
              },
              0.05
            )
            .to(
              count,
              {
                n: 100,
                duration: 1.5,
                onUpdate: () => {
                  counter.textContent = String(Math.round(count.n)).padStart(3, '0');
                },
              },
              0.05
            )
            .to([outline, ...Array.from(labels)], { opacity: 0, duration: 0.25, ease: 'power1.out' }, 1.55)
            .to(group, { scale: 60, svgOrigin: `${sx} ${sy}`, duration: 0.9, ease: 'expo.in' }, 1.6)
            .to(cover, { opacity: 0, duration: 0.4, ease: 'none' }, 2.1)
            .call(markDone, [], 2.05);

          // Hand the photo over to the hero card: clip it down to the card's rect.
          tl.add(() => {
            const card = document.querySelector('[data-hero-card]');
            if (!card) return;
            const r = card.getBoundingClientRect();
            const vw2 = window.innerWidth;
            const vh2 = window.innerHeight;
            gsap.to(photoWrap, {
              clipPath: `inset(${r.top}px ${vw2 - r.right}px ${vh2 - r.bottom}px ${r.left}px round 36px)`,
              duration: 0.6,
              ease: 'expo.inOut',
            });
            gsap.to(photoWrap, { opacity: 0, duration: 0.35, delay: 0.3, ease: 'power1.out' });
          }, 2.45);
          tl.to({}, { duration: 0.01 }, 3.05);
        });
      });

      return () => {
        cancelled = true;
        tl?.kill();
        html.style.overflow = '';
      };
    },
    { scope: root }
  );

  if (gone) return null;

  return (
    <div id="preloader" ref={root} className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {/* Photo behind the cover — what the letters reveal */}
      <div data-pl-photo className="absolute inset-0 overflow-hidden bg-cocoa" style={{ clipPath: 'inset(0px 0px 0px 0px round 0px)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.preloader} alt="" className="h-full w-full object-cover" style={{ objectPosition: '50% 40%' }} fetchPriority="high" />
      </div>

      <svg className="absolute inset-0 h-full w-full" width="100%" height="100%">
        <defs>
          <linearGradient id="pl-fill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#000" />
            <stop offset="0" stopColor="#fff" />
          </linearGradient>
          <mask id="pl-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="#fff" />
            <g id="pl-mask-group">
              <text id="pl-mask-text" textAnchor="middle" fill="url(#pl-fill)" style={{ fontFamily: 'var(--font-display)' }}>
                {WORD}
              </text>
            </g>
          </mask>
        </defs>
        <rect id="pl-cover" width="100%" height="100%" fill="#3A1C11" mask="url(#pl-mask)" />
        <text
          id="pl-outline"
          textAnchor="middle"
          fill="none"
          stroke="#E9B23F"
          strokeWidth="2"
          opacity="0"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {WORD}
        </text>
      </svg>

      {/* Corner labels — visible from first paint so the screen is never empty */}
      <div className="pointer-events-none absolute inset-0 p-5 sm:p-8 text-white">
        <div data-pl-label className="flex items-start justify-between font-type text-xs sm:text-sm">
          <span>tatticookies</span>
          <span className="text-right">Austin, TX</span>
        </div>
        <div data-pl-label className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 max-w-[14rem] font-type text-xs sm:text-sm text-white/80">
          Stuffed cookies, baked Saturday morning.
        </div>
        <div data-pl-label className="absolute bottom-3 right-5 sm:bottom-5 sm:right-8 font-display text-5xl sm:text-7xl text-mustard tabular-nums">
          <span data-pl-count>000</span>
        </div>
      </div>
    </div>
  );
}
