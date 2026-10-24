"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { COPIED_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step12-data";

/* Snaarp Doc, step 12: Edit > Select all, Delete, Undo. Starts with the end state of step 11 (the extra pasted paragraph). */

export function Step12Undo({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={COPIED_EDITOR} />;
}
