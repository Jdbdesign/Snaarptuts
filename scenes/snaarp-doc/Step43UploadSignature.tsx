"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SIGN_SPOT_EDITOR } from "@/components/docs/esignature-menu-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step43-data";

/* Snaarp Doc, step 43: eSignature > Sign document, Upload tab (the file picker is left out). Starts like step 41. */

export function Step43UploadSignature({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SIGN_SPOT_EDITOR} />;
}
