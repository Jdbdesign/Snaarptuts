"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { PAGE } from "../finish-data";

/**
 * Screen A: the "Setup Completed!" card. Scene variable `ticks` (0-4) is how many of the four record chips
 * have ticked in; the button has no extra action here (the script clicks it).
 */
export function SetupCompleted({ tl, onGo }: { tl: Timeline; onGo: () => void }) {
  const ticks = useTimelineVar(tl, "ticks", 0);
  const narrow = useNarrow();

  return (
    <div className="flex min-h-full items-center justify-center py-[36px]">
      <section className="w-[780px] rounded-[14px] bg-white px-[82px] pb-[58px] pt-[56px] text-center shadow-[0_14px_60px_-16px_rgba(17,24,39,0.25)]">
        <span className="mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#CFF7E0] text-[#0B5F43]">
          <Icon name="check" size={38} />
        </span>
        <h1 className="mt-[26px] text-[32px] font-bold leading-[42px] text-[#0A0A0A]">{PAGE.title}</h1>
        <p className="mx-auto mt-[14px] max-w-[410px] text-[14.5px] leading-[22px] text-[#4B5563]">{PAGE.text}</p>

        <div className={`mt-[30px] grid gap-[15px] ${narrow ? "grid-cols-2" : "grid-cols-4"}`}>
          {PAGE.chips.map((c, i) => {
            const on = i < ticks;
            return (
              <div
                key={c}
                data-tl={`chip-${i}`}
                data-on={on}
                className={`flex h-[75px] flex-col items-center justify-center gap-[6px] rounded-[10px] border text-[13px] font-semibold transition-colors duration-300 ${
                  on ? "border-[#BDEFD4] bg-[#E8FBF1] text-[#0B5F43]" : "border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF]"
                }`}
              >
                <span className="flex h-[16px] items-center">
                  {on && <Icon name="check" size={16} className="tl-pop text-[#14B86A]" />}
                </span>
                {c}
              </div>
            );
          })}
        </div>

        <div className="mt-[29px] rounded-[10px] border border-[#E5E7EB] bg-[#F5F5F6] px-[22px] pb-[22px] pt-[20px] text-left">
          <h2 className="text-[14.5px] font-bold leading-5 text-[#0A0A0A]">{PAGE.nextTitle}</h2>
          <ul className="mt-[10px] flex flex-col gap-[9px]">
            {PAGE.next.map((t) => (
              <li key={t} className="flex items-start gap-[10px] text-[13.5px] leading-[19px] text-[#374151]">
                <Icon name="check" size={14} className="mt-[3px] shrink-0 text-[#2563EB]" />
                <span className="max-w-[395px]">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[30px] flex flex-wrap items-center justify-center gap-[15px]">
          <button
            data-tl="btn-go"
            onClick={onGo}
            className="h-[46px] w-[238px] rounded-[4px] bg-[#000] text-[15px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-[0.97]"
          >
            {PAGE.go}
          </button>
          <span className="flex h-[46px] w-[210px] items-center justify-center rounded-[4px] border border-[#E5E7EB] bg-white text-[15px] text-[#374151]">
            {PAGE.download}
          </span>
        </div>
      </section>
    </div>
  );
}
