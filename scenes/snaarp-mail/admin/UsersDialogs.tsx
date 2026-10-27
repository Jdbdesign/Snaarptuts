"use client";

import { Checkbox } from "@/components/admin/Checkbox";
import { FieldText } from "@/components/admin/TypedField";
import { Icon, type IconName } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ALIASES, BULK_SIGNATURE, BULK_UPLOAD, CSV_ALIASES, CSV_USERS, DOMAIN, SIGNATURE, type MUser } from "./data";
import { DialogButton, MDialog } from "./MDialog";

const BAR: IconName[] = ["edBold", "edItalic", "edUnderline", "edStrike", "edBullets", "edNumbers", "edAlignL", "edAlignC", "edAlignR", "edLink"];
const INPUT =
  "flex min-h-[38px] items-center rounded-lg border border-[#E1E4EE] bg-white px-3 text-[13px] transition-[border-color,box-shadow] duration-150 data-[focus=true]:border-[#2F5BE0] data-[focus=true]:shadow-[0_0_0_3px_rgba(47,91,224,0.14)]";

/** Typed input of the email admin dialogs (the timeline types into `field:<id>`). */
function Input({ tl, id, placeholder, tall }: { tl: Timeline; id: string; placeholder: string; tall?: boolean }) {
  const focused = useTimelineVar<string>(tl, "focus", "") === id;
  return (
    <div data-tl={`field-${id}`} data-focus={focused} onClick={() => tl.setVar("focus", id)} className={`${INPUT} ${tall ? "min-h-[64px] items-start py-2.5" : ""}`}>
      <FieldText tl={tl} id={id} placeholder={placeholder} />
    </div>
  );
}

/** HTML signature editor: a toolbar row, a Size select and a typed text area. */
function EditorBox({ tl, id, placeholder }: { tl: Timeline; id: string; placeholder: string }) {
  const focused = useTimelineVar<string>(tl, "focus", "") === id;
  return (
    <div className="overflow-hidden rounded-lg border border-[#E1E4EE]">
      <div className="flex items-center gap-2.5 border-b border-[#E9EAF0] bg-[#FAFAFB] px-3 py-1.5 text-[#4b5060]">
        {BAR.map((n) => (
          <Icon key={n} name={n} size={13} />
        ))}
        <span className="rounded border border-[#E1E4EE] bg-white px-1.5 text-[10.5px]">{BULK_SIGNATURE.size} ▾</span>
      </div>
      <div data-tl={`field-${id}`} data-focus={focused} onClick={() => tl.setVar("focus", id)} className="flex min-h-[72px] items-start px-3 py-2.5 text-[13px]">
        <FieldText tl={tl} id={id} placeholder={placeholder} />
      </div>
    </div>
  );
}

const closeAll = (tl: Timeline) => {
  tl.setVar("mDialog", "");
  tl.setVar("focus", "");
};

