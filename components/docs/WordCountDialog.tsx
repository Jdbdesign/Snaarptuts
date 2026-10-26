"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SAMPLE_EDITOR } from "./editor-timeline";
import type { EditorState } from "./editor-state";
import { InsertDialog } from "./InsertDialog";
import { pageCount, type TableState } from "./insert-state";
import { WORD_COUNT } from "./tools-menu-data";
import { docStats, formatCount } from "./word-count";

/**
 * The "Word count" dialog (Tools > Word count, Ctrl+Shift+C). Pass it in the editor's overlay (InsertDialogs renders it); it is
 * open while the scene variable `insertDialog` is "wordcount". The numbers are computed live from the document on screen (the
 * scene variables `editor`, `pageTable` and `pageBreak`), so Words always matches the footer line. Hooks: wc-card (the whole dialog), wc-row-<words|characters|
 * characters-no-spaces|pages>, wc-done, wc-close. Copy lives in tools-menu-data.ts (WORD_COUNT).
 */
export function WordCountDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "insertDialog", "") === "wordcount";
  const editor = useTimelineVar<EditorState>(tl, "editor", SAMPLE_EDITOR);
  const table = useTimelineVar<TableState | null>(tl, "pageTable", null);
  const pageBreak = useTimelineVar<string | null>(tl, "pageBreak", null);
  const stats = docStats(editor.blocks, table, pageCount({ pageBreakBefore: pageBreak }));
  const c = WORD_COUNT;
  const rows = [
    { id: "words", label: c.words, value: stats.words },
    { id: "characters", label: c.characters, value: stats.characters },
    { id: "characters-no-spaces", label: c.charactersNoSpaces, value: stats.charactersNoSpaces },
    { id: "pages", label: c.pages, value: stats.pages },
  ];

  return (
    <InsertDialog open={open} width={330} title={c.title} closeHook="wc-close" cardHook="wc-card">
      <p className="mt-[5px] text-[10.5px] leading-[15px] text-[#8b909c]">{c.subtitle}</p>

      <div className="mt-[20px]">
        {rows.map((r, i) => (
          <div
            key={r.id}
            data-tl={`wc-row-${r.id}`}
            className={`flex h-[34px] items-center justify-between rounded-[4px] text-[11.5px] ${i < rows.length - 1 ? "border-b border-[#EDEEF2]" : ""}`}
          >
            <span className="text-[#6b7280]">{r.label}</span>
            <span className="font-medium tabular-nums text-[#111]">{formatCount(r.value)}</span>
          </div>
        ))}
      </div>

      <div className="mt-[20px] flex justify-end">
        <span
          data-tl="wc-done"
          className="flex h-[30px] items-center rounded-[8px] bg-[#16171B] px-[18px] text-[11px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-95"
        >
          {c.done}
        </span>
      </div>
    </InsertDialog>
  );
}
