"use client";

import type { ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CommentsPanel } from "./CommentsPanel";
import { DocEditor } from "./DocEditor";
import { DocToast } from "./DocToast";
import { DocumentView } from "./DocumentView";
import { EditMenu } from "./EditMenu";
import { canRedo, createEditor, fontSizeOf, type EditorState } from "./editor-state";
import { FileMenu } from "./FileMenu";
import { FindReplacePanel } from "./FindReplacePanel";
import { FullScreenView } from "./FullScreenView";
import { InsertMenu, type InsertSub } from "./InsertMenu";
import { LinkDialog } from "./LinkDialog";
import { pageDecor } from "./PageDecor";
import { OutlinePanel } from "./OutlinePanel";
import { DEFAULT_OUTLINE_TABS, type OutlineTabs } from "./outline-state";
import { ViewMenu } from "./ViewMenu";
import { PANEL_WIDTH } from "./comments-data";
import { EMPTY_COMMENTS, type CommentsState } from "./comments-state";
import type { EditorMode } from "./editor-data";
import {
  DEFAULT_WATERMARK,
  NO_INSERTS,
  pageCount,
  tableWords,
  type BookmarkState,
  type ImageState,
  type PageInserts,
  type TableState,
  type WatermarkState,
  type ZoneState,
} from "./insert-state";
import { countWords } from "./sample-document";
import { VIEW_DEFAULTS } from "./view-menu-data";

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
 * `fileMenu`, `fileSub`, `intro`, `fade`. With a `startDocument` it also draws the View menu and the editor modes
 * (steps 14 to 18): `mode`, `viewMenu`, `viewSub`, `ruler`, `printLayout`, `nonPrinting`, `fullScreen` (+ `fsHint`, `fsKey`, `fsPressed`), and the side panels
 * `commentsOpen` + `comments`, `outlineOpen`, and the Insert menu (steps 19 to 22): `insertMenu`, `insertSub`, `pageImage`, `pageTable`, `linkDialog`. All default to off, so earlier steps are unchanged. The root carries data-scroller, where the timeline looks up targets.
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
  const mode = useTimelineVar<EditorMode>(tl, "mode", "editing");
  const viewMenu = useTimelineVar(tl, "viewMenu", false);
  const viewSub = useTimelineVar(tl, "viewSub", false);
  const ruler = useTimelineVar(tl, "ruler", VIEW_DEFAULTS.ruler);
  const printLayout = useTimelineVar(tl, "printLayout", VIEW_DEFAULTS.printLayout);
  const nonPrinting = useTimelineVar(tl, "nonPrinting", VIEW_DEFAULTS.nonPrinting);
  const commentsOpen = useTimelineVar(tl, "commentsOpen", false);
  const comments = useTimelineVar<CommentsState>(tl, "comments", EMPTY_COMMENTS);
  const outlineOpen = useTimelineVar(tl, "outlineOpen", false);
  const fullScreen = useTimelineVar(tl, "fullScreen", VIEW_DEFAULTS.fullScreen);
  const fsHint = useTimelineVar(tl, "fsHint", false);
  const fsKey = useTimelineVar(tl, "fsKey", false);
  const fsPressed = useTimelineVar(tl, "fsPressed", false);
  const outlineTabs = useTimelineVar<OutlineTabs>(tl, "outlineTabs", DEFAULT_OUTLINE_TABS);
  const pageImage = useTimelineVar<ImageState | null>(tl, "pageImage", null);
  const pageTable = useTimelineVar<TableState | null>(tl, "pageTable", null);
  const pageRules = useTimelineVar<string[]>(tl, "pageRules", NO_INSERTS.rules);
  const pageBreak = useTimelineVar<string | null>(tl, "pageBreak", null);
  const pageBookmarks = useTimelineVar<BookmarkState[]>(tl, "pageBookmarks", NO_INSERTS.bookmarks);
  const pageHeader = useTimelineVar<ZoneState | null>(tl, "pageHeader", null);
  const pageFooter = useTimelineVar<ZoneState | null>(tl, "pageFooter", null);
  const watermark = useTimelineVar<WatermarkState>(tl, "watermark", DEFAULT_WATERMARK);
  const inserts: PageInserts = {
    image: pageImage,
    table: pageTable,
    rules: pageRules,
    pageBreakBefore: pageBreak,
    bookmarks: pageBookmarks,
    header: pageHeader,
    footer: pageFooter,
    watermark,
  };
  const insertMenu = useTimelineVar(tl, "insertMenu", false);
  const insertSub = useTimelineVar<InsertSub>(tl, "insertSub", "");
  const linkDialog = useTimelineVar(tl, "linkDialog", false);
  const menuOpen = fileMenu || editMenu || viewMenu || insertMenu || linkDialog;

  return (
    <div data-scroller className="relative h-full w-full bg-white">
      <div className={`h-full w-full transition-opacity duration-700 motion-reduce:transition-none ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <DocEditor
          title={title}
          loading={loading}
          openMenu={fileMenu ? "file" : editMenu ? "edit" : viewMenu ? "view" : insertMenu ? "insert" : null}
          status={saveStatus}
          mode={mode}
          showRuler={ruler}
          leftInset={outlineOpen ? PANEL_WIDTH.outline : 0}
          rightInset={commentsOpen ? PANEL_WIDTH.comments : 0}
          commentsOpen={commentsOpen}
          outlineOpen={outlineOpen}
          decor={startDocument ? pageDecor(inserts) : undefined}
          live={
            startDocument
              ? { size: fontSizeOf(editor), canUndo: true, canRedo: canRedo(editor), words: countWords(editor.blocks) + tableWords(pageTable), pages: pageCount(inserts) }
              : undefined
          }
          overlay={
            <>
              <FileMenu open={fileMenu} submenu={fileSub} />
              {startDocument && (
                <>
                  <EditMenu open={editMenu} editor={editor} />
                  <ViewMenu open={viewMenu} submenu={viewSub} mode={mode} checks={{ printLayout, ruler, nonPrinting }} />
                  <InsertMenu open={insertMenu} sub={insertSub} />
                  <FindReplacePanel editor={editor} />
                  <CommentsPanel open={commentsOpen} state={comments} />
                  <OutlinePanel open={outlineOpen} tabs={outlineTabs} />
                  <LinkDialog tl={tl} />
                </>
              )}
              {overlay}
              <DocToast tl={tl} />
            </>
          }
        >
          {/* The floating selection toolbar hides while a menu or the Insert Link dialog is open. */}
          {startDocument && <DocumentView editor={editor} showToolbar={!menuOpen} nonPrinting={nonPrinting} inserts={inserts} />}
        </DocEditor>
      </div>
      {startDocument && (
        <FullScreenView open={fullScreen} editor={editor} hint={fsHint} escKey={{ shown: fsKey, pressed: fsPressed }} />
      )}
      {children}
      <div
        className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
