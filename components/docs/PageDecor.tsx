"use client";

import { WATERMARK } from "./insert-data";
import { PAGE_BODY_MIN, PAGE_TOP_PAD, type PageInserts, type PageNumbersState, type ZoneState } from "./insert-state";

/**
 * Layers on the white page itself, for DocEditor's `decor` setting (steps 23 to 26):
 * - the thin grey band between page 1 and page 2 after a page break (hook `page-break`),
 * - the header zone at the top of the page and the footer zone at the bottom: small grey-dark text, a thin dotted line
 *   between the zone and the body, a blinking caret while the zone has focus (hooks `page-header`, `page-footer`),
 * - the watermark: large grey bold text, semi-transparent, across the middle of the first page (hook `page-watermark`).
 * Pure drawing; insert-timeline.ts changes the scene variables.
 */
export function pageDecor(inserts: PageInserts) {
  const { header, footer, watermark, pageBreakBefore, pageNumbers } = inserts;
  return {
    full: (
      <>
        {pageBreakBefore && (
          <div
            data-tl="page-break"
            className="doc-image-in absolute inset-x-0 h-[4px] border-y border-[#D6DAE1] bg-[#EDF0F5]"
            style={{ top: PAGE_TOP_PAD + PAGE_BODY_MIN }}
          />
        )}
        {watermark.text && <Watermark {...watermark} />}
        {pageNumbers && <PageNumber {...pageNumbers} />}
      </>
    ),
    text: (
      <>
        {header && <Zone kind="header" zone={header} />}
        {footer && <Zone kind="footer" zone={footer} />}
      </>
    ),
  };
}

/** The page number (Insert > Page elements > Page numbers): a small grey number at the top or bottom edge of the page. Hook page-number. */
function PageNumber({ position, align, start }: PageNumbersState) {
  const side = align === "left" ? "left-[16px]" : align === "right" ? "right-[16px]" : "left-1/2 -translate-x-1/2";
  return (
    <div className={`doc-image-in absolute ${position === "top" ? "top-[10px]" : "bottom-[10px]"} ${side}`}>
      <span data-tl="page-number" className="block px-[3px] text-[11px] leading-[16px] text-[#6b7280]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        {start}
      </span>
    </div>
  );
}

function Zone({ kind, zone }: { kind: "header" | "footer"; zone: ZoneState }) {
  const top = kind === "header";
  return (
    <div
      data-tl={`page-${kind}`}
      className={`doc-image-in absolute inset-x-0 h-[32px] text-[11px] leading-[16px] text-[#3d4350] ${
        top ? "top-0 border-b border-dotted border-[#C3C7CF] pt-[9px]" : "bottom-0 border-t border-dotted border-[#C3C7CF] pt-[9px]"
      }`}
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <span data-tl={`page-${kind}-text`}>{zone.text}</span>
      {zone.focus && <span className="doc-caret text-[#111]" />}
    </div>
  );
}

function Watermark({ text, transparency, layout }: PageInserts["watermark"]) {
  return (
    <div
      data-tl="page-watermark"
      className="absolute left-1/2 whitespace-nowrap font-bold"
      style={{
        top: PAGE_TOP_PAD + PAGE_BODY_MIN / 2,
        fontSize: WATERMARK.fontSize,
        lineHeight: 1,
        fontFamily: "Arial, Helvetica, sans-serif",
        color: `rgba(107, 114, 128, ${(100 - transparency) / 100})`,
        transform: `translate(-50%, -50%) rotate(${layout === "diagonal" ? WATERMARK.angle : 0}deg)`,
      }}
    >
      {text}
    </div>
  );
}
