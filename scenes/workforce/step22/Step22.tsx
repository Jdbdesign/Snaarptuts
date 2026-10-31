"use client";

import { WorkforceStage } from "@/components/workforce/WorkforceStage";
import type { SceneProps } from "@/tutorials/types";

export function Step22({ tl }: SceneProps) {
  return <WorkforceStage tl={tl} startPage="exit-tasks" startSubpage="exit-tasks" />;
}
