"use client";

import type { ReactNode } from "react";
import { CopyButton } from "@/components/admin/CopyButton";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { CNAME_RECORD, DOMAIN, MX_RECORD, TXT_RECORDS } from "./step4-data";

const LABEL = "text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#9aa0ab]";
const MONO = "font-mono text-[13px] text-ink";

/** DNS tab: configuration header and the MX, CNAME and TXT record cards. */
export function DnsTab({ tl }: { tl: Timeline }) {
  return (
    <div className="tl-fade-in mt-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[19px] font-bold leading-7">DNS Configuration</h2>
          <p className="text-[14px] leading-5 text-[#6b7280]">Showing DNS records for {DOMAIN}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E6EC] bg-white">
            <Icon name="refresh" size={16} />
          </span>
          <span className="flex h-9 items-center gap-2 rounded-lg border border-[#E6E6EC] bg-white px-3.5 text-[12.5px] font-medium">
            <Icon name="send" size={14} />
            Mark all submitted
          </span>
          <span className="flex h-9 items-center gap-2 rounded-lg bg-[#8B93A4] px-3.5 text-[12.5px] font-medium text-white/90">
            <Icon name="checkCircle" size={14} />
            Verify all records
          </span>
          <span className="flex h-9 w-[251px] items-center justify-between rounded-lg border border-[#E6E6EC] bg-white pl-3.5 pr-3 text-[13px] font-medium">
            <span className="flex items-center gap-2">
              {DOMAIN}
              <span className="rounded-md bg-[#E5484D] px-2 py-[2px] text-[11px] font-semibold text-white">pending</span>
            </span>
            <Icon name="chevronDown" size={14} className="text-[#6b7280]" />
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-[18px]">
        <RecordCard
          tone="blue"
          tag="MX"
          title="MX Record"
          subtitle="Routes incoming email to your mail server"
        >
          <div className="grid grid-cols-[85px_422px_103px_1fr] gap-y-1">
            <Field label="Type">MX</Field>
            <Field label="Hostname / Name" copy={<CopyButton tl={tl} id="mx-host" />}>{MX_RECORD.host}</Field>
            <Field label="Priority">{MX_RECORD.priority}</Field>
            <Field label="Mail server" copy={<CopyButton tl={tl} id="mx-server" />}>{MX_RECORD.server}</Field>
          </div>
          <Footer tl={tl} id="mx-zone" ttl={MX_RECORD.ttl} zone={MX_RECORD.zone} />
        </RecordCard>

        <RecordCard
          tone="orange"
          tag="CNAME"
          title="CNAME Record"
          subtitle="Canonical name record for domain aliasing"
        >
          <div className="grid grid-cols-[85px_323px_1fr] gap-y-1">
            <Field label="Type">CNAME</Field>
            <Field label="Hostname / Name" copy={<CopyButton tl={tl} id="cname-host" />}>{CNAME_RECORD.host}</Field>
            <Field label="Value" copy={<CopyButton tl={tl} id="cname-value" />}>{CNAME_RECORD.value}</Field>
          </div>
          <Footer tl={tl} id="cname-zone" ttl={CNAME_RECORD.ttl} zone={CNAME_RECORD.zone} />
        </RecordCard>

        <RecordCard
          tone="grey"
          tag="TXT"
          title="TXT Record"
          subtitle="Text records for domain verification and policies"
        >
          {TXT_RECORDS.map((r, i) => (
            <div key={r.id} className={i > 0 ? "mt-5 border-t border-[#F0F0F4] pt-5" : ""}>
              <div className="grid grid-cols-[85px_323px_1fr] gap-y-1">
                <Field label="Type">TXT</Field>
                <Field label="Hostname / Name" copy={<CopyButton tl={tl} id={`${r.id}-host`} />}>{r.host}</Field>
                <Field label="Value" copy={<CopyButton tl={tl} id={`${r.id}-value`} />} wrap>
                  {r.value}
                </Field>
              </div>
              <Footer tl={tl} id={`${r.id}-zone`} ttl={r.ttl} zone={r.zone} />
            </div>
          ))}
        </RecordCard>
      </div>
    </div>
  );
}

const TONES = {
  blue: { border: "border-l-[#4C8DF6]", head: "bg-[#EEF4FF]", tag: "text-[#2F6FE0]" },
  orange: { border: "border-l-[#F5A25D]", head: "bg-[#FFF4E8]", tag: "text-[#D9622B]" },
  grey: { border: "border-l-[#9AA0AB]", head: "bg-[#F6F6F8]", tag: "text-[#4b5060]" },
} as const;

function RecordCard({
  tone,
  tag,
  title,
  subtitle,
  children,
}: {
  tone: keyof typeof TONES;
  tag: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const t = TONES[tone];
  return (
    <section className={`overflow-hidden rounded-xl border border-l-4 border-[#EEEEF2] bg-white ${t.border}`}>
      <div className={`flex items-center justify-between px-6 py-3.5 ${t.head}`}>
        <div className="flex items-center gap-4">
          <span className={`min-w-[34px] text-[12px] font-bold ${t.tag}`}>{tag}</span>
          <div>
            <p className="text-[15px] font-semibold leading-5">{title}</p>
            <p className="text-[12.5px] leading-4 text-[#6b7280]">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-[#F6C7C7] bg-[#FDECEC] px-2.5 py-1 text-[11.5px] font-medium text-[#D83A3A]">
            <Icon name="warning" size={13} />
            Not configured
          </span>
          <span className="flex h-8 items-center gap-2 rounded-lg border border-[#E6E6EC] bg-white px-3 text-[12px] font-medium">
            <Icon name="send" size={13} />
            Mark submitted
          </span>
          <Icon name="help" size={16} className="text-[#b4b9c4]" />
        </div>
      </div>
      <div className="px-6 pb-4 pt-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  copy,
  wrap,
  children,
}: {
  label: string;
  copy?: ReactNode;
  wrap?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 pr-4">
      <p className={LABEL}>{label}</p>
      <p className={`mt-1.5 flex gap-2 ${MONO} ${wrap ? "items-start" : "items-center"}`}>
        <span className={wrap ? "min-w-0 break-all leading-[21px]" : "truncate"}>{children}</span>
        {copy}
      </p>
    </div>
  );
}

function Footer({ tl, id, ttl, zone }: { tl: Timeline; id: string; ttl: string; zone: string }) {
  return (
    <div className="mt-4 flex items-center justify-between gap-6">
      <span className="shrink-0 whitespace-nowrap font-mono text-[12px] text-[#8b909c]">TTL: {ttl}</span>
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="shrink-0 whitespace-nowrap text-[11.5px] text-[#9aa0ab]">Zone format:</span>
        <span className="min-w-0 truncate rounded-md bg-[#F3F4F6] px-2.5 py-1 font-mono text-[11.5px] text-[#4b5060]">
          {zone}
        </span>
        <CopyButton tl={tl} id={id} />
      </span>
    </div>
  );
}
