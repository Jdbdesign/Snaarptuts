import React from "react";
import type { Timeline } from "@/lib/timeline";
import { PdfStage } from "@/components/pdf/PdfStage";

export function Step2({ tl }: { tl: Timeline }) {
  return <PdfStage tl={tl} />;
}
