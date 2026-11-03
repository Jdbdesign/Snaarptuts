"use client";

import type { Timeline } from "@/lib/timeline";
import { OneCardXStage } from "@/components/onecardx/OneCardXStage";

export function Step26({ tl }: { tl: Timeline }) {
  return <OneCardXStage tl={tl} startPage="editor" />;
}
