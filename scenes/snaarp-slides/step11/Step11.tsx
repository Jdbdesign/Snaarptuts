"use client";

import { SlidesApp } from "@/components/slides/SlidesApp";
import { DECK } from "@/components/slides/slides-data";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Slides, step 11: starts in the editor with the "Acme Studio Pitch" deck (one title slide). */
export function Step11({ tl }: SceneProps) {
  return <SlidesApp tl={tl} startTitle={DECK.title} />;
}
