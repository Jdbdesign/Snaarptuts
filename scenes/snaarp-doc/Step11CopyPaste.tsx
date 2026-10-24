"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step11-data";

/* Snaarp Doc, step 11: select a paragraph, Edit > Copy, click at the end, Edit > Paste. Starts with the sample document. */

export function Step11CopyPaste({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SAMPLE_EDITOR} />;
}
