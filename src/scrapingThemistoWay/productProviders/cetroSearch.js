const puppeteer = require('puppeteer');

const cetroSearch = async (searchTerm) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();    
    await page.goto("https://www.cetrogar.com.ar/");
    await page.type("#search", searchTerm, {delay: 100});
    await page.keyboard.press("Enter");
    await page.waitForSelector('ol[class="products list items product-items  defer-images-grid"]');
    let lis = [];
    lis = await page.$$('ol li span[data-price-type="finalPrice"]')
    const articles = [];
    for (const li of lis) {
        try {
            const title = await li.$eval(("span.price"), (element) => element.innerText); // probar $$eval, si llego con el tiempo.
            const article = {
                precio: title
            }
            articles.push(article)
        } catch (err) {
            // this occurs if any of the tags (h2, img, span) was not found
            console.log("error: ", err);
        }
    }    
    await browser.close();    
    return JSON.stringify(articles);
};

module.exports = cetroSearch;