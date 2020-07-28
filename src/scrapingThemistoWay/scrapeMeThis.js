/**
 * The single job for this module is to determine which Puppeteer instance we should use for the current product search
 * 
 * So far it works...
 */

// Desactualizado...
//
// require('dotenv').config();
// 
// const scrapear = require("./productProviders/cetrogar");
// 
// const searchData = JSON.parse(process.env.SEARCH_DATA);     // dummy-data para probar.
// 
// console.log(searchData.provider);
// 
// scrapear(searchData.provider);

const cetroSearch = require("./productProviders/cetroSearch");
const exampleSearch = require("./productProviders/exampleSearch");

const scrapeMeThis = async (providerUrl, productToScrape) => {
    let respuesta = null;
    switch (providerUrl) {
        case "https://www.cetrogar.com.ar/":
            return await cetroSearch(providerUrl, productToScrape);
        case "http://books.toscrape.com/":
            // respuesta = exampleSearch(providerUrl, productToScrape);
            console.log("exampleSearch(providerUrl, productToScrape): ", await exampleSearch(providerUrl, productToScrape)
                .then(console.log("promesa después del llamado a exampleSearch desde ")));
            break;
        default:
            console.log("Disculpas, por ahora tenemos un solo proveedor porsible: Cetrohome...")
            break;
    };
    // console.log("texto después del switch");
}

module.exports = scrapeMeThis;