/**
 * @fileoverview búsqueda del producto exclusiva para 
 * amazon
 */
const puppeteer = require('puppeteer')

const amaSearch = async (searchTerm) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com.mx', { timeout: 0 })
    await page.type('#twotabsearchtextbox', searchTerm, { delay: 100 })
    await page.click('input.nav-input')
    await page.waitForSelector('div.s-main-slot.s-result-list.s-search-results.sg-row')

    // deberíamos intentar un click para cada elemento y desde allí loopear la asignación de los atributos que me faltan (varias img x producto, sku, etc.)
    let arregloDeElementos = [];

    arregloDeElementos = await page.$$('div[class="s-result-list s-search-results sg-row"] > div')
    console.log("arregloDeElementos lenght = " + arregloDeElementos.length);

    if (arregloDeElementos.length <= 2) arregloDeElementos = await page.$$('div[class="s-main-slot s-result-list s-search-results sg-row"] > div');

    const arregloDeProductos = [];

    /**
     * en el loop siguiente creamos el objeto entero de Producto
     * para que en la validación no nos dé error, y después sobreescribimos
     * de acuerdo a los items conseguidos
     */
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
            const nombreProducto = await cadaElemento.$eval(("h2"), element => element.innerText);
            productoAGuardar.productName = nombreProducto;
        } catch (error) {
            console.log("error en productoAGuardar.productName = nombreProducto ---> ", error);
        };

        try {
            const urlImagen = await cadaElemento.$eval(("img"), (element) => element.getAttribute("src"));
            // RegEx para url de imagen "/(http.*(png|jpg))/"
            productoAGuardar.imagesUrl = urlImagen;               // después lo acomodamos
        } catch (error) {
            console.log("error en productoAGuardar.imagesUrl = urlImagen ---> ", error);
        };

        try {
            const precioContado = await cadaElemento.$eval(("span[class='a-price-whole']"), (element) => element.innerText);

            productoAGuardar.actualPrice = precioContado;

            const decimals = await div.$eval(("span[class='a-price-fraction']"), (element) => element.innerText);

            productoAGuardar.actualPrice = productoAGuardar.actualPrice.replace("\n", "") + decimals;
        } catch (error) {
            console.log("error en productoAGuardar.actualPrice = precioContado ---> ", error);
        };

        arregloDeProductos.push(productoAGuardar);

    }

    await browser.close();
    return arregloDeProductos;
};

module.exports = amaSearch;