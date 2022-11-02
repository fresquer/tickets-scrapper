require('dotenv').config()

const pageScraperRun = require('./pageScraper')
const checkTextTerms = require('./checkText')
const sendNotification = require('./sendNotification')

async function runScrapper() {
    console.log('RUN START')
    const res_scrap = await pageScraperRun();
    for (const item of res_scrap) {
        const isPostive = checkTextTerms(item);
        if (isPostive) {
            console.log('RUN LOG: 🚨 Positive')
            sendNotification('🚨🚨🚨 Ya estan las entradas a la venta!!! 🚨🚨🚨');
        }
    }
    console.log('RUN FINISH')
}

export default async function handler(req, res) {
    await runScrapper();
    res.statusCode = 200;
    res.json({ message: 'works' });
}
