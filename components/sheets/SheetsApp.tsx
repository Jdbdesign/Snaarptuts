"use client";

import { DocToast } from "@/components/docs/DocToast";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { useNarrow } from "@/lib/useNarrow";
import { FileDialog, ImportLocationDialog } from "./dialogs-files";
import { DetailsPanel, LocateDialog, NameVersionDialog, PrintDialog, RenameDialog } from "./dialogs-manage";
import { CopyDialog, EmailDialog, ShareDialog } from "./dialogs-share";
import type { FileSubId } from "./sheets-data";
import type { SheetModel, Workbook } from "./sheets-sample";
import { SheetsEditor } from "./SheetsEditor";
import { SheetsFileMenu } from "./SheetsFileMenu";
import { VersionHistoryScreen } from "./VersionHistoryScreen";
import { CommentsPanel, FindCard } from "./EditViewPanels";
import { SheetMenu, type MenuState } from "./SheetMenu";
import { FULLSCREEN } from "./edit-view-data";
import { SHEETS_NARROW_ZOOM } from "./SheetsEditor";
import { single, type Range } from "./grid-state";
import type { Floater, Groups } from "./SheetGrid";
import { ChartEditor, CHART_PANEL_W } from "./ChartEditor";
import { ChartGraphic, CHART_H, CHART_W } from "./ChartGraphic";
import type { ChartState } from "./chart-state";
import { CHART } from "./insert-data";
import { InsertImageDialog } from "./dialogs-insert";
import type { Clip, EditHistory } from "./edit-timeline";
import type { Rows } from "./grid-state";

// Stable fallbacks: useTimelineVar needs the same object every render.
const A1: Range = single(0, 0);
const NO_HITS: [number, number][] = [];
const NO_CELLS: string[] = [];
const NO_GROUPS: Groups = { rows: null, cols: null };
const NO_ROW_HEIGHTS: Record<number, number> = {};
const NO_HISTORY: EditHistory = { past: [], future: [] };

/**
 * The one stage every Snaarp Sheets step plays on: the editor with the File menu and all of its dialogs, the Version history page
 * and the toast. Everything is driven by scene variables, all off by default, so each step names its own start state and works
 * alone from the rail:
 * `intro` (fade-in), `fade` (white fade-out), `title`, `sheets` (the tabs and their cells), `activeSheet`, `fileMenu`, `fileSub`,
 * `offline`, `trashed`, `notice` (green pill in the header), `detailsOpen`, `screen` (editor | versions),
 * `dialog` (open | import | importLocation | copy | share | email | rename | move | shortcut | nameVersion | print),
 * `fileTab`, `fileLoading`, `fileChooser`, `fileChosen`, `importChoice`, `copySame`, `copyComments`, `shareSuggest`, `sharePeople`,
 * `shareAccess`, `shareMenu`, `shareView`, `emailCopy`, `emailType`, `emailTypeOpen`, `locateTab`, `locateSel`, `versionSel`,
 * `showChanges`, `printLayout`, `printLayoutOpen`, `docToast`, plus the typed fields `field:<id>` and `focus`.
 * The Edit and View steps (20-36) add, all off by default: `sel`, `clip`, `cellEdit` (+ `field:cell`), `history`, `emenu` / `esub` (the open
 * Edit or View dropdown), `vFormulaBar`, `vGridlines`, `vFormulas`, `frozenRows`, `frozenCols`, `gridScrollRow`, `gridScrollCol`, `groups`,
 * `zoomPct`, `commentsOpen`, `comments`, `commentUi`, `commented`, `findOpen`, `findHits`, `findNow`, `findCase`, `findEntire`, `sheetFull`,
 * `fsBanner`, `fsPressed`. See edit-timeline.ts for the helpers that set them.
 * The root carries data-scroller, where the timeline looks up targets.
 */
