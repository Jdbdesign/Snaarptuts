"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step50-data";

/* Snaarp Doc, step 50: the Bold, Italic and Underline buttons on the toolbar. */

export function Step50BoldItalic({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
