'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, Check } from 'lucide-react';
import { mockData } from '@/lib/mockData';
import { useCart } from '@/lib/CartContext';
import { img } from '@/lib/images';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion/gsap';

const shop = [
  { label: 'Home', href: '/' },
  { label: 'Flavors', href: '/menu' },
  { label: 'Build a box', href: '/order' },
  { label: 'Owner dashboard', href: '/dashboard' },
];
const answers = [
  { label: 'Saturday pickup', href: '/start-here#pickup' },
  { label: 'Austin delivery', href: '/start-here#delivery' },
  { label: 'Texas shipping', href: '/start-here#shipping' },
  { label: 'Reheating guide', href: '/start-here#reheating' },
  { label: 'Allergens', href: '/start-here#allergens' },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { showToast } = useCart();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(ref);
        gsap.fromTo(
          q('[data-wordmark]'),
          { yPercent: 60 },
          { yPercent: 0, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true } }
        );
        gsap.fromTo(
          q('[data-footer-cookies]'),
          { yPercent: 25, rotation: -6 },
          { yPercent: 0, rotation: 0, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true } }
        );
      });
    },
    { scope: ref }
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      showToast('Enter an email address', 'Use the address you want the Monday drop link sent to.', 'warning');
      return;
    }
    setDone(true);
    showToast('You’re on the drop list', 'The menu link arrives Monday at 11:30 AM CST, 30 minutes early.', 'success');
  };

  return (
    <footer ref={ref} className="relative mt-auto text-white">
      {/* Drippy chocolate edge */}
      <svg className="block h-10 w-full text-cocoa sm:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M0 80V40c40 0 60-28 110-28s70 40 120 40 60-36 115-36 70 30 120 30 65-38 120-38 70 44 125 44 60-30 112-30 68 26 118 26 62-40 118-40 70 36 122 36 64-24 110-24 50 20 70 20v26z"
        />
      </svg>
      <div className="doodles-dark relative overflow-hidden bg-cocoa">
        <div className="relative z-10 mx-auto grid max-w-[1400px] gap-12 px-4 pb-4 pt-10 sm:px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:px-8">
          {/* Cookie photo, fading into the chocolate */}
          <div className="relative hidden min-h-[22rem] md:block">
            <div data-footer-cookies className="absolute inset-x-0 -bottom-48 top-0 overflow-hidden" style={{ maskImage: 'radial-gradient(ellipse 55% 50% at 50% 42%, #000 55%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 55% 50% at 50% 42%, #000 55%, transparent 100%)' }}>
              <Image src={img.preloader} alt="" fill sizes="35vw" className="object-cover object-top" />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:gap-12">
            <div>
              <p className="font-type text-xs text-white/50">Shop</p>
              <ul className="mt-3 space-y-2 text-sm">
                {shop.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/85 hover:text-mustard">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-type text-xs text-white/50">Answers</p>
              <ul className="mt-3 space-y-2 text-sm">
                {answers.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/85 hover:text-mustard">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-display text-3xl leading-tight">Never miss a Monday drop</p>
              <p className="text-sm text-white/65">One email a week, 30 minutes before the menu goes public. Nothing else.</p>
              {done ? (
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm text-mustard">
                  <Check className="h-4 w-4" /> You’re on the list. See you Monday.
                </p>
              ) : (
                <form onSubmit={submit} className="flex max-w-md flex-col gap-2 sm:flex-row">
                  <label htmlFor="drop-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="drop-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="min-w-0 flex-1 rounded-full bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-mustard"
                  />
                  <button type="submit" className="btn btn-mustard">
                    Get drop alerts
                  </button>
                </form>
              )}
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-sm">
                <a href="https://www.instagram.com/tatticookies/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/85 hover:text-mustard">
                  <Instagram className="h-4 w-4" /> {mockData.business.instagram}
                </a>
                <a href={`mailto:${mockData.business.email}`} className="inline-flex items-center gap-2 text-white/85 hover:text-mustard">
                  <Mail className="h-4 w-4" /> {mockData.business.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="relative z-10 mx-auto max-w-[1400px] overflow-hidden px-4 sm:px-6 lg:px-8">
          <p data-wordmark aria-hidden="true" className="display-giant select-none normal-case text-right text-[31vw] leading-[0.8] text-mustard md:text-[19vw] lg:text-[min(17vw,16rem)]">
            Tatti!
          </p>
        </div>

        <div className="relative z-10 border-t border-white/10">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-5 text-xs text-white/50 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p>{mockData.business.lawNotice}</p>
            <p>
              © {new Date().getFullYear()} Tatti Gourmet Cookies · Remastered concept demo · Stock photos from{' '}
              <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                Unsplash
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
