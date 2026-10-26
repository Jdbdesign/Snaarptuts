"use client";

import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { TOOLS_MENU } from "./tools-menu-data";

/** Same enlargement as DocEditor on narrow screens, so the menu keeps its place under "Tools". */
const NARROW_ZOOM = 2.4;

const CARD = "rounded-[10px] border border-[#EAEBEF] bg-white py-[3px] shadow-[0_8px_26px_-6px_rgba(17,24,39,0.18)]";
const ROW = "mx-[3px] flex h-[24px] items-center gap-[6px] rounded-[6px] px-[5px] text-[11px] transition-colors";

/**
 * The Tools menu card, anchored under "Tools" in the DocEditor menu row. Pass it in the editor's `overlay`.
 * Drive it with clickToolsMenu / hoverToolsItem / chooseToolsItem (tools-menu-timeline.ts). Items carry
 * data-tl="tools-item-<id>" (spelling, word-count, outline, dictionary, notifications, preferences, accessibility); the card
 * itself "tools-menu-card". Greyed-out items have no hover and do nothing. Items live in tools-menu-data.ts.
 */
export function ToolsMenu({ open }: { open: boolean }) {
  const narrow = useNarrow();
  return (
    <div
      aria-hidden={!open}
      data-tl="tools-menu"
      className={`pointer-events-none absolute left-[237px] top-[57px] z-20 w-[196px] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
      style={{ zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div data-tl="tools-menu-card" className={CARD}>
        {TOOLS_MENU.map((group, g) => (
          <div key={g} className={g > 0 ? "mt-[3px] border-t border-[#EEEEF1] pt-[3px]" : ""}>
            {group.map((it) => (
              <div
                key={it.id}
                data-tl={`tools-item-${it.id}`}
                data-disabled={!!it.disabled}
                className={`${ROW} ${it.disabled ? "text-[#AEB2BC]" : "text-[#1f2430] data-[hover=true]:bg-[#F1F2F5]"}`}
              >
                <Icon name={it.icon} size={13} className="shrink-0" />
                <span className="flex-1 truncate">{it.label}</span>
                {it.shortcut && <span className="shrink-0 text-[9px] text-[#A3A8B3]">{it.shortcut}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
