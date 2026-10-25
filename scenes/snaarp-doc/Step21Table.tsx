"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { TABLE_SPOT_EDITOR } from "@/components/docs/insert-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step21-data";

/* Snaarp Doc, step 21: Insert > Table. Starts with the sample document, the caret at the end of the intro paragraph. */

export function Step21Table({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={TABLE_SPOT_EDITOR} />;
}
