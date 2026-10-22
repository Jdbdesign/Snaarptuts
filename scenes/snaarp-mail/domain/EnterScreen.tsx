import { TypedField } from "@/components/admin/TypedField";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ENTER } from "../domain-data";
import { Heading } from "./Heading";

/** Screen B: type the domain. "Add New Domain" stays grey until there is text. */
export function EnterScreen({ tl }: { tl: Timeline }) {
  const value = useTimelineVar(tl, "field:domain", "");

  return (
    <div className="mx-auto w-[390px] pt-[144px]">
      <Heading title={ENTER.heading} text={ENTER.text} />

      <span className="mb-[6px] mt-[22px] block text-[10px] font-medium leading-4 text-[#0F1725]">{ENTER.label}</span>
      <TypedField
        tl={tl}
        id="domain"
        placeholder={ENTER.placeholder}
        tone="purple"
        className="!h-[38px] !rounded-[6px] !border-[#D8DAE0] !px-3 !text-[11.5px]"
      />

      <div className="mt-[17px] grid grid-cols-2 gap-[9px]">
        <button
          data-tl="cta-add-new"
          className={`h-[36px] rounded-[6px] text-[11px] font-semibold text-white transition-[background,transform] duration-200 data-[pressed=true]:scale-[0.98] ${
            value ? "bg-[#111827]" : "bg-[#868A92]"
          }`}
        >
          {ENTER.add}
        </button>
        <button className="h-[36px] rounded-[6px] border border-[#E5E7EB] bg-white text-[11px] font-medium text-[#0F1725]">
          {ENTER.cancel}
        </button>
      </div>
    </div>
  );
}
