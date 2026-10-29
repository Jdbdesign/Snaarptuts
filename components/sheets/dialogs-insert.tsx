"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { FUNCTIONS, IMAGE, LINK } from "./insert-data";
import type { SheetModel } from "./sheets-sample";
import { BLUE, BlueButton, CloseX, ShDialog, ShField } from "./parts";

/**
 * Insert > Image: the Insert image dialog. Scene variables: `dialog` = "insertImage" (open), `imgTab` (upload | url), `imgChooser`
 * (the small file chooser over the drop area: a Snaarp-styled stand-in for the computer's file window, which the tutorials never show),
 * `imgChosen` (file id), `field:img-alt`, `field:img-url`, `focus`. Hooks: image-dialog, img-tab-upload, img-tab-url, img-drop,
 * img-chooser, img-file-<id>, field-img-alt, field-img-url, img-preview, img-cancel, img-insert, img-close.
 */
export function InsertImageDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "insertImage";
  const tab = useTimelineVar<string>(tl, "imgTab", "upload");
  const chooser = useTimelineVar(tl, "imgChooser", false);
  const chosen = useTimelineVar<string>(tl, "imgChosen", "");
  const file = IMAGE.files.find((f) => f.id === chosen);
  return (
    <ShDialog open={open} width={400} hook="image-dialog">
      <div className="relative p-[20px] text-[#1f2430]">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-medium">{IMAGE.title}</h2>
          <CloseX id="img" />
        </div>
        <div className="mt-[12px] flex border-b border-[#E3E5EA] text-[13px]">
          {IMAGE.tabs.map((t) => (
            <span key={t.id} data-tl={`img-tab-${t.id}`} className={`flex items-center gap-[6px] border-b-2 px-[14px] pb-[8px] transition-colors data-[hover=true]:bg-[#F8F9FA] ${tab === t.id ? "font-medium text-[#1C3F94]" : "border-transparent text-[#5F6368]"}`} style={tab === t.id ? { borderColor: BLUE } : undefined}>
              <Icon name={t.id === "upload" ? "shImage" : "shLink"} size={14} />
              {t.label}
            </span>
          ))}
        </div>

        {tab === "upload" ? (
          <div data-tl="img-drop" className="relative mt-[16px] flex h-[104px] flex-col items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-[#BFC5D2] text-center transition-colors data-[hover=true]:border-[#2563EB] data-[hover=true]:bg-[#F5F8FF]">
            <Icon name="shImage" size={26} className="text-[#80868B]" />
            <p className="mt-[6px] text-[13px] text-[#3C4043]">{IMAGE.drop}</p>
            <p className="text-[10.5px] text-[#9AA0A6]">{IMAGE.types}</p>
            {chooser && (
              <div data-tl="img-chooser" className="absolute inset-x-[8px] top-[8px] z-10 rounded-[10px] border border-[#DADCE0] bg-white p-[8px] text-left shadow-[0_10px_30px_-6px_rgba(17,24,39,0.35)]">
                <p className="px-[6px] pb-[6px] text-[11px] font-medium text-[#5F6368]">{IMAGE.chooser}</p>
                {IMAGE.files.map((f) => (
                  <div key={f.id} data-tl={`img-file-${f.id}`} className="flex items-center gap-[10px] rounded-[6px] px-[6px] py-[4px] text-[12.5px] transition-colors data-[hover=true]:bg-[#E8F0FE]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.src} alt="" className="h-[26px] w-[38px] rounded-[3px] object-cover" />
                    {f.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-[16px]">
            <p className="mb-[5px] text-[12px] font-medium text-[#5F6368]">{IMAGE.urlLabel}</p>
            <ShField tl={tl} id="img-url" placeholder={IMAGE.urlPlaceholder} />
            <p className="mt-[6px] text-[11px] text-[#80868B]">{IMAGE.urlHint}</p>
          </div>
        )}

        <p className="mb-[5px] mt-[16px] text-[12px] font-medium text-[#5F6368]">{IMAGE.alt}</p>
        <ShField tl={tl} id="img-alt" placeholder={IMAGE.altPlaceholder} />

        {file && (
          <div data-tl="img-preview" className="mt-[14px] rounded-[10px] border border-[#E3E5EA] p-[10px]">
            <p className="text-[11px] text-[#80868B]">{IMAGE.preview}</p>
            <div className="mt-[6px] flex h-[120px] items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={file.src} alt={file.alt} className="max-h-full max-w-full rounded-[4px]" />
            </div>
          </div>
        )}

        <div className="mt-[18px] flex items-center justify-end gap-[10px]">
          <span data-tl="img-cancel" className="flex h-[34px] items-center rounded-[7px] px-[14px] text-[13px] font-medium text-[#3C4043] data-[hover=true]:bg-[#F1F3F4]">{IMAGE.cancel}</span>
          <BlueButton hook="img-insert" disabled={!file}>{IMAGE.insert}</BlueButton>
        </div>
      </div>
    </ShDialog>
  );
}

/**
 * Insert > Function > More functions: a small searchable list. Scene variables: `fnOpen`, `field:fn-search`, `focus`.
 * Hooks: fn-card, field-fn-search, fn-row-<name>, fn-close.
 */
export function FunctionCard({ tl }: { tl: Timeline }) {
  const open = useTimelineVar(tl, "fnOpen", false);
  const q = useTimelineVar(tl, "field:fn-search", "").trim().toLowerCase();
  const rows = FUNCTIONS.moreList.filter((f) => !q || f.name.toLowerCase().includes(q));
  return (
    <div
      aria-hidden={!open}
      data-tl="fn-card"
      className={`absolute right-[28px] top-[110px] z-40 w-[330px] rounded-[12px] border border-[#DADCE0] bg-white p-[16px] text-[#1f2430] shadow-[0_14px_40px_-8px_rgba(17,24,39,0.32)] transition-[opacity,transform] duration-200 motion-reduce:transition-none ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}
    >
      <div className="mb-[10px] flex items-center justify-between">
        <h2 className="text-[15px] font-semibold">{FUNCTIONS.moreTitle}</h2>
        <CloseX id="fn" />
      </div>
      <ShField tl={tl} id="fn-search" placeholder={FUNCTIONS.moreSearch} />
      <div className="mt-[10px] max-h-[250px] overflow-y-auto">
        {rows.map((f) => (
          <div key={f.name} data-tl={`fn-row-${f.name}`} className="rounded-[6px] px-[8px] py-[6px] transition-colors data-[hover=true]:bg-[#E8F0FE]">
            <p className="text-[12.5px] font-medium">{f.name}</p>
            <p className="text-[11px] text-[#5F6368]">{f.desc}</p>
          </div>
        ))}
        {!rows.length && <p className="px-[8px] py-[10px] text-[12px] text-[#80868B]">{FUNCTIONS.moreNone}</p>}
      </div>
    </div>
  );
}

export type LinkPop = { r: number; c: number; text: string };

/** The Link popover under a cell (Ctrl+K): the cell's text, a search / paste box, the workbook's sheets and a footer. Hooks: link-pop, link-top, field-link-search, link-apply, link-sheet-<id>, link-footer. */
export function LinkPopover({ tl, sheets }: { tl: Timeline; sheets: SheetModel[] }) {
  const q = useTimelineVar(tl, "field:link-search", "");
  const pop = useTimelineVar<LinkPop | null>(tl, "linkPop", null);
  return (
    <div data-tl="link-pop" className="w-[290px] rounded-[10px] border border-[#DADCE0] bg-white p-[8px] text-[12.5px] shadow-[0_10px_30px_-6px_rgba(17,24,39,0.35)]">
      <div data-tl="link-top" className="flex h-[32px] items-center gap-[8px] rounded-[6px] border border-[#2563EB] px-[10px] text-[#1f2430]">
        <Icon name="shLink" size={13} className="text-[#5F6368]" />
        <span className="truncate">{pop?.text}</span>
      </div>
      <div className="relative mt-[8px]">
        <ShField tl={tl} id="link-search" placeholder={LINK.search} className="!h-[32px] !text-[12.5px]" />
        <span data-tl="link-apply" className={`absolute right-[8px] top-[8px] text-[12px] font-medium transition-[transform] data-[pressed=true]:scale-90 ${q ? "text-[#2563EB]" : "text-[#B0B5C0]"}`}>{LINK.apply}</span>
      </div>
      <div className="mt-[6px]">
        {sheets.map((s) => (
          <div key={s.id} data-tl={`link-sheet-${s.id}`} className="flex h-[30px] items-center gap-[8px] rounded-[6px] px-[8px] transition-colors data-[hover=true]:bg-[#F1F3F4]">
            <Icon name="shFile" size={14} className="text-[#5F6368]" />
            {s.name}
          </div>
        ))}
      </div>
      <div data-tl="link-footer" className="mt-[4px] flex items-center justify-between border-t border-[#E8EAED] px-[8px] pt-[8px] text-[12px] text-[#3C4043]">
        {LINK.footer}
        <Icon name="chevronRight" size={11} className="text-[#80868B]" />
      </div>
    </div>
  );
}

export type LinkChip = { r: number; c: number; label: string };

/** The little chip under a cell with a link: where it goes, and copy, edit and remove. Hooks: link-chip, link-copy, link-edit, link-remove. */
export function LinkChipView({ chip }: { chip: LinkChip }) {
  return (
    <div data-tl="link-chip" className="inline-flex h-[30px] items-center gap-[10px] rounded-full border border-[#DADCE0] bg-white px-[12px] text-[12px] shadow-[0_4px_14px_-4px_rgba(17,24,39,0.3)]">
      <Icon name="shGlobe" size={13} className="text-[#5F6368]" />
      <span className="text-[#1155CC] underline">{chip.label}</span>
      <span data-tl="link-copy" className="flex h-[20px] w-[20px] items-center justify-center rounded-full text-[#5F6368] data-[hover=true]:bg-[#F1F3F4]"><Icon name="copy" size={13} /></span>
      <span data-tl="link-edit" className="flex h-[20px] w-[20px] items-center justify-center rounded-full text-[#5F6368] data-[hover=true]:bg-[#F1F3F4]"><Icon name="pencil" size={13} /></span>
      <span data-tl="link-remove" className="flex h-[20px] w-[20px] items-center justify-center rounded-full text-[#5F6368] data-[hover=true]:bg-[#F1F3F4]"><Icon name="shUnlink" size={13} /></span>
    </div>
  );
}
