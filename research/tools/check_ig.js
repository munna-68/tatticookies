const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testIG() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 900 });

  try {
    console.log('Navigating to Instagram profile...');
    const response = await page.goto('https://www.instagram.com/tatticookies/', { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Status:', response.status());
    await new Promise(r => setTimeout(r, 4000));
    
    const title = await page.title();
    console.log('Title:', title);
    const url = page.url();
    console.log('Final URL:', url);

    await page.screenshot({ path: '../../research/screenshots/instagram_profile.png' });
    const content = await page.content();
    fs.writeFileSync('../../research/instagram_dump.html', content);
    console.log('Dumped html length:', content.length);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
}

testIG();