function Tick({ on, label, hook }: { on: boolean; label: string; hook?: string }) {
  return (
    <span data-tl={hook} className="flex items-center gap-2 text-[12.5px]">
      <Checkbox checked={on} size={14} />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ Bulk User Upload */

export function BulkUploadDialog({ tl }: { tl: Timeline }) {
  const B = BULK_UPLOAD;
  const open = useTimelineVar<string>(tl, "mDialog", "") === "bulkupload";
  const file = useTimelineVar<string>(tl, "mFile", "");
  return (
    <MDialog
      open={open}
      width={500}
      hook="bu-dialog"
      scrollId="bu-scroll"
      title={B.title}
      icon="upload"
      subtitle={B.subtitle}
      onClose={() => closeAll(tl)}
      footer={
        <>
          <DialogButton hook="btn-bu-cancel" onClick={() => closeAll(tl)}>
            {B.cancel}
          </DialogButton>
          <DialogButton
            hook="btn-bu-upload"
            kind="purple"
            disabled={!file}
            onClick={() => {
              tl.setVar("mUsers", [...CSV_USERS, ...tl.getVar<MUser[]>("mUsers", [])].sort((a, b) => a.name.localeCompare(b.name)));
              tl.setVar("mFile", "");
              closeAll(tl);
              tl.toast(B.done(CSV_USERS.length));
            }}
          >
            <Icon name="upload" size={13} />
            {B.upload}
          </DialogButton>
        </>
      }
    >
      <div className="flex justify-end">
        <button
          data-tl="btn-bu-template"
          onClick={() => tl.toast(B.templateToast)}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-[#E1E4EE] px-3 text-[12px] font-medium transition-transform data-[pressed=true]:scale-95"
        >
          <Icon name="download" size={13} />
          {B.template}
        </button>
      </div>
      <div className="mt-2 rounded-xl border border-dashed border-[#D5D8E2] px-6 py-7 text-center">
        <Icon name="upload" size={26} className="mx-auto text-[#8b909c]" />
        <p className="mt-2 text-[12.5px] text-[#6b7280]">{file ? `${file} · ${B.fileInfo(CSV_USERS.length)}` : B.drop}</p>
        <button
          data-tl="btn-bu-browse"
          onClick={() => tl.setVar("mFile", B.file)}
          className="mt-3 h-8 rounded-lg border border-[#2F5BE0] px-4 text-[12px] font-medium text-[#2F5BE0] transition-transform data-[pressed=true]:scale-95"
        >
          {B.browse}
        </button>
      </div>

      <h3 className="mt-5 text-[13px] font-bold">{B.formatTitle}</h3>
      <div className="mt-2 rounded-xl bg-[#FAFAFB] px-4 py-3.5">
        <p className="text-[12px] text-[#4b5060]">{B.formatIntro}</p>
        <ul className="mt-2 flex flex-col gap-2">
          {B.columns.map((c) => (
            <li key={c.name} className="text-[12px]">
              <b className="font-semibold">{c.name}</b>
              <span className="ml-1.5 rounded bg-[#FDECEC] px-1.5 py-px text-[9.5px] font-medium text-[#D1343B]">{B.required}</span>
              <p className="text-[#6b7280]">{c.help}</p>
              <p className="font-mono text-[10.5px] text-[#9aa0ab]">{c.example}</p>
            </li>
          ))}
        </ul>
      </div>
      <div data-tl="bu-notes" className="mt-3 rounded-xl bg-[#E8F0FE] px-4 py-3 text-[11.5px] text-[#2549B8]">
        <b>{B.notesTitle}</b>
        <ul className="mt-1 list-disc pl-4">
          {B.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
      <p className="mt-3 rounded-xl bg-[#E6F7EC] px-4 py-2.5 text-[11.5px] text-[#1B7F4B]">{B.tip}</p>
    </MDialog>
  );
}

/* ------------------------------------------------------------------ Bulk Signature */

export function BulkSignatureDialog({ tl }: { tl: Timeline }) {
  const B = BULK_SIGNATURE;
  const open = useTimelineVar<string>(tl, "mDialog", "") === "bulksig";
  const users = useTimelineVar<MUser[]>(tl, "mUsers", []);
  const sel = useTimelineVar<string[]>(tl, "sigSel", []);
  const apply = useTimelineVar<boolean[]>(tl, "sigApply", [true, true, false]);
  const all = sel.length === users.length;

  return (
    <MDialog
      open={open}
      width={600}
      hook="bs-dialog"
      scrollId="bs-scroll"
      title={B.title}
      subtitle={B.subtitle}
      onClose={() => closeAll(tl)}
      footer={
        <>
          <DialogButton hook="btn-bs-cancel" onClick={() => closeAll(tl)}>
            {B.cancel}
          </DialogButton>
          <DialogButton
            hook="btn-bs-apply"
            kind="dark"
            disabled={sel.length === 0}
            onClick={() => {
              const text = tl.getVar<string>("field:sig-bulk", "");
              tl.setVar("mUsers", users.map((u) => (sel.includes(u.id) ? { ...u, signature: text } : u)));
              closeAll(tl);
              tl.toast(B.toast(sel.length));
            }}
          >
            {B.applyTo(sel.length)}
          </DialogButton>
        </>
      }
    >
      <div className="grid grid-cols-[210px_1fr] gap-5 pt-2">
        <div>
          <div className="flex items-center justify-between text-[12px] font-semibold">
            {B.select(sel.length, users.length)}
            <button
              data-tl="bs-toggle-all"
              onClick={() => tl.setVar("sigSel", all ? [] : users.map((u) => u.id))}
              className="text-[11px] font-medium text-[#2F5BE0]"
            >
              {all ? B.deselectAll : B.selectAll}
            </button>
          </div>
          <div data-tl="bs-users" className="no-scrollbar mt-2 h-[220px] overflow-y-auto rounded-lg border border-[#E1E4EE]">
            {users.map((u) => {
              const on = sel.includes(u.id);
              return (
                <div
                  key={u.id}
                  data-tl={`bs-user-${u.id}`}
                  onClick={() => tl.setVar("sigSel", on ? sel.filter((id) => id !== u.id) : [...sel, u.id])}
                  className="flex items-center gap-2.5 px-3 py-1.5 data-[hover=true]:bg-[#F3F6FF]"
                >
                  <Checkbox checked={on} size={14} />
                  <span className="min-w-0 text-[12px] leading-4">
                    <b className="block truncate font-medium">{u.name}</b>
                    <span className="block truncate text-[10.5px] text-[#9aa0ab]">{u.email}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-[12px] font-semibold">{B.signature}</p>
          <div className="mt-2">
            <EditorBox tl={tl} id="sig-bulk" placeholder={B.placeholder} />
          </div>
          <p className="mt-2.5 flex items-center gap-1.5 text-[11.5px] text-[#4b5060]">
            <Icon name="edImage" size={12} />
            {B.insertImage}
          </p>
          <p className="mt-2.5 text-[12px] font-semibold">{B.mobile}</p>
          <div className="mt-1.5">
            <Input tl={tl} id="sig-bulk-mobile" placeholder={B.mobilePlaceholder} />
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            {B.apply.map((l, i) => (
              <span key={l} onClick={() => tl.setVar("sigApply", apply.map((v, j) => (j === i ? !v : v)))}>
                <Tick on={apply[i]} label={l} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </MDialog>
  );
}

/* ------------------------------------------------------------------ Manage Aliases */

export function AliasesDialog({ tl }: { tl: Timeline }) {
  const A = ALIASES;
  const open = useTimelineVar<string>(tl, "mDialog", "") === "aliases";
  const users = useTimelineVar<MUser[]>(tl, "mUsers", []);
  const target = useTimelineVar<string>(tl, "mTarget", "");
  const tab = useTimelineVar<string>(tl, "aliasTab", "list");
  const aliasFile = useTimelineVar<string>(tl, "aliasFile", "");
  const typed = useTimelineVar<string>(tl, "field:alias-name", "");
  const user = users.find((u) => u.id === target);
  const aliases = user?.aliases ?? [];
  const setTab = (t: string) => tl.setVar("aliasTab", t);
  const patch = (list: MUser[]) => tl.setVar("mUsers", list);

  const tabBtn = (id: string, label: string, hook: string, icon?: IconName) => (
    <button
      key={id}
      data-tl={hook}
      onClick={() => setTab(id)}
      className={`flex h-9 items-center gap-1.5 border-b-2 px-3 text-[12px] font-medium ${tab === id ? "border-[#111] text-ink" : "border-transparent text-[#6b7280]"}`}
    >
      {icon && <Icon name={icon} size={12} />}
      {label}
    </button>
  );

  return (
    <MDialog
      open={open}
      width={540}
      hook="al-dialog"
      scrollId="al-scroll"
      title={A.title(user?.name ?? "")}
      icon="fmEmail"
      subtitle={user?.email}
      onClose={() => closeAll(tl)}
      footer={
        tab === "add" ? (
          <>
            <DialogButton hook="btn-al-back" className="flex-1" onClick={() => setTab("list")}>
              {A.back}
            </DialogButton>
            <DialogButton
              hook="btn-al-add"
              kind="dark"
              className="flex-1"
              disabled={!typed}
              onClick={() => {
                patch(users.map((u) => (u.id === target ? { ...u, aliases: [...u.aliases, `${typed}@${DOMAIN}`] } : u)));
                tl.setVar("field:alias-name", "");
                tl.setVar("focus", "");
                setTab("list");
                tl.toast(A.addedToast(`${typed}@${DOMAIN}`));
              }}
            >
              {A.add}
            </DialogButton>
          </>
        ) : tab === "bulk" ? (
          <>
            <DialogButton hook="btn-al-cancel" onClick={() => setTab("list")}>
              {A.bulk.cancel}
            </DialogButton>
            <DialogButton
              hook="btn-al-process"
              kind="dark"
              disabled={!aliasFile}
              onClick={() => {
                patch(users.map((u) => ({ ...u, aliases: [...u.aliases, ...CSV_ALIASES.filter((c) => c.userId === u.id).map((c) => `${c.alias}@${DOMAIN}`)] })));
                tl.setVar("aliasFile", "");
                closeAll(tl);
                tl.toast(A.bulk.toast(CSV_ALIASES.length));
              }}
            >
              {A.bulk.process}
            </DialogButton>
          </>
        ) : undefined
      }
    >
      <div className="-mx-6 flex border-b border-[#E9EAF0] px-6">
        {tabBtn("list", A.tabs.list(aliases.length), "al-tab-list")}
        {tabBtn("add", A.tabs.add, "al-tab-add", "plus")}
        {tabBtn("bulk", A.tabs.bulk, "al-tab-bulk", "upload")}
      </div>

      {tab === "list" && (
        <div className="pt-3">
          <div className="flex items-center justify-between text-[11.5px] text-[#6b7280]">
            {A.configured(aliases.length)}
            <span className="flex h-7 items-center gap-1.5 rounded-lg border border-[#E1E4EE] px-2.5 text-[#2a2d36]">
              <Icon name="refresh" size={12} />
              {A.refresh}
            </span>
          </div>
          {aliases.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-[12px] text-[#8b909c]">
              <Icon name="fmEmail" size={30} className="text-[#C9CDD6]" />
              {A.empty}
              <button
                data-tl="btn-al-first"
                onClick={() => setTab("add")}
                className="flex h-8 items-center gap-1.5 rounded-lg border border-[#E1E4EE] px-3 text-[12px] font-medium text-ink transition-transform data-[pressed=true]:scale-95"
              >
                <Icon name="plus" size={12} />
                {A.addFirst}
              </button>
            </div>
          ) : (
            <div data-tl="al-list" className="mt-3 rounded-lg border border-[#E9EAF0]">
              <p className="flex items-center gap-2 border-b border-[#E9EAF0] px-3 py-2 text-[10px] font-semibold tracking-[0.08em] text-[#6b7280]">
                <Checkbox checked={false} size={13} />
                {A.selectAll}
              </p>
              {aliases.map((a) => (
                <div key={a} data-tl={`al-row-${a.split("@")[0]}`} className="flex items-center gap-2.5 px-3 py-2.5 text-[12px] tl-fade-in">
                  <Checkbox checked={false} size={13} />
                  <span className="flex-1 font-mono">{a}</span>
                  <Icon name="trash" size={14} className="text-[#E5484D]" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "add" && (
        <div className="pt-4">
          <p className="mb-1.5 text-[12px] font-medium">{A.label}</p>
          <div className="flex gap-2">
            <div className="min-w-0 flex-1">
              <Input tl={tl} id="alias-name" placeholder={A.placeholder} />
            </div>
            <span data-tl="al-domain" className={`${INPUT} w-[170px] justify-between`}>
              @{DOMAIN}
              <Icon name="chevronDown" size={13} className="text-[#6b7280]" />
            </span>
          </div>
        </div>
      )}

      {tab === "bulk" && (
        <div className="pt-4">
          <div data-tl="al-howto" className="rounded-lg bg-[#E8F0FE] px-4 py-3 text-[11.5px] text-[#2549B8]">
            <b className="flex items-center gap-1.5">
              <Icon name="fmInfo" size={13} />
              {A.bulk.howTitle}
            </b>
            <ol className="mt-1.5 flex flex-col gap-0.5 pl-5">
              {A.bulk.steps.map((s) => (
                <li key={s} className="list-none">
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <button
            data-tl="btn-al-template"
            onClick={() => tl.toast("Template downloaded: acme-aliases-template.csv")}
            className="mt-3 flex h-9 items-center gap-2 rounded-lg border border-[#2F5BE0] px-3.5 text-[12px] font-medium text-[#2F5BE0] transition-transform data-[pressed=true]:scale-95"
          >
            <Icon name="download" size={13} />
            {A.bulk.template}
          </button>
          <p className="mt-4 text-[12px] font-medium">{A.bulk.uploadLabel}</p>
          <button
            data-tl="btn-al-choose"
            onClick={() => tl.setVar("aliasFile", A.bulk.file)}
            className="mt-1.5 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#D5D8E2] text-[12px] text-[#6b7280] transition-transform data-[pressed=true]:scale-[0.99]"
          >
            <Icon name="upload" size={13} />
            {aliasFile || A.bulk.choose}
          </button>
        </div>
      )}
    </MDialog>
  );
}

/* ------------------------------------------------------------------ Manage Signature */

export function SignatureDialog({ tl }: { tl: Timeline }) {
  const S = SIGNATURE;
  const open = useTimelineVar<string>(tl, "mDialog", "") === "signature";
  const users = useTimelineVar<MUser[]>(tl, "mUsers", []);
  const target = useTimelineVar<string>(tl, "mTarget", "");
  const typed = useTimelineVar<string>(tl, "field:sig-one", "");
  const apply = useTimelineVar<boolean[]>(tl, "sigOneApply", [true, true, false]);
  const user = users.find((u) => u.id === target);

  return (
    <MDialog
      open={open}
      width={520}
      hook="sg-dialog"
      scrollId="sg-scroll"
      title={S.title}
      subtitle={user ? S.subtitle(user.name, user.email) : ""}
      onClose={() => closeAll(tl)}
      footer={
        <>
          <button data-tl="btn-sg-clear" onClick={() => tl.setVar("field:sig-one", "")} className="mr-auto text-[12px] text-[#6b7280]">
            {S.clear}
          </button>
          <DialogButton hook="btn-sg-cancel" onClick={() => closeAll(tl)}>
            {S.cancel}
          </DialogButton>
          <DialogButton
            hook="btn-sg-save"
            kind="dark"
            onClick={() => {
              tl.setVar("mUsers", users.map((u) => (u.id === target ? { ...u, signature: typed } : u)));
              closeAll(tl);
              tl.toast(S.toast);
            }}
          >
            {S.save}
          </DialogButton>
        </>
      }
    >
      <p className="mt-2 text-[12px] font-semibold">{S.html}</p>
      <div className="mt-1.5">
        <EditorBox tl={tl} id="sig-one" placeholder={S.placeholder} />
      </div>
      <p className="mt-2.5 flex items-center gap-1.5 text-[11.5px] text-[#4b5060]">
        <Icon name="edImage" size={12} />
        {S.insertImage}
      </p>
      <p className="mt-3 text-[12px] font-semibold">{S.mobile}</p>
      <div className="mt-1.5">
        <Input tl={tl} id="sig-one-mobile" placeholder={S.mobilePlaceholder} tall />
      </div>
      <p className="mt-3 text-[12px] font-semibold">{S.applyTo}</p>
      <div className="mt-1.5 flex flex-col gap-1.5">
        {S.apply.map((l, i) => (
          <span key={l} onClick={() => tl.setVar("sigOneApply", apply.map((v, j) => (j === i ? !v : v)))}>
            <Tick on={apply[i]} label={l} />
          </span>
        ))}
      </div>
      <p className="mt-3 text-[12px] font-semibold">{S.preview}</p>
      <div data-tl="sg-preview" className="mt-1.5 min-h-[44px] rounded-lg border border-[#E9EAF0] bg-[#FAFAFB] px-3 py-2.5 text-[12px] text-[#9aa0ab]">
        {typed ? <span className="text-ink">{typed}</span> : S.none}
      </div>
    </MDialog>
  );
}
