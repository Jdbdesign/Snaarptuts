"use client";

import { WorkforceStage } from "@/components/workforce/WorkforceStage";
import type { SceneProps } from "@/tutorials/types";

export function Step23({ tl }: SceneProps) {
  return <WorkforceStage tl={tl} startPage="holidays" startSubpage="holidays" />;
}
