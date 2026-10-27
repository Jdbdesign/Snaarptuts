import type { Timeline } from "@/lib/timeline";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { elementsOf, newId, withElements, type SlideEl } from "./slide-elements";
import { commit, getSlideIndex, getSlides, insertElement, insertImage, setSel } from "./slides-edit";
import type { SlideData } from "./slides-data";
import { EXPLORE, PREFERENCES, SPELLING } from "./slides-tools-data";

/*
 * What the Tools menu DOES in Snaarp Slides (steps 48-50): Spelling, Explore and Preferences. The recording shows the menu with Spelling and
 * Explore greyed out ("Coming soon" tooltip on Spelling) and Preferences opening nothing, so all three are built from the brief.
 * State is in scene variables: `spell` ({ el, para, start, len, open } while a misspelt word is marked), `explore` + `exploreDone` + `field:explore`,
 * `dialog` = "preferences" with `pref:spell`, `pref:ruler`, `prefTheme` and `prefMenu`.
 */

export type SpellMark = { el: string; para: number; start: number; len: number; open: boolean };

/** Find the first misspelt word on the current slide (a word in the tiny list of known mistakes). */
export function findMisspellingIn(slides: SlideData[], index: number): Omit<SpellMark, "open"> | null {
  for (const e of elementsOf(slides, index)) {
    if (e.kind !== "text") continue;
    for (let para = 0; para < e.paras.length; para++) {
      const start = e.paras[para].toLowerCase().indexOf(SPELLING.wrong);
      if (start !== -1) return { el: e.id, para, start, len: SPELLING.wrong.length };
    }
  }
  return null;
}

const findMisspelling = (tl: Timeline) => findMisspellingIn(getSlides(tl), getSlideIndex(tl));

/** Tools > Spelling: underline the misspelt word and offer the fix. */
export function startSpelling(tl: Timeline) {
  const m = findMisspelling(tl);
  if (!m) {
    showDocToast(tl, SPELLING.none, "success", 2600);
    return;
  }
  tl.setVar("spell", { ...m, open: true } satisfies SpellMark);
}

/** Click the suggestion: the word is replaced (one step in the history) and a toast says so. */
export function fixSpelling(tl: Timeline) {
  const mark = tl.getVar<SpellMark | null>("spell", null);
  if (!mark) return;
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  commit(
    tl,
    withElements(
      slides,
      idx,
      elementsOf(slides, idx).map((e) =>
        e.kind === "text" && e.id === mark.el
          ? { ...e, paras: e.paras.map((p, i) => (i === mark.para ? p.slice(0, mark.start) + SPELLING.right + p.slice(mark.start + mark.len) : p)) }
          : e,
      ),
    ),
    slides,
  );
  tl.setVar("spell", null);
  showDocToast(tl, SPELLING.toast, "success", 2800);
}

export const ignoreSpelling = (tl: Timeline) => tl.setVar("spell", null);

/* ---------------------------------------------------------------- Explore */

export function openExplore(tl: Timeline) {
  tl.setVar("field:explore", "");
  tl.setVar("exploreDone", false);
  tl.setVar("explore", true);
}

export const closeExplore = (tl: Timeline) => tl.setVar("explore", false);

const toastAdded = (tl: Timeline, what: string) => showDocToast(tl, EXPLORE.insertedToast(what), "success", 2800);

/** An image suggestion lands on the slide like Insert > Image. */
export function insertExploreImage(tl: Timeline, id: string) {
  const img = EXPLORE.images.find((i) => i.id === id);
  if (!img) return;
  insertImage(tl, img.id, img.name);
  toastAdded(tl, "Image");
}

/** A related topic becomes a text box on the slide. */
export function insertExploreTopic(tl: Timeline, id: string) {
  const topic = EXPLORE.topics.find((t) => t.id === id);
  if (!topic) return;
  const el: SlideEl = { id: newId(getSlides(tl), "text"), kind: "text", style: "box", paras: [topic.label], ...EXPLORE.topicBox };
  insertElement(tl, el);
  toastAdded(tl, "Topic");
}

/** A layout idea adds a ready-made line of big text. */
export function insertExploreLayout(tl: Timeline, id: string) {
  const idea = EXPLORE.layouts.find((l) => l.id === id);
  if (!idea) return;
  const el: SlideEl = { id: newId(getSlides(tl), "text"), kind: "text", style: "body", paras: [idea.text], fmt: idea.fmt, ...EXPLORE.layoutBox };
  insertElement(tl, el);
  setSel(tl, [el.id]);
  toastAdded(tl, idea.label);
}

/* ------------------------------------------------------------ Preferences */

export function openPreferences(tl: Timeline) {
  tl.setVar("prefMenu", false);
  tl.setVar("dialog", "preferences");
}

/** Save: close the dialog; Automatic spelling check marks the misspelt word and Show ruler turns the rulers on. */
export function savePreferences(tl: Timeline) {
  tl.setVar("dialog", "");
  tl.setVar("prefMenu", false);
  if (tl.getVar<boolean>("pref:ruler", false)) tl.setVar("rulers", true);
  showDocToast(tl, PREFERENCES.toast, "success", 2800);
}
