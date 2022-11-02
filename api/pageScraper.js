const urlToScrap = process.env.URL;
const chromium = require('chrome-aws-lambda');

async function runScrap() {
    const browser = await chromium.puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
    })
    let page = await browser.newPage();
    await page.goto(urlToScrap, {
        waitUntil: 'domcontentloaded',
    });
    await page.waitForSelector('h5', { timeout: 5_000 })

    let scrapedData = []

    let links = await page.$$('h5');
    for (const link of links) {
        const text = await link.evaluate(node => node.innerText);
        scrapedData = [...scrapedData, { text }];
    }
    // Articles turn off - False positives
    // let articulos = await page.$$('article');
    // for (const articulo of articulos) {
    //     const text = await page.evaluate(el => el.getAttribute("data-buscarevento"), articulo);
    //     scrapedData = [...scrapedData, { text }];
    // }
    await page.close();
    await browser.close();
    return scrapedData
}

module.exports = runScrap