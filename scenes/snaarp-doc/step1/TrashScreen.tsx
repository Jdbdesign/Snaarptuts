import { Icon } from "@/components/icons";
import { TRASH } from "../step1-data";

/** Screen C: Trash, with one deleted document. */
export function TrashScreen() {
  return (
    <div className="h-full overflow-hidden px-[18px] pt-[21px]">
      <h1 className="text-[17px] font-bold leading-[22px]">{TRASH.title}</h1>
      <p className="mt-[3px] text-[10.5px] text-[#6b7280]">{TRASH.intro}</p>

      <label className="mt-[17px] flex items-center gap-[9px] text-[10px] text-[#6b7280]">
        <Box />
        {TRASH.selectAll}
      </label>

      <div className="mt-[10px] flex h-[45px] items-center rounded-[7px] border border-[#E7E8EC] bg-white px-[10px] shadow-[0_1px_2px_rgba(17,17,17,0.03)]">
        <Box />
        <Icon name="docFile" size={14} className="ml-[11px] shrink-0 text-[#6b7280]" />
        <div className="ml-[11px] min-w-0 flex-1 leading-[14px]">
          <p className="text-[10.5px] font-semibold">{TRASH.item.name}</p>
          <p className="text-[9.5px] text-[#6b7280]">{TRASH.item.meta}</p>
        </div>
        <button
          data-tl="trash-restore"
          className="flex h-[26px] items-center gap-[6px] rounded-[5px] border border-[#E7E8EC] bg-white px-[12px] text-[10px] font-medium transition-colors data-[hover=true]:bg-[#F3F3F5]"
        >
          <Icon name="restore" size={12} />
          {TRASH.restore}
        </button>
        <button className="ml-[7px] flex h-[26px] items-center gap-[6px] rounded-[5px] bg-[#E5484D] px-[13px] text-[10px] font-medium text-white">
          <Icon name="trash" size={12} />
          {TRASH.delete}
        </button>
      </div>
    </div>
  );
}

function Box() {
  return <span className="block h-[11px] w-[11px] shrink-0 rounded-[2.5px] border border-[#6b7280] bg-white" />;
}
