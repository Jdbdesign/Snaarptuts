"use client";

import { EivStage } from "../EivStage";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Slides, step 41: Duplicate a slide. Starts in the editor on slide 2 of "Acme Studio Pitch 2026" (its script sets the rest). */
export function Step41({ tl }: SceneProps) {
  return <EivStage tl={tl} />;
}
