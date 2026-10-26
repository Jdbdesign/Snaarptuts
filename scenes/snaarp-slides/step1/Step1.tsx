"use client";

import { SlidesApp } from "@/components/slides/SlidesApp";
import { DECK } from "@/components/slides/slides-data";
import type { SceneProps } from "@/tutorials/types";

/* Snaarp Slides, step 1: starts on the Presentations home. */
export function Step1({ tl }: SceneProps) {
  return <SlidesApp tl={tl} startStage="home" startTitle={DECK.title} />;
}
