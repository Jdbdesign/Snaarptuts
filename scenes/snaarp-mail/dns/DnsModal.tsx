"use client";

import { Modal } from "@/components/admin/Modal";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { MODAL } from "../dns-data";

/** Option label to a safe selector fragment. */
export const providerSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const BASE_WIDTH = 388;

/**
 * "Automatic DNS Publishing". Open with the scene variable `modal` (true/false); the provider select is driven
 * by `open` (list shown) and `field:provider`. Only the Manual Setup panel is built: the tutorial keeps Manual Setup.
 */
export function DnsModal({ tl, zoom }: { tl: Timeline; zoom: number }) {
  const open = useTimelineVar(tl, "modal", false);
  const listOpen = useTimelineVar<string>(tl, "open", "") === "provider";
  const provider = useTimelineVar(tl, "field:provider", MODAL.providers[0]);

  return (
    <Modal open={open} width={BASE_WIDTH * zoom}>
      <div style={{ zoom }} className="px-[13px] pb-[14px] pt-[13px]">
        <h2 className="text-[13px] font-semibold leading-5 text-[#0B0B0F]">{MODAL.title}</h2>
        <p className="mt-[5px] text-[10px] font-medium leading-4 text-[#374151]">{MODAL.label}</p>

        <div className="relative mt-[3px]">
          <div
            data-tl="select-provider"
            data-open={listOpen}
            onClick={() => tl.setVar("open", listOpen ? "" : "provider")}
            className="flex h-[32px] items-center rounded-[6px] border border-[#D8DAE0] bg-white px-2.5 text-[10.5px] text-[#0B0B0F] transition-[border-color,box-shadow] duration-150 data-[open=true]:border-[#0B0B0F] data-[open=true]:shadow-[0_0_0_1px_#0B0B0F]"
          >
            <span className="flex-1 truncate">{provider}</span>
            <Icon name="chevronDown" size={13} className={`text-[#6B7280] transition-transform duration-200 ${listOpen ? "rotate-180" : ""}`} />
          </div>

          <div
            role="listbox"
            className={`absolute inset-x-0 top-full z-10 mt-1 origin-top rounded-[6px] border border-[#E5E7EB] bg-white p-[3px] shadow-[0_12px_28px_-10px_rgba(17,24,39,0.3)] transition-[opacity,transform] duration-200 ${
              listOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
            }`}
          >
            {MODAL.providers.map((p) => (
              <div
                key={p}
                role="option"
                aria-selected={provider === p}
                data-tl={`option-provider-${providerSlug(p)}`}
                onClick={() => {
                  tl.setVar("field:provider", p);
                  tl.setVar("open", "");
                }}
                className="flex h-[22px] items-center gap-1.5 rounded-[4px] px-2 text-[10px] text-[#1F2937] transition-colors duration-150 data-[hover=true]:bg-[#F3F4F6] data-[pressed=true]:bg-[#E5E7EB]"
              >
                <span className="flex w-3 justify-center">{provider === p && <Icon name="check" size={9} />}</span>
                {p}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-[9px] rounded-[5px] bg-[#EEF3FD] px-[10px] py-[9px] text-[10px] leading-[15px] text-[#1E40AF]">{MODAL.info}</p>

        <p className="mt-[9px] flex gap-1.5 rounded-[5px] border border-[#FCE9A0] bg-[#FEFBEB] px-[10px] py-[8px] text-[9px] leading-[13px] text-[#92400E]">
          <Icon name="warning" size={11} className="mt-px shrink-0 text-[#D97706]" />
          {MODAL.warning}
        </p>

        <div className="mt-[11px] flex justify-center">
          <button
            data-tl="modal-close"
            onClick={() => tl.setVar("modal", false)}
            className="h-[24px] rounded-[5px] px-4 text-[10.5px] font-medium text-[#0B0B0F] transition-[background,transform] duration-150 hover:bg-[#F3F4F6] data-[pressed=true]:scale-[0.96]"
          >
            {MODAL.close}
          </button>
        </div>
      </div>
    </Modal>
  );
}
