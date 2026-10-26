"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step61-data";

/* Snaarp Doc, step 61: the Meet button in the header (menu, join card, sample code). Scene variables `toolMenu` meet / meetjoin, `field:meet-code`. */

export function Step61Meet({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
