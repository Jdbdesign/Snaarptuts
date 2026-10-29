"use client";

import { SheetsApp } from "@/components/sheets/SheetsApp";
import { INSERT_BOOK } from "@/components/sheets/sheets-sample";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Sheets, step 39: start state is set in docs/STEPS.md (the Acme Studio budget with monthly costs, A1 selected). */
export function Step39({ tl }: SceneProps) {
  return <SheetsApp tl={tl} start={INSERT_BOOK} />;
}
