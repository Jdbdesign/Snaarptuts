import type { ReactNode } from "react";

type Props = { id: string; onClick?: () => void; children: ReactNode };

/** Small outlined suggestion chip. A script can click it with [data-tl=chip-<id>]. */
export function Chip({ id, onClick, children }: Props) {
  return (
    <span
      data-tl={`chip-${id}`}
      onClick={onClick}
      className="inline-flex h-[26px] items-center rounded-full border border-[#E1E4EE] bg-white px-3 text-[12px] font-medium text-[#4b5060] transition-[background,transform] duration-150 data-[pressed=true]:scale-95 data-[pressed=true]:bg-[#F3F4F6]"
    >
      {children}
    </span>
  );
}
