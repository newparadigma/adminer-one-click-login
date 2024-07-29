const puppeteer = require('puppeteer');
console.log('MYSQl');

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
  await page.goto('http://app-mysql', {timeout: 5000});
  
  console.log('page.content');
  content = await page.content();

  console.log('content.includes adminer');
  if (!content.includes('adminer')) {
    throw new Error('The text "adminer" was not found on the page');
  }

  console.log('content.includes db-mysql');
  if (!content.includes('db-mysql')) {
    throw new Error('The text "db-mysql" was not found on the page');
  }

  console.log('page.click');
  await page.click('input[type="submit"][value="Enter"]');

  console.log('timeout');
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('page.content');
  content = await page.content();

  console.log('content.includes MySQL');
  if (!content.includes('MySQL')) {
    throw new Error('The text "MySQL" was not found on the page');
  }

  console.log('content.includes Database: local');
  if (!content.includes('Database: local')) {
    throw new Error('The text "Database: local" was not found on the page');
  }

  await browser.close();

  console.log('OK');
})();