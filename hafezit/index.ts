const puppeteer = require("puppeteer");
const fs = require("fs");
import { Browser } from "puppeteer";

const url = "https://www.hafez.it/";

const scrap = async () => {
  for (let index = 0; index < 10; index++) {
    const browser: Browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    await page.goto(url);

    await page.click(".btn-primary");
    await page.waitForSelector(".col-md-12");

    const scrapping = await page.evaluate(() => {
      const title = document.querySelector(".col-md-12 h1").textContent;
      const poetries = document
        .querySelector(".faal_poem")
        .querySelectorAll("p");
      const iterateParagraphs = Array.from(poetries).map((data) => ({
        peotry: data.innerText,
      }));
      const peotryTranslate = document.querySelector(".col-md-6 p").textContent;
      return {
        title,
        poetries: iterateParagraphs,
        peotryTranslate,
      };
    });

    const readFile = fs.readFileSync("./result.json", { encoding: "utf8" });

    const fileToJson = JSON.parse(readFile);
    fileToJson.push(scrapping);

    fs.writeFileSync("./result.json", JSON.stringify(fileToJson));

    await browser.close();
  }
};

scrap();
