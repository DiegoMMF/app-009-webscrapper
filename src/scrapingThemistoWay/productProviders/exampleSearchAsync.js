const puppeteer = require('puppeteer');

const exampleSearch = async (searchTerm) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://books.toscrape.com/", { timeout: 0 });
    await page.waitForSelector('#default > div > div > div > div > div.page-header.action > h1');
    
    let elementos = await page.$$("div section article"); // esto devuelve "elementos" como un arreglo de "ElementHandlers" con el selector solicitado
    
    listaDePrecios = [];
    
    for (const elemento of elementos) {
        try {
            const precioContado = await elemento.$eval(("div section article .price_color"), (element) => element.innerText);
            const nombreProducto = await elemento.$eval(("article h3 a"), element => element.innerText);
            const dupla = {
                actualPrice: precioContado,
                productName: nombreProducto
            };
            listaDePrecios.push(dupla);
        } catch (err) {
            console.log("error: ", err);
        }
    await browser.close();    
    return JSON.stringify(listaDePrecios);
    };
};

module.exports = exampleSearch;