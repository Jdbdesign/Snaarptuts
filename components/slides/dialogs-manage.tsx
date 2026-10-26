"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DialogTitle, FieldLabel, GhostButton, PrimaryButton, SDialog, SField } from "./parts";
import { DETAILS_DIALOG, PAGE_SETUP, TRASH_DIALOG, VERSIONS, type AspectId } from "./slides-data";

/** File > Version history > Name current version. Field `version-name`. Hooks: name-version-dialog, field-version-name, version-save, version-cancel, name-version-close. */
export function NameVersionDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "nameVersion";
  const D = VERSIONS.nameDialog;
  return (
    <SDialog open={open} width={400} hook="name-version-dialog">
      <DialogTitle id="name-version">{D.title}</DialogTitle>
      <div className="px-[24px] pb-[20px] pt-[10px]">
        <FieldLabel>{D.label}</FieldLabel>
        <SField tl={tl} id="version-name" placeholder={D.placeholder} />
        <div className="mt-[18px] flex justify-end gap-[8px]">
          <GhostButton hook="version-cancel">{D.cancel}</GhostButton>
          <PrimaryButton hook="version-save">{D.save}</PrimaryButton>
        </div>
      </div>
    </SDialog>
  );
}

/** File > Details. Hooks: details-dialog, details-row-<label>, details-done, details-close. */
export function DetailsDialog({ tl, title, slides }: { tl: Timeline; title: string; slides: number }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "details";
  const rows = DETAILS_DIALOG.rows(title, slides);
  return (
    <SDialog open={open} width={430} hook="details-dialog">
      <DialogTitle id="details">{DETAILS_DIALOG.title}</DialogTitle>
      <dl className="px-[24px] pb-[6px] pt-[8px]">
        {rows.map((r) => (
          <div key={r.label} data-tl={`details-row-${r.label.toLowerCase().replace(/\s+/g, "-")}`} className="flex h-[32px] items-center border-b border-[#F0F1F4] text-[10.5px]">
            <dt className="w-[110px] shrink-0 text-[#6b7280]">{r.label}</dt>
            <dd className="font-medium text-[#1f2430]">{r.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex justify-end px-[24px] pb-[18px] pt-[12px]">
        <PrimaryButton hook="details-done">{DETAILS_DIALOG.close}</PrimaryButton>
      </div>
    </SDialog>
  );
}

/**
 * File > Page setup. Scene variables: `aspectChoice` (the radio: 16:9 | 4:3 | custom) and `aspect` (the page that is applied).
 * Custom shows Width / Height fields (`page-w`, `page-h`). Hooks: page-setup-dialog, page-option-<id>, page-apply, page-cancel, page-setup-close.
 */
export function PageSetupDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "pageSetup";
  const choice = useTimelineVar<AspectId>(tl, "aspectChoice", "16:9");
  const D = PAGE_SETUP;
  return (
    <SDialog open={open} width={460} hook="page-setup-dialog">
      <DialogTitle id="page-setup">{D.title}</DialogTitle>
      <div className="px-[24px] pb-[20px] pt-[12px]">
        <div className="grid grid-cols-3 gap-[9px]">
          {D.options.map((o) => (
            <div
              key={o.id}
              data-tl={`page-option-${o.id.replace(":", "x")}`}
              className={`rounded-[9px] border px-[10px] pb-[10px] pt-[11px] text-center transition-[border-color,background] data-[hover=true]:border-[#9DBFF5] ${
                choice === o.id ? "border-[#1A73E8] bg-[#F2F7FE] shadow-[0_0_0_1px_#1A73E8]" : "border-[#E3E5EA] bg-white"
              }`}
            >
              <div className="mx-auto flex h-[46px] items-center justify-center">
                <i
                  className={`block rounded-[2px] border ${choice === o.id ? "border-[#1A73E8] bg-white" : "border-[#B8BDC6] bg-[#F5F6F8]"}`}
                  style={{ width: o.id === "4:3" ? 42 : 56, height: o.id === "4:3" ? 32 : o.id === "custom" ? 36 : 32 }}
                />
              </div>
              <p className="mt-[7px] text-[10px] font-medium text-[#1f2430]">{o.label}</p>
              {o.size && <p className="mt-[2px] text-[8.5px] text-[#6b7280]">{o.size}</p>}
            </div>
          ))}
        </div>
        <div className={`mt-[13px] grid grid-cols-2 gap-[10px] overflow-hidden transition-[max-height,opacity] duration-200 ${choice === "custom" ? "max-h-[70px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div>
            <FieldLabel>{`${D.width} (${D.unit})`}</FieldLabel>
            <SField tl={tl} id="page-w" placeholder="1920" />
          </div>
          <div>
            <FieldLabel>{`${D.height} (${D.unit})`}</FieldLabel>
            <SField tl={tl} id="page-h" placeholder="1080" />
          </div>
        </div>
        <div className="mt-[18px] flex justify-end gap-[8px]">
          <GhostButton hook="page-cancel">{D.cancel}</GhostButton>
          <PrimaryButton hook="page-apply">{D.apply}</PrimaryButton>
        </div>
      </div>
    </SDialog>
  );
}

/** File > Move to trash: the confirm dialog. Hooks: trash-dialog, trash-confirm, trash-cancel, trash-dialog-close. */
export function TrashDialog({ tl, title }: { tl: Timeline; title: string }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "trash";
  return (
    <SDialog open={open} width={400} hook="trash-dialog">
      <div className="px-[24px] pb-[20px] pt-[20px]">
        <div className="flex items-start gap-[12px]">
          <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#FDEEEE] text-[#C0272D]"><Icon name="trash" size={16} /></span>
          <div>
            <h2 className="text-[13.5px] font-medium leading-[18px] text-[#1f2430]">{TRASH_DIALOG.title(title)}</h2>
            <p className="mt-[5px] text-[10px] leading-[14px] text-[#6b7280]">{TRASH_DIALOG.text}</p>
          </div>
        </div>
        <div className="mt-[20px] flex justify-end gap-[8px]">
          <GhostButton hook="trash-cancel">{TRASH_DIALOG.cancel}</GhostButton>
          <span data-tl="trash-confirm" className="flex h-[30px] items-center rounded-[6px] bg-[#D93025] px-[18px] text-[10.5px] font-medium text-white transition-[transform,filter] duration-150 data-[hover=true]:brightness-95 data-[pressed=true]:scale-95">
            {TRASH_DIALOG.confirm}
          </span>
        </div>
      </div>
    </SDialog>
  );
}

/**
 * The Version history side panel (File > Version history > See version history), drawn in the editor's right panel.
 * Scene variable `versionSel` (the selected version id). Hooks: version-panel, version-<id>, version-restore, version-panel-close.
 */
export function VersionPanel({ tl }: { tl: Timeline }) {
  const sel = useTimelineVar(tl, "versionSel", "v1");
  const named = useTimelineVar(tl, "field:version-name", "");
  return (
    <div data-tl="version-panel" className="absolute inset-0 flex flex-col bg-white">
      <div className="flex h-[40px] shrink-0 items-center justify-between border-b border-[#EEEEF1] px-[14px]">
        <span className="text-[11.5px] font-medium text-[#1f2430]">{VERSIONS.panelTitle}</span>
        <span data-tl="version-panel-close" className="text-[#4b5060]"><Icon name="x" size={12} /></span>
      </div>
      <div className="no-scrollbar min-h-0 flex-1 overflow-hidden px-[10px] pb-[8px]">
        {VERSIONS.groups.map((g) => (
          <div key={g.group}>
            <p className="mb-[4px] mt-[11px] px-[4px] text-[8.5px] font-medium tracking-[0.04em] text-[#80868B]">{g.group}</p>
            {g.items.map((v) => (
              <div
                key={v.id}
                data-tl={`version-${v.id}`}
                className={`mb-[3px] rounded-[6px] border-l-[3px] px-[9px] py-[6px] transition-colors data-[hover=true]:bg-[#F1F3F4] ${sel === v.id ? "border-[#1A73E8] bg-[#E8F0FE]" : "border-transparent"}`}
              >
                <p className="text-[10px] font-medium leading-[13px] text-[#1f2430]">{(v.current ? named : "") || v.name || v.time}</p>
                <p className="text-[8.5px] leading-[12px] text-[#5F6368]">{(v.current ? named : "") || v.name ? `${v.time} · ` : ""}{v.current ? `${VERSIONS.currentLabel} · ` : ""}{v.author}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="shrink-0 border-t border-[#EEEEF1] p-[10px]">
        <span data-tl="version-restore" className="flex h-[30px] items-center justify-center rounded-[6px] bg-[#1A73E8] text-[10.5px] font-medium text-white transition-[transform,filter] duration-150 data-[hover=true]:brightness-95 data-[pressed=true]:scale-[0.98]">
          {VERSIONS.restore}
        </span>
      </div>
    </div>
  );
}
