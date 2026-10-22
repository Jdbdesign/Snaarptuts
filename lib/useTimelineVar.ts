"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Timeline } from "./timeline";

/** Lets a scene component re-render when its script calls tl.setVar(key, ...). */
export function useTimelineVar<T>(tl: Timeline, key: string, fallback: T): T {
  const get = useCallback(() => tl.getVar<T>(key, fallback), [tl, key, fallback]);
  return useSyncExternalStore(tl.subscribe, get, () => fallback);
}
