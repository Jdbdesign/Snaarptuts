import type { ReactNode } from "react";
import { Icon } from "@/components/icons";

type Props = {
  url: string;
  /** Shown next to the traffic lights when the rail is collapsed. */
  onExpand?: () => void;
  children: ReactNode;
};

export function BrowserFrame({ url, onExpand, children }: Props) {
  return (
    <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-[14px] border border-[#E4E4EA] bg-white">
      <div className="flex h-[46px] shrink-0 items-center gap-3 border-b border-line px-4 min-[900px]:grid min-[900px]:grid-cols-[1fr_minmax(0,320px)_1fr]">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          {onExpand && (
            <button
              onClick={onExpand}
              aria-label="Expand step list"
              title="Show steps"
              className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F4F6] text-[#4b5060] hover:bg-[#ECECF1]"
            >
              <Icon name="sidebar" size={15} />
            </button>
          )}
        </div>
        <div className="flex h-[26px] min-w-0 flex-1 items-center justify-center rounded-full bg-[#F4F4F6] px-3 text-[12px] text-muted min-[900px]:flex-none">
          <span className="truncate">{url}</span>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
