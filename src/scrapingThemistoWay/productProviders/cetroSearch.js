const puppeteer = require('puppeteer');

const cetroSearch = async (searchTerm) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();    
    await page.goto("https://www.cetrogar.com.ar/", { timeout: 0 });
    await page.type("#search", searchTerm, {delay: 100});
    await page.keyboard.press("Enter");
    await page.waitForSelector('#maincontent > div.columns > div.column.main > div.search.results > div.products.wrapper.grid.products-grid > ol');
    // otro selector posible: "ol[class="products list items product-items  defer-images-grid"]"
    
    let arregloDeElementos = [];
    arregloDeElementos = await page.$$('#maincontent > div.columns > div.column.main > div.search.results > div.products.wrapper.grid.products-grid > ol > li')
    const arregloDeProductos = [];
    for (const cadaElemento of arregloDeElementos) {
        try {
            const precioContado = await cadaElemento.$eval(('span[data-price-type="finalPrice"] span.price'), (element) => element.innerText);
            const nombreProducto = await cadaElemento.$eval((".product-item-link"), element => element.innerText);
            const productoAGuardar = {
                actualPrice: precioContado,
                productName: nombreProducto
            };
            arregloDeProductos.push(productoAGuardar);
        } catch (err) {
            console.log("error: ", err);
        }
    }    
    await browser.close();    
    return JSON.stringify(arregloDeProductos);
};

module.exports = cetroSearch;