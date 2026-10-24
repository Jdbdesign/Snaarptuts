"use client";

import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { COMMENTS, PANEL_WIDTH } from "./comments-data";
import { visibleThreads, type CommentsState, type FilterId, type Thread } from "./comments-state";

/** Same enlargement as DocEditor on narrow screens, so the panel keeps its place under the header. */
const NARROW_ZOOM = 2.4;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: COMMENTS.filter.all },
  { id: "open", label: COMMENTS.filter.open },
  { id: "resolved", label: COMMENTS.filter.resolved },
];

type Props = {
  open: boolean;
  state: CommentsState;
};

/**
 * The right-hand Comments panel under the editor header. Pass it in the editor's `overlay` and give the editor
 * `rightInset={PANEL_WIDTH.comments}` while it is open (on narrow screens it overlays the page instead).
 * It only draws `state`; comments-timeline.ts changes it. Hooks for scripts: comments-panel, comments-close,
 * comments-add, comments-add-bottom, comments-filter, comments-filter-<all|open|resolved>, comments-composer-input,
 * comments-composer-cancel, comments-composer-submit, thread-<id>, thread-reply-<id>, thread-menu-<id>,
 * thread-menu-item-<resolve|delete>, comments-body.
 */
export function CommentsPanel({ open, state }: Props) {
  const narrow = useNarrow();
  const threads = visibleThreads(state);
  const isEmpty = state.threads.length === 0 && !state.composer;

  return (
    <div
      aria-hidden={!open}
      data-tl="comments-panel"
      className={`absolute bottom-[19px] right-0 top-[55px] z-30 border-l border-[#E3E5EA] bg-white text-[#1f2430] transition-transform duration-300 ease-out motion-reduce:transition-none ${
        open ? "translate-x-0" : "pointer-events-none translate-x-full"
      }`}
      style={{ width: PANEL_WIDTH.comments, zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div data-tl="comments-panel-card" className="flex h-full flex-col">
        <div className="flex h-[34px] shrink-0 items-center justify-between px-[13px]">
          <span className="text-[11px] font-medium">{COMMENTS.title}</span>
          <span className="flex items-center gap-[10px] text-[#4b5060]">
            <Icon name="search" size={11} />
            <span data-tl="comments-close" className="flex h-[16px] w-[16px] items-center justify-center rounded-full">
              <Icon name="x" size={11} />
            </span>
          </span>
        </div>

        <div className="flex h-[28px] shrink-0 border-b border-[#EEEFF3] text-[9.5px]">
          <span className="flex flex-1 items-center justify-center border-b-2 border-[#2B6FEB] font-medium text-[#2B6FEB]">
            {COMMENTS.tabs.all}
          </span>
          <span className="flex flex-1 items-center justify-center text-[#6b7280]">{COMMENTS.tabs.forYou}</span>
        </div>

        <div className="relative shrink-0 px-[10px] pb-[6px] pt-[8px]">
          <span
            data-tl="comments-filter"
            className="flex h-[19px] w-fit items-center gap-[4px] rounded-[5px] border border-[#E3E5EA] bg-[#F7F8FA] px-[7px] text-[8.5px] text-[#4b5060] transition-colors data-[hover=true]:bg-[#EDEEF2]"
          >
            {FILTERS.find((f) => f.id === state.filter)?.label}
            <Icon name="chevronDown" size={8} />
          </span>
          <div
            data-tl="comments-filter-menu"
            className={`absolute left-[10px] top-[30px] z-10 w-[112px] rounded-[8px] border border-[#EAEBEF] bg-white py-[3px] shadow-[0_8px_22px_-6px_rgba(17,24,39,0.22)] transition-opacity duration-150 motion-reduce:transition-none ${
              state.filterOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {FILTERS.map((f) => (
              <div
                key={f.id}
                data-tl={`comments-filter-${f.id}`}
                className="mx-[3px] flex h-[22px] items-center gap-[5px] rounded-[5px] px-[5px] text-[9.5px] transition-colors data-[hover=true]:bg-[#F1F2F5]"
              >
                <span className="flex w-[10px] items-center justify-center">
                  <Icon name="check" size={9} className={state.filter === f.id ? "text-[#2B6FEB]" : "text-transparent"} />
                </span>
                {f.label}
              </div>
            ))}
          </div>
        </div>

        <div data-tl="comments-body" className="relative min-h-0 flex-1 overflow-hidden border-t border-[#EEEFF3]">
          {isEmpty ? (
            <div className="flex h-full flex-col items-center pt-[64px]">
              <Icon name="cmEmpty" size={28} className="text-[#C3C7D0]" />
              <span className="mt-[8px] text-[9px] text-[#8b909c]">{COMMENTS.empty}</span>
              <span
                data-tl="comments-add"
                className="mt-[10px] flex h-[24px] items-center rounded-[6px] bg-[#2B6FEB] px-[14px] text-[9.5px] font-medium text-white"
              >
                {COMMENTS.addComment}
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-[8px] p-[10px]">
              {threads.map((t) => (
                <ThreadCard key={t.id} thread={t} state={state} />
              ))}
              {state.composer && <Composer state={state} />}
            </div>
          )}
        </div>

        {isEmpty ? (
          <div className="shrink-0 px-[8px] pb-[8px]">
            <span
              data-tl="comments-add-bottom"
              className="flex h-[24px] items-center justify-center rounded-[6px] bg-[#2B6FEB] text-[9.5px] font-medium text-white"
            >
              {COMMENTS.addComment}
            </span>
          </div>
        ) : (
          <div className="shrink-0 border-t border-[#EEEFF3] bg-[#FAFAFB] px-[14px] py-[7px] text-center text-[7.5px] leading-[1.45] text-[#8b909c]">
            <div className="font-medium text-[#6b7280]">{COMMENTS.footerTitle}</div>
            {COMMENTS.footerText}
          </div>
        )}
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-[8px] font-semibold text-white">
      {COMMENTS.author.initial}
    </span>
  );
}

function Composer({ state }: { state: CommentsState }) {
  const text = state.composer?.text ?? "";
  return (
    <div
      data-tl="comments-composer"
      className="rounded-[8px] border border-[#E3E5EA] bg-white p-[9px] shadow-[0_2px_8px_-2px_rgba(17,24,39,0.12)]"
    >
      <div className="flex items-center gap-[6px] text-[9.5px] font-medium">
        <Avatar />
        {COMMENTS.author.name}
      </div>
      <div
        data-tl="comments-composer-input"
        className="mt-[7px] flex h-[26px] items-center rounded-[5px] border border-[#2B6FEB] bg-white px-[7px] text-[9.5px] shadow-[0_0_0_1px_#2B6FEB]"
      >
        {text ? (
          <>
            <span>{text}</span>
            <span className="doc-caret text-[#111]" />
          </>
        ) : (
          <>
            <span className="doc-caret text-[#111]" />
            <span className="text-[#A3A8B3]">{COMMENTS.composerPlaceholder}</span>
          </>
        )}
      </div>
      <div className="mt-[8px] flex items-center justify-end gap-[10px] text-[9px]">
        <span data-tl="comments-composer-cancel" className="text-[#6b7280]">
          {COMMENTS.cancel}
        </span>
        <span
          data-tl="comments-composer-submit"
          data-disabled={!text}
          className={`flex h-[21px] items-center rounded-[5px] px-[10px] font-medium text-white transition-colors ${text ? "bg-[#2B6FEB]" : "bg-[#A9C4F5]"}`}
        >
          {COMMENTS.submit}
        </span>
      </div>
    </div>
  );
}

function ThreadCard({ thread, state }: { thread: Thread; state: CommentsState }) {
  const focused = state.replyFocus === thread.id;
  return (
    <div
      data-tl={`thread-${thread.id}`}
      className={`relative rounded-[8px] border border-[#E3E5EA] bg-white p-[9px] shadow-[0_2px_8px_-2px_rgba(17,24,39,0.12)] transition-opacity ${thread.resolved ? "opacity-60" : ""}`}
    >
      <div className="text-[7.5px] text-[#8b909c]">{COMMENTS.threadLabel}</div>
      <div className="mt-[4px] flex items-center gap-[6px]">
        <Avatar />
        <span className="text-[9.5px] font-medium">{COMMENTS.author.name}</span>
        <span className="text-[7.5px] italic text-[#8b909c]">{COMMENTS.when}</span>
        <span
          data-tl={`thread-menu-${thread.id}`}
          className={`ml-auto flex h-[16px] w-[16px] items-center justify-center rounded-full text-[#4b5060] transition-colors ${state.menuFor === thread.id ? "bg-[#ECEDF1]" : ""}`}
        >
          <Icon name="dots" size={10} />
        </span>
      </div>
      <div className="mt-[3px] pl-[23px] text-[9.5px] leading-[1.4]">{thread.text}</div>
      <div
        data-tl={`thread-reply-${thread.id}`}
        className={`mt-[8px] flex h-[24px] items-center rounded-[5px] border bg-white px-[7px] text-[8.5px] transition-colors ${
          focused ? "border-[#2B6FEB] shadow-[0_0_0_1px_#2B6FEB]" : "border-[#E3E5EA]"
        }`}
      >
        {focused && <span className="doc-caret text-[#111]" />}
        <span className="flex-1 truncate text-[#A3A8B3]">{COMMENTS.replyPlaceholder}</span>
        {focused && (
          <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#BFD3F7] text-white">
            <Icon name="send" size={8} />
          </span>
        )}
      </div>

      <div
        data-tl={`thread-menu-card-${thread.id}`}
        className={`absolute right-[8px] top-[40px] z-10 w-[96px] rounded-[8px] border border-[#EAEBEF] bg-white py-[3px] shadow-[0_8px_22px_-6px_rgba(17,24,39,0.22)] transition-opacity duration-150 motion-reduce:transition-none ${
          state.menuFor === thread.id ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          data-tl="thread-menu-item-resolve"
          className="mx-[3px] flex h-[22px] items-center gap-[6px] rounded-[5px] px-[5px] text-[9.5px] transition-colors data-[hover=true]:bg-[#F1F2F5]"
        >
          <Icon name="circleCheck" size={11} className="shrink-0 text-[#4b5060]" />
          {COMMENTS.menu.resolve}
        </div>
        <div
          data-tl="thread-menu-item-delete"
          className="mx-[3px] flex h-[22px] items-center gap-[6px] rounded-[5px] px-[5px] text-[9.5px] text-[#D93636] transition-colors data-[hover=true]:bg-[#FDF0F0]"
        >
          <Icon name="trash" size={11} className="shrink-0" />
          {COMMENTS.menu.delete}
        </div>
      </div>
    </div>
  );
}
