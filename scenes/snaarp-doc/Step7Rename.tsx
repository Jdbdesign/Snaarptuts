"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { RenameDialog } from "@/components/docs/RenameDialog";
import type { SceneProps } from "@/tutorials/types";
import { TITLES } from "./step7-data";

/* Snaarp Doc, step 7: File > Rename. Starts with "Untitled Document (Copy)"; the script sets the scene variable `title`. */

export function Step7Rename({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLES.start} overlay={<RenameDialog tl={tl} title={TITLES.start} />} />;
}
