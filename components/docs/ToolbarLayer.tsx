"use client";

import { Icon } from "@/components/icons";
import { ProductLogo } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Anchored } from "./Anchored";
import { activeBlock, type EditorState } from "./editor-state";
import { FORMAT_SUBMENUS, STYLE_LABELS } from "./format-menu-data";
import { formatValueAt, styleLabelOf } from "./format-state";
import {
  APPS,
  COLOR_MENU,
  FONT_MENU,
  HEADER_TIPS,
  HIGHLIGHT_COLORS,
  LIST_MENU,
  MEET,
  MODE_DROPDOWN,
  SIZE_OPTIONS,
  SPACING_MENU,
  TABLE_PICKER,
  TEXT_COLORS,
  TOOL_TIPS,
  ZOOM_OPTIONS,
} from "./toolbar-data";
import type { EditorMode } from "./editor-data";

/** The name of a font as it appears in a hook: "Times New Roman" -> "times-new-roman". */
export const fontSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const CARD = "rounded-[8px] border border-[#EAEBEF] bg-white py-[3px] shadow-[0_8px_26px_-6px_rgba(17,24,39,0.18)]";
const ROW = "mx-[3px] flex h-[22px] items-center gap-[6px] rounded-[5px] px-[7px] text-[10px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5]";

/** The text of the tooltip for a hook name: "tool-print" -> "Print (Ctrl+P)", "header-history" -> "Version history". */
function tipText(name: string): string {
  if (name.startsWith("tool-")) return TOOL_TIPS[name.slice(5)] ?? "";
  if (name === "editor-share") return HEADER_TIPS.share;
  if (name.startsWith("header-")) return HEADER_TIPS[name.slice(7)] ?? "";
  return "";
}

type Props = {
  tl: Timeline;
  editor: EditorState;
};

/**
 * Tooltips and dropdown cards of the toolbar and header buttons (steps 45 to 64), drawn in DocEditor's `toolLayer`.
 * Scene variables: `tip` (the data-tl name of the button whose tooltip shows, "" = none) and `toolMenu` (which card is open:
 * "zoom" | "style" | "font" | "size" | "color" | "highlight" | "spacing" | "bullets" | "numbers" | "table" | "mode" | "meet" |
 * "meetjoin" | "apps"), plus `zoomPct`, `tablePick`, `field:meet-code` and `meetFocus`. Rows are hooked `tm-<card>-<id>`.
 * Copy and options live in toolbar-data.ts; the timeline helpers are in toolbar-timeline.ts.
 */
export function ToolbarLayer({ tl, editor }: Props) {
  const tip = useTimelineVar<string>(tl, "tip", "");
  const menu = useTimelineVar<string>(tl, "toolMenu", "");
  const zoomPct = useTimelineVar(tl, "zoomPct", 100);
  const mode = useTimelineVar<EditorMode>(tl, "mode", "editing");
  const text = tipText(tip);

  return (
    <>
      <Anchored to={tip || "tool-print"} show={!!tip && !!text && menu === ""} deps={text} align="left">
        <div data-tl="tooltip" className="whitespace-nowrap rounded-[4px] bg-[#111] px-[7px] py-[3.5px] text-[9px] font-medium leading-[1.2] text-white shadow-[0_3px_10px_-3px_rgba(0,0,0,0.4)]">
          {text}
        </div>
      </Anchored>

      <Anchored to="tool-zoom" show={menu === "zoom"}>
        <div data-tl="menu-zoom" className={`${CARD} w-[78px]`}>
          {ZOOM_OPTIONS.map((z) => (
            <div key={z} data-tl={`tm-zoom-${z}`} className={ROW}>
              <span className="w-[10px] shrink-0">{z === zoomPct && <Icon name="check" size={9} />}</span>
              {z}%
            </div>
          ))}
        </div>
      </Anchored>

      <StyleCard open={menu === "style"} current={styleLabelOf(editor)} />
      <FontCard open={menu === "font"} current={formatValueAt(editor, "font") ?? FONT_MENU.default} />

      <Anchored to="tool-size" show={menu === "size"}>
        <div data-tl="menu-size" className={`${CARD} w-[52px]`}>
          {SIZE_OPTIONS.map((n) => (
            <div key={n} data-tl={`tm-size-${n}`} className={`${ROW} justify-center`}>
              {n}
            </div>
          ))}
        </div>
      </Anchored>

      <PaletteCard open={menu === "color"} anchor="tool-color" id="color" title={COLOR_MENU.textTitle} rows={TEXT_COLORS} none={COLOR_MENU.reset} />
      <PaletteCard open={menu === "highlight"} anchor="tool-highlight" id="highlight" title={COLOR_MENU.highlightTitle} rows={HIGHLIGHT_COLORS} none={COLOR_MENU.resetHighlight} />

      <Anchored to="tool-spacing" show={menu === "spacing"}>
        <div data-tl="menu-spacing" className={`${CARD} w-[190px]`}>
          {SPACING_MENU.options.map((o) => (
            <div key={o.value} data-tl={`tm-spacing-${o.label.toLowerCase().replace(".", "")}`} className={ROW}>
              <span className="w-[10px] shrink-0">{(activeBlock(editor)?.spacing ?? SPACING_MENU.default) === o.value && <Icon name="check" size={9} />}</span>
              {o.label}
            </div>
          ))}
          <div className="mx-[8px] my-[3px] h-px bg-[#EEEEF1]" />
          {SPACING_MENU.extras.map((e) => (
            <div key={e} className={`${ROW} whitespace-nowrap pl-[23px] text-[#AEB2BC]`}>
              {e}
            </div>
          ))}
        </div>
      </Anchored>

      <Anchored to="tool-bullets" show={menu === "bullets"}>
        <div data-tl="menu-bullets" className={`${CARD} w-[130px]`}>
          {LIST_MENU.bullets.map((o) => (
            <div key={o.id} data-tl={`tm-bullets-${o.id}`} className={ROW}>
              {o.label}
            </div>
          ))}
        </div>
      </Anchored>

      <Anchored to="tool-numbers" show={menu === "numbers"}>
        <div data-tl="menu-numbers" className={`${CARD} w-[110px]`}>
          {LIST_MENU.numbers.map((o) => (
            <div key={o.id} data-tl={`tm-numbers-${o.id}`} className={ROW}>
              {o.label}
            </div>
          ))}
        </div>
      </Anchored>

      <TableCard tl={tl} open={menu === "table"} />

      <Anchored to="tool-pen-menu" show={menu === "mode"} align="right">
        <div data-tl="menu-mode" className={`${CARD} w-[190px]`}>
          {MODE_DROPDOWN.map((m) => (
            <div key={m.id} data-tl={`tm-mode-${m.id}`} className={`${ROW} h-[34px] items-start py-[5px]`}>
              <span className="mt-[2px] w-[10px] shrink-0">{m.id === mode && <Icon name="check" size={9} />}</span>
              <span className="leading-[12px]">
                <span className="block font-medium">{m.label}</span>
                <span className="block text-[8.5px] text-[#8b909c]">{m.hint}</span>
              </span>
            </div>
          ))}
        </div>
      </Anchored>

      <MeetCards tl={tl} menu={menu} />
      <AppsCard open={menu === "apps"} />
    </>
  );
}

