"use client";

import { SheetsApp } from "@/components/sheets/SheetsApp";
import { BLANK_BOOK } from "@/components/sheets/sheets-sample";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Sheets, step 1: start state is set in docs/STEPS.md (blank workbook). */
export function Step1({ tl }: SceneProps) {
  return <SheetsApp tl={tl} start={BLANK_BOOK} />;
}
