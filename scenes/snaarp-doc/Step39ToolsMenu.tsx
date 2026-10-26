"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step39-data";

/* Snaarp Doc, step 39: a tour of the Tools menu, ending with the Document outline panel. Starts with the sample document in Editing mode. */

export function Step39ToolsMenu({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SAMPLE_EDITOR} />;
}
