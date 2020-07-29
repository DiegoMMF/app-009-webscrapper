/**
 * LISTO: 1) Requerimos dotenv para utilizar variables de entorno
 * LISTO: 2) Importamos e inicializamos módulos del servidor y middlewares (enrutadores)
 * LISTO: 3) Recibimos un GET con el JSON searchOrder completo
 * 
 *  3.1) Ver si es aquí que solucionamos el problema de la autenticación (para que sólo Ganymede nos llame)
 * 
 * LISTO 4) Pasamos searchOrder.searchData al módulo selector.js (debemos importarlo)
 * 
 *  4.1) Recibimos [status, productList] del selector
 *  4.2) Ver si es aquí que manejamos los errores o dentro de las funciones llamadas
 * 5) Devolvemos searchOrder (JSON completo actualizado)como respuesta a la llamada inicial
 */
require('dotenv').config();

const Koa = require('koa');
const KoaRouter = require("koa-router");
const bodyParser = require('koa-bodyparser');
const scrapeMeThis = require('./scrapingThemistoWay/scrapeMeThis');

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());

router.get("/", async (ctx, next) => {
    let searchOrder = ctx.request.body;
    let respuesta = await scrapeMeThis(searchOrder.searchData);
    ctx.body = respuesta;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("Themisto inicializado."));