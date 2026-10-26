"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SIGN_SPOT_EDITOR } from "@/components/docs/esignature-menu-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step41-data";

/* Snaarp Doc, step 41: eSignature > Sign document, Draw tab. Starts with the sample document and the caret on a new empty line under Contacts. */

export function Step41SignDocument({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SIGN_SPOT_EDITOR} />;
}
