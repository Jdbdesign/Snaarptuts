"use client";

import { OneCardXStage } from "@/components/onecardx/OneCardXStage";
import type { SceneProps } from "@/tutorials/types";

export function Step4({ tl }: SceneProps) {
  return <OneCardXStage tl={tl} startPage="orgCards" part1Cards />;
}
