"use client";

import { Icon, type IconName } from "@/components/icons";
import { formatGBP } from "@/lib/money";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CHIP_TONES, SMART_CHIPS as D } from "./insert-data";
import { BlueButton, CloseX, ShDialog, ShField } from "./parts";

export type ChipValue = { label: string; sub?: string };

const ICONS: Record<string, IconName> = { people: "user", date: "shCalendar", place: "shPin", file: "shFile", finance: "shCoin", event: "shCalendar" };
const TONES: Record<string, string> = { people: "#1C3F94", date: "#137333", place: "#C5221F", file: "#7B2CBF", finance: "#B06000", event: "#00796B" };

/**
 * Insert > Smart chips: the type list and the small insert dialog of each kind. Scene variables: `dialog` = "chips" (the list) or
 * "chips-<kind>" (people, date, place, file, finance, event), `chipValue` (what the preview chip shows once something is chosen),
 * `chipSuggest` (the suggestion list under the box), `field:chip-people` / `chip-place` / `chip-finance` / `chip-event` (the typed text),
 * `focus`. Hooks: chips-dialog, chip-type-<kind>, chip-search, chip-back, chip-insert, chip-close, field-chip-<kind>, chip-suggest,
 * chip-suggest-<n>, chip-day-<n>, chip-file-<n>, chip-preview.
 */
