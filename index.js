require('dotenv').config();

const Koa = require('koa');
const KoaRouter = require("koa-router");
const cors = require("@koa/cors");
const bodyParser = require('koa-bodyparser');
const scrapeMeThis = require('./src/scrapingThemistoWay/scrapeMeThis');
const KoaLogger = require('koa-logger');

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());
app.use(cors());
app.use(KoaLogger())

router.get("/", (ctx, next) => {
    ctx.body = "Bienvenid@ a Themisto Web Service!";
});

router.post("/", async (ctx, next) => {
    //    console.log("ctx.is: \n", ctx.is());
    if (ctx.is() === false) {
        ctx.body = "Request must contain a SearchOrder schema-type BODY. Try again, please.";
    } else {    
        const searchOrder = ctx.request.body;
        const respuesta = await scrapeMeThis(searchOrder.searchData);
        searchOrder.productList = respuesta;

        console.log("Dentro de Themisto, searchOrder.productList justo antes de devolverlo a Ganymede", searchOrder.productList);

        ctx.body = searchOrder;
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT, () => console.log("Themisto inicializado."));