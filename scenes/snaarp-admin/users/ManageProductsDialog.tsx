"use client";

import { Icon } from "@/components/icons";
import { FieldText } from "@/components/admin/TypedField";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { COPY, NEW_USER, PRODUCTS, productById, SAMPLE_DATE, START_PRODUCTS } from "../admin-data";
import { AdminDialog } from "./AdminDialog";
import { showAdminToast } from "./AdminToast";
import { ProductIcon } from "./ProductIcon";

const M = COPY.manage;

/**
 * Manage Products dialog for the new user (Actions > Manage Products). Scene variables: `dialog`,
 * `userProducts` (ids the user has), `mpOpen` (the searchable list is open), `mpChosen` (product picked,
 * not yet added) and the typed search `field:mpsearch`. "Make admin" and "Remove" are drawn but never wired.
 */
export function ManageProductsDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "manage";
  const owned = useTimelineVar<string[]>(tl, "userProducts", START_PRODUCTS);
  const listOpen = useTimelineVar(tl, "mpOpen", false);
  const chosen = useTimelineVar(tl, "mpChosen", "");
  const search = useTimelineVar(tl, "field:mpsearch", "");

  const q = search.trim().toLowerCase();
  const options = PRODUCTS.filter((p) => !owned.includes(p.id) && p.name.toLowerCase().includes(q));
  const chosenProduct = chosen ? productById(chosen) : null;

  const closeList = () => {
    tl.setVar("mpOpen", false);
    tl.setVar("focus", "");
  };

  return (
    <AdminDialog
      open={open}
      width={600}
      title={M.title}
      hook="manage-dialog"
      scrollId="manage-scroll"
      closeHook="btn-close-manage"
      onClose={() => {
        tl.setVar("dialog", "");
        closeList();
      }}
      onBodyClick={closeList}
    >
      <p className="mb-2.5 text-[13.5px] font-semibold text-[#2a2d36]">{M.heading(NEW_USER.first + " " + NEW_USER.last)}</p>

      <ul data-tl="mp-owned" className="rounded-xl border border-[#F0F0F4]">
        {owned.map((id) => {
          const p = productById(id);
          return (
            <li
              key={id}
              data-tl={`mp-row-${id}`}
              className="flex items-center gap-3 border-b border-[#F0F0F4] px-3.5 py-2.5 last:border-b-0"
            >
              <ProductIcon product={p} size={32} />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold leading-5">{p.name}</p>
                <p className="text-[11.5px] leading-4 text-[#8b909c]">{M.granted(SAMPLE_DATE)}</p>
              </div>
              <span
                data-tl={`mp-admin-${id}`}
                className="rounded-md px-2 py-1 text-[12.5px] font-semibold text-brand transition-colors data-[hover=true]:bg-[#F4ECFF]"
              >
                {M.makeAdmin}
              </span>
              <span
                data-tl={`mp-remove-${id}`}
                className="rounded-md px-2 py-1 text-[12.5px] font-semibold text-[#C0265A] transition-colors data-[hover=true]:bg-[#FDECF2]"
              >
                {M.remove}
              </span>
            </li>
          );
        })}
      </ul>

      <p data-tl="mp-note" className="mt-3 text-[12px] leading-[18px] text-[#6b7280]">
        <b className="font-semibold text-[#2a2d36]">{M.makeAdmin}</b> {M.note}
      </p>

      <div className="mt-4 border-t border-[#F0F0F4] pt-4">
        <p className="mb-2 text-[13.5px] font-semibold">{M.addTitle}</p>
        <div className="flex items-start gap-3">
          <div className="relative min-w-0 flex-1">
            <div
              data-tl="mp-select"
              onClick={(e) => {
                e.stopPropagation();
                tl.setVar("mpOpen", !listOpen);
                tl.setVar("focus", "");
              }}
              className={`flex h-[42px] items-center gap-2.5 rounded-xl border bg-white px-3.5 text-[14px] transition-[border-color,box-shadow] duration-150 ${
                listOpen ? "border-[#7C39ED] shadow-[0_0_0_3px_rgba(124,57,237,0.14)]" : "border-[#E5E7EB]"
              }`}
            >
              {chosenProduct ? (
                <>
                  <ProductIcon product={chosenProduct} size={20} />
                  <span className="flex-1 truncate">{chosenProduct.name}</span>
                </>
              ) : (
                <span className="flex-1 truncate text-[#8b909c]">{M.select}</span>
              )}
              <Icon name="chevronDown" size={15} className={`text-[#6b7280] transition-transform ${listOpen ? "rotate-180" : ""}`} />
            </div>

            <div
              data-tl="mp-popover"
              onClick={(e) => e.stopPropagation()}
              className={`absolute left-0 right-0 top-[46px] z-20 rounded-xl border border-[#EEEEF2] bg-white p-2 shadow-[0_16px_40px_-12px_rgba(17,17,17,0.25)] ${
                listOpen ? "tl-pop-in" : "hidden"
              }`}
            >
              <div
                data-tl="mp-search"
                onClick={() => tl.setVar("focus", "mpsearch")}
                className="flex h-10 items-center gap-2 rounded-lg border border-[#7C39ED] px-3 text-[13.5px] shadow-[0_0_0_3px_rgba(124,57,237,0.12)]"
              >
                <Icon name="search" size={15} className="shrink-0 text-[#8b909c]" />
                <FieldText tl={tl} id="mpsearch" placeholder={M.search} />
              </div>
              <ul data-tl="mp-list" className="no-scrollbar mt-1.5 max-h-[200px] overflow-y-auto">
                {options.map((p) => (
                  <li
                    key={p.id}
                    data-tl={`mp-opt-${p.id}`}
                    onClick={() => {
                      tl.setVar("mpChosen", p.id);
                      closeList();
                      tl.setVar("field:mpsearch", "");
                    }}
                    className="flex h-10 items-center gap-3 rounded-lg px-2.5 text-[13.5px] transition-colors data-[hover=true]:bg-[#F4ECFF]"
                  >
                    <ProductIcon product={p} size={20} />
                    {p.name}
                  </li>
                ))}
                {options.length === 0 && <li className="px-2.5 py-3 text-[13px] text-[#8b909c]">{M.noMatch}</li>}
              </ul>
            </div>
          </div>

          <button
            data-tl="btn-mp-add"
            data-ready={!!chosen}
            onClick={(e) => {
              e.stopPropagation();
              if (!chosen) return;
              tl.setVar("userProducts", [...owned, chosen]);
              tl.setVar("mpChosen", "");
              showAdminToast(tl, M.toast);
            }}
            className="h-[42px] rounded-xl bg-[#C9A8F5] px-6 text-[13.5px] font-semibold text-white transition-[background,transform] duration-200 data-[pressed=true]:scale-95 data-[ready=true]:bg-brand"
          >
            {M.add}
          </button>
        </div>
        <p className="mt-2 text-[12px] text-[#6b7280]">{M.hint}</p>
        {/* Room under the open list, so the dialog body can scroll down to it as in the recording. */}
        <div className={`transition-[height] duration-200 ${listOpen ? "h-[260px]" : "h-0"}`} />
      </div>
    </AdminDialog>
  );
}
