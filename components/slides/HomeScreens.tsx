import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { HOME, HOME_TEMPLATES, RECENT, STARRED, TRASH, type HomeTemplate } from "./slides-data";

/** The Presentations home: "Start a new presentation" row and "Recent presentations". Hooks: blank-card, template-<id>, template-gallery, recent-<n>. */
export function HomeScreen() {
  const narrow = useNarrow();
  const templates = narrow ? HOME_TEMPLATES.slice(0, 3) : HOME_TEMPLATES;
  return (
    <div className="h-full overflow-hidden">
      <section data-tl="start-panel" className="mx-auto w-full max-w-[722px] px-[8px] pb-[16px] pt-[22px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-medium text-[#1f2430]">{HOME.startTitle}</h2>
          <button data-tl="template-gallery" className="rounded-[4px] text-[10.5px] font-medium text-[#2F62C8] transition-transform data-[pressed=true]:scale-[0.97]">
            {HOME.gallery}
          </button>
        </div>
        <div className="mt-[11px] flex gap-[14px]">
          <div className="w-[107px] shrink-0">
            <div
              data-tl="blank-card"
              className="flex h-[60px] w-full items-center justify-center rounded-[5px] border border-[#DADCE2] bg-white transition-[border-color,box-shadow] data-[hover=true]:border-[#7B4DF0] data-[hover=true]:shadow-[0_0_0_1px_#7B4DF0]"
            >
              <Icon name="plus" size={26} className="text-[#7B4DF0]" />
            </div>
            <p className="mt-[8px] text-center text-[9px] text-[#1f2430]">{HOME.blank}</p>
          </div>
          {templates.map((t) => (
            <TemplateCard key={t.id} t={t} />
          ))}
        </div>
        <div className="mt-[16px] h-[4px] w-[67%] rounded-full bg-[#E5E7EB]" />
      </section>

      <div className="border-t border-[#EEEEF1]" />

      <section className="mx-auto w-full max-w-[722px] px-[8px] pt-[16px]">
        <h2 className="text-[11px] font-medium text-[#1f2430]">{HOME.recentTitle}</h2>
        <div className="mt-[11px] flex gap-[13px]">
          {RECENT.map((r, i) => (
            <div key={r.name} data-tl={`recent-${i + 1}`} className="w-[134px] shrink-0 overflow-hidden rounded-[7px] border border-[#E5E7EB] bg-white transition-shadow data-[hover=true]:shadow-[0_2px_10px_-3px_rgba(17,24,39,0.25)]">
              <div className="h-[74px] border-b border-[#F0F1F4] bg-[#FDFDFD]" />
              <div className="px-[9px] pb-[8px] pt-[8px]">
                <p className="truncate text-[9.5px] font-medium text-[#1f2430]">{r.name}</p>
                <p className="mt-[5px] flex items-center gap-[4px] text-[8.5px] text-[#6b7280]">
                  <i className="h-[8px] w-[8px] shrink-0 rounded-[2px] bg-[#6D28D9]" />
                  <span className="truncate">{r.opened}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TemplateCard({ t }: { t: HomeTemplate }) {
  return (
    <div className="w-[107px] shrink-0">
      <div
        data-tl={`template-${t.id}`}
        className="flex h-[60px] w-full flex-col items-center justify-center rounded-[5px] border border-[#E5E7EB] transition-[box-shadow,transform] data-[hover=true]:shadow-[0_0_0_2px_#7B4DF0]"
        style={{ background: t.bg, color: t.fg }}
      >
        <span className="text-[9px] font-bold" style={{ fontFamily: "Georgia, serif" }}>{t.name}</span>
        <i className="mt-[4px] block h-[2px] w-[22px] rounded-full" style={{ background: t.accent }} />
      </div>
      <p className="mt-[8px] text-center text-[9px] text-[#1f2430]">{t.name}</p>
    </div>
  );
}

/** Starred: the presentations you have starred. */
export function StarredScreen() {
  return (
    <div className="mx-auto h-full w-full max-w-[722px] overflow-hidden px-[8px] pt-[26px]">
      <h1 className="text-[17px] font-bold leading-[22px]">{STARRED.title}</h1>
      <p className="mt-[3px] text-[10.5px] text-[#6b7280]">{STARRED.intro}</p>
      <div className="mt-[16px] flex gap-[13px]">
        {STARRED.items.map((r) => (
          <div key={r.name} className="w-[134px] shrink-0 overflow-hidden rounded-[7px] border border-[#E5E7EB] bg-white">
            <div className="h-[74px] border-b border-[#F0F1F4] bg-[#FDFDFD]" />
            <div className="px-[9px] pb-[8px] pt-[8px]">
              <p className="truncate text-[9.5px] font-medium text-[#1f2430]">{r.name}</p>
              <p className="mt-[5px] flex items-center gap-[4px] text-[8.5px] text-[#6b7280]">
                <Icon name="star" size={9} className="shrink-0 text-[#F5B400]" />
                <span className="truncate">{r.opened}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Trash: deleted presentations with Restore and Delete forever. Hooks: trash-restore-<n>, trash-delete-<n>. */
export function TrashScreen({ items }: { items: { name: string; meta: string }[] }) {
  return (
    <div className="mx-auto h-full w-full max-w-[722px] overflow-hidden px-[8px] pt-[26px]">
      <h1 data-tl="trash-title" className="w-fit text-[17px] font-bold leading-[22px]">{TRASH.title}</h1>
      <p className="mt-[3px] text-[10.5px] text-[#6b7280]">{TRASH.intro}</p>
      {items.length === 0 ? (
        <p data-tl="trash-empty" className="mt-[40px] text-center text-[11px] text-[#6b7280]">{TRASH.empty}</p>
      ) : (
        <div className="mt-[16px] flex gap-[13px]">
          {items.map((r, i) => (
            <div key={r.name} data-tl={`trash-item-${i + 1}`} className="w-[150px] shrink-0 overflow-hidden rounded-[7px] border border-[#E5E7EB] bg-white">
              <div className="h-[74px] border-b border-[#F0F1F4] bg-[#FDFDFD]" />
              <div className="px-[9px] pb-[9px] pt-[8px]">
                <p className="truncate text-[9.5px] font-medium text-[#1f2430]">{r.name}</p>
                <p className="mt-[3px] flex items-center gap-[4px] text-[8.5px] text-[#6b7280]">
                  <i className="h-[8px] w-[8px] shrink-0 rounded-[2px] bg-[#6D28D9]" />
                  {r.meta}
                </p>
                <div className="mt-[8px] flex items-center justify-between border-t border-[#F0F1F4] pt-[7px] text-[8.5px] font-medium">
                  <span data-tl={`trash-restore-${i + 1}`} className="flex items-center gap-[3px] rounded-[4px] px-[3px] py-[1px] text-[#2F62C8] transition-colors data-[hover=true]:bg-[#EEF3FD]">
                    <Icon name="restore" size={10} />
                    {TRASH.restore}
                  </span>
                  <span data-tl={`trash-delete-${i + 1}`} className="flex items-center gap-[3px] rounded-[4px] px-[3px] py-[1px] text-[#C0272D] transition-colors data-[hover=true]:bg-[#FDEEEE]">
                    <Icon name="trash" size={10} />
                    {TRASH.deleteForever}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
