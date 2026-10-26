"use client";

import { SlidesApp } from "@/components/slides/SlidesApp";
import { EIV_DECK, EIV_SELECTED } from "@/components/slides/slide-elements-data";
import { DECK } from "@/components/slides/slides-data";
import type { SceneProps } from "@/tutorials/types";

/**
 * The stage of every Edit, View and Insert step (20-36): the editor with the "Acme Studio Pitch 2026" deck (three slides, slide 2
 * "Our services" selected). Each step's scene is this component; its script sets the rest of its start state.
 */
export function EivStage({ tl }: SceneProps) {
  return <SlidesApp tl={tl} startTitle={DECK.renamed} startSlides={EIV_DECK} startSelected={EIV_SELECTED} />;
}
