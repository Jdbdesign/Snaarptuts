"use client";

import { WorkforceStage } from "@/components/workforce/WorkforceStage";
import type { SceneProps } from "@/tutorials/types";

export function Step19({ tl }: SceneProps) {
  return <WorkforceStage tl={tl} startPage="salary-advances" startSubpage="salary-advances" />;
}
