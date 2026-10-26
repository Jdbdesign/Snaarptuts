"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step59-data";

/* Snaarp Doc, step 59: the Full screen, Drawing and Symbols & Emoji buttons on the toolbar. */

export function Step59FullDrawEmoji({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
