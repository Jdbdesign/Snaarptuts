"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { PHRASE_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step16-data";

/* Snaarp Doc, step 16: manage comments and comment on selected text. Starts with the panel open and one comment. */

export function Step16ManageComments({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={PHRASE_EDITOR} />;
}
