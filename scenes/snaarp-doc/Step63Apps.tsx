"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step63-data";

/* Snaarp Doc, step 63: the Snaarp apps grid in the header (scene variable `toolMenu` = apps). */

export function Step63Apps({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools />;
}
