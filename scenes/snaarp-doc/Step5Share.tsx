"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { ShareDialog } from "@/components/docs/ShareDialog";
import type { SceneProps } from "@/tutorials/types";
import { TITLES } from "./step5-data";

/* Snaarp Doc, step 5: File > Share. Starts with "Untitled Document (Copy)". */

export function Step5Share({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLES.start} overlay={<ShareDialog tl={tl} title={TITLES.start} />} />;
}
