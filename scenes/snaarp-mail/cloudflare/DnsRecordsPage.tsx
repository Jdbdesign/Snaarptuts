"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DOMAIN } from "../dns-data";
import { DEFAULT_KIND, DNS, FORM_KINDS, type CfRow } from "../cloudflare-data";
import { RecordForm } from "./RecordForm";
import { RecordsTable } from "./RecordsTable";

const NO_ROWS: CfRow[] = [];

/*
 * Cloudflare, DNS > Records. Scene variables: `form` (the add-record form is open) and `rows` (records added so far).
 * "Add record" opens a fresh form; "Save" turns what is in the form into a table row, shows the green toast and closes it.
 */
export function DnsRecordsPage({ tl }: { tl: Timeline }) {
  const form = useTimelineVar(tl, "form", false);
  const added = useTimelineVar(tl, "rows", NO_ROWS);
  const narrow = useNarrow();

  const openForm = () => {
    tl.setVar("field:name", "");
    tl.setVar("field:value", "");
    tl.setVar("field:priority", "");
    tl.setVar("focus", "");
    tl.setVar("ftype", "A");
    tl.setVar("typeMenu", false);
    tl.setVar("proxied", true);
    tl.setVar("form", true);
  };

  const save = () => {
    const type = tl.getVar("ftype", "A");
    const kind = FORM_KINDS[type] ?? DEFAULT_KIND;
    const row: CfRow = {
      type,
      name: tl.getVar("field:name", ""),
      value: tl.getVar("field:value", ""),
      priority: kind.priority ? tl.getVar("field:priority", "") : undefined,
      proxied: !!kind.proxy && tl.getVar("proxied", true),
    };
    tl.setVar("rows", [...tl.getVar("rows", NO_ROWS), row]);
    tl.setVar("form", false);
    tl.setVar("focus", "");
    tl.toast(DNS.toast, 1500);
  };

  return (
    <div className="px-10 pb-2 pt-5 max-[899px]:px-4">
      <h1 className="text-[28px] font-normal leading-9 text-[#333]">{DNS.title}</h1>

      <section className="mt-4 rounded-[4px] border border-[#D9D9D9] bg-white px-6 pb-5 pt-4 max-[899px]:px-4">
        <h2 className="text-[18px] leading-7 text-[#333]">
          {DNS.cardTitle} <b className="font-semibold">{DOMAIN}</b>
        </h2>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-[38px] min-w-0 flex-1 items-center gap-2 rounded-[4px] border border-[#CFCFCF] bg-white px-3 text-[14px] text-[#8A8A8A]">
            <Icon name="search" size={16} className="shrink-0 text-[#555]" />
            <span className="truncate">{DNS.search}</span>
          </div>
          <span className="flex h-[38px] shrink-0 items-center gap-2 rounded-[3px] bg-[#E4E4E4] px-4 text-[14px] text-[#555]">
            <Icon name="cfList" size={16} />
            {DNS.advanced}
          </span>
          <button
            data-tl="cf-add-record"
            onClick={openForm}
            className="flex h-[38px] shrink-0 items-center gap-2 rounded-[3px] border border-[#0051C3] bg-white px-4 text-[14px] font-semibold text-[#0051C3] transition-transform duration-150 data-[pressed=true]:scale-[0.97]"
          >
            <Icon name="cfPlusCircle" size={16} />
            {DNS.addRecord}
          </button>
        </div>

        {form && <RecordForm tl={tl} onSave={save} />}
        <RecordsTable added={added} narrow={narrow} />
      </section>
    </div>
  );
}
