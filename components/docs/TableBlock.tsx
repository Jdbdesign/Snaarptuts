"use client";

import type { TableState } from "./insert-state";

/**
 * The table the Insert menu adds under a text block (Snaarp Doc step 21): a grey header row, thin borders and rounded
 * corners. The focused cell has a thin blue outline and a blinking caret after its text. The text itself lives in the
 * scene variable `pageTable`; insert-timeline.ts changes it. Hooks: table-block (the whole table, ring this one),
 * table-cell-<row>-<col>.
 */
export function TableBlock({ cells, focus }: Pick<TableState, "cells" | "focus">) {
  const cols = cells[0]?.length ?? 0;
  return (
    <div data-tl="table-block" className="doc-image-in relative my-[14px]">
      <div className="overflow-hidden rounded-[6px] border border-[#E4E7ED]">
        {cells.map((row, r) => (
          <div
            key={r}
            className={`grid ${r > 0 ? "border-t border-[#ECEEF2]" : "bg-[#F0F2F5]"}`}
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {row.map((text, c) => {
              const focused = focus?.row === r && focus.col === c;
              return (
                <div
                  key={c}
                  data-tl={`table-cell-${r}-${c}`}
                  className={`flex h-[31px] items-center px-[10px] text-[11.5px] leading-none ${c > 0 ? "border-l border-[#ECEEF2]" : ""} ${
                    focused ? "shadow-[inset_0_0_0_1.5px_#2B6FEB]" : ""
                  }`}
                >
                  <span className="truncate">{text}</span>
                  {focused && <span className="doc-caret text-[#111]" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
