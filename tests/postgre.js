const puppeteer = require('puppeteer');
console.log('POSTGRE');

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
  await page.goto('http://app-postgre', {timeout: 5000});
  
  console.log('page.content');
  content = await page.content();

  console.log('content.includes adminer');
  if (!content.includes('adminer')) {
    throw new Error('The text "adminer" was not found on the page');
  }

  console.log('content.includes db-postgre');
  if (!content.includes('db-postgre')) {
    throw new Error('The text "db-postgre" was not found on the page');
  }

  console.log('page.click');
  await page.click('input[type="submit"][value="Enter"]');

  console.log('timeout');
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('page.content');
  content = await page.content();

  console.log('content.includes PostgreSQL');
  if (!content.includes('PostgreSQL')) {
    throw new Error('The text "PostgreSQL" was not found on the page');
  }

  console.log('content.includes Schema: public');
  if (!content.includes('Schema: public')) {
    throw new Error('The text "Schema: public" was not found on the page');
  }

  await browser.close();

  console.log('OK');
})();