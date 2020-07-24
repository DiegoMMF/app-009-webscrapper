# DiegoMMF-product-search-web-service-themisto
Search jobs: 
1) Ganymede delegates search jobs to Themisto using a mechanism of your choosing. If using HTTP, ensure clients are properly authenticated.
2) Once a job is successfully delegated, the
search order status is set to processing.
When Themisto picks up a search job, it uses Puppeteer to crawl the website of the
corresponding provider and performs an automated search for products. Each provider may
allow / require different options, such as user credentials.
Product results are then sent from Themisto to Ganymede, and the order status is set to
fulfilled. If an error occurs during processing, the order status is set to failed.
All products are persisted to the database, with the following schema:
● SKU.
● Product name / title.
● Price.
● Original Price, if there's a discount.
● Product Category ID. An identifier for the product category. Can be a relative path or
URL identifying the category the product falls into. Must be consistent across different
products of the same category.
● Description, if any.
● Images as a list of URLs.
● Related search queries.
Finally, Ganymede makes a request to callbackUrl reporting the order status and, if fulfilled, the
API URL where the order data is served.