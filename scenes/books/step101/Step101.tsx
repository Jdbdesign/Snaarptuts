"use client";

import { BooksStage } from "@/components/books/BooksStage";
import type { Timeline } from "@/lib/timeline";

export function Step101({ tl }: { tl: Timeline }) {
  return <BooksStage tl={tl} />;
}
