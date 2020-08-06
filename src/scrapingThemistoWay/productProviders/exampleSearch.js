const puppeteer = require('puppeteer');

const exampleSearch = async (searchTerm) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://books.toscrape.com/", { timeout: 0 });

    console.log(`recibimos ${searchTerm} pero no lo usamos en este test`);

    await page.waitForSelector('#default > div > div > div > div > section > div:nth-child(2) > ol');

    let arregloDeElementos = [];
    arregloDeElementos = await page.$$('#default > div > div > div > div > section > div:nth-child(2) > ol > li')
      
    const arregloDeProductos = [];
    for (const cadaElemento of arregloDeElementos) {
        const productoAGuardar = {
            SKU: "No posee",                            // después lo acomodamos
            productName: "",
            actualPrice: "",
            originalPrice: "",
            productCategoryID: searchTerm,              // después lo acomodamos
            ProductDescription: "búsqueda de prueba",   // después lo acomodamos
            imagesUrl: "",
            relatedQueries: searchTerm                  // después lo acomodamos
        };
        try {
            const nombreProducto = await cadaElemento.$eval(("h3 > a"), element => element.getAttribute("title"));
            productoAGuardar.productName = nombreProducto;
        } catch (error) {
            console.log("error en productoAGuardar.productName = nombreProducto ---> ", error);
        };
        try {
            const precioContado = await cadaElemento.$eval(('p.price_color'), (element) => element.innerText);
            productoAGuardar.actualPrice = precioContado;
        } catch (error) {
            console.log("error en productoAGuardar.actualPrice = precioContado ---> ", error);
        };
        try {
            const urlImagen = await cadaElemento.$eval(('img'), (element) => element.getAttribute("src"));
            // RegEx para url de imagen "/(http.*(png|jpg))/"
            productoAGuardar.imagesUrl = urlImagen;               // después lo acomodamos
        } catch (error) {
            console.log("error en productoAGuardar.imagesUrl = urlImagen ---> ", error);
        };
        
        arregloDeProductos.push(productoAGuardar);
    }
    await browser.close();
    return arregloDeProductos;
};

module.exports = exampleSearch;