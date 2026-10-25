"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step23-data";

/* Snaarp Doc, step 23: Insert > Horizontal line and Insert > Break > Page break. Starts with the sample document. */

export function Step23LineBreak({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SAMPLE_EDITOR} />;
}
