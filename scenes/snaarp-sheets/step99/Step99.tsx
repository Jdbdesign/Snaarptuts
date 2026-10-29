"use client";

import { SheetsApp } from "@/components/sheets/SheetsApp";
import { TB_BOOK } from "@/components/sheets/sheets-sample";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Sheets, step 99: start state is set in docs/STEPS.md. */
export function Step99({ tl }: SceneProps) {
  return <SheetsApp tl={tl} start={TB_BOOK} />;
}
