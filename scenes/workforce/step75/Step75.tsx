"use client";

import { WorkforceStage } from "@/components/workforce/WorkforceStage";
import type { SceneProps } from "@/tutorials/types";

export function Step75({ tl }: SceneProps) {
  return <WorkforceStage tl={tl} startPage="payroll" />;
}
