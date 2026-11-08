"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Search } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksConfigureAccountsModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "booksConfigAccountsModalOpen", false);
  const search = useTimelineVar<string>(tl, "booksConfigAccountsSearch", "");
  const selectedAccounts = useTimelineVar<string[]>(tl, "booksConfigAccountsSelected", []);

  if (!isOpen) return null;

  const availableAccounts = [
    { id: "shipping-charges", name: "Shipping Charges", type: "Income" },
    { id: "late-fee-income", name: "Late Fee Income", type: "Income" },
    { id: "sales", name: "Sales", type: "Income" },
    { id: "cogs", name: "Cost of Goods Sold", type: "Expense" },
    { id: "insurance", name: "Insurance", type: "Expense" },
    { id: "office-supplies", name: "Office Supplies", type: "Expense" },
    { id: "advertising", name: "Advertising and Marketing", type: "Expense" },
    { id: "rent", name: "Rent Expense", type: "Expense" },
  ];

  const filtered = availableAccounts.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div
        data-tl="modal-configure-accounts"
        className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">Configure Accounts</h3>
          <button
            type="button"
            data-tl="btn-close-config-modal"
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              data-tl="input-config-accounts-search"
              placeholder="Search accounts..."
              value={search}
              readOnly
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Account list */}
        <div className="p-6 max-h-[60vh] overflow-y-auto divide-y divide-gray-100 space-y-1">
          {filtered.map((acc) => {
            const isChecked = selectedAccounts.includes(acc.name);
            return (
              <label
                key={acc.id}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    data-tl={`chk-config-${acc.id}`}
                    checked={isChecked}
                    readOnly
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-900">{acc.name}</span>
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  {acc.type}
                </span>
              </label>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            type="button"
            data-tl="btn-modal-cancel-accounts"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-modal-update-accounts"
            className="px-5 py-2 text-sm font-semibold text-white bg-[#145CFB] hover:bg-blue-600 rounded-lg shadow-sm transition-colors"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
