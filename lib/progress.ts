/*
 * Saved progress: which steps of which tutorial have played to their end.
 * Stored in localStorage as { [tutorialSlug]: { completed: [stepId], updatedAt } }. Only slugs, step ids
 * and timestamps, never personal data. Every storage call is wrapped: if storage is blocked or full the
 * player keeps working with the in-memory copy for the session.
 */
import { tutorials } from "@/tutorials";

export const PROGRESS_KEY = "snaarp-tutorials:progress:v1";

export type ProgressEntry = { completed: string[]; updatedAt: string };
export type ProgressStore = Record<string, ProgressEntry>;

const EMPTY: ProgressStore = Object.freeze({}) as ProgressStore;

/** Step ids that exist today, per tutorial slug. */
export function knownStepIds(): Record<string, string[]> {
  return Object.fromEntries(tutorials.map((t) => [t.product.id, t.steps.map((s) => s.id)]));
}

/** Parse and clean saved JSON. Bad shape, bad JSON, unknown slugs and unknown step ids are dropped silently. */
export function parseProgress(raw: string | null, known: Record<string, string[]>): ProgressStore {
  if (!raw) return EMPTY;
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) return EMPTY;
    const out: ProgressStore = {};
    for (const [slug, entry] of Object.entries(data as Record<string, unknown>)) {
      const ids = known[slug];
      if (!ids || !entry || typeof entry !== "object") continue;
      const list = (entry as { completed?: unknown }).completed;
      if (!Array.isArray(list)) continue;
      const completed = ids.filter((id) => list.includes(id)); // config order, no duplicates
      if (!completed.length) continue;
      const at = (entry as { updatedAt?: unknown }).updatedAt;
      out[slug] = { completed, updatedAt: typeof at === "string" ? at : new Date(0).toISOString() };
    }
    return out;
  } catch {
    return EMPTY;
  }
}

/** A new store with one more completed step. Returns the same store if it was already completed. */
export function withCompleted(store: ProgressStore, slug: string, stepId: string, now = new Date()): ProgressStore {
  const current = store[slug]?.completed ?? [];
  if (current.includes(stepId)) return store;
  return { ...store, [slug]: { completed: [...current, stepId], updatedAt: now.toISOString() } };
}

export function completedCount(store: ProgressStore, slug: string, stepIds: string[]): number {
  const done = store[slug]?.completed;
  return done ? stepIds.filter((id) => done.includes(id)).length : 0;
}

// ---- the live store (browser) ---------------------------------------------------------------------

let current: ProgressStore = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function readStorage(): string | null {
  try {
    return window.localStorage.getItem(PROGRESS_KEY);
  } catch {
    return null;
  }
}

function writeStorage(store: ProgressStore) {
  try {
    if (Object.keys(store).length === 0) window.localStorage.removeItem(PROGRESS_KEY);
    else window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
  } catch {
    // Blocked or full: keep the in-memory progress.
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  current = parseProgress(readStorage(), knownStepIds());
  // Another tab changed the saved progress (key is null when the site data was cleared).
  window.addEventListener("storage", (e) => {
    if (e.key !== null && e.key !== PROGRESS_KEY) return;
    current = parseProgress(readStorage(), knownStepIds());
    emit();
  });
}

export const progressStore = {
  subscribe(l: () => void) {
    load();
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  getSnapshot(): ProgressStore {
    load();
    return current;
  },
  getServerSnapshot(): ProgressStore {
    return EMPTY;
  },
  /** Mark a step completed and write right away. */
  complete(slug: string, stepId: string) {
    load();
    const next = withCompleted(current, slug, stepId);
    if (next === current) return;
    current = next;
    writeStorage(current);
    emit();
  },
  reset() {
    load();
    current = EMPTY;
    writeStorage(current);
    emit();
  },
};
