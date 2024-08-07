const puppeteer = require('puppeteer');
const dotenv = require('dotenv')

dotenv.config(); // Загрузит .env
dotenv.config({ path: '.env.local', override: true }); // Загрузит .env.local и переопределит значения

const env = {
  browserPath: process.env.BROWSER_PATH || '/usr/bin/chromium',
  urlFull: process.env.URL_FULL || 'http://app-full',
  urlMysql: process.env.URL_MYSQL || 'http://app-mysql',
  urlMongo: process.env.URL_MONGO || 'http://app-mongo',
  urlPostgre: process.env.URL_POSTGRE || 'http://app-postgre',
};

choosedGroups = [];
if (process.argv.length > 2) {
  choosedGroups = process.argv[2].split(',');
}

let groupCases = [
  {
    group: 'mysql',
    cases: [
      {
        url: env.urlMysql,
        dbContainerName: 'db-mysql',
        driver: 'MySQL',
        schema: 'Database: local'
      },
    ]
  },
  {
    group: 'mongo',
    cases: [
      {
        url: env.urlMongo,
        dbContainerName: 'db-mongo',
        driver: 'MongoDB (alpha)',
        schema: 'Database: local'
      },
    ]
  },
  {
    group: 'postgre',
    cases: [
      {
        url: env.urlPostgre,
        dbContainerName: 'db-postgre',
        driver: 'PostgreSQL',
        schema: 'Schema: public'
      }
    ]
  },
  {
    group: 'full',
    cases: [
      {
        url: env.urlFull,
        dbContainerName: 'db-mysql',
        driver: 'MySQL',
        schema: 'Database: local'
      },
      {
        url: env.urlFull,
        dbContainerName: 'db-mongo',
        driver: 'MongoDB (alpha)',
        schema: 'Database: local'
      },
      {
        url: env.urlFull,
        dbContainerName: 'db-postgre',
        driver: 'PostgreSQL',
        schema: 'Schema: public'
      }
    ]
  },
]

if (choosedGroups.length > 0) {
  groupCases = groupCases.filter(({ group }) => choosedGroups.includes(group));
}

groupCases.forEach(({ group, cases }) => {
  console.log(group.toUpperCase());
  cases.forEach(({ url, dbContainerName, driver, schema }) => {
    test(url, dbContainerName, driver, schema, group);
  });
}); 

async function test(url, dbContainerName, driver, schema, group) {
  let content;

  console.log(group + ' browser init');
  const browser = await puppeteer.launch({
    executablePath: env.browserPath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  console.log(group + ' page init');
  const page = await browser.newPage();

  console.log(group + ' page goto');
  maxAttempts = 3;
  timeout = 5000;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await page.goto(url, { timeout: timeout });
      console.log(`Успешно загружена страница ${url}`);
      break;
    } catch (error) {
      console.log(`Попытка ${attempt} не удалась: ${error.message}`);
      if (attempt === maxAttempts) {
        throw new Error(`Не удалось загрузить страницу ${url} после ${maxAttempts} попыток`);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log(group + ' page.content');
  content = await page.content();

  console.log(group + ' content.includes adminer');
  if (!content.includes('adminer')) {
    throw new Error('The text "adminer" was not found on the page');
  }

  console.log(group + ' content.includes ' + dbContainerName);
  if (!content.includes(dbContainerName)) {
    throw new Error('The text "' + dbContainerName + '" was not found on the page');
  }

  console.log(group + ' page.click');
  await page.evaluate((dbContainerName) => {
    const dbInput = content.querySelector('input[value="'+ dbContainerName + '"]');
    if (dbInput) {
      const form = dbInput.closest('form');
      if (form) {
        const submitButton = form.querySelector('input[type="submit"][value="Enter"]');
        if (submitButton) {
          submitButton.click();
        } else {
          throw new Error('The submit button with value "Enter" was not found inside the form');
        }
      } else {
        throw new Error('The input with value "'+ dbContainerName + '" was not inside a form');
      }
    } else {
      throw new Error('The input with value "'+ dbContainerName + '" was not found on the page');
    }
  }, dbContainerName);

  console.log(group + ' timeout');
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log(group + ' page.content');
  content = await page.content();

  console.log(group + ' content.includes ' + driver);
  if (!content.includes(driver)) {
    throw new Error('The text "' + driver + '" was not found on the page');
  }

  console.log(group + ' content.includes ' + schema);
  if (!content.includes(schema)) {
    throw new Error('The text "' + schema + '" was not found on the page');
  }

  await browser.close();

  console.log(group + ' OK');
}
