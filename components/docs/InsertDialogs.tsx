"use client";

import type { Timeline } from "@/lib/timeline";
import { DrawingDialog } from "./DrawingDialog";
import { ESignatureDialog } from "./ESignatureDialog";
import { PageNumbersDialog } from "./PageNumbersDialog";
import { SymbolsDialog } from "./SymbolsDialog";

/** Which of the Insert menu dialogs is open (scene variable `insertDialog`): "" = none. */
export type InsertDialogId = "" | "pagenumbers" | "esignature" | "drawing" | "symbols";

/**
 * Every dialog of the Insert menu that uses the shared InsertDialog frame (Page numbers, eSignature, Drawing, Insert
 * Symbol), in one place. EditorStage renders it once; each dialog opens when the scene variable `insertDialog` names it
 * (openInsertDialog / closeInsertDialog in insert-timeline.ts).
 */
export function InsertDialogs({ tl }: { tl: Timeline }) {
  return (
    <>
      <PageNumbersDialog tl={tl} />
      <ESignatureDialog tl={tl} />
      <DrawingDialog tl={tl} />
      <SymbolsDialog tl={tl} />
    </>
  );
}
