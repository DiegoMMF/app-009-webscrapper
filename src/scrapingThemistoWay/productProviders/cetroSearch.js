const puppeteer = require('puppeteer');

const cetroSearch = async (searchTerm) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.cetrogar.com.ar/", { timeout: 0 });
    await page.type("#search", searchTerm, { delay: 100 });
    await page.keyboard.press("Enter");
    await page.waitForSelector('#maincontent > div.columns > div.column.main > div.search.results > div.products.wrapper.grid.products-grid > ol');
    // otro selector posible: "ol[class="products list items product-items  defer-images-grid"]"

    // deberíamos intentar un click para cada elemento y desde allí loopear la asignación de los atributos que me faltan (varias img x producto, sku, etc.)
    let arregloDeElementos = [];
    arregloDeElementos = await page.$$('#maincontent > div.columns > div.column.main > div.search.results > div.products.wrapper.grid.products-grid > ol > li')
    const arregloDeProductos = [];
    for (const cadaElemento of arregloDeElementos) {
        const productoAGuardar = {
            SKU: "No posee",                    // después lo acomodamos
            productName: "",
            actualPrice: "",
            originalPrice: "",
            productCategoryID: searchTerm,      // después lo acomodamos
            ProductDescription: "No posee",     // después lo acomodamos
            imagesUrl: "",
            relatedQueries: searchTerm          // después lo acomodamos
        };
        try {
            const nombreProducto = await cadaElemento.$eval((".product-item-link"), element => element.innerText);
            productoAGuardar.productName = nombreProducto;
        } catch (error) {
            console.log("error en productoAGuardar.productName = nombreProducto ---> ", error);
        };
        try {
            const precioContado = await cadaElemento.$eval(('span[data-price-type="finalPrice"] span.price'), (element) => element.innerText);
            productoAGuardar.actualPrice = precioContado;
        } catch (error) {
            console.log("error en productoAGuardar.actualPrice = precioContado ---> ", error);
        };
        try {
            const precioViejo = await cadaElemento.$eval(('span[data-price-type="oldPrice"] span.price'), (element) => element.innerText);
            productoAGuardar.originalPrice = precioViejo;            
        } catch (error) {
            console.log("error en productoAGuardar.originalPrice = precioViejo ---> ", error);
        };
        try {
            const urlImagen = await cadaElemento.$eval(('.product-image-photo'), (element) => element.getAttribute("style"));
            // RegEx para url de imagen "/(http.*(png|jpg))/"
            productoAGuardar.imagesUrl = urlImagen;               // después lo acomodamos
        } catch (error) {
            console.log("error en productoAGuardar.imagesUrl = urlImagen ---> ", error);
        };
        arregloDeProductos.push(productoAGuardar);
    }
    await browser.close();
    return JSON.stringify(arregloDeProductos);
};

module.exports = cetroSearch;