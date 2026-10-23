import { Icon } from "@/components/icons";
import { PageThumb } from "@/components/docs/PageThumb";
import { HOME, RECENT_DOCS, START_CARDS } from "../step1-data";

/** Screen A: Documents home ("Start a new document" + "Recent documents"). */
export function HomeScreen({ narrow }: { narrow: boolean }) {
  const cards = narrow ? START_CARDS.slice(0, 3) : START_CARDS;
  return (
    <div className="h-full overflow-hidden px-[18px] pt-[18px]">
      <section data-tl="start-panel" className="rounded-[8px] bg-[#FAFAFB] px-[18px] pb-[14px] pt-[15px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[11.5px] font-medium">{HOME.startTitle}</h2>
          <button
            data-tl="template-gallery"
            className="flex items-center gap-[4px] rounded-[4px] text-[10.5px] font-medium text-[#2F62C8] transition-transform data-[pressed=true]:scale-[0.97]"
          >
            {HOME.gallery}
            <Icon name="chevronDown" size={12} />
          </button>
        </div>

        <div className="mt-[13px] flex gap-[12.5px]">
          <Card name={HOME.blank}>
            <div
              data-tl="blank-card"
              className="flex w-full items-center justify-center rounded-[4px] border border-[#E3E5EA] bg-white transition-colors data-[hover=true]:border-[#3F72D4]"
              style={{ aspectRatio: "0.78" }}
            >
              <Icon name="plus" size={30} className="text-[#3F72D4]" />
            </div>
          </Card>
          {cards.map((c) => (
            <Card key={c.name} name={c.name}>
              <PageThumb kind={c.kind} />
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-[22px] flex items-center justify-between">
        <h2 className="text-[11.5px] font-medium">{HOME.recentTitle}</h2>
        <div className="flex items-center gap-[8px]">
          <span className="flex h-[22px] items-center gap-[6px] rounded-[5px] border border-[#E7E8EC] bg-white px-[10px] text-[9.5px] font-medium shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
            <Icon name="clock" size={12} />
            {HOME.sort}
          </span>
          <span className="flex h-[22px] items-center overflow-hidden rounded-[5px] border border-[#E7E8EC] bg-white">
            <ViewButton id="grid" icon="grid4" />
            <ViewButton id="list" icon="listView" selected />
          </span>
        </div>
      </div>

      <ul className="mt-[9px] flex flex-col gap-[7px]">
        {RECENT_DOCS.map((d, i) => (
          <li
            key={i}
            className="flex h-[40px] items-center rounded-[8px] border border-[#EAEAEE] bg-white px-[14px] shadow-[0_1px_2px_rgba(17,17,17,0.03)]"
          >
            <Icon name="docFile" size={15} className="shrink-0 text-[#6b7280]" />
            <span className="ml-[14px] min-w-0 flex-1 truncate text-[11px] font-medium">{d.name}</span>
            <span className="mr-[17px] text-[9.5px] text-[#6b7280]">{d.date}</span>
            <Icon name="star" size={14} className="mr-[17px] shrink-0 text-[#4b5060]" />
            <Icon name="dots" size={13} className="shrink-0 text-[#6b7280]" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Card({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="w-[105.5px] shrink-0">
      {children}
      <p className="mt-[9px] text-center text-[9.5px] font-medium leading-[13px]">{name}</p>
    </div>
  );
}

function ViewButton({ id, icon, selected = false }: { id: string; icon: "grid4" | "listView"; selected?: boolean }) {
  return (
    <button
      data-tl={`view-${id}`}
      aria-label={`${id} view`}
      className={`flex h-full w-[24px] items-center justify-center text-[#1f2430] transition-colors data-[hover=true]:bg-[#EDEDF1] ${selected ? "bg-[#F1F1F4]" : "bg-white"}`}
    >
      <Icon name={icon} size={12} />
    </button>
  );
}
