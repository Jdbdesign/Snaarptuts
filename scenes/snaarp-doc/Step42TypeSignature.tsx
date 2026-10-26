"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { SIGN_SPOT_EDITOR } from "@/components/docs/esignature-menu-timeline";
import type { SceneProps } from "@/tutorials/types";
import { TITLE } from "./step42-data";

/* Snaarp Doc, step 42: eSignature > Sign document, Type tab. Starts like step 41. */

export function Step42TypeSignature({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={SIGN_SPOT_EDITOR} />;
}
