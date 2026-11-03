"use client";

import { OneCardXStage } from "@/components/onecardx/OneCardXStage";
import type { SceneProps } from "@/tutorials/types";

export function Step64({ tl }: SceneProps) {
  return <OneCardXStage tl={tl} startPage="contacts" />;
}
