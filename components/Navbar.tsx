'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { ShoppingBag, Menu as MenuIcon, X, LayoutDashboard } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Flavors', href: '/menu' },
  { label: 'Build a box', href: '/order' },
  { label: 'Start here', href: '/start-here' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartDrawerOpen } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? 'bg-ground/90 backdrop-blur-md shadow-[0_1px_0_0_var(--line)]' : 'bg-ground'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-type text-lg font-bold tracking-tight text-ink sm:text-xl" aria-label="Tatti cookies, home">
          tatti<span className="text-coral">.</span>cookies
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-ink ${active ? '' : 'opacity-75 hover:opacity-100'}`}
              >
                <span className="roll">
                  <span>{link.label}</span>
                  <span aria-hidden="true">{link.label}</span>
                </span>
                <span
                  className={`absolute -bottom-1.5 left-0 h-[3px] rounded-full bg-coral transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/dashboard"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-peach sm:inline-flex"
            aria-label="Owner dashboard"
            title="Owner dashboard"
          >
            <LayoutDashboard className="h-[18px] w-[18px]" strokeWidth={2} />
          </Link>
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-peach"
            aria-label={`Open your box${cartCount ? `, ${cartCount} items` : ''}`}
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-[11px] font-bold text-ink">
                {cartCount}
              </span>
            )}
          </button>
          <Link href="/order" className="btn btn-salmon btn-sm ml-1 hidden sm:inline-flex">
            <span className="roll">
              <span>Build a box</span>
              <span aria-hidden="true">Build a box</span>
            </span>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-peach md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-ground px-4 pb-6 pt-3 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between border-b border-[var(--line)] py-3.5 font-display text-3xl ${
                  pathname === link.href ? 'text-coral' : 'text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/dashboard" className="flex items-center gap-2 py-4 text-sm font-semibold text-ink/80">
              <LayoutDashboard className="h-4 w-4" /> Owner dashboard
            </Link>
          </nav>
          <Link href="/order" className="btn btn-salmon w-full">
            Build a box
          </Link>
        </div>
      )}
    </header>
  );
}
