"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeToastBanner({ tl }: Props) {
  const toast = useTimelineVar<string | null>(tl, "meToast", null);

  if (!toast) return null;

  return (
    <div
      data-tl="me-toast-banner"
      className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 shadow-xs transition-all duration-200 flex items-center justify-between animate-fadeIn"
    >
      <span>{toast}</span>
    </div>
  );
}
