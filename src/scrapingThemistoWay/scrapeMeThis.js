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

async function scrapeMeThis(providerUrl, productToScrape) {
    switch (providerUrl) {
        case "https://www.cetrogar.com.ar/":
            return await cetroSearch(providerUrl, productToScrape);
        default:
            console.log("Disculpas, por ahora tenemos un solo proveedor porsible: Cetrohome...")
            break;
    }
    
}

module.exports = scrapeMeThis;