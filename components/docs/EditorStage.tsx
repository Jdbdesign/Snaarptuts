"use client";

import type { ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DocEditor } from "./DocEditor";
import { DocToast } from "./DocToast";
import { FileMenu } from "./FileMenu";

type Props = {
  tl: Timeline;
  /** The title this step starts with (the scene variable `title` overrides it, e.g. after a rename). */
  startTitle: string;
  /** Extra things rendered inside the editor, above the File menu and below the toast (dialogs). */
  overlay?: ReactNode;
  /** Extra full-screen layers on top of the editor (e.g. the Version history page). */
  children?: ReactNode;
};

/**
 * The shared stage of Snaarp Doc steps 4 to 8: the DocEditor with the File menu and the DocToast, a fade-in at
 * the start (`intro`) and the quick white fade at the end (`fade`). Scene variables: `title`, `loading`,
 * `fileMenu`, `fileSub`, `intro`, `fade`. The root carries data-scroller, where the timeline looks up targets.
 */
export function EditorStage({ tl, startTitle, overlay, children }: Props) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const title = useTimelineVar(tl, "title", startTitle);
  const loading = useTimelineVar(tl, "loading", false);
  const fileMenu = useTimelineVar(tl, "fileMenu", false);
  const fileSub = useTimelineVar(tl, "fileSub", false);

  return (
    <div data-scroller className="relative h-full w-full bg-white">
      <div className={`h-full w-full transition-opacity duration-700 motion-reduce:transition-none ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <DocEditor
          title={title}
          loading={loading}
          openMenu={fileMenu ? "file" : null}
          overlay={
            <>
              <FileMenu open={fileMenu} submenu={fileSub} />
              {overlay}
              <DocToast tl={tl} />
            </>
          }
        />
      </div>
      {children}
      <div
        className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
