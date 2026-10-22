"use client";

import { DropdownMenu, MenuItem } from "@/components/admin/DropdownMenu";
import { Icon, type IconName } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DnsTab } from "./DnsTab";
import { DOMAIN } from "./step4-data";

type Tab = "domains" | "dns" | "analytics";

const TABLE_COLUMNS = "grid-cols-[216px_113px_103px_136px_234px_136px_1fr]";

/** Domain Management page: header, stat cards, tabs, and the Domains / DNS tab content. */
export function DomainsPage({ tl, instant = false }: { tl: Timeline; instant?: boolean }) {
  const added = useTimelineVar(tl, "domainAdded", false);
  const verified = useTimelineVar(tl, "verified", false);
  const tab = useTimelineVar<Tab>(tl, "tab", "domains");
  const narrow = useNarrow();

  const stats: { label: string; value: number; icon: IconName; tile: string }[] = [
    { label: "Domains", value: added ? 1 : 0, icon: "globe", tile: "bg-[#E8F0FE] text-[#3B82F6]" },
    { label: "Verified", value: verified ? 1 : 0, icon: "checkCircle", tile: "bg-[#E4F6EA] text-[#22A06B]" },
    { label: "Unverified", value: added && !verified ? 1 : 0, icon: "warning", tile: "bg-[#FDECEC] text-[#E5484D]" },
    { label: "Total Users", value: 0, icon: "users", tile: "bg-[#F1E8FD] text-[#8B5CF6]" },
  ];

  return (
    <div className={instant ? "" : "tl-fade-in"}>
      <div className="flex items-center justify-between">
        <h1 className="text-[26px] font-semibold leading-[34px]">Domain Management</h1>
        <button
          data-tl="btn-add-domain-header"
          disabled={added}
          onClick={() => tl.setVar("modal", true)}
          className={`flex h-9 items-center gap-2 rounded-[10px] px-4 text-[13px] font-medium text-white transition-colors duration-300 ${
            added ? "pointer-events-none bg-[#8E8E93]" : "bg-[#111]"
          }`}
        >
          <Icon name="plus" size={14} />
          Add Domain
        </button>
      </div>

      <div className={`mt-[22px] grid gap-4 ${narrow ? "grid-cols-2" : "grid-cols-4"}`}>
        {stats.map((s) => (
          <div
            key={s.label}
            data-tl={`dstat-${s.label.toLowerCase().replace(" ", "-")}`}
            className="flex h-[99px] items-center gap-4 rounded-2xl border border-[#F0F0F4] bg-white px-6 shadow-[0_6px_24px_-14px_rgba(17,17,17,0.12)]"
          >
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.tile}`}>
              <Icon name={s.icon} size={22} />
            </span>
            <div>
              <p className="text-[24px] font-bold leading-8">{s.value}</p>
              <p className="text-[14px] leading-5 text-[#6b7280]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[26px] flex text-[14px] font-medium">
        {(
          [
            ["domains", "Domains"],
            ["dns", "DNS"],
            ["analytics", "Analytics"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            data-tl={`tab-${id}`}
            onClick={() => tl.setVar("tab", id)}
            className={`h-9 rounded-[10px] px-[22px] transition-[background,color,transform] duration-150 data-[pressed=true]:scale-95 ${
              tab === id ? "bg-[#111] text-white" : "text-[#4b5060]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "domains" && <ManagedDomains tl={tl} added={added} verified={verified} instant={instant} />}
      {tab === "dns" && <DnsTab tl={tl} />}
      {tab === "analytics" && (
        <p className="mt-6 rounded-2xl border border-[#F0F0F4] bg-white p-10 text-center text-[14px] text-[#6b7280]">
          Analytics will appear once your domain starts receiving email.
        </p>
      )}
    </div>
  );
}

function ManagedDomains({
  tl,
  added,
  verified,
  instant,
}: {
  tl: Timeline;
  added: boolean;
  verified: boolean;
  instant: boolean;
}) {
  const narrow = useNarrow();
  const menuOpen = useTimelineVar(tl, "menu", false);

  const verify = () => {
    tl.setVar("menu", false);
    tl.setVar("verified", true);
    tl.toast("Domain verification completed");
  };

  return (
    <div className="mt-6 rounded-2xl border border-[#F0F0F4] bg-white">
      <div className="flex items-center justify-between px-6 py-[22px]">
        <h2 className="text-[18px] font-bold">Managed Domains</h2>
        <div className="flex gap-2.5">
          <span className="flex h-[30px] items-center gap-1.5 rounded-lg border border-[#E6E6EC] bg-white px-3 text-[12px] font-medium">
            <Icon name="download" size={14} />
            Export
          </span>
          <span className="flex h-[30px] items-center gap-1.5 rounded-lg border border-[#E6E6EC] bg-white px-3 text-[12px] font-medium">
            <Icon name="refresh" size={14} />
            Refresh
          </span>
        </div>
      </div>

      <div className={narrow ? "no-scrollbar overflow-x-auto pb-[240px]" : ""}>
        <div className="min-w-[960px]">
          <div
            className={`grid ${TABLE_COLUMNS} border-y border-[#F0F0F4] bg-[#FAFAFB] px-6 py-3 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#8b909c]`}
          >
            <span>Domain name</span>
            <span>Type</span>
            <span>Users</span>
            <span>Created</span>
            <span>DNS status</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {!added ? (
            <div className="flex flex-col items-center px-6 py-[52px] text-center">
              <Icon name="globe" size={44} className="text-[#C9CDD6]" />
              <p className="mt-3 text-[16px] font-medium">No domains found</p>
              <p className="mt-1 text-[14px] text-[#6b7280]">Add your first domain to get started</p>
              <button
                data-tl="btn-add-domain-empty"
                onClick={() => tl.setVar("modal", true)}
                className="mt-5 h-10 rounded-[10px] bg-[#111] px-5 text-[14px] font-medium text-white data-[pressed=true]:scale-95"
              >
                Add Domain
              </button>
            </div>
          ) : (
            <div className={`${instant ? "" : "tl-fade-in"} grid ${TABLE_COLUMNS} items-center px-6 py-[18px] text-[14px]`}>
              <div className="flex items-center gap-3">
                <Icon name="globe" size={20} className="text-[#E5484D]" />
                <div>
                  <p className="text-[16px] font-bold leading-5">{DOMAIN}</p>
                  <p className="text-[13px] leading-5 text-[#8b909c]">Primary Domain</p>
                </div>
              </div>
              <span>Primary</span>
              <span>Active</span>
              <span>{new Date().toLocaleDateString("en-GB")}</span>
              <span className="flex items-center gap-2">
                {verified ? (
                  <>
                    <Icon name="checkCircle" size={16} className="text-[#22A06B]" />
                    All records found
                  </>
                ) : (
                  <>
                    <Icon name="warning" size={16} className="text-[#E8A317]" />
                    Verification needed
                  </>
                )}
              </span>
              <span>
                <span
                  data-tl="pill-status"
                  className={`inline-block rounded-md px-2.5 py-[3px] text-[12px] font-semibold transition-colors duration-300 ${
                    verified ? "bg-[#DCF5E6] text-[#1B7F4B]" : "bg-[#E5484D] text-white"
                  }`}
                >
                  {verified ? "verified" : "pending"}
                </span>
              </span>
              <div className="relative">
                <button
                  data-tl="btn-row-actions"
                  onClick={() => tl.setVar("menu", !menuOpen)}
                  aria-label="Domain actions"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4b5060] data-[pressed=true]:scale-90"
                >
                  <Icon name="dots" size={18} />
                </button>
                <DropdownMenu open={menuOpen} className="right-[-6px] top-[calc(100%+4px)]">
                  <MenuItem id="view" icon="eye">View Details</MenuItem>
                  <MenuItem id="edit" icon="pencil">Edit Domain</MenuItem>
                  <MenuItem id="publish" icon="cloud">Publish DNS Automatically</MenuItem>
                  <MenuItem id="verify" icon="checkCircle" onClick={verify}>Verify Domain</MenuItem>
                  <MenuItem id="primary" icon="star">Set as Primary</MenuItem>
                  <MenuItem id="delete" icon="trash" danger>Delete Domain</MenuItem>
                </DropdownMenu>
              </div>
            </div>
          )}
        </div>
      </div>
      {added && <div className="h-6" />}
    </div>
  );
}
