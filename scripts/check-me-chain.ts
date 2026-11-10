/*
 * Starts Snaarp Me tutorial and lets autoplay run to the end (13 steps),
 * collecting every console error and verifying 0 failures.
 *   npx tsx scripts/check-me-chain.ts --from 1 --total 13 --speed 8
 */
import { chromium } from "playwright";

const arg = (n: string, d: string) => {
  const i = process.argv.indexOf(`--${n}`);
  return i >= 0 ? process.argv[i + 1] : d;
};
const PRODUCT = arg("product", "snaarp-me");
const FROM = Number(arg("from", "1"));
const TOTAL = Number(arg("total", "13"));
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
  await page.waitForSelector("[data-tl=me-stage-root]", { timeout: 30000 });
  await page.evaluate(() => localStorage.clear());

  if (FROM > 1) {
    await page.locator("ol li button").nth(FROM - 1).click();
  }

  const need = TOTAL - FROM + 1;
  let last = 0;
  const t0 = Date.now();
  console.log(`Waiting for ${need} steps to complete at ${SPEED}x speed...`);

  while (Date.now() - t0 < 180_000) {
    const n = await page.evaluate(() => {
      try {
        const store = JSON.parse(localStorage.getItem("snaarp-tutorials:progress:v3") || "{}");
        const meProgress = store["snaarp-me"] || { completed: [] };
        return {
          count: meProgress.completed.length,
          lastCompleted: meProgress.completed[meProgress.completed.length - 1] || "",
        };
      } catch {
        return { count: 0, lastCompleted: "" };
      }
    });

    if (n.count !== last) {
      last = n.count;
      console.log(`completed ${n.count}/${need} (last: ${n.lastCompleted})`);
    }
    if (n.count >= need) break;
    await page.waitForTimeout(500);
  }

  await ctx.close();
  await browser.close();

  const uniq = Array.from(new Set(errors));
  console.log("\n===== ERRORS =====");
  for (const e of uniq) console.log(" - " + e);
  console.log(`\n${uniq.length} distinct error(s); completed ${last}/${need}`);

  if (uniq.length > 0 || last < need) {
    process.exit(1);
  } else {
    console.log(`ALL ${TOTAL} STEPS PASSED PERFECTLY!`);
    process.exit(0);
  }
})();
