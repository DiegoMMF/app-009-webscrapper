const puppeteer = require('puppeteer');

const exampleSearch = async (searchTerm) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://books.toscrape.com/");
    console.log(`recibimos "${searchTerm}" pero no lo usamos por ser la dummyWeb`);
    console.log('(únicamente devolveremos esto en JSON: "precio: £51.77".)')
    await page.waitForSelector('#default > div > div > div > div > div.page-header.action > h1');
    let lis = [];
    lis = await page.$$('p.price_color')
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
    return JSON.stringify(articles);
};

module.exports = exampleSearch;