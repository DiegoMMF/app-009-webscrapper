const puppeteer = require('puppeteer');

async function cetroSearch(searchProvider, searchTerm){
    const browser = await puppeteer.launch({headless: false, defaultViewport: false});
    const page = await browser.newPage();
    
    await page.goto(searchProvider);

    await page.type("#search", searchTerm, {delay: 100});
    await page.keyboard.press("Enter");

    await page.waitForSelector('ol[class="products list items product-items  defer-images-grid"]');

    let lis = [];
    lis = await page.$$('ol li span[data-price-type="finalPrice"]')
    console.log("lis length = " + lis.length);
      
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
    
    console.log(articles);
};

module.exports = cetroSearch;