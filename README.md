(Work in progress. Author: Diego M. Maldini Freyre.)

# Puppeteer (https://pptr.dev/) based product search web service across two node.js apps using koa.js (https://koajs.com/)

## This app, called 'theIntermediary':
    • exposes the web service API
    • handles clients authentication
    • handles persistence with mongoDB using mongoDB Node Driver (https://docs.mongodb.com/drivers/node/)
    • delegates search jobs to ‘theScrapper’ app

'theScrapper' is the one that receives jobs from 'theIntermediary' and uses Puppeteer to run searches on a provider's website.

### Both apps are hosted in Heroku:
- https://diegommf-ganymede.herokuapp.com as 'theIntermediary', and
- https://diegommf-themisto.herokuapp.com as 'theScrapper'.

#### POST /api/product/search
This endpoint receives a JSON object with the search data, as follows:
{
query : 'chair',
provider : 'amazon',
options: {
user: '[a username],
password : '[a password]'
} ,
callbackUrl : 'http://my-endpoint.com/results'
}

Where:
- query is the search string.
- provider is a key that specifies which provider the search must be run on.
- options are provider specific options.
- callbackUrl is a URL where the search results will be posted.

For each request a Search Order is created and persisted to the database. An order consists of:
- A unique ID.
- The search data, as received in the request.
- An order status. Can be either received (default), processing, fulfilled or failed.
- The product list result, which sits empty until the order is fulfilled.

Once a search order is placed, the endpoint responds with the newly created order.

#### GET /api/product/search-order/{order-id}
This endpoint receives an order ID, and responds with the order object.

#### GET /api/product/search-orders
This endpoint returns the full list of search orders.

#### GET /api/product/category/{product-category-id}
This endpoint returns the list of all products associated with the given product category ID. 

…
All products are persisted to the database, with the following schema:
- SKU.
- Product name / title.
- Price.
- Original Price, if there's a discount.
- Product Category ID. An identifier for the product category. Can be a relative path or URL identifying the category the product falls into. Must be consistent across different products of the same category.
- Description, if any.
- Images as a list of URLs.
- Related search queries.

Finally, 'theIntermediary' makes a request to callbackUrl reporting the order status and, if fulfilled, the API URL where the order data is served.
