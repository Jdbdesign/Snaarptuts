"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { LockShell } from "./LockShell";
import { LockDashboardView } from "./LockDashboardView";
import { LockDevicesView } from "./LockDevicesView";
import { LockVaultsView } from "./LockVaultsView";
import { LockVaultItemsView } from "./LockVaultItemsView";
import { LockAddItemModal } from "./LockAddItemModal";
import { LockEditItemModal } from "./LockEditItemModal";
import { LockToast } from "./LockToast";

interface Props {
  tl: Timeline;
}

export function LockStage({ tl }: Props) {
  const currentView = useTimelineVar<string>(tl, "lockView", "dashboard");

  return (
    <div
      className="relative flex h-full w-full overflow-hidden bg-[#F2F2F2] font-sans select-none text-[#111827]"
      data-tl="lock-stage-root"
    >
      {/* Toast Overlay */}
      <LockToast tl={tl} />

      {/* Main Shell */}
      <LockShell
        tl={tl}
        overlay={
          <>
            <LockAddItemModal tl={tl} />
            <LockEditItemModal tl={tl} />
          </>
        }
      >
        {currentView === "dashboard" && <LockDashboardView tl={tl} />}
        {currentView === "devices" && <LockDevicesView tl={tl} />}
        {currentView === "vaults" && <LockVaultsView tl={tl} />}
        {currentView === "vault-items" && <LockVaultItemsView tl={tl} />}
      </LockShell>
    </div>
  );
}
