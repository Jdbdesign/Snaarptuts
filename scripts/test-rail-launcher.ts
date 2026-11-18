import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const OUT_DIR = path.join(process.cwd(), "docs", "rail-launcher-qa");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  console.log("Launching browser for vertical icon launcher verification...");
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { width: 1920, height: 1080, name: "1920x1080" },
    { width: 1440, height: 900, name: "1440x900" },
    { width: 1280, height: 720, name: "1280x720" },
    { width: 390, height: 844, name: "390x844" },
  ];

  // 1. Check Desktop 1440x900 first in detail
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/tutorials/pdf", { waitUntil: "networkidle" });
  await page.keyboard.press("Space"); // pause
  await page.waitForTimeout(600);

  // Check all 16 product icons exist in the rail
  const icons = await page.$$eval('[data-tl="product-icon-rail"] a', (els) =>
    els.map((el) => ({
      href: el.getAttribute("href"),
      tl: el.getAttribute("data-tl"),
      ariaLabel: el.getAttribute("aria-label"),
      current: el.getAttribute("aria-current"),
      classes: el.className,
    }))
  );

  console.log(`Found ${icons.length} product icons in vertical rail.`);
  if (icons.length !== 16) {
    throw new Error(`Expected 16 icons, found ${icons.length}`);
  }

  // Active item should be PDF
  const activeIcon = icons.find((i) => i.current === "page");
  console.log("Active icon:", activeIcon);
  if (!activeIcon || !activeIcon.tl?.includes("pdf")) {
    throw new Error(`Expected active icon to be pdf, got ${JSON.stringify(activeIcon)}`);
  }

  // Test hover tooltip on several products
  const testHover = async (tlSelector: string, expectedName: string) => {
    const el = await page.waitForSelector(`[data-tl="${tlSelector}"]`);
    await el.hover();
    await page.waitForTimeout(200);

    const tooltip = await page.$eval('[role="tooltip"]', (t) => t.textContent?.trim());
    console.log(`Hover on ${tlSelector} -> tooltip "${tooltip}" (expected "${expectedName}")`);
    if (tooltip !== expectedName) {
      throw new Error(`Tooltip mismatch for ${tlSelector}: expected "${expectedName}", got "${tooltip}"`);
    }

    // Move away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);
    const tooltipAfter = await page.$('[role="tooltip"]');
    if (tooltipAfter) {
      throw new Error(`Tooltip did not disappear when moving mouse away from ${tlSelector}`);
    }
  };

  await testHover("rail-icon-pdf", "Snaarp PDF");
  await testHover("rail-icon-books", "Snaarp Books");
  await testHover("rail-icon-snaarp-mail", "Snaarp Mail");
  await testHover("rail-icon-teams", "Snaarp Teams");

  // Take screenshot at 1440x900
  await page.screenshot({ path: path.join(OUT_DIR, "desktop-1440x900-pdf.png") });
  console.log("Saved screenshot: desktop-1440x900-pdf.png");

  // Test clicking an icon: click Snaarp Books
  console.log("Clicking Books icon in vertical rail...");
  const booksBtn = await page.waitForSelector('[data-tl="rail-icon-books"]');
  await booksBtn.click();
  await page.waitForURL("**/tutorials/books", { timeout: 15000 });
  await page.waitForTimeout(600);

  // Check URL
  console.log("Current URL after click:", page.url());
  if (!page.url().includes("/tutorials/books")) {
    throw new Error(`URL did not navigate to /tutorials/books, was: ${page.url()}`);
  }

  // Check active icon is now books
  const activeIconAfter = await page.$eval('[data-tl="product-icon-rail"] [aria-current="page"]', (el) =>
    el.getAttribute("data-tl")
  );
  console.log("Active icon after click:", activeIconAfter);
  if (activeIconAfter !== "rail-icon-books") {
    throw new Error(`Active icon is not rail-icon-books, was ${activeIconAfter}`);
  }

  // Check product dropdown displays "Snaarp Books"
  const dropdownText = await page.$eval('button[aria-haspopup="listbox"] span[title]', (el) => el.textContent?.trim());
  console.log("Dropdown text after click:", dropdownText);
  if (dropdownText !== "Snaarp Books") {
    throw new Error(`Dropdown text is not "Snaarp Books", was "${dropdownText}"`);
  }

  // Test dropdown navigation back to Snaarp PDF
  console.log("Testing dropdown selection back to Snaarp PDF...");
  const dropdownBtn = await page.waitForSelector('button[aria-haspopup="listbox"]');
  await dropdownBtn.click();
  await page.waitForTimeout(300);

  // Click Snaarp PDF in dropdown
  const pdfDropdownLink = await page.waitForSelector('ul[role="listbox"] a[href="/tutorials/pdf"]');
  await pdfDropdownLink.click();
  await page.waitForURL("**/tutorials/pdf", { timeout: 15000 });
  await page.waitForTimeout(600);

  console.log("Current URL after dropdown select:", page.url());
  const activeIconAfterDropdown = await page.$eval('[data-tl="product-icon-rail"] [aria-current="page"]', (el) =>
    el.getAttribute("data-tl")
  );
  console.log("Active icon after dropdown select:", activeIconAfterDropdown);
  if (activeIconAfterDropdown !== "rail-icon-pdf") {
    throw new Error(`Active icon after dropdown select is not rail-icon-pdf, was ${activeIconAfterDropdown}`);
  }

  await page.close();

  // Test all viewports
  for (const vp of viewports) {
    const p = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await p.goto("http://localhost:3000/tutorials/pdf", { waitUntil: "networkidle" });
    await p.keyboard.press("Space");
    await p.waitForTimeout(400);

    if (vp.width < 900) {
      console.log(`Mobile ${vp.name}: testing drawer...`);
      const expandBtn = await p.$('button[aria-label="Expand step list"]');
      if (expandBtn) {
        await expandBtn.click();
        await p.waitForTimeout(400);
      }
      await p.screenshot({ path: path.join(OUT_DIR, `mobile-${vp.name}-drawer-open.png`) });
      console.log(`Saved screenshot: mobile-${vp.name}-drawer-open.png`);
    } else {
      await p.screenshot({ path: path.join(OUT_DIR, `viewport-${vp.name}.png`) });
      console.log(`Saved screenshot: viewport-${vp.name}.png`);
    }

    await p.close();
  }

  await browser.close();
  console.log("All verifications passed successfully!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
