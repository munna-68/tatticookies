import type { Metadata } from 'next';
import { Lilita_One, Outfit, Courier_Prime } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CookieModal from '@/components/CookieModal';
import ToastContainer from '@/components/ToastContainer';
import SmoothScroll from '@/components/SmoothScroll';

const display = Lilita_One({ subsets: ['latin'], weight: '400', variable: '--font-display', display: 'swap' });
const sans = Outfit({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const type = Courier_Prime({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-type', display: 'swap' });

export const metadata: Metadata = {
  title: 'Tatti | Gourmet Cookies & Bakes — Austin, TX',
  description:
    'Gourmet, small-batch stuffed cookies baked fresh from scratch in Austin, TX. Weekly pre-order drops, Saturday Austin pickup & delivery, and Texas-wide postal shipping.',
};

// Runs before paint: enables motion-gated hiding and skips the preloader
// after the first home visit of the session.
const bootScript = `(function(){try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion')}if(sessionStorage.getItem('tatti-preloaded')||location.pathname!=='/'){d.classList.add('preloaded')}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${type.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-ground text-ink">
        <SmoothScroll>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <CookieModal />
            <ToastContainer />
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
