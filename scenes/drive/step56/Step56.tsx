"use client";

import type { Timeline } from "@/lib/timeline";
import { DriveStage } from "@/components/drive/DriveStage";

type Props = {
  tl: Timeline;
};

export function Step56({ tl }: Props) {
  return <DriveStage tl={tl} />;
}
