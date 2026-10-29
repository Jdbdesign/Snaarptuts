"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { COMMENTS } from "./edit-view-data";
import { FIND_DIALOG } from "./toolbar-data";
import { COMMENT_INS } from "./insert-data";
import { BLUE, BlueButton, CloseX, ShField, SheetGlyph, Tick } from "./parts";

export type CommentReply = { author: string; initials: string; text: string; time: string };
export type CommentThread = {
  id: string;
  author: string;
  initials: string;
  text: string;
  time: string;
  cell: string;
  /** A "Reply" link under the thread (the Insert > Comment step). */
  canReply?: boolean;
  replies?: CommentReply[];
  /** A note, listed in the same panel under the name "Note". */
  note?: boolean;
};

/**
 * View > Comments: the right-hand Comments panel. Scene variables: `commentsOpen` (the panel itself, handled by SheetsApp),
 * `comments` (the threads), `commentUi` ("" | "compose"), `field:comment` and `focus` ("comment"). Hooks: comments-panel,
 * comments-add (centre button), comments-add-bottom, field-comment, comment-post, comment-cancel, comments-close, comment-<id>.
 */
export function CommentsPanel({ tl }: { tl: Timeline }) {
  const threads = useTimelineVar<CommentThread[]>(tl, "comments", NO_THREADS);
  const ui = useTimelineVar<string>(tl, "commentUi", "");
  const replyOpen = useTimelineVar<string>(tl, "replyOpen", "");
  const D = COMMENTS;
  return (
    <div data-tl="comments-panel" className="flex h-full w-[272px] flex-col bg-white text-[#1f2430]">
      <div className="flex items-center justify-between px-[16px] pb-[6px] pt-[14px]">
        <h2 data-tl="comments-title" className="text-[15px] font-medium">{D.title}</h2>
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
              <span className="rounded-[4px] bg-[#E8F0FE] px-[6px] py-[1px] text-[10.5px] font-medium text-[#1C3F94]">{t.note ? `Note · ${t.cell}` : t.cell}</span>
            </div>
            <p className="mt-[8px] text-[12.5px] leading-[17px]">{t.text}</p>
            {t.replies?.map((rp, i) => (
              <div key={i} data-tl={`reply-${t.id}-${i}`} className="mt-[8px] border-t border-[#F0F1F3] pt-[8px]">
                <div className="flex items-center gap-[8px]">
                  <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#7014D9] text-[9px] font-medium text-white">{rp.initials}</span>
                  <span className="text-[12px] font-medium">{rp.author}</span>
                  <span className="text-[10.5px] text-[#80868B]">{rp.time}</span>
                </div>
                <p className="mt-[4px] text-[12.5px] leading-[17px]">{rp.text}</p>
              </div>
            ))}
            {t.canReply && replyOpen !== t.id && <span data-tl={`comment-reply-${t.id}`} className="mt-[6px] inline-block text-[12px] text-[#2563EB] data-[hover=true]:underline">{COMMENT_INS.reply}</span>}
            {replyOpen === t.id && (
              <div className="mt-[8px]">
                <ShField tl={tl} id="reply" placeholder={COMMENT_INS.replyPlaceholder} className="!h-[30px] !text-[12.5px]" />
                <div className="mt-[8px] flex justify-end gap-[8px]">
                  <span data-tl="reply-cancel" className="flex h-[26px] items-center rounded-full px-[10px] text-[12px] font-medium text-[#3C4043] data-[hover=true]:bg-[#F1F3F4]">{COMMENTS.cancel}</span>
                  <BlueButton hook="reply-post" round className="!h-[26px] !px-[12px] !text-[12px]">{COMMENT_INS.reply}</BlueButton>
                </div>
              </div>
            )}
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
 * Find and replace: ONE card for Edit > Find and replace (step 28) and the toolbar's Search tool (step 86), laid out as in the recording:
 * Find, Replace with, Search (All sheets / This sheet), five options, and Find, Replace, Replace all, Done. It floats (not a dimmed dialog),
 * so the highlighted matches stay visible in the grid.
 * Scene variables: `findOpen`, `field:find`, `field:replace`, `focus`, `findCase`, `findEntire`, `findRegex`, `findFormulas`, `findLinks`,
 * `findScope`, `findScopeOpen`, `findHits`, `findNow`.
 * Hooks: find-card, field-find, field-replace, find-scope, find-scope-<all|this>, find-case, find-entire, find-regex, find-regex-help,
 * find-formulas, find-links, find-btn, find-replace, find-replace-all, find-done, find-count.
 */
export function FindCard({ tl }: { tl: Timeline }) {
  const open = useTimelineVar(tl, "findOpen", false);
  const flags = {
    case: useTimelineVar(tl, "findCase", false),
    entire: useTimelineVar(tl, "findEntire", false),
    regex: useTimelineVar(tl, "findRegex", false),
    formulas: useTimelineVar(tl, "findFormulas", false),
    links: useTimelineVar(tl, "findLinks", false),
  } as Record<string, boolean>;
  const hits = useTimelineVar<[number, number][] | null>(tl, "findHits", null);
  const now = useTimelineVar(tl, "findNow", -1);
  const scope = useTimelineVar<string>(tl, "findScope", FIND_DIALOG.scopes[0]);
  const scopeOpen = useTimelineVar(tl, "findScopeOpen", false);
  const query = useTimelineVar<string>(tl, "field:find", "");
  const D = FIND_DIALOG;
  const narrow = useNarrow();
  return (
    <div
      aria-hidden={!open}
      data-tl="find-card"
      className={`absolute right-[28px] ${narrow ? "bottom-[150px]" : "top-[104px]"} z-40 w-[340px] rounded-[12px] border border-[#DADCE0] bg-white p-[16px] text-[#1f2430] shadow-[0_14px_40px_-8px_rgba(17,24,39,0.32)] transition-[opacity,transform] duration-200 motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="mb-[12px] flex items-center justify-between">
        <h2 className="text-[15px] font-semibold">{D.title}</h2>
        <CloseX id="find" />
      </div>
      <ShField tl={tl} id="find" placeholder={D.find} floatLabel={D.find} />
      <p data-tl="find-count" className="mb-[8px] mt-[4px] h-[14px] text-[11px] text-[#5F6368]">{hits ? D.count(Math.max(now, 0) + 1, hits.length) : ""}</p>
      <ShField tl={tl} id="replace" placeholder={D.replace} floatLabel={D.replace} />
      <div className="relative mt-[12px] flex items-center gap-[10px] text-[12.5px] text-[#3C4043]">
        <span className="w-[48px]">{D.search}</span>
        <span data-tl="find-scope" className="flex h-[28px] min-w-[110px] items-center justify-between gap-[8px] rounded-[6px] border border-[#DADCE0] px-[10px]">
          {scope}
          <Icon name="chevronDown" size={8} />
        </span>
        <div aria-hidden={!scopeOpen} className={`absolute left-[58px] top-[30px] z-10 w-[118px] rounded-[6px] border border-[#DADCE0] bg-white py-[4px] shadow-[0_6px_18px_-4px_rgba(17,24,39,0.25)] transition-opacity duration-150 ${scopeOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          {D.scopes.map((sc, i) => (
            <span key={sc} data-tl={`find-scope-${i ? "this" : "all"}`} className={`block px-[10px] py-[5px] data-[hover=true]:bg-[#F1F3F4] ${sc === scope ? "text-[#1C3F94]" : ""}`}>{sc}</span>
          ))}
        </div>
      </div>
      <div className="mt-[10px] flex flex-col gap-[7px] text-[12.5px] text-[#3C4043]">
        {D.options.map((o) => (
          <span key={o.id} data-tl={`find-${o.id}`} className="flex items-center gap-[8px]">
            <Tick on={!!flags[o.id]} />
            {o.label}
            {o.help && <span data-tl="find-regex-help" className="text-[11px] text-[#2563EB] underline">{o.help}</span>}
          </span>
        ))}
      </div>
      <div className="mt-[16px] flex items-center justify-end gap-[8px]">
        <span data-tl="find-btn" className="flex h-[32px] items-center rounded-[7px] border border-[#DADCE0] px-[14px] text-[13px] font-medium text-[#3C4043] transition-colors data-[hover=true]:bg-[#F1F3F4] data-[pressed=true]:scale-95">{D.buttons.find}</span>
        <span data-tl="find-replace" className={`flex h-[32px] items-center rounded-[7px] border px-[14px] text-[13px] font-medium transition-colors data-[pressed=true]:scale-95 ${hits?.length ? "border-[#DADCE0] text-[#3C4043] data-[hover=true]:bg-[#F1F3F4]" : "border-[#ECEDEF] text-[#B0B5C0]"}`}>{D.buttons.replace}</span>
        <span data-tl="find-replace-all" className={`flex h-[32px] items-center rounded-[7px] border px-[14px] text-[13px] font-medium transition-[transform,background] data-[pressed=true]:scale-95 ${query ? "border-[#DADCE0] text-[#3C4043] data-[hover=true]:bg-[#F1F3F4]" : "border-[#ECEDEF] text-[#B0B5C0]"}`}>{D.buttons.replaceAll}</span>
        <span data-tl="find-done" className="flex h-[32px] items-center rounded-[7px] bg-[#188038] px-[14px] text-[13px] font-medium text-white transition-[transform,filter] data-[hover=true]:brightness-90 data-[pressed=true]:scale-95">{D.buttons.done}</span>
      </div>
    </div>
  );
}
