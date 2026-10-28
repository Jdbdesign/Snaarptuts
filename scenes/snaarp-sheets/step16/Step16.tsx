"use client";

import { SheetsApp } from "@/components/sheets/SheetsApp";
import { NAMED_BOOK } from "@/components/sheets/sheets-sample";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Sheets, step 16: start state is set in docs/STEPS.md (named workbook). */
export function Step16({ tl }: SceneProps) {
  return <SheetsApp tl={tl} start={NAMED_BOOK} />;
}
