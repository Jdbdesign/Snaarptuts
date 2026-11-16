import { chromium, webkit } from "playwright";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = "http://localhost:3000/tutorials/projects";
const OUT_DIR = path.join(process.cwd(), "docs", "rail-scroll-qa");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runTests() {
  console.log("Starting rail scrollbar verification...");

  // 1. Chromium with OverlayScrollbar (simulates Mac overlay scrollbars)
  console.log("\n--- Testing Chromium with --enable-features=OverlayScrollbar (Mac overlay mode) ---");
  const overlayBrowser = await chromium.launch({
    args: ["--enable-features=OverlayScrollbar"],
    ignoreDefaultArgs: ["--hide-scrollbars"],
    headless: true,
  });

  const viewports = [
    { width: 1440, height: 900, name: "1440x900" },
    { width: 1920, height: 1080, name: "1920x1080" },
    { width: 1280, height: 720, name: "1280x720" },
    { width: 390, height: 844, name: "390x844" },
  ];

  for (const vp of viewports) {
    const page = await overlayBrowser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Space");
    await page.waitForTimeout(600);

    if (vp.width < 900) {
      await page.screenshot({ path: path.join(OUT_DIR, `chromium-overlay-${vp.name}-collapsed.png`) });
      console.log(`Saved screenshot: chromium-overlay-${vp.name}-collapsed.png`);
      await page.close();
      continue;
    }

    // Capture steps list scrollbar without hovering
    await page.screenshot({ path: path.join(OUT_DIR, `chromium-overlay-${vp.name}-steps.png`) });
    console.log(`Saved screenshot: chromium-overlay-${vp.name}-steps.png`);

    // Check steps list geometry
    const stepsCheck = await page.evaluate(() => {
      const el = document.querySelector("ol.rail-scroll") as HTMLElement;
      if (!el) return { found: false };
      return {
        found: true,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        hasHorizontalOverflow: el.scrollWidth > el.clientWidth,
      };
    });
    console.log(`Steps list (${vp.name}):`, stepsCheck);

    // Open product dropdown
    const productBtn = await page.waitForSelector('button[aria-haspopup="listbox"]');
    await productBtn.click();
    await page.waitForTimeout(300);

    // Move mouse completely away to (0, 0) so nothing in dropdown is hovered
    await page.mouse.move(0, 0);
    await page.waitForTimeout(200);

    // Capture dropdown with scrollbar visible WITHOUT hovering
    await page.screenshot({ path: path.join(OUT_DIR, `chromium-overlay-${vp.name}-dropdown.png`) });
    console.log(`Saved screenshot: chromium-overlay-${vp.name}-dropdown.png`);

    // Check dropdown list geometry and counters
    const dropdownCheck = await page.evaluate(() => {
      const el = document.querySelector("ul.rail-scroll") as HTMLElement;
      if (!el) return { found: false };
      const links = Array.from(el.querySelectorAll("a"));
      const items = links.map((a) => {
        const textSpan = a.querySelector("span:not(.text-muted)") as HTMLElement;
        const countSpan = a.querySelector("span.text-muted") as HTMLElement;
        const aRect = a.getBoundingClientRect();
        const countRect = countSpan?.getBoundingClientRect();
        return {
          title: textSpan?.textContent?.trim(),
          count: countSpan?.textContent?.trim(),
          aWidth: aRect.width,
          countRight: countRect?.right,
          aRight: aRect.right,
          distanceFromItemEdge: countRect ? aRect.right - countRect.right : null,
        };
      });
      return {
        found: true,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        hasHorizontalOverflow: el.scrollWidth > el.clientWidth,
        itemCount: items.length,
        sampleItem: items[0],
      };
    });
    console.log(`Dropdown list (${vp.name}):`, dropdownCheck);

    // Close dropdown and test Search panel
    await productBtn.click();
    await page.waitForTimeout(200);

    const searchInput = await page.waitForSelector('input[role="combobox"]');
    await searchInput.fill("s");
    await page.waitForTimeout(300);
    await page.mouse.move(0, 0);

    await page.screenshot({ path: path.join(OUT_DIR, `chromium-overlay-${vp.name}-search.png`) });
    console.log(`Saved screenshot: chromium-overlay-${vp.name}-search.png`);

    const searchCheck = await page.evaluate(() => {
      const el = document.querySelector("div.rail-scroll") as HTMLElement;
      if (!el) return { found: false };
      return {
        found: true,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        hasHorizontalOverflow: el.scrollWidth > el.clientWidth,
      };
    });
    console.log(`Search panel (${vp.name}):`, searchCheck);

    await page.close();
  }
  await overlayBrowser.close();

  // 2. WebKit (Safari engine)
  console.log("\n--- Testing WebKit (Safari engine) ---");
  const webkitBrowser = await webkit.launch({ headless: true });
  for (const vp of viewports) {
    const page = await webkitBrowser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Space");
    await page.waitForTimeout(600);

    if (vp.width < 900) {
      await page.screenshot({ path: path.join(OUT_DIR, `webkit-${vp.name}-collapsed.png`) });
      console.log(`Saved screenshot: webkit-${vp.name}-collapsed.png`);
      await page.close();
      continue;
    }

    await page.screenshot({ path: path.join(OUT_DIR, `webkit-${vp.name}-steps.png`) });
    console.log(`Saved screenshot: webkit-${vp.name}-steps.png`);

    const productBtn = await page.waitForSelector('button[aria-haspopup="listbox"]');
    await productBtn.click();
    await page.waitForTimeout(300);
    await page.mouse.move(0, 0);

    await page.screenshot({ path: path.join(OUT_DIR, `webkit-${vp.name}-dropdown.png`) });
    console.log(`Saved screenshot: webkit-${vp.name}-dropdown.png`);

    await productBtn.click();
    await page.waitForTimeout(200);

    const searchInput = await page.waitForSelector('input[role="combobox"]');
    await searchInput.fill("s");
    await page.waitForTimeout(300);
    await page.mouse.move(0, 0);

    await page.screenshot({ path: path.join(OUT_DIR, `webkit-${vp.name}-search.png`) });
    console.log(`Saved screenshot: webkit-${vp.name}-search.png`);

    await page.close();
  }
  await webkitBrowser.close();

  // 3. Standard Chromium (Windows native mode)
  console.log("\n--- Testing Standard Chromium (Windows mode) ---");
  const stdBrowser = await chromium.launch({
    ignoreDefaultArgs: ["--hide-scrollbars"],
    headless: true,
  });
  const page = await stdBrowser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.keyboard.press("Space");
  await page.waitForTimeout(600);

  await page.screenshot({ path: path.join(OUT_DIR, `chromium-standard-1440x900-steps.png`) });
  console.log("Saved screenshot: chromium-standard-1440x900-steps.png");

  const productBtn = await page.waitForSelector('button[aria-haspopup="listbox"]');
  await productBtn.click();
  await page.waitForTimeout(300);
  await page.mouse.move(0, 0);

  await page.screenshot({ path: path.join(OUT_DIR, `chromium-standard-1440x900-dropdown.png`) });
  console.log("Saved screenshot: chromium-standard-1440x900-dropdown.png");

  await stdBrowser.close();
  console.log("\nAll rail scrollbar tests completed successfully!");
}

runTests().catch((e) => {
  console.error("Test execution failed:", e);
  process.exit(1);
});
