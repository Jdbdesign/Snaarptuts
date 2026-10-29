"use client";

import { SheetsApp } from "@/components/sheets/SheetsApp";
import { FDT_BOOK } from "@/components/sheets/sheets-sample";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Sheets, step 69: start state is set in docs/STEPS.md. */
export function Step69({ tl }: SceneProps) {
  return <SheetsApp tl={tl} start={FDT_BOOK} />;
}
