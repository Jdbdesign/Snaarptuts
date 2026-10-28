"use client";

import { DocToast } from "@/components/docs/DocToast";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { FileDialog, ImportLocationDialog } from "./dialogs-files";
import { DetailsPanel, LocateDialog, NameVersionDialog, PrintDialog, RenameDialog } from "./dialogs-manage";
import { CopyDialog, EmailDialog, ShareDialog } from "./dialogs-share";
import type { FileSubId } from "./sheets-data";
import type { SheetModel, Workbook } from "./sheets-sample";
import { SheetsEditor } from "./SheetsEditor";
import { SheetsFileMenu } from "./SheetsFileMenu";
import { VersionHistoryScreen } from "./VersionHistoryScreen";

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

  return (
    // The first data-scroller in the scene is where the timeline looks up targets, so it sits on the root.
    <div data-scroller className="relative h-full w-full bg-white">
      <div className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <SheetsEditor
          title={title}
          sheets={sheets}
          activeSheet={activeSheet}
          openMenu={fileMenu ? "file" : null}
          sidePanel={<DetailsPanel tl={tl} />}
          panelOpen={detailsOpen}
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
            </>
          }
        />
        <VersionHistoryScreen tl={tl} title={title} />
        <DocToast tl={tl} />
      </div>
      <div className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${fade ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
