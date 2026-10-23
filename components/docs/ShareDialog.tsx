"use client";

import { Icon } from "@/components/icons";
import { Modal } from "@/components/admin/Modal";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SHARE, type AccessId, type RoleId } from "./share-data";

/** Same enlargement as DocEditor on narrow screens. */
const NARROW_ZOOM = 2.4;

type Props = {
  tl: Timeline;
  /** Document title used until the scene variable `title` is set. */
  title: string;
};

/**
 * The "Share" dialog. Pass it in the editor's `overlay`. Scene variables: `share` (open), `shareAccess`
 * ("restricted" | "link"), `shareRole` ("viewer" | "commenter" | "editor"), `shareMenu` ("" | "access" | "role",
 * which small dropdown is open) and `shareFocus` (blue border on the input). Hooks for scripts:
 * share-input, share-access-row, share-access-trigger, share-access-opt-<id>, share-role-trigger,
 * share-role-opt-<id>, share-copy, share-done. Copy lives in share-data.ts.
 */
export function ShareDialog({ tl, title }: Props) {
  const open = useTimelineVar(tl, "share", false);
  const access = useTimelineVar<AccessId>(tl, "shareAccess", "restricted");
  const role = useTimelineVar<RoleId>(tl, "shareRole", "viewer");
  const menu = useTimelineVar<string>(tl, "shareMenu", "");
  const focus = useTimelineVar(tl, "shareFocus", false);
  const docTitle = useTimelineVar(tl, "title", title);
  const narrow = useNarrow();
  const current = SHARE.roles.find((r) => r.id === role) ?? SHARE.roles[0];
  const isLink = access === "link";
  const card =
    "absolute z-10 rounded-[8px] border border-[#E6E8EC] bg-white py-[4px] shadow-[0_8px_26px_-6px_rgba(17,24,39,0.25)] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none";
  const row = "mx-[4px] flex items-center rounded-[5px] transition-colors data-[hover=true]:bg-[#F1F3F4]";

  return (
    <div className="absolute inset-0 z-40 text-[#202124]" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
      <Modal open={open} width={390}>
        <div className="px-[20px] pb-[16px] pt-[16px]">
          <div className="flex h-[28px] items-center justify-between">
            <h2 className="text-[15px] font-normal tracking-tight">{SHARE.title(docTitle)}</h2>
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#F1F3F4] text-[#444746]">
              <Icon name="x" size={11} />
            </span>
          </div>

          <div
            data-tl="share-input"
            className={`mt-[8px] flex h-[36px] items-center rounded-[8px] border px-[11px] text-[11px] transition-[border-color,box-shadow] duration-150 ${
              focus ? "border-[#1A73E8] shadow-[0_0_0_1px_#1A73E8]" : "border-[#DADCE0]"
            }`}
          >
            {focus && <i className="h-[15px] w-px shrink-0 bg-[#202124]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
            <span className="text-[#80868B]">{SHARE.inputPlaceholder}</span>
          </div>

          <p className="mt-[15px] flex h-[16px] items-center text-[10.5px] font-medium">{SHARE.peopleLabel}</p>
          <div className="mt-[8px] flex h-[30px] items-center gap-[9px]">
            <span className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full bg-[#7B1FA2] text-[11px] font-medium text-white">
              {SHARE.person.initial}
            </span>
            <span className="flex-1 leading-[13px]">
              <span className="block text-[10.5px] font-medium">
                {SHARE.person.name} {SHARE.you}
              </span>
              <span className="block text-[9px] text-[#5F6368]">{SHARE.person.email}</span>
            </span>
            <span className="text-[10.5px] text-[#5F6368]">{SHARE.owner}</span>
          </div>

          <p className="mt-[19px] flex h-[16px] items-center text-[10.5px] font-medium">{SHARE.accessLabel}</p>
          <div data-tl="share-access-row" className="relative mt-[6px] flex h-[32px] items-center gap-[9px]">
            <span
              className={`relative flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                isLink ? "bg-[#E6F4EA] text-[#188038]" : "bg-[#F1F3F4] text-[#444746]"
              }`}
            >
              <Icon name="padlock" size={13} className={`absolute transition-opacity duration-200 ${isLink ? "opacity-0" : "opacity-100"}`} />
              <Icon name="globe" size={14} className={`absolute transition-opacity duration-200 ${isLink ? "opacity-100" : "opacity-0"}`} />
            </span>
            <span className="flex-1 leading-[14px]">
              <span data-tl="share-access-trigger" className="inline-flex items-center gap-[3px] text-[10.5px] font-medium">
                {SHARE.access[access].label}
                <Icon name="chevronDown" size={9} />
              </span>
              <span className="block text-[9px] text-[#5F6368]">
                {isLink ? SHARE.access.link.hint(current.verb) : SHARE.access.restricted.hint}
              </span>
            </span>
            {isLink && (
              <span data-tl="share-role-trigger" className="inline-flex items-center gap-[3px] pr-[2px] text-[10.5px]">
                {current.label}
                <Icon name="chevronDown" size={9} />
              </span>
            )}

            <div className={`${card} left-[36px] top-[17px] w-[262px] ${menu === "access" ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}>
              {SHARE.accessOptions.map((id) => (
                <div key={id} data-tl={`share-access-opt-${id}`} className={`${row} h-[36px] gap-[6px] px-[6px]`}>
                  <span className="flex w-[12px] justify-center text-[#1A73E8]">{access === id && <Icon name="check" size={10} />}</span>
                  <span className="leading-[13px]">
                    <span className="block text-[10px] font-medium">{SHARE.access[id].label}</span>
                    <span className="block text-[8.5px] text-[#5F6368]">
                      {id === "link" ? SHARE.access.link.hint(current.verb) : SHARE.access.restricted.hint}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className={`${card} right-0 top-[30px] w-[124px] ${menu === "role" ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}>
              <p className="px-[14px] pb-[3px] pt-[3px] text-[8px] font-medium tracking-[0.06em] text-[#5F6368]">{SHARE.roleHeader}</p>
              {SHARE.roles.map((r) => (
                <div key={r.id} data-tl={`share-role-opt-${r.id}`} className={`${row} h-[27px] gap-[5px] px-[6px] text-[10px]`}>
                  <span className="flex w-[12px] justify-center text-[#1A73E8]">{role === r.id && <Icon name="check" size={10} />}</span>
                  {r.label}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[32px] flex h-[29px] items-center justify-between">
            <span
              data-tl="share-copy"
              className="flex h-[29px] items-center gap-[5px] rounded-full border border-[#DADCE0] px-[13px] text-[10.5px] font-medium text-[#1A73E8] transition-colors data-[hover=true]:bg-[#F6FAFE]"
            >
              <Icon name="link" size={12} />
              {SHARE.copyLink}
            </span>
            <span
              data-tl="share-done"
              className="flex h-[29px] items-center rounded-full bg-[#1A73E8] px-[19px] text-[10.5px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-95"
            >
              {SHARE.done}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
