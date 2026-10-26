"use client";

import { EditorStage } from "@/components/docs/EditorStage";
import { ShareDialog } from "@/components/docs/ShareDialog";
import type { SceneProps } from "@/tutorials/types";
import { START_EDITOR, TITLE } from "./step64-data";

/* Snaarp Doc, step 64: the Share button in the header and the Share dialog (the last step). Scene variables of the dialog: share, shareAccess, shareRole, shareMenu, shareFocus. */

export function Step64Share({ tl }: SceneProps) {
  return <EditorStage tl={tl} startTitle={TITLE} startDocument={START_EDITOR} formatting tools overlay={<ShareDialog tl={tl} title={TITLE} />} />;
}
