import { Page } from "playwright-core";
import { BrowserDriver } from "./browser-instance";

export class PageInstance {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static async setupPage(browser: BrowserDriver, url: string) {
    if (!browser) {
      return;
    }
    const page: any = await browser.context.newPage();
    await page.goto(url);
    page.on("pageerror", (event: { message: any }) => {
      console.log("Error on page:", event.message);
    });

    return new this(page);
  }

  static async getAllPages(browser: BrowserDriver) {
    const pages = await browser.context.pages();
    return pages;
  }
}
