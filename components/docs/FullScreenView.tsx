"use client";

import { useNarrow } from "@/lib/useNarrow";
import { DocumentView } from "./DocumentView";
import type { EditorState } from "./editor-state";
import { FULL_SCREEN } from "./view-menu-data";

/** Same enlargement as DocEditor on narrow screens, so the text stays readable once the scene is scaled down. */
const NARROW_ZOOM = 2.4;

type Props = {
  /** View > Full screen is on. */
  open: boolean;
  /** The page that is on screen (the same editor state as the normal view). */
  editor: EditorState;
  /** Show the "Press Esc to exit full screen" pill. */
  hint: boolean;
  /** Show the "Esc" key chip, and whether it is pressed. */
  escKey: { shown: boolean; pressed: boolean };
};

/**
 * The full-screen view of the document (View > Full screen), drawn INSIDE the browser frame: it covers the editor
 * chrome (header, menus, toolbar, ruler, footer) with a dark neutral background and the page centred on it. It fades in
 * and out (0.3 s) and never uses the browser's own Fullscreen API. EditorStage draws it; drive it with
 * enterFullScreen / pressEscFromFullScreen (view-menu-timeline.ts). Hooks: fullscreen-view, fullscreen-hint, fullscreen-key.
 */
export function FullScreenView({ open, editor, hint, escKey }: Props) {
  const narrow = useNarrow();
  return (
    <div
      aria-hidden={!open}
      data-tl="fullscreen-view"
      className={`pointer-events-none absolute inset-0 z-40 overflow-hidden bg-[#26272B] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative h-full w-full" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
        <div className="absolute inset-x-0 bottom-0 top-[105px] flex justify-center overflow-hidden">
          <div
            className={`h-[1300px] shrink-0 bg-white px-[6%] pt-[52px] shadow-[0_0_40px_rgba(0,0,0,0.35)] ${narrow ? "w-[86%]" : "w-[608px]"}`}
          >
            <DocumentView editor={editor} showToolbar={false} />
          </div>
        </div>

        <div
          data-tl="fullscreen-hint"
          className={`absolute left-1/2 top-[10px] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#111] px-[14px] py-[6px] text-[12px] text-white shadow-lg transition-opacity duration-500 motion-reduce:transition-none ${
            hint ? "opacity-100" : "opacity-0"
          }`}
        >
          {FULL_SCREEN.hint}
        </div>
        <div
          data-tl="fullscreen-key"
          className={`absolute left-1/2 top-[8px] -translate-x-1/2 rounded-[7px] border px-[12px] py-[5px] text-[12px] font-medium text-white shadow-[0_2px_0_rgba(0,0,0,0.5)] transition-[opacity,transform,background-color] duration-150 motion-reduce:transition-none ${
            escKey.shown ? "opacity-100" : "opacity-0"
          } ${escKey.pressed ? "translate-y-[2px] scale-95 border-white/60 bg-white/30" : "border-white/30 bg-white/10"}`}
        >
          {FULL_SCREEN.key}
        </div>
      </div>
    </div>
  );
}
