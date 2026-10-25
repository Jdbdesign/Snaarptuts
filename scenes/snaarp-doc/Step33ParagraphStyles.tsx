"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step33-data";

/* Snaarp Doc, step 33: Format > Paragraph styles (Heading 1 to 3, Normal text). */

export function Step33ParagraphStyles({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting />;
}
