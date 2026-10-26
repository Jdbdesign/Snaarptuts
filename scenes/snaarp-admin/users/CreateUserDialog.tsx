"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { FieldText } from "@/components/admin/TypedField";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { COPY, DEFAULT_DEPARTMENT, DEPARTMENTS, DIALOG_ROLES, NEW_USER, PASSWORD_RULES } from "../admin-data";
import { AdminDialog } from "./AdminDialog";
import { showAdminToast } from "./AdminToast";

const C = COPY.create;
const FIELD =
  "flex h-[42px] items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3.5 text-[14px] text-ink transition-[border-color,box-shadow] duration-150 data-[focus=true]:border-[#7C39ED] data-[focus=true]:shadow-[0_0_0_3px_rgba(124,57,237,0.14)]";

function Labeled({ label, optional, children }: { label: string; optional?: boolean; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-[13px] font-semibold">
        {label} {optional && <span className="font-normal text-[#9aa0ab]">{C.optional}</span>}
      </p>
      {children}
    </div>
  );
}

/** A text input the timeline types into (scene variable `field:<id>`; click it to focus). */
function Field({ tl, id, placeholder, mask }: { tl: Timeline; id: string; placeholder: string; mask?: boolean }) {
  const focused = useTimelineVar(tl, "focus", "") === id;
  return (
    <div
      data-tl={`field-${id}`}
      data-focus={focused}
      onClick={(e) => {
        e.stopPropagation();
        tl.setVar("focus", id);
        tl.setVar("selectOpen", "");
      }}
      className={FIELD}
    >
      <FieldText tl={tl} id={id} placeholder={placeholder} mask={mask} />
    </div>
  );
}

/** A native-looking select drawn by hand: the box, and a white list under it while open. */
function Select({
  tl,
  id,
  value,
  options,
  onPick,
}: {
  tl: Timeline;
  id: "dept" | "role";
  value: string;
  options: string[];
  onPick: (value: string) => void;
}) {
  const open = useTimelineVar<string>(tl, "selectOpen", "") === id;
  return (
    <div className="relative">
      <div
        data-tl={`select-${id}`}
        onClick={(e) => {
          e.stopPropagation();
          tl.setVar("focus", "");
          tl.setVar("selectOpen", open ? "" : id);
        }}
        className={`${FIELD} justify-between ${open ? "border-[#7C39ED] shadow-[0_0_0_3px_rgba(124,57,237,0.14)]" : ""} ${
          value === DEFAULT_DEPARTMENT ? "text-[#4b5060]" : ""
        }`}
      >
        {value}
        <Icon name="chevronDown" size={15} className="text-[#6b7280]" />
      </div>
      <ul
        role="listbox"
        className={`absolute left-0 right-0 top-[46px] z-20 rounded-xl border border-[#EEEEF2] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(17,17,17,0.25)] ${
          open ? "tl-pop-in" : "hidden"
        }`}
      >
        {options.map((o) => (
          <li
            key={o}
            role="option"
            aria-selected={o === value}
            data-tl={`opt-${id}-${o.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={(e) => {
              e.stopPropagation();
              onPick(o);
              tl.setVar("selectOpen", "");
            }}
            className={`flex h-9 items-center justify-between rounded-lg px-3 text-[13.5px] transition-colors data-[hover=true]:bg-[#F4ECFF] ${
              o === value ? "font-semibold text-brand" : "text-[#2a2d36]"
            }`}
          >
            {o}
            {o === value && <Icon name="check" size={14} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Create user dialog (Admin Panel > Users > Create user). It reads the scene variables `dialog`, `selectOpen`,
 * `dept`, `dialogRole` and the typed fields email, first, last, username, job, employee, password.
 */
export function CreateUserDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "create";
  const dept = useTimelineVar(tl, "dept", DEFAULT_DEPARTMENT);
  const role = useTimelineVar(tl, "dialogRole", NEW_USER.role);
  const password = useTimelineVar(tl, "field:password", "");
  const email = useTimelineVar(tl, "field:email", "");

  const close = () => {
    tl.setVar("dialog", "");
    tl.setVar("selectOpen", "");
    tl.setVar("focus", "");
  };

  return (
    <AdminDialog
      open={open}
      width={520}
      title={C.title}
      hook="create-dialog"
      scrollId="create-scroll"
      closeHook="btn-close-create"
      onClose={close}
      onBodyClick={() => tl.setVar("selectOpen", "")}
      footer={
        <>
          <button
            data-tl="btn-cancel-create"
            onClick={close}
            className="h-[38px] rounded-full border border-[#E5E7EB] bg-white px-5 text-[13.5px] font-medium text-[#2a2d36]"
          >
            {C.cancel}
          </button>
          <button
            data-tl="btn-submit-create"
            onClick={() => {
              close();
              tl.setVar("created", true);
              showAdminToast(tl, C.toast(email || NEW_USER.email));
            }}
            className="h-[38px] rounded-full bg-brand px-5 text-[13.5px] font-semibold text-white transition-transform data-[pressed=true]:scale-95"
          >
            {C.submit}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4 pt-1">
        <Labeled label={C.email}>
          <Field tl={tl} id="email" placeholder={C.emailPlaceholder} />
        </Labeled>
        <div className="grid grid-cols-2 gap-4">
          <Labeled label={C.first}>
            <Field tl={tl} id="first" placeholder={C.firstPlaceholder} />
          </Labeled>
          <Labeled label={C.last} optional>
            <Field tl={tl} id="last" placeholder={C.lastPlaceholder} />
          </Labeled>
        </div>
        <Labeled label={C.username} optional>
          <Field tl={tl} id="username" placeholder={C.usernamePlaceholder} />
        </Labeled>
        <div className="grid grid-cols-2 gap-4">
          <Labeled label={C.job} optional>
            <Field tl={tl} id="job" placeholder={C.jobPlaceholder} />
          </Labeled>
          <Labeled label={C.department} optional>
            <Select tl={tl} id="dept" value={dept} options={DEPARTMENTS} onPick={(v) => tl.setVar("dept", v)} />
          </Labeled>
        </div>
        <Labeled label={C.employee} optional>
          <Field tl={tl} id="employee" placeholder={C.employeePlaceholder} />
        </Labeled>
        <Labeled label={C.role}>
          <Select tl={tl} id="role" value={role} options={DIALOG_ROLES} onPick={(v) => tl.setVar("dialogRole", v)} />
        </Labeled>
        <Labeled label={C.password}>
          <Field tl={tl} id="password" placeholder={C.passwordPlaceholder} mask />
          <p data-tl="password-hint" className="mt-1.5 text-[12px] leading-4 text-[#6b7280]">
            {C.passwordHint}
          </p>
          <ul
            data-tl="password-rules"
            className={`mt-2 flex flex-col gap-1 overflow-hidden transition-[max-height,opacity] duration-300 ${
              password ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {PASSWORD_RULES.map((r) => (
              <li
                key={r.id}
                data-tl={`rule-${r.id}`}
                className={`flex items-center gap-2 text-[12px] transition-colors duration-200 ${
                  r.test(password) ? "text-[#1B9A55]" : "text-[#9aa0ab]"
                }`}
              >
                <i className={`h-2 w-2 rounded-full transition-colors duration-200 ${r.test(password) ? "bg-[#22C55E]" : "bg-[#D5D8DF]"}`} />
                {r.label}
              </li>
            ))}
          </ul>
        </Labeled>
      </div>
    </AdminDialog>
  );
}
