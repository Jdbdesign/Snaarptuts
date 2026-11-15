"use client";

import type { Timeline } from "@/lib/timeline";
import { ZeusStage } from "@/components/zeus/ZeusStage";

interface Props {
  tl: Timeline;
}

export function Step18({ tl }: Props) {
  return <ZeusStage tl={tl} />;
}
