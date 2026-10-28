"use client";

import { Icon } from "@/components/icons";
import { FILE_MENU, FILE_SUBS, type FileSubId } from "./sheets-data";

type Props = {
  open: boolean;
  /** Which submenu is open ("" = none). */
  sub: FileSubId | "";
  /** "Make available offline" is on: a tick shows beside it. */
  offline: boolean;
};

const card = "rounded-[10px] border border-[#E6E8EC] bg-white py-[6px] shadow-[0_8px_28px_-6px_rgba(17,24,39,0.22)]";

/**
 * The File menu card under "File" in the editor's menu bar. Pass it in SheetsEditor's `overlay`. Items are
 * [data-tl=file-item-<id>] and submenu rows [data-tl=file-sub-<id>]; the whole card is [data-tl=file-menu].
 * Labels, order, groups, shortcut hints and arrows are read from the recording (sheets-data.ts).
 */
export function SheetsFileMenu({ open, sub, offline }: Props) {
  return (
    <div
      aria-hidden={!open}
      data-tl="file-menu"
      className={`pointer-events-none absolute left-[2px] top-[62px] z-30 w-[236px] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
    >
      <div className={card}>
        {FILE_MENU.map((group, g) => (
          <div key={g} data-tl={`file-group-${g}`} className={g > 0 ? "mt-[5px] border-t border-[#E8EAED] pt-[5px]" : ""}>
            {group.map((it) => (
              <div
                key={it.id}
                data-tl={`file-item-${it.id}`}
                className={`relative flex h-[29px] items-center pl-[40px] pr-[14px] text-[13px] transition-colors ${
                  it.disabled ? "text-[#A9ADB8]" : "text-[#1f2430] data-[hover=true]:bg-[#F1F3F4]"
                }`}
              >
                <Icon name={it.icon} size={17} className={`absolute left-[13px] ${it.disabled ? "text-[#B8BCC6]" : "text-[#5F6368]"}`} />
                <span className="flex-1 truncate">{it.label}</span>
                {it.toggle && offline && <Icon name="check" size={14} className="mr-[6px] text-[#1E8E3E]" />}
                {it.shortcut && <span className="text-[11.5px] text-[#A3A8B3]">{it.shortcut}</span>}
                {it.sub && <Icon name="chevronRight" size={11} className="text-[#6b7280]" />}

                {it.sub && (
                  <div
                    className={`absolute left-full top-[-6px] ml-[2px] w-[232px] transition-opacity duration-150 motion-reduce:transition-none ${
                      open && sub === it.sub ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <div className={card}>
                      {FILE_SUBS[it.sub].map((s) => (
                        <div
                          key={s.id}
                          data-tl={`file-sub-${s.id}`}
                          className="flex h-[29px] items-center px-[16px] text-[13px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F3F4]"
                        >
                          <span className="truncate">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
