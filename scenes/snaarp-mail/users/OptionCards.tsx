import { Icon } from "@/components/icons";
import { PAGE } from "../users-data";

/** The three ways to add people. The selected one is a solid black card. They stack under 900px. */
export function OptionCards({ stacked }: { stacked: boolean }) {
  return (
    <div className={`mt-[26px] grid gap-[10px] ${stacked ? "grid-cols-1" : "grid-cols-3"}`}>
      {PAGE.options.map((o) => {
        const on = !!("selected" in o && o.selected);
        return (
          <div
            key={o.id}
            data-tl={`opt-${o.id}`}
            className={`flex min-h-[200px] flex-col items-center rounded-[14px] border px-3 pb-4 pt-[28px] text-center ${
              on
                ? "border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-[0_14px_24px_-14px_rgba(0,0,0,0.45)]"
                : "border-[#ECECEF] bg-white text-[#0A0A0A]"
            }`}
          >
            <span className={`flex h-[34px] w-[34px] items-center justify-center rounded-[8px] ${on ? "bg-white text-[#0A0A0A]" : "bg-[#0A0A0A] text-white"}`}>
              <Icon name={o.icon} size={21} />
            </span>
            <h3 className="mt-[17px] text-[14.5px] font-bold leading-5">{o.title}</h3>
            <p className={`mt-[6px] max-w-[220px] text-[12px] leading-[17px] ${on ? "text-white" : "text-[#1F2937]"}`}>{o.text}</p>
            {"badge" in o && o.badge && (
              <span className="mt-auto rounded-full bg-[#22A04B] px-[13px] py-[2px] text-[10.5px] font-medium leading-4 text-white">{o.badge}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
