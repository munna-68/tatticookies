// Image registry. Everything visual is pulled from here so swapping a photo is
// a one-line change. `u()` builds a hotlinked Unsplash URL (free Unsplash
// licence — no attribution required, credited in the footer anyway).
// Local files in /public/images are the owner's own photos and come first;
// replace any Unsplash entry with a local path when real Tatti photos exist.

export const u = (id: string, w = 1200, extra = '') =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75${extra}`;

export const img = {
  // Transparent cut-outs made from Unsplash photos (public/images/cutouts)
  cookieTop: '/images/cutouts/cookie-top.png',
  cookieStack: '/images/cutouts/cookie-stack.png',

  // Hero / brand moments
  preloader: u('1633111855870-ce0a28539ae1', 1800), // stacked cookies on black
  gooeyPull: u('1741542164748-89ecfceb6f94', 1200),
  cookieFace: u('1646734923410-894795c7e2bc', 900), // woman with a cookie over one eye
  baker: u('1709837167684-47d7ccf0ed89', 1200), // home baker at the counter
  boxSpread: u('1598839950900-cb950a10bc4d', 900),

  // Inline story pills
  pillFlour: u('1549590143-d5855148a9d5', 300),
  pillBreak: u('1761673912837-9f35cfe7f6e4', 300),
  pillBasket: u('1558961363-fa8fdf82db35', 300),
  pillGooey: u('1753796950547-fa2430603d74', 300),

  // Community portraits (demo placeholders)
  people: [
    u('1758600433991-933fb663161f', 600),
    u('1758600587815-b654d1405e83', 600),
    u('1702937707077-814bb5e2d112', 600),
    u('1758600435913-c45b319745ca', 600),
  ],
};
