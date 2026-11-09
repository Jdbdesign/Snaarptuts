"use client";

import { LockStage } from "@/components/lock/LockStage";
import type { SceneProps } from "@/tutorials/types";

export function Step2({ tl }: SceneProps) {
  return <LockStage tl={tl} />;
}
