"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BlueButton, CloseX, FieldLabel, ShDialog, ShField, TextButton, Tick } from "./parts";
import { COPY_DIALOG, EMAIL_DIALOG, SHARE_DIALOG } from "./sheets-data";

/**
 * File > Make a copy ("Copy document"). Fields: `copy-name` (prefilled "Copy of <title>"). Scene variables: `copySame`, `copyComments`.
 * Hooks: copy-dialog, field-copy-name, copy-folder, copy-same, copy-comments, copy-resolved, copy-cancel, copy-make, copy-close.
 */
export function CopyDialog({ tl, title }: { tl: Timeline; title: string }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "copy";
  const same = useTimelineVar(tl, "copySame", false);
  const comments = useTimelineVar(tl, "copyComments", false);
  const D = COPY_DIALOG;
  return (
    <ShDialog open={open} width={412} hook="copy-dialog">
      <div className="flex items-center justify-between px-[20px] pt-[20px]">
        <h2 className="text-[16.5px] font-medium text-[#1f2430]">{D.title}</h2>
        <CloseX id="copy" />
      </div>
      <div className="px-[20px] pb-[18px] pt-[16px]">
        <FieldLabel>{D.name}</FieldLabel>
        <ShField tl={tl} id="copy-name" placeholder={D.name} initial={D.copyOf(title)} />
        <p className="mb-[7px] mt-[16px] text-[12px] font-medium text-[#5F6368]">{D.folder}</p>
        <span data-tl="copy-folder" className="inline-flex h-[34px] items-center gap-[8px] rounded-full border border-[#DADCE0] px-[14px] text-[13px] text-[#1f2430]">
          <Icon name="shFolderOutline" size={15} className="text-[#5F6368]" />
          {D.drive}
        </span>
        <div className="mt-[20px] flex flex-col gap-[13px] text-[13px] text-[#1f2430]">
          <span data-tl="copy-same" className="flex items-center gap-[10px]"><Tick on={same} />{D.sameShare}</span>
          <span data-tl="copy-comments" className="flex items-center gap-[10px]"><Tick on={comments} />{D.comments}</span>
          <span data-tl="copy-resolved" className={`ml-[26px] flex items-center gap-[10px] transition-colors ${comments ? "" : "text-[#A9ADB8]"}`}><Tick on={false} disabled={!comments} />{D.resolved}</span>
        </div>
        <div className="mt-[22px] flex items-center justify-end gap-[8px] border-t border-[#EEF0F3] pt-[16px]">
          <TextButton hook="copy-cancel">{D.cancel}</TextButton>
          <BlueButton hook="copy-make">{D.make}</BlueButton>
        </div>
      </div>
    </ShDialog>
  );
}

/**
 * File > Share ("Share <title>"). Field `share-add`. Scene variables: `shareSuggest` (the person suggestion under the box), `sharePeople`
 * (people added), `shareAccess` (restricted | anyone), `shareMenu` (the access list is open), `shareView` (main | settings), `shareCopied`.
 * Hooks: share-dialog, share-help, share-gear, field-share-add, share-suggestion, share-row-<id>, share-access, share-option-<id>,
 * share-copy-link, share-done, share-back, share-set-editors, share-set-download-editors, share-set-download-viewers.
 */
