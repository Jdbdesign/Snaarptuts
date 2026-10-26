import { SlideElements, type SlideViewState } from "./SlideElements";
import { SLIDE_PLACEHOLDERS, type SlideData } from "./slides-data";

type Props = {
  slide: SlideData;
  /** Width over height of the page (16 / 9 or 4 / 3). */
  ratio: number;
  /** Fills its parent's height (the canvas) or its parent's width (a thumbnail). */
  className?: string;
  /** Selection, text editing, find marks and guides: only the big canvas passes this (steps 20-36). */
  view?: SlideViewState;
};

/**
 * One slide, drawn at any size: everything is sized in container-query units (cqw) of the slide itself,
 * so the same markup serves the big canvas and the thumbnails.
 */
export function SlideView({ slide, ratio, className = "", view }: Props) {
  return (
    <div
      data-slide={slide.id}
      className={`relative overflow-hidden bg-white [container-type:inline-size] ${className}`}
      style={{ aspectRatio: String(ratio) }}
      // Clicking the empty page clears the selection (elements stop the click before it gets here).
      onClick={view?.onSelect ? () => view.onSelect?.(null) : undefined}
    >
      {slide.elements ? <SlideElements elements={slide.elements} view={view} ratio={ratio} /> : <Content slide={slide} />}
    </div>
  );
}

function Content({ slide }: { slide: SlideData }) {
  const font = { fontFamily: "Arial, Helvetica, sans-serif" };
  if (slide.kind === "blank") {
    return (
      <div className="absolute inset-0 text-center text-[#A3A3A3]" style={font}>
        <p className="absolute inset-x-0 top-[31%] text-[8cqw] leading-none">{SLIDE_PLACEHOLDERS.title}</p>
        <p className="absolute inset-x-0 top-[57%] text-[3.4cqw] leading-none">{SLIDE_PLACEHOLDERS.subtitle}</p>
      </div>
    );
  }
  if (slide.kind === "bullets") {
    return (
      <div className="absolute inset-0 px-[8cqw] pt-[9cqw] text-[#1f2430]" style={font}>
        <p className="text-[6.4cqw] font-bold leading-none">{slide.title}</p>
        <ul className="mt-[5cqw] space-y-[2.2cqw] text-[3.8cqw] leading-none">
          {slide.bullets?.map((b) => (
            <li key={b} className="flex items-center gap-[1.8cqw]">
              <i className="inline-block h-[1.2cqw] w-[1.2cqw] shrink-0 rounded-full bg-[#2B6FEB]" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // "title" and "closing": a centred title with a subtitle under it
  return (
    <div className="absolute inset-0 text-center text-[#1f2430]" style={font}>
      <p className="absolute inset-x-0 top-[31%] text-[8.5cqw] font-bold leading-none">{slide.title}</p>
      <i className="absolute left-1/2 top-[52%] block h-[0.9cqw] w-[10cqw] -translate-x-1/2 rounded-full bg-[#2B6FEB]" />
      <p className="absolute inset-x-0 top-[59%] text-[3.6cqw] leading-none text-[#6b7280]">{slide.subtitle}</p>
    </div>
  );
}
