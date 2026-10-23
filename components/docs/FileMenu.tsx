"use client";

import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { DOWNLOAD_MENU, FILE_MENU } from "./file-menu-data";

/** Same enlargement as DocEditor on narrow screens, so the menu keeps its place under "File". */
const NARROW_ZOOM = 2.4;

type Props = {
  open: boolean;
  /** Show the Download submenu. */
  submenu?: boolean;
};

/**
 * The File menu card, anchored under "File" in the DocEditor menu row. Pass it as the editor's
 * `overlay`. Drive it with openFileMenu / closeFileMenu / hoverFileMenuItem (file-menu-timeline.ts),
 * or hover items with tl.hover(`[data-tl=file-item-<id>]`).
 */
export function FileMenu({ open, submenu = false }: Props) {
  const narrow = useNarrow();
  const card =
    "rounded-[8px] border border-[#EAEBEF] bg-white py-[3px] shadow-[0_8px_26px_-6px_rgba(17,24,39,0.18)]";
  return (
    <div
      aria-hidden={!open}
      data-tl="file-menu"
      className={`pointer-events-none absolute left-[43px] top-[57px] z-20 w-[180px] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
      style={{ zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div className={card}>
        {FILE_MENU.map((group, g) => (
          <div key={g} className={g > 0 ? "mt-[3px] border-t border-[#EEEEF1] pt-[3px]" : ""}>
            {group.map((it) => (
              <div
                key={it.id}
                data-tl={`file-item-${it.id}`}
                className={`mx-[3px] flex h-[24px] items-center gap-[6px] rounded-[6px] px-[5px] text-[11px] transition-colors ${
                  it.disabled ? "text-[#AEB2BC]" : "text-[#1f2430] data-[hover=true]:bg-[#F1F2F5]"
                }`}
              >
                <Icon name={it.icon} size={13} className="shrink-0" />
                <span className="flex-1 truncate">{it.label}</span>
                {it.shortcut && <span className="text-[9px] text-[#A3A8B3]">{it.shortcut}</span>}
                {it.submenu && <Icon name="chevronRight" size={9} className="mr-[6px] text-[#4b5060]" />}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        data-tl="file-submenu"
        className={`absolute left-[178px] top-[130px] w-[158px] transition-opacity duration-150 motion-reduce:transition-none ${
          open && submenu ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={card}>
          {DOWNLOAD_MENU.map((d) => (
            <div
              key={d.id}
              data-tl={`file-sub-${d.id}`}
              className="mx-[3px] flex h-[24px] items-center gap-[7px] rounded-[6px] px-[5px] text-[9.5px] text-[#3d4350] transition-colors data-[hover=true]:bg-[#F1F2F5]"
            >
              <Icon name={d.icon} size={12} className="shrink-0 text-[#6b7280]" />
              <span className="truncate">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
