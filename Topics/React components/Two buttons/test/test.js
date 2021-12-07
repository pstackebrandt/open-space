const puppeteer = require('puppeteer');
const path = require('path');

const hs = require('hs-test-web');
const react = require('hs-test-web-server');

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function stageTest() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args:['--start-maximized', '--disable-infobar'],
    ignoreDefaultArgs: ['--enable-automation'],
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3010');

  page.on('console', msg => console.log(msg.text()));

  let result = await hs.testPage(page,
    // Test #1
    () => {
      if (document.getElementById('root').childNodes[0].tagName !== 'DIV') {
        return hs.wrong('The parent element inside the function App should be a "div".');
      }

      if (!document.querySelector('.main')) {
        return hs.wrong('Your App should contain a div with the class main.');
      }

      return hs.correct();
    },
    // Test #2
    () => {
      if (document.querySelector('.main').childNodes.length !== 3) {
        return hs.wrong('Your div must have three elements inside.');
      }

      return hs.correct();
    },
    // Test #3
    () => {
      const children = Array.from(document.querySelector('.main').childNodes);
      const buttons = children.filter(item => item.tagName === 'BUTTON');
      const heading = children.filter(item => item.tagName === 'H1');

      if (buttons.length !== 2) {
        return hs.wrong('There should be two buttons elements inside the div.');
      }

      if (heading.length !== 1) {
        return hs.wrong('There should be one h1 element inside the div.');
      }

      return hs.correct();
    },
    // Test #4
    () => {
      const children = Array.from(document.querySelector('.main').childNodes);
      if (children.some(item => item.textContent === '')) {
        return hs.wrong('All three elements should have a text');
      }

      return hs.correct();
    }
  );

  await sleep(15000);
  await browser.close();
  return result;
}

jest.setTimeout(30000);
test("Test stage", async () => {
  let result = await react.startServerAndTest(
    'localhost', 3010, path.resolve(__dirname, '..'), stageTest
  );

  if (result['type'] !== 'correct') {
    throw new Error(result['message']);
  }
});
