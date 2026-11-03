"use client";

import type { Timeline } from "@/lib/timeline";
import { OneCardXStage } from "@/components/onecardx/OneCardXStage";

export function Step32({ tl }: { tl: Timeline }) {
  return <OneCardXStage tl={tl} startPage="users" />;
}
