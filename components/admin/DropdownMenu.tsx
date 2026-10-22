import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";

type MenuProps = { open: boolean; className?: string; children: ReactNode };

/** White card menu (soft shadow, 12px radius). Position it with `className`. */
export function DropdownMenu({ open, className = "", children }: MenuProps) {
  return (
    <div
      role="menu"
      className={`absolute z-20 w-[190px] origin-top-right rounded-xl border border-[#EEEEF2] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(17,17,17,0.25)] transition-all duration-200 ${
        open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

type ItemProps = {
  id: string;
  icon: IconName;
  danger?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

/** A menu row. A script can show it hovered with tl.hover(selector). */
export function MenuItem({ id, icon, danger, onClick, children }: ItemProps) {
  return (
    <div
      role="menuitem"
      data-tl={`menu-item-${id}`}
      onClick={onClick}
      className={`flex items-start gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] font-medium leading-[18px] transition-[background,transform] duration-150 data-[hover=true]:bg-[#F3F4F6] data-[pressed=true]:scale-[0.98] ${
        danger ? "text-[#E5484D]" : "text-[#2a2d36]"
      }`}
    >
      <Icon name={icon} size={16} className="mt-px shrink-0" />
      <span>{children}</span>
    </div>
  );
}
