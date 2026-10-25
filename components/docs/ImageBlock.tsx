"use client";

import { useId } from "react";
import { FloatingToolbarIcons } from "./FloatingToolbar";
import { IMAGE } from "./insert-data";
import type { ImageState } from "./insert-state";

type Props = ImageState & {
  /** Show the floating toolbar (hidden while a menu is open). */
  showToolbar: boolean;
};

const CORNERS = [
  { id: "tl", at: "left-0 top-0" },
  { id: "tr", at: "left-full top-0" },
  { id: "bl", at: "left-0 top-full" },
  { id: "br", at: "left-full top-full" },
] as const;

/**
 * The sample banner at the top of the page: it spans the text width and pushes the text below it. Selected, it gets a
 * thin blue outline, four round corner handles and the dark floating toolbar above it. The handles only get a hover
 * ring (the recording does not show resizing). Hooks: page-image-block, page-image, image-handle-<tl|tr|bl|br>, image-toolbar.
 * The banner is drawn here (no external file): a soft purple-to-blue card with simple shapes and the word "Acme Studio".
 */
export function ImageBlock({ selected, showToolbar }: Props) {
  return (
    <div data-tl="page-image-block" className="doc-image-in relative mb-[16px]">
      <div
        data-tl="page-image"
        className={`relative aspect-[16/9] w-full overflow-hidden rounded-[2px] ${selected ? "outline outline-1 outline-[#2B6FEB]" : ""}`}
      >
        <Banner />
      </div>

      {CORNERS.map((c) => (
        <span
          key={c.id}
          className={`absolute flex h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity duration-150 motion-reduce:transition-none ${c.at} ${
            selected ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            data-tl={`image-handle-${c.id}`}
            className="block h-[7px] w-[7px] rounded-full bg-[#2B6FEB] transition-transform data-[hover=true]:scale-125"
          />
        </span>
      ))}

      <span
        data-tl="image-toolbar"
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

function Banner() {
  const id = useId();
  return (
    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" role="img" aria-label={IMAGE.fileName}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="0.55" stopColor="#5B5BE6" />
          <stop offset="1" stopColor="#2F80ED" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill={`url(#${id}-bg)`} />
      <circle cx="540" cy="70" r="120" fill="#fff" opacity="0.1" />
      <circle cx="90" cy="340" r="140" fill="#fff" opacity="0.08" />
      <rect x="395" y="205" width="170" height="170" rx="30" transform="rotate(18 480 290)" fill="#fff" opacity="0.12" />
      <polygon points="468,96 520,186 416,186" fill="#fff" opacity="0.14" />
      <path d="M0 292C110 250 210 336 330 292S560 258 640 300V360H0Z" fill="#fff" opacity="0.1" />
      <text x="48" y="196" fill="#fff" fontFamily="Poppins, Arial, sans-serif" fontWeight="700" fontSize="58">
        {IMAGE.bannerText}
      </text>
      <rect x="50" y="216" width="96" height="6" rx="3" fill="#fff" opacity="0.75" />
    </svg>
  );
}
