"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { InsertDialog } from "./InsertDialog";
import { SYMBOLS } from "./insert-data";

/**
 * The "Insert Symbol" dialog (Insert > Symbols). Pass it in the editor's `overlay`; it is open while the scene variable
 * `insertDialog` is "symbols". The selected category is the scene variable `symCategory` (solid blue pill); the grid shows
 * 10 symbols to a row. Clicking a symbol adds it to the text behind the dialog (the script does that) and the dialog
 * stays open. Hooks: sym-cat-<id>, sym-<category>-<index> (every symbol), sym-search, sym-close. Copy, categories and
 * symbols in insert-data.ts (SYMBOLS).
 */
export function SymbolsDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "insertDialog", "") === "symbols";
  const category = useTimelineVar<string>(tl, "symCategory", SYMBOLS.defaultCategory);
  const current = SYMBOLS.categories.find((c) => c.id === category) ?? SYMBOLS.categories[0];

  return (
    <InsertDialog open={open} width={408} title={SYMBOLS.title} closeHook="sym-close">
      <div
        data-tl="sym-search"
        className="mt-[12px] flex h-[32px] items-center rounded-[8px] border border-[#E4E6EB] px-[11px] text-[11px] text-[#9aa0ab]"
      >
        {SYMBOLS.placeholder}
      </div>

      <div className="mt-[11px] flex gap-[4px]">
        {SYMBOLS.categories.map((c) => (
          <span
            key={c.id}
            data-tl={`sym-cat-${c.id}`}
            className={`flex h-[24px] items-center rounded-full border px-[9px] text-[10px] transition-colors ${
              c.id === category
                ? "border-[#1A6BEF] bg-[#1A6BEF] font-medium text-white"
                : "border-[#E4E6EB] bg-white text-[#3d4350] data-[hover=true]:bg-[#F6F7F9]"
            }`}
          >
            {c.label}
          </span>
        ))}
      </div>

      <div className="mt-[10px] grid min-h-[96px] grid-cols-10 content-start gap-y-[2px]">
        {current.symbols.map((sym, i) => (
          <span
            key={`${current.id}-${i}`}
            data-tl={`sym-${current.id}-${i}`}
            className="flex h-[28px] items-center justify-center rounded-[6px] text-[14px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5]"
          >
            {sym}
          </span>
        ))}
      </div>
    </InsertDialog>
  );
}
