"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { ZeusView } from "./zeus-data";
import { ZeusShell } from "./ZeusShell";
import { ZeusPeopleView } from "./ZeusPeopleView";
import { ZeusBillingView } from "./ZeusBillingView";
import { ZeusListsView } from "./ZeusListsView";
import { ZeusContactDrawer } from "./ZeusContactDrawer";
import { ZeusSaveSearchModal } from "./ZeusSaveSearchModal";
import { ZeusCreateListModal } from "./ZeusCreateListModal";
import { ZeusDeleteListModal } from "./ZeusDeleteListModal";
import { ZeusToast } from "./ZeusToast";

interface Props {
  tl: Timeline;
}

export function ZeusStage({ tl }: Props) {
  const currentView = useTimelineVar<ZeusView>(tl, "zeusView", "people");
  const fade = useTimelineVar<boolean>(tl, "fade", false);
  const toast = useTimelineVar<{ text: string; subtext?: string } | null>(tl, "zeusToast", null);

  const renderView = () => {
    switch (currentView) {
      case "billing":
        return <ZeusBillingView tl={tl} />;
      case "lists":
        return <ZeusListsView tl={tl} />;
      case "people":
      default:
        return <ZeusPeopleView tl={tl} />;
    }
  };

  const overlay = (
    <>
      <ZeusContactDrawer tl={tl} />
      <ZeusSaveSearchModal tl={tl} />
      <ZeusCreateListModal tl={tl} />
      <ZeusDeleteListModal tl={tl} />
      <ZeusToast toast={toast} />
    </>
  );

  return (
    <div
      data-tl="zeus-stage-root"
      className={`h-full w-full transition-opacity duration-300 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <ZeusShell tl={tl} overlay={overlay}>
        {renderView()}
      </ZeusShell>
    </div>
  );
}
