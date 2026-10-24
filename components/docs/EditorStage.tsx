"use client";

import type { ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DocEditor } from "./DocEditor";
import { DocToast } from "./DocToast";
import { DocumentView } from "./DocumentView";
import { EditMenu } from "./EditMenu";
import { canRedo, createEditor, fontSizeOf, type EditorState } from "./editor-state";
import { FileMenu } from "./FileMenu";
import { FindReplacePanel } from "./FindReplacePanel";
import { countWords } from "./sample-document";

/** Used while a stage has no document (steps 4 to 9): never drawn. */
const NO_DOCUMENT = createEditor([]);

type Props = {
  tl: Timeline;
  /** The title this step starts with (the scene variable `title` overrides it, e.g. after a rename). */
  startTitle: string;
  /** Extra things rendered inside the editor, above the File menu and below the toast (dialogs). */
  overlay?: ReactNode;
  /** Extra full-screen layers on top of the editor (e.g. the Version history page). */
  children?: ReactNode;
  /**
   * A document with real text (steps 10 to 13): the state the step starts from. It turns on the text, the caret and
   * selection, the Edit menu, the Find and replace panel and the Unsaved changes status. Left out, the page is blank.
   */
  startDocument?: EditorState;
};

/**
 * The shared stage of Snaarp Doc steps 4 to 8: the DocEditor with the File menu and the DocToast, a fade-in at
 * the start (`intro`) and the quick white fade at the end (`fade`). Scene variables: `title`, `loading`,
 * `fileMenu`, `fileSub`, `intro`, `fade`. The root carries data-scroller, where the timeline looks up targets.
 */
export function EditorStage({ tl, startTitle, overlay, children, startDocument }: Props) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const title = useTimelineVar(tl, "title", startTitle);
  const loading = useTimelineVar(tl, "loading", false);
  const fileMenu = useTimelineVar(tl, "fileMenu", false);
  const fileSub = useTimelineVar(tl, "fileSub", false);
  const editMenu = useTimelineVar(tl, "editMenu", false);
  const saveStatus = useTimelineVar<"saved" | "unsaved">(tl, "saveStatus", "saved");
  const editor = useTimelineVar<EditorState>(tl, "editor", startDocument ?? NO_DOCUMENT);

  return (
    <div data-scroller className="relative h-full w-full bg-white">
      <div className={`h-full w-full transition-opacity duration-700 motion-reduce:transition-none ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <DocEditor
          title={title}
          loading={loading}
          openMenu={fileMenu ? "file" : editMenu ? "edit" : null}
          status={saveStatus}
          live={
            startDocument
              ? { size: fontSizeOf(editor), canUndo: true, canRedo: canRedo(editor), words: countWords(editor.blocks) }
              : undefined
          }
          overlay={
            <>
              <FileMenu open={fileMenu} submenu={fileSub} />
              {startDocument && (
                <>
                  <EditMenu open={editMenu} editor={editor} />
                  <FindReplacePanel editor={editor} />
                </>
              )}
              {overlay}
              <DocToast tl={tl} />
            </>
          }
        >
          {/* The floating selection toolbar hides while a menu is open. */}
          {startDocument && <DocumentView editor={editor} showToolbar={!editMenu && !fileMenu} />}
        </DocEditor>
      </div>
      {children}
      <div
        className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
