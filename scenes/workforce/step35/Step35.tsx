"use client";

import { WorkforceStage } from "@/components/workforce/WorkforceStage";
import type { SceneProps } from "@/tutorials/types";

export function Step35({ tl }: SceneProps) {
  return <WorkforceStage tl={tl} startPage="time-tracker" />;
}
