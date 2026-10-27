"use client";

import { EivStage } from "../EivStage";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Slides, step 44: Change the stacking order. Starts in the editor on slide 2 of "Acme Studio Pitch 2026" (its script sets the rest). */
export function Step44({ tl }: SceneProps) {
  return <EivStage tl={tl} />;
}
