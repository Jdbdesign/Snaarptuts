"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { URLS, type OneCardXNavId } from "./onecardx-data";
import { OneCardXShell } from "./OneCardXShell";
import { OneCardXHomeView } from "./OneCardXHomeView";
import { OneCardXOrgCardsView } from "./OneCardXOrgCardsView";
import { OneCardXEditorView } from "./OneCardXEditorView";
import {
  OneCardXCardDetailView,
  OneCardXPublicPreviewOverlay,
} from "./OneCardXCardDetailView";
import { OneCardXMemberView } from "./OneCardXMemberView";
import { OneCardXIDCardsView } from "./OneCardXIDCardsView";
import { OneCardXUsersView } from "./OneCardXUsersView";
import { OneCardXBackgroundsView } from "./OneCardXBackgroundsView";
import type { OneCardXPage } from "./onecardx-timeline";

type Props = {
  tl: Timeline;
  startPage?: OneCardXPage;
  part1Cards?: boolean;
};

export function OneCardXStage({ tl, startPage = "home", part1Cards }: Props) {
  const page = useTimelineVar<OneCardXPage>(tl, "ocxPage", startPage);
  const cardType = useTimelineVar<"id-card" | "business">(tl, "ocxCardType", "id-card");
  const fade = useTimelineVar(tl, "fade", false);
  const publicPreviewOpen = useTimelineVar(tl, "ocxPublicPreviewOpen", false);

  const activeNav: OneCardXNavId =
    page === "home"
      ? "home"
      : page === "orgCards"
      ? "create-card"
      : page === "editor"
      ? "business-card"
      : page === "cardDetail"
      ? (cardType === "business" ? "business-card" : "id-cards")
      : page === "memberView"
      ? "business-card"
      : page === "idCards"
      ? "id-cards"
      : page === "users"
      ? "users"
      : page === "backgrounds"
      ? "backgrounds"
      : "create-card";

  const pageTitle: string =
    page === "home"
      ? "Home"
      : page === "orgCards"
      ? "Organization Card"
      : page === "editor"
      ? (cardType === "business" ? "Business Card" : "Edit Card")
      : page === "cardDetail"
      ? (cardType === "business" ? "Business Card" : "ID Cards")
      : page === "memberView"
      ? "Business Card"
      : page === "idCards"
      ? "ID Cards"
      : page === "users"
      ? "Users"
      : page === "backgrounds"
      ? "Backgrounds"
      : "Organization Card";

  const handleNavigateNav = (navId: OneCardXNavId) => {
    if (navId === "home") {
      tl.setUrl(URLS.home);
      tl.setVar("ocxPage", "home");
    } else if (navId === "id-cards") {
      tl.setUrl(URLS.idCards);
      tl.setVar("ocxPage", "idCards");
    } else if (navId === "create-card") {
      tl.setUrl(URLS.orgCards);
      tl.setVar("ocxPage", "orgCards");
    } else if (navId === "users") {
      tl.setUrl(URLS.users);
      tl.setVar("ocxPage", "users");
    } else if (navId === "backgrounds") {
      tl.setUrl(URLS.backgrounds);
      tl.setVar("ocxPage", "backgrounds");
    } else if (navId === "business-card") {
      tl.setUrl(URLS.memberView);
      tl.setVar("ocxPage", "memberView");
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <OneCardXShell
        tl={tl}
        activeNav={activeNav}
        pageTitle={pageTitle}
        onNavigateNav={handleNavigateNav}
        overlay={
          publicPreviewOpen ? (
            <OneCardXPublicPreviewOverlay
              onClose={() => {
                tl.setUrl(URLS.cardDetail);
                tl.setVar("ocxPublicPreviewOpen", false);
              }}
            />
          ) : null
        }
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
            part1Cards={part1Cards}
            onOpenNewCardModal={() => tl.setVar("ocxNewCardModalOpen", true)}
            onCloseNewCardModal={() => tl.setVar("ocxNewCardModalOpen", false)}
            onCreateCardAndOpenEditor={() => {
              tl.setVar("ocxNewCardModalOpen", false);
              tl.setUrl(URLS.editor);
              tl.setVar("ocxPage", "editor");
            }}
            onEditDesign={() => {
              tl.setUrl(URLS.editor);
              tl.setVar("ocxPage", "editor");
            }}
            onPreview={() => {
              tl.setUrl(URLS.memberView);
              tl.setVar("ocxPage", "memberView");
            }}
          />
        )}

        {page === "editor" && (
          <OneCardXEditorView
            tl={tl}
            onSaveCard={() => {
              tl.setVar("ocxSavingCard", true);
              tl.setUrl(URLS.cardDetail);
              tl.setVar("ocxPage", "cardDetail");
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

        {page === "memberView" && (
          <OneCardXMemberView
            tl={tl}
            onEditDetails={() => {
              tl.setUrl(URLS.editor);
              tl.setVar("ocxPage", "editor");
            }}
            onBackToList={() => {
              tl.setUrl(URLS.orgCards);
              tl.setVar("ocxPage", "orgCards");
            }}
          />
        )}

        {page === "idCards" && <OneCardXIDCardsView tl={tl} />}

        {page === "users" && <OneCardXUsersView tl={tl} />}

        {page === "backgrounds" && <OneCardXBackgroundsView tl={tl} />}
      </OneCardXShell>

      {/* Standard White Fade Transition Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-50 bg-white transition-opacity duration-300"
        style={{ opacity: fade ? 1 : 0 }}
      />
    </div>
  );
}
