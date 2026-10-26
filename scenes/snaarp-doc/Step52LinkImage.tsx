"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step52-data";

/* Snaarp Doc, step 52: the Insert link and Insert image buttons on the toolbar (the dialog and banner are those of steps 20 and 22). */

export function Step52LinkImage({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
