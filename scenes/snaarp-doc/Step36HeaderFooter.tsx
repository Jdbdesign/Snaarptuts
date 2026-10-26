"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step36-data";

/* Snaarp Doc, step 36: Format > Headers & footers and Format > Page numbers. Starts with the sample document only. */

export function Step36HeaderFooter({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SAMPLE_EDITOR} formatting />;
}
