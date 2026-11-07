/** @type {import('tailwindcss').Config} */
// Design tokens — "bakery bento" direction (see README > Design system).
// Old token names (burgundy / butter / cream) are kept and remapped so every
// component shifts to the new palette; new names (cocoa, mustard, coral, sky,
// peach, salmon, ink, ground) are used by the redesigned pieces.
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary dark — chocolate
        burgundy: {
          50: '#FBF2EA',
          100: '#F6E6D8',
          200: '#EBD1BC',
          300: '#D8AE90',
          600: '#6E3C27',
          700: '#4A2517',
          800: '#3A1C11',
          900: '#2F170E',
          950: '#211009',
        },
        // Warm accent — peach to mustard
        butter: {
          50: '#FFF9F0',
          100: '#FFF1DE',
          200: '#F9D7AC',
          300: '#F3C36A',
          400: '#E9B23F',
          500: '#D59A20',
        },
        // Ground + ink
        cream: {
          50: '#FFF8F1',
          100: '#FBEFE3',
          200: '#F2E0CF',
          300: '#E6CBB2',
          800: '#6F5347',
          900: '#3B1E14',
        },
        chocolate: {
          800: '#3A1C11',
          900: '#2F170E',
        },
        ground: '#FFF8F1',
        ink: '#3B1E14',
        cocoa: '#3A1C11',
        mustard: '#E9B23F',
        coral: '#FF8378',
        sky: '#92D4E3',
        peach: '#F9D3A5',
        salmon: '#FBA27E',
      },
      fontFamily: {
        // Lilita One carries every heading (the old "serif" class now means display)
        serif: ['var(--font-display)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-type)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        bento: '2.25rem',
      },
      boxShadow: {
        warm: '0 18px 40px -22px rgba(59, 30, 20, 0.35)',
        'warm-hover': '0 26px 50px -24px rgba(59, 30, 20, 0.45)',
        card: '0 10px 30px -18px rgba(59, 30, 20, 0.3)',
        sticker: '4px 4px 0 0 #3B1E14',
        'sticker-sm': '3px 3px 0 0 #3B1E14',
      },
    },
  },
  plugins: [],
}
