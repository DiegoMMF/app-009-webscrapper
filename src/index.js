require('dotenv').config();
const scrapear = require("./productProviders/cetrogar");

const searchData = JSON.parse(process.env.SEARCH_DATA);
console.log(searchData.provider);

scrapear(searchData.provider);

/**
 * Recibimos el JSON de Ganymede que contiene lo necesario para efectuar la búsqueda:
 * {
 *     cliente: {
 *         nombre: "ganymede",
 *         clave: "ganym3d3"
 *         searchOrderID
 *     },
 *     searchData: {
 *         query: "silla",
 *         provider: "proveedor",
 *         options: {
 *             finalUserName: "nombreUsuarioEnProveedor",
 *             finalUserPass: "claveUsuarioEnProveedor"
 *         }
 *     }
 * }
 */

/**
 * Cotejamos que el JSON tenga usuario y clave adecuadas ("ganymede" y "ganym3d3")
 * que bien podrían estar guardados como variable de entorno.
 */

/**
 * Lanzamos la instancia adecuada de Puppeteer, según el proveedor que hayan requerido
 * con {searchData} como parámetro. Llamarlo como función en otro archivo, mediante un switch e/proveedores
 */

/**
 * Recogemos la devolución de la función anterior.
 * Si la búsqueda da error, enviamos un HTTP con el código correspondiente + searchOrderID.
 * Si la búsqueda es exitosa, enviamos un HTTP/JSON con { listaProductos + search_order_id }
 */