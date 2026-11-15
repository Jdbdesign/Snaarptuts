/*
 * Starts Snaarp Projects tutorial at --from and lets autoplay run to the end (9 steps),
 * collecting every console error and verifying 0 failures.
 *   npx tsx scripts/check-projects-chain.ts --from 1 --total 9 --speed 8
 */
import { chromium } from "playwright";

const arg = (n: string, d: string) => {
  const i = process.argv.indexOf(`--${n}`);
  return i >= 0 ? process.argv[i + 1] : d;
};
const PRODUCT = arg("product", "projects");
const FROM = Number(arg("from", "1"));
const TOTAL = Number(arg("total", "9"));
const SPEED = Number(arg("speed", "8"));

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(`window.__name = (f) => f; window.__snaarpSpeed = ${SPEED};`);
  const errors: string[] = [];

  page.on("pageerror", (e) => {
    console.error(`PAGEERROR: ${e}`);
    errors.push(`pageerror: ${String(e).slice(0, 240)}`);
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
  await page.waitForSelector("[data-tl=projects-stage-root]", { timeout: 30000 });
  await page.evaluate(() => localStorage.clear());

  if (FROM > 1) {
    await page.locator("ol li button").nth(FROM - 1).click();
  }

  const need = TOTAL - FROM + 1;
  let last = 0;
  const t0 = Date.now();
  console.log(`Waiting for ${need} steps to complete at ${SPEED}x speed...`);

  while (Date.now() - t0 < 120_000) {
    const n = await page.evaluate(() => {
      try {
        const store = JSON.parse(localStorage.getItem("snaarp-tutorials:progress:v3") || "{}");
        const projectsProgress = store["projects"] || { completed: [] };
        return {
          count: projectsProgress.completed.length,
          last: projectsProgress.lastCompletedStepId,
        };
      } catch {
        return { count: 0, last: null };
      }
    });

    if (n.count !== last) {
      last = n.count;
      console.log(`  completed ${n.count}/${TOTAL} steps (last: ${n.last})`);
    }

    // Check completion card
    const cardVisible = await page
      .locator("text=Tour complete")
      .first()
      .isVisible()
      .catch(() => false);
    if (n.count >= need || cardVisible) {
      console.log(`\nAll ${need} steps ran! Completion card visible: ${cardVisible}`);
      break;
    }
    await page.waitForTimeout(500);
  }

  await page.screenshot({ path: "projects-chain-result.png" });
  await browser.close();

  if (errors.length) {
    console.error(`\nFAILED with ${errors.length} errors:`);
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  } else {
    console.log(`\nPASSED with 0 errors!`);
    process.exit(0);
  }
})();
