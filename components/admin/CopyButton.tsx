"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";

/** Copy icon. Clicking flashes a tiny dark "Copied" tooltip for 1 second. */
export function CopyButton({ tl, id, size = 14 }: { tl: Timeline; id: string; size?: number }) {
  const selector = `[data-tl=copy-${id}]`;
  return (
    <span
      data-tl={`copy-${id}`}
      onClick={() => tl.flash(selector, 1000)}
      className="group relative inline-flex shrink-0 cursor-pointer items-center justify-center text-[#9aa0ab] data-[pressed=true]:scale-90"
    >
      <Icon name="copy" size={size} />
      <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#111] px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity duration-150 group-data-[flash=true]:opacity-100">
        Copied
      </span>
    </span>
  );
}
