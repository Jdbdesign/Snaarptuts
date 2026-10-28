"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { COMMENTS, FIND } from "./edit-view-data";
import { BLUE, BlueButton, CloseX, ShField, SheetGlyph, Tick } from "./parts";

export type CommentThread = { id: string; author: string; initials: string; text: string; time: string; cell: string };

/**
 * View > Comments: the right-hand Comments panel. Scene variables: `commentsOpen` (the panel itself, handled by SheetsApp),
 * `comments` (the threads), `commentUi` ("" | "compose"), `field:comment` and `focus` ("comment"). Hooks: comments-panel,
 * comments-add (centre button), comments-add-bottom, field-comment, comment-post, comment-cancel, comments-close, comment-<id>.
 */
export function CommentsPanel({ tl }: { tl: Timeline }) {
  const threads = useTimelineVar<CommentThread[]>(tl, "comments", NO_THREADS);
  const ui = useTimelineVar<string>(tl, "commentUi", "");
  const D = COMMENTS;
  return (
    <div data-tl="comments-panel" className="flex h-full w-[272px] flex-col bg-white text-[#1f2430]">
      <div className="flex items-center justify-between px-[16px] pb-[6px] pt-[14px]">
        <h2 className="text-[15px] font-medium">{D.title}</h2>
        <span className="flex items-center gap-[10px] text-[#4b5060]">
          <Icon name="shSearch" size={15} />
          <span data-tl="comments-close" className="flex h-[22px] w-[22px] items-center justify-center rounded-full transition-colors data-[hover=true]:bg-[#F1F3F4]">
            <Icon name="x" size={14} />
          </span>
        </span>
      </div>
      <div className="flex border-b border-[#E3E5EA] px-[10px] text-[12.5px]">
        {D.tabs.map((t, i) => (
          <span key={t.id} className={`px-[10px] pb-[8px] pt-[4px] ${i === 0 ? "border-b-2 font-medium text-[#1C3F94]" : "text-[#5F6368]"}`} style={i === 0 ? { borderColor: BLUE } : undefined}>
            {t.label}
          </span>
        ))}
      </div>
      <div className="flex gap-[8px] px-[14px] pb-[6px] pt-[10px] text-[11.5px] text-[#4b5060]">
        {D.chips.map((c) => (
          <span key={c} className="flex items-center gap-[4px] rounded-full bg-[#F1F3F4] px-[10px] py-[3px]">
            {c}
            <Icon name="chevronDown" size={8} />
          </span>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-[14px] pt-[6px]">
        {ui === "compose" && (
          <div className="mb-[10px] rounded-[10px] border border-[#DADCE0] bg-white p-[10px] shadow-[0_2px_8px_-2px_rgba(17,24,39,0.18)]">
            <ShField tl={tl} id="comment" placeholder={D.placeholder} multi className="min-h-[54px]" />
            <div className="mt-[10px] flex justify-end gap-[8px]">
              <span data-tl="comment-cancel" className="flex h-[28px] items-center rounded-full px-[12px] text-[12.5px] font-medium text-[#3C4043] data-[hover=true]:bg-[#F1F3F4]">{D.cancel}</span>
              <BlueButton hook="comment-post" round className="!h-[28px] !px-[14px] !text-[12.5px]">{D.post}</BlueButton>
            </div>
          </div>
        )}
        {threads.map((t) => (
          <div key={t.id} data-tl={`comment-${t.id}`} className="mb-[10px] rounded-[10px] border border-[#E3E5EA] p-[10px]">
            <div className="flex items-center gap-[8px]">
              <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#7014D9] text-[10px] font-medium text-white">{t.initials}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-medium leading-[15px]">{t.author}</span>
                <span className="block text-[10.5px] leading-[13px] text-[#80868B]">{t.time}</span>
              </span>
              <span className="rounded-[4px] bg-[#E8F0FE] px-[6px] py-[1px] text-[10.5px] font-medium text-[#1C3F94]">{t.cell}</span>
            </div>
            <p className="mt-[8px] text-[12.5px] leading-[17px]">{t.text}</p>
          </div>
        ))}
        {threads.length === 0 && ui !== "compose" && (
          <div className="flex flex-col items-center pt-[46px]">
            <SheetGlyph size={38} />
            <p className="mt-[10px] text-[12.5px] text-[#5F6368]">{D.empty}</p>
            <BlueButton hook="comments-add" className="mt-[12px] !h-[30px] !px-[16px] !text-[12.5px]">{D.add}</BlueButton>
          </div>
        )}
      </div>
      <div className="px-[12px] pb-[12px] pt-[6px]">
        <BlueButton hook="comments-add-bottom" className="w-full">{D.add}</BlueButton>
      </div>
    </div>
  );
}
const NO_THREADS: CommentThread[] = [];

/**
 * Edit > Find and replace: a floating card (not a dimmed dialog, so the highlighted matches stay visible in the grid).
 * Scene variables: `findOpen`, `field:find`, `field:replace`, `focus`, `findCase`, `findEntire`, `findHits`.
 * Hooks: find-card, field-find, field-replace, find-case, find-entire, find-btn, find-replace, find-replace-all, find-done, find-count.
 */
export function FindCard({ tl }: { tl: Timeline }) {
  const open = useTimelineVar(tl, "findOpen", false);
  const matchCase = useTimelineVar(tl, "findCase", false);
  const entire = useTimelineVar(tl, "findEntire", false);
  const hits = useTimelineVar<[number, number][] | null>(tl, "findHits", null);
  const D = FIND;
  return (
    <div
      aria-hidden={!open}
      data-tl="find-card"
      className={`absolute right-[28px] top-[104px] z-40 w-[372px] rounded-[12px] border border-[#DADCE0] bg-white p-[16px] text-[#1f2430] shadow-[0_14px_40px_-8px_rgba(17,24,39,0.32)] transition-[opacity,transform] duration-200 motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="mb-[12px] flex items-center justify-between">
        <h2 className="text-[15px] font-semibold">{D.title}</h2>
        <CloseX id="find" />
      </div>
      <ShField tl={tl} id="find" placeholder={D.find} floatLabel={D.find} />
      <p data-tl="find-count" className="mb-[10px] mt-[4px] h-[14px] text-[11px] text-[#5F6368]">{hits ? D.count(hits.length) : ""}</p>
      <ShField tl={tl} id="replace" placeholder={D.replace} floatLabel={D.replace} />
      <div className="mt-[12px] flex items-center gap-[8px] text-[12.5px] text-[#3C4043]">
        <span>{D.within}</span>
        <span className="flex h-[28px] items-center gap-[6px] rounded-[6px] border border-[#DADCE0] px-[10px]">
          {D.withinValue}
          <Icon name="chevronDown" size={8} />
        </span>
      </div>
      <div className="mt-[10px] flex flex-col gap-[7px] text-[12.5px] text-[#3C4043]">
        <span data-tl="find-case" className="flex items-center gap-[8px]"><Tick on={matchCase} />{D.matchCase}</span>
        <span data-tl="find-entire" className="flex items-center gap-[8px]"><Tick on={entire} />{D.entire}</span>
      </div>
      <div className="mt-[16px] flex items-center justify-end gap-[8px]">
        <span data-tl="find-btn" className="flex h-[32px] items-center rounded-[7px] border border-[#DADCE0] px-[14px] text-[13px] font-medium text-[#3C4043] transition-colors data-[hover=true]:bg-[#F1F3F4] data-[pressed=true]:scale-95">{D.findBtn}</span>
        <span data-tl="find-replace" className="flex h-[32px] items-center rounded-[7px] border border-[#DADCE0] px-[14px] text-[13px] font-medium text-[#3C4043] transition-colors data-[hover=true]:bg-[#F1F3F4] data-[pressed=true]:scale-95">{D.replaceBtn}</span>
        <BlueButton hook="find-replace-all" className="!h-[32px]">{D.replaceAllBtn}</BlueButton>
        <span data-tl="find-done" className="flex h-[32px] items-center rounded-[7px] px-[12px] text-[13px] font-medium text-[#1C3F94] transition-colors data-[hover=true]:bg-[#F1F3F4] data-[pressed=true]:scale-95">{D.done}</span>
      </div>
    </div>
  );
}
