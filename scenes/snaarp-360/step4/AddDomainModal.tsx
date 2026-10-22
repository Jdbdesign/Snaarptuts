"use client";

import { Modal } from "@/components/admin/Modal";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DOMAIN } from "./step4-data";

/** The "Add Domain" dialog. Typing is driven by the timeline (scene variable `field:domain`). */
export function AddDomainModal({ tl }: { tl: Timeline }) {
  const open = useTimelineVar(tl, "modal", false);
  const value = useTimelineVar(tl, "field:domain", "");
  const focus = useTimelineVar<string>(tl, "focus", "");
  const focused = focus === "domain";

  const add = () => {
    if (!value) return;
    tl.setVar("modal", false);
    tl.setVar("domainAdded", true);
    tl.setVar("tab", "domains");
    tl.toast(`Domain ${DOMAIN} created successfully`);
  };

  return (
    <Modal open={open}>
      <div className="px-7 pb-[25px] pt-7">
        <h2 className="text-[22px] font-bold leading-7">Add Domain</h2>

        <label className="mt-[18px] block text-[13.5px] font-medium leading-5">Domain Name</label>
        <div
          data-tl="field-domain"
          data-focus={focused}
          onClick={() => tl.setVar("focus", "domain")}
          className="mt-2 flex h-[38px] items-center rounded-lg border border-[#E1E4EE] bg-white px-3.5 text-[14px] transition-[border-color,box-shadow] duration-150 data-[focus=true]:border-[#2F5BE0] data-[focus=true]:shadow-[0_0_0_0.5px_#2F5BE0,0_0_0_4px_rgba(47,91,224,0.14)]"
        >
          {value && <span className="truncate">{value}</span>}
          {focused && <i className="h-[18px] w-px bg-ink" style={{ animation: "caret-blink 1s steps(1) infinite" }} />}
          {!value && <span className="text-[#9aa0ab]">example.com</span>}
        </div>
        <p className="mt-2 text-[12px] leading-4 text-[#6b7280]">Enter your domain name without http:// or www</p>

        <div className="mt-6 grid grid-cols-2 gap-[18px]">
          <div>
            <label className="block text-[13.5px] font-medium leading-5">Category</label>
            <Select id="category" value="Primary" />
          </div>
          <div>
            <label className="block text-[13.5px] font-medium leading-5">DNS Provider</label>
            <Select id="provider" value="Manual setup" />
            <p className="mt-2 text-[11.5px] leading-4 text-[#6b7280]">
              Choose Cloudflare or GoDaddy to use automatic DNS publish via Domain Connect.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-[13.5px] font-medium leading-5">DMARC Policy</label>
          <Select id="dmarc" value="Quarantine (Recommended)" />
          <p className="mt-2 text-[11.5px] leading-4 text-[#6b7280]">Quarantine is recommended for most use cases</p>
        </div>

        <div className="mt-[34px] flex justify-end gap-3">
          <button
            onClick={() => tl.setVar("modal", false)}
            className="h-9 rounded-lg border border-[#E6E6EC] bg-white px-5 text-[13.5px] font-medium"
          >
            Cancel
          </button>
          <button
            data-tl="btn-modal-add"
            onClick={add}
            className={`h-9 rounded-lg px-5 text-[13.5px] font-medium text-white transition-colors duration-200 data-[pressed=true]:scale-95 ${
              value ? "bg-[#111]" : "bg-[#8E8E93]"
            }`}
          >
            Add Domain
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Select({ id, value }: { id: string; value: string }) {
  return (
    <div
      data-tl={`select-${id}`}
      className="mt-2 flex h-[38px] items-center justify-between rounded-lg border border-[#E1E4EE] bg-white px-3.5 text-[14px]"
    >
      {value}
      <Icon name="chevronDown" size={15} className="text-[#6b7280]" />
    </div>
  );
}
