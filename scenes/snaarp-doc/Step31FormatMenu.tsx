"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step31-data";

/* Snaarp Doc, step 31: a tour of the Format menu. Starts with the sample document, one page, no practice paragraph. */

export function Step31FormatMenu({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SAMPLE_EDITOR} formatting />;
}
