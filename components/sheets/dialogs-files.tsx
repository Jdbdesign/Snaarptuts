"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BlueButton, CloseX, GreenSheet, ShDialog, SheetGlyph, Spinner } from "./parts";
import { CONTACTS_FILE, FILE_TABS, IMPORT_DIALOG, OPEN_DIALOG, type FileTabId } from "./sheets-data";

export type FileMode = "open" | "import";

/** Files the in-app chooser offers on the Upload tab (no operating-system window). */
export const LOCAL_FILES = [
  { name: "acme-budget-2026.xlsx", meta: "12 KB · 28/10/2026" },
  { name: CONTACTS_FILE.name, meta: `${CONTACTS_FILE.size} · 27/10/2026` },
  { name: "team-rota.csv", meta: "0.3 KB · 21/10/2026" },
];

/**
 * File > Open ("Open a file") and File > Import ("Import file"): one dialog with six tabs. Scene variables: `dialog` ("open" | "import"),
 * `fileTab` (the tab), `fileLoading` (spinner on Recent), `fileChooser` (the in-app chooser under "browse" is open) and `fileChosen`
 * (name of the file picked on Upload). Hooks (mode is "open" or "import"): <mode>-dialog, <mode>-search, <mode>-tab-<id>, <mode>-recent-<n>,
 * <mode>-drive-<n>, <mode>-zone, <mode>-browse, <mode>-chooser, <mode>-local-<n>, <mode>-different, <mode>-primary, <mode>-close.
 */
