"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step32-data";

/* Snaarp Doc, step 32: Format > Text (bold, italic, underline, strikethrough, superscript, subscript). */

export function Step32FormatText({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting />;
}
