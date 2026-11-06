/*
 * Plays Snaarp Books steps from the rail (each one started on its own) and reports every console error,
 * [Timeline Error], [Books Safety Net] message, blank stage, or step that does not finish.
 *   npx tsx scripts/check-books-steps.ts --from 33 --to 77 --speed 4 --workers 4
 * Needs the app running on --url (default http://localhost:3000).
 */
import { chromium } from "playwright";

const arg = (n: string, d: string) => {
  const i = process.argv.indexOf(`--${n}`);
  return i >= 0 ? process.argv[i + 1] : d;
};
const URL_BASE = arg("url", "http://localhost:3000");
const FROM = Number(arg("from", "1"));
const TO = Number(arg("to", "77"));
const SPEED = Number(arg("speed", "4"));
const WORKERS = Number(arg("workers", "4"));

type Result = { step: number; title: string; problems: string[] };

async function main() {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
  const steps: number[] = [];
  for (let i = FROM; i <= TO; i++) steps.push(i);
  const results: Result[] = [];
  let next = 0;
  async function worker() {
    while (next < steps.length) {
      const n = steps[next++];
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript(`window.__name = (f) => f; window.__snaarpSpeed = ${SPEED};`);
      const problems: string[] = [];
      page.on("pageerror", (e) => problems.push(`pageerror: ${String(e).slice(0, 200)}`));
      page.on("console", (m) => {
        if (m.type() === "error") problems.push(`console: ${m.text().slice(0, 220)}`);
      });
      await page.goto(`${URL_BASE}/tutorials/books`, { waitUntil: "networkidle" });
      const button = page.locator("ol li button").nth(n - 1);
      const title = (await button.getAttribute("title")) ?? `step ${n}`;
      await button.click();
      try {
        // blank-stage check shortly after start
        await page.waitForTimeout(2500);
        const blank = await page.evaluate(() => {
          const s = document.querySelector("[data-scene]") as HTMLElement | null;
          if (!s) return "no scene element";
          const r = s.getBoundingClientRect();
          return r.width < 50 || s.innerText.trim().length < 20 ? "stage looks blank" : "";
        });
        if (blank) problems.push(blank);
        await page.waitForFunction(
          (slug) => {
            try {
              const raw = localStorage.getItem("snaarp-tutorials:progress:v3");
              return !!raw && Object.values(JSON.parse(raw) as Record<string, { completed: string[] }>).some((p) => p.completed.length > 0) && slug.length > 0;
            } catch {
              return false;
            }
          },
          "books",
          { timeout: 3 * 60_000, polling: 100 },
        );
      } catch (e) {
        problems.push(`did not finish: ${String(e).slice(0, 120)}`);
      }
      await page.screenshot({ path: `/tmp/books-check-${n}.png` }).catch(() => {});
      page.removeAllListeners("console");
      await ctx.close();
      results.push({ step: n, title, problems: Array.from(new Set(problems)) });
      console.log(`${n} ${title}: ${problems.length ? "FAIL " + problems.length : "OK"}`);
      for (const p of Array.from(new Set(problems)).slice(0, 6)) console.log("     - " + p.slice(0, 200));
    }
  }
  await Promise.all(Array.from({ length: WORKERS }, worker));
  await browser.close();
  results.sort((a, b) => a.step - b.step);
  console.log("\n===== FAILURES =====");
  for (const r of results.filter((r) => r.problems.length)) {
    console.log(`\nStep ${r.step} (${r.title})`);
    for (const p of r.problems) console.log("  - " + p);
  }
  console.log(`\n${results.filter((r) => !r.problems.length).length}/${results.length} steps clean`);
  process.exit(results.some((r) => r.problems.length) ? 1 : 0);
}
main();
