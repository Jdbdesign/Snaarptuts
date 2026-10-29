"use client";

import { SheetsApp } from "@/components/sheets/SheetsApp";
import { INSERT_BOOK } from "@/components/sheets/sheets-sample";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Sheets, step 47: start state is set in docs/STEPS.md. */
export function Step47({ tl }: SceneProps) {
  return <SheetsApp tl={tl} start={INSERT_BOOK} />;
}
