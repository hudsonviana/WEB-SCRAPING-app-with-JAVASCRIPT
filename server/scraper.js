const puppeteer = require('puppeteer');

async function scrapeChannel(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForXPath('//*[@id="text"]');

    // const [el] = await page.$x('//*[@id="text"]');
    const [el] = await page.$x('/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/div/div[1]/ytd-channel-name/div/div/yt-formatted-string');
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue(); 

    // const el2 = await page.$x('//*[@id="img"]');
    const [el2] = await page.$x('/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/tp-yt-app-header-layout/div/tp-yt-app-header/div[2]/div[2]/div/div[1]/yt-img-shadow/img');
    const src = await el2.getProperty('src');
    const avatarUrl = await src.jsonValue();

    browser.close();
    return {name, avatarUrl};
}

module.exports = {
    scrapeChannel
}
