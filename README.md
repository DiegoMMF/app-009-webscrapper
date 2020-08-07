# product-search-web-service

1) LISTO:Requerimos dotenv para utilizar variables de entorno

2) LISTO:Importamos e inicializamos módulos del servidor y middlewares (enrutadores)

3) LISTO:Recibimos un GET con el JSON searchOrder completa

    falta    3.1) Ver si es aquí que solucionamos el problema de la autenticación (para que sólo Ganymede nos llame)

4) LISTO Pasamos searchOrder.searchData al módulo selector.js (debemos importarlo)

    LISTO    4.1) Recibimos [status, productList] del selector

    falta    4.2) Ver si es aquí que manejamos los errores o dentro de las funciones llamadas

5) LISTO Devolvemos searchOrder (JSON completo actualizado)como respuesta a la llamada inicial

# So far
1) we built dummy-data in ".env" for testing: SEARCH_DATA={ query, provider, searchOrderID, options }

2) tendremos que enviarle todo el objeto recibido por ganymede a un módulo intermedio que distinga de qué proveedor se trata
    y luego éste módulo redirija a la instancia de Puppeteer correspondiente a través de un switch

3) finalmente, 

# Lo que haremos
Recibimos el JSON de Ganymede que contiene lo necesario para efectuar la búsqueda:
{
    cliente: {
        nombre: "ganymede",
        clave: "ganym3d3"
        searchOrderID
    },
    searchData: {
        query: "silla",
        provider: "proveedor",
        options: {
            finalUserName: "nombreUsuarioEnProveedor",
            finalUserPass: "claveUsuarioEnProveedor"
        }
    }
}


Cotejamos que el JSON tenga usuario y clave adecuadas que bien podrían estar guardados como variable de entorno.


Lanzamos la instancia adecuada de Puppeteer, según el proveedor que hayan requerido
con {searchData} como parámetro. Llamarlo como función en otro archivo, mediante un switch e/proveedores


Recogemos la devolución de la función anterior.
Si la búsqueda da error, enviamos un HTTP con el código correspondiente + searchOrderID.
Si la búsqueda es exitosa, enviamos un HTTP/JSON con { listaProductos + search_order_id }

# Consignas
Search jobs: 
1) G delegates search jobs to T.
2) Ensure clients are properly authenticated.
3) T uses Puppeteer to crawl the website of the corresponding provider and performs an automated search for products.
4) Each provider may allow / require different options, such as user credentials.

# Running Puppeteer on Heroku:

Running Puppeteer on Heroku requires some additional dependencies that aren't included on the Linux box that Heroku spins up for you. To add the dependencies on deploy, add the Puppeteer Heroku buildpack to the list of buildpacks for your app under Settings > Buildpacks. 

The url for the buildpack is https://github.com/jontewks/puppeteer-heroku-buildpack

Ensure that you're using '--no-sandbox' mode when launching Puppeteer. This can be done by passing it as an argument to your .launch() call: puppeteer.launch({ args: ['--no-sandbox'] });.

When you click add buildpack, simply paste that url into the input, and click save. On the next deploy, your app will also install the dependencies that Puppeteer needs to run.

If you need to render Chinese, Japanese, or Korean characters you may need to use a buildpack with additional font files like https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack

There's also another simple guide from @timleland that includes a sample project: https://timleland.com/headless-chrome-on-heroku/.