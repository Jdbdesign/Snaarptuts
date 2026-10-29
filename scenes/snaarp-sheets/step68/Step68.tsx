"use client";

import { SheetsApp } from "@/components/sheets/SheetsApp";
import { FDT_BOOK } from "@/components/sheets/sheets-sample";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Sheets, step 68: start state is set in docs/STEPS.md. */
export function Step68({ tl }: SceneProps) {
  return <SheetsApp tl={tl} start={FDT_BOOK} />;
}
