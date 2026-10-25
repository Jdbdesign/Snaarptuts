"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step34-data";

/* Snaarp Doc, step 34: Format > Align & indent (Center, Right, Left, Justify, Increase and Decrease indent). */

export function Step34AlignIndent({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting />;
}
