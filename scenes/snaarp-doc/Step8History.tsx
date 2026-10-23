"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { VersionHistoryPage } from "@/components/docs/VersionHistoryPage";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { TITLES } from "./step8-data";

/* Snaarp Doc, step 8: File > Version history. Starts with "Project Brief". Scene variable `screen`: editor | history. */

export function Step8History({ tl }: SceneProps) {
  const screen = useTimelineVar<string>(tl, "screen", "editor");

  return (
    <EditorStage tl={tl} startTitle={TITLES.start}>
      <div
        className={`absolute inset-0 z-50 bg-white transition-opacity duration-300 motion-reduce:transition-none ${
          screen === "history" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <VersionHistoryPage />
      </div>
    </EditorStage>
  );
}
