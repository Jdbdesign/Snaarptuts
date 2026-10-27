"use client";

import { Checkbox } from "@/components/admin/Checkbox";
import { FieldText } from "@/components/admin/TypedField";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { GROUP_PAGE, GROUPS, INBOXES, WIZARD, type Group, type MUser } from "./data";
import { DialogButton, MDialog } from "./MDialog";

const outline = "flex h-9 items-center gap-2 rounded-[10px] border border-[#E6E6EC] bg-white px-3.5 text-[13px] font-medium";
const FIELD =
  "flex min-h-[40px] items-center rounded-lg border border-[#E1E4EE] bg-white px-3 text-[13px] transition-[border-color,box-shadow] duration-150 data-[focus=true]:border-[#7C39ED] data-[focus=true]:shadow-[0_0_0_3px_rgba(124,57,237,0.14)]";
const initial = (n: string) => n[0];

/* ------------------------------------------------------------------ Group Management list */

/** Scene variables: `groups` (created groups), `gPage` ("list" | "detail"), `gId`. */
export function GroupsList({ tl }: { tl: Timeline }) {
  const groups = useTimelineVar<Group[]>(tl, "groups", []);
  const stats = [
    groups.filter((g) => g.type === "Distribution List").length,
    groups.filter((g) => g.type === "Shared Mailbox").length,
    groups.length,
    groups.filter((g) => g.visibility === "Public").length,
  ];
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 data-tl="gr-heading" className="text-[26px] font-semibold leading-[34px]">
            {GROUPS.title}
          </h1>
          <p className="mt-1 text-[14px] text-[#6b7280]">{GROUPS.subtitle}</p>
        </div>
        <div className="flex gap-2.5">
          <span className={outline}>
            <Icon name="upload" size={14} />
            {GROUPS.bulkImport}
          </span>
          <button
            data-tl="btn-create-group"
            onClick={() => {
              tl.setVar("wizStep", 1);
              tl.setVar("mDialog", "wizard");
            }}
            className="flex h-9 items-center gap-2 rounded-[10px] bg-[#111] px-4 text-[13px] font-medium text-white transition-transform data-[pressed=true]:scale-95"
          >
            <Icon name="plus" size={14} />
            {GROUPS.create}
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {GROUPS.stats.map((l, i) => (
          <div key={l} className="flex h-[80px] items-center gap-3 rounded-2xl border border-[#F0F0F4] bg-white px-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3B82F6]">
              <Icon name="layers" size={18} />
            </span>
            <div>
              <p className="text-[12px] text-[#6b7280]">{l}</p>
              <p className="text-[22px] font-bold leading-6">{stats[i]}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-[#F0F0F4] bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-[38px] min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-[#E6E6EC] px-3 text-[13px] text-[#9aa0ab]">
            <Icon name="search" size={14} />
            {GROUPS.search}
          </div>
          {GROUPS.filters.map((f) => (
            <span key={f} className="flex h-[38px] w-[130px] items-center justify-between rounded-lg border border-[#E6E6EC] px-3 text-[12.5px]">
              {f}
              <Icon name="chevronDown" size={13} className="text-[#6b7280]" />
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px] text-[#6b7280]">
          {GROUPS.count(groups.length, groups.length)}
          <span className="flex gap-2">
            {[GROUPS.export, GROUPS.refresh].map((b) => (
              <span key={b} className="flex h-7 items-center rounded-lg border border-[#E6E6EC] px-2.5 text-[11.5px] font-medium text-ink">
                {b}
              </span>
            ))}
          </span>
        </div>
        <div className="mt-3 overflow-hidden rounded-xl border border-[#F0F0F4]">
          <div className="grid grid-cols-[30px_1.6fr_1fr_90px_100px_110px_70px] items-center bg-[#FAFAFB] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b909c]">
            <Checkbox checked={false} size={14} />
            {GROUPS.columns.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          {groups.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-10 text-[13px] text-[#8b909c]">
              <Icon name="layers" size={30} className="text-[#C9CDD6]" />
              {GROUPS.empty}
            </div>
          )}
          {groups.map((g) => (
            <div
              key={g.id}
              data-tl={`g-row-${g.id}`}
              onClick={() => {
                tl.setVar("gId", g.id);
                tl.setVar("gPage", "detail");
              }}
              className="tl-fade-in grid grid-cols-[30px_1.6fr_1fr_90px_100px_110px_70px] items-center border-t border-[#F0F0F4] px-4 py-3 text-[13px] data-[hover=true]:bg-[#FAFAFB]"
            >
              <Checkbox checked={false} size={14} />
              <span className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1E8FD] text-[12px] font-semibold text-[#7C3AED]">{initial(g.name)}</span>
                <span className="leading-4">
                  <b className="block font-semibold">{g.name}</b>
                  <span className="text-[11px] text-[#8b909c]">{g.email}</span>
                </span>
              </span>
              <span>{g.type}</span>
              <span>{g.members.length}</span>
              <span>{g.visibility}</span>
              <span className="text-[#6b7280]">{GROUP_PAGE.never}</span>
              <Icon name="dots" size={16} className="text-[#6b7280]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Create New Group wizard */

function StepDots({ step }: { step: number }) {
  const icons = ["user", "fmEmail", "gear"] as const;
  return (
    <div className="mx-auto mt-3 flex w-[210px] items-center">
      {icons.map((n, i) => {
        const done = step > i + 1;
        const now = step === i + 1;
        return (
          <div key={n} className={`flex items-center ${i < 2 ? "flex-1" : ""}`}>
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border ${done || now ? "border-[#111] bg-[#111] text-white" : "border-[#D5D8E2] text-[#8b909c]"}`}
            >
              <Icon name={done ? "check" : n} size={13} />
            </span>
            {i < 2 && <span className={`mx-1.5 h-px flex-1 ${done ? "bg-[#111]" : "bg-[#D5D8E2]"}`} />}
          </div>
        );
      })}
    </div>
  );
}

function TypedBox({ tl, id, placeholder, tall }: { tl: Timeline; id: string; placeholder: string; tall?: boolean }) {
  const focused = useTimelineVar<string>(tl, "focus", "") === id;
  return (
    <div data-tl={`field-${id}`} data-focus={focused} onClick={() => tl.setVar("focus", id)} className={`${FIELD} ${tall ? "min-h-[80px] items-start py-2.5" : ""}`}>
      <FieldText tl={tl} id={id} placeholder={placeholder} />
    </div>
  );
}

/** Three-step wizard. Scene variables: `wizStep` (1-3), `gInbox`, `gMenu` (inbox list open), `gType`, `field:gname`, `field:gdesc`. */
export function GroupWizard({ tl }: { tl: Timeline }) {
  const W = WIZARD;
  const open = useTimelineVar<string>(tl, "mDialog", "") === "wizard";
  const step = useTimelineVar<number>(tl, "wizStep", 1);
  const inbox = useTimelineVar<string>(tl, "gInbox", "");
  const menu = useTimelineVar<boolean>(tl, "gMenu", false);
  const type = useTimelineVar<string>(tl, "gType", W.types[0].id);
  const name = useTimelineVar<string>(tl, "field:gname", "");
  const desc = useTimelineVar<string>(tl, "field:gdesc", "");
  const close = () => {
    tl.setVar("mDialog", "");
    tl.setVar("focus", "");
    tl.setVar("gMenu", false);
  };
  const ok = step === 1 ? !!name && !!desc : step === 2 ? !!inbox : true;
  const head = W.steps[step - 1];

  return (
    <MDialog
      open={open}
      width={440}
      hook="wz-dialog"
      scrollId="wz-scroll"
      title={W.title}
      subtitle={W.subtitle}
      onClose={close}
      footer={
        <>
          {step > 1 && (
            <DialogButton hook="btn-wz-back" className="flex-1" onClick={() => tl.setVar("wizStep", step - 1)}>
              {W.back}
            </DialogButton>
          )}
          <DialogButton hook="btn-wz-cancel" className="flex-1" onClick={close}>
            {W.cancel}
          </DialogButton>
          <DialogButton
            hook="btn-wz-next"
            kind="dark"
            className="flex-1"
            disabled={!ok}
            onClick={() => {
              if (step < 3) {
                tl.setVar("wizStep", step + 1);
                tl.setVar("focus", "");
                return;
              }
              const g: Group = { id: "support", name, description: desc, email: inbox, type, visibility: "Public", members: [] };
              tl.setVar("groups", [...tl.getVar<Group[]>("groups", []), g]);
              tl.setVar("field:gname", "");
              tl.setVar("field:gdesc", "");
              close();
              tl.toast(GROUPS.toast(g.name));
            }}
          >
            {step < 3 ? W.next : W.createGroup}
          </DialogButton>
        </>
      }
    >
      <StepDots step={step} />
      <h3 className="mt-3 text-center text-[14px] font-bold">{head.title}</h3>
      <p className="mx-auto mt-1 max-w-[340px] text-center text-[11.5px] leading-4 text-[#6b7280]">{step === 2 ? head.help : head.help}</p>

      {step === 1 && (
        <div className="mt-4 flex flex-col gap-3.5">
          <div>
            <p className="mb-1 text-[12px] font-medium">{W.name}</p>
            <TypedBox tl={tl} id="gname" placeholder={W.namePlaceholder} />
          </div>
          <div>
            <p className="mb-1 text-[12px] font-medium">{W.description}</p>
            <TypedBox tl={tl} id="gdesc" placeholder={W.descriptionPlaceholder} tall />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-4">
          <p className="mb-1 text-[12px] font-medium">{W.inbox}</p>
          <div className="relative">
            <button
              data-tl="gr-inbox-select"
              onClick={() => tl.setVar("gMenu", !menu)}
              className={`${FIELD} w-full justify-between ${inbox ? "" : "text-[#6b7280]"} ${menu ? "border-[#7C39ED]" : ""}`}
            >
              {inbox || W.inboxPlaceholder}
              <Icon name="chevronDown" size={13} className="text-[#6b7280]" />
            </button>
            {menu && (
              <div data-tl="gr-inbox-list" className="no-scrollbar tl-pop-in absolute left-0 right-0 top-[44px] z-20 max-h-[170px] overflow-y-auto rounded-lg border border-[#E1E4EE] bg-white p-1 shadow-lg">
                {INBOXES.map((e) => (
                  <div
                    key={e}
                    data-tl={`gr-inbox-${e.split("@")[0]}`}
                    onClick={() => {
                      tl.setVar("gInbox", e);
                      tl.setVar("gMenu", false);
                    }}
                    className="flex h-8 items-center rounded px-3 text-[12.5px] data-[hover=true]:bg-[#F3F4F6]"
                  >
                    {e}
                  </div>
                ))}
              </div>
            )}
          </div>
          {inbox && <p data-tl="gr-inbox-help" className="mt-2 text-[11px] leading-4 text-[#6b7280]">{W.inboxHelp(inbox)}</p>}
        </div>
      )}

      {step === 3 && (
        <div className="mt-4">
          <p className="mb-1.5 text-[12px] font-medium">{W.type}</p>
          <div className="flex flex-col gap-2">
            {W.types.map((t) => (
              <div
                key={t.id}
                data-tl={`gr-type-${t.id.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => tl.setVar("gType", t.id)}
                className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 data-[hover=true]:bg-[#FAFAFB] ${type === t.id ? "border-[#111]" : "border-[#E1E4EE]"}`}
              >
                <span className="leading-4">
                  <b className="block text-[12.5px] font-semibold">{t.id}</b>
                  <span className="text-[10.5px] text-[#6b7280]">{t.help}</span>
                </span>
                <span className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${type === t.id ? "border-[#111]" : "border-[#CBD0DA]"}`}>
                  {type === t.id && <i className="h-2 w-2 rounded-full bg-[#111]" />}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-[1fr_1fr] gap-3">
            <div>
              <p className="mb-1 text-[12px] font-medium">{W.visibility}</p>
              <span className={`${FIELD} justify-between text-[12px]`}>
                {W.visibilityValue}
                <Icon name="chevronDown" size={12} className="text-[#6b7280]" />
              </span>
            </div>
            <div>
              <p className="mb-1 text-[12px] font-medium">{W.quota}</p>
              <span className={`${FIELD} text-[12px] text-[#6b7280]`}>{W.quotaValue}</span>
            </div>
          </div>
        </div>
      )}
    </MDialog>
  );
}

/* ------------------------------------------------------------------ Group page */

export function GroupDetail({ tl }: { tl: Timeline }) {
  const G = GROUP_PAGE;
  const groups = useTimelineVar<Group[]>(tl, "groups", []);
  const gid = useTimelineVar<string>(tl, "gId", "support");
  const users = useTimelineVar<MUser[]>(tl, "mUsers", []);
  const g = groups.find((x) => x.id === gid);
  if (!g) return null;
  const members = g.members.map((id) => users.find((u) => u.id === id)).filter(Boolean) as MUser[];
  const stat = [String(members.length), "0", G.never, "0 GB"];
  const infoValues = [g.type, G.active, g.visibility, G.created, g.email];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button data-tl="gd-back" aria-label={G.back} onClick={() => tl.setVar("gPage", "list")} className="text-[#6b7280]">
            <Icon name="arrowLeft" size={16} />
          </button>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1E8FD] text-[13px] font-semibold text-[#7C3AED]">{initial(g.name)}</span>
          <div className="leading-5">
            <h1 data-tl="gd-title" className="text-[18px] font-bold">
              {g.name}
            </h1>
            <p className="text-[12px] text-[#6b7280]">{g.description}</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <span className={outline}>{G.refresh}</span>
          <span className={outline}>{G.edit}</span>
          <button
            data-tl="btn-add-members"
            onClick={() => {
              tl.setVar("gAddSel", []);
              tl.setVar("mDialog", "addmembers");
            }}
            className="flex h-9 items-center gap-2 rounded-[10px] bg-[#111] px-4 text-[13px] font-medium text-white transition-transform data-[pressed=true]:scale-95"
          >
            <Icon name="userPlus" size={14} />
            {G.addMembers}
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {G.stats.map((l, i) => (
          <div key={l} data-tl={`gd-stat-${i}`} className="flex h-[64px] items-center gap-3 rounded-xl border border-[#F0F0F4] bg-white px-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF3FF] text-[#3B82F6]">
              <Icon name={i === 0 ? "users" : i === 1 ? "fmEmail" : i === 2 ? "clock" : "database"} size={15} />
            </span>
            <div className="leading-4">
              <p className="text-[11px] text-[#6b7280]">{l}</p>
              <p className="text-[14px] font-semibold">{stat[i]}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-5 border-b border-[#E9EAF0] text-[12.5px] font-medium">
        {G.tabs.map((t, i) => (
          <span key={t} className={`border-b-2 pb-2 ${i === 0 ? "border-[#111]" : "border-transparent text-[#6b7280]"}`}>
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div data-tl="gd-info" className="rounded-xl border border-[#F0F0F4] bg-white p-5">
          <h3 className="text-[13px] font-bold">{G.info}</h3>
          <dl className="mt-3 flex flex-col gap-2.5 text-[12px]">
            {G.fields.map((f, i) => (
              <div key={f} className="flex items-center justify-between">
                <dt className="text-[#6b7280]">{f}</dt>
                <dd className={`font-medium ${i === 1 ? "text-[#1B7F4B]" : ""}`}>{infoValues[i]}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div data-tl="gd-recent" className="rounded-xl border border-[#F0F0F4] bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[13px] font-bold">{G.recent}</h3>
            <span className="text-[11px] text-[#6b7280]">{G.viewAll}</span>
          </div>
          <ul className="mt-3 flex flex-col gap-2.5">
            {members.slice(0, 4).map((m) => (
              <li key={m.id} data-tl={`gd-member-${m.id}`} className="tl-fade-in flex items-center gap-2.5 text-[12px]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF3FF] text-[11px] font-semibold text-[#3B82F6]">{initial(m.name)}</span>
                <span className="flex-1 leading-4">
                  <b className="block font-medium">{m.name}</b>
                  <span className="text-[10.5px] text-[#8b909c]">{m.email}</span>
                </span>
                <span className="rounded bg-[#F3F4F6] px-2 py-0.5 text-[10.5px]">{G.member}</span>
              </li>
            ))}
            {members.length === 0 && <li className="py-6 text-center text-[12px] text-[#8b909c]">No members yet</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AddMembersDialog({ tl }: { tl: Timeline }) {
  const G = GROUP_PAGE;
  const open = useTimelineVar<string>(tl, "mDialog", "") === "addmembers";
  const users = useTimelineVar<MUser[]>(tl, "mUsers", []);
  const sel = useTimelineVar<string[]>(tl, "gAddSel", []);
  const close = () => tl.setVar("mDialog", "");
  return (
    <MDialog
      open={open}
      width={420}
      hook="am-dialog"
      scrollId="am-scroll"
      title={G.addTitle}
      subtitle={G.addHelp}
      onClose={close}
      footer={
        <>
          <DialogButton hook="btn-am-cancel" onClick={close}>
            {G.addCancel}
          </DialogButton>
          <DialogButton
            hook="btn-am-add"
            kind="dark"
            disabled={sel.length === 0}
            onClick={() => {
              const groups = tl.getVar<Group[]>("groups", []);
              tl.setVar("groups", groups.map((g) => (g.id === "support" ? { ...g, members: [...g.members, ...sel] } : g)));
              close();
              tl.toast(G.addedToast(sel.length));
            }}
          >
            {G.add(sel.length)}
          </DialogButton>
        </>
      }
    >
      <div data-tl="am-list" className="no-scrollbar mt-1 max-h-[250px] overflow-y-auto rounded-lg border border-[#E1E4EE]">
        {[...GROUP_PAGE.pick.map((id) => users.find((u) => u.id === id)!), ...users.filter((u) => !GROUP_PAGE.pick.includes(u.id))].slice(0, 8).map((u) => {
          const on = sel.includes(u.id);
          return (
            <div
              key={u.id}
              data-tl={`am-user-${u.id}`}
              onClick={() => tl.setVar("gAddSel", on ? sel.filter((i) => i !== u.id) : [...sel, u.id])}
              className="flex items-center gap-2.5 border-b border-[#F0F0F4] px-3 py-2 last:border-0 data-[hover=true]:bg-[#F3F6FF]"
            >
              <Checkbox checked={on} size={14} />
              <span className="text-[12px] leading-4">
                <b className="block font-medium">{u.name}</b>
                <span className="text-[10.5px] text-[#9aa0ab]">{u.email}</span>
              </span>
            </div>
          );
        })}
      </div>
    </MDialog>
  );
}
