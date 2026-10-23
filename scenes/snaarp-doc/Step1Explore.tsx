"use client";

import { DocsLayout } from "@/components/docs/DocsLayout";
import type { DocsNavId } from "@/components/docs/docs-data";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { GalleryScreen } from "./step1/GalleryScreen";
import { HomeScreen } from "./step1/HomeScreen";
import { TrashScreen } from "./step1/TrashScreen";

/* Snaarp Doc, step 1: Documents home (a), Template gallery (b), Trash (c), all inside one DocsLayout. */

const ACTIVE: Record<string, DocsNavId | null> = { a: "documents", b: null, c: "trash" };

export function Step1Explore({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const screen = useTimelineVar<string>(tl, "screen", "a");
  const swap = useTimelineVar(tl, "swap", false);
  const fade = useTimelineVar(tl, "fade", false);
  const narrow = useNarrow();

  return (
    <div className="relative h-full w-full bg-white">
      <div className={`h-full w-full transition-opacity duration-700 motion-reduce:transition-none ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <DocsLayout active={ACTIVE[screen]}>
          <div className="relative h-full">
            {screen === "a" && <HomeScreen narrow={narrow} />}
            {screen === "b" && <GalleryScreen narrow={narrow} />}
            {screen === "c" && <TrashScreen />}
            <div
              className={`pointer-events-none absolute inset-0 z-10 bg-white transition-opacity duration-150 motion-reduce:transition-none ${swap ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </DocsLayout>
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
