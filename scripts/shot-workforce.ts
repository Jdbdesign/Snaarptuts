import { chromium } from "playwright";

const [stepIndexStr, vpStr, outPath] = process.argv.slice(2);
const stepIndex = Number(stepIndexStr || 1);
const vp = vpStr || "1440x900";
const [w, h] = vp.split("x").map(Number);
const out = outPath || `ref/workforce/step${stepIndex}-${vp}.png`;

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await context.newPage();

  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  await page.goto("http://localhost:3000/tutorials/workforce", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // If selecting a specific step
  if (stepIndex > 1) {
    if (w < 900) {
      const expandBtn = page.getByRole("button", { name: "Expand step list" });
      if (await expandBtn.isVisible()) await expandBtn.click();
    }
    const stepBtn = page.locator("ol li button").nth(stepIndex - 1);
    if (await stepBtn.isVisible()) {
      await stepBtn.click();
      await page.waitForTimeout(1000);
    }
  }

  // Wait a couple of seconds into the step execution
  await page.waitForTimeout(2000);
  await page.screenshot({ path: out });

  console.log(JSON.stringify({ stepIndex, vp, out, errors }));
  await browser.close();
})();
