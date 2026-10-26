"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step49-data";

/* Snaarp Doc, step 49: the font size buttons and the size box. Scene variable `sizeBox` is the text being typed into the box. */

export function Step49FontSize({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