function StyleCard({ open, current }: { open: boolean; current: string }) {
  const rows = FORMAT_SUBMENUS.paragraph.flat();
  return (
    <Anchored to="tool-style" show={open}>
      <div data-tl="menu-style" className={`${CARD} w-[160px]`}>
        {rows.map((r, n) => {
          const label = STYLE_LABELS[r.id === "style-normal" ? 0 : (Number(r.id.slice(-1)) as 1 | 2 | 3 | 4 | 5 | 6)];
          return (
            <div key={r.id} data-tl={`tm-style-${r.id.slice(6)}`} className={`${ROW} ${n === 0 ? "" : ""}`} style={{ height: r.height }}>
              <span className="w-[10px] shrink-0">{label === current && <Icon name="check" size={9} />}</span>
              <span style={r.font ? { fontSize: r.font.size, fontWeight: r.font.weight } : undefined}>{r.label}</span>
            </div>
          );
        })}
      </div>
    </Anchored>
  );
}

function FontCard({ open, current }: { open: boolean; current: string }) {
  return (
    <Anchored to="tool-font" show={open}>
      <div data-tl="menu-font" className={`${CARD} w-[190px]`}>
        <div className="mx-[6px] mb-[3px] flex h-[24px] items-center gap-[5px] border-b border-[#EEEEF1] px-[3px] text-[9.5px] text-[#8b909c]">
          <Icon name="search" size={10} />
          {FONT_MENU.search}
        </div>
        <div className="h-[168px] overflow-hidden">
          {FONT_MENU.fonts.map((f) => (
            <div key={f} data-tl={`tm-font-${fontSlug(f)}`} className={ROW}>
              <span className="w-[10px] shrink-0">{f === current && <Icon name="check" size={9} />}</span>
              <span style={{ fontFamily: FONT_MENU.stacks[f], fontSize: 11 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </Anchored>
  );
}

function PaletteCard({ open, anchor, id, title, rows, none }: { open: boolean; anchor: string; id: string; title: string; rows: string[][]; none: string }) {
  return (
    <Anchored to={anchor} show={open}>
      <div data-tl={`menu-${id}`} className={`${CARD} w-[134px] px-[8px] pb-[6px] pt-[5px]`}>
        <p className="mb-[5px] text-[8.5px] font-medium uppercase tracking-wide text-[#8b909c]">{title}</p>
        <div className="flex flex-col gap-[4px]">
          {rows.map((row, r) => (
            <div key={r} className="flex gap-[4px]">
              {row.map((c, n) => (
                <span
                  key={c}
                  data-tl={`tm-${id}-${r}-${n}`}
                  className="h-[11px] w-[11px] rounded-full border border-black/10 transition-transform data-[hover=true]:scale-125"
                  style={{ background: c }}
                />
              ))}
            </div>
          ))}
        </div>
        <div data-tl={`tm-${id}-none`} className={`${ROW} -mx-[1px] mt-[6px] h-[20px] px-[5px] text-[9.5px]`}>
          {none}
        </div>
      </div>
    </Anchored>
  );
}

function TableCard({ tl, open }: { tl: Timeline; open: boolean }) {
  const pick = useTimelineVar<{ r: number; c: number } | null>(tl, "tablePick", null);
  return (
    <Anchored to="tool-table" show={open}>
      <div data-tl="menu-table" className={`${CARD} px-[8px] pb-[6px] pt-[7px]`}>
        <div className="flex flex-col gap-[2px]">
          {Array.from({ length: TABLE_PICKER.rows }, (_, r) => (
            <div key={r} className="flex gap-[2px]">
              {Array.from({ length: TABLE_PICKER.cols }, (_, c) => (
                <span
                  key={c}
                  data-tl={`tm-table-${r + 1}-${c + 1}`}
                  className={`h-[12px] w-[12px] rounded-[2px] border transition-colors ${
                    pick && r < pick.r && c < pick.c ? "border-[#2B6FEB] bg-[#DCE8FD]" : "border-[#D3D6DD] bg-white"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
        <p className="mt-[6px] text-center text-[9px] text-[#6b7280]">{pick ? TABLE_PICKER.label(pick.r, pick.c) : " "}</p>
      </div>
    </Anchored>
  );
}

function MeetCards({ tl, menu }: { tl: Timeline; menu: string }) {
  const code = useTimelineVar<string>(tl, "field:meet-code", "");
  const focus = useTimelineVar(tl, "meetFocus", false);
  return (
    <>
      <Anchored to="header-meet" align="right" show={menu === "meet"}>
        <div data-tl="menu-meet" className={`${CARD} w-[142px] whitespace-nowrap`}>
          {MEET.items.map((i) => (
            <div key={i.id} data-tl={`tm-meet-${i.id}`} className={ROW}>
              <Icon name={i.id === "start" ? "edCamera" : "link"} size={11} className="shrink-0 text-[#4b5060]" />
              {i.label}
            </div>
          ))}
        </div>
      </Anchored>
      <Anchored to="header-meet" align="right" show={menu === "meetjoin"}>
        <div data-tl="menu-meetjoin" className={`${CARD} w-[170px] px-[9px] pb-[9px] pt-[7px]`}>
          <p className="flex items-center gap-[5px] text-[10px] font-medium text-[#1f2430]">
            <span data-tl="meet-back" className="flex h-[14px] w-[14px] items-center justify-center rounded-full text-[#4b5060]">
              <Icon name="arrowLeft" size={10} />
            </span>
            {MEET.join.title}
          </p>
          <p className="mt-[5px] text-[8.5px] leading-[11px] text-[#6b7280]">{MEET.join.text}</p>
          <div
            data-tl="meet-code"
            className={`mt-[6px] flex h-[24px] items-center rounded-[5px] border px-[7px] text-[9.5px] transition-[border-color,box-shadow] duration-150 ${
              focus ? "border-[#2B6FEB] shadow-[0_0_0_1px_#2B6FEB]" : "border-[#D9DCE2]"
            }`}
          >
            {code ? <span className="text-[#1f2430]">{code}</span> : <span className="text-[#8b909c]">{MEET.join.placeholder}</span>}
            {focus && <i className="ml-px h-[11px] w-px shrink-0 bg-[#111]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
          </div>
          <div
            data-tl="meet-continue"
            className={`mx-auto mt-[8px] flex h-[22px] w-[78px] items-center justify-center rounded-full text-[9.5px] font-medium transition-colors duration-200 ${
              code ? "bg-[#2B6FEB] text-white" : "bg-[#F1F2F5] text-[#8b909c]"
            }`}
          >
            {MEET.join.continue}
          </div>
        </div>
      </Anchored>
    </>
  );
}

function AppsCard({ open }: { open: boolean }) {
  return (
    <Anchored to="header-apps" align="right" show={open}>
      <div data-tl="menu-apps" className={`${CARD} w-[156px] py-0`}>
        <p className="border-b border-[#EEEEF1] px-[10px] py-[7px] text-[10px] font-medium text-[#1f2430]">{APPS.title}</p>
        <div data-tl="apps-scroll" className="no-scrollbar grid h-[170px] grid-cols-3 content-start gap-x-[2px] gap-y-[2px] overflow-y-auto px-[6px] py-[7px]">
          {APPS.tiles.map((a) => (
            <div
              key={a.id}
              data-tl={`app-${a.id}`}
              className={`flex flex-col items-center gap-[3px] rounded-[7px] px-[2px] py-[5px] text-[8.5px] text-[#3d4350] transition-colors data-[hover=true]:bg-[#F1F2F5] ${a.current ? "bg-[#EEF3FD]" : ""}`}
            >
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#F1F2F5]">
                <ProductLogo name={a.logo} size={15} />
              </span>
              {a.label}
            </div>
          ))}
        </div>
      </div>
    </Anchored>
  );
}
