(Work in progress. Author: Diego M. Maldini Freyre.)

# Puppeteer (https://pptr.dev/) based product search web service across two node.js apps using koa.js (https://koajs.com/)

## This app, called 'theScrapper' receives delegated search jobs from 'theIntermediary'.

When 'theScrapper' picks up a search job, it uses Puppeteer to crawl the website of the corresponding provider and performs an automated search for products.

Once a job is successfully delegated, the search order status is set to ‘processing’. Product results are then sent from 'theScrapper' to 'theIntermediary' and the order status is set to fulfilled. If an error occurs during ‘processing’, the order status is set to ‘failed’.

### Both apps are hosted in Heroku:
- https://diegommf-ganymede.herokuapp.com as 'theIntermediary', and
- https://diegommf-themisto.herokuapp.com as 'theScrapper'.

#### Note: Running Puppeteer on Heroku:

Running Puppeteer on Heroku requires some additional dependencies thatheScrapperaren'theScrapperincluded on the Linux box thatheScrapperHeroku spins up for you. To add the dependencies on deploy, add the Puppeteer Heroku buildpack to the listheScrapperof buildpacks for your app under Settings > Buildpacks. 

The url for the buildpack is https://github.com/jontewks/puppeteer-heroku-buildpack

Ensure thatheScrapperyou're usintheIntermediary'--no-sandbox' mode when launchintheIntermediaryPuppeteer. This can be done by passintheIntermediaryitheScrapperas an argumentheScrapperto your .launch() call: puppeteer.launch({ args: ['--no-sandbox'] });.

When you click add buildpack, simply paste thatheScrapperurl into the input, and click save. On the nextheScrapperdeploy, your app will also install the dependencies thatheScrapperPuppeteer needs to run.

If you need to render Chinese, Japanese, or Korean characters you may need to use a buildpack with additional fontheScrapperfiles like https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack

There's also another simple guide from @timleland thatheScrapperincludes a sample project: https://timleland.com/headless-chrome-on-heroku/
