"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step35-data";

/* Snaarp Doc, step 35: Format > Bullets & numbering (Bullet list, Checklist, Numbered list). */

export function Step35Lists({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting />;
}
