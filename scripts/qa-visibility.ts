/*
 * QA: plays every step of every tutorial and checks that whatever the timeline points at (cursor move, click,
 * highlight, hover, caption target) is fully visible: inside the canvas, inside every scroll container it lives in,
 * and not covered by anything else. Also checks that every open dialog fits inside the frame.
 *
 *   npm run qa:visibility                              everything, 4 viewports (long)
 *   npm run qa:visibility -- --tutorial snaarp-admin   one tutorial
 *   npm run qa:visibility -- --viewport 1280x720 --step 3 --tutorial snaarp-admin
 *   npm run qa:visibility -- --speed 4 --workers 6     faster playback / more pages at once
 *   npm run qa:visibility -- --tutorial snaarp-sheets --from 56   only the steps from 56 on
 *
 * Needs the app running (npm run dev, or npm run build && npm start) on --url (default http://localhost:3000).
 * Writes docs/QA-VISIBILITY.md (or --out). The timeline's QA hooks (window.__snaarpProbe, __snaarpSpeed) do the work.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { chromium, type Browser } from "playwright";

const arg = (name: string, fallback?: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
};

const URL_BASE = arg("url", "http://localhost:3000")!;
const SPEED = Number(arg("speed", "3"));
const WORKERS = Number(arg("workers", "5"));
const ONLY_TUTORIAL = arg("tutorial");
const ONLY_STEP = arg("step") ? Number(arg("step")) : null;
// --from <n>: only steps n and later (a new round of steps)
const FROM = arg("from") ? Number(arg("from")) : 1;
const OUT = arg("out", "docs/QA-VISIBILITY.md")!;
// --retry <report.md>: replay only the steps (and viewports) that a previous report listed, e.g. at --speed 1 to rule out playback-speed artefacts
const RETRY = arg("retry");
const TUTORIALS = ["snaarp-360", "snaarp-mail", "snaarp-doc", "snaarp-admin", "snaarp-slides", "snaarp-sheets", "workforce"];
const VIEWPORTS = (arg("viewport") ? [arg("viewport")!] : ["1920x1080", "1440x900", "1280x720", "390x844"]).map((v) => {
  const [w, h] = v.split("x").map(Number);
  return { w, h, name: v };
});

/**
 * Findings that are the point of the scene, not mistakes. They are listed in the report under "Accepted" and do not
 * fail the run. Match on a part of the step title and of the target; `viewport` narrows it to one screen size.
 */
const SHEETS_PHONE: { step: string; target: string }[] = [
  { step: "Record a macro", target: "sheet-notice" },
  { step: "Turn Autocomplete on and off", target: "sheet-notice" },
  { step: "Set your notifications", target: "sheet-notice" },
];

const SHEETS_SUBMENU: { step: string; target: string }[] = [
  { step: "Meet the Format menu", target: "menu-" },
  { step: "Meet the Data menu", target: "menu-" },
];
const ACCEPTED: { step: string; target: string; viewport?: string; why: string }[] = [
  { step: "Meet the toolbar", target: "tool-group-", why: "the ring is drawn around a group of tools, so the tools themselves sit on top of it" },
  { step: "Share and profile", target: "hdr-avatar", why: "the round avatar: its square corner points fall outside the circle" },
  { step: "Holidays", target: "holiday-today-circle", why: "the round today date circle: its square corner points fall outside the circle" },
  { step: "Comments icon", target: "cell-d3", viewport: "390x844", why: "on a phone the Comments panel opens over the sheet; the cell is shown just before it opens" },
  { step: "Video call", target: "join-back", why: "the back arrow of the join box touches the box edge by one pixel at 1920x1080" },
  ...SHEETS_SUBMENU.map((a) => ({ ...a, viewport: "390x844", why: "on a phone a submenu opens over its own menu, so it covers the rows the overview hovers next" })),
  ...SHEETS_PHONE.map((a) => ({ ...a, viewport: "390x844", why: "the green header pill is wider than a phone header; its text is repeated in the caption" })),
  { step: "Insert a link", target: "field-link-search", why: "the Apply label sits inside the search box on purpose; the cursor clicks the box's left part" },
  { step: "Chart: choose a type", target: "chart-obj", viewport: "390x844", why: "on a phone the Chart editor overlays the right half of the page (a documented phone layout choice)" },
  { step: "Chart: style and titles", target: "chart-obj", viewport: "390x844", why: "on a phone the Chart editor overlays the right half of the page (a documented phone layout choice)" },
  { step: "Show guides", target: "el-s2-shape", why: "the guide lines are drawn across the shape on purpose" },
  { step: "Insert a table", target: "cell-table-", why: "the table's selection handles sit on its edge cells" },
  { step: "Change the stacking order", target: "el-stack-", why: "the squares overlap each other: that is the lesson" },
  { step: "Present your slides", target: "presenter-next", why: "rounded button corners at the edge of the presenter window" },
  { step: "Use the Document outline", target: "outline-button", why: "rounded button corner; nothing is hidden" },
  { step: "Open a presentation", target: "canvas-slide", why: "the dialog is still fading out (0.3 s) when the slide is ringed" },
  { step: "Add many users with Bulk user", target: "bulk-row-r3", why: "the row is wider than the dialog; the table scrolls sideways, so only its start shows" },
  { step: "Manage comments", target: "selection-comment", viewport: "390x844", why: "on a phone the comments panel overlays the page (a documented phone layout choice)" },
  { step: "Manage comments", target: "doc-comment-t2", viewport: "390x844", why: "on a phone the comments panel overlays the page (a documented phone layout choice)" },
];

