"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step58-data";

/* Snaarp Doc, step 58: the Block quote, Horizontal rule and Table buttons on the toolbar. */

export function Step58QuoteRuleTable({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
