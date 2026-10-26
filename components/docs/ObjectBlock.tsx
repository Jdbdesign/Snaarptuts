"use client";

import { SelectionFrame } from "./SelectionFrame";
import { TYPED_SIGNATURE_FONT } from "./insert-data";
import { DOODLE, SIGNATURE, UPLOADED_SIGNATURE, type Stroke } from "./stroke-data";
import type { ObjectState } from "./insert-state";

/** Width in design px of the signature and of the drawing once they are in the page. */
const SIGNATURE_WIDTH = 110;
const UPLOAD_WIDTH = 120;
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

/** The hooks of a signature in the selection frame (steps 41 to 43). */
const SIGNATURE_HOOKS = { block: "page-signature-block", body: "page-signature", handle: "signature-handle", toolbar: "signature-toolbar" };

/**
 * Something Insert > eSignature, the eSignature menu or Insert > Drawing put into the page, right under the line it was inserted on:
 * the drawn signature (a small black stroke, about 110 px wide; hook page-signature), a typed signature (the name in an italic serif),
 * an uploaded signature image, or the drawing (the larger doodle; hooks page-drawing-block, page-drawing, drawing-handle-<tl|tr|bl|br>,
 * drawing-toolbar). A selected one sits in the same selection frame as the image of step 20: four blue corner handles and the dark
 * floating toolbar (signature hooks: page-signature-block, page-signature, signature-handle-<tl|tr|bl|br>, signature-toolbar). The
 * drawn signature of step 29 is not selected and stays a plain stroke.
 */
export function ObjectBlock({ object, showToolbar }: Props) {
  if (object.kind === "drawing") {
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

  if (object.kind === "signature" && !object.selected) {
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
      hooks={SIGNATURE_HOOKS}
      className="mb-[22px] mt-[26px] w-fit"
      bodyClassName="w-fit bg-white px-[4px]"
    >
      {object.kind === "typed" ? (
        <span className="block whitespace-nowrap py-[3px] text-[24px] italic leading-[1.2] text-[#111]" style={{ fontFamily: TYPED_SIGNATURE_FONT }}>
          {object.text}
        </span>
      ) : (
        <StrokeArt stroke={object.kind === "upload" ? UPLOADED_SIGNATURE : SIGNATURE} width={object.kind === "upload" ? UPLOAD_WIDTH : SIGNATURE_WIDTH} />
      )}
    </SelectionFrame>
  );
}
