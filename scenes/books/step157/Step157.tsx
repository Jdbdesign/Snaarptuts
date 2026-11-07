"use client";

import type { Timeline } from "@/lib/timeline";
import { BooksStage } from "@/components/books/BooksStage";

type Props = {
  tl: Timeline;
};

export function Step157({ tl }: Props) {
  return <BooksStage tl={tl} />;
}
