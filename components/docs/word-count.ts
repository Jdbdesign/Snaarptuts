import type { Block } from "./editor-state";
import { countWords } from "./sample-document";
import { tableWords, type TableState } from "./insert-state";

/** What the Word count dialog shows (Tools > Word count). Words match the "N words" in the editor's footer line. */
export type DocStats = { words: number; characters: number; charactersNoSpaces: number; pages: number };

/** Count the document's text (and the table's cells, if one was inserted) the same way the footer does. */
export function docStats(blocks: Block[], table: TableState | null, pages: number): DocStats {
  const text = [...blocks.map((b) => b.text), ...(table ? table.cells.flat() : [])].join("");
  return {
    words: countWords(blocks) + tableWords(table),
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    pages,
  };
}

/** 2085 -> "2,085". */
export const formatCount = (n: number) => n.toLocaleString("en-US");
