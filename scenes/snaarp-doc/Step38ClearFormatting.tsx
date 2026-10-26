"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step38-data";

/* Snaarp Doc, step 38: Format > Clear formatting on a pre-formatted paragraph. */

export function Step38ClearFormatting({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting />;
}
