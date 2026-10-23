"use client";

import { DocEditor } from "@/components/docs/DocEditor";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { HomeScreen } from "./step1/HomeScreen";
import { DOCUMENT } from "./step2-data";

/*
 * Snaarp Doc, step 2: the Step 1 Documents home, then a full-screen swap to the editor
 * (loading state first, then the empty document). Scene variable `stage`: home | loading | editor.
 */

export function Step2Blank({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const stage = useTimelineVar<string>(tl, "stage", "home");
  const fade = useTimelineVar(tl, "fade", false);
  const narrow = useNarrow();
  const inEditor = stage !== "home";

  return (
    // The first data-scroller in the scene is where the timeline looks up targets, so it sits on the root: both layers are inside it.
    <div data-scroller className="relative h-full w-full bg-white">
      <div className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <DocsLayout active="documents">
          <HomeScreen narrow={narrow} />
        </DocsLayout>
      </div>
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-300 motion-reduce:transition-none ${inEditor ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <DocEditor title={DOCUMENT.title} loading={stage === "loading"} />
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
