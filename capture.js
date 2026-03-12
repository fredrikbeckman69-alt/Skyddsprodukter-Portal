import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const apps = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/apps.json'), 'utf8'));

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox']
  });

  const outDir = path.join(process.cwd(), 'public', 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const app of apps) {
    console.log(`Taking screenshot of ${app.name} at ${app.url}...`);
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      // We wait until network is mostly idle or after 5 seconds
      await page.goto(app.url, { waitUntil: 'networkidle2', timeout: 10000 }).catch(e => console.log('Navigation timeout for ' + app.name));
      
      // Wait an extra second for animations
      await new Promise(r => setTimeout(r, 2000));
      
      const outPath = path.join(outDir, `${app.id}.jpg`);
      await page.screenshot({ path: outPath, type: 'jpeg', quality: 80 });
      console.log(`Saved screenshot to ${outPath}`);
      await page.close();
    } catch (err) {
      console.error(`Failed to screenshot ${app.id}:`, err.message);
    }
  }

  await browser.close();
  console.log('Screenshots complete!');
})();
