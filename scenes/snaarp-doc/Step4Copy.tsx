"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import type { SceneProps } from "@/tutorials/types";
import { TITLES } from "./step4-data";

/* Snaarp Doc, step 4: File > Make a copy. Starts with "Untitled Document"; the copy replaces the title (scene variable `title`). */

export function Step4Copy({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLES.start} />;
}
