"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BG_COLOURS, PALETTES, SERIES_COLOURS, TITLE_COLOURS, type ChartState } from "./chart-state";
import { CHART } from "./insert-data";
import { BLUE, ShField, Tick } from "./parts";

type Opt = { id: string; label: string; dot?: string };

/** Panel width: a little wider than the File details and Comments panels (the Customize tab needs the room). */
export const CHART_PANEL_W = 300;

const field = "flex h-[30px] w-full items-center justify-between rounded-[6px] border border-[#DADCE0] bg-white px-[9px] text-[12px] text-[#202124] transition-colors";

/** A select box: the trigger is `cs-<id>`, the open list is `cd-<id>-<option>` (the scene variable `chartDrop` holds the open one). */
function Sel({ id, value, options, open, dot, className = "" }: { id: string; value: string; options: Opt[]; open: boolean; dot?: string; className?: string }) {
  const label = options.find((o) => o.id === value)?.label ?? value;
  return (
    <div className={`relative ${className}`}>
      <div data-tl={`cs-${id}`} className={`${field} data-[hover=true]:bg-[#F8F9FA] ${open ? "border-[#2563EB]" : ""}`}>
        <span className="flex min-w-0 items-center gap-[6px]">
          {dot !== undefined && <i className="inline-block h-[12px] w-[12px] shrink-0 rounded-full border border-[#DADCE0]" style={{ background: dot }} />}
          <span className="truncate">{label}</span>
        </span>
        <Icon name="chevronDown" size={9} className="shrink-0 text-[#202124]" />
      </div>
      {open && (
        <div data-tl={`cs-list-${id}`} className="absolute left-0 top-[32px] z-30 w-full min-w-[120px] overflow-hidden rounded-[6px] border border-[#DADCE0] bg-white py-[3px] shadow-[0_6px_18px_-4px_rgba(17,24,39,0.3)]">
          {options.map((o) => (
            <div key={o.id} data-tl={`cd-${id}-${o.id.replace("#", "")}`} className={`flex h-[26px] items-center gap-[7px] px-[9px] text-[12px] transition-colors data-[hover=true]:bg-[#2563EB] data-[hover=true]:text-white ${o.id === value ? "bg-[#E8F0FE]" : ""}`}>
              {o.dot !== undefined && <i className="inline-block h-[11px] w-[11px] rounded-full border border-[#DADCE0]" style={{ background: o.dot }} />}
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Label({ children }: { children: string }) {
  return <p className="mb-[3px] mt-[10px] text-[10.5px] text-[#5F6368]">{children}</p>;
}

function Fake({ value, className = "" }: { value: string; className?: string }) {
  return (
    <div className={`${field} ${className}`}>
      <span className="truncate">{value}</span>
      <Icon name="chevronDown" size={9} className="text-[#202124]" />
    </div>
  );
}

function Check({ id, on, label }: { id: string; on: boolean; label: string }) {
  return (
    <span data-tl={`cs-check-${id}`} className="flex items-center gap-[8px] py-[3px] text-[12px] text-[#202124]">
      <Tick on={on} />
      {label}
    </span>
  );
}

const colourOptions = (list: string[]): Opt[] => list.map((c) => ({ id: c.replace("#", ""), label: c === "auto" ? CHART.colourAuto : c.toUpperCase(), dot: c === "auto" ? "#FFFFFF" : c }));

/**
 * Insert > Chart: the Chart editor panel (Setup and Customize tabs). Scene variables: `chart` (see chart-state.ts), `chartPanel`
 * (open, handled by SheetsApp), `chartTab`, `chartAcc` (the open Customize section), `chartDrop` (the open select list),
 * `field:ct-chart` / `field:ct-h` / `field:ct-v` (the three titles). Hooks: chart-panel, chart-close, chart-tab-<id>, chart-scroll,
 * cs-<select>, cd-<select>-<option>, cs-series-<id>, cs-tick-<id>, cs-grip-<id>, cs-sec-<id>, cs-check-<id>, cs-palette-<n>,
 * cs-fmt-bold, cs-fmt-italic, cs-reset, chart-cancel, chart-insert.
 */
export function ChartEditor({ tl }: { tl: Timeline }) {
  const chart = useTimelineVar<ChartState | null>(tl, "chart", null);
  const tab = useTimelineVar(tl, "chartTab", "setup");
  const acc = useTimelineVar(tl, "chartAcc", "");
  const drop = useTimelineVar(tl, "chartDrop", "");
  if (!chart) return <div data-tl="chart-panel" className="h-full" style={{ width: CHART_PANEL_W }} />;
  const isOpen = (id: string) => drop === id;
  const ser = chart.series.find((s) => s.id === chart.seriesSel) ?? chart.series[0];

  return (
    <div data-tl="chart-panel" className="flex h-full flex-col bg-white text-[#1f2430]" style={{ width: CHART_PANEL_W }}>
      <div className="flex shrink-0 items-center justify-between px-[16px] pb-[6px] pt-[12px]">
        <h2 className="text-[14px] font-medium">{CHART.title}</h2>
        <span data-tl="chart-close" className="flex h-[22px] w-[22px] items-center justify-center rounded-full text-[#4b5060] data-[hover=true]:bg-[#F1F3F4]">
          <Icon name="x" size={14} />
        </span>
      </div>
      <div className="flex shrink-0 border-b border-[#E3E5EA] text-[12.5px]">
        {CHART.tabs.map((t) => (
          <span key={t.id} data-tl={`chart-tab-${t.id}`} className={`flex-1 border-b-2 py-[8px] text-center transition-colors data-[hover=true]:bg-[#F8F9FA] ${tab === t.id ? "font-medium text-[#1C3F94]" : "border-transparent text-[#5F6368]"}`} style={tab === t.id ? { borderColor: BLUE } : undefined}>
            {t.label}
          </span>
        ))}
      </div>

      <div data-tl="chart-scroll" className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-[16px] pb-[14px]">
        {tab === "setup" ? (
          <>
            <Label>{CHART.type}</Label>
            <Sel id="type" value={chart.type} options={CHART.types} open={isOpen("type")} />
            <Label>{CHART.stacking}</Label>
            <Sel id="stacking" value={chart.stacking} options={CHART.stackings} open={isOpen("stacking")} />
            <Label>{CHART.dataRange}</Label>
            <div data-tl="chart-range" className={`${field} justify-start`}>{chart.range}</div>
            <Label>{CHART.xAxis}</Label>
            <div data-tl="chart-xaxis" className={`${field} justify-start text-[#202124]`}>{chart.xAxis}</div>
            <Label>{CHART.series}</Label>
            <div className="flex flex-col gap-[6px]" data-tl="chart-series-list">
              {chart.series.map((s) => (
                <div key={s.id} data-tl={`cs-series-${s.id}`} className="flex h-[32px] items-center gap-[8px] rounded-[6px] border border-[#E3E5EA] bg-white px-[8px] text-[12px] transition-[transform,box-shadow] duration-200">
                  <span data-tl={`cs-grip-${s.id}`} className="text-[#9AA0A6]"><Icon name="shGrip" size={14} /></span>
                  <span data-tl={`cs-tick-${s.id}`}><Tick on={s.on} /></span>
                  <i className="inline-block h-[9px] w-[9px] rounded-full" style={{ background: PALETTES[chart.palette][chart.series.indexOf(s) % 6] }} />
                  <span className="flex-1">{s.label}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="pt-[4px]">
            {CHART.sections.map((sec) => {
              const openSec = acc === sec.id;
              return (
                <div key={sec.id} className="border-b border-[#F0F1F3]">
                  <div data-tl={`cs-sec-${sec.id}`} className="flex h-[36px] items-center gap-[8px] text-[13px] transition-colors data-[hover=true]:bg-[#F8F9FA]">
                    <Icon name="chevronRight" size={10} className={`text-[#5F6368] transition-transform ${openSec ? "rotate-90" : ""}`} />
                    {sec.label}
                  </div>
                  {openSec && (
                    <div className="pb-[12px] pl-[2px]">
                      {sec.id === "style" && (
                        <>
                          <div className="grid grid-cols-2 gap-[10px]">
                            <div>
                              <Label>{CHART.bgColor}</Label>
                              <Sel id="bg" value={chart.bg.replace("#", "")} options={colourOptions(BG_COLOURS)} open={isOpen("bg")} dot={chart.bg} />
                            </div>
                            <div>
                              <Label>{CHART.font}</Label>
                              <Sel id="font" value={chart.font} options={CHART.fonts} open={isOpen("font")} />
                            </div>
                          </div>
                          <Label>{CHART.border}</Label>
                          <div className={field}><span className="flex items-center gap-[6px]"><i className="inline-block h-[12px] w-[12px] rounded-full bg-[#5F6368]" /></span><Icon name="chevronDown" size={9} /></div>
                          <span data-tl="cs-reset" className="mt-[10px] inline-flex h-[28px] items-center rounded-[6px] border border-[#2563EB] px-[12px] text-[12px] text-[#1C3F94] data-[hover=true]:bg-[#E8F0FE] data-[pressed=true]:scale-95">{CHART.reset}</span>
                          <div className="mt-[8px]">
                            {CHART.flags.map((f) => <Check key={f.id} id={f.id} on={chart[f.id as "maximize" | "threeD" | "compare"]} label={f.label} />)}
                          </div>
                          <Label>{CHART.palette}</Label>
                          <div className="flex flex-col gap-[6px]">
                            {PALETTES.map((p, i) => (
                              <div key={i} data-tl={`cs-palette-${i}`} className={`flex h-[30px] items-center gap-[5px] rounded-[6px] border px-[8px] transition-colors data-[hover=true]:bg-[#F8F9FA] ${chart.palette === i ? "border-[#2563EB] bg-[#EEF3FE]" : "border-[#E3E5EA]"}`}>
                                {p.map((c) => <i key={c} className="inline-block h-[13px] w-[13px] rounded-full" style={{ background: c }} />)}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      {sec.id === "titles" && (
                        <>
                          <Sel id="titlekind" value={chart.titleKind} options={CHART.titleKinds} open={isOpen("titlekind")} className="mt-[6px]" />
                          <Label>{CHART.titleText}</Label>
                          {(["chart", "h", "v"] as const).map((k) => (chart.titleKind === k ? <ShField key={k} tl={tl} id={`ct-${k}`} placeholder={CHART.titlePlaceholders[k]} className="!h-[30px] !text-[12px]" /> : null))}
                          <div className="grid grid-cols-2 gap-[10px]">
                            <div><Label>{CHART.titleFont}</Label><Sel id="tfont" value={chart.titleFont} options={CHART.fonts} open={isOpen("tfont")} /></div>
                            <div><Label>{CHART.titleSize}</Label><Sel id="tsize" value={chart.titleSize} options={CHART.sizes} open={isOpen("tsize")} /></div>
                          </div>
                          <div className="grid grid-cols-2 gap-[10px]">
                            <div>
                              <Label>{CHART.titleFormat}</Label>
                              <div className="flex gap-[6px]">
                                <span data-tl="cs-fmt-bold" className={`flex h-[28px] w-[28px] items-center justify-center rounded-[5px] text-[13px] font-bold data-[hover=true]:bg-[#F1F3F4] ${chart.titleBold ? "bg-[#DDE7FB] text-[#1C3F94]" : ""}`}>B</span>
                                <span data-tl="cs-fmt-italic" className={`flex h-[28px] w-[28px] items-center justify-center rounded-[5px] text-[13px] italic data-[hover=true]:bg-[#F1F3F4] ${chart.titleItalic ? "bg-[#DDE7FB] text-[#1C3F94]" : ""}`} style={{ fontFamily: "Georgia, serif" }}>I</span>
                              </div>
                            </div>
                            <div>
                              <Label>{CHART.titleColor}</Label>
                              <Sel id="tcolor" value={chart.titleColor.replace("#", "")} options={colourOptions(TITLE_COLOURS)} open={isOpen("tcolor")} dot={chart.titleColor === "auto" ? "#FFFFFF" : chart.titleColor} />
                            </div>
                          </div>
                        </>
                      )}
                      {sec.id === "series" && ser && (
                        <>
                          <Sel id="sersel" value={ser.id} options={chart.series.map((s) => ({ id: s.id, label: s.label }))} open={isOpen("sersel")} dot={PALETTES[chart.palette][chart.series.indexOf(ser) % 6]} className="mt-[6px]" />
                          <p className="mt-[10px] text-[12px] text-[#202124]">{CHART.format}</p>
                          <div className="grid grid-cols-2 gap-[10px]">
                            <div><Label>{CHART.fillColor}</Label><Sel id="fill" value={(ser.fill ?? "auto").replace("#", "")} options={colourOptions(SERIES_COLOURS)} open={isOpen("fill")} dot={ser.fill && ser.fill !== "auto" ? ser.fill : PALETTES[chart.palette][chart.series.indexOf(ser) % 6]} /></div>
                            <div><Label>{CHART.fillOpacity}</Label><Sel id="fillop" value={String(ser.fillOpacity)} options={CHART.opacities} open={isOpen("fillop")} /></div>
                            <div><Label>{CHART.lineColor}</Label><Fake value={CHART.colourAuto} /></div>
                            <div><Label>{CHART.lineOpacity}</Label><Sel id="lineop" value={String(ser.lineOpacity)} options={CHART.opacities} open={isOpen("lineop")} /></div>
                            <div><Label>{CHART.dash}</Label><Fake value="————" /></div>
                            <div><Label>{CHART.thickness}</Label><Sel id="thick" value={String(ser.thickness)} options={CHART.thicknesses} open={isOpen("thick")} /></div>
                          </div>
                          <Label>{CHART.axis}</Label>
                          <Sel id="axis" value={ser.axis} options={CHART.axes} open={isOpen("axis")} className="w-[130px]" />
                          <div className="mt-[10px] flex items-center justify-between text-[12px] text-[#202124]"><span>{CHART.dataPoint}</span><span className="text-[#2563EB]">{CHART.add}</span></div>
                          <div className="mt-[6px]">
                            {CHART.checks.map((k) => <Check key={k.id} id={k.id} on={ser[k.id as "errorBars" | "dataLabels" | "trendline"]} label={k.label} />)}
                          </div>
                        </>
                      )}
                      {sec.id === "legend" && (
                        <>
                          <Label>{CHART.legendPos}</Label>
                          <Sel id="legend" value={chart.legend} options={CHART.legends} open={isOpen("legend")} />
                          <div className="grid grid-cols-2 gap-[10px]">
                            <div><Label>{CHART.labelFont}</Label><Fake value="Theme Default" /></div>
                            <div><Label>{CHART.labelSize}</Label><Fake value="Auto" /></div>
                          </div>
                        </>
                      )}
                      {(sec.id === "haxis" || sec.id === "vaxis") && (
                        <>
                          <div className="grid grid-cols-2 gap-[10px]">
                            <div><Label>{CHART.labelFont}</Label><Fake value="Theme Default" /></div>
                            <div><Label>{CHART.labelSize}</Label><Fake value="Auto" /></div>
                            <div><Label>{CHART.labelFormat}</Label><div className="flex gap-[10px] text-[13px]"><b>B</b><i style={{ fontFamily: "Georgia, serif" }}>I</i></div></div>
                            <div><Label>{CHART.textColor}</Label><Fake value={CHART.colourAuto} /></div>
                          </div>
                          <div className="mt-[8px]"><Check id={`${sec.id}-line`} on={false} label={CHART.showLine} /></div>
                          {sec.id === "vaxis" && (
                            <>
                              <div className="grid grid-cols-2 gap-[10px]">
                                <div><Label>{CHART.min}</Label><div className={`${field} justify-start text-[#80868B]`}>{CHART.minPlaceholder}</div></div>
                                <div><Label>{CHART.max}</Label><div className={`${field} justify-start text-[#80868B]`}>{CHART.maxPlaceholder}</div></div>
                              </div>
                              <Label>{CHART.scale}</Label>
                              <Fake value={CHART.scaleValue} />
                              <div className="mt-[8px]"><Check id="vaxis-log" on={false} label={CHART.log} /></div>
                              <Label>{CHART.numberFormat}</Label>
                              <Fake value={CHART.numberValue} />
                            </>
                          )}
                        </>
                      )}
                      {sec.id === "grid" && (
                        <div className="mt-[8px]">
                          <Check id="major" on={chart.gridlines} label={CHART.major} />
                          <Check id="minor" on={chart.minorGrid} label={CHART.minor} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center justify-end gap-[8px] border-t border-[#E3E5EA] px-[14px] py-[10px]">
        <span data-tl="chart-cancel" className="flex h-[30px] items-center rounded-[6px] px-[12px] text-[12.5px] text-[#3C4043] data-[hover=true]:bg-[#F1F3F4]">{CHART.cancel}</span>
        <span data-tl="chart-insert" className="flex h-[30px] items-center rounded-[6px] bg-[#2563EB] px-[16px] text-[12.5px] font-medium text-white data-[hover=true]:brightness-90 data-[pressed=true]:scale-95">{chart.placed ? CHART.update : CHART.insert}</span>
      </div>
    </div>
  );
}
