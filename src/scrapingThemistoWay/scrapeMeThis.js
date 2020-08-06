/**
 * @fileoverview This file is a selector for different providers,
 * it launches the right function depending on the received query.
 */
const cetroSearch = require("./productProviders/cetroSearch");
const exampleSearch = require("./productProviders/exampleSearch");
const amaSearch = require("./productProviders/amaSearch");

/**
 * @param { Object } searchData sub Schema of SearchOrder Schema
 * (see /models in Ganymede)
 */
const scrapeMeThis = async (searchData) => {
    let { provider, query } = searchData;
    console.log("searchData.query", query);
    console.log("searchData.provider", provider);
    let respuesta = null;
    switch (provider) {
        case "cetrogar":
            respuesta = await cetroSearch(query);
            break;
        case "amazon":
            respuesta = await amaSearch(query);
            break;
        case "dummyWeb":
            respuesta = await exampleSearch(query);
            break;
        default:
            console.log('Por favor, elija uno de los proveedores indicados: "cetrogar" o "dummyWeb')
            break;
    };
    return respuesta;
}

module.exports = scrapeMeThis;