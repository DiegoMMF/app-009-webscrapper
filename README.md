# DiegoMMF-product-search-web-service-themisto

# Lo que hicimos hasta ahora
1) creamos una dummy-data en .env para probar Puppeteer:
    SEARCH_DATA={ "query": "silla", "provider": "https://www.cetrogar.com.ar/", "searchOrderID": "x", "options": "y" }
    por ahora, sólo lo probamos enviándole el provider/cetrogar como parámetro. Pero, lo más importante, funciona!!!!

2) tendremos que enviarle todo el objeto recibido por ganymede a un módulo intermedio que distinga de qué proveedor se trata
    y luego éste módulo redirija a la instancia de Puppeteer correspondiente a través de un switch

3) finalmente, 


# Consignas
Search jobs: 
1) Ganymede delegates search jobs to Themisto using a mechanism of your choosing. If using HTTP, ensure clients are properly authenticated.

When Themisto picks up a search job, it uses Puppeteer to crawl the website of the corresponding provider and performs an automated search for products. 

Each provider may allow / require different options, such as user credentials. 