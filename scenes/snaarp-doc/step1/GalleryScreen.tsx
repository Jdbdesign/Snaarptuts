import { Icon } from "@/components/icons";
import { PageThumb } from "@/components/docs/PageThumb";
import { GALLERY } from "../step1-data";

/** Screen B: "Create with templates" - filter chips and a grid of template cards. */
export function GalleryScreen({ narrow }: { narrow: boolean }) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex h-[68px] shrink-0 items-center gap-[10px] border-b border-[#EEEEF1] px-[18px] pt-[2px]">
        <button
          data-tl="gallery-back"
          aria-label="Back"
          className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#F3F3F5] text-[#1f2430] transition-colors data-[hover=true]:bg-[#E9E9ED]"
        >
          <Icon name="arrowLeft" size={13} />
        </button>
        <h1 className="text-[12.5px] font-medium">{GALLERY.title}</h1>
        <div className="ml-auto flex items-center gap-[10px]">
          {!narrow && (
            <span className="flex h-[26px] w-[190px] items-center gap-[7px] rounded-[6px] border border-[#E7E8EC] bg-white px-[10px] text-[10.5px] text-[#6b7280] shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
              <Icon name="search" size={13} className="text-[#4b5060]" />
              {GALLERY.search}
            </span>
          )}
          <span className="flex h-[26px] items-center gap-[6px] rounded-[6px] border border-[#E7E8EC] bg-white px-[10px] text-[10px] font-medium shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
            <Icon name="upload" size={13} />
            {GALLERY.upload}
          </span>
        </div>
      </div>

      <div className="no-scrollbar flex h-[40px] shrink-0 items-center gap-[10px] overflow-hidden border-b border-[#EEEEF1] px-[18px]">
        {GALLERY.filters.map((f, i) => {
          const selected = f === GALLERY.selectedFilter;
          return (
            <span
              key={f}
              data-tl={`chip-${i}`}
              className={`flex h-[26px] shrink-0 items-center rounded-full border px-[13px] text-[10.5px] font-medium transition-colors ${
                selected ? "border-[#111] bg-[#111] text-white" : "border-[#E5E6EA] bg-white text-[#1f2430] data-[hover=true]:bg-[#F3F3F5]"
              }`}
            >
              {f}
            </span>
          );
        })}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-[#FAFAFB] px-[18px] pt-[19px]">
        <div className={`grid gap-x-[13px] gap-y-[6px] ${narrow ? "grid-cols-3" : "grid-cols-7"}`}>
          {GALLERY.templates.map((t) => (
            <div key={t.name}>
              <PageThumb kind={t.kind} />
              <p className="mt-[8px] truncate text-[10.5px] font-semibold leading-[14px]">{t.name}</p>
              <p className="mb-[16px] truncate text-[9.5px] leading-[13px] text-[#7b808c]">{t.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
