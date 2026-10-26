"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step40-data";

/* Snaarp Doc, step 40: Tools > Word count: the dialog with the live numbers. Starts with the sample document. */

export function Step40WordCount({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SAMPLE_EDITOR} />;
}
