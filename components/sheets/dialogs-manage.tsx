"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BlueButton, CloseX, FieldLabel, ShDialog, ShField, TextButton } from "./parts";
import { DETAILS, LOCATE, LOCATE_TABS, NAME_VERSION, PRINT, RENAME_DIALOG, type LocateTabId } from "./sheets-data";
import { cellText, type SheetModel } from "./sheets-sample";

const PURPLE = "#7014D9";

/**
 * File > Rename ("Rename workbook"). Field `rename-name` (starts with the current title). Scene variable `renameSelected` (the text is
 * highlighted, as when the dialog opens). Hooks: rename-dialog, field-rename-name, rename-cancel, rename-go.
 */
export function RenameDialog({ tl, title }: { tl: Timeline; title: string }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "rename";
  const selected = useTimelineVar(tl, "renameSelected", false);
  const D = RENAME_DIALOG;
  return (
    <ShDialog open={open} width={436} hook="rename-dialog">
      <div className="px-[20px] pb-[18px] pt-[20px]">
        <h2 className="text-[16px] font-semibold text-[#1f2430]">{D.title}</h2>
        <p className="mb-[6px] mt-[14px] text-[11.5px] font-medium text-[#5F6368]">{D.name}</p>
        <ShField tl={tl} id="rename-name" placeholder={D.name} initial={title} selected={selected} tone={PURPLE} />
        <div className="mt-[18px] flex items-center justify-end gap-[8px]">
          <TextButton hook="rename-cancel">{D.cancel}</TextButton>
          <span data-tl="rename-go" className="flex h-[34px] items-center rounded-[7px] bg-[#7014D9] px-[18px] text-[13px] font-medium text-white transition-[transform,filter] duration-150 data-[hover=true]:brightness-90 data-[pressed=true]:scale-95">{D.rename}</span>
        </div>
      </div>
    </ShDialog>
  );
}

/**
 * File > Move and File > Add shortcut to Drive: the same picker (mode "move" or "shortcut"). Scene variables: `dialog`, `locateTab`
 * (suggested | starred | all), `locateSel` (the chosen place). Hooks (mode first): <mode>-dialog, <mode>-tab-<id>, <mode>-loc-<id>,
 * <mode>-cancel, <mode>-primary, <mode>-close.
 */
