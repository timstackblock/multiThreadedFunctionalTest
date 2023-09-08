import { BrowserDriver, setupBrowser } from "../utility/browser-instance";
import { PageInstance } from "../utility/page-instance";
import {getSecondDifference, wait} from "../utility/utils";
import { HiroPageInstance } from "../utility/hiro-page-instance";
import { platform_users } from "../mocks";
const moment = require("moment");

jest.setTimeout(120000);
const url = "https://platform.hiro.so/";

describe("Multithreaded Functional Test:", () => {
  const BEFORE_EACH_TIMEOUT = 60_000;
  const userCount = platform_users.length;

  let browser: BrowserDriver[] = [];
  let hiroPage: HiroPageInstance[] = [];

  beforeAll(async () => {
    console.log(`LOADING the browser instance for ${userCount} users`);
    const allBrowserPromises = platform_users.map(async (user, index) => {
      return new Promise(async (resolve) => {
        // First initialize a chromium browser where we can load our pages
        browser[index] = await setupBrowser();
        // Added some random wait time to make sure the browser is loaded fully
        await wait(2000);
        hiroPage[index] = await HiroPageInstance.setupPage(browser[index], url);
        resolve(null);
      });
    });
    await Promise.all(allBrowserPromises);
    console.log(`COMPLETED loading the browser instance for ${userCount} users`)

  }, BEFORE_EACH_TIMEOUT);


  describe(`Test case for ${url}`, () => {

    // keep windows open
    // const completedBrowsers: number[] = [];
    // afterEach(async () => {
    //   try {
    //     const allPromises = completedBrowsers.map(async (val) => {
    //       await browser[val].context.close();
    //       completedBrowsers.splice(completedBrowsers.indexOf(val), 1);
    //     });
    //     await Promise.all(allPromises);
    //   } catch (error) {}
    // });

    platform_users.map(async (user, index) => {

      it(`Test for ${user.email}`, async () => {
        let date = {
          now: moment(new Date())
        };
        console.log(`Signing in the user ${user.email}`);
        // sign in the user
        await hiroPage[index].signIn(user);
        console.log(`Completed signing in the user ${user.email} in ${getSecondDifference(date)}`);
        // click on skip if this is a first time login/new user
        await hiroPage[index].processSkip();
        getSecondDifference(date);
        // Create Project for this user
        await hiroPage[index].createProject();
        console.log(`Project created for user ${user.email} in ${getSecondDifference(date)}`);
        // Create Project for this user
        await hiroPage[index].openEditor();
        // A random wait time to make sure that everything is stable at this point
        await wait(1000);
        let allPages: any = await PageInstance.getAllPages(browser[index]);
        let editorPage: HiroPageInstance = new HiroPageInstance(allPages[allPages.length - 1]);
        await editorPage.confirmEditor();
        console.log(`Editor loaded for user ${user.email} in ${getSecondDifference(date)}`);
        // completedBrowsers.push(index);
      });

    });
  });
});

