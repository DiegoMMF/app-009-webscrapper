require('dotenv').config();

const Koa = require('koa');
const KoaRouter = require("koa-router");
const cors = require("@koa/cors");
const bodyParser = require('koa-bodyparser');
const scrapeMeThis = require('./src/scrapingThemistoWay/scrapeMeThis');

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());
app.use(cors());

router.get("/", async (ctx, next) => {
    if (ctx.is() === null) {
        ctx.body = "Request must contain a SearchOrder schema-type BODY. Try again, please.";
    } else {    
        const searchOrder = ctx.request.body;
        const respuesta = await scrapeMeThis(searchOrder.searchData);
        searchOrder.productList = respuesta;
        ctx.body = searchOrder;
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT, () => console.log("Themisto inicializado."));