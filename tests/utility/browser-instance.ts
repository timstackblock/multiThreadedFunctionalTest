import { chromium, ChromiumBrowserContext } from "playwright";
import { promisify } from "util";
import { mkdtemp } from "fs";
import { join } from "path";
import { tmpdir } from "os";
const makeTmpDir = promisify(mkdtemp);

export async function setupBrowser() {
  const launchArgs: string[] = [
    `--no-sandbox`,
  ];

  const tmpDir = await makeTmpDir(join(tmpdir(), "ext-data-"));
  const context = (await chromium.launchPersistentContext(tmpDir, {
    args: launchArgs,
    headless: false,
    slowMo: 100,
  })) as ChromiumBrowserContext;
  await context.grantPermissions(["clipboard-read"]);
  return {
    context,
  };
}
type Await<T> = T extends PromiseLike<infer U> ? U : T;

export type BrowserDriver = Await<ReturnType<typeof setupBrowser>>;
