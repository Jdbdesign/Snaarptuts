"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step13-data";

/* Snaarp Doc, step 13: Edit > Find and replace. Starts with the sample document (without the extra paragraph). */

export function Step13FindReplace({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SAMPLE_EDITOR} />;
}
