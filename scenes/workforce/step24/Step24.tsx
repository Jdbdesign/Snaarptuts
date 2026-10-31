"use client";

import { WorkforceStage } from "@/components/workforce/WorkforceStage";
import type { SceneProps } from "@/tutorials/types";

export function Step24({ tl }: SceneProps) {
  return <WorkforceStage tl={tl} startPage="hr-cases" startSubpage="hr-cases" />;
}
