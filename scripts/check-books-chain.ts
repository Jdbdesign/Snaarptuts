/*
 * Starts Books at --from and lets autoplay run to the end of the tutorial, collecting every console error
 * ([Timeline Error] / [Books Safety Net] name the step). Prints the steps that failed.
 *   CHROME_PATH=... npx tsx scripts/check-books-chain.ts --from 78 --speed 8
 */
import { chromium } from "playwright";

const arg = (n: string, d: string) => {
  const i = process.argv.indexOf(`--${n}`);
  return i >= 0 ? process.argv[i + 1] : d;
};
const FROM = Number(arg("from", "78"));
const SPEED = Number(arg("speed", "8"));
const TOTAL = Number(arg("total", "110"));

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(`window.__name = (f) => f; window.__snaarpSpeed = ${SPEED};`);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${String(e).slice(0, 240)}`));
  page.on("console", (m) => (m.type() === "error" || m.text().includes("Safety Net")) && errors.push(m.text().slice(0, 300)));
  await page.goto("http://localhost:3000/tutorials/books", { waitUntil: "networkidle" });
  await page.locator("ol li button").nth(FROM - 1).click();
  const need = TOTAL - FROM + 1;
  let last = 0;
  const t0 = Date.now();
  while (Date.now() - t0 < 25 * 60_000) {
    const n = await page.evaluate(() => {
      try {
        return Object.values(
          JSON.parse(localStorage.getItem("snaarp-tutorials:progress:v3") || "{}") as Record<string, { completed: string[] }>
        ).reduce((a, p) => a + p.completed.length, 0);
      } catch {
        return 0;
      }
    });
    if (n !== last) {
      last = n;
      console.log(`completed ${n}/${need}`);
    }
    if (n >= need) break;
    await page.waitForTimeout(1000);
  }
  await ctx.close();
  await browser.close();
  const uniq = Array.from(new Set(errors));
  console.log("\n===== ERRORS =====");
  for (const e of uniq) console.log(" - " + e);
  console.log(`\n${uniq.length} distinct error(s); completed ${last}/${need}`);
  process.exit(uniq.length || last < need ? 1 : 0);
})();
