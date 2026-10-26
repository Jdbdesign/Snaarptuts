"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step55-data";

/* Snaarp Doc, step 55: the Bullet list (with its arrow menu: Checklist) and Numbered list buttons on the toolbar. */

export function Step55Lists({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
