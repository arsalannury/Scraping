const puppeteer = require("puppeteer");
const fs = require("fs");
import { Browser } from "puppeteer";

const url = "https://faalgir.com/";

const scrap = async () => {
  const browser: Browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(url);

  await page.click(".entry a");
  await page.waitForSelector(".entry-header");
  await page.waitForSelector(".entry-content div:nth-child(3)");

  const scrapping = await page.evaluate(() => {
    const getTitle = document.querySelector(".entry-header h1").textContent;
    const getPoetry = document
      .querySelector(".entry-content [trbidi='on']")
      .querySelectorAll("div");
    const nodeListToList = Array.from(getPoetry)
      .slice(1, 10)
      .map((poet: HTMLDivElement, index: number) => {
        return poet.innerText;
      });
console.log(nodeListToList, "nodeListToList");

    const nodeListToListResult = Array.from(getPoetry)
      .slice(18, 25)
      .map((poet: HTMLDivElement, index: number) => {
        return poet.innerText;
      });
    console.log(nodeListToListResult);
  });

  // const readFile = fs.readFileSync("./result.json", { encoding: "utf8" });

  // const fileToJson = JSON.parse(readFile);
  // fileToJson.push(scrapping);

  // fs.writeFileSync("./result.json", JSON.stringify(fileToJson));

  setTimeout(async () => {
    await browser.close();
  }, 600000);
};

scrap();
