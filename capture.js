import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const apps = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/apps.json'), 'utf8'));

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--ignore-certificate-errors', '--disable-web-security']
  });

  const outDir = path.join(process.cwd(), 'public', 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const app of apps) {
    console.log(`Taking screenshot of ${app.name} at ${app.url}...`);
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });
      
      await page.goto(app.url, { waitUntil: 'networkidle2', timeout: 15000 }).catch(e => console.log('Navigation timeout for ' + app.name));
      
      try {
         // Attempt to find a password input and fill it, not just for boomr/beredskapsplan but maybe all have it?
         // Actually let's just do it for all apps just in case, it will timeout if not found, catching the error successfully.
         console.log(`Checking for passcode input on ${app.id}...`);
         await page.waitForSelector('input', { timeout: 3000 });
         console.log(`Filling passcode for ${app.id}...`);
         await page.type('input', '68092659');
         await page.keyboard.press('Enter');
         
         // wait for page to reload and UI to settle
         await new Promise(r => setTimeout(r, 6000));
      } catch(e) {
         console.log(`No password input found or timeout for ${app.id}. Proceeding as normal.`);
         await new Promise(r => setTimeout(r, 3000));
      }
      
      // hide scrollbars
      await page.addStyleTag({content: '::-webkit-scrollbar { display: none !important; }'});
      
      const outPath = path.join(outDir, `${app.id}.png`);
      await page.screenshot({ path: outPath, type: 'png' });
      console.log(`Saved screenshot to ${outPath}`);
      await page.close();
    } catch (err) {
      console.error(`Failed to screenshot ${app.id}:`, err.message);
    }
  }

  await browser.close();
  console.log('Screenshots complete!');
})();
