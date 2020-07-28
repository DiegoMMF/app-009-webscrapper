// #default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.product_price > p.price_color
// #default div section article p.price_color

const puppeteer = require('puppeteer');

const exampleSearch = async (searchProvider, searchTerm) => {
    const browser = await puppeteer.launch(/* {headless: false, defaultViewport: false} */);
    const page = await browser.newPage();
    
    await page.goto(searchProvider);

    console.log(`recibimos ${searchTerm} pero no lo usamos`);

    await page.waitForSelector('#default > div > div > div > div > div.page-header.action > h1');

    let lis = [];
    lis = await page.$$('p.price_color')
    console.log("lis length = " + lis.length);
      
    const articles = [];

    try {
        const title = await page.$eval(("div section article p.price_color"), element => element.innerText);
        const article = {
            precio: title
        }
        articles.push(article)
    } catch (err) {
        console.log("error: ", err);
    }
    
    await browser.close();
    
    console.log("articles en exampleSearch ", articles);
    return articles;
};

module.exports = exampleSearch;