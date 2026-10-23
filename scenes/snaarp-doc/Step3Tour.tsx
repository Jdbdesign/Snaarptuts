"use client";

import { DocEditor } from "@/components/docs/DocEditor";
import { FileMenu } from "@/components/docs/FileMenu";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { DOCUMENT } from "./step3-data";

/* Snaarp Doc, step 3: a tour of the empty editor, then the File menu opens. */

export function Step3Tour({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const fileMenu = useTimelineVar(tl, "fileMenu", false);
  const fileSub = useTimelineVar(tl, "fileSub", false);

  return (
    <div data-scroller className="relative h-full w-full bg-white">
      <div className={`h-full w-full transition-opacity duration-700 motion-reduce:transition-none ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <DocEditor
          title={DOCUMENT.title}
          openMenu={fileMenu ? "file" : null}
          overlay={<FileMenu open={fileMenu} submenu={fileSub} />}
        />
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
