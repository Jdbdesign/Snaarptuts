"use client";

import { WorkforceStage } from "@/components/workforce/WorkforceStage";
import type { SceneProps } from "@/tutorials/types";

export function Step42({ tl }: SceneProps) {
  return <WorkforceStage tl={tl} startPage="performance-review" />;
}
