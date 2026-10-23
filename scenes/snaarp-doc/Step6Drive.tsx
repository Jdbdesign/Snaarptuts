"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { TITLES } from "./step6-data";

/* Snaarp Doc, step 6: File > Download (all five formats), then File > Save to Drive. Starts with "Untitled Document (Copy)". */

export function Step6Drive({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLES.start} />;
}