export function SheetsApp({ tl, start }: { tl: Timeline; start: Workbook }) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const title = useTimelineVar(tl, "title", start.title);
  const sheets = useTimelineVar<SheetModel[]>(tl, "sheets", start.sheets);
  const activeSheet = useTimelineVar(tl, "activeSheet", start.sheets[0].id);
  const fileMenu = useTimelineVar(tl, "fileMenu", false);
  const fileSub = useTimelineVar<FileSubId | "">(tl, "fileSub", "");
  const offline = useTimelineVar(tl, "offline", false);
  const trashed = useTimelineVar(tl, "trashed", false);
  const notice = useTimelineVar(tl, "notice", "");
  const detailsOpen = useTimelineVar(tl, "detailsOpen", false);

  // Edit and View menus
  const narrow = useNarrow();
  const emenu = useTimelineVar(tl, "emenu", "");
  const esub = useTimelineVar(tl, "esub", "");
  const sel = useTimelineVar<Range>(tl, "sel", A1);
  const clip = useTimelineVar<Clip | null>(tl, "clip", null);
  const cellEdit = useTimelineVar<{ r: number; c: number } | null>(tl, "cellEdit", null);
  const cellText = useTimelineVar(tl, "field:cell", "");
  const history = useTimelineVar<EditHistory>(tl, "history", NO_HISTORY);
  const hits = useTimelineVar<[number, number][] | null>(tl, "findHits", null);
  const hitNow = useTimelineVar(tl, "findNow", -1);
  const commented = useTimelineVar<string[]>(tl, "commented", NO_CELLS);
  const formulaBar = useTimelineVar(tl, "vFormulaBar", true);
  const gridlines = useTimelineVar(tl, "vGridlines", true);
  const formulas = useTimelineVar(tl, "vFormulas", false);
  const frozenRows = useTimelineVar(tl, "frozenRows", 0);
  const frozenCols = useTimelineVar(tl, "frozenCols", 0);
  const scrollRow = useTimelineVar(tl, "gridScrollRow", 0);
  const scrollCol = useTimelineVar(tl, "gridScrollCol", 0);
  const groups = useTimelineVar<Groups>(tl, "groups", NO_GROUPS);
  const zoom = useTimelineVar(tl, "zoomPct", 100);
  const commentsOpen = useTimelineVar(tl, "commentsOpen", false);
  const full = useTimelineVar(tl, "sheetFull", false);
  const banner = useTimelineVar(tl, "fsBanner", false);
  const escPressed = useTimelineVar(tl, "fsPressed", false);

  // Insert > Chart: the chart object over the cells and its editor panel (see chart-state.ts)
  const chart = useTimelineVar<ChartState | null>(tl, "chart", null);
  const chartPanel = useTimelineVar(tl, "chartPanel", false);
  const ctChart = useTimelineVar(tl, "field:ct-chart", "");
  const ctH = useTimelineVar(tl, "field:ct-h", "");
  const ctV = useTimelineVar(tl, "field:ct-v", "");
  const liveChart = chart ? { ...chart, titles: { chart: ctChart, h: ctH, v: ctV } } : null;
  const dataRows = sheets[0]?.rows ?? [];
  // Insert > Image: a picture floating over the cells, and taller rows for a picture inside a cell
  const imgOver = useTimelineVar<FloatingImage | null>(tl, "imgOver", null);
  const rowHeights = useTimelineVar<Record<number, number>>(tl, "rowHeights", NO_ROW_HEIGHTS);
  const floaters: Floater[] =
    liveChart && activeSheet === sheets[0]?.id
      ? [
          {
            id: "chart",
            r: CHART.where.row,
            c: CHART.where.col,
            w: CHART_W * (liveChart.maximize ? 1.25 : 1),
            h: CHART_H * (liveChart.maximize ? 1.25 : 1),
            node: <ChartObject chart={liveChart} rows={dataRows} />,
          },
        ]
      : [];
  if (imgOver && activeSheet === sheets[0]?.id) floaters.push({ id: "img", r: imgOver.r, c: imgOver.c, w: imgOver.w, h: imgOver.h, node: <FloatImage img={imgOver} /> });

  const menuState: MenuState = {
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    ticks: [formulaBar && "show-bar", gridlines && "show-grid", formulas && "show-formulas", commentsOpen ? "comments-show" : "comments-hide", `zoom-${zoom}`].filter((t): t is string => !!t),
    hasRowGroup: !!groups.rows,
    hasColGroup: !!groups.cols,
  };

  return (
    // The first data-scroller in the scene is where the timeline looks up targets, so it sits on the root.
    <div data-scroller className="relative h-full w-full bg-white">
      <div className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <SheetsEditor
          title={title}
          sheets={sheets}
          activeSheet={activeSheet}
          openMenu={fileMenu ? "file" : emenu || null}
          menuSlots={{
            edit: <SheetMenu menu="edit" open={emenu} sub={esub} state={menuState} />,
            view: <SheetMenu menu="view" open={emenu} sub={esub} state={menuState} />,
            insert: <SheetMenu menu="insert" open={emenu} sub={esub} state={menuState} />,
          }}
          grid={{
            sel,
            ants: clip?.range ?? null,
            edit: cellEdit ? { ...cellEdit, text: cellText } : null,
            hits: hits ?? NO_HITS,
            hitNow,
            commented,
            gridlines,
            formulas,
            frozenRows,
            frozenCols,
            scrollRow: Math.round(scrollRow),
            scrollCol: Math.round(scrollCol),
            zoom,
            groups,
            floaters,
            rowHeights,
          }}
          formulaBar={formulaBar}
          zoomLabel={`${zoom}%`}
          canUndo={menuState.canUndo}
          canRedo={menuState.canRedo}
          fullScreen={full}
          sidePanel={
            <>
              <div className={detailsOpen && !commentsOpen && !chartPanel ? "" : "hidden"}><DetailsPanel tl={tl} /></div>
              <div className={(detailsOpen && !commentsOpen) || chartPanel ? "hidden" : "h-full"}><CommentsPanel tl={tl} /></div>
              <div className={chartPanel ? "h-full" : "hidden"}><ChartEditor tl={tl} /></div>
            </>
          }
          panelOpen={detailsOpen || commentsOpen || chartPanel}
          panelWidth={chartPanel ? CHART_PANEL_W : 272}
          offline={offline}
          trashed={trashed}
          notice={notice}
          overlay={
            <>
              <SheetsFileMenu open={fileMenu} sub={fileSub} offline={offline} />
              <FileDialog tl={tl} mode="open" />
              <FileDialog tl={tl} mode="import" />
              <ImportLocationDialog tl={tl} />
              <CopyDialog tl={tl} title={title} />
              <ShareDialog tl={tl} title={title} />
              <EmailDialog tl={tl} title={title} />
              <RenameDialog tl={tl} title={title} />
              <LocateDialog tl={tl} mode="move" title={title} />
              <LocateDialog tl={tl} mode="shortcut" title={title} />
              <NameVersionDialog tl={tl} />
              <PrintDialog tl={tl} rows={sheets[0]?.rows ?? []} />
              <FindCard tl={tl} />
              <InsertImageDialog tl={tl} />
            </>
          }
        />
        <VersionHistoryScreen tl={tl} title={title} />
        <div
          aria-hidden={!banner}
          data-tl="fs-banner"
          className={`pointer-events-none absolute left-1/2 top-[6px] z-50 flex -translate-x-1/2 items-center gap-[10px] rounded-[6px] bg-[#2B2D31] px-[18px] py-[9px] text-[14px] text-white shadow-[0_6px_20px_-4px_rgba(0,0,0,0.4)] transition-opacity duration-300 motion-reduce:transition-none ${banner ? "opacity-100" : "opacity-0"}`}
          style={{ zoom: narrow ? SHEETS_NARROW_ZOOM / 1.6 : 1 }}
        >
          {FULLSCREEN.banner}
          <span data-tl="fs-esc" className={`rounded-[5px] border border-[#6B6F76] px-[8px] py-[1px] text-[13px] transition-[transform,background] duration-100 ${escPressed ? "scale-90 bg-[#4A4D54]" : ""}`}>{FULLSCREEN.key}</span>
        </div>
        <DocToast tl={tl} />
      </div>
      <div className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${fade ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

/** The chart on the sheet: a dashed frame while it is only a preview, a plain frame once inserted, handles when selected. */
function ChartObject({ chart, rows }: { chart: ChartState; rows: Rows }) {
  const sel = chart.selected;
  return (
    <div data-tl="chart-obj" className={`relative h-full w-full bg-white transition-[box-shadow] ${chart.placed ? (sel ? "outline outline-[2px] outline-[#2563EB]" : "outline outline-1 outline-[#DADCE0]") : "outline outline-[1.5px] outline-dashed outline-[#2563EB]"}`}>
      <ChartGraphic chart={chart} rows={rows} />
      {sel && (
        <>
          <span className="absolute right-[6px] top-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/90 text-[#5F6368] shadow">⋮</span>
          {[[-4, -4], [-4, "50%"], [-4, "100%"], ["50%", -4], ["50%", "100%"], ["100%", -4], ["100%", "50%"], ["100%", "100%"]].map(([t, l], i) => (
            <i key={i} className="absolute h-[7px] w-[7px] rounded-full border border-white bg-[#2563EB]" style={{ top: t as number | string, left: l as number | string, transform: "translate(-50%,-50%)" }} />
          ))}
        </>
      )}
    </div>
  );
}

export type FloatingImage = { r: number; c: number; w: number; h: number; src: string; alt: string; selected: boolean };

/** A picture over the cells: selected = blue outline and eight handles (the bottom-right one is `float-img-handle`). */
function FloatImage({ img }: { img: FloatingImage }) {
  return (
    <div data-tl="float-img" className={`relative h-full w-full bg-white ${img.selected ? "outline outline-[2px] outline-[#2563EB]" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.src} alt={img.alt} className="h-full w-full object-cover" draggable={false} />
      {img.selected &&
        [[0, 0], [0, 50], [0, 100], [50, 0], [50, 100], [100, 0], [100, 50], [100, 100]].map(([t, l]) => (
          <i key={`${t}-${l}`} data-tl={t === 100 && l === 100 ? "float-img-handle" : undefined} className="absolute h-[8px] w-[8px] rounded-full border border-white bg-[#2563EB]" style={{ top: `${t}%`, left: `${l}%`, transform: "translate(-50%,-50%)" }} />
        ))}
    </div>
  );
}
