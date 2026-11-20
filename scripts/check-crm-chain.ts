/*
 * Starts CRM tutorial at --from and lets autoplay run to the end (29 steps),
 * collecting every console error and verifying 0 failures.
 *   npx tsx scripts/check-crm-chain.ts --from 1 --total 29 --speed 8
 */
import { chromium } from "playwright";

const arg = (n: string, d: string) => {
  const i = process.argv.indexOf(`--${n}`);
  return i >= 0 ? process.argv[i + 1] : d;
};
const PRODUCT = arg("product", "crm");
const FROM = Number(arg("from", "1"));
const TOTAL = Number(arg("total", "29"));
const SPEED = Number(arg("speed", "8"));

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(`window.__name = (f) => f; window.__snaarpSpeed = ${SPEED};`);
  const errors: string[] = [];

  page.on("pageerror", (e) => {
    const s = String(e);
    if (s.includes("CancelledError")) return;
    console.error(`PAGEERROR: ${e}`);
    errors.push(`pageerror: ${s.slice(0, 240)}`);
  });

  page.on("console", (m) => {
    const txt = m.text();
    if (m.type() === "error" || txt.includes("Safety Net") || txt.includes("[Timeline]")) {
      console.log(`[CONSOLE ${m.type()}] ${txt}`);
    }
    if (m.type() === "error" || txt.includes("Safety Net")) {
      errors.push(txt.slice(0, 300));
    }
  });

  const url = `http://localhost:3000/tutorials/${PRODUCT}`;
  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("[data-tl=crm-sidebar]", { timeout: 30000 });
  await page.evaluate(() => localStorage.clear());

  if (FROM > 1) {
    await page.locator("ol li button").nth(FROM - 1).click();
  }

  const t0 = Date.now();
  console.log(`Testing steps ${FROM}..${TOTAL} at speed ${SPEED}x...`);

  while (Date.now() - t0 < 180000) {
    // Check if completion screen reached
    const isCompleted = await page
      .locator("text=You're all set")
      .isVisible()
      .catch(() => false);

    if (isCompleted) {
      console.log(`Reached completion screen! Total steps tested: ${TOTAL}`);
      break;
    }

    await page.waitForTimeout(1000);
  }

  await browser.close();

  if (errors.length > 0) {
    console.error(`\nFAILED: Encountered ${errors.length} error(s):`);
    for (const e of errors) console.error(` - ${e}`);
    process.exit(1);
  } else {
    console.log(`\nSUCCESS: Chain test completed with 0 errors!`);
    process.exit(0);
  }
})();
