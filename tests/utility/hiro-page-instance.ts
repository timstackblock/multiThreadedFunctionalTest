import { Page } from "playwright-core";
import { BrowserDriver } from "./browser-instance";
import {
  anchorSelector, buttonTextSelector, classSelector,
  idSelector,
  testIdSelector,
  textSelector, wait,
} from "./utils";
import { HiroSelectors } from "../selectors/hiro.selectors";

const selectors = {
  $signInBtn: testIdSelector(HiroSelectors.SignInBtn),
  $username: idSelector(HiroSelectors.Username),
  $password: idSelector(HiroSelectors.Password),
  $continue: textSelector(HiroSelectors.Continue),
  $nextStep: idSelector(HiroSelectors.NextStep),
  $skipBtn: anchorSelector(HiroSelectors.SkipBtn),
  $createProjectBtn: buttonTextSelector(HiroSelectors.CreateProjectBtn),
  $projectTemplate: testIdSelector(HiroSelectors.ProjectTemplate),
  $openEditorBtn: textSelector(HiroSelectors.OpenEditorBtn),
  $editor: classSelector(HiroSelectors.Editor),
};
export class HiroPageInstance {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static async setupPage(browser: BrowserDriver, url: string) {
    const page: any = await browser.context.newPage();
    await page.goto(url);
    page.on("pageerror", (event: { message: any }) => {
      console.log("Error in wallet:", event.message);
    });

    return new this(page);
  }

  async signIn(user: User) {
    await this.page.waitForSelector(selectors.$signInBtn);
    await this.page.click(selectors.$signInBtn);
    await this.page.waitForSelector(selectors.$username);
    await this.page.waitForSelector(selectors.$password);
    await this.page.fill(selectors.$username, user.email);
    await this.page.fill(selectors.$password, user.password);
    await this.page.click(selectors.$continue);
  }

  async processSkip() {
    try {
      await this.page.waitForSelector(selectors.$skipBtn, {timeout: 10000});
      await wait(5000)
      await this.page.click(selectors.$skipBtn);
    } catch (e) {
      console.log('No skip step for this user');
    }
  }

  async createProject() {
    await this.page.waitForSelector(selectors.$createProjectBtn);
    await this.page.click(selectors.$createProjectBtn);
    await this.page.waitForSelector(selectors.$projectTemplate);
    const allTemplates = await this.page.$$(selectors.$projectTemplate);
    // create hello world project
    await allTemplates[1].click();
  }

  async openEditor() {
    await this.page.waitForSelector(selectors.$openEditorBtn, {timeout: 120000});
    (await this.page.$(selectors.$openEditorBtn))?.click();
  }

  async confirmEditor() {
    await this.page.waitForSelector(selectors.$editor);
    await this.page.isVisible(selectors.$editor);
  }
}

export interface User {
  email: string;
  password: string;
}
