import { Icon } from "@/components/icons";
import { CHOOSE } from "../domain-data";
import { Heading } from "./Heading";

/** Screen A: pick "Use existing domain" (selected) or "Buy new domain" (coming soon). */
export function ChooseScreen({ stacked }: { stacked: boolean }) {
  return (
    <div className="mx-auto w-[511px] pt-[96px]">
      <Heading title={CHOOSE.heading} text={CHOOSE.text} big />

      <div className={`mt-[26px] grid gap-[13px] ${stacked ? "grid-cols-1" : "grid-cols-2"}`}>
        <div data-tl="card-existing" className="rounded-[7px] bg-[#111827] p-[15px] text-white">
          <div className="flex items-start gap-2.5">
            <span className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-[7px] bg-white text-[#111827]">
              <Icon name="link" size={15} />
            </span>
            <div>
              <p className="text-[12px] font-semibold leading-4">{CHOOSE.existing.title}</p>
              <p className="mt-0.5 text-[9.5px] leading-[14px] text-white/80">{CHOOSE.existing.text}</p>
            </div>
          </div>
          <Checks items={CHOOSE.existing.checks} className="mt-3 text-white" />
        </div>

        <div className="relative rounded-[7px] border border-[#ECECF1] bg-[#FBFAFD] p-[15px] text-[#B4B8C0]">
          <span className="absolute right-2.5 top-[-5px] rounded-full bg-[#6B7280] px-2 py-[1px] text-[8.5px] font-semibold leading-[13px] text-white">
            {CHOOSE.buy.badge}
          </span>
          <div className="flex items-start gap-2.5">
            <span className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-[7px] text-[#C7CAD1]">
              <Icon name="plus" size={14} />
            </span>
            <div>
              <p className="text-[12px] font-semibold leading-4 text-[#B4B8C0]">{CHOOSE.buy.title}</p>
              <p className="mt-0.5 text-[9.5px] leading-[14px]">{CHOOSE.buy.text}</p>
            </div>
          </div>
          <Checks items={CHOOSE.buy.checks} className="mt-3" />
        </div>
      </div>

      <button
        data-tl="cta-add-domain"
        className="mt-[24px] flex h-[38px] w-full items-center justify-center rounded-[6px] bg-[#111827] text-[11.5px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-[0.99]"
      >
        {CHOOSE.add}
      </button>
    </div>
  );
}

function Checks({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-[6px] ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-1.5 text-[10px] leading-4">
          <Icon name="checkCircle" size={11} className="shrink-0" />
          {t}
        </li>
      ))}
    </ul>
  );
}