export function SmartChipDialog({ tl }: { tl: Timeline }) {
  const dialog = useTimelineVar<string>(tl, "dialog", "");
  const value = useTimelineVar<ChipValue | null>(tl, "chipValue", null);
  const suggest = useTimelineVar(tl, "chipSuggest", false);
  const typed = (useTimelineVar<string>(tl, "field:chip-people", "") || "").trim();
  const open = dialog.startsWith("chips");
  const kind = dialog.startsWith("chips-") ? dialog.slice(6) : "";
  const label = value?.label ?? (kind === "people" && typed ? `@${typed}` : "");

  const title = kind ? (D as unknown as Record<string, { title: string }>)[kind].title : D.title;
  return (
    <ShDialog open={open} width={340} hook="chips-dialog">
      <div className="relative p-[18px] text-[#1f2430]">
        <div className="mb-[12px] flex items-center justify-between">
          <h2 className="flex items-center gap-[8px] text-[14px] font-medium">
            <Icon name={kind ? ICONS[kind] : "shChip"} size={15} className="text-[#2563EB]" />
            {title}
          </h2>
          <CloseX id="chip" />
        </div>

        {!kind && (
          <>
            <div className="mb-[8px] flex h-[34px] items-center gap-[8px] rounded-[8px] border border-[#DADCE0] px-[10px] text-[12.5px] text-[#80868B]" data-tl="chip-search">
              <Icon name="shSearch" size={14} />
              {D.search}
            </div>
            {D.types.map((t) => (
              <div key={t.id} data-tl={`chip-type-${t.id}`} className="flex items-center gap-[12px] rounded-[8px] px-[8px] py-[8px] transition-colors data-[hover=true]:bg-[#F1F3F4]">
                <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full" style={{ background: CHIP_TONES[t.id], color: TONES[t.id] }}>
                  <Icon name={ICONS[t.id]} size={14} />
                </span>
                <span>
                  <p className="text-[13px] font-medium leading-[16px]">{t.label}</p>
                  <p className="text-[11px] leading-[14px] text-[#5F6368]">{t.desc}</p>
                </span>
              </div>
            ))}
          </>
        )}

        {kind === "people" && (
          <>
            <p className="mb-[5px] text-[12px] font-medium text-[#5F6368]">{D.people.label}</p>
            <div className="relative">
              <ShField tl={tl} id="chip-people" placeholder={D.people.placeholder} />
              {suggest && (
                <div data-tl="chip-suggest" className="absolute left-0 top-[40px] z-20 w-[250px] rounded-[8px] bg-[#2B2D31] py-[6px] text-[12.5px] text-white shadow-[0_10px_30px_-6px_rgba(0,0,0,0.5)]">
                  <div data-tl="chip-suggest-0" className="px-[14px] py-[7px] transition-colors data-[hover=true]:bg-[#3C4043]">
                    <p>{D.people.person.name}</p>
                    <p className="text-[11.5px] text-[#BDC1C6]">{D.people.person.email}</p>
                  </div>
                  <div data-tl="chip-suggest-1" className="flex items-center gap-[8px] border-t border-[#4A4D54] px-[14px] py-[7px] text-[#E8EAED] data-[hover=true]:bg-[#3C4043]">
                    <Icon name="shSettings" size={13} />
                    {D.people.manage}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {kind === "date" && (
          <>
            <p className="mb-[6px] text-[12.5px] font-medium">{D.date.month}</p>
            <div className="grid grid-cols-7 gap-y-[2px] text-center text-[12px]">
              {D.date.days.map((d) => <span key={d} className="py-[3px] text-[11px] text-[#80868B]">{d}</span>)}
              {Array.from({ length: D.date.offset }).map((_, i) => <span key={`b${i}`} />)}
              {Array.from({ length: D.date.count }).map((_, i) => (
                <span key={i} data-tl={`chip-day-${i + 1}`} className={`mx-auto flex h-[26px] w-[26px] items-center justify-center rounded-[8px] transition-colors data-[hover=true]:bg-[#E8F0FE] ${value?.label === D.date.value && i + 1 === D.date.pick ? "bg-[#2563EB] text-white" : ""}`}>{i + 1}</span>
              ))}
            </div>
          </>
        )}

        {(kind === "place" || kind === "finance" || kind === "event") && (
          <div className="relative">
            <p className="mb-[5px] text-[12px] font-medium text-[#5F6368]">{(D[kind] as { label: string }).label}</p>
            <ShField tl={tl} id={`chip-${kind}`} placeholder={(D[kind] as { placeholder: string }).placeholder} />
            {suggest && (
              <div data-tl="chip-suggest" className="absolute left-0 top-[64px] z-20 w-full rounded-[8px] border border-[#DADCE0] bg-white py-[4px] text-[12.5px] shadow-[0_10px_30px_-6px_rgba(17,24,39,0.35)]">
                {kind === "place" && D.place.options.map((o, i) => <div key={o} data-tl={`chip-suggest-${i}`} className="px-[12px] py-[7px] data-[hover=true]:bg-[#F1F3F4]">{o}</div>)}
                {kind === "finance" && (
                  <div data-tl="chip-suggest-0" className="flex items-center justify-between px-[12px] py-[7px] data-[hover=true]:bg-[#F1F3F4]">
                    <span><b>{D.finance.ticker}</b> <span className="text-[#5F6368]">{D.finance.name}</span></span>
                    <span className="text-[#137333]">{formatGBP(D.finance.price)}</span>
                  </div>
                )}
                {kind === "event" && <div data-tl="chip-suggest-0" className="px-[12px] py-[7px] data-[hover=true]:bg-[#F1F3F4]">{D.event.value}</div>}
              </div>
            )}
          </div>
        )}

        {kind === "file" && (
          <div>
            {D.file.files.map((f, i) => (
              <div key={f} data-tl={`chip-file-${i}`} className={`flex items-center gap-[10px] rounded-[8px] px-[8px] py-[8px] text-[12.5px] transition-colors data-[hover=true]:bg-[#F1F3F4] ${value?.label === f ? "bg-[#E8F0FE]" : ""}`}>
                <Icon name="shFile" size={15} className="text-[#7B2CBF]" />
                {f}
              </div>
            ))}
          </div>
        )}

        {kind && (
          <>
            {label && (
              <div data-tl="chip-preview" className="mt-[14px] rounded-[8px] bg-[#F8F9FA] px-[10px] py-[8px]">
                <p className="text-[10.5px] text-[#80868B]">{D.preview}</p>
                <span className="mt-[4px] inline-flex items-center gap-[5px] rounded-full px-[9px] py-[2px] text-[12px]" style={{ background: CHIP_TONES[kind], color: TONES[kind] }}>
                  <Icon name={ICONS[kind]} size={12} />
                  {label}
                  {value?.sub && <span className="text-[#137333]">{value.sub}</span>}
                </span>
              </div>
            )}
            <div className="mt-[16px] flex items-center justify-between">
              <span data-tl="chip-back" className="flex h-[32px] items-center gap-[4px] rounded-[7px] px-[8px] text-[12.5px] text-[#5F6368] data-[hover=true]:bg-[#F1F3F4]">← {D.back}</span>
              <BlueButton hook="chip-insert" disabled={!label}>{D.insert}</BlueButton>
            </div>
          </>
        )}
      </div>
    </ShDialog>
  );
}
