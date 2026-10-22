"use client";

import { ToastHost } from "@/components/admin/Toast";
import { CloudflareChrome } from "@/components/cloudflare/CloudflareChrome";
import type { CfPage } from "@/components/cloudflare/cloudflare-data";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { DnsRecordsPage } from "./cloudflare/DnsRecordsPage";
import { OverviewPage } from "./cloudflare/OverviewPage";
import { DOMAIN } from "./dns-data";

/* Snaarp Mail, step 6: the Cloudflare dashboard (dash.cloudflare.com/acme-studio.com/dns/records). Illustration only. */

export function Step6Cloudflare({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const page = useTimelineVar<CfPage>(tl, "page", "overview");

  return (
    <div className="relative h-full w-full bg-white">
      <div className={`h-full w-full transition-opacity duration-500 ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <CloudflareChrome active={page} domain={DOMAIN} onNavigate={(p) => tl.setVar("page", p)}>
          {page === "dns" ? <DnsRecordsPage tl={tl} /> : <OverviewPage />}
        </CloudflareChrome>
      </div>
      <ToastHost tl={tl} position="below-bar" />
      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-white transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
