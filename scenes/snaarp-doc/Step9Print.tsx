"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { PrintDialog } from "@/components/docs/PrintDialog";
import type { SceneProps } from "@/tutorials/types";
import { TITLES } from "./step9-data";

/* Snaarp Doc, step 9: File > Print. Starts with "Project Brief". */

export function Step9Print({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLES.start} overlay={<PrintDialog tl={tl} />} />;
}
