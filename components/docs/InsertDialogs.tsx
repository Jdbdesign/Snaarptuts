"use client";

import type { Timeline } from "@/lib/timeline";
import { DrawingDialog } from "./DrawingDialog";
import { ESignatureDialog } from "./ESignatureDialog";
import { PageNumbersDialog } from "./PageNumbersDialog";
import { PageOrientationDialog } from "./PageOrientationDialog";
import { SymbolsDialog } from "./SymbolsDialog";
import { WordCountDialog } from "./WordCountDialog";

/** Which of the Insert menu dialogs is open (scene variable `insertDialog`): "" = none. */
export type InsertDialogId = "" | "pagenumbers" | "esignature" | "drawing" | "symbols" | "orientation" | "wordcount";

/**
 * Every dialog of the Insert, Format and Tools menus that uses the shared InsertDialog frame (Page numbers, eSignature, Drawing, Insert
 * Symbol, Word count), in one place. EditorStage renders it once; each dialog opens when the scene variable `insertDialog` names it
 * (openInsertDialog / closeInsertDialog in insert-timeline.ts).
 */
export function InsertDialogs({ tl }: { tl: Timeline }) {
  return (
    <>
      <PageNumbersDialog tl={tl} />
      <PageOrientationDialog tl={tl} />
      <ESignatureDialog tl={tl} />
      <DrawingDialog tl={tl} />
      <SymbolsDialog tl={tl} />
      <WordCountDialog tl={tl} />
    </>
  );
}
