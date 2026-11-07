const puppeteer = require('puppeteer-core');

async function checkHighlights() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 900 });

  try {
    await page.goto('https://www.instagram.com/tatticookies/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 3000));
    
    // Check if highlight buttons exist
    const highlightElements = await page.$$('li, div[role="button"], div[role="tab"]');
    console.log('Total interactive elements:', highlightElements.length);
    
    // Find text containing "start here", "cookies", "menu"
    const textNodes = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('*'));
      const matches = [];
      for (const el of all) {
        if (el.children.length === 0 && el.textContent.trim()) {
          const t = el.textContent.trim().toLowerCase();
          if (t.includes('start') || t.includes('menu') || t.includes('cookies') || t.includes('highlight')) {
            matches.push({ text: el.textContent.trim(), tag: el.tagName, role: el.getAttribute('role') });
          }
        }
      }
      return matches;
    });
    console.log('Matches on page:', textNodes);

    // Check if login dialog or prompt is present
    const loginText = await page.evaluate(() => {
      return document.body.innerText.includes('Log In') || document.body.innerText.includes('Sign up');
    });
    console.log('Has Login/Sign up modal or prompt on page:', loginText);

  } catch (e) {
    console.error('Error checking highlights:', e);
  } finally {
    await browser.close();
  }
}

checkHighlights();
