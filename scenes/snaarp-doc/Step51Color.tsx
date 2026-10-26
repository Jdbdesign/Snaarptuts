"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step51-data";

/* Snaarp Doc, step 51: the Text color and Highlight color palettes. The last colours picked show in the bars under the buttons. */

export function Step51Color({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
