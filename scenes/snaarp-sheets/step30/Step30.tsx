"use client";

import { SheetsApp } from "@/components/sheets/SheetsApp";
import { EDIT_BOOK } from "@/components/sheets/sheets-sample";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Sheets, step 30: start state is set in docs/STEPS.md (the Acme Studio budget sample, A1 selected). */
export function Step30({ tl }: SceneProps) {
  return <SheetsApp tl={tl} start={EDIT_BOOK} />;
}
