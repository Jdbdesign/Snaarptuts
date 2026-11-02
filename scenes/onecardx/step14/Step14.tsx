"use client";

import { OneCardXStage } from "@/components/onecardx/OneCardXStage";
import type { SceneProps } from "@/tutorials/types";

export function Step14({ tl }: SceneProps) {
  return <OneCardXStage tl={tl} startPage="editor" />;
}
