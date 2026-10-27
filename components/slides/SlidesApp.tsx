"use client";

import { DocToast } from "@/components/docs/DocToast";
import { PrintDialog } from "@/components/docs/PrintDialog";
import { ShareDialog } from "@/components/docs/ShareDialog";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { EmailCollabDialog, EmailFileDialog, MoveDialog, PublishDialog } from "./dialogs-share";
import { ImportDialog, OpenDialog, StartDialog, TemplatesDialog } from "./dialogs-start";
import { DetailsDialog, NameVersionDialog, PageSetupDialog, TrashDialog, VersionPanel } from "./dialogs-manage";
import { ChartPanel, InsertImageDialog } from "./dialogs-insert";
import { ExplorePanel, PreferencesDialog } from "./dialogs-tools";
import { HomeScreen, StarredScreen, TrashScreen } from "./HomeScreens";
import { Spinner } from "./parts";
import { SlidesEditor } from "./SlidesEditor";
import { SlidesDropdown } from "./SlidesDropdown";
import { ToolbarCards } from "./ToolbarCards";
import { TransitionPreview } from "./TransitionPreview";
import { SlidesFileMenu } from "./SlidesFileMenu";
import { SlidesFindPanel } from "./SlidesFindPanel";
import { SlidesFullScreen } from "./SlidesFullScreen";
import { SpeakerNotes } from "./SpeakerNotes";
import type { SlideViewState } from "./SlideElements";
import { elementsOf, findMatches, type SlideEl } from "./slide-elements";
import type { CellEdit, TextEdit } from "./slides-edit";
import { EIV_SELECTED } from "./slide-elements-data";
import { ZOOM_FACTOR, ZOOM_LABEL, type DropdownId } from "./slides-menus-data";
import { applyPaint, isFmtOn } from "./slides-format";
import { findMisspellingIn, type SpellMark } from "./slides-tools";
import { SPELLING } from "./slides-tools-data";
import { ThemeContext } from "./slides-theme";
import { DEFAULT_THEME, type ThemeId } from "./slides-toolbar-data";
import { SlidesLayout } from "./SlidesLayout";
import { BLANK_SLIDE, LOADING, PRINT_SLIDES, TRASH, type FileSubId, type NavId, type SlideData } from "./slides-data";

const ONE_SLIDE: SlideData[] = [BLANK_SLIDE];
const NO_IDS: string[] = [];

type Props = {
  tl: Timeline;
  /** The page the step starts on: the Presentations home, or the editor (the default). */
  startStage?: "home" | "editor";
  /** The presentation's name until the scene variable `title` is set (a rename). */
  startTitle: string;
  /** The deck the step starts with (default: one blank title slide). Steps 20-36 pass the three-slide deck with element content. */
  startSlides?: SlideData[];
  /** The slide that is selected at the start (default: the first). */
  startSelected?: number;
};

/**
 * The one stage every Snaarp Slides step plays on: the Presentations home (with Starred and Trash), a loading screen and the editor
 * with the File menu and all of its dialogs. Everything is driven by scene variables, all off by default, so each step names its
 * own start state and works alone from the rail:
 * `stage` (home | loading | editor), `screen` (presentations | starred | trash), `swap`, `intro`, `fade`, `title`, `titleEdit`
 * ("" | selected | typing, text in `field:title`), `slides`, `selected`, `ratio`, `starred`, `fileMenu`, `fileSub`, `fileTip`,
 * `offline`, `dialog` (start | templates | open | import | publish | emailFile | emailCollab | move | nameVersion | details | pageSetup | trash),
 * `share`, `print`, `versionsOpen`, `trashItems`, `docToast`.
 * Edit, View and Insert (steps 20-36) add: `menuOpen` (edit | view | insert), `menuSub`, `menuTip`, `sel` (selected element ids), `clip`,
 * `undoStack` / `redoStack`, `textEdit` + `field:slideText`, `cellEdit` + `field:slideCell`, `findOpen` + `field:find` + `field:replace`
 * + `findMatchCase` + `findOrigin` + `findIndex`, `notesOpen` + `field:notes`, `rulers`, `rulerMark`, `guides`, `snap`, `zoom`, `tool`,
 * `toolMenu` (background | layout | theme | transition | zoom | shape: the open toolbar card), `theme`, `draw`, `marker`, `canvasX` / `canvasY` (0-1: how far a zoomed-in canvas is scrolled), `fullScreen` + `fsHint` + `fsKey` + `fsPressed` + `fsArrow` + `fsSlide`, `imagePick`.
 * The root carries data-scroller, where the timeline looks up targets.
 */
export function SlidesApp({ tl, startStage = "editor", startTitle, startSlides = ONE_SLIDE, startSelected = 0 }: Props) {
  const narrow = useNarrow();
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const swap = useTimelineVar(tl, "swap", false);
  const stage = useTimelineVar<string>(tl, "stage", startStage);
  const screen = useTimelineVar<NavId>(tl, "screen", "presentations");
  const title = useTimelineVar(tl, "title", startTitle);
  const titleEdit = useTimelineVar<string>(tl, "titleEdit", "");
  const titleTyped = useTimelineVar<string | null>(tl, "field:title", null);
  const slides = useTimelineVar<SlideData[]>(tl, "slides", startSlides);
  const selected = useTimelineVar(tl, "selected", startSelected);
  const ratio = useTimelineVar(tl, "ratio", 16 / 9);
  const starred = useTimelineVar(tl, "starred", false);
  const fileMenu = useTimelineVar(tl, "fileMenu", false);
  const fileSub = useTimelineVar<FileSubId | "">(tl, "fileSub", "");
  const fileTip = useTimelineVar(tl, "fileTip", "");
  const offline = useTimelineVar(tl, "offline", false);
  const versionsOpen = useTimelineVar(tl, "versionsOpen", false);
  const trashItems = useTimelineVar<{ name: string; meta: string }[]>(tl, "trashItems", TRASH.items);

  const menuOpen = useTimelineVar<string>(tl, "menuOpen", "");
  const menuSub = useTimelineVar<string>(tl, "menuSub", "");
  const menuTip = useTimelineVar<string>(tl, "menuTip", "");
  const sel = useTimelineVar<string[]>(tl, "sel", NO_IDS);
  const clip = useTimelineVar<SlideEl[] | null>(tl, "clip", null);
  const textEdit = useTimelineVar<TextEdit | null>(tl, "textEdit", null);
  const typed = useTimelineVar(tl, "field:slideText", "");
  const cellEdit = useTimelineVar<CellEdit | null>(tl, "cellEdit", null);
  const cellTyped = useTimelineVar(tl, "field:slideCell", "");
  const findOpen = useTimelineVar(tl, "findOpen", false);
  const findQuery = useTimelineVar(tl, "field:find", "");
  const findCase = useTimelineVar(tl, "findMatchCase", false);
  const findOrigin = useTimelineVar(tl, "findOrigin", EIV_SELECTED);
  const findIndex = useTimelineVar(tl, "findIndex", 0);
  const notesOpen = useTimelineVar(tl, "notesOpen", false);
  const notesText = useTimelineVar(tl, "field:notes", "");
  const rulers = useTimelineVar(tl, "rulers", false);
  const rulerMark = useTimelineVar<{ x: number; y: number } | null>(tl, "rulerMark", null);
  const guides = useTimelineVar(tl, "guides", false);
  const snap = useTimelineVar<{ v?: number; h?: number } | null>(tl, "snap", null);
  const zoom = useTimelineVar(tl, "zoom", "100");
  const tool = useTimelineVar(tl, "tool", "select");
  const scrollX = useTimelineVar(tl, "canvasX", 0);
  const scrollY = useTimelineVar(tl, "canvasY", 0);
  const draw = useTimelineVar<{ x: number; y: number; w: number; h: number } | null>(tl, "draw", null);
  const marker = useTimelineVar<{ x: number; y: number } | null>(tl, "marker", null);
  const theme = useTimelineVar<ThemeId>(tl, "theme", DEFAULT_THEME);
  const toolMenu = useTimelineVar<string>(tl, "toolMenu", "");
  const spellMark = useTimelineVar<SpellMark | null>(tl, "spell", null);
  const spellAuto = useTimelineVar(tl, "pref:spell", false);
  const exploreOpen = useTimelineVar(tl, "explore", false);

  const matches = findOpen && findQuery ? findMatches(slides, findOrigin, findQuery, findCase) : [];
  // Preferences > Automatic spelling check marks a misspelt word, without the suggestion card.
  const found = spellAuto ? findMisspellingIn(slides, selected) : null;
  const autoSpell = found ? { ...found, open: false, suggestion: SPELLING.right } : null;
  const view: SlideViewState = {
    selected: sel,
    editing: textEdit ? { ...textEdit, typed } : null,
    cell: cellEdit ? { ...cellEdit, typed: cellTyped } : null,
    find: findOpen && findQuery ? { query: findQuery, matchCase: findCase, current: matches[Math.min(findIndex, matches.length - 1)] ?? null } : undefined,
    spell: spellMark ? { ...spellMark, suggestion: SPELLING.right } : autoSpell,
    guides,
    snap,
    draw,
    marker,
    // Paint format: with a look picked up, the next element that is clicked gets it.
    onSelect: (id) => (id && tl.getVar("paintLook", null) ? applyPaint(tl, id) : tl.setVar("sel", id ? [id] : [])),
  };
  const chartSel = sel.length === 1 ? elementsOf(slides, selected).find((e) => e.id === sel[0] && e.kind === "chart") : undefined;
  const selEls = elementsOf(slides, selected).filter((e) => sel.includes(e.id));
  const every = (key: "bold" | "italic" | "underline" | "strike") => selEls.length > 0 && selEls.every((e) => isFmtOn(e, key));
  const checks = {
    notes: notesOpen,
    ruler: rulers,
    guides,
    bold: every("bold"),
    italic: every("italic"),
    underline: every("underline"),
    strike: every("strike"),
    skip: !!slides[Math.min(selected, slides.length - 1)]?.skipped,
  };
  const dropdown = (menu: DropdownId) => (
    <SlidesDropdown
      menu={menu}
      open={menuOpen === menu}
      sub={menuSub}
      tip={menuTip}
      hasSelection={sel.length > 0}
      hasClipboard={!!clip?.length}
      hasThree={sel.length >= 3}
      checks={checks}
    />
  );

  const inEditor = stage === "editor";
  const spinner = stage === "loading";

  return (
    // The first data-scroller in the scene is where the timeline looks up targets, so it sits on the root.
    <ThemeContext.Provider value={theme}>
    <div data-scroller className="relative h-full w-full bg-white">
      <div className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <div className={`absolute inset-0 ${stage === "home" ? "" : "pointer-events-none opacity-0"}`}>
          <SlidesLayout active={screen}>
            <div className="relative h-full">
              {screen === "presentations" && <HomeScreen />}
              {screen === "starred" && <StarredScreen />}
              {screen === "trash" && <TrashScreen items={trashItems} />}
              <div className={`pointer-events-none absolute inset-0 z-10 bg-white transition-opacity duration-150 motion-reduce:transition-none ${swap ? "opacity-100" : "opacity-0"}`} />
            </div>
          </SlidesLayout>
        </div>

        <div
          aria-hidden={!spinner}
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-[10px] bg-white text-[10px] text-[#6b7280] transition-opacity duration-300 motion-reduce:transition-none ${spinner ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <Spinner size={narrow ? 22 : 20} />
          {LOADING.presentation}
        </div>

        <div className={`absolute inset-0 z-20 bg-white transition-opacity duration-300 motion-reduce:transition-none ${inEditor ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <SlidesEditor
            title={title}
            titleEditing={titleEdit !== ""}
            titleText={titleTyped ?? title}
            titleSelected={titleEdit === "selected"}
            starred={starred}
            openMenu={fileMenu ? "file" : menuOpen || null}
            slides={slides}
            selected={selected}
            ratio={ratio}
            sidePanel={versionsOpen ? <VersionPanel tl={tl} /> : exploreOpen ? <ExplorePanel tl={tl} /> : chartSel?.kind === "chart" ? <ChartPanel tl={tl} chart={chartSel} /> : undefined}
            panelWidth={versionsOpen || exploreOpen ? 290 : 253}
            dropdowns={{ edit: dropdown("edit"), view: dropdown("view"), insert: dropdown("insert"), format: dropdown("format"), slide: dropdown("slide"), arrange: dropdown("arrange"), tools: dropdown("tools") }}
            toolMenu={toolMenu}
            canvasOverlay={<TransitionPreview tl={tl} slides={slides} selected={selected} ratio={ratio} />}
            onSelectSlide={(i) => {
              tl.setVar("selected", i);
              tl.setVar("sel", []);
            }}
            toolLayer={<ToolbarCards menu={toolMenu} theme={theme} bg={slides[Math.min(selected, slides.length - 1)]?.bg} transition={slides[Math.min(selected, slides.length - 1)]?.transition ?? "none"} zoom={zoom} />}
            activeTool={tool}
            zoomLabel={ZOOM_LABEL[zoom]}
            zoom={ZOOM_FACTOR[zoom] ?? 1}
            scroll={{ x: scrollX, y: scrollY }}
            rulers={rulers}
            rulerMark={rulerMark}
            view={view}
            notesPanel={notesOpen ? <SpeakerNotes tl={tl} /> : undefined}
            notesText={notesText}
            overlay={
              <>
                <SlidesFileMenu open={fileMenu} sub={fileSub} offline={offline} tip={fileTip} />
                <StartDialog tl={tl} />
                <TemplatesDialog tl={tl} />
                <OpenDialog tl={tl} />
                <ImportDialog tl={tl} />
                <PublishDialog tl={tl} />
                <EmailFileDialog tl={tl} title={title} />
                <EmailCollabDialog tl={tl} />
                <MoveDialog tl={tl} title={title} />
                <NameVersionDialog tl={tl} />
                <DetailsDialog tl={tl} title={title} slides={slides.length} />
                <PageSetupDialog tl={tl} />
                <TrashDialog tl={tl} title={title} />
                <InsertImageDialog tl={tl} />
                <PreferencesDialog tl={tl} />
                <SlidesFindPanel tl={tl} total={matches.length} current={findIndex} />
              </>
            }
          />
          <SlidesFullScreen tl={tl} slides={slides} ratio={ratio} />
          <ShareDialog tl={tl} title={startTitle} />
          <PrintDialog tl={tl} copy={PRINT_SLIDES} landscape ratio={ratio} />
        </div>

        <DocToast tl={tl} />
      </div>
      <div className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${fade ? "opacity-100" : "opacity-0"}`} />
    </div>
    </ThemeContext.Provider>
  );
}
