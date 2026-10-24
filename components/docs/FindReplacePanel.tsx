"use client";

import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { matchesOf, type EditorState } from "./editor-state";
import { FIND_PANEL } from "./find-replace-data";

/** Same enlargement as DocEditor on narrow screens, so the panel stays inside the page. */
const NARROW_ZOOM = 2.4;

/**
 * The Find and replace card, floating at the top right of the editor under the toolbar. Pass it in the editor's
 * `overlay`. It only draws the editor state (find.*); editor-timeline.ts changes it. Hooks for the scripts:
 * find-input, replace-input, find-match-case, find-btn-replace / -replace-all / -previous / -next, find-close.
 */
export function FindReplacePanel({ editor }: { editor: EditorState }) {
  const narrow = useNarrow();
  const { find } = editor;
  const matches = matchesOf(editor);
  const total = matches.length;
  const current = Math.min(find.current, total - 1);
  const result = !find.query ? "" : total ? FIND_PANEL.count(current + 1, total) : FIND_PANEL.noResults;

  return (
    <div
      aria-hidden={!find.open}
      data-tl="find-panel"
      className={`pointer-events-none absolute right-[22px] top-[100px] z-30 w-[296px] transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
        find.open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
      style={{ zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div className="rounded-[12px] border border-[#EAEBEF] bg-white px-[14px] pb-[12px] pt-[12px] shadow-[0_10px_30px_-8px_rgba(17,24,39,0.22)]">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-semibold text-[#111]">{FIND_PANEL.title}</span>
          <span data-tl="find-close" className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-[#1f2430]">
            <Icon name="x" size={11} />
          </span>
        </div>

        <Field testId="find-input" value={find.query} placeholder={FIND_PANEL.findPlaceholder} focused={find.focus === "find"} className="mt-[10px]" />
        <Field testId="replace-input" value={find.replacement} placeholder={FIND_PANEL.replacePlaceholder} focused={find.focus === "replace"} className="mt-[7px]" />

        <div data-tl="find-match-case" className="mt-[10px] flex w-fit items-center gap-[6px] text-[10px] text-[#3d4350]">
          <span
            className={`flex h-[13px] w-[13px] items-center justify-center rounded-[3px] border transition-colors ${
              find.matchCase ? "border-[#111] bg-[#111] text-white" : "border-[#B9BDC7] bg-white text-transparent"
            }`}
          >
            <Icon name="check" size={9} />
          </span>
          {FIND_PANEL.matchCase}
        </div>

        <div data-tl="find-result" className="mt-[8px] h-[13px] text-[9.5px] text-[#8b909c]">
          {result}
        </div>

        <div className="mt-[6px] flex gap-[6px]">
          {(
            [
              ["replace", FIND_PANEL.buttons.replace],
              ["replace-all", FIND_PANEL.buttons.replaceAll],
              ["previous", FIND_PANEL.buttons.previous],
              ["next", FIND_PANEL.buttons.next],
            ] as const
          ).map(([id, label]) => (
            <span
              key={id}
              data-tl={`find-btn-${id}`}
              data-disabled={!total}
              className={`flex h-[24px] items-center rounded-[6px] border border-[#E3E5EA] bg-white px-[9px] text-[9.5px] transition-colors data-[hover=true]:bg-[#F1F2F5] ${
                total ? "text-[#1f2430]" : "text-[#B5B9C3]"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ testId, value, placeholder, focused, className }: { testId: string; value: string; placeholder: string; focused: boolean; className: string }) {
  return (
    <div
      data-tl={testId}
      className={`flex h-[28px] items-center rounded-[8px] border bg-white px-[9px] text-[10.5px] transition-colors ${
        focused ? "border-[#1f2430] shadow-[0_0_0_1px_#1f2430]" : "border-[#E3E5EA]"
      } ${className}`}
    >
      {focused && !value && <span className="doc-caret text-[#111]" />}
      {value ? <span className="text-[#111]">{value}</span> : <span className="text-[#A3A8B3]">{placeholder}</span>}
      {focused && value && <span className="doc-caret text-[#111]" />}
    </div>
  );
}
