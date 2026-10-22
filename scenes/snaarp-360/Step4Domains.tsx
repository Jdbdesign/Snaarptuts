"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { DashboardContent } from "./step3/AdminDashboard";
import { AddDomainModal } from "./step4/AddDomainModal";
import { DomainsPage } from "./step4/DomainsPage";

/**
 * Step 4 — Add and verify your domain.
 * Starts on the same dashboard Step 3 ended on (no fade), then moves to Domain Management.
 */
export function Step4Domains({ tl }: SceneProps) {
  const page = useTimelineVar<"dashboard" | "domains">(tl, "page", "dashboard");

  return (
    <div data-scroller className="relative h-full w-full overflow-hidden bg-white">
      <AdminLayout
        tl={tl}
        active={page === "domains" ? "domains" : "dashboard"}
        onNavigate={(id) => {
          if (id === "domains") tl.setVar("page", "domains");
        }}
        overlay={<AddDomainModal tl={tl} />}
      >
        {page === "dashboard" ? <DashboardContent count={1} /> : <DomainsPage tl={tl} />}
      </AdminLayout>
    </div>
  );
}