export function LocateDialog({ tl, mode, title }: { tl: Timeline; mode: "move" | "shortcut"; title: string }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === mode;
  const tab = useTimelineVar<LocateTabId>(tl, "locateTab", "suggested");
  const sel = useTimelineVar(tl, "locateSel", "");
  const D = LOCATE;
  const picked = D.all.find((l) => l.id === sel);
  return (
    <ShDialog open={open} width={444} hook={`${mode}-dialog`}>
      <div className="px-[20px] pt-[20px]">
        <div className="flex items-start justify-between">
          <h2 className="pr-[8px] text-[15.5px] font-medium text-[#1f2430]">{mode === "move" ? D.moveTitle(title) : D.shortcutTitle}</h2>
          <CloseX id={mode} />
        </div>
        {mode === "move" ? (
          <p className="mt-[10px] flex items-center gap-[9px] text-[12px] text-[#5F6368]">
            {D.current}
            <span className="flex h-[26px] items-center gap-[6px] rounded-full bg-[#F1F3F4] px-[10px] text-[12px] text-[#1f2430]"><Icon name="shFolderOutline" size={13} />{D.currentName}</span>
          </p>
        ) : (
          <p className="mt-[4px] text-[12px] text-[#5F6368]">{D.shortcutNote(title)}</p>
        )}
        <div className="mt-[12px] flex items-center border-b border-[#E3E5EA]">
          {LOCATE_TABS.map((t) => (
            <span
              key={t.id}
              data-tl={`${mode}-tab-${t.id}`}
              className={`flex h-[34px] items-center border-b-2 px-[12px] text-[13px] transition-colors ${tab === t.id ? "border-[#2563EB] font-medium text-[#1D4FBF]" : "border-transparent text-[#4b5060] data-[hover=true]:text-[#1f2430]"}`}
            >
              {t.label}
            </span>
          ))}
          <Icon name="shSearch" size={14} className="ml-auto mr-[4px] text-[#5F6368]" />
        </div>
        <div className="h-[158px] overflow-hidden">
          {tab === "suggested" && <p className="mt-[58px] text-center text-[12.5px] text-[#80868B]">{D.suggested}</p>}
          {tab === "starred" && <p className="mt-[58px] text-center text-[12.5px] text-[#80868B]">{D.starredEmpty}</p>}
          {tab === "all" && (
            <ul className="pt-[6px]">
              {D.all.map((l) => (
                <li
                  key={l.id}
                  data-tl={`${mode}-loc-${l.id}`}
                  className={`flex h-[34px] items-center gap-[11px] rounded-[6px] px-[8px] text-[13px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F3F4] ${sel === l.id ? "bg-[#E8F0FE]" : ""}`}
                >
                  <Icon name={l.icon} size={16} className="text-[#5F6368]" />
                  <span className="flex-1">{l.label}</span>
                  <Icon name="chevronRight" size={11} className="text-[#80868B]" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-[10px] border-t border-[#EEF0F3] px-[20px] py-[14px]">
        <span className={`flex min-w-0 items-center gap-[6px] text-[11px] ${picked ? "text-[#1f2430]" : "text-[#80868B]"}`}>
          <Icon name={picked ? "shFolderOutline" : "warning"} size={13} className={picked ? "text-[#5F6368]" : "text-[#E8A317]"} />
          <span className="truncate">{picked ? picked.label : D.hint}</span>
        </span>
        <span className="flex items-center gap-[8px]">
          <TextButton hook={`${mode}-cancel`}>{LOCATE.cancel}</TextButton>
          <BlueButton hook={`${mode}-primary`} disabled={!picked}>{mode === "move" ? D.move : D.addShortcut}</BlueButton>
        </span>
      </div>
    </ShDialog>
  );
}

/** File > Version history > Name current version. Field `version-name`. Hooks: name-version-dialog, field-version-name, version-cancel, version-save, name-version-close. */
export function NameVersionDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "nameVersion";
  const D = NAME_VERSION;
  return (
    <ShDialog open={open} width={400} hook="name-version-dialog">
      <div className="px-[20px] pb-[18px] pt-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-medium text-[#1f2430]">{D.title}</h2>
          <CloseX id="name-version" />
        </div>
        <div className="mt-[14px]">
          <FieldLabel>{D.label}</FieldLabel>
          <ShField tl={tl} id="version-name" placeholder={D.placeholder} />
        </div>
        <div className="mt-[18px] flex items-center justify-end gap-[8px]">
          <TextButton hook="version-cancel">{D.cancel}</TextButton>
          <BlueButton hook="version-save">{D.save}</BlueButton>
        </div>
      </div>
    </ShDialog>
  );
}

/**
 * File > Details: the "FILE DETAILS" column at the right of the grid (drawn inside the editor's side panel). The description is typed
 * into the field `details-desc` (scene variable `focus` = "details-desc" while it is active). Hooks: details-panel, details-row-<label>,
 * details-description, details-close.
 */
export function DetailsPanel({ tl }: { tl: Timeline }) {
  const text = useTimelineVar(tl, "field:details-desc", "");
  const focus = useTimelineVar<string>(tl, "focus", "") === "details-desc";
  const D = DETAILS;
  return (
    <div data-tl="details-panel" className="px-[16px] pb-[16px] pt-[16px]">
      <div className="flex items-center justify-between">
        <p className="text-[11.5px] font-semibold tracking-[0.08em] text-[#5F6368]">{D.title}</p>
        <span data-tl="details-close" className="flex h-[22px] w-[22px] items-center justify-center rounded-full text-[#5F6368] data-[hover=true]:bg-[#F1F3F4]"><Icon name="x" size={12} /></span>
      </div>
      <dl className="mt-[12px] flex flex-col gap-[9px] text-[12.5px]">
        {D.rows.map((r) => (
          <div key={r.label} data-tl={`details-row-${r.label.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-baseline justify-between gap-[10px]">
            <dt className="text-[#5F6368]">{r.label}</dt>
            <dd className={r.link ? "text-[#2563EB]" : "text-[#1f2430]"}>{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-[22px] text-[11.5px] font-semibold tracking-[0.08em] text-[#5F6368]">{D.description}</p>
      <div
        data-tl="details-description"
        className={`mt-[7px] min-h-[54px] rounded-[7px] border px-[9px] py-[7px] text-[12.5px] leading-[18px] transition-[border-color,box-shadow] ${focus ? "border-[#2563EB] shadow-[0_0_0_1px_#2563EB]" : "border-transparent"}`}
      >
        {text ? (
          <span className="text-[#1f2430]">
            {text}
            {focus && <i className="ml-px inline-block h-[14px] w-px translate-y-[2px] bg-[#202124]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
          </span>
        ) : (
          <span className="italic text-[#9AA0A6]">
            {focus && <i className="mr-px inline-block h-[14px] w-px translate-y-[2px] bg-[#202124]" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
            {D.add}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * File > Print: a Snaarp print preview (the browser's own print window is not shown). The sheet on the left, settings on the right.
 * Scene variables: `printLayout` (Portrait | Landscape) and `printLayoutOpen`. Hooks: print-dialog, print-paper, print-layout,
 * print-layout-<n>, print-more, print-go, print-cancel.
 */
export function PrintDialog({ tl, rows }: { tl: Timeline; rows: SheetModel["rows"] }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "print";
  const layout = useTimelineVar<string>(tl, "printLayout", PRINT.layouts[0]);
  const listOpen = useTimelineVar(tl, "printLayoutOpen", false);
  const landscape = layout === PRINT.layouts[1];
  const D = PRINT;
  return (
    <ShDialog open={open} width={760} hook="print-dialog">
      <div className="flex h-[480px] overflow-hidden rounded-[14px]">
        <div className="flex flex-1 items-center justify-center bg-[#E9ECF1]">
          <div
            data-tl="print-paper"
            className="overflow-hidden bg-white p-[14px] shadow-[0_2px_12px_rgba(17,24,39,0.18)] transition-[width,height] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: landscape ? 360 : 250, height: landscape ? 255 : 354 }}
          >
            <div className="mb-[8px] flex items-center justify-between text-[7px] text-[#80868B]"><span>28/10/2026</span><span>Acme Studio</span></div>
            <table className="w-full table-fixed border-collapse text-[8px]">
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    {[0, 1, 2, 3].map((c) => (
                      <td key={c} className={`border border-[#CFD3D9] px-[3px] py-[2px] ${i === 0 ? "font-semibold" : ""}`}>{cellText(r[c])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex w-[300px] shrink-0 flex-col bg-white px-[22px] pb-[18px] pt-[20px] text-[13px]">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[17px] font-medium text-[#1f2430]">{D.title}</h2>
            <span className="text-[11.5px] text-[#80868B]">{D.sheets}</span>
          </div>
          <Setting label={D.destination}><Select>{D.destinationValue}</Select></Setting>
          <Setting label={D.pages}><Select>{D.pagesValue}</Select></Setting>
          <Setting label={D.layout}>
            <div className="relative">
              <span data-tl="print-layout" className="block"><Select open={listOpen}>{layout}</Select></span>
              <div className={`absolute inset-x-0 top-[38px] z-10 rounded-[8px] border border-[#DADCE0] bg-white py-[4px] shadow-[0_8px_24px_-6px_rgba(17,24,39,0.3)] transition-opacity duration-150 motion-reduce:transition-none ${listOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
                {D.layouts.map((l, i) => (
                  <div key={l} data-tl={`print-layout-${i + 1}`} className={`px-[12px] py-[6px] transition-colors data-[hover=true]:bg-[#EEF3FD] ${layout === l ? "font-medium" : ""}`}>{l}</div>
                ))}
              </div>
            </div>
          </Setting>
          <Setting label={D.color}><Select>{D.colorValue}</Select></Setting>
          <span data-tl="print-more" className="mt-[18px] flex items-center justify-between border-t border-[#EEF0F3] pt-[14px] text-[13px] text-[#1f2430]">{D.more}<Icon name="chevronDown" size={11} /></span>
          <div className="mt-auto flex items-center justify-end gap-[8px] pt-[16px]">
            <BlueButton hook="print-go">{D.print}</BlueButton>
            <TextButton hook="print-cancel">{D.cancel}</TextButton>
          </div>
        </div>
      </div>
    </ShDialog>
  );
}

function Setting({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-[16px]">
      <p className="mb-[5px] text-[12px] text-[#5F6368]">{label}</p>
      {children}
    </div>
  );
}

function Select({ children, open = false }: { children: React.ReactNode; open?: boolean }) {
  return (
    <span className={`flex h-[34px] items-center justify-between rounded-[8px] border px-[11px] text-[13px] text-[#1f2430] ${open ? "border-[#2563EB] shadow-[0_0_0_1px_#2563EB]" : "border-[#DADCE0]"}`}>
      {children}
      <Icon name="chevronDown" size={11} />
    </span>
  );
}
