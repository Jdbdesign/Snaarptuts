"use client";

import type { Timeline } from "@/lib/timeline";
import { BooksStage } from "@/components/books/BooksStage";

type Props = {
  tl: Timeline;
};

export function Step196({ tl }: Props) {
  return <BooksStage tl={tl} />;
}
