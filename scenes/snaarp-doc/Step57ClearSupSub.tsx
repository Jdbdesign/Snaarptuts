"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step57-data";

/* Snaarp Doc, step 57: the Clear formatting, Superscript and Subscript buttons on the toolbar. */

export function Step57ClearSupSub({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
