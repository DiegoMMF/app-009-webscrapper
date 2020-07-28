/**
 * 1) Requerimos dotenv para utilizar variables de entorno
 * 2) Importamos e inicializamos módulos del servidor y middlewares (enrutadores)
 * 3) Recibimos un GET con el JSON searchOrder completo
 *  3.1) Ver si es aquí que solucionamos el problema de la autenticación (para que sólo Ganymede nos llame)
 * 4) Pasamos searchOrder.searchData al módulo selector.js (debemos importarlo)
 *  4.1) Recibimos [status, productList] del selector
 *  4.2) Ver si es aquí que manejamos los errores o dentro de las funciones llamadas
 * 5) Devolvemos searchOrder (JSON completo actualizado)como respuesta a la llamada inicial
 */
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
//