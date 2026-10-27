"use client";

import { Checkbox } from "@/components/admin/Checkbox";
import { FieldText } from "@/components/admin/TypedField";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { FORWARDING, MAILBOX, type MUser } from "./data";

/* ------------------------------------------------------------------ Email Forwarding */

const BOX = "rounded-2xl border border-[#F0F0F4] bg-white";

/**
 * Email Forwarding (admin.snaarp.com/admin/email-forwarding). Scene variables: `fwdSel` (ticked users), `fwdMenu`
 * (supervisor list open), `fwdSup` (chosen supervisor id), `fwdAbout` (collapsible open), `fwdOn` (ids with forwarding enabled).
 */
export function ForwardingPage({ tl }: { tl: Timeline }) {
  const F = FORWARDING;
  const users = useTimelineVar<MUser[]>(tl, "mUsers", []);
  const sel = useTimelineVar<string[]>(tl, "fwdSel", []);
  const menu = useTimelineVar<boolean>(tl, "fwdMenu", false);
  const sup = useTimelineVar<string>(tl, "fwdSup", "");
  const about = useTimelineVar<boolean>(tl, "fwdAbout", false);
  const on = useTimelineVar<string[]>(tl, "fwdOn", []);
  const picked = users.filter((u) => sel.includes(u.id));
  const supervisor = users.find((u) => u.id === sup);
  const toggle = (id: string) => tl.setVar("fwdSel", sel.includes(id) ? sel.filter((s) => s !== id) : [...sel, id]);

  return (
    <div onClick={() => tl.setVar("fwdMenu", false)}>
      <h1 data-tl="fw-heading" className="text-[26px] font-semibold leading-[34px]">
        {F.title}
      </h1>
      <p className="mt-1 text-[14px] text-[#6b7280]">{F.subtitle}</p>

      <div className={`mt-4 ${BOX}`}>
        <button data-tl="fw-about" onClick={() => tl.setVar("fwdAbout", !about)} className="flex w-full items-center justify-between px-4 py-3 text-[13px] font-medium">
          <span className="flex items-center gap-2">
            <Icon name="fmInfo" size={14} className="text-[#3B82F6]" />
            {F.about}
          </span>
          <Icon name="chevronDown" size={14} className={`text-[#6b7280] transition-transform ${about ? "rotate-180" : ""}`} />
        </button>
        {about && (
          <div data-tl="fw-about-body" className="tl-fade-in border-t border-[#F0F0F4] px-5 py-3 text-[12px] text-[#4b5060]">
            <p>{F.aboutText}</p>
            <ul className="mt-2 list-disc pl-5">
              {F.aboutList.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr]">
        <div data-tl="fw-users" className={`${BOX} p-4`}>
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold">{F.select}</h2>
            {sel.length > 0 && <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[10.5px]">{F.selected(sel.length)}</span>}
          </div>
          <p className="mt-2 text-[11px] text-[#6b7280]">{F.department}</p>
          <div className="mt-1 flex h-9 items-center justify-between rounded-lg border border-[#E1E4EE] px-3 text-[12.5px]">
            {F.allMembers}
            <Icon name="chevronDown" size={13} className="text-[#6b7280]" />
          </div>
          <div className="mt-2 flex h-9 items-center gap-2 rounded-lg border border-[#E1E4EE] px-3 text-[12.5px] text-[#9aa0ab]">
            <Icon name="search" size={13} />
            {F.search}
          </div>
          <div className="mt-2 flex gap-2">
            <button data-tl="fw-select-all" onClick={() => tl.setVar("fwdSel", users.map((u) => u.id))} className="h-8 flex-1 rounded-lg border border-[#E1E4EE] text-[12px] font-medium">
              {F.selectAll}
            </button>
            {sel.length > 0 && (
              <button data-tl="fw-clear" onClick={() => tl.setVar("fwdSel", [])} className="h-8 flex-1 rounded-lg border border-[#E1E4EE] text-[12px] font-medium">
                {F.clear}
              </button>
            )}
          </div>
          <div data-tl="fw-user-list" className="no-scrollbar mt-3 flex max-h-[300px] flex-col gap-1.5 overflow-y-auto">
            {users.map((u) => {
              const t = sel.includes(u.id);
              return (
                <div
                  key={u.id}
                  data-tl={`fw-user-${u.id}`}
                  onClick={() => toggle(u.id)}
                  className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 ${t ? "border-[#BFD4FB] bg-[#EAF1FE]" : "border-[#F0F0F4] data-[hover=true]:bg-[#FAFAFB]"}`}
                >
                  <Checkbox checked={t} size={14} />
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F4F6] text-[#8b909c]">
                    <Icon name="user" size={13} />
                  </span>
                  <span className="min-w-0 text-[12px] leading-4">
                    <b className="block truncate font-medium">{u.name}</b>
                    <span className="block truncate text-[10.5px] text-[#9aa0ab]">{u.email}</span>
                  </span>
                  {on.includes(u.id) && <span className="ml-auto rounded bg-[#DCF5E6] px-1.5 py-px text-[9.5px] font-semibold text-[#1B7F4B]">{F.statusOn}</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div data-tl="fw-config" className={`${BOX} p-5`}>
          <h2 className="text-[14px] font-bold">{F.config}</h2>
          {picked.length === 0 ? (
            <div className="flex flex-col items-center gap-1.5 py-16 text-center text-[12.5px] text-[#8b909c]">
              <Icon name="users" size={34} className="text-[#C9CDD6]" />
              {F.empty}
              <span className="text-[11px]">{F.emptyHelp}</span>
            </div>
          ) : (
            <div className="mt-3">
              <div className="rounded-lg bg-[#F7F7F9] px-4 py-3 text-[12px]">
                <b>{F.selectedUsers(picked.length)}</b>
                {picked.map((u) => (
                  <p key={u.id} className="mt-1 text-[11.5px] text-[#4b5060]">
                    <i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#22A06B]" />
                    {u.name} ({u.email})
                  </p>
                ))}
              </div>
              <p className="mt-4 text-[12.5px] font-semibold">{F.enableAll}</p>
              <p className="mt-2 text-[11.5px] text-[#6b7280]">{F.supervisor}</p>
              <div className="relative mt-1">
                <button
                  data-tl="fw-supervisor"
                  onClick={(e) => {
                    e.stopPropagation();
                    tl.setVar("fwdMenu", !menu);
                  }}
                  className={`flex h-10 w-full items-center justify-between rounded-lg border px-3 text-[12.5px] ${menu ? "border-[#2F5BE0]" : "border-[#E1E4EE]"} ${supervisor ? "" : "text-[#6b7280]"}`}
                >
                  {supervisor ? `${supervisor.name} (${supervisor.email})` : F.supervisorPlaceholder}
                  <Icon name="chevronDown" size={13} className="text-[#6b7280]" />
                </button>
                {menu && (
                  <div data-tl="fw-sup-list" onClick={(e) => e.stopPropagation()} className="no-scrollbar tl-pop-in absolute left-0 right-0 top-[44px] z-20 max-h-[190px] overflow-y-auto rounded-lg border border-[#E1E4EE] bg-white p-1 shadow-lg">
                    {users.map((u) => (
                      <div
                        key={u.id}
                        data-tl={`fw-sup-${u.id}`}
                        onClick={() => {
                          tl.setVar("fwdSup", u.id);
                          tl.setVar("fwdMenu", false);
                        }}
                        className="flex h-8 items-center gap-2 rounded px-3 text-[12px] data-[hover=true]:bg-[#F3F4F6]"
                      >
                        <Icon name="user" size={12} className="text-[#8b909c]" />
                        {u.name} <span className="text-[10.5px] text-[#9aa0ab]">({u.email})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="mt-1.5 text-[11px] text-[#6b7280]">{F.supervisorHelp}</p>
              {supervisor && <p className="mt-0.5 text-[11px] text-[#6b7280]">{F.monitoring(on.length)}</p>}
              <button
                data-tl="btn-enable-forwarding"
                onClick={() => {
                  if (!supervisor) return;
                  tl.setVar("fwdOn", [...new Set([...on, ...sel])]);
                  tl.toast(F.toast(sel.length, supervisor.name));
                }}
                className={`mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-medium text-white transition-[background,transform] data-[pressed=true]:scale-[0.99] ${supervisor ? "bg-[#2F5BE0]" : "bg-[#9DB4F2]"}`}
              >
                <Icon name="send" size={13} />
                {F.enable(picked.length)}
              </button>
              {on.length > 0 && (
                <p data-tl="fw-status" className="mt-3 flex items-center gap-2 text-[12px]">
                  {F.status}: <span className="rounded bg-[#DCF5E6] px-2 py-0.5 text-[11px] font-semibold text-[#1B7F4B]">{F.statusOn}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Mailbox with the group address */

/** A small inbox with a New Message window. Scene variables: `mbCompose` (window open), `mbFromOpen`, `mbFrom` ("own" | "group"), `field:mb-subject`. */
export function MailboxView({ tl }: { tl: Timeline }) {
  const M = MAILBOX;
  const compose = useTimelineVar<boolean>(tl, "mbCompose", false);
  const fromOpen = useTimelineVar<boolean>(tl, "mbFromOpen", false);
  const from = useTimelineVar<string>(tl, "mbFrom", "own");
  const focused = useTimelineVar<string>(tl, "focus", "") === "mb-subject";
  return (
    <div className="relative flex h-full w-full bg-white text-ink">
      <aside className="flex w-[210px] shrink-0 flex-col gap-1 border-r border-[#F0F0F4] p-4">
        <p className="mb-3 text-[22px] font-bold tracking-tight">Snaarp</p>
        <button
          data-tl="mb-compose"
          onClick={() => tl.setVar("mbCompose", true)}
          className="mb-3 flex h-10 items-center justify-center gap-2 rounded-full bg-[#E8EEFF] text-[13px] font-semibold text-[#2F5BE0] transition-transform data-[pressed=true]:scale-95"
        >
          <Icon name="pencil" size={14} />
          {M.compose}
        </button>
        {M.nav.map((n, i) => (
          <span key={n} className={`flex h-8 items-center rounded-lg px-3 text-[12.5px] ${i === 0 ? "bg-[#E8EEFF] font-semibold text-[#2F5BE0]" : "text-[#4b5060]"}`}>
            {n}
          </span>
        ))}
      </aside>
      <div className="min-w-0 flex-1">
        <div className="flex h-14 items-center border-b border-[#F0F0F4] px-5">
          <span className="flex h-9 w-[360px] max-w-full items-center gap-2 rounded-full bg-[#F3F4F6] px-4 text-[12.5px] text-[#8b909c]">
            <Icon name="search" size={14} />
            {M.searchPlaceholder}
          </span>
        </div>
        {M.messages.map(([who, subject, preview]) => (
          <div key={subject} className="flex items-center gap-4 border-b border-[#F3F3F6] px-5 py-2.5 text-[12.5px]">
            <b className="w-[130px] shrink-0 truncate font-semibold">{who}</b>
            <span className="min-w-0 truncate">
              <b className="font-semibold">{subject}</b> <span className="text-[#8b909c]">- {preview}</span>
            </span>
          </div>
        ))}
      </div>

      {compose && (
        <div data-tl="mb-window" className="tl-pop-in absolute bottom-0 right-8 z-20 w-[430px] rounded-t-xl border border-[#E1E4EE] bg-white shadow-[0_10px_40px_-8px_rgba(0,0,0,0.35)]">
          <p className="rounded-t-xl bg-[#F3F4F6] px-4 py-2.5 text-[12.5px] font-semibold">{M.newMessage}</p>
          <div className="relative px-4 text-[12.5px]">
            <button
              data-tl="mb-from"
              onClick={() => tl.setVar("mbFromOpen", !fromOpen)}
              className="flex h-10 w-full items-center gap-3 border-b border-[#F0F0F4] text-left"
            >
              <span className="w-12 text-[#6b7280]">{M.from}</span>
              <span className="flex-1">{from === "group" ? M.fromGroup : M.fromOwn}</span>
              <Icon name="chevronDown" size={13} className="text-[#6b7280]" />
            </button>
            {fromOpen && (
              <div className="tl-pop-in absolute left-3 right-3 top-10 z-10 rounded-lg border border-[#E1E4EE] bg-white p-1 shadow-lg">
                {[
                  ["own", M.fromOwn],
                  ["group", M.fromGroup],
                ].map(([id, label]) => (
                  <div
                    key={id}
                    data-tl={`mb-from-${id}`}
                    onClick={() => {
                      tl.setVar("mbFrom", id);
                      tl.setVar("mbFromOpen", false);
                    }}
                    className="flex h-9 items-center justify-between rounded px-3 data-[hover=true]:bg-[#F3F4F6]"
                  >
                    {label}
                    {from === id && <Icon name="check" size={13} />}
                  </div>
                ))}
              </div>
            )}
            <div className="flex h-10 items-center gap-3 border-b border-[#F0F0F4]">
              <span className="w-12 text-[#6b7280]">{M.to}</span>
            </div>
            <div data-tl="field-mb-subject" data-focus={focused} onClick={() => tl.setVar("focus", "mb-subject")} className="flex h-10 items-center border-b border-[#F0F0F4]">
              <FieldText tl={tl} id="mb-subject" placeholder={M.subject} />
            </div>
            <div className="h-[110px]" />
          </div>
          <div className="flex items-center justify-between px-4 pb-3">
            <span className="flex h-8 items-center rounded-full bg-[#2F5BE0] px-5 text-[12.5px] font-semibold text-white">{M.send}</span>
          </div>
        </div>
      )}
    </div>
  );
}
