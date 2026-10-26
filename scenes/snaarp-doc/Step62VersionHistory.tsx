"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { VersionHistoryPage } from "@/components/docs/VersionHistoryPage";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step62-data";

/* Snaarp Doc, step 62: the Version history button in the header. Scene variable `screen`: editor | history. */

export function Step62VersionHistory({ tl }: SceneProps) {
  const screen = useTimelineVar<string>(tl, "screen", "editor");

  return (
    <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools>
      <div
        className={`absolute inset-0 z-50 bg-white transition-opacity duration-300 motion-reduce:transition-none ${
          screen === "history" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <VersionHistoryPage versions />
      </div>
    </EditorStage>
  );
}
