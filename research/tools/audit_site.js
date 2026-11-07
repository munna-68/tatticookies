const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../research/screenshots');

async function auditSite() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const urlsToAudit = [
    { name: 'home', url: 'https://tatticookies.com' },
    { name: 'flavors', url: 'https://tatticookies.com/collections/flavors' },
    { name: 'product', url: 'https://tatticookies.com/products/pecan-dulce-1' },
    { name: 'allergen', url: 'https://tatticookies.com/pages/food-allergen-disclaimer' },
    { name: 'cart', url: 'https://tatticookies.com/cart' }
  ];

  const auditReport = {
    pages: {},
    links: [],
    consoleErrors: [],
    accessibilityIssues: []
  };

  for (const item of urlsToAudit) {
    console.log(`\nAuditing ${item.name} (${item.url})...`);
    
    // Desktop audit
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1280, height: 900 });
    
    const errors = [];
    desktopPage.on('console', msg => {
      if (msg.type() === 'error') errors.push({ page: item.name, text: msg.text() });
    });
    desktopPage.on('pageerror', err => {
      errors.push({ page: item.name, text: err.toString() });
    });

    try {
      await desktopPage.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));

      const desktopScreenshotPath = path.join(SCREENSHOTS_DIR, `before-${item.name}-desktop.png`);
      await desktopPage.screenshot({ path: desktopScreenshotPath, fullPage: true });
      console.log(`Saved desktop screenshot: before-${item.name}-desktop.png`);

      // Extract details
      const pageInfo = await desktopPage.evaluate(() => {
        const title = document.title;
        const text = document.body.innerText;
        const links = Array.from(document.querySelectorAll('a')).map(a => ({
          text: a.innerText.trim(),
          href: a.href
        })).filter(l => l.href);
        const images = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt || ''
        }));
        const buttons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim());
        return { title, textLength: text.length, links, images, buttons, textSample: text.slice(0, 500) };
      });

      auditReport.pages[item.name] = pageInfo;
      auditReport.consoleErrors.push(...errors);
    } catch (e) {
      console.error(`Failed auditing desktop ${item.name}:`, e.message);
    } finally {
      await desktopPage.close();
    }

    // Mobile audit
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    
    try {
      await mobilePage.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));

      const mobileScreenshotPath = path.join(SCREENSHOTS_DIR, `before-${item.name}-mobile.png`);
      await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: true });
      console.log(`Saved mobile screenshot: before-${item.name}-mobile.png`);

      // Check mobile tap targets and text size
      const mobileA11y = await mobilePage.evaluate(() => {
        const issues = [];
        const interactive = Array.from(document.querySelectorAll('a, button, input, select'));
        for (const el of interactive) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (rect.width < 32 || rect.height < 32) {
              issues.push({
                element: el.tagName,
                text: el.innerText ? el.innerText.slice(0, 20) : el.getAttribute('aria-label') || '',
                width: rect.width,
                height: rect.height,
                issue: 'Small tap target (<32px)'
              });
            }
          }
        }
        return issues;
      });

      auditReport.accessibilityIssues.push({ page: item.name, issues: mobileA11y.slice(0, 10) });
    } catch (e) {
      console.error(`Failed auditing mobile ${item.name}:`, e.message);
    } finally {
      await mobilePage.close();
    }
  }

  await browser.close();
  fs.writeFileSync(path.resolve(__dirname, '../../research/audit_report.json'), JSON.stringify(auditReport, null, 2));
  console.log('\nAudit complete! Report saved to research/audit_report.json');
}

auditSite();
