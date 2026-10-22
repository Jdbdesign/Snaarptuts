"use client";

import { Checkbox } from "@/components/admin/Checkbox";
import { DropdownMenu, MenuItem } from "@/components/admin/DropdownMenu";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { PAGE, type TeamUser } from "../users-data";

const NO_USERS: TeamUser[] = [];
const GRID = "grid-cols-[40px_170px_196px_100px_100px_1fr]";

const ROLE = "bg-[#E6F0FD] text-[#2563C9]";
const STATUS = {
  Pending: "bg-[#FDF0D2] text-[#C2570C]",
  Active: "bg-[#DDF5E4] text-[#15803D]",
};

/**
 * The Team Members table: header, then the empty state or one row per user.
 * Scene variables: `team` (the users) and `menu` (index of the row whose actions menu is open, -1 = none).
 * On narrow screens the table scrolls sideways inside its card.
 */
export function TeamTable({ tl }: { tl: Timeline }) {
  const team = useTimelineVar(tl, "team", NO_USERS);
  const menu = useTimelineVar(tl, "menu", -1);

  return (
    <div className="max-[899px]:-mb-[96px] max-[899px]:overflow-x-auto max-[899px]:pb-[96px]">
      <div className="min-w-[640px] rounded-[10px] border border-[#ECECEF] bg-white">
        <div className={`grid ${GRID} items-center rounded-t-[10px] bg-[#F9FAFB] px-[12px] py-[8px] text-[9.5px] font-semibold tracking-[0.06em] text-[#4B5563]`}>
          <span className="flex">
            <Checkbox checked={false} size={11} />
          </span>
          {PAGE.columns.map((c, i) => (
            <span key={c} className={i === PAGE.columns.length - 1 ? "text-center" : ""}>
              {c}
            </span>
          ))}
        </div>

        <div className="min-h-[124px]">
        {team.length === 0 && (
          <div data-tl="team-empty" className="flex flex-col items-center gap-2 py-[30px] text-[#9CA3AF]">
            <Icon name="users" size={34} />
            <p className="text-[12px] leading-4">{PAGE.empty}</p>
          </div>
        )}

        {team.map((u, i) => (
          <div
            key={u.email}
            data-tl={`row-${i}`}
            className={`tl-row-in grid ${GRID} items-center border-t border-[#F0F0F3] px-[12px] py-[11px] text-[12px] text-[#1F2937] ${i === team.length - 1 ? "rounded-b-[10px]" : ""}`}
          >
            <span className="flex">
              <Checkbox checked={false} size={11} />
            </span>
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full text-[10px] font-medium text-white" style={{ background: u.color }}>
                {u.initials}
              </span>
              <span className="truncate font-medium text-[#111827]">{u.name}</span>
            </span>
            <span className="truncate text-[#374151]">{u.email}</span>
            <span>
              <span className={`rounded-[5px] px-2.5 py-[2px] text-[10.5px] leading-4 ${ROLE}`}>{u.role}</span>
            </span>
            <span>
              <span className={`rounded-[5px] px-2.5 py-[2px] text-[10.5px] leading-4 ${STATUS[u.status]}`}>{u.status}</span>
            </span>
            <span className="relative flex justify-center">
              <button
                data-tl={`row-menu-${i}`}
                aria-label="Actions"
                onClick={() => tl.setVar("menu", menu === i ? -1 : i)}
                className="flex h-[22px] w-[22px] items-center justify-center rounded text-[#374151] data-[pressed=true]:bg-[#F3F4F6]"
              >
                <Icon name="dots" size={13} />
              </button>
              <DropdownMenu open={menu === i} className="right-[-14px] top-full mt-0.5 !w-[112px] overflow-hidden !rounded-[6px] !p-0">
                {PAGE.menu.map((label, k) => (
                  <MenuItem
                    key={label}
                    id={label.toLowerCase().replace(" ", "-")}
                    danger={k === PAGE.menu.length - 1}
                    className="!rounded-none !px-2.5 !py-[6px] !text-[11px] !font-normal border-b border-[#EEEEF2] last:border-b-0"
                  >
                    {label}
                  </MenuItem>
                ))}
              </DropdownMenu>
            </span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
