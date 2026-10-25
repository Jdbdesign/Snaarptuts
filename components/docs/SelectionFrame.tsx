"use client";

import type { ReactNode } from "react";
import { FloatingToolbarIcons } from "./FloatingToolbar";

const CORNERS = [
  { id: "tl", at: "left-0 top-0" },
  { id: "tr", at: "left-full top-0" },
  { id: "bl", at: "left-0 top-full" },
  { id: "br", at: "left-full top-full" },
] as const;

type Props = {
  /** Four blue corner handles, a thin blue outline and the dark floating toolbar show. */
  selected: boolean;
  /** Show the floating toolbar (hidden while a menu is open). */
  showToolbar: boolean;
  /** The data-tl names of the parts: the whole block, the picture, the corner handles (+ "-<tl|tr|bl|br>") and the toolbar. */
  hooks: { block: string; body: string; handle: string; toolbar: string };
  /** Classes of the outer block (size and spacing). */
  className?: string;
  /** Classes of the picture box (aspect ratio or size). */
  bodyClassName?: string;
  children: ReactNode;
};

/**
 * What a selected picture in the page looks like (the sample banner of step 20, the drawing of step 30): the picture, a
 * thin blue outline, four round corner handles that only get a hover ring, and the dark floating toolbar above it.
 */
export function SelectionFrame({ selected, showToolbar, hooks, className = "", bodyClassName = "", children }: Props) {
  return (
    <div data-tl={hooks.block} className={`doc-image-in relative ${className}`}>
      <div
        data-tl={hooks.body}
        className={`relative overflow-hidden rounded-[2px] ${bodyClassName} ${selected ? "outline outline-1 outline-[#2B6FEB]" : ""}`}
      >
        {children}
      </div>

      {CORNERS.map((c) => (
        <span
          key={c.id}
          className={`absolute flex h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity duration-150 motion-reduce:transition-none ${c.at} ${
            selected ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            data-tl={`${hooks.handle}-${c.id}`}
            className="block h-[7px] w-[7px] rounded-full bg-[#2B6FEB] transition-transform data-[hover=true]:scale-125"
          />
        </span>
      ))}

      <span
        data-tl={hooks.toolbar}
        aria-hidden
        className={`pointer-events-none absolute bottom-full left-1/2 z-10 mb-[10px] flex h-[28px] -translate-x-1/2 items-center gap-[1px] whitespace-nowrap rounded-[8px] bg-[#16171B] px-[7px] text-white shadow-[0_6px_18px_-4px_rgba(0,0,0,0.35)] transition-opacity duration-150 motion-reduce:transition-none ${
          selected && showToolbar ? "opacity-100" : "opacity-0"
        }`}
      >
        <FloatingToolbarIcons />
      </span>
    </div>
  );
}
