"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step60-data";

/* Snaarp Doc, step 60: the Editing mode dropdown at the end of the toolbar (Editing, Suggesting, Viewing). Scene variable `mode`. */

export function Step60Modes({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
