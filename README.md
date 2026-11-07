# Tatti Cookies — Remastered Website & Baker Operations Dashboard

> A remastered version of [tatticookies.com](https://tatticookies.com) designed for sales screen recording and customer conversion, built around how Tatti actually operates: weekly pre-order drop windows, Austin pickup & delivery, Texas postal shipping, and Instagram DM automation.

---

## Quick Start

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Run the development server
npm run dev
# Open http://localhost:3000 (or http://localhost:3001 if 3000 is occupied)
```

To create a production build:
```bash
npm run build
npm start
```

---

## Project Structure & Key Files

- **`lib/mockData.ts`**: The single source of truth for all content, menu items, box tiers, drop dates, FAQs, and dashboard analytics. Edit this one file to customize anything in seconds.
- **`lib/images.ts`**: Every photo the site uses, in one place. Most are hotlinked Unsplash stock (free licence) standing in for real Tatti photography; swap any entry for a local path (e.g. `/images/cookies/pecan-dulce.jpg`) when real photos exist. Flavor photos are set per item in `lib/mockData.ts`.
- **`public/images/cookies/`**: The original local photos. Only `chocolate-chunk.jpg` and `pecan-dulce.jpg` are still used; the rest didn't match their flavors and were replaced with stock.
- **`public/images/cutouts/`**: Transparent PNG cookie cut-outs (made from Unsplash photos) used in the hero bento.
- **`research/notes.md`**: Complete verified audit notes from live Instagram data and Shopify endpoints (`products.json`, theme assets, policies, accessibility checks).
- **`research/screenshots/`**: High-resolution before & after screenshots (desktop + mobile) comparing the live site against the remastered version.

---

## Design System (bakery bento redesign)

Art-directed from a bakery reference: a bento grid of rounded colour cards, chunky hand-lettered display type, a typewriter accent and boxed "sticker" words in headings.

- **Type:** Lilita One for every heading and the giant hero words (uppercase only for the giant words), Outfit for body and UI, Courier Prime for small typewriter notes (addresses, prices, counters). Loaded with `next/font` in `app/layout.tsx`.
- **Palette:** ground `#FFF8F1`, ink `#3B1E14`, cocoa cards `#3A1C11`, mustard `#E9B23F`, coral `#FF8378`, sky `#92D4E3`, peach `#F9D3A5`, salmon buttons `#FBA27E`. Defined in `tailwind.config.js`; the old `burgundy` / `butter` / `cream` names are remapped to the new values.
- **Components:** `.btn` pills (rising fill + rolling label on hover), `.sticker` boxed words, `.plus-btn`, `.bento` cards, `.doodles` line-drawing backgrounds (all in `app/globals.css`). Shared pieces: `components/ui/SectionTitle.tsx`, `components/ui/PageHeader.tsx`, `components/ui/Doodles.tsx` (cookie sticker, rotating stamp).
- **Motion (GSAP 3.13 + ScrollTrigger + SplitText):**
  - `components/Preloader.tsx`: a chocolate screen with "TATTI" cut out of it. The letters fill bottom-up with a cookie photo while a counter runs 000 → 100, then the mask dives into the first T, the photo fills the screen and shrinks into the hero card. Plays once per browser session, on the home page only (replay with `sessionStorage.clear()` and a reload).
  - Hero letters rise out of a mask, the cookie cut-out drops in and keeps turning on scroll. Section titles slap their sticker on. The story paragraph lights up word by word as you scroll, with photo pills popping in. Photo frames open up on scroll, the flavor rail slides in, testimonial cards fan out, the footer wordmark rises, and the Start Here cards stack.
  - Everything sits in `gsap.matchMedia()`. With `prefers-reduced-motion: reduce`, content just shows and the preloader is skipped.
- **Community quotes** on the home page are sample copy for the demo. Replace them in `components/home/Community.tsx` with real customer DMs.

## Pages Included

1. **Home (`/`)**: Hero branding, live drop countdown banner, three ways to get cookies (Austin Pickup, Austin Delivery, Texas Shipping), 3-step ordering process, featured cookies, and VIP drop email alerts.
2. **Menu (`/menu`)**: Real menu from research with live search, flavor category chips, box size picker, cookie cards with allergen tags, and quick-view detail modal.
3. **Pre-Order Box Builder (`/order`)**: Step-by-step pre-order flow with fulfillment selection, open drop dates with cutoff warnings, visual tactile box slots that fill in real time, and express checkout preview.
4. **Start Here (`/start-here`)**: The answers hub resolving repetitive Instagram DMs: Austin pickup porch details, delivery radius, Texas-only shipping law, storage & molten reheating guide, cottage food allergen disclosure, and FAQ accordion.
5. **Baker Dashboard (`/dashboard`)**: The owner command view featuring live drop capacity, fulfillment breakdown, top cookies ranking, recent orders table, and Instagram comment-to-link conversion analytics.
