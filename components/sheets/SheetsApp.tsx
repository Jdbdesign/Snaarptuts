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
import { obj, single, type Range } from "./grid-state";
import type { Floater, Groups } from "./SheetGrid";
import { ChartEditor, CHART_PANEL_W } from "./ChartEditor";
import { ChartGraphic, CHART_H, CHART_W } from "./ChartGraphic";
import type { ChartState } from "./chart-state";
import { CHART } from "./insert-data";
import { DropdownList, EmojiDialog, ValidationPanel, type DdOption, type DdPop } from "./InsertPanels";
import { SmartChipDialog } from "./SmartChipDialog";
import { CommentBox, NoteDialog, NoteTip, type CommentPop } from "./dialogs-insert";
import { FunctionCard, InsertImageDialog, LinkChipView, LinkPopover, type LinkChip, type LinkPop } from "./dialogs-insert";
import type { Clip, EditHistory } from "./edit-timeline";
import { AboutDialog, AccessibilityDialog, CustomFormatDialog, DEFAULT_A11Y, FilterPopup, FilterViewBar, ManageMacrosDialog, MacroDialog, NameRangeDialog, NotificationDialog, PaletteDialog, ProtectDialog, ProtectMessage, RangeEndDialog, ShortcutsDialog, SpellingDialog, type A11yState } from "./FdtDialogs";
import { autoRowHeights, hiddenRows, NO_FILTER, suggestion, type FilterState } from "./fdt-state";
import type { FView, Named } from "./fdt-timeline";
import { FDT } from "./fdt-data";
import { CurrencyDialog, MeetingDialogs, ToolbarLayer, toolLabels } from "./ToolbarMenus";
import type { Look } from "./toolbar-state";
import type { ToolState } from "./SheetsEditor";
import type { Rows } from "./grid-state";

// Stable fallbacks: useTimelineVar needs the same object every render.
const A1: Range = single(0, 0);
const NO_HITS: [number, number][] = [];
const NO_CELLS: string[] = [];
const NO_GROUPS: Groups = { rows: null, cols: null };
const NO_ROW_HEIGHTS: Record<number, number> = {};
const NO_OPTIONS: DdOption[] = [];
const NO_VIEWS: FView[] = [];
const NO_NAMES: Named[] = [];
const ALL_COLS = Array.from({ length: FDT.header.length }, (_, i) => i);
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
  // Insert > Function (the orange outline on the cells a formula reads) and Insert > Link (the popover and the chip under a cell)
  const refRange = useTimelineVar<Range | null>(tl, "refRange", null);
  const linkPop = useTimelineVar<LinkPop | null>(tl, "linkPop", null);
  const linkChip = useTimelineVar<LinkChip | null>(tl, "linkChip", null);
  // Insert > Dropdown: the Data validation rules panel and the list under a dropdown cell
  const dvPanel = useTimelineVar(tl, "dvPanel", false);
  const ddPop = useTimelineVar<DdPop | null>(tl, "ddPop", null);
  const ddOptions = useTimelineVar<DdOption[]>(tl, "ddOptions", NO_OPTIONS);
  // Insert > Comment and Note: the comment box beside a cell, and the note that shows while a cell is hovered
  // Format, Data, Tools and Help (steps 56-84): filters, named ranges, protection, accessibility, autocomplete
  const filter = useTimelineVar<FilterState>(tl, "filter", NO_FILTER);
  const fviews = useTimelineVar<FView[]>(tl, "fviews", NO_VIEWS);
  const fvBar = useTimelineVar<string | null>(tl, "fvBar", null);
  const fpCol = useTimelineVar(tl, "fpCol", -1);
  const nameList = useTimelineVar<Named[]>(tl, "nameList", NO_NAMES);
  const nameOpen = useTimelineVar(tl, "nameOpen", false);
  const nameLabel = useTimelineVar(tl, "nameLabel", "");
  const protMsg = useTimelineVar<{ r: number; c: number } | null>(tl, "protMsg", null);
  const a11y = useTimelineVar<A11yState>(tl, "a11y", DEFAULT_A11Y);
  const acOn = useTimelineVar(tl, "acOn", true);
  const commentPop = useTimelineVar<CommentPop | null>(tl, "commentPop", null);
  const noteTip = useTimelineVar<{ r: number; c: number; text: string } | null>(tl, "noteTip", null);
  // Toolbar and header tools (steps 85-116): the open dropdown (`tbMenu`), the open header popover (`hdrMenu`), Paint format and the collapsed toolbar
  const tbMenu = useTimelineVar<string>(tl, "tbMenu", "");
  const hdrMenu = useTimelineVar<string>(tl, "hdrMenu", "");
  const paint = useTimelineVar<Look | null>(tl, "tbPaint", null);
  const collapsed = useTimelineVar(tl, "tbCollapsed", false);
  const typedSize = useTimelineVar<string>(tl, "field:size", "");
  const active = sheets.find((x) => x.id === activeSheet) ?? sheets[0];
  const shownRows = autoRowHeights(active?.rows ?? [], active?.widths);
  const rowH = { ...shownRows, ...rowHeights };
  const hidden = hiddenRows(active?.rows ?? [], filter);
  const filtering = filter.on && sheets[0]?.rows.length > 0;
  const filteredCols = Object.entries(filter.hidden).filter(([, v]) => v.length).map(([k]) => Number(k));
  const cellNow = obj(active?.rows[sel.r1]?.[sel.c1]);
  const ghost = acOn && cellEdit ? suggestion(active?.rows ?? [], cellEdit.c, cellText) : "";
  const floaters: Floater[] =
    liveChart && activeSheet === sheets[0]?.id
      ? [
          {
            id: "chart",
            r: liveChart.at?.row ?? CHART.where.row,
            c: liveChart.at?.col ?? CHART.where.col,
            w: CHART_W * (liveChart.maximize ? 1.25 : 1),
            h: CHART_H * (liveChart.maximize ? 1.25 : 1),
            node: <ChartObject chart={liveChart} rows={dataRows} />,
          },
        ]
      : [];
  if (imgOver && activeSheet === sheets[0]?.id) floaters.push({ id: "img", r: imgOver.r, c: imgOver.c, w: imgOver.w, h: imgOver.h, node: <FloatImage img={imgOver} /> });

  if (linkPop && activeSheet === sheets[0]?.id) floaters.push({ id: "linkpop", r: linkPop.r + 1, c: linkPop.c, w: 290, h: 180, node: <LinkPopover tl={tl} sheets={sheets} /> });
  if (linkChip && !linkPop && activeSheet === sheets[0]?.id) floaters.push({ id: "linkchip", r: linkChip.r + 1, c: linkChip.c, w: 260, h: 30, node: <LinkChipView chip={linkChip} /> });

  if (ddPop && activeSheet === sheets[0]?.id) floaters.push({ id: "dd", r: ddPop.r + 1, c: ddPop.c, w: 150, h: 40 + ddOptions.length * 28, node: <DropdownList options={ddOptions} /> });

  if (fpCol >= 0 && activeSheet === sheets[0]?.id) floaters.push({ id: "fpop", r: 1, c: fpCol, w: 220, h: 230, node: <FilterPopup tl={tl} /> });
  if (protMsg && activeSheet === sheets[0]?.id) floaters.push({ id: "protmsg", r: protMsg.r, c: protMsg.c + 1, w: 210, h: 56, node: <ProtectMessage /> });
  if (commentPop && activeSheet === sheets[0]?.id) floaters.push({ id: "cmt", r: commentPop.r, c: commentPop.c + 1, w: 260, h: 140, node: <CommentBox tl={tl} /> });
  if (noteTip && activeSheet === sheets[0]?.id) floaters.push({ id: "note", r: noteTip.r, c: noteTip.c + 1, w: 180, h: 60, node: <NoteTip text={noteTip.text} /> });

  const labels = toolLabels(cellNow);
  const toolState: ToolState = {
    on: [cellNow.bold && "bold", cellNow.italic && "italic", cellNow.strike && "strike", cellNow.underline && "underline", paint && "paint", cellNow.wrap === "wrap" && "wrap"].filter((t): t is string => !!t),
    open: hdrMenu ? `hdr:${hdrMenu}` : tbMenu,
    font: labels.font,
    size: typedSize || labels.size,
    collapsed,
    hAlign: cellNow.align === "center" ? "edAlignC" : cellNow.align === "right" ? "edAlignR" : undefined,
  };
  const menuState: MenuState = {
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    ticks: [formulaBar && "show-bar", gridlines && "show-grid", formulas && "show-formulas", commentsOpen ? "comments-show" : "comments-hide", `zoom-${zoom}`].filter((t): t is string => !!t),
    hasRowGroup: !!groups.rows,
    hasColGroup: !!groups.cols,
    labels: { ...(filter.on ? { "dat-filter": "Remove filter" } : {}), "tls-auto": acOn ? "Autocomplete ✓" : "Autocomplete" },
    extraSubs: { fviews: fviews.map((v) => ({ id: `fv-view-${v.id}`, label: v.name })) },
    tick: [`fs-${cellNow.size ?? 10}`],
  };

  return (
    // The first data-scroller in the scene is where the timeline looks up targets, so it sits on the root.
    <div data-scroller data-reduce-motion={a11y.motion ? "on" : undefined} className="relative h-full w-full bg-white">
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
            format: <SheetMenu menu="format" open={emenu} sub={esub} state={menuState} />,
            data: <SheetMenu menu="data" open={emenu} sub={esub} state={menuState} />,
            tools: <SheetMenu menu="tools" open={emenu} sub={esub} state={menuState} />,
            extensions: <SheetMenu menu="extensions" open={emenu} sub={esub} state={menuState} />,
            help: <SheetMenu menu="help" open={emenu} sub={esub} state={menuState} />,
          }}
          grid={{
            sel,
            ants: clip?.range ?? null,
            refRange,
            edit: cellEdit ? { ...cellEdit, text: cellText, ghost } : null,
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
            rowHeights: rowH,
            hiddenRows: hidden,
            filterCols: filtering ? ALL_COLS : undefined,
            filteredCols,
            filterRows: filtering && hidden.size > 0 ? [1, Math.max(1, (active?.rows.length ?? 1) - 1)] : null,
            large: a11y.large,
            contrast: a11y.contrast,
          }}
          toolState={toolState}
          toolLayer={<ToolbarLayer tl={tl} cell={cellNow} zoom={zoom} />}
          gridTop={fvBar ? <FilterViewBar name={fvBar} /> : undefined}
          nameBox={nameList.length || nameLabel ? { label: nameLabel || undefined, open: nameOpen, list: nameList } : undefined}
          formulaBar={formulaBar}
          zoomLabel={`${zoom}%`}
          canUndo={menuState.canUndo}
          canRedo={menuState.canRedo}
          fullScreen={full}
          sidePanel={
            <>
              <div className={detailsOpen && !commentsOpen && !chartPanel && !dvPanel ? "" : "hidden"}><DetailsPanel tl={tl} /></div>
              <div className={(detailsOpen && !commentsOpen) || chartPanel || dvPanel ? "hidden" : "h-full"}><CommentsPanel tl={tl} /></div>
              <div className={chartPanel ? "h-full" : "hidden"}><ChartEditor tl={tl} /></div>
              <div className={dvPanel ? "h-full" : "hidden"}><ValidationPanel tl={tl} /></div>
            </>
          }
          panelOpen={detailsOpen || commentsOpen || chartPanel || dvPanel}
          panelWidth={chartPanel || dvPanel ? CHART_PANEL_W : 272}
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
              <FunctionCard tl={tl} />
              <EmojiDialog tl={tl} />
              <SmartChipDialog tl={tl} />
              <NoteDialog tl={tl} />
              <CustomFormatDialog tl={tl} />
              <NameRangeDialog tl={tl} />
              <RangeEndDialog tl={tl} />
              <ProtectDialog tl={tl} />
              <MacroDialog tl={tl} />
              <ManageMacrosDialog tl={tl} />
              <SpellingDialog tl={tl} />
              <NotificationDialog tl={tl} />
              <AccessibilityDialog tl={tl} />
              <ShortcutsDialog tl={tl} />
              <AboutDialog tl={tl} />
              <PaletteDialog tl={tl} />
              <CurrencyDialog tl={tl} />
              <MeetingDialogs tl={tl} />
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
