const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('http://app-mongo');
  
  const content = await page.content();
  if (!content.includes('adminer')) {
    throw new Error('The text "adminer" was not found on the page');
  }

  if (!content.includes('mongo')) {
    throw new Error('The text "mongo" was not found on the page');
  }

  await page.click('input[type="submit"][value="Enter"]');

  await new Promise(resolve => setTimeout(resolve, 2000)); // Ждем 2 секунды

  const h2Text = await page.evaluate(() => {
    const h2 = document.querySelector('h2');
    return h2 ? h2.textContent : null;
  });

  if (h2Text !== 'Database: local') {
    throw new Error('The text "Database: local" was not found in the h2 tag');
  }

  console.log('OK');

  await browser.close();
})();