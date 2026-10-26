"use client";

import { Icon } from "@/components/icons";
import { FILE_ARROW_WHEN_DISABLED, FILE_MENU, FILE_SUBS, UNAVAILABLE, type FileSubId } from "./slides-data";

type Props = {
  open: boolean;
  /** Which submenu is open ("" = none). */
  sub: FileSubId | "";
  /** "Make available offline" is on: a tick shows beside it. */
  offline: boolean;
  /** Id of a greyed-out item whose "not available yet" tooltip shows. */
  tip: string;
};

const card = "rounded-[8px] border border-[#E6E8EC] bg-white py-[6px] shadow-[0_8px_28px_-6px_rgba(17,24,39,0.22)]";

/**
 * The File menu card under "File" in the editor's menu bar. Pass it in SlidesEditor's `overlay`. Items are
 * [data-tl=file-item-<id>] and submenu rows [data-tl=file-sub-<id>]; the whole card is [data-tl=file-menu].
 * Labels, order, greyed items, shortcut hints and arrows are read from the recording (slides-data.ts).
 */
export function SlidesFileMenu({ open, sub, offline, tip }: Props) {
  return (
    <div
      aria-hidden={!open}
      data-tl="file-menu"
      className={`pointer-events-none absolute left-[8px] top-[62px] z-30 w-[209px] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
    >
      <div className={card}>
        {FILE_MENU.map((group, g) => (
          <div key={g} data-tl={`file-group-${g}`} className={g > 0 ? "mt-[5px] border-t border-[#EEEEF1] pt-[5px]" : ""}>
            {group.map((it) => {
              const arrow = it.sub || (it.disabled && FILE_ARROW_WHEN_DISABLED.includes(it.id));
              return (
                <div
                  key={it.id}
                  data-tl={`file-item-${it.id}`}
                  className={`relative flex h-[24px] items-center px-[23px] text-[10.5px] transition-colors ${
                    it.disabled ? "text-[#A9ADB8]" : "text-[#1f2430] data-[hover=true]:bg-[#F1F2F5]"
                  }`}
                >
                  {it.toggle && offline && <Icon name="check" size={10} className="absolute left-[8px] text-[#2B6FEB]" />}
                  <span className="flex-1 truncate">{it.label}</span>
                  {it.shortcut && <span className="mr-[-12px] text-[8.5px] text-[#A3A8B3]">{it.shortcut}</span>}
                  {arrow && <Icon name="chevronRight" size={9} className="mr-[-6px] text-[#6b7280]" />}

                  {it.sub && (
                    <div
                      className={`absolute left-full top-[-6px] ml-[2px] w-[196px] transition-opacity duration-150 motion-reduce:transition-none ${
                        open && sub === it.sub ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      <div className={card}>
                        {FILE_SUBS[it.sub].map((s) => (
                          <div
                            key={s.id}
                            data-tl={`file-sub-${s.id}`}
                            className="flex h-[24px] items-center px-[12px] text-[9.5px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5]"
                          >
                            <span className="truncate">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {it.disabled && UNAVAILABLE[it.id] && (
                    <div
                      data-tl={`file-tip-${it.id}`}
                      className={`absolute left-full top-[-3px] z-10 ml-[6px] w-[220px] rounded-[7px] bg-[#111] px-[10px] py-[7px] text-[9.5px] font-normal leading-[13px] text-white shadow-lg transition-opacity duration-150 motion-reduce:transition-none ${
                        open && tip === it.id ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      {UNAVAILABLE[it.id]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
