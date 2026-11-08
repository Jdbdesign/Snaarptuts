"use client";

import type { Timeline } from "@/lib/timeline";
import { BooksStage } from "@/components/books/BooksStage";

type Props = {
  tl: Timeline;
};

export function Step183({ tl }: Props) {
  return <BooksStage tl={tl} />;
}
