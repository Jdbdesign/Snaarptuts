"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Plus,
  Trash2,
  Edit2,
  Download,
  Users,
} from "lucide-react";
import type { ZeusList } from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusListsView({ tl }: Props) {
  const lists = useTimelineVar<ZeusList[]>(tl, "zeusLists", []);
  const selectedListId = useTimelineVar<string | null>(tl, "zeusSelectedListId", lists[0]?.id ?? null);

  const selectedList = lists.find((l) => l.id === selectedListId) || lists[0] || null;

  const handleOpenCreateModal = () => {
    tl.setVar("zeusCreateListModalOpen", true);
  };

  const handleOpenDeleteModal = (list: ZeusList) => {
    tl.setVar("zeusListToDelete", list);
    tl.setVar("zeusDeleteListModalOpen", true);
  };

  return (
    <div data-tl="zeus-lists-view" className="flex h-full w-full overflow-hidden bg-[#F6F6F8]">
      {/* 1. My Lists Left Panel */}
      <aside
        data-tl="my-lists-panel"
        className="w-[320px] shrink-0 border-r border-gray-200 bg-white flex flex-col h-full select-none"
      >
        {/* Header */}
        <div className="h-14 px-5 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h2 className="font-bold text-sm text-gray-900">My Lists</h2>
          <button
            type="button"
            data-tl="btn-new-list"
            onClick={handleOpenCreateModal}
            className="flex items-center gap-1.5 bg-[#7014D9] hover:bg-[#5B0FB3] text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New List</span>
          </button>
        </div>

        {/* Lists Items */}
        <div data-tl="lists-scroll-area" className="flex-1 overflow-y-auto p-3 space-y-1">
          {lists.length === 0 ? (
            <div data-tl="lists-empty-panel" className="p-6 text-center text-xs text-gray-500">
              <p className="font-semibold text-gray-800">No lists yet</p>
              <p className="mt-1 text-[11px] text-gray-400">
                Create your first list to organize your contacts.
              </p>
            </div>
          ) : (
            lists.map((list) => {
              const isSelected = selectedList?.id === list.id;
              const isTechCeo = list.name === "Tech CEO";
              const isNewLeads = list.name === "New Leads";
              const isPriorityLeads = list.name === "Priority Leads";
              const isCeo = list.name === "CEO";

              return (
                <div
                  key={list.id}
                  data-tl={
                    isTechCeo
                      ? "list-item-tech-ceo"
                      : isNewLeads
                      ? "list-item-new-leads"
                      : isPriorityLeads
                      ? "list-item-priority-leads"
                      : isCeo
                      ? "list-item-ceo"
                      : `list-item-${list.id}`
                  }
                  onClick={() => tl.setVar("zeusSelectedListId", list.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-colors group flex items-center justify-between ${
                    isSelected
                      ? "bg-[#F5EEFF] border border-[#7014D9]/20"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? "text-[#7014D9]" : "text-gray-900"
                        }`}
                      >
                        {list.name}
                      </span>
                      <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        {list.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {list.type} • {list.contacts?.length ?? list.membersCount} members • {list.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      className="p-1 text-gray-400 hover:text-gray-700 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        tl.setVar("zeusListToEdit", list);
                        tl.setVar("zeusEditListName", list.name);
                        tl.setVar("zeusEditListModalOpen", true);
                      }}
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      data-tl={`btn-quick-delete-${list.id}`}
                      className="p-1 text-gray-400 hover:text-red-600 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDeleteModal(list);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* 2. List Details Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {selectedList ? (
          <div data-tl="list-detail-container" className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-3">
                  <h1
                    data-tl="selected-list-title"
                    className="text-lg font-bold text-gray-900 tracking-tight"
                  >
                    {selectedList.name}
                  </h1>
                  <span className="bg-[#F5EEFF] text-[#7014D9] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {selectedList.type}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selectedList.type} list • {selectedList.contacts?.length ?? selectedList.membersCount} members
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-tl="btn-export-csv"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-gray-500" />
                  <span>Export CSV</span>
                </button>
                <button
                  type="button"
                  data-tl="btn-edit-list"
                  onClick={() => {
                    tl.setVar("zeusListToEdit", selectedList);
                    tl.setVar("zeusEditListName", selectedList.name);
                    tl.setVar("zeusEditListModalOpen", true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  data-tl="btn-delete-list"
                  onClick={() => handleOpenDeleteModal(selectedList)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            {/* List Members Table or Empty State */}
            {selectedList.contacts && selectedList.contacts.length > 0 ? (
              <div data-tl="list-members-table-container" className="flex-1 overflow-y-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-semibold text-gray-500 tracking-wider">
                      <th className="py-2.5 px-4 w-10">
                        <input type="checkbox" className="rounded text-[#7014D9]" />
                      </th>
                      <th className="py-2.5 px-4">NAME</th>
                      <th className="py-2.5 px-4">TITLE</th>
                      <th className="py-2.5 px-4">COMPANY</th>
                      <th className="py-2.5 px-4">EMAIL</th>
                      <th className="py-2.5 px-4">PHONE</th>
                      <th className="py-2.5 px-4">LOCATION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {selectedList.contacts.map((contact) => (
                      <tr
                        key={contact.id}
                        data-tl={
                          contact.id === "c-1"
                            ? "list-member-row-jordan"
                            : `list-member-row-${contact.id}`
                        }
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4">
                          <input type="checkbox" className="rounded text-[#7014D9]" />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-7 h-7 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0 ${contact.avatarBg}`}
                            >
                              {contact.initials}
                            </div>
                            <span className="font-bold text-gray-900">{contact.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{contact.title}</td>
                        <td className="py-3 px-4 text-blue-600 font-medium">{contact.company}</td>
                        <td className="py-3 px-4 font-mono text-emerald-700 font-medium">
                          {contact.revealedEmail}
                        </td>
                        <td className="py-3 px-4 text-gray-400">{contact.phone}</td>
                        <td className="py-3 px-4 text-gray-600">{contact.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                data-tl="empty-list-state"
                className="flex-1 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mt-4">No members in this list</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm">
                  Add people or companies from search results.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div data-tl="lists-empty-main" className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400">
            <h3 className="text-sm font-bold text-gray-700">Select a list</h3>
            <p className="text-xs text-gray-400 mt-1">Choose a list from the left panel to view its members, or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
