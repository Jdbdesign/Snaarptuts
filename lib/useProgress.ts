"use client";

import { useSyncExternalStore } from "react";
import { progressStore } from "./progress";

const noop = () => () => {};

/** Saved progress for every tutorial, plus `ready` (false on the server and the first hydration render, so counters can wait one frame). */
export function useProgress() {
  const store = useSyncExternalStore(progressStore.subscribe, progressStore.getSnapshot, progressStore.getServerSnapshot);
  const ready = useSyncExternalStore(noop, () => true, () => false);
  return { store, ready };
}
