"use client";

import { Anchored } from "@/components/docs/Anchored";
import { DROPDOWN_SUBS, ZOOM_LABEL } from "./slides-menus-data";
import { BACKGROUNDS, LAYOUT_LIST, THEMES, TOOLBAR_ZOOMS, TRANSITIONS, type ThemeId } from "./slides-toolbar-data";

type Props = {
  /** Which toolbar dropdown is open ("" = none). */
  menu: string;
  theme: ThemeId;
  /** The current slide's own background colour (undefined = the theme's). */
  bg?: string;
  /** The current slide's transition id. */
  transition: string;
  zoom: string;
};

const card = "rounded-[8px] border border-[#E6E8EC] bg-white py-[6px] shadow-[0_8px_28px_-6px_rgba(17,24,39,0.22)]";
const row = "flex h-[24px] items-center px-[12px] text-[10px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5]";
const on = "text-[#1A73E8]";

/**
 * The dropdown cards of the toolbar: Theme, Background, Layout, Transition, plus the zoom box and the shape tool. Each hangs under
 * its button through Anchored and is open while the scene variable `toolMenu` names it. Hooks: `tbo-<menu>-<id>` for every option
 * (tbo-theme-ocean-blue, tbo-background-white, tbo-layout-title, tbo-transition-fade, tbo-zoom-150, tbo-shape-star).
 */
export function ToolbarCards({ menu, theme, bg, transition, zoom }: Props) {
  return (
    <>
      <Anchored to="tb-theme" show={menu === "theme"} className="w-[118px]">
        <div className={card} data-tl="theme-card">
          {THEMES.map((t) => (
            <div key={t.id} data-tl={`tbo-theme-${t.id}`} className={`${row} gap-[7px] ${theme === t.id ? on : ""}`}>
              <i className="block h-[9px] w-[9px] shrink-0 rounded-[2px] border border-[#D5D8E0]" style={{ background: t.swatch }} />
              <span className="truncate">{t.label}</span>
            </div>
          ))}
        </div>
      </Anchored>

      <Anchored to="tb-background" show={menu === "background"}>
        <div className={`${card} px-[7px]`} data-tl="background-card">
          <div className="grid grid-cols-4 gap-[5px]">
            {BACKGROUNDS.map((b) => (
              <i
                key={b.id}
                data-tl={`tbo-background-${b.id}`}
                title={b.label}
                className={`block h-[17px] w-[17px] rounded-[3px] border transition-transform data-[hover=true]:scale-110 ${bg?.toUpperCase() === b.color ? "border-[#1A73E8] shadow-[0_0_0_1px_#1A73E8]" : "border-[#D5D8E0]"}`}
                style={{ background: b.color }}
              />
            ))}
          </div>
        </div>
      </Anchored>

      <Anchored to="tb-layout" show={menu === "layout"} className="w-[114px]">
        <div className={card} data-tl="layout-card">
          {LAYOUT_LIST.map((l) => (
            <div key={l.id} data-tl={`tbo-layout-${l.id}`} className={row}>
              {l.label}
            </div>
          ))}
        </div>
      </Anchored>

      <Anchored to="tb-transition" show={menu === "transition"} className="w-[114px]">
        <div className={card} data-tl="transition-card">
          {TRANSITIONS.map((t) => (
            <div key={t.id} data-tl={`tbo-transition-${t.id}`} className={`${row} ${transition === t.id ? on : ""}`}>
              {t.label}
            </div>
          ))}
        </div>
      </Anchored>

      <Anchored to="tool-zoom" show={menu === "zoom"} className="w-[100px]">
        <div className={card} data-tl="zoom-card">
          {TOOLBAR_ZOOMS.map((z) => (
            <div key={z} data-tl={`tbo-zoom-${z}`} className={`${row} ${zoom === z ? on : ""}`}>
              {ZOOM_LABEL[z]}
            </div>
          ))}
        </div>
      </Anchored>

      <Anchored to="tool-shape" show={menu === "shape"} className="w-[120px]">
        <div className={card} data-tl="shape-card">
          {DROPDOWN_SUBS.shape.map((s) => (
            <div key={s.id} data-tl={`tbo-shape-${s.id}`} className={row}>
              {s.label}
            </div>
          ))}
        </div>
      </Anchored>
    </>
  );
}
