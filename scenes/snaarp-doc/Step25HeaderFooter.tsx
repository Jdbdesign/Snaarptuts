"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step25-data";

/* Snaarp Doc, step 25: Insert > Page elements > Header (and Footer). Starts with the sample document, nothing inserted. */

export function Step25HeaderFooter({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SAMPLE_EDITOR} />;
}
