"use client";

import { SelectionFrame } from "./SelectionFrame";
import { DOODLE, SIGNATURE, type Stroke } from "./stroke-data";
import type { ObjectState } from "./insert-state";

/** Width in design px of the signature and of the drawing once they are in the page. */
const SIGNATURE_WIDTH = 110;
const DRAWING_WIDTH = 300;

type Props = {
  object: ObjectState;
  /** Show the floating toolbar of a selected drawing (hidden while a menu or dialog is open). */
  showToolbar: boolean;
};

/** One stroke drawn in black, scaled to a width. */
function StrokeArt({ stroke, width, color = "#111" }: { stroke: Stroke; width: number; color?: string }) {
  return (
    <svg width={width} height={(width * stroke.height) / stroke.width} viewBox={stroke.viewBox} className="block" aria-hidden>
      <path d={stroke.path} fill="none" stroke={color} strokeWidth={stroke.pen} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Something Insert > eSignature or Insert > Drawing put into the page, right under the line it was inserted on: the
 * signature (a small black stroke, about 110 px wide; hook page-signature) or the drawing (the larger doodle in the
 * same selection frame as the image of step 20: four blue corner handles and the dark floating toolbar; hooks
 * page-drawing-block, page-drawing, drawing-handle-<tl|tr|bl|br>, drawing-toolbar).
 */
export function ObjectBlock({ object, showToolbar }: Props) {
  if (object.kind === "signature") {
    return (
      <div data-tl="page-signature" className="doc-image-in my-[6px] w-fit px-[2px]">
        <StrokeArt stroke={SIGNATURE} width={SIGNATURE_WIDTH} />
      </div>
    );
  }
  return (
    <SelectionFrame
      selected={object.selected}
      showToolbar={showToolbar}
      hooks={{ block: "page-drawing-block", body: "page-drawing", handle: "drawing-handle", toolbar: "drawing-toolbar" }}
      className="mb-[16px] mt-[10px] w-[300px]"
      bodyClassName="w-full bg-white"
    >
      <StrokeArt stroke={DOODLE} width={DRAWING_WIDTH} />
    </SelectionFrame>
  );
}
