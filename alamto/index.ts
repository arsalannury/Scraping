const puppeteer = require("puppeteer");
const fs = require("fs");
import { Browser } from "puppeteer";

const url = "https://www.alamto.com/hafez";

const scrap = async () => {
  const browser: Browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(url);

  await page.setViewport({ height: 1000, width: 900 });
  await page.waitForSelector(".post-content p:nth-child(7)");
  await page.$eval(".post-content p:nth-child(7) a", (e) =>
    e.setAttribute("target", "_self")
  );
  await page.click(".post-content p:nth-child(7)");
  await page.waitForSelector(".sub-title", { timeout: 600000 });

 const scrapping = await page.evaluate(() => {
    const title = (
      document.querySelector(
        ".post-content p:nth-child(7)"
      ) as HTMLParagraphElement
    ).innerText;
    const result = (
      document.querySelector(
        ".boxpopular p:nth-child(2)"
      ) as HTMLParagraphElement
    ).innerText;
   const poetries = document.querySelectorAll(".b");
   
    console.log(poetries, "poetries");
   
  });

  // const readFile = fs.readFileSync("./result.json", { encoding: "utf8" });

  // const fileToJson = JSON.parse(readFile);
  // fileToJson.push(scrapping);

  // fs.writeFileSync("./result.json", JSON.stringify(fileToJson));

  setTimeout(async () => {
    await browser.close();
  }, 60000);
};

scrap();
