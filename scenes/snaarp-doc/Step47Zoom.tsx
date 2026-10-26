"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step47-data";

/* Snaarp Doc, step 47: the Zoom box on the toolbar. Scene variable `zoomPct` (100 / 150). */

export function Step47Zoom({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
