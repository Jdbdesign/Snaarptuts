import type { Tutorial } from "@/tutorials/types";

/**
 * Rail search: a flat index of every product and every built step ("module"), built from the tutorial
 * configs in tutorials/*.ts, so a new product or step is searchable without touching this file.
 */

/** [start, end) positions in the original (display) string. */
export type Range = [number, number];

type Folded = {
  /** Lower-case, accent-free, single-spaced. */
  text: string;
  /** map[i] = index in the original string of folded character i. */
  map: number[];
};

type Field = { folded: Folded; rank: number };

type ProductEntry = {
  kind: "product";
  key: string;
  productId: string;
  name: string;
  fields: Field[];
  nameFolded: Folded;
  order: number;
};

type ModuleEntry = {
  kind: "module";
  key: string;
  productId: string;
  productName: string;
  stepIndex: number;
  stepNumber: number;
  title: string;
  group?: string;
  fields: Field[];
  titleFolded: Folded;
  groupFolded?: Folded;
  productFolded: Folded;
  order: number;
};

export type SearchIndex = { products: ProductEntry[]; modules: ModuleEntry[] };

export type ProductHit = {
  kind: "product";
  key: string;
  productId: string;
  name: string;
  nameRanges: Range[];
};

export type ModuleHit = {
  kind: "module";
  key: string;
  productId: string;
  productName: string;
  stepIndex: number;
  stepNumber: number;
  title: string;
  titleRanges: Range[];
  group?: string;
  groupRanges: Range[];
  productRanges: Range[];
};

export type SearchResults = { products: ProductHit[]; modules: ModuleHit[] };

/** Lower-cases, drops accents, turns curly apostrophes straight and squeezes spaces, remembering where each character came from. */
export function fold(input: string): Folded {
  let text = "";
  const map: number[] = [];
  let prevSpace = true; // also trims leading spaces
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (/\s/.test(ch)) {
      if (!prevSpace) {
        text += " ";
        map.push(i);
        prevSpace = true;
      }
      continue;
    }
    prevSpace = false;
    const base = ch.replace(/[‘’]/g, "'").normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
    for (const c of base) {
      text += c;
      map.push(i);
    }
  }
  return { text: text.trimEnd(), map };
}

const isWordChar = (c: string | undefined) => !!c && /[\p{L}\p{N}]/u.test(c);
const atWordStart = (text: string, i: number) => i === 0 || !isWordChar(text[i - 1]);

/** Where `token` first appears in `text`, preferring the start of a word. -1 when absent. */
function find(text: string, token: string): number {
  let first = -1;
  for (let i = text.indexOf(token); i >= 0; i = text.indexOf(token, i + 1)) {
    if (atWordStart(text, i)) return i;
    if (first < 0) first = i;
  }
  return first;
}

const WORD_START_PENALTY = 100; // a match in the middle of a word always ranks below a word-start match

// Lower is better. Word-start beats everything, then the field decides: title, group, product name. Aliases only find products.
const RANK = {
  productName: 0,
  productAlias: 15,
  title: 0,
  group: 20,
  moduleProduct: 40,
};

export function buildSearchIndex(tutorials: Tutorial[]): SearchIndex {
  const products: ProductEntry[] = [];
  const modules: ModuleEntry[] = [];
  let order = 0;

  for (const t of tutorials) {
    const { id, name, aliases = [], railLabel } = t.product;
    const nameFolded = fold(name);
    // The label shown in the rail also finds the product, next to its real name and aliases.
    const aliasFolded = [...aliases, ...(railLabel ? [railLabel] : [])].map(fold);

    products.push({
      kind: "product",
      key: `p:${id}`,
      productId: id,
      name,
      nameFolded,
      fields: [
        { folded: nameFolded, rank: RANK.productName },
        ...aliasFolded.map((folded) => ({ folded, rank: RANK.productAlias })),
      ],
      order: order++,
    });

    // Which group each step belongs to: the last group that starts at or before it.
    const groupOf: (string | undefined)[] = [];
    let current: string | undefined;
    t.steps.forEach((s, i) => {
      current = t.groups?.find((g) => g.from === s.id)?.title ?? current;
      groupOf[i] = current;
    });

    t.steps.forEach((s, i) => {
      if (!s.scene) return; // unbuilt steps cannot be opened
      const group = groupOf[i];
      const titleFolded = fold(s.title);
      const groupFolded = group ? fold(group) : undefined;
      modules.push({
        kind: "module",
        key: `m:${id}:${s.id}`,
        productId: id,
        productName: name,
        stepIndex: i,
        stepNumber: i + 1,
        title: s.title,
        group,
        titleFolded,
        groupFolded,
        productFolded: nameFolded,
        fields: [
          { folded: titleFolded, rank: RANK.title },
          ...(groupFolded ? [{ folded: groupFolded, rank: RANK.group }] : []),
          { folded: nameFolded, rank: RANK.moduleProduct },
        ],
        order: order++,
      });
    });
  }
  return { products, modules };
}

/** Lower is better; null when some word of the query matches nowhere. */
function score(tokens: string[], whole: string, fields: Field[]): number | null {
  let total = 0;
  for (const token of tokens) {
    let best: number | null = null;
    for (const { folded, rank } of fields) {
      const at = find(folded.text, token);
      if (at < 0) continue;
      const s = rank + (atWordStart(folded.text, at) ? 0 : WORD_START_PENALTY) + Math.min(at, 50) / 100;
      if (best === null || s < best) best = s;
    }
    if (best === null) return null;
    total += best;
  }
  // A field that begins with the whole query is the best possible hit.
  if (tokens.length > 1 && fields.some((f) => f.folded.text.startsWith(whole))) total -= 5;
  return total;
}

function rangesFor(tokens: string[], folded: Folded | undefined): Range[] {
  if (!folded) return [];
  const raw: Range[] = [];
  for (const token of tokens) {
    const at = find(folded.text, token);
    if (at < 0) continue;
    raw.push([folded.map[at], folded.map[at + token.length - 1] + 1]);
  }
  raw.sort((a, b) => a[0] - b[0]);
  const merged: Range[] = [];
  for (const r of raw) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([r[0], r[1]]);
  }
  return merged;
}

export function search(index: SearchIndex, query: string): SearchResults {
  const q = fold(query);
  if (!q.text) return { products: [], modules: [] };
  const tokens = q.text.split(" ");

  const rank = <T extends { order: number }>(entries: T[], fieldsOf: (e: T) => Field[]) =>
    entries
      .map((e) => ({ e, s: score(tokens, q.text, fieldsOf(e)) }))
      .filter((x): x is { e: T; s: number } => x.s !== null)
      .sort((a, b) => a.s - b.s || a.e.order - b.e.order)
      .map((x) => x.e);

  const products = rank(index.products, (e) => e.fields).map<ProductHit>((e) => ({
    kind: "product",
    key: e.key,
    productId: e.productId,
    name: e.name,
    nameRanges: rangesFor(tokens, e.nameFolded),
  }));

  const modules = rank(index.modules, (e) => e.fields).map<ModuleHit>((e) => ({
    kind: "module",
    key: e.key,
    productId: e.productId,
    productName: e.productName,
    stepIndex: e.stepIndex,
    stepNumber: e.stepNumber,
    title: e.title,
    titleRanges: rangesFor(tokens, e.titleFolded),
    group: e.group,
    groupRanges: rangesFor(tokens, e.groupFolded),
    productRanges: rangesFor(tokens, e.productFolded),
  }));

  return { products, modules };
}
