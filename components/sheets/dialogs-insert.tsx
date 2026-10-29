"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { IMAGE } from "./insert-data";
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
