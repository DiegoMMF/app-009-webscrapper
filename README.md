(work in progress)

# Puppeteer (https://pptr.dev/) based product search web service across two node.js apps.

## This app, called 'web-scrapper' receives search jobs delegated from 'product-searcher'.

When 'web-scrapper' picks up a search job, it uses Puppeteer to crawl the website of the corresponding provider (see list below) and performs an automated search for products.

Once a job is successfully delegated, the search order status is set to ‘processing’. Product results are then sent from 'web-scrapper' to 'product-searcher' and the order status is set to fulfilled. If an error occurs during ‘processing’, the order status is set to ‘failed’.

### Both apps are hosted in Heroku:
- https://diegommf-ganymede.herokuapp.com as 'product-searcher', and
- https://diegommf-themisto.herokuapp.com as 'web-scrapper'.

#### Note: Running Puppeteer on Heroku:

Running Puppeteer on Heroku requires some additional dependencies thaaren'included on the Linux box thaHeroku spins up for you. To add the dependencies on deploy, add the Puppeteer Heroku buildpack to the lisof buildpacks for your app under Settings > Buildpacks. 

The url for the buildpack is https://github.com/jontewks/puppeteer-heroku-buildpack

Ensure thayou're usin'--no-sandbox' mode when launchinPuppeteer. This can be done by passinias an argumento your .launch() call: puppeteer.launch({ args: ['--no-sandbox'] });.

When you click add buildpack, simply paste thaurl into the input, and click save. On the nexdeploy, your app will also install the dependencies thaPuppeteer needs to run.

If you need to render Chinese, Japanese, or Korean characters you may need to use a buildpack with additional fonfiles like https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack

There's also another simple guide from @timleland thaincludes a sample project: https://timleland.com/headless-chrome-on-heroku/
