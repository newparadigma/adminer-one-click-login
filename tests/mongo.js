const puppeteer = require('puppeteer');
console.log('MONGO');

(async () => {
  let content;

  console.log('browser init');
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.log('page init');
  const page = await browser.newPage();
  console.log('page init goto');
  await page.goto('http://app-mongo', {timeout: 5000});
  
  console.log('page.content');
  content = await page.content();

  console.log('content.includes adminer');
  if (!content.includes('adminer')) {
    throw new Error('The text "adminer" was not found on the page');
  }

  console.log('content.includes db-mongo');
  if (!content.includes('db-mongo')) {
    throw new Error('The text "db-mongo" was not found on the page');
  }

  console.log('page.click');
  await page.click('input[type="submit"][value="Enter"]');

  console.log('timeout');
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('page.content');
  content = await page.content();

  console.log('content.includes MongoDB (alpha)');
  if (!content.includes('MongoDB (alpha)')) {
    throw new Error('The text "MongoDB (alpha)" was not found on the page');
  }

  console.log('content.includes Database: local');
  if (!content.includes('Database: local')) {
    throw new Error('The text "Database: local" was not found on the page');
  }

  await browser.close();

  console.log('OK');
})();