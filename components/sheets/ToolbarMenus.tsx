"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Anchored } from "@/components/docs/Anchored";
import { Icon, ProductLogo, type IconName } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { formatCurrency } from "./number-format";
import { obj, type CellObj } from "./grid-state";
import { BlueButton, CloseX, ShDialog, ShField } from "./parts";
import {
  BORDER_ICONS,
  BORDER_STYLES,
  COLORS,
  CURRENCY_CUSTOM_LABEL,
  CURRENCY_QUICK,
  CUSTOM_CURRENCIES,
  CUSTOM_CURRENCY,
  DEFAULT_FONT,
  DEFAULT_SIZE,
  FONTS,
  FONT_CSS,
  FONT_SIZES,
  FUNCTIONS_ALL,
  FUNCTIONS_QUICK,
  FUNCTION_CATEGORIES,
  HALIGN_ROWS,
  HEADER_APPS,
  HEADER_COPY,
  MERGE_ROWS,
  NUMBER_FORMATS,
  PALETTE,
  ROTATE_ROWS,
  TOOL_TIPS,
  VALIGN_ROWS,
  WRAP_ROWS,
  ZOOM_CHOICES,
} from "./toolbar-data";

/*
 * The toolbar's dropdown cards, the tooltip bubble and the header-tool popovers (steps 85-116). They live in the editor's `tool-layer`
 * and hang under their button with Anchored, so they hold under the scene scaling and the narrow zoom. Scene variables (all off by default):
 * `tbMenu` (the open dropdown), `tbSub` (its open submenu), `tbTip` (the tool whose tooltip shows), `hdrMenu` (apps | video | lock | account),
 * `tbCollapsed`, `borderStyle`, `borderColor`, `dialog` = "currency" | "meet" | "join". Rows are [data-tl=tm-<menu>-<id>].
 */

const card = "rounded-[8px] border border-[#E6E8EC] bg-white py-[6px] text-[13px] text-[#3C4043] shadow-[0_8px_28px_-6px_rgba(17,24,39,0.24)]";
const row = "flex items-center gap-[10px] px-[14px] py-[6px] transition-colors data-[hover=true]:bg-[#F1F3F4]";
const on = "bg-[#F3EDFC] text-[#6B21C8]";

/** Like Anchored, but the card opens to the side of the element (the Functions category lists). */
function SideAnchored({ to, show, children }: { to: string; show: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  useLayoutEffect(() => {
    const self = ref.current;
    const layer = self?.parentElement;
    if (!self || !layer || !show) return;
    const target = (layer.closest("[data-scroller]") ?? document).querySelector(`[data-tl="${to}"]`);
    if (!target) return;
    const l = layer.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    const w = (self.getBoundingClientRect().width / l.width) * 100;
    const h = (self.getBoundingClientRect().height / l.height) * 100;
    const left = Math.max(0.6, ((t.left - l.left) / l.width) * 100 - w - 0.4);
    const top = Math.max(0.6, Math.min(((t.top - l.top) / l.height) * 100 - 1, 99.4 - h));
    setPos({ left, top });
  }, [to, show, children]);
  return (
    <div ref={ref} aria-hidden={!show} className={`absolute w-max transition-opacity duration-150 motion-reduce:transition-none ${show ? "opacity-100" : "opacity-0"}`} style={{ left: `${pos?.left ?? 0}%`, top: `${pos?.top ?? 0}%` }}>
      {children}
    </div>
  );
}

const Tick = () => <Icon name="check" size={13} className="ml-auto shrink-0 text-[#6B21C8]" />;

export function ToolbarLayer({ tl, cell, zoom }: { tl: Timeline; cell: CellObj; zoom: number }) {
  const menu = useTimelineVar<string>(tl, "tbMenu", "");
  const sub = useTimelineVar<string>(tl, "tbSub", "");
  const tip = useTimelineVar<string>(tl, "tbTip", "");
  const hdr = useTimelineVar<string>(tl, "hdrMenu", "");
  const bStyle = useTimelineVar<string>(tl, "borderStyle", "solid");
  const bColor = useTimelineVar<string>(tl, "borderColor", "#000000");
  const mark = (v: boolean) => (v ? on : "");
  const code = cell.nf?.startsWith("currency:") ? cell.nf.slice(9) : "USD";

  return (
    <div data-tl="tool-layer" className="pointer-events-none absolute inset-0 z-[35] text-left">
      {/* Tooltip */}
      <Anchored to={tip.startsWith("hdr-") ? tip : `tool-${tip || "undo"}`} align="center" show={!!tip && !menu && !hdr} deps={tip}>
        <div data-tl="tool-tip" className="whitespace-nowrap rounded-[5px] bg-[#2B2D31] px-[10px] py-[5px] text-[12px] text-white">{TOOL_TIPS[tip] ?? ""}</div>
      </Anchored>

      {/* Zoom */}
      <Anchored to="tool-zoom" show={menu === "zoom"}>
        <div data-tl="tm-zoom" className={`${card} w-[120px]`}>
          {ZOOM_CHOICES.map((z) => (
            <div key={z} data-tl={`tm-zoom-${z}`} className={`${row} ${mark(z === zoom)}`}>{z}%{z === zoom && <Tick />}</div>
          ))}
        </div>
      </Anchored>

      {/* Currency */}
      <Anchored to="tool-currency" show={menu === "currency"}>
        <div data-tl="tm-currency" className={`${card} w-[250px]`}>
          {CURRENCY_QUICK.map((c) => (
            <div key={c} data-tl={`tm-currency-${c}`} className={`${row} justify-between ${c === code ? "text-[#2D5FB8]" : ""}`}>
              <span>{formatCurrency(0, c).replace(/[\d.,\s]/g, "")} {c}</span>
              <span className="text-[12px] text-[#80868B]">{formatCurrency(1000.12, c)}</span>
            </div>
          ))}
          <div className="my-[5px] border-t border-[#E8EAED]" />
          <div data-tl="tm-currency-custom" className={row}>{CURRENCY_CUSTOM_LABEL}</div>
        </div>
      </Anchored>

      {/* More formats */}
      <Anchored to="tool-formats" show={menu === "formats"}>
        <div data-tl="tm-formats" className={`${card} w-[190px]`}>
          {NUMBER_FORMATS.map((f) => {
            const current = f.id === "currency:GBP" ? !!cell.nf?.startsWith("currency:") : f.id === (cell.nf ?? (cell.num !== undefined ? "number" : "automatic"));
            return (
              <div key={f.id} data-tl={`tm-formats-${f.id.replace(":", "-")}`} className={`${row} ${mark(current)}`}>{f.label}</div>
            );
          })}
        </div>
      </Anchored>

      {/* Font */}
      <Anchored to="tool-font" show={menu === "font"}>
        <div data-tl="tm-font" className={`${card} max-h-[290px] w-[220px] overflow-y-auto`} data-scroll-panel>
          {FONTS.map((f) => (
            <div key={f} data-tl={`tm-font-${f.replace(/\s+/g, "-").toLowerCase()}`} className={`${row} ${mark(f === (cell.font ?? DEFAULT_FONT))}`} style={{ fontFamily: FONT_CSS[f] }}>{f}</div>
          ))}
        </div>
      </Anchored>

      {/* Font size */}
      <Anchored to="tool-size" align="center" show={menu === "size"}>
        <div data-tl="tm-size" className={`${card} max-h-[220px] w-[64px] overflow-y-auto`}>
          {FONT_SIZES.map((n) => (
            <div key={n} data-tl={`tm-size-${n}`} className={`${row} ${mark(n === (cell.size ?? DEFAULT_SIZE))}`}>{n}</div>
          ))}
        </div>
      </Anchored>

      {/* Text colour and fill colour */}
      {(["textcolor", "highlight"] as const).map((id) => (
        <Anchored key={id} to={`tool-${id}`} show={menu === id}>
          <div data-tl={`tm-${id}`} className={`${card} w-[236px] px-[10px]`}>
            <div data-tl={`tm-${id}-reset`} className="mb-[6px] flex items-center gap-[8px] rounded-[5px] px-[4px] py-[5px] text-[12.5px] data-[hover=true]:bg-[#F1F3F4]"><Icon name="x" size={12} />{COLORS.reset}</div>
            <Palette menu={id} current={id === "textcolor" ? cell.color : cell.fill} />
            <div data-tl={`tm-${id}-custom`} className="mt-[6px] flex items-center gap-[8px] rounded-[5px] px-[4px] py-[5px] text-[12.5px] data-[hover=true]:bg-[#F1F3F4]"><Icon name="plus" size={12} />{COLORS.custom}</div>
          </div>
        </Anchored>
      ))}

      {/* Borders */}
      <Anchored to="tool-borders" show={menu === "borders"}>
        <div data-tl="tm-borders" className={`${card} w-[236px] px-[10px]`}>
          {BORDER_ICONS.map((line, i) => (
            <div key={i} className={`flex items-center ${i ? "mt-[6px] border-t border-[#E8EAED] pt-[8px]" : "pb-[2px]"}`}>
              <div className="flex gap-[4px]">
                {line.map((b) => (
                  <span key={b.id} data-tl={`tm-borders-${b.id}`} title={b.label} className="flex h-[28px] w-[28px] items-center justify-center rounded-[5px] transition-colors data-[hover=true]:bg-[#F1F3F4]"><BorderGlyph id={b.id} /></span>
                ))}
              </div>
              <span className="mx-[6px] h-[22px] w-px bg-[#E8EAED]" />
              {i === 0 ? (
                <span data-tl="tm-borders-colorbtn" className="flex h-[28px] items-center gap-[2px] rounded-[5px] px-[4px] data-[hover=true]:bg-[#F1F3F4]"><Icon name="pencil" size={15} /><i className="h-[3px] w-[10px]" style={{ background: bColor }} /><Icon name="chevronDown" size={8} /></span>
              ) : (
                <span data-tl="tm-borders-stylebtn" className="flex h-[28px] items-center gap-[2px] rounded-[5px] px-[4px] data-[hover=true]:bg-[#F1F3F4]"><LineGlyph style={bStyle} /><Icon name="chevronDown" size={8} /></span>
              )}
            </div>
          ))}
        </div>
      </Anchored>
      <Anchored to="tm-borders-stylebtn" show={menu === "borders" && sub === "style"}>
        <div data-tl="tm-borders-styles" className={`${card} w-[150px]`}>
          {BORDER_STYLES.map((b) => (
            <div key={b.id} data-tl={`tm-borders-style-${b.id}`} className={`${row} gap-[8px] ${mark(b.id === bStyle)}`}><LineGlyph style={b.id} wide />{b.id === bStyle && <Tick />}</div>
          ))}
        </div>
      </Anchored>
      <Anchored to="tm-borders-colorbtn" show={menu === "borders" && sub === "color"}>
        <div data-tl="tm-borders-colors" className={`${card} w-[236px] px-[10px]`}>
          <Palette menu="borders-color" current={bColor} />
        </div>
      </Anchored>

      {/* Merge, alignment, wrapping, rotation */}
      {([
        ["merge", MERGE_ROWS, 180],
        ["halign", HALIGN_ROWS, 150],
        ["valign", VALIGN_ROWS, 150],
        ["wrap", WRAP_ROWS, 150],
        ["rotate", ROTATE_ROWS, 160],
      ] as const).map(([id, rows, w]) => (
        <Anchored key={id} to={`tool-${id}`} show={menu === id}>
          <div data-tl={`tm-${id}`} className={card} style={{ width: w }}>
            {rows.map((r) => {
              const current = id === "halign" ? r.id === (cell.align ?? "left") : id === "valign" ? r.id === (cell.valign ?? "bottom") : id === "wrap" ? r.id === (cell.wrap ?? "overflow") : id === "rotate" ? r.id === (cell.rotate ?? "none") : false;
              return <div key={r.id} data-tl={`tm-${id}-${r.id}`} className={`${row} ${mark(current)}`}>{r.label}</div>;
            })}
          </div>
        </Anchored>
      ))}

      {/* Functions */}
      <Anchored to="tool-functions" align="right" show={menu === "functions"}>
        <div data-tl="tm-functions" className={`${card} w-[190px]`}>
          {FUNCTIONS_QUICK.map((f) => (
            <div key={f} data-tl={`tm-functions-${f}`} className={row}>{f}</div>
          ))}
          <div className="my-[5px] border-t border-[#E8EAED]" />
          <div data-scroll-panel data-tl="tm-functions-cats" className="max-h-[178px] overflow-y-auto">
            {[{ id: "all", label: "All" }, ...FUNCTION_CATEGORIES].map((c) => (
              <div key={c.id} data-tl={`tm-functions-cat-${c.id}`} className={`${row} justify-between ${sub === c.id ? "bg-[#F1F3F4]" : ""}`}>{c.label}<Icon name="chevronRight" size={10} className="text-[#80868B]" /></div>
            ))}
          </div>
        </div>
      </Anchored>
      <SideAnchored to={`tm-functions-cat-${sub || "all"}`} show={menu === "functions" && !!sub}>
        <div data-tl="tm-fnlist" data-scroll-panel className={`${card} max-h-[300px] w-[170px] overflow-y-auto`}>
          {(sub === "all" ? FUNCTIONS_ALL : FUNCTION_CATEGORIES.find((c) => c.id === sub)?.fns ?? []).map((f) => (
            <div key={f} data-tl={`tm-fn-${f}`} className={`${row} py-[5px] text-[12.5px]`}>{f}</div>
          ))}
        </div>
      </SideAnchored>

      {/* More: the tools tucked away when the toolbar is collapsed */}
      <Anchored to="tool-more" align="right" show={menu === "more"}>
        <div data-tl="tm-more" className={`${card} flex w-[246px] flex-wrap gap-[4px] px-[10px] py-[8px]`}>
          {MORE_TOOLS.map((t) => (
            <span key={t.id} data-tl={`tm-more-${t.id}`} title={TOOL_TIPS[t.id]} className="flex h-[30px] w-[34px] items-center justify-center rounded-[5px] text-[#444746] transition-colors data-[hover=true]:bg-[#F1F3F4]"><Icon name={t.icon} size={17} />{t.caret && <Icon name="chevronDown" size={8} />}</span>
          ))}
        </div>
      </Anchored>

      {/* Header tools */}
      <Anchored to="hdr-apps" align="right" show={hdr === "apps"}>
        <div data-tl="tm-apps" className={`${card} w-[272px] p-[14px]`}>
          <p className="mb-[10px] text-[12px] font-medium text-[#5F6368]">{HEADER_COPY.appsTitle}</p>
          <div className="grid grid-cols-3 gap-[6px]">
            {HEADER_APPS.map((a) => (
              <span key={a.id} data-tl={`tm-apps-${a.id}`} className={`relative flex flex-col items-center gap-[5px] rounded-[8px] px-[4px] py-[8px] text-center text-[11.5px] leading-[14px] transition-colors data-[hover=true]:bg-[#F1F3F4] ${a.id === "sheets" ? "bg-[#F3EDFC] text-[#6B21C8]" : ""}`}>
                <ProductLogo name={a.logo} size={34} className="rounded-[8px]" />
                {a.name}
                {a.id === "sheets" && <span className="text-[10px] font-medium text-[#6B21C8]">{HEADER_COPY.current}</span>}
              </span>
            ))}
          </div>
        </div>
      </Anchored>
      <Anchored to="hdr-video" align="right" show={hdr === "video"}>
        <div data-tl="tm-video" className={`${card} w-[190px]`}>
          <div data-tl="tm-video-start" className={row}><Icon name="edCamera" size={15} />{HEADER_COPY.meetStart}</div>
          <div data-tl="tm-video-join" className={row}><Icon name="link" size={15} />{HEADER_COPY.meetJoin}</div>
        </div>
      </Anchored>
      <Anchored to="hdr-lock" align="right" show={hdr === "lock"}>
        <div data-tl="tm-lock" className={`${card} w-[270px] p-[14px]`}>
          <p className="flex items-center gap-[8px] text-[13.5px] font-medium text-[#1f2430]"><Icon name="lock" size={15} />{HEADER_COPY.lock.title}</p>
          <p className="mt-[6px] text-[12.5px] leading-[17px] text-[#5F6368]">{HEADER_COPY.lock.text}</p>
          <span data-tl="tm-lock-change" className="mt-[10px] inline-block text-[12.5px] font-medium text-[#2563EB] data-[hover=true]:underline">{HEADER_COPY.lock.change}</span>
        </div>
      </Anchored>
      <Anchored to="hdr-avatar" align="right" show={hdr === "account"}>
        <div data-tl="tm-account" className={`${card} w-[270px] py-[12px]`}>
          <div className="flex flex-col items-center px-[14px] pb-[10px]">
            <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#7014D9] text-[16px] font-medium text-white">{HEADER_COPY.account.initials}</span>
            <p data-tl="tm-account-name" className="mt-[8px] text-[14px] font-medium text-[#1f2430]">{HEADER_COPY.account.name}</p>
            <p className="text-[12px] text-[#5F6368]">{HEADER_COPY.account.email}</p>
          </div>
          <div className="border-t border-[#E8EAED] pt-[4px]">
            <div data-tl="tm-account-manage" className={row}><Icon name="user" size={15} />{HEADER_COPY.account.manage}</div>
            <div data-tl="tm-account-signout" className={row}><Icon name="logout" size={15} />{HEADER_COPY.account.signOut}</div>
          </div>
        </div>
      </Anchored>
    </div>
  );
}

/** Tools that move into the More (⋮) card when the toolbar is collapsed (from Borders on). */
export const MORE_TOOLS: { id: string; icon: IconName; caret?: boolean }[] = [
  { id: "borders", icon: "edTable", caret: true },
  { id: "merge", icon: "shMerge", caret: true },
  { id: "halign", icon: "edAlignL", caret: true },
  { id: "valign", icon: "shAlignV", caret: true },
  { id: "wrap", icon: "shWrap", caret: true },
  { id: "rotate", icon: "shRotate", caret: true },
  { id: "link", icon: "edLink" },
  { id: "comment", icon: "edComment" },
  { id: "chart", icon: "shChart" },
  { id: "filter", icon: "shFilter" },
  { id: "functions", icon: "shSigma", caret: true },
];

/** The colour grid. Swatches are [data-tl=tm-<menu>-<hex without #>]. */
function Palette({ menu, current }: { menu: string; current?: string }) {
  return (
    <div className="flex flex-col gap-[3px]">
      {PALETTE.map((line, i) => (
        <div key={i} className="flex gap-[3px]">
          {line.map((c) => (
            <span
              key={c.hex}
              data-tl={`tm-${menu}-${c.hex.slice(1).toLowerCase()}`}
              title={c.name}
              className={`relative flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[#D5D8DD] transition-transform data-[hover=true]:scale-125 ${current?.toLowerCase() === c.hex.toLowerCase() ? "ring-2 ring-[#2563EB] ring-offset-1" : ""}`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function LineGlyph({ style, wide = false }: { style: string; wide?: boolean }) {
  const dash = style === "dotted" ? "1 2" : style === "dashed" ? "4 2" : undefined;
  const w = style === "thick" ? 3 : style === "medium" ? 2 : 1;
  return (
    <svg width={wide ? 96 : 20} height="10" viewBox={wide ? "0 0 96 10" : "0 0 20 10"} aria-hidden="true">
      <line x1="1" x2={wide ? 95 : 19} y1="5" y2="5" stroke="#3C4043" strokeWidth={style === "double" ? 1 : w} strokeDasharray={dash} />
      {style === "double" && <line x1="1" x2={wide ? 95 : 19} y1="8" y2="8" stroke="#3C4043" strokeWidth="1" />}
    </svg>
  );
}

/** A small drawing of what each border choice does to a cell block. */
function BorderGlyph({ id }: { id: string }) {
  const grey = "#9AA0A6";
  const dark = "#202124";
  const edge = (side: string) => (["all", "outer"].includes(id) || id === side ? dark : grey);
  const dash = (on: boolean) => (on ? undefined : "1.5 1.5");
  const mid = ["all", "inner"].includes(id);
  const h = ["all", "inner", "horizontal"].includes(id);
  const v = ["all", "inner", "vertical"].includes(id);
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <line x1="2" y1="2" x2="16" y2="2" stroke={edge("top")} strokeWidth="1.4" strokeDasharray={dash(["all", "outer", "top"].includes(id))} />
      <line x1="2" y1="16" x2="16" y2="16" stroke={edge("bottom")} strokeWidth="1.4" strokeDasharray={dash(["all", "outer", "bottom"].includes(id))} />
      <line x1="2" y1="2" x2="2" y2="16" stroke={edge("left")} strokeWidth="1.4" strokeDasharray={dash(["all", "outer", "left"].includes(id))} />
      <line x1="16" y1="2" x2="16" y2="16" stroke={edge("right")} strokeWidth="1.4" strokeDasharray={dash(["all", "outer", "right"].includes(id))} />
      <line x1="2" y1="9" x2="16" y2="9" stroke={h ? dark : grey} strokeWidth="1.2" strokeDasharray={dash(h || mid)} />
      <line x1="9" y1="2" x2="9" y2="16" stroke={v ? dark : grey} strokeWidth="1.2" strokeDasharray={dash(v || mid)} />
      {id === "clear" && <path d="M5 5l8 8M13 5l-8 8" stroke="#C5221F" strokeWidth="1.3" strokeLinecap="round" />}
    </svg>
  );
}

/* ---------------- Dialogs: Custom currencies, Meeting started, Join with link ---------------- */

/** Format > Currency > Custom currency...: a searchable list inside a dialog. Variables: `dialog` = "currency", `field:cur-search`, `curPick` (code). Hooks: cur-dialog, field-cur-search, cur-list, cur-row-<code>, cur-apply, cur-close, cur-sample. */
export function CurrencyDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "currency";
  const q = useTimelineVar<string>(tl, "field:cur-search", "");
  const pick = useTimelineVar<string>(tl, "curPick", "USD");
  const list = CUSTOM_CURRENCIES.filter((c) => !q || `${c.name} ${c.code}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <ShDialog open={open} width={420} hook="cur-dialog">
      <div className="flex max-h-[440px] flex-col text-[#1f2430]">
        <div className="flex shrink-0 items-center justify-between px-[16px] pb-[8px] pt-[14px]">
          <h2 className="text-[14px] font-semibold">{CUSTOM_CURRENCY.title}</h2>
          <CloseX id="cur" />
        </div>
        <div className="flex shrink-0 items-center gap-[10px] px-[16px] pb-[10px]">
          <div className="min-w-0 flex-1"><ShField tl={tl} id="cur-search" placeholder={CUSTOM_CURRENCY.search} className="!h-[32px] !text-[12.5px]" /></div>
          <span data-tl="cur-sample" className="flex h-[32px] w-[96px] items-center justify-center rounded-[6px] border border-[#DADCE0] text-[12.5px]">{formatCurrency(CUSTOM_CURRENCY.sample, pick)}</span>
          <span data-tl="cur-apply" className="flex h-[32px] items-center rounded-[6px] bg-[#188038] px-[16px] text-[13px] font-medium text-white transition-[transform,filter] data-[hover=true]:brightness-90 data-[pressed=true]:scale-95">{CUSTOM_CURRENCY.apply}</span>
        </div>
        <div data-tl="cur-list" data-scroll-panel className="min-h-0 flex-1 overflow-y-auto border-t border-[#E8EAED] pb-[6px]">
          {list.map((c) => (
            <div key={c.code} data-tl={`cur-row-${c.code}`} className={`flex items-center justify-between px-[16px] py-[7px] text-[12.5px] transition-colors data-[hover=true]:bg-[#F1F3F4] ${pick === c.code ? "bg-[#E8F0FE]" : ""}`}>
              <span>{c.name}</span>
              <span className="text-[11.5px] text-[#80868B]">{formatCurrency(CUSTOM_CURRENCY.listSample, c.code)}</span>
            </div>
          ))}
          {list.length === 0 && <p className="px-[16px] py-[18px] text-[12.5px] text-[#80868B]">{CUSTOM_CURRENCY.empty}</p>}
        </div>
      </div>
    </ShDialog>
  );
}

/** "Meeting started" (Start new meeting) and "Have a meeting code?" (Join with link). Variables: `dialog` = "meet" | "join", `meetCopied`, `field:join`. Hooks: meet-dialog, meet-link, meet-copy, meet-done, join-dialog, field-join, join-continue, join-back. */
export function MeetingDialogs({ tl }: { tl: Timeline }) {
  const dlg = useTimelineVar<string>(tl, "dialog", "");
  const copied = useTimelineVar(tl, "meetCopied", false);
  const code = useTimelineVar<string>(tl, "field:join", "");
  const M = HEADER_COPY.meetDialog;
  const J = HEADER_COPY.joinDialog;
  return (
    <>
      <ShDialog open={dlg === "meet"} width={400} hook="meet-dialog">
        <div className="p-[20px] text-[#1f2430]">
          <div className="flex items-start justify-between">
            <h2 className="text-[15px] font-semibold">{M.title}</h2>
            <CloseX id="meet" />
          </div>
          <p className="mt-[4px] text-[12.5px] text-[#5F6368]">{M.text}</p>
          <div className="mt-[14px] flex items-center gap-[8px]">
            <span data-tl="meet-link" className="flex h-[36px] min-w-0 flex-1 items-center truncate rounded-[8px] border border-[#DADCE0] bg-[#F8F9FA] px-[11px] text-[12.5px]">{M.link}</span>
            <BlueButton hook="meet-copy">{copied ? M.copied : M.copy}</BlueButton>
          </div>
          <div className="mt-[16px] flex justify-end"><span data-tl="meet-done" className="flex h-[34px] items-center rounded-[7px] px-[14px] text-[13px] font-medium text-[#1C3F94] data-[hover=true]:bg-[#F1F3F4] data-[pressed=true]:scale-95">{M.done}</span></div>
        </div>
      </ShDialog>
      <ShDialog open={dlg === "join"} width={340} hook="join-dialog">
        <div className="p-[18px] text-[#1f2430]">
          <div className="flex items-center gap-[10px]">
            <span data-tl="join-back" className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[#4b5060] data-[hover=true]:bg-[#F1F3F4]"><Icon name="chevronLeft" size={14} /></span>
            <h2 className="text-[14.5px] font-semibold">{J.title}</h2>
          </div>
          <p className="mt-[8px] text-[12.5px] leading-[17px] text-[#5F6368]">{J.text}</p>
          <div className="mt-[12px]"><ShField tl={tl} id="join" placeholder={J.placeholder} /></div>
          <div className="mt-[14px] flex justify-end"><BlueButton hook="join-continue" disabled={!code}>{J.button}</BlueButton></div>
        </div>
      </ShDialog>
    </>
  );
}

/** The font / size / format labels the toolbar boxes show for the selected cell. */
export function toolLabels(cell: CellObj) {
  const o = obj(cell);
  return { font: o.font ?? DEFAULT_FONT, size: String(o.size ?? DEFAULT_SIZE) };
}
