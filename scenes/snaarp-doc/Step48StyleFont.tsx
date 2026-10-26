"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step48-data";

/* Snaarp Doc, step 48: the paragraph style box and the font box on the toolbar. */

export function Step48StyleFont({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
