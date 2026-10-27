"use client";

import { Anchored } from "@/components/docs/Anchored";
import { Icon } from "@/components/icons";
import { SOON } from "./slide-elements-data";
import { MEETING, SLIDESHOW_MENU } from "./slides-tools-data";

type Props = {
  /** Which header card is open: "slideshow" | "meet" ("" = none). It is the same scene variable as the toolbar cards (`toolMenu`). */
  menu: string;
  /** The meeting icon's tooltip is showing. */
  meetTip: boolean;
  /** The greyed Chromecast row shows its "Coming soon" tooltip. */
  castTip: boolean;
};

const card = "rounded-[8px] border border-[#E6E8EC] bg-white py-[5px] shadow-[0_8px_28px_-6px_rgba(17,24,39,0.22)]";
const row = "flex items-center px-[14px] text-[10.5px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5]";

/**
 * The cards under the header buttons: the Slideshow dropdown (Presenter view, Start from beginning, Present using Chromecast,
 * Presentation display options) and the meeting dropdown (Snaarp Meeting, Start a new meeting, Use a meeting code), plus the meeting
 * icon's tooltip. Labels and order were read from ref/slides/Snaarp_Slides_final.mp4 (1:36-2:00). Hooks: ss-presenter, ss-beginning,
 * ss-chromecast, ss-options, ss-cast-tip, mt-heading, mt-product, mt-start, mt-code, meet-tip.
 */
export function HeaderCards({ menu, meetTip, castTip }: Props) {
  const S = SLIDESHOW_MENU;
  const M = MEETING;
  return (
    <>
      <Anchored to="slideshow-button" align="right" show={menu === "slideshow"} className="w-[222px]">
        <div className={card} data-tl="slideshow-card">
          <div data-tl="ss-presenter" className={`${row} min-h-[46px] flex-col items-start justify-center py-[6px]`}>
            <span className="text-[10.5px]">{S.presenter.label}</span>
            <span className="mt-[2px] text-[9px] leading-[12px] text-[#6b7280]">{S.presenter.hint}</span>
          </div>
          <div data-tl="ss-beginning" className={`${row} h-[28px] justify-between`}>
            <span>{S.beginning.label}</span>
            <span className="text-[8.5px] text-[#A3A8B3]">{S.beginning.shortcut}</span>
          </div>
          <div className="mx-0 my-[4px] border-t border-[#EEEEF1]" />
          <div data-tl="ss-chromecast" className={`${row} relative h-[28px] text-[#A9ADB8] data-[hover=true]:bg-transparent`}>
            {S.chromecast.label}
            <span data-tl="ss-cast-tip" className={`absolute right-[10px] top-[22px] z-10 whitespace-nowrap rounded-[5px] bg-[#111] px-[8px] py-[4px] text-[9.5px] leading-none text-white shadow-lg transition-opacity duration-150 ${castTip ? "opacity-100" : "pointer-events-none opacity-0"}`}>
              {SOON}
            </span>
          </div>
          <div data-tl="ss-options" className={`${row} h-[28px]`}>
            {S.options.label}
          </div>
        </div>
      </Anchored>

      <Anchored to="header-meet" align="right" show={menu === "meet"} className="w-[190px]">
        <div className={card} data-tl="meet-card">
          <p data-tl="mt-heading" className="px-[14px] pb-[5px] pt-[4px] text-[9.5px] text-[#4b5060]">{M.heading}</p>
          <div data-tl="mt-product" className={`${row} h-[30px] justify-between`}>
            {M.product}
            <span className="rounded-[3px] bg-[#1A73E8] px-[4px] py-[2px] text-[6.5px] font-bold leading-none tracking-[0.04em] text-white">{M.badge}</span>
          </div>
          <div className="my-[4px] border-t border-[#EEEEF1]" />
          <div data-tl="mt-start" className={`${row} h-[28px] gap-[7px]`}>
            <Icon name="plus" size={10} className="text-[#4b5060]" />
            {M.start}
          </div>
          <div data-tl="mt-code" className={`${row} h-[28px] gap-[7px]`}>
            <Icon name="grid4" size={10} className="text-[#4b5060]" />
            {M.code}
          </div>
        </div>
      </Anchored>

      <Anchored to="header-meet" align="center" show={meetTip && menu !== "meet"} className="">
        <div data-tl="meet-tip" className="whitespace-nowrap rounded-[5px] bg-[#111] px-[9px] py-[5px] text-[9.5px] leading-none text-white shadow-lg">
          {M.tooltip}
        </div>
      </Anchored>
    </>
  );
}
