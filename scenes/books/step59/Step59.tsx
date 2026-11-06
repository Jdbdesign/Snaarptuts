"use client";

import { BooksStage } from "@/components/books/BooksStage";
import type { Timeline } from "@/lib/timeline";

export function Step59({ tl }: { tl: Timeline }) {
  return <BooksStage tl={tl} />;
}