type Finding = { tutorial: string; step: string; viewport: string; kind: string; target: string; problem: string };

/** Runs inside the page before any script: installs the probe the timeline calls when an action reaches its target. */
function installProbe(speed: number) {
  const w = window as unknown as Record<string, unknown>;
  w.__snaarpSpeed = speed;
  const found: { kind: string; target: string; problem: string }[] = [];
  const seen = new Set<string>();
  w.__qaFound = found;

  const describe = (n: Element | null) =>
    !n ? "none" : `<${n.tagName.toLowerCase()}${n.getAttribute("data-tl") ? ` data-tl=${n.getAttribute("data-tl")}` : ""} class="${String(n.getAttribute("class") ?? "").slice(0, 70)}">`;
  const add = (kind: string, target: string, problem: string) => {
    const key = `${kind}|${target}|${problem.split(" (")[0]}`;
    if (seen.has(key)) return;
    seen.add(key);
    found.push({ kind, target, problem });
  };

  // Does this element draw anything of its own at the point? Empty wrapper boxes (a full-size div that only holds dialogs) do not hide anything.
  const paints = (n: Element, x: number, y: number) => {
    if ((n.getAttribute("data-tl") ?? "").includes("tip")) return false; // hover tooltips are meant to sit next to their item
    if (n.closest("[aria-hidden=true]")) return false; // a dialog that is still fading out
    for (let a: Element | null = n; a; a = a.parentElement) {
      const c = getComputedStyle(a);
      if (c.visibility === "hidden" || Number(c.opacity) === 0 || c.display === "none") return false; // invisible, or inside an invisible (closed) box
    }
    const cs = getComputedStyle(n);
    if (["IMG", "SVG", "CANVAS", "INPUT", "TEXTAREA", "VIDEO", "PATH"].includes(n.tagName.toUpperCase())) return true;
    const bg = cs.backgroundColor;
    const clear = bg === "rgba(0, 0, 0, 0)" || bg === "transparent" || /,\s*0\)$/.test(bg);
    if (!clear || cs.backgroundImage !== "none") return true;
    // a border (a selection frame) only covers the strip along its edge, not its inside
    const b = n.getBoundingClientRect();
    const bw = Math.max(parseFloat(cs.borderTopWidth), parseFloat(cs.borderBottomWidth), parseFloat(cs.borderLeftWidth), parseFloat(cs.borderRightWidth)) + 1;
    if (bw > 1 && (x - b.left < bw || b.right - x < bw || y - b.top < bw || b.bottom - y < bw)) return true;
    return Array.from(n.childNodes).some((c) => c.nodeType === 3 && (c.textContent ?? "").trim() !== "");
  };

  // Text positions inside a paragraph (doc-at-*, doc-start-*, doc-end-*) are invisible markers beside the words, not things to see.
  const MARKER = /^\[data-tl=doc-(at|start|end)-/;

  w.__snaarpProbe = (kind: string, selector: string, el: HTMLElement) => {
    const frame = document.querySelector<HTMLElement>("[data-scene]");
    const scene = frame?.querySelector<HTMLElement>(":scope > div[inert]");
    if (!frame || !scene) return;
    const fr = frame.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const target = selector;
    const px = (n: number) => Math.round(n);
    const TOL = 1.5;

    if (r.width === 0 && r.height === 0) {
      if (MARKER.test(selector)) return;
      add(kind, target, "not displayed (zero size)");
      return;
    }
    // The part of the target that its scroll containers and clipping boxes actually show. A target that is bigger than
    // the box clipping it (a table row wider than its dialog) can only show its start, which is what the engine aims for.
    const v = { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
    let cutBy: Element | null = null;
    let skip = ["absolute", "fixed"].includes(getComputedStyle(el).position);
    for (let a = el.parentElement; a && a !== scene; a = a.parentElement) {
      const cs = getComputedStyle(a);
      const positioned = cs.position !== "static" || cs.transform !== "none";
      if (skip) {
        if (!positioned) continue;
        skip = false;
      }
      const ar = a.getBoundingClientRect();
      if (cs.overflowX !== "visible" && r.width <= ar.width + 1) {
        if (ar.left > v.left + TOL || ar.right < v.right - TOL) cutBy = cutBy ?? a;
        v.left = Math.max(v.left, ar.left);
        v.right = Math.min(v.right, ar.right);
      }
      if (cs.overflowY !== "visible" && r.height <= ar.height + 1) {
        if (ar.top > v.top + TOL || ar.bottom < v.bottom - TOL) cutBy = cutBy ?? a;
        v.top = Math.max(v.top, ar.top);
        v.bottom = Math.min(v.bottom, ar.bottom);
      }
      if (cs.position === "absolute" || cs.position === "fixed") skip = true;
    }
    const shown = Math.max(0, v.right - v.left) * Math.max(0, v.bottom - v.top);
    const whole = Math.max(1, (r.right - r.left) * (r.bottom - r.top));
    if (cutBy && shown / whole < 0.9) add(kind, target, `cut off by ${describe(cutBy)} (${Math.round((shown / whole) * 100)}% visible)`);

    const out: string[] = [];
    if (v.top < fr.top - TOL) out.push(`${px(fr.top - v.top)}px above the canvas`);
    // an element taller (or wider) than the canvas can only show its start: that is what the engine aims for
    const tall = v.bottom - v.top > fr.height - 2 * TOL;
    const wide = v.right - v.left > fr.width - 2 * TOL;
    if (v.bottom > fr.bottom + TOL && !tall) out.push(`${px(v.bottom - fr.bottom)}px below the canvas`);
    if (v.left < fr.left - TOL) out.push(`${px(fr.left - v.left)}px left of the canvas`);
    if (v.right > fr.right + TOL && !wide) out.push(`${px(v.right - fr.right)}px right of the canvas`);
    if (out.length) add(kind, target, `off-canvas: ${out.join(", ")} (box ${px(r.width)}x${px(r.height)})`);

    // Hit-test a 3x3 grid inside the target (clamped to the canvas). The scene is inert in the player, so lift that
    // for a moment; the canvas lock overlay is not part of the scene and is ignored.
    const wasInert = scene.inert;
    scene.inert = false;
    // Menus and panels in the scenes are often pointer-events: none (they are only drawn), so make everything hit-testable.
    const style = document.createElement("style");
    style.textContent = "[data-scene] * { pointer-events: auto !important; }";
    document.head.appendChild(style);
    const hits: { x: string; y: string; by: Element | null }[] = [];
    try {
      const vx0 = Math.max(v.left, fr.left);
      const vx1 = Math.min(v.right, fr.right);
      const vy0 = Math.max(v.top, fr.top);
      const vy1 = Math.min(v.bottom, fr.bottom);
      // inset the grid so rounded corners do not count as covered
      const ix = Math.min(Math.max(4, (vx1 - vx0) * 0.12), (vx1 - vx0) / 2);
      const iy = Math.min(Math.max(4, (vy1 - vy0) * 0.12), (vy1 - vy0) / 2);
      const x0 = vx0 + ix;
      const x1 = vx1 - ix;
      const y0 = vy0 + iy;
      const y1 = vy1 - iy;
      if (x1 >= x0 && y1 >= y0 && !MARKER.test(selector)) {
        const pointerNone = false;
        // text positions inside a paragraph (doc-at-*, doc-start-*, doc-end-*) are invisible markers beside the words, not elements to see
        if (/^\[data-tl=doc-(at|start|end)-/.test(selector)) throw new Error("skip");
        for (const [fy, ly] of [[0, "top"], [0.5, "middle"], [1, "bottom"]] as const) {
          for (const [fx, lx] of [[0, "left"], [0.5, "centre"], [1, "right"]] as const) {
            const x = x0 + (x1 - x0) * fx;
            const y = y0 + (y1 - y0) * fy;
            const stack = document.elementsFromPoint(x, y).filter((n) => scene.contains(n));
            const top = stack.find((n) => el.contains(n) || paints(n, x, y)) ?? null;
            const ok = !top || el.contains(top) || (pointerNone && top.contains(el));
            if (!ok) hits.push({ x: lx, y: ly, by: top });
          }
        }
      }
    } finally {
      scene.inert = wasInert;
      style.remove();
    }
    // a big region (the canvas, a whole page) that an open dropdown overlaps is meant to be overlapped
    const big = (r.width * r.height) / (fr.width * fr.height) > 0.25;
    if (hits.length && !(big && hits.length < 5)) {
      const centre = hits.find((h) => h.x === "centre" && h.y === "middle");
      const by = hits[0].by;
      const where = hits.map((h) => `${h.y}-${h.x}`).join(" ");
      add(kind, target, `${centre ? "covered / cut off at its centre" : "partly covered / cut off"} by ${describe(by)} (${hits.length}/9 points: ${where})`);
    }

    // The caption bubble is not hit-testable (pointer-events none), so compare boxes.
    // checked a moment later: the caption may be sliding to the top because of this very target
    setTimeout(() => {
      const cap = document.querySelector<HTMLElement>("[data-visible=true][aria-live]");
      if (!cap || kind === "caption") return;
      // where the caption is heading (it slides between the bottom and the top of the frame), not where it is mid-slide
      const cr = cap.getBoundingClientRect();
      const bottom = parseFloat(cap.style.bottom || "24");
      const c = { left: cr.left, right: cr.right, top: fr.bottom - bottom - cr.height, bottom: fr.bottom - bottom };
      const cx = (Math.max(r.left, fr.left) + Math.min(r.right, fr.right)) / 2;
      const cy = (Math.max(r.top, fr.top) + Math.min(r.bottom, fr.bottom)) / 2;
      if (cx > c.left && cx < c.right && cy > c.top && cy < c.bottom) add(kind, target, "under the caption bubble");
    }, 120);

    // Every open dialog must fit inside the frame.
    for (const d of scene.querySelectorAll<HTMLElement>("[role=dialog]")) {
      const wrap = d.closest<HTMLElement>("[aria-hidden]");
      if (wrap?.getAttribute("aria-hidden") === "true") continue;
      const dr = d.getBoundingClientRect();
      if (dr.width === 0 || getComputedStyle(d).visibility === "hidden") continue;
      const over = Math.max(fr.top - dr.top, dr.bottom - fr.bottom, fr.left - dr.left, dr.right - fr.right);
      // a closing or opening dialog is scaled to 95%: allow for it
      if (over > 8) add("dialog", describe(d), `dialog ${px(over)}px outside the canvas (box ${px(dr.width)}x${px(dr.height)})`);
    }
  };
}

async function openStep(browser: Browser, tutorial: string, index: number, vp: { w: number; h: number }) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  await page.addInitScript("window.__name = (f) => f;"); // tsx adds __name() helpers inside functions it compiles
  await page.addInitScript(installProbe, SPEED);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(`${URL_BASE}/tutorials/${tutorial}`, { waitUntil: "networkidle" });
  if (vp.w < 900) await page.getByRole("button", { name: "Expand step list" }).click();
  const button = page.locator("ol li button").nth(index);
  const title = (await button.getAttribute("title")) ?? `step ${index + 1}`;
  await button.click();
  return { ctx, page, title, errors };
}

async function countSteps(browser: Browser, tutorial: string) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${URL_BASE}/tutorials/${tutorial}`, { waitUntil: "networkidle" });
  const built = await page.locator("ol li button:not([disabled])").evaluateAll((bs) =>
    bs.map((b) => ({ index: Array.from(b.closest("ol")!.querySelectorAll("button")).indexOf(b as HTMLButtonElement), title: b.getAttribute("title") ?? "" })),
  );
  await ctx.close();
  return built;
}

async function runStep(browser: Browser, tutorial: string, index: number, vp: { w: number; h: number; name: string }) {
  const { ctx, page, title, errors } = await openStep(browser, tutorial, index, vp);
  const findings: Finding[] = [];
  try {
    // the step has finished when its check is saved in local storage (the player does that when the script ends)
    await page.waitForFunction(
      () => {
        try {
          const raw = localStorage.getItem("snaarp-tutorials:progress:v1");
          return !!raw && Object.values(JSON.parse(raw) as Record<string, { completed: string[] }>).some((p) => p.completed.length > 0);
        } catch {
          return false;
        }
      },
      undefined,
      { timeout: 6 * 60_000, polling: 250 },
    );
    const found = (await page.evaluate(() => (window as unknown as { __qaFound: unknown[] }).__qaFound)) as Omit<Finding, "tutorial" | "step" | "viewport">[];
    for (const f of found) findings.push({ tutorial, step: title, viewport: vp.name, ...f });
    for (const e of errors) findings.push({ tutorial, step: title, viewport: vp.name, kind: "console", target: "", problem: e.slice(0, 160) });
  } catch (e) {
    findings.push({ tutorial, step: title, viewport: vp.name, kind: "run", target: "", problem: `did not finish: ${String(e).slice(0, 120)}` });
  } finally {
    await ctx.close();
  }
  return findings;
}

async function main() {
  const browser = await chromium.launch();
  const jobs: { tutorial: string; index: number; vp: (typeof VIEWPORTS)[number] }[] = [];
  const retry = RETRY
    ? new Set(
        readFileSync(RETRY, "utf8")
          .split("\n")
          .filter((l) => l.startsWith("| snaarp-"))
          .map((l) => l.split("|").map((c) => c.trim()))
          .map((c) => `${c[1]}|${c[2]}|${c[3]}`),
      )
    : null;
  const tutorials = ONLY_TUTORIAL ? [ONLY_TUTORIAL] : TUTORIALS;
  for (const tutorial of tutorials) {
    const indexes = await countSteps(browser, tutorial);
    for (const vp of VIEWPORTS) {
      for (const { index, title } of indexes) {
        if (ONLY_STEP !== null && index !== ONLY_STEP - 1) continue;
        if (index < FROM - 1) continue;
        if (retry && !retry.has(`${tutorial}|${title}|${vp.name}`)) continue;
        jobs.push({ tutorial, index, vp });
      }
    }
  }
  console.log(`${jobs.length} step runs, ${WORKERS} at a time, speed x${SPEED}`);

  const all: Finding[] = [];
  let next = 0;
  let done = 0;
  await Promise.all(
    Array.from({ length: WORKERS }, async () => {
      while (next < jobs.length) {
        const job = jobs[next++];
        const f = await runStep(browser, job.tutorial, job.index, job.vp);
        all.push(...f);
        done++;
        if (done % 10 === 0 || f.length) console.log(`[${done}/${jobs.length}] ${job.tutorial} step ${job.index + 1} ${job.vp.name}: ${f.length} finding(s)`);
      }
    }),
  );
  await browser.close();

  const isAccepted = (f: Finding) => ACCEPTED.some((a) => f.step.includes(a.step) && f.target.includes(a.target) && (!a.viewport || a.viewport === f.viewport));
  const accepted = all.filter(isAccepted);
  const open = all.filter((f) => !isAccepted(f));
  all.length = 0;
  all.push(...open);
  all.sort((a, b) => a.tutorial.localeCompare(b.tutorial) || a.viewport.localeCompare(b.viewport) || a.step.localeCompare(b.step));
  const lines = [
    "# QA: visibility of every scripted target",
    "",
    `Generated by \`npm run qa:visibility\` on ${new Date().toISOString().slice(0, 10)}. ${jobs.length} step runs (${tutorials.join(", ")}; ${VIEWPORTS.map((v) => v.name).join(", ")}), playback speed x${SPEED}.`,
    "",
    "Each cursor move, click, highlight, hover and caption target is checked: inside the canvas, not cut off by a scroll container or a dialog edge, not covered by another element or the caption bubble. Open dialogs must fit inside the frame.",
    "",
    all.length === 0 ? "**Clean: no open findings.**" : `**${all.length} open finding(s).**`,
    "",
  ];
  if (all.length) {
    lines.push("| Tutorial | Step | Viewport | Action | Target | Problem |", "|---|---|---|---|---|---|");
    for (const f of all) lines.push(`| ${f.tutorial} | ${f.step} | ${f.viewport} | ${f.kind} | \`${f.target}\` | ${f.problem} |`);
  }
  if (accepted.length) {
    lines.push("", "## Accepted (by design)", "", "These show up in the checks but are intended.", "", "| Step | Target | Why |", "|---|---|---|");
    for (const a of ACCEPTED) {
      if (accepted.some((f) => f.step.includes(a.step) && f.target.includes(a.target))) lines.push(`| ${a.step} | \`${a.target}\` | ${a.why} |`);
    }
  }
  writeFileSync(OUT, lines.join("\n") + "\n");
  console.log(`${all.length} finding(s) -> ${OUT}`);
  process.exitCode = all.length ? 1 : 0;
}

main();
