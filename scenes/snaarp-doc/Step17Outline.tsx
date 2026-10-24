"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { COMMENTED_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step17-data";

/* Snaarp Doc, step 17: the Document outline panel. Starts with the commented phrase highlighted and no panel open. */

export function Step17Outline({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={COMMENTED_EDITOR} />;
}
