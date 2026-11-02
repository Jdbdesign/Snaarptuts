"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { URLS, type OneCardXNavId } from "./onecardx-data";
import { OneCardXShell } from "./OneCardXShell";
import { OneCardXHomeView } from "./OneCardXHomeView";
import { OneCardXOrgCardsView } from "./OneCardXOrgCardsView";
import { OneCardXEditorView } from "./OneCardXEditorView";
import { OneCardXCardDetailView } from "./OneCardXCardDetailView";
import type { OneCardXPage } from "./onecardx-timeline";

type Props = {
  tl: Timeline;
  startPage?: OneCardXPage;
};

export function OneCardXStage({ tl, startPage = "home" }: Props) {
  const page = useTimelineVar<OneCardXPage>(tl, "ocxPage", startPage);
  const fade = useTimelineVar(tl, "fade", false);

  const activeNav: OneCardXNavId =
    page === "home"
      ? "home"
      : page === "orgCards"
      ? "id-cards"
      : page === "editor"
      ? "create-card"
      : "id-cards";

  const handleNavigateNav = (navId: OneCardXNavId) => {
    if (navId === "home") {
      tl.setUrl(URLS.home);
      tl.setVar("ocxPage", "home");
    } else if (navId === "id-cards" || navId === "create-card") {
      tl.setUrl(URLS.orgCards);
      tl.setVar("ocxPage", "orgCards");
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <OneCardXShell
        tl={tl}
        activeNav={activeNav}
        onNavigateNav={handleNavigateNav}
      >
        {page === "home" && (
          <OneCardXHomeView
            tl={tl}
            onSelectCreateOrgCard={() => {
              tl.setUrl(URLS.orgCards);
              tl.setVar("ocxPage", "orgCards");
            }}
          />
        )}

        {page === "orgCards" && (
          <OneCardXOrgCardsView
            tl={tl}
            onOpenNewCardModal={() => tl.setVar("ocxNewCardModalOpen", true)}
            onCloseNewCardModal={() => tl.setVar("ocxNewCardModalOpen", false)}
            onCreateCardAndOpenEditor={() => {
              tl.setVar("ocxNewCardModalOpen", false);
              tl.setUrl(URLS.editor);
              tl.setVar("ocxPage", "editor");
            }}
          />
        )}

        {page === "editor" && (
          <OneCardXEditorView
            tl={tl}
            onSaveCard={() => {
              tl.setVar("ocxSavingCard", true);
              setTimeout(() => {
                tl.setVar("ocxSavingCard", false);
                tl.setUrl(URLS.cardDetail);
                tl.setVar("ocxPage", "cardDetail");
              }, 800);
            }}
          />
        )}

        {page === "cardDetail" && (
          <OneCardXCardDetailView
            tl={tl}
            onOpenPublicPreview={() => {
              tl.setUrl(URLS.publicPreview);
              tl.setVar("ocxPublicPreviewOpen", true);
            }}
            onClosePublicPreview={() => {
              tl.setUrl(URLS.cardDetail);
              tl.setVar("ocxPublicPreviewOpen", false);
            }}
            onCopyLink={() => {
              tl.setVar("ocxLinkCopied", true);
            }}
          />
        )}
      </OneCardXShell>

      {/* Standard White Fade Transition Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-50 bg-white transition-opacity duration-300"
        style={{ opacity: fade ? 1 : 0 }}
      />
    </div>
  );
}
