"use client";

import type { ReactNode } from "react";
import { CfField } from "@/components/cloudflare/CfField";
import { CLOUD_GREY, CLOUD_ORANGE, Triangle } from "@/components/cloudflare/parts";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DEFAULT_KIND, DNS, FORM_KINDS, TYPES } from "../cloudflare-data";

/*
 * The inline "add record" form above the table. Scene variables: `ftype` (the chosen type), `typeMenu` (list open),
 * `proxied` (toggle), and `field:name` / `field:value` / `field:priority` (typed text). The Save button and the
 * table live in DnsRecordsPage; this file only draws the fields.
 */

export function RecordForm({ tl, onSave }: { tl: Timeline; onSave: () => void }) {
  const type = useTimelineVar(tl, "ftype", "A");
  const kind = FORM_KINDS[type] ?? DEFAULT_KIND;

  const typeBox = <TypeSelect tl={tl} type={type} />;
  const nameBox = (
    <Labeled label={DNS.labels.name} className="w-[240px]">
      <CfField tl={tl} id="name" />
      <span className="mt-1 block text-[12px] leading-4 text-[#777]">{DNS.helper}</span>
    </Labeled>
  );
  const ttlBox = (
    <Labeled label={DNS.labels.ttl} className="w-[110px]">
      <div data-tl="cf-ttl" className="flex h-[38px] items-center justify-between rounded-[4px] border border-[#CFCFCF] bg-white px-3 text-[14px] text-[#333]">
        {DNS.ttl}
        <Triangle size={4} className="text-[#555]" />
      </div>
    </Labeled>
  );

  return (
    <div className="tl-fade-in relative z-20 mt-4">
      {kind.multiline ? (
        <>
          <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
            {typeBox}
            {nameBox}
            {ttlBox}
          </div>
          <Labeled label={kind.valueLabel} className="mt-3">
            <CfField tl={tl} id="value" multiline />
          </Labeled>
        </>
      ) : (
        <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
          {typeBox}
          {nameBox}
          <Labeled label={kind.valueLabel} className="min-w-[200px] flex-1">
            <CfField tl={tl} id="value" />
          </Labeled>
          {kind.priority && (
            <Labeled label={DNS.labels.priority} className="w-[96px]">
              <CfField tl={tl} id="priority" />
            </Labeled>
          )}
          {kind.proxy && <ProxyToggle tl={tl} />}
          {ttlBox}
        </div>
      )}

      <div className="mt-4 flex justify-end gap-2.5 border-t border-[#E3E3E3] pt-3">
        <button
          data-tl="cf-cancel"
          onClick={() => tl.setVar("form", false)}
          className="h-[34px] rounded-[3px] bg-[#E4E4E4] px-5 text-[14px] text-[#555] data-[pressed=true]:scale-[0.97]"
        >
          {DNS.cancel}
        </button>
        <button
          data-tl="cf-save"
          onClick={onSave}
          className="h-[34px] rounded-[3px] bg-[#0051C3] px-6 text-[14px] font-semibold text-white transition-transform duration-150 data-[pressed=true]:scale-[0.96]"
        >
          {DNS.save}
        </button>
      </div>
    </div>
  );
}

function Labeled({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <span className="mb-1.5 block text-[13px] leading-4 text-[#6B6B6B]">{label}</span>
      {children}
    </div>
  );
}

/** The Type select: clicking toggles the list, clicking an option stores it. Options can be hovered with tl.hover(). */
function TypeSelect({ tl, type }: { tl: Timeline; type: string }) {
  const open = useTimelineVar(tl, "typeMenu", false);

  return (
    <Labeled label={DNS.labels.type} className="relative w-[120px]">
      <div
        data-tl="cf-type"
        data-open={open}
        onClick={() => {
          tl.setVar("focus", "");
          tl.setVar("typeMenu", !open);
        }}
        className="flex h-[38px] items-center justify-between rounded-[4px] border border-[#CFCFCF] bg-white px-3 text-[14px] text-[#333] transition-[border-color,box-shadow] duration-150 data-[open=true]:border-[#0051C3] data-[open=true]:shadow-[0_0_0_3px_rgba(0,81,195,0.15)]"
      >
        {type}
        <Triangle size={4} className="text-[#555]" />
      </div>
      <div
        role="listbox"
        className={`absolute left-0 top-full z-30 mt-1 w-full origin-top rounded-[4px] border border-[#CFCFCF] bg-white py-1 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.3)] transition-[opacity,transform] duration-150 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {TYPES.map((t) => (
          <div
            key={t}
            role="option"
            aria-selected={t === type}
            data-tl={`cf-type-opt-${t}`}
            onClick={() => {
              tl.setVar("ftype", t);
              tl.setVar("typeMenu", false);
            }}
            className="flex h-[30px] items-center px-3 text-[14px] text-[#333] data-[hover=true]:bg-[#EAF1FC] data-[pressed=true]:bg-[#D9E6FA]"
          >
            {t}
          </div>
        ))}
      </div>
    </Labeled>
  );
}

/** Orange "Proxied" or grey "DNS only" toggle (A, AAAA and CNAME only). */
function ProxyToggle({ tl }: { tl: Timeline }) {
  const proxied = useTimelineVar(tl, "proxied", true);

  return (
    <Labeled label={DNS.labels.proxy} className="w-[150px]">
      <button
        data-tl="cf-proxy"
        data-on={proxied}
        aria-pressed={proxied}
        onClick={() => tl.setVar("proxied", !proxied)}
        className="flex h-[38px] items-center gap-2 text-[14px] text-[#333] data-[pressed=true]:scale-[0.97]"
      >
        <span
          className="relative h-[20px] w-[38px] shrink-0 rounded-full transition-colors duration-200"
          style={{ background: proxied ? CLOUD_ORANGE : "#C9C9C9" }}
        >
          <span
            className="absolute top-[2px] h-[16px] w-[16px] rounded-full bg-white shadow-sm transition-[left] duration-200"
            style={{ left: proxied ? 20 : 2 }}
          />
        </span>
        <Icon name="cfCloud" size={26} style={{ color: proxied ? CLOUD_ORANGE : CLOUD_GREY }} className="transition-colors duration-200" />
        <span className="whitespace-nowrap">{proxied ? "Proxied" : "DNS only"}</span>
      </button>
    </Labeled>
  );
}
