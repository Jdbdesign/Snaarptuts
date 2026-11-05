"use client";

import { BooksStage } from "@/components/books/BooksStage";
import type { Timeline } from "@/lib/timeline";

export function Step38({ tl }: { tl: Timeline }) {
  return <BooksStage tl={tl} />;
}
