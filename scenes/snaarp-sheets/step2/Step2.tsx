"use client";

import { SheetsApp } from "@/components/sheets/SheetsApp";
import { BUDGET_BOOK } from "@/components/sheets/sheets-sample";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Sheets, step 2: start state is set in docs/STEPS.md (budget workbook). */
export function Step2({ tl }: SceneProps) {
  return <SheetsApp tl={tl} start={BUDGET_BOOK} />;
}