export function FileDialog({ tl, mode }: { tl: Timeline; mode: FileMode }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === mode;
  const tab = useTimelineVar<FileTabId>(tl, "fileTab", "recent");
  const loading = useTimelineVar(tl, "fileLoading", false);
  const chooser = useTimelineVar(tl, "fileChooser", false);
  const chosen = useTimelineVar(tl, "fileChosen", "");
  const D = OPEN_DIALOG;
  const title = mode === "open" ? D.openTitle : D.importTitle;
  const chosenFile = LOCAL_FILES.find((f) => f.name === chosen);

  return (
    <ShDialog open={open} width={616} hook={`${mode}-dialog`}>
      <div className="flex items-center gap-[10px] px-[22px] pt-[19px]">
        <GreenSheet size={19} />
        <h2 className="w-[82px] shrink-0 whitespace-nowrap text-[15px] font-medium text-[#1f2430]">{title}</h2>
        <span data-tl={`${mode}-search`} className="ml-[2px] flex h-[31px] flex-1 items-center gap-[9px] rounded-full bg-[#F1F3F4] px-[13px] text-[13px] text-[#80868B]">
          <Icon name="shSearch" size={14} className="text-[#5F6368]" />
          <span className="truncate">{D.search}</span>
        </span>
        <CloseX id={mode} />
      </div>
      <div className="mt-[11px] flex border-b border-[#E3E5EA] px-[18px]">
        {FILE_TABS.map((t) => (
          <span
            key={t.id}
            data-tl={`${mode}-tab-${t.id}`}
            className={`flex h-[36px] items-center border-b-2 px-[13px] text-[13px] transition-colors ${
              tab === t.id ? "border-[#2563EB] font-medium text-[#1D4FBF]" : "border-transparent text-[#4b5060] data-[hover=true]:text-[#1f2430]"
            }`}
          >
            {t.label}
          </span>
        ))}
      </div>

      <div className="relative h-[346px] overflow-hidden px-[22px]">
        {tab === "recent" &&
          (loading ? (
            <div className="flex h-full flex-col items-center justify-center gap-[9px] text-[12px] text-[#6b7280]">
              <Spinner size={22} />
              {D.loading}
            </div>
          ) : (
            <div className="pt-[14px]">
              <div className="flex items-center justify-between text-[12px] text-[#5F6368]">
                <span>{D.recent}</span>
                <span className="flex items-center gap-[9px]">
                  <Icon name="listView" size={14} />
                  <Icon name="shGrid" size={14} className="text-[#2563EB]" />
                </span>
              </div>
              {D.groups.map((g, gi) => (
                <div key={g.group}>
                  <p className="mb-[6px] mt-[12px] text-[11.5px] font-medium text-[#80868B]">{g.group}</p>
                  <div className="flex flex-wrap gap-[10px]">
                    {g.files.map((name, i) => {
                      const n = D.groups.slice(0, gi).reduce((a, x) => a + x.files.length, 0) + i + 1;
                      return (
                        <div key={name} data-tl={`${mode}-recent-${n}`} className="group w-[108px] rounded-[8px] border border-[#E3E5EA] bg-white transition-shadow data-[hover=true]:border-[#2563EB] data-[hover=true]:shadow-[0_0_0_1px_#2563EB]">
                          <div className="flex h-[58px] items-center justify-center rounded-t-[7px] bg-[#F6F7F9]"><SheetGlyph size={30} tone="#CBD1DA" /></div>
                          <p className="flex items-center gap-[5px] border-t border-[#EEF0F3] px-[7px] py-[6px] text-[11.5px] text-[#1f2430]"><GreenSheet size={12} /><span className="truncate">{name}</span></p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}

        {tab === "drive" && (
          <div className="pt-[14px]">
            <p className="text-[12px] text-[#5F6368]">{D.driveHeading}</p>
            <ul className="mt-[8px]">
              {D.driveFiles.map((f, i) => (
                <li key={f.name} data-tl={`${mode}-drive-${i + 1}`} className="flex h-[52px] items-center gap-[12px] rounded-[6px] border-b border-[#F0F1F4] px-[6px] transition-colors data-[hover=true]:bg-[#F3F6FD]">
                  <GreenSheet size={19} />
                  <span className="min-w-0 flex-1 leading-[17px]">
                    <span className="block truncate text-[13px] font-medium text-[#1f2430]">{f.name}</span>
                    <span className="block text-[11px] text-[#80868B]">{f.folder}</span>
                  </span>
                  <span className="text-right text-[10.5px] leading-[14px] text-[#80868B]">
                    <span className="block text-[#5F6368]">{f.size}</span>
                    <span className="block">{f.created}</span>
                    <span className="block">{f.modified}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "starred" && (
          <div className="pt-[14px]">
            <p className="text-[11.5px] text-[#80868B]">{D.starredHeading}</p>
            <p className="mt-[78px] text-center text-[13px] text-[#6b7280]">{D.starredEmpty}</p>
          </div>
        )}

        {(tab === "shared" || tab === "computers") && (
          <div className="flex h-full flex-col items-center justify-center pb-[30px] text-center">
            <SheetGlyph size={46} />
            <p className="mt-[14px] text-[13.5px] text-[#6b7280]">{D.unavailable(FILE_TABS.find((t) => t.id === tab)?.label ?? "")}</p>
            <p className="mt-[5px] text-[12px] text-[#9AA0A6]">{D.unavailableNote}</p>
          </div>
        )}

        {tab === "upload" && (
          <div className="pt-[20px]">
            {chosenFile ? (
              <div data-tl={`${mode}-zone`} className="flex h-[182px] flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-[#6CC686] bg-[#F1FAF3] text-center">
                <GreenSheet size={34} />
                <p className="mt-[12px] text-[13px] text-[#1f2430]">{chosenFile.name}</p>
                <p className="mt-[3px] text-[11px] text-[#80868B]">{chosenFile.meta.split(" · ")[0]}</p>
                <p data-tl={`${mode}-different`} className="mt-[7px] text-[12px] text-[#2563EB]">{D.different}</p>
              </div>
            ) : (
              <div data-tl={`${mode}-zone`} className="relative flex h-[182px] flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-[#9DBCF3] bg-[#F3F7FE] text-center">
                <Icon name="upload" size={28} className="text-[#6b7280]" />
                <p className="mt-[10px] text-[13px] text-[#1f2430]">
                  {D.dropHere} <span data-tl={`${mode}-browse`} className="text-[#2563EB] underline-offset-2 data-[hover=true]:underline">{D.browse}</span>
                </p>
                <p className="mt-[6px] text-[11px] text-[#80868B]">{D.supported}</p>

                <div
                  data-tl={`${mode}-chooser`}
                  className={`absolute left-1/2 top-[112px] z-10 w-[300px] -translate-x-1/2 rounded-[10px] border border-[#E3E5EA] bg-white py-[6px] text-left shadow-[0_10px_30px_-8px_rgba(17,24,39,0.3)] transition-[opacity,transform] duration-150 motion-reduce:transition-none ${
                    chooser ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <p className="px-[14px] pb-[5px] pt-[3px] text-[11px] font-medium uppercase tracking-[0.05em] text-[#80868B]">{D.chooser}</p>
                  {LOCAL_FILES.map((f, i) => (
                    <div key={f.name} data-tl={`${mode}-local-${i + 1}`} className="flex items-center gap-[10px] px-[14px] py-[7px] transition-colors data-[hover=true]:bg-[#EEF3FD]">
                      <GreenSheet size={16} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] text-[#1f2430]">{f.name}</span>
                        <span className="block text-[10.5px] text-[#80868B]">{f.meta}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {chosenFile && (
              <div className="mt-[14px] flex justify-end">
                <BlueButton hook={`${mode}-primary`}>{mode === "open" ? D.open : D.next}</BlueButton>
              </div>
            )}
          </div>
        )}
      </div>
    </ShDialog>
  );
}

/**
 * The second Import screen ("Import location"): the file chip and four radio cards. Scene variables: `dialog` = "importLocation",
 * `importChoice` (new | insert | replace | append). Hooks: import-location-dialog, import-chip, import-option-<id>, import-back, import-go, import-location-close.
 */
export function ImportLocationDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "importLocation";
  const choice = useTimelineVar<string>(tl, "importChoice", "new");
  const D = IMPORT_DIALOG;
  return (
    <ShDialog open={open} width={412} hook="import-location-dialog">
      <div className="flex items-center justify-between px-[20px] pt-[18px]">
        <h2 className="text-[14.5px] font-medium text-[#1f2430]">{D.title}</h2>
        <CloseX id="import-location" />
      </div>
      <div className="px-[20px] pb-[18px] pt-[12px]">
        <div data-tl="import-chip" className="flex items-center gap-[10px] rounded-[8px] border border-[#E3E5EA] bg-[#F8F9FA] px-[12px] py-[9px]">
          <GreenSheet size={18} />
          <span className="leading-[16px]">
            <span className="block text-[12.5px] text-[#1f2430]">{CONTACTS_FILE.name}</span>
            <span className="block text-[10.5px] text-[#80868B]">{CONTACTS_FILE.size}</span>
          </span>
        </div>
        <p className="mb-[8px] mt-[14px] text-[11.5px] font-medium text-[#5F6368]">{D.label}</p>
        <div className="flex flex-col gap-[7px]">
          {D.options.map((o) => (
            <div
              key={o.id}
              data-tl={`import-option-${o.id}`}
              className={`flex items-start gap-[10px] rounded-[8px] border px-[12px] py-[9px] transition-[border-color,background] data-[hover=true]:border-[#9DBCF3] ${
                choice === o.id ? "border-[#2563EB] bg-[#EEF3FE] shadow-[0_0_0_1px_#2563EB]" : "border-[#E3E5EA] bg-white"
              }`}
            >
              <span className={`mt-[2px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border ${choice === o.id ? "border-[#2563EB]" : "border-[#80868B]"}`}>
                {choice === o.id && <i className="h-[7px] w-[7px] rounded-full bg-[#2563EB]" />}
              </span>
              <span className="leading-[17px]">
                <span className="block text-[13px] text-[#1f2430]">{o.label}</span>
                <span className="block text-[11px] text-[#80868B]">{o.note}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-[18px] flex items-center justify-between">
          <span data-tl="import-back" className="rounded-[6px] px-[8px] py-[6px] text-[12.5px] text-[#4b5060] transition-colors data-[hover=true]:bg-[#F1F3F4]">{D.back}</span>
          <BlueButton hook="import-go">{D.import}</BlueButton>
        </div>
      </div>
    </ShDialog>
  );
}