export function ShareDialog({ tl, title }: { tl: Timeline; title: string }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "share";
  const suggest = useTimelineVar(tl, "shareSuggest", false);
  const people = useTimelineVar<string[]>(tl, "sharePeople", NONE);
  const access = useTimelineVar<string>(tl, "shareAccess", "restricted");
  const menu = useTimelineVar(tl, "shareMenu", false);
  const view = useTimelineVar<string>(tl, "shareView", "main");
  const copied = useTimelineVar(tl, "shareCopied", false);
  const setEditors = useTimelineVar(tl, "shareSetEditors", true);
  const dlEditors = useTimelineVar(tl, "shareDlEditors", true);
  const dlViewers = useTimelineVar(tl, "shareDlViewers", true);
  const D = SHARE_DIALOG;
  const acc = access === "anyone" ? D.anyone : D.restricted;
  return (
    <ShDialog open={open} width={445} hook="share-dialog">
      {view === "settings" ? (
        <div className="px-[20px] pb-[22px] pt-[20px]">
          <h2 className="flex items-center gap-[10px] text-[15.5px] font-medium text-[#1f2430]">
            <span data-tl="share-back" className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] text-[#4b5060] data-[hover=true]:bg-[#F1F3F4]"><Icon name="arrowLeft" size={15} /></span>
            <span className="truncate">{D.settings.title(title)}</span>
          </h2>
          <p className="mb-[8px] mt-[18px] text-[12.5px] font-medium text-[#5F6368]">{D.settings.access}</p>
          <span data-tl="share-set-editors" className="flex items-center gap-[10px] text-[13px] text-[#1f2430]"><Tick on={setEditors} />{D.settings.editorsChange}</span>
          <p className="ml-[26px] mt-[3px] text-[11.5px] text-[#2563EB]">{D.settings.learn}</p>
          <p className="mb-[8px] mt-[18px] text-[12.5px] font-medium text-[#5F6368]">{D.settings.download}</p>
          <div className="flex flex-col gap-[11px] text-[13px] text-[#1f2430]">
            <span data-tl="share-set-download-editors" className="flex items-center gap-[10px]"><Tick on={dlEditors} />{D.settings.editors}</span>
            <span data-tl="share-set-download-viewers" className="flex items-center gap-[10px]"><Tick on={dlViewers} />{D.settings.viewers}</span>
          </div>
        </div>
      ) : (
        <div className="px-[20px] pb-[18px] pt-[20px]">
          <div className="flex items-center justify-between">
            <h2 className="truncate text-[16px] font-medium text-[#1f2430]">{D.title(title)}</h2>
            <span className="flex items-center gap-[2px] text-[#5F6368]">
              <span data-tl="share-help" className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] data-[hover=true]:bg-[#F1F3F4]"><Icon name="shHelp" size={16} /></span>
              <span data-tl="share-gear" className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] data-[hover=true]:bg-[#F1F3F4]"><Icon name="shGear" size={16} /></span>
            </span>
          </div>
          <div className="relative mt-[12px]">
            <ShField tl={tl} id="share-add" placeholder={D.add} className="!h-[36px]" />
            <div
              data-tl="share-suggestion"
              className={`absolute left-0 right-0 top-[40px] z-10 flex items-center gap-[10px] rounded-[10px] border border-[#E3E5EA] bg-white px-[12px] py-[8px] shadow-[0_10px_28px_-8px_rgba(17,24,39,0.3)] transition-[opacity,background] duration-150 data-[hover=true]:bg-[#F3F6FD] motion-reduce:transition-none ${
                suggest ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Avatar name={D.person.name} />
              <span className="leading-[17px]">
                <span className="block text-[13px] text-[#1f2430]">{D.person.name}</span>
                <span className="block text-[11.5px] text-[#80868B]">{D.person.email}</span>
              </span>
            </div>
          </div>
          <p className="mb-[8px] mt-[18px] text-[13px] font-medium text-[#1f2430]">{D.people}</p>
          <div className="flex flex-col gap-[9px]">
            <Row id="owner" name={`${D.owner.name} (you)`} email={D.owner.email} role={D.owner.role} />
            {people.includes("priya") && <Row id="priya" name={D.person.name} email={D.person.email} role={D.person.role} />}
          </div>
          <p className="mb-[8px] mt-[18px] text-[13px] font-medium text-[#1f2430]">{D.general}</p>
          <div className="relative flex items-center gap-[12px]">
            <span className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full ${access === "anyone" ? "bg-[#E4F4E8] text-[#1E8E3E]" : "bg-[#F1F3F4] text-[#5F6368]"}`}>
              <Icon name={access === "anyone" ? "shGlobe" : "lock"} size={16} />
            </span>
            <span className="leading-[17px]">
              <span data-tl="share-access" className="flex items-center gap-[4px] text-[13px] font-medium text-[#1f2430] data-[hover=true]:text-[#1D4FBF]">
                {acc.label}
                <Icon name="chevronDown" size={9} />
              </span>
              <span className="block text-[11.5px] text-[#80868B]">{acc.note}</span>
            </span>
            <div
              className={`absolute left-[46px] top-[30px] z-10 w-[330px] rounded-[10px] border border-[#E3E5EA] bg-white py-[6px] shadow-[0_10px_28px_-8px_rgba(17,24,39,0.3)] transition-[opacity,transform] duration-150 motion-reduce:transition-none ${
                menu ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
              }`}
            >
              {([["restricted", D.restricted, "lock"], ["anyone", D.anyone, "shGlobe"]] as const).map(([id, o, ic]) => (
                <div key={id} data-tl={`share-option-${id}`} className={`flex items-center gap-[11px] px-[13px] py-[8px] transition-colors data-[hover=true]:bg-[#F1F3F4] ${access === id ? "bg-[#EAF0FD]" : ""}`}>
                  <Icon name={ic} size={15} className="text-[#5F6368]" />
                  <span className="leading-[16px]">
                    <span className="block text-[13px] text-[#1f2430]">{o.label}</span>
                    <span className="block text-[11px] text-[#80868B]">{o.note}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[20px] flex items-center justify-between">
            <span data-tl="share-copy-link" className="flex h-[34px] items-center gap-[7px] rounded-full border border-[#C9D3EA] px-[15px] text-[13px] font-medium text-[#1D4FBF] transition-colors data-[hover=true]:bg-[#F3F6FD] data-[pressed=true]:scale-95">
              <Icon name={copied ? "check" : "shLink"} size={15} />
              {copied ? "Copied" : D.copyLink}
            </span>
            <BlueButton hook="share-done" round>{D.done}</BlueButton>
          </div>
        </div>
      )}
    </ShDialog>
  );
}

const NONE: string[] = [];

function Avatar({ name }: { name: string }) {
  return <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#7014D9] text-[11px] font-medium text-white">{name.split(" ").map((p) => p[0]).join("")}</span>;
}

function Row({ id, name, email, role }: { id: string; name: string; email: string; role: string }) {
  return (
    <div data-tl={`share-row-${id}`} className="flex items-center gap-[11px]">
      <Avatar name={name} />
      <span className="min-w-0 flex-1 leading-[17px]">
        <span className="block truncate text-[13px] text-[#1f2430]">{name}</span>
        <span className="block truncate text-[11.5px] text-[#80868B]">{email}</span>
      </span>
      <span className="text-[12.5px] text-[#5F6368]">{role}</span>
    </div>
  );
}

/**
 * File > Email ("Email this file"). Fields: `email-to`, `email-subject` (prefilled with the title), `email-message`. Scene variables:
 * `emailCopy` (Send yourself a copy), `emailType` (the file type), `emailTypeOpen` (the list is open).
 * Hooks: email-dialog, field-email-to, email-copy, field-email-subject, field-email-message, email-type, email-type-<n>, email-cancel, email-send, email-close.
 */
export function EmailDialog({ tl, title }: { tl: Timeline; title: string }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "email";
  const copy = useTimelineVar(tl, "emailCopy", false);
  const type = useTimelineVar<string>(tl, "emailType", EMAIL_DIALOG.types[0]);
  const listOpen = useTimelineVar(tl, "emailTypeOpen", false);
  const to = useTimelineVar(tl, "field:email-to", "");
  const D = EMAIL_DIALOG;
  return (
    <ShDialog open={open} width={412} hook="email-dialog">
      <div className="flex items-center justify-between px-[20px] pt-[20px]">
        <h2 className="text-[16.5px] font-medium text-[#1f2430]">{D.title}</h2>
        <CloseX id="email" />
      </div>
      <div className="px-[20px] pb-[18px] pt-[14px]">
        <ShField tl={tl} id="email-to" placeholder={D.to} />
        <span data-tl="email-copy" className="mt-[10px] flex items-center gap-[10px] text-[12.5px] text-[#4b5060]"><Tick on={copy} />{D.sendCopy}</span>
        <ShField tl={tl} id="email-subject" placeholder={D.subject} initial={title} floatLabel={D.subject} className="mt-[12px]" />
        <ShField tl={tl} id="email-message" placeholder={D.message} multi className="mt-[12px] h-[96px]" />
        <div className="relative mt-[12px]">
          <div data-tl="email-type" className="relative flex h-[38px] items-center justify-between rounded-[8px] border border-[#DADCE0] px-[11px] text-[13px] text-[#1f2430] transition-colors data-[hover=true]:border-[#9AA0A6]">
            <span className="pointer-events-none absolute left-[10px] top-[-7px] bg-white px-[3px] text-[10.5px] leading-[13px] text-[#80868B]">{D.fileType}</span>
            {type}
            <Icon name="chevronDown" size={11} />
          </div>
          <div
            className={`absolute inset-x-0 bottom-[42px] z-20 overflow-hidden rounded-[8px] border border-[#C9CDD4] bg-white py-[3px] text-[13px] shadow-[0_8px_24px_-6px_rgba(17,24,39,0.3)] transition-opacity duration-150 motion-reduce:transition-none ${
              listOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {D.types.map((t, i) => (
              <div key={t} data-tl={`email-type-${i + 1}`} className={`px-[11px] py-[5px] transition-colors data-[hover=true]:bg-[#2563EB] data-[hover=true]:text-white ${type === t ? "font-medium" : ""}`}>{t}</div>
            ))}
          </div>
        </div>
        <div className="mt-[18px] flex items-center justify-end gap-[8px]">
          <TextButton hook="email-cancel">{D.cancel}</TextButton>
          <BlueButton hook="email-send" disabled={!to}>{D.send}</BlueButton>
        </div>
      </div>
    </ShDialog>
  );
}
