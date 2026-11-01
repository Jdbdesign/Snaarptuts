"use client";

import { WorkforceStage } from "@/components/workforce/WorkforceStage";
import type { SceneProps } from "@/tutorials/types";

export function Step64({ tl }: SceneProps) {
  return <WorkforceStage tl={tl} startPage="appraisal-management" />;
}
