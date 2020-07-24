const puppeteer = require("puppeteer");

const lanzar = async () => {
    const browser = puppeteer.launch({ headless: false, defaultViewport: null });
    const page = (await browser).newPage();
    (await page).goto("https://ensayosypoemas.wordpress.com");
};

lanzar();