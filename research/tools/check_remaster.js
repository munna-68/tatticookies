const puppeteer = require('puppeteer-core');
const path = require('path');

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../research/screenshots');

async function testAfterScreenshots() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const pages = [
    { name: 'after-home', path: '/' },
    { name: 'after-menu', path: '/menu' },
    { name: 'after-order', path: '/order' },
    { name: 'after-starthere', path: '/start-here' },
    { name: 'after-dashboard', path: '/dashboard' }
  ];

  for (const p of pages) {
    const url = 'http://localhost:3001' + p.path;
    console.log(`Testing ${url}...`);

    // Desktop
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${p.name}-desktop.png`), fullPage: true });
    await page.close();

    // Mobile
    const mPage = await browser.newPage();
    await mPage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await mPage.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));
    await mPage.screenshot({ path: path.join(SCREENSHOTS_DIR, `${p.name}-mobile.png`), fullPage: true });
    await mPage.close();

    console.log(`Saved ${p.name} desktop and mobile screenshots.`);
  }

  await browser.close();
  console.log('All after screenshots saved successfully!');
}

testAfterScreenshots();
