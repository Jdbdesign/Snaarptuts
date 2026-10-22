"use client";

import type { ReactNode } from "react";
import { Checkbox } from "@/components/admin/Checkbox";
import { Chip } from "@/components/admin/Chip";
import { CopyActionButton } from "@/components/admin/CopyActionButton";
import { Modal } from "@/components/admin/Modal";
import { Radio } from "@/components/admin/Radio";
import { FieldText, TypedField } from "@/components/admin/TypedField";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { emailSuggestions, NEW_USER as DEFAULT_USER } from "./step5-data";

const BLUE = "#2F5BE0";

/**
 * Screen B: the "Add New User" dialog. It scrolls inside itself.
 * Scene variables it reads: modal, chips, generated, creating, and the typed fields
 * first, last, emailName, recovery.
 */
export function AddUserModal({ tl, user = DEFAULT_USER }: { tl: Timeline; /** Whose details and domain to show (defaults to the 360 sample user). */ user?: typeof DEFAULT_USER }) {
  const open = useTimelineVar(tl, "modal", false);
  const first = useTimelineVar(tl, "field:first", "");
  const last = useTimelineVar(tl, "field:last", "");
  const emailName = useTimelineVar(tl, "field:emailName", "");
  const chips = useTimelineVar(tl, "chips", false);
  const generated = useTimelineVar(tl, "generated", false);
  const creating = useTimelineVar(tl, "creating", false);

  const email = emailName ? `${emailName}@${user.domain}` : "";
  const fullName = `${first} ${last}`.trim();

  return (
    <Modal open={open} width={740} scrollId="user-modal-scroll" maxHeight={780}>
      <div className="px-7 pb-7 pt-7">
        <div className="flex items-start justify-between">
          <h2 className="text-[22px] font-bold leading-7">Add New User</h2>
          <Icon name="x" size={18} className="mt-1 text-[#6b7280]" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <Labeled label="First Name*">
            <TypedField tl={tl} id="first" placeholder="John" tintWhenFilled className="h-[42px]" />
          </Labeled>
          <Labeled label="Last Name*">
            <TypedField tl={tl} id="last" placeholder="Doe" tintWhenFilled className="h-[42px]" />
          </Labeled>
        </div>

        <div className="mt-5">
          <Label>Primary Email*</Label>
          <div className="mt-2 flex h-[42px] overflow-hidden rounded-lg border border-[#E1E4EE] bg-white text-[14px]">
            <div
              data-tl="field-emailName"
              className={`flex min-w-0 flex-1 items-center px-3.5 transition-colors duration-200 ${emailName ? "bg-[#EAF1FE]" : ""}`}
            >
              <FieldText tl={tl} id="emailName" placeholder="alma.lawson" />
            </div>
            <div
              data-tl="select-domain"
              className="flex w-[230px] shrink-0 items-center justify-between border-l border-[#E1E4EE] bg-[#FAFAFB] px-3.5"
            >
              @{user.domain}
              <Icon name="chevronDown" size={15} className="text-[#6b7280]" />
            </div>
          </div>
          <div className={`mt-2.5 flex flex-wrap gap-2 transition-opacity duration-300 ${chips ? "opacity-100" : "opacity-0"}`}>
            {emailSuggestions(first, last).map((name, i) => (
              <Chip key={name} id={String(i)} onClick={() => tl.setVar("field:emailName", name)}>
                {name}
              </Chip>
            ))}
          </div>
          <p className={`mt-2.5 text-[12px] leading-4 text-[#6b7280] ${email ? "" : "invisible"}`}>
            Preview: {email || "-"}
          </p>
        </div>

        <div className="mt-5">
          <Label>Department</Label>
          <div className="mt-2 flex h-[42px] items-center justify-between rounded-lg border border-[#E1E4EE] bg-white px-3.5 text-[14px] text-[#9aa0ab]">
            Select department
            <Icon name="chevronDown" size={15} className="text-[#6b7280]" />
          </div>
        </div>

        <div className="mt-5">
          <Label>Recovery Email</Label>
          <TypedField
            tl={tl}
            id="recovery"
            placeholder="recovery@example.com"
            tintWhenFilled
            className="mt-2 h-[42px]"
          />
        </div>

        <h3 className="mt-7 text-[15px] font-bold">Welcome Email Settings</h3>
        <div data-tl="welcome-options" className="mt-3 flex flex-col gap-2.5 rounded-lg">
          <CheckRow checked>Send welcome email with setup instructions</CheckRow>
          <CheckRow checked>Require password change on first login</CheckRow>
        </div>

        <h3 className="mt-7 text-[15px] font-bold">Password</h3>
        <div className="mt-3 flex flex-col gap-2.5 text-[13.5px]">
          <span className="flex items-center gap-2.5">
            <Radio selected />
            Automatically generate a password
          </span>
          <span className="flex items-center gap-2.5 text-[#4b5060]">
            <Radio selected={false} />
            Create password
          </span>
        </div>

        <div className="mt-4 rounded-lg border border-[#E6E6EC] bg-[#FAFAFB] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium">Generated Password</span>
            <span className="flex items-center gap-1.5 text-[12.5px] font-medium" style={{ color: BLUE }}>
              <Icon name="refresh" size={13} />
              Regenerate
            </span>
          </div>
          <div className="mt-2.5 flex gap-2.5">
            <div className="flex h-[38px] flex-1 items-center rounded-lg border border-[#E1E4EE] bg-white px-3.5 font-mono text-[13.5px]">
              <span className={`transition-opacity duration-500 ${generated ? "opacity-100" : "opacity-0"}`}>
                {user.password}
              </span>
            </div>
            <CopyActionButton id="copy-password" onClick={() => tl.toast("Password copied to clipboard")} />
          </div>
          <p className="mt-2.5 text-[11.5px] leading-4 text-[#6b7280]">
            Save this password securely. It will be used for email client login.
          </p>
        </div>

        <div
          data-tl="credentials"
          className={`mt-4 rounded-lg border border-[#E6E6EC] bg-[#FAFAFB] p-4 transition-opacity duration-500 ${
            generated ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-[0.08em] text-[#6b7280]">CREDENTIALS</span>
            <span className="flex items-center gap-1.5 text-[12.5px] font-medium" style={{ color: BLUE }}>
              <Icon name="copy" size={13} />
              Copy all
            </span>
          </div>
          <dl className="mt-3 grid grid-cols-[70px_1fr] gap-y-2 text-[13px]">
            <dt className="text-[#8b909c]">Name</dt>
            <dd className="font-medium text-ink">{fullName}</dd>
            <dt className="text-[#8b909c]">Email</dt>
            <dd className="font-medium text-ink">{email}</dd>
            <dt className="text-[#8b909c]">Password</dt>
            <dd className="font-mono font-medium text-ink">{user.password}</dd>
          </dl>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            className={`h-[44px] flex-1 rounded-lg border border-[#E1E4EE] bg-white text-[14px] font-medium transition-opacity duration-200 ${
              creating ? "opacity-50" : ""
            }`}
          >
            Back
          </button>
          <button
            data-tl="btn-create-user"
            className={`flex h-[44px] flex-1 items-center justify-center gap-2 rounded-lg text-[14px] font-medium text-white transition-[background,transform] duration-200 data-[pressed=true]:scale-[0.98] ${
              creating ? "bg-[#6B7080]" : "bg-[#0E1220]"
            }`}
          >
            {creating && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {creating ? "Creating..." : "Create User"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <label className="block text-[13.5px] font-medium leading-5">{children}</label>;
}

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function CheckRow({ checked, children }: { checked: boolean; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2.5 text-[13.5px]">
      <Checkbox checked={checked} />
      {children}
    </span>
  );
}
