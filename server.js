// environment variables
require('dotenv').config();
// imports
const express = require('express');
const morgan = require('morgan');
const server = new express();
const cors = require("cors");
const router = express.Router; // Creates a new router object.
// const scrapeThis = require('./src/scrapeThis');
// middleware
server.use(morgan('combined')); // logger
server.use(cors()); // authorization for cross-origin requests
server.use(express.static('./public')); // serves static files
server.use(express.urlencoded({extended: true})); // parses incoming requests with urlencoded payloads
server.use(express.json()) // parses incoming requests with JSON payloads

router.get("/", (req, res) => res.send("Welcome. This is the product search API:"));

server.use("/", router);

server.listen(process.env.PORT, () => console.log("SearchWeb initialized."));

/* router.post("/", async (req, res) => {
    if (req.body === []) {
        res.send("Request must contain a SearchOrder schema-type BODY. Try again, please.")
    } else {
        const searchOrder = req.body;
        const respuesta = await scrapeThis(searchOrder.searchData);
        searchOrder.productList = respuesta;

        console.log("Dentro de TheSearcher, searchOrder.productList justo antes de devolverlo a Ganymede", searchOrder.productList);

        ctx.body = searchOrder;
    }
}); */