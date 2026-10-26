"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step37-data";

/* Snaarp Doc, step 37: Format > Page orientation (Landscape, then back to Portrait). Starts with the sample document only. */

export function Step37Orientation({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SAMPLE_EDITOR} formatting />;
}
