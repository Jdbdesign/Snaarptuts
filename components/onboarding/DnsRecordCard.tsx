"use client";

import { CopyButton } from "@/components/admin/CopyButton";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { COLUMNS, PAGE, type DnsRecord } from "@/scenes/snaarp-mail/dns-data";

/*
 * One DNS record as the Snaarp Mail "DNS Mapping" page shows it: type tag, "1 record", a Pending / Verified
 * label with a "Mark submitted" button, and a one-row table. The state lives in the scene variable
 * `dns:<id>` (false = pending, true = verified), so a script can flip it with tl.click("[data-tl=mark-<id>]")
 * or tl.setVar(`dns:${id}`, true). Step 5 shows all cards pending; step 7 reuses the card to verify them.
 */

const TAGS = {
  MX: "bg-[#DBEAFE] text-[#1D4ED8]",
  CNAME: "bg-[#E0E7FF] text-[#4338CA]",
  TXT_PENDING: "bg-[#FEF3C7] text-[#B45309]",
  TXT_VERIFIED: "bg-[#D1FAE5] text-[#047857]",
};

/** Column widths in design px: left padding is 12, status is right-aligned. */
const GRID = {
  mx: "grid-cols-[219px_73px_1fr_64px]",
  other: "grid-cols-[52px_176px_1fr_64px]",
};

export function DnsRecordCard({ tl, record }: { tl: Timeline; record: DnsRecord }) {
  const verified = useTimelineVar(tl, `dns:${record.id}`, false);
  const isMx = record.type === "MX";
  const cols = isMx ? COLUMNS.mx : COLUMNS.other;
  const grid = isMx ? GRID.mx : GRID.other;
  const tag = record.type === "TXT" ? (verified ? TAGS.TXT_VERIFIED : TAGS.TXT_PENDING) : TAGS[record.type];

  return (
    <section
      data-tl={`card-${record.id}`}
      data-verified={verified}
      className="overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white shadow-[0_1px_4px_rgba(17,24,39,0.05)]"
    >
      <header className="flex items-center justify-between px-3 py-[9px]">
        <div className="flex items-center gap-2">
          <span className={`rounded-[4px] px-[7px] py-[1px] font-mono text-[9.5px] font-bold leading-4 transition-colors duration-300 ${tag}`}>
            {record.type}
          </span>
          <span className="text-[10px] text-[#6B7280]">{PAGE.recordCount}</span>
        </div>
        <div className="flex items-center gap-2.5">
          {verified ? (
            <span className="tl-fade-in flex items-center gap-1 text-[10px] font-medium text-[#16A34A]">
              <Icon name="circleCheck" size={12} className="tl-pop" />
              {PAGE.verified}
            </span>
          ) : (
            <>
              <span className="flex items-center gap-1 text-[10px] font-medium text-[#DC2626]">
                <Icon name="circleX" size={12} />
                {PAGE.pending}
              </span>
              <button
                data-tl={`mark-${record.id}`}
                onClick={() => tl.setVar(`dns:${record.id}`, true)}
                className="flex h-[20px] items-center gap-1 rounded-[4px] bg-[#0B0B0F] px-2 text-[9.5px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-[0.96]"
              >
                <Icon name="send" size={10} />
                {PAGE.mark}
              </button>
            </>
          )}
        </div>
      </header>

      <div className={`grid ${grid} border-y border-[#EEF0F3] bg-[#F9FAFB] px-3 py-[5px] text-[8.5px] font-medium tracking-[0.04em] text-[#6B7280]`}>
        {cols.map((c, i) => (
          <span key={c} className={i === cols.length - 1 ? "text-right" : ""}>
            {c}
          </span>
        ))}
      </div>

      <div className={`grid ${grid} items-start gap-x-2 px-3 py-[11px] font-mono text-[8.5px] leading-[14px] text-[#111827]`}>
        {isMx ? (
          <>
            <Value tl={tl} id={`${record.id}-host`} text={record.host} />
            <span>{record.priority}</span>
            <Value tl={tl} id={`${record.id}-value`} text={record.value} />
          </>
        ) : (
          <>
            <span>{record.type}</span>
            <Value tl={tl} id={`${record.id}-host`} text={record.host} />
            <Value tl={tl} id={`${record.id}-value`} text={record.value} />
          </>
        )}
        <span className="flex justify-end">
          <Icon
            name={verified ? "circleCheck" : "circleX"}
            size={14}
            className={`transition-colors duration-300 ${verified ? "tl-pop text-[#22A06B]" : "text-[#EF4444]"}`}
          />
        </span>
      </div>
    </section>
  );
}

/** A value that wraps inside its column (never overflows the card) with a copy icon beside it. */
function Value({ tl, id, text }: { tl: Timeline; id: string; text: string }) {
  return (
    <span className="flex min-w-0 items-start gap-1.5">
      <span className="min-w-0 break-all">{text}</span>
      <span className="mt-px">
        <CopyButton tl={tl} id={id} size={10} />
      </span>
    </span>
  );
}
