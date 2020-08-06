require('dotenv').config();

const Koa = require('koa');
const KoaRouter = require("koa-router");
const cors = require("@koa/cors");
const bodyParser = require('koa-bodyparser');
const scrapeMeThis = require('./scrapingThemistoWay/scrapeMeThis');

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());
app.use(cors());

router.get("/", async (ctx, next) => {
    const searchOrder = ctx.request.body;
    const respuesta = await scrapeMeThis(searchOrder.searchData);
    console.log(typeof respuesta);
    searchOrder.productList = respuesta;
    ctx.body = searchOrder;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("Themisto inicializado."));