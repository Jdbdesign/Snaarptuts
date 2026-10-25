/**
 * The line Insert > Horizontal line adds: a thin grey rule across the text width with a little space above and below
 * (as in the recording). Hook: page-rule (the whole row, ring this one).
 */
export function HorizontalRule() {
  return (
    <div data-tl="page-rule" className="doc-image-in my-[6px] py-[6px]">
      <div className="h-px w-full bg-[#C4C8D0]" />
    </div>
  );
}
