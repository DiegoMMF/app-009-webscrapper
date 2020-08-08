/**
 * @fileoverview búsqueda del producto exclusiva para 
 * un sitio bobo con fines de comprobación y testeo
 */
const puppeteer = require('puppeteer');

const exampleSearch = async (searchTerm) => {
    
    const browser = await puppeteer.launch({ args: [ '--no-sandbox', '--disable-setuid-sandbox' ]});
//  const browser = await puppeteer.launch();
//  anterior pero me tiraba error /app/node_modules/puppeteer/.local-chromium/linux-782078/chrome-linux/chrome:
//  error while loading shared libraries: libnss3.so: cannot open shared object file: No such file or directory

    const page = await browser.newPage();
    await page.goto("http://books.toscrape.com/", { timeout: 0 });

    console.log(`recibimos ${searchTerm} pero no lo usamos en este test`);

    await page.waitForSelector('#default > div > div > div > div > section > div:nth-child(2) > ol');

    let arregloDeElementos = [];
    arregloDeElementos = await page.$$('#default > div > div > div > div > section > div:nth-child(2) > ol > li')
      
    /**
     * en el loop siguiente creamos el objeto entero de Producto
     * para que en la validación no nos dé error, y después sobreescribimos
     * de acuerdo a los items conseguidos
     */
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