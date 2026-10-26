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
import { HomeScreen, StarredScreen, TrashScreen } from "./HomeScreens";
import { Spinner } from "./parts";
import { SlidesEditor } from "./SlidesEditor";
import { SlidesFileMenu } from "./SlidesFileMenu";
import { SlidesLayout } from "./SlidesLayout";
import { BLANK_SLIDE, LOADING, PRINT_SLIDES, TRASH, type FileSubId, type NavId, type SlideData } from "./slides-data";

const ONE_SLIDE: SlideData[] = [BLANK_SLIDE];

type Props = {
  tl: Timeline;
  /** The page the step starts on: the Presentations home, or the editor (the default). */
  startStage?: "home" | "editor";
  /** The presentation's name until the scene variable `title` is set (a rename). */
  startTitle: string;
};

/**
 * The one stage every Snaarp Slides step plays on: the Presentations home (with Starred and Trash), a loading screen and the editor
 * with the File menu and all of its dialogs. Everything is driven by scene variables, all off by default, so each step names its
 * own start state and works alone from the rail:
 * `stage` (home | loading | editor), `screen` (presentations | starred | trash), `swap`, `intro`, `fade`, `title`, `titleEdit`
 * ("" | selected | typing, text in `field:title`), `slides`, `selected`, `ratio`, `starred`, `fileMenu`, `fileSub`, `fileTip`,
 * `offline`, `dialog` (start | templates | open | import | publish | emailFile | emailCollab | move | nameVersion | details | pageSetup | trash),
 * `share`, `print`, `versionsOpen`, `trashItems`, `docToast`.
 * The root carries data-scroller, where the timeline looks up targets.
 */
export function SlidesApp({ tl, startStage = "editor", startTitle }: Props) {
  const narrow = useNarrow();
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const swap = useTimelineVar(tl, "swap", false);
  const stage = useTimelineVar<string>(tl, "stage", startStage);
  const screen = useTimelineVar<NavId>(tl, "screen", "presentations");
  const title = useTimelineVar(tl, "title", startTitle);
  const titleEdit = useTimelineVar<string>(tl, "titleEdit", "");
  const titleTyped = useTimelineVar<string | null>(tl, "field:title", null);
  const slides = useTimelineVar<SlideData[]>(tl, "slides", ONE_SLIDE);
  const selected = useTimelineVar(tl, "selected", 0);
  const ratio = useTimelineVar(tl, "ratio", 16 / 9);
  const starred = useTimelineVar(tl, "starred", false);
  const fileMenu = useTimelineVar(tl, "fileMenu", false);
  const fileSub = useTimelineVar<FileSubId | "">(tl, "fileSub", "");
  const fileTip = useTimelineVar(tl, "fileTip", "");
  const offline = useTimelineVar(tl, "offline", false);
  const versionsOpen = useTimelineVar(tl, "versionsOpen", false);
  const trashItems = useTimelineVar<{ name: string; meta: string }[]>(tl, "trashItems", TRASH.items);

  const inEditor = stage === "editor";
  const spinner = stage === "loading";

  return (
    // The first data-scroller in the scene is where the timeline looks up targets, so it sits on the root.
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
            openMenu={fileMenu ? "file" : null}
            slides={slides}
            selected={selected}
            ratio={ratio}
            sidePanel={versionsOpen ? <VersionPanel tl={tl} /> : undefined}
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
              </>
            }
          />
          <ShareDialog tl={tl} title={startTitle} />
          <PrintDialog tl={tl} copy={PRINT_SLIDES} landscape ratio={ratio} />
        </div>

        <DocToast tl={tl} />
      </div>
      <div className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${fade ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
