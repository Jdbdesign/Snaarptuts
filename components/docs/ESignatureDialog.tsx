"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { InsertDialog } from "./InsertDialog";
import { ESIGN, TYPED_SIGNATURE_FONT } from "./insert-data";
import { SIGNATURE } from "./stroke-data";

export type EsignTab = "draw" | "type" | "upload" | "request";

/** A valid-looking address: something@something.something. */
export const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());

const INPUT = "mt-[10px] flex items-center rounded-[8px] border bg-white px-[11px] text-[11.5px] transition-[border-color,box-shadow] duration-150";
const input = (focus: boolean) => (focus ? "border-[#111] shadow-[0_0_0_1px_#111]" : "border-[#D9DCE3]");
const BLUE = "flex items-center gap-[6px] rounded-[8px] bg-[#1A6BEF] px-[16px] text-[11px] font-medium text-white transition-[transform,opacity] duration-200 data-[pressed=true]:scale-95";

/**
 * The "eSignature" dialog (Insert > eSignature and the eSignature menu). Pass it in the editor's `overlay`; it is open while the
 * scene variable `insertDialog` is "esignature". The scene variable `esigTab` picks the tab (draw, the default | type | upload |
 * request). Draw: the canvas shows the sample stroke up to `esigProgress` (0 to 1), which the script moves while the cursor follows
 * the stroke (tl.followPath on [data-tl=esig-stroke]). Type: the input `field:esig-name` and a live preview in the signature
 * font. Upload: a dashed drop zone (the computer's file picker is left out). Request: `field:esig-email` and `field:esig-message`
 * and a Send Request button that stays pale until the address looks valid. `esigFocus` ("name" | "email" | "message") gives that
 * input the dark border and caret. Unselected tabs get a hover fill. Hooks: esig-tab-<id>, esig-canvas, esig-stroke, esig-clear,
 * esig-insert, esig-name, esig-preview, esig-drop, esig-email, esig-message, esig-send, esig-close. Copy in insert-data.ts (ESIGN),
 * stroke in stroke-data.ts.
 */
export function ESignatureDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "insertDialog", "") === "esignature";
  const tab = useTimelineVar<EsignTab>(tl, "esigTab", "draw");
  const progress = useTimelineVar(tl, "esigProgress", 0);
  const focus = useTimelineVar<string>(tl, "esigFocus", "");
  const name = useTimelineVar(tl, "field:esig-name", "");
  const email = useTimelineVar(tl, "field:esig-email", "");
  const message = useTimelineVar(tl, "field:esig-message", "");

  return (
    <InsertDialog open={open} width={380} title={ESIGN.title} closeHook="esig-close">
      <div className="mt-[14px] flex h-[30px] items-end gap-[4px] border-b border-[#EEEFF3] text-[11px]">
        {ESIGN.tabs.map((t) => (
          <span
            key={t.id}
            data-tl={`esig-tab-${t.id}`}
            className={`-mb-px flex h-[30px] items-center gap-[5px] rounded-t-[6px] border-b-2 px-[10px] transition-colors ${
              t.id === tab
                ? "border-[#2B6FEB] font-medium text-[#2B6FEB]"
                : "border-transparent text-[#6b7280] data-[hover=true]:bg-[#F3F4F7]"
            }`}
          >
            <Icon name={t.icon} size={12} />
            {t.label}
          </span>
        ))}
      </div>

      {tab === "draw" && (
        <>
          <p className="mt-[14px] text-[11px] text-[#6b7280]">{ESIGN.hint}</p>
          <div data-tl="esig-canvas" className="relative mt-[9px] h-[150px] overflow-hidden rounded-[8px] border border-[#E4E6EB] bg-white">
            <svg viewBox={SIGNATURE.viewBox} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full px-[22px] py-[14px]" aria-hidden>
              <path
                data-tl="esig-stroke"
                d={SIGNATURE.path}
                pathLength={1}
                fill="none"
                stroke="#111"
                strokeWidth={SIGNATURE.pen}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={1}
                strokeDashoffset={1 - progress}
                style={{ opacity: progress > 0 ? 1 : 0 }}
              />
            </svg>
          </div>

          <div className="mt-[14px] flex items-center justify-between">
            <span data-tl="esig-clear" className="flex h-[28px] items-center rounded-[8px] border border-[#E4E6EB] px-[13px] text-[10.5px] font-medium">
              {ESIGN.clear}
            </span>
            <span data-tl="esig-insert" className={`${BLUE} h-[30px]`}>
              {ESIGN.insert}
            </span>
          </div>
        </>
      )}

      {tab === "type" && (
        <>
          <p className="mt-[14px] text-[11px] text-[#6b7280]">{ESIGN.type.hint}</p>
          <Field hook="esig-name" focus={focus === "name"} value={name} placeholder={ESIGN.type.placeholder} className="h-[34px]" />
          {name && (
            <div
              data-tl="esig-preview"
              className="mt-[10px] flex h-[78px] items-center justify-center overflow-hidden rounded-[8px] border border-[#EDEEF2] bg-white px-[12px]"
            >
              <span className="truncate text-[28px] italic leading-none text-[#111]" style={{ fontFamily: TYPED_SIGNATURE_FONT }}>
                {name}
              </span>
            </div>
          )}
          <div className="mt-[14px] flex justify-end">
            <span data-tl="esig-insert" className={`${BLUE} h-[30px] ${name.trim() ? "opacity-100" : "opacity-40"}`}>
              {ESIGN.insert}
            </span>
          </div>
        </>
      )}

      {tab === "upload" && (
        <>
          <p className="mt-[14px] text-[11px] text-[#6b7280]">{ESIGN.upload.hint}</p>
          <div
            data-tl="esig-drop"
            className="mt-[10px] flex h-[120px] flex-col items-center justify-center gap-[8px] rounded-[8px] border-[1.5px] border-dashed border-[#C7CCD6] text-[10.5px] text-[#6b7280] transition-colors data-[hover=true]:border-[#7DB6E8] data-[hover=true]:bg-[#F3F8FD]"
          >
            <Icon name="upload" size={22} className="text-[#4b5060]" />
            {ESIGN.upload.drop}
          </div>
        </>
      )}

      {tab === "request" && (
        <>
          <p className="mt-[14px] text-[11px] leading-[16px] text-[#6b7280]" data-tl="esig-request-hint">
            {ESIGN.request.hint}
          </p>
          <Field hook="esig-email" focus={focus === "email"} value={email} placeholder={ESIGN.request.emailPlaceholder} className="h-[34px]" />
          <Field
            hook="esig-message"
            focus={focus === "message"}
            value={message}
            placeholder={ESIGN.request.messagePlaceholder}
            className="h-[64px] items-start py-[10px]"
          />
          <div className="mt-[14px] flex justify-end">
            <span data-tl="esig-send" className={`${BLUE} h-[30px] ${isEmail(email) ? "opacity-100" : "opacity-40"}`}>
              <Icon name="send" size={12} />
              {ESIGN.request.send}
            </span>
          </div>
        </>
      )}
    </InsertDialog>
  );
}

/** An input that shows its typed value (or placeholder) and the caret while it has the focus. */
function Field({ hook, focus, value, placeholder, className }: { hook: string; focus: boolean; value: string; placeholder: string; className: string }): ReactNode {
  return (
    <div data-tl={hook} className={`${INPUT} ${input(focus)} ${className}`}>
      {value ? <span>{value}</span> : null}
      {focus && <span className="doc-caret text-[#111]" />}
      {!value && <span className="text-[#9aa0ab]">{placeholder}</span>}
    </div>
  );
}
