"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { MePage } from "./me-data";
import { MeShell } from "./MeShell";
import { MeHomeView } from "./MeHomeView";
import { MeCalendarView } from "./MeCalendarView";
import { MeBookingDetailView } from "./MeBookingDetailView";
import { MeEventTypesView } from "./MeEventTypesView";
import { MeAvailabilityView } from "./MeAvailabilityView";
import { MeMeetingsView } from "./MeMeetingsView";
import { MeBookingModal } from "./MeBookingModal";
import { MeCreateEventModal } from "./MeCreateEventModal";
import { MeEditEventDrawer } from "./MeEditEventDrawer";
import { MeScheduleModal } from "./MeScheduleModal";
import { MeDateOverrideModal } from "./MeDateOverrideModal";
import { MeDayPopup } from "./MeDayPopup";
import { MeToastBanner } from "./MeToastBanner";
import { MeBookingPage } from "./MeBookingPage";

interface Props {
  tl: Timeline;
}

export function MeStage({ tl }: Props) {
  const currentView = useTimelineVar<MePage>(tl, "meView", "dashboard");
  const fade = useTimelineVar<boolean>(tl, "fade", false);

  // If viewing the public booking page, render full screen without the app shell
  if (currentView === "booking-page") {
    return (
      <div
        data-tl="me-stage-root"
        data-scroller
        className={`relative h-full w-full transition-opacity duration-300 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        <MeBookingPage tl={tl} />
      </div>
    );
  }

  return (
    <div
      data-tl="me-stage-root"
      data-scroller
      className={`relative h-full w-full transition-opacity duration-300 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <MeToastBanner tl={tl} />

      <MeShell tl={tl}>
        {currentView === "dashboard" && <MeHomeView tl={tl} />}
        {currentView === "availability" && <MeAvailabilityView tl={tl} />}
        {currentView === "calendar" && <MeCalendarView tl={tl} />}
        {(currentView === "meetings" || currentView === "bookings") && (
          <MeMeetingsView tl={tl} />
        )}
        {currentView === "meeting-detail" && <MeBookingDetailView tl={tl} />}
        {currentView === "event-types" && <MeEventTypesView tl={tl} />}
      </MeShell>

      {/* Global Modals & Drawers */}
      <MeBookingModal tl={tl} />
      <MeCreateEventModal tl={tl} />
      <MeEditEventDrawer tl={tl} />
      <MeScheduleModal tl={tl} />
      <MeDateOverrideModal tl={tl} />
      <MeDayPopup tl={tl} />
    </div>
  );
}
