import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, CF_RECORDS, URLS, record, type CfRecord } from "./cloudflare-data";

/** Snaarp Mail, step 6 - Add the records in Cloudflare. Times are active milliseconds from the start of the step. */
export const STEP6_DURATION_MS = 60600;

const NAV_DNS = "[data-tl=cf-nav-dns]";
const ADD = "[data-tl=cf-add-record]";
const TYPE = "[data-tl=cf-type]";
const SAVE = "[data-tl=cf-save]";
const PROXY = "[data-tl=cf-proxy]";
const FIELD = (id: string) => `[data-tl=field-${id}]`;
const OPTION = (type: string) => `[data-tl=cf-type-opt-${type}]`;

type Plan = {
  /** When the cursor starts towards "Add record". */
  addAt: number;
  /** When "Save" is clicked. */
  saveAt: number;
  /** Shown once the form is open. */
  caption: string;
  /** The first record also rings "Add record" and says "Click Add record". */
  first?: boolean;
  /** Quicker cursor and typing for the later records (they repeat what the viewer has already seen). */
  fast?: boolean;
};

const PLAN: Record<CfRecord["id"], Plan> = {
  mx: { addAt: 4500, saveAt: 15000, caption: CAPTIONS.mx(record("mx")), first: true },
  cname: { addAt: 17500, saveAt: 27500, caption: CAPTIONS.cname(record("cname")) },
  dkim: { addAt: 30000, saveAt: 37000, caption: CAPTIONS.dkim, fast: true },
  spf: { addAt: 39500, saveAt: 46000, caption: CAPTIONS.spf(record("spf")), fast: true },
  dmarc: { addAt: 48500, saveAt: 54000, caption: CAPTIONS.dmarc(record("dmarc")), fast: true },
};

/** One reusable "add a record" sequence, driven by the record data. */
async function addRecord(tl: Timeline, rec: CfRecord, plan: Plan) {
  const move = plan.fast ? 450 : 550;
  const perChar = plan.fast ? 40 : 50;

  // Open the form
  await tl.at(plan.addAt);
  if (plan.first) tl.showCaption(CAPTIONS.addRecord);
  await tl.moveCursorTo(ADD, { ms: move });
  if (plan.first) {
    tl.highlight(ADD);
    await tl.wait(200);
  }
  await tl.click(ADD);
  tl.clearHighlight();
  await tl.wait(100);
  tl.showCaption(plan.caption);

  // Type: open the list and pick the record type
  await tl.moveCursorTo(TYPE, { ms: move });
  await tl.click(TYPE);
  await tl.wait(plan.fast ? 120 : 150);
  await tl.moveCursorTo(OPTION(rec.type), { ms: move, dx: 24 });
  tl.hover(OPTION(rec.type));
  await tl.wait(plan.fast ? 100 : 200);
  await tl.click(OPTION(rec.type));
  tl.hover(null);
  await tl.wait(80); // the form re-draws for the chosen type

  await tl.fill(FIELD("name"), "name", rec.name, { moveMs: move, msPerChar: perChar });

  if (rec.type === "TXT") {
    // Long values are pasted, not typed
    await tl.moveCursorTo(FIELD("value"), { ms: move });
    await tl.click(FIELD("value"));
    await tl.wait(plan.fast ? 80 : 200);
    tl.paste("value", rec.value, FIELD("value"));
  } else {
    await tl.fill(FIELD("value"), "value", rec.value, { moveMs: move, msPerChar: perChar });
  }

  if (rec.priority) await tl.fill(FIELD("priority"), "priority", rec.priority, { moveMs: move, msPerChar: 100 });

  if (rec.type === "CNAME") {
    tl.showCaption(CAPTIONS.cnameProxy);
    await tl.moveCursorTo(PROXY, { ms: 700 });
    tl.highlight(PROXY);
    await tl.wait(400);
    await tl.click(PROXY); // orange Proxied -> grey DNS only
    tl.clearHighlight();
  }

  // Save
  await tl.at(plan.saveAt - move - 300);
  await tl.moveCursorTo(SAVE, { ms: move });
  await tl.wait(300);
  await tl.click(SAVE); // green toast "Record added", the row appears
}

export async function runStep6(tl: Timeline) {
  tl.placeCursor(0.55, 0.5);
  tl.setUrl(URLS.overview);
  tl.setVar("intro", 1); // the Overview page fades in
  tl.showCaption(CAPTIONS.open);

  // Overview -> DNS
  await tl.at(2000);
  await tl.moveCursorTo(NAV_DNS, { ms: 600 });
  tl.highlight(NAV_DNS);
  await tl.wait(200);
  await tl.click(NAV_DNS); // the page changes to DNS Records
  tl.clearHighlight();
  tl.setUrl(URLS.dns);

  for (const rec of CF_RECORDS) await addRecord(tl, rec, PLAN[rec.id]);

  // All five rows
  await tl.at(56500);
  tl.highlight("[data-tl=new-rows]");
  tl.showCaption(CAPTIONS.done);

  // Quick white fade-out
  await tl.at(60000);
  tl.clearHighlight();
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP6_DURATION_MS);
}
