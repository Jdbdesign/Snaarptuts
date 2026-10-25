"use client";

import { useId } from "react";
import { SelectionFrame } from "./SelectionFrame";
import { IMAGE } from "./insert-data";
import type { ImageState } from "./insert-state";

type Props = ImageState & {
  /** Show the floating toolbar (hidden while a menu is open). */
  showToolbar: boolean;
};

/**
 * The sample banner at the top of the page: it spans the text width and pushes the text below it. Selected, it gets a
 * thin blue outline, four round corner handles and the dark floating toolbar above it. The handles only get a hover
 * ring (the recording does not show resizing). Hooks: page-image-block, page-image, image-handle-<tl|tr|bl|br>, image-toolbar.
 * The banner is drawn here (no external file): a soft purple-to-blue card with simple shapes and the word "Acme Studio".
 */
export function ImageBlock({ selected, showToolbar }: Props) {
  return (
    <SelectionFrame
      selected={selected}
      showToolbar={showToolbar}
      hooks={{ block: "page-image-block", body: "page-image", handle: "image-handle", toolbar: "image-toolbar" }}
      className="mb-[16px]"
      bodyClassName="aspect-[16/9] w-full"
    >
      <Banner />
    </SelectionFrame>
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
