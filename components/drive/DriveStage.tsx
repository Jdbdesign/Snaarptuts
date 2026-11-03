"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DriveShell } from "./DriveShell";
import { DriveHomeView } from "./DriveHomeView";
import { DrivePhotosView } from "./DrivePhotosView";
import { DriveFilesView } from "./DriveFilesView";
import { DriveMeetingsView } from "./DriveMeetingsView";
import { DriveSharedView } from "./DriveSharedView";
import { DriveFavoritesView } from "./DriveFavoritesView";
import { DriveTrashView } from "./DriveTrashView";
import { DriveWorkspacesView } from "./DriveWorkspacesView";
import type { DrivePage } from "./drive-data";

type Props = {
  tl: Timeline;
};

export function DriveStage({ tl }: Props) {
  const page = useTimelineVar<DrivePage>(tl, "drivePage", "home");
  const fade = useTimelineVar(tl, "fade", false);

  return (
    <DriveShell
      tl={tl}
      overlay={
        <div
          data-tl="end-fade"
          style={{ opacity: fade ? 1 : 0 }}
          className="pointer-events-none absolute inset-0 z-50 bg-white transition-opacity duration-300"
        />
      }
    >
      {page === "home" && <DriveHomeView tl={tl} />}
      {page === "photos" && <DrivePhotosView tl={tl} />}
      {page === "files" && <DriveFilesView tl={tl} />}
      {page === "meetings" && <DriveMeetingsView tl={tl} />}
      {page === "shared" && <DriveSharedView tl={tl} />}
      {page === "favorites" && <DriveFavoritesView tl={tl} />}
      {page === "trash" && <DriveTrashView tl={tl} />}
      {page === "workspaces" && <DriveWorkspacesView tl={tl} />}
    </DriveShell>
  );
}
