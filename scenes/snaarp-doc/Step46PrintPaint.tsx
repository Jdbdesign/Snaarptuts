"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { PrintDialog } from "@/components/docs/PrintDialog";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step46-data";

/* Snaarp Doc, step 46: the Print button (the print window) and Paint format. Scene variable `print` opens the window. */

export function Step46PrintPaint({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools overlay={<PrintDialog tl={tl} />} />;
}
