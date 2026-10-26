"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DialogTitle, FieldLabel, GhostButton, PrimaryButton, SDialog, SField, Tick } from "./parts";
import { EMAIL, MOVE_DIALOG, SHARE_PUBLISH } from "./slides-data";

/**
 * File > Share > Publish to web. Scene variable `publishState`: idle | published.
 * Hooks: publish-dialog, publish-ok, publish-cancel, publish-link, publish-copy, publish-stop, publish-done, publish-close.
 */
export function PublishDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "publish";
  const state = useTimelineVar<string>(tl, "publishState", "idle");
  const D = SHARE_PUBLISH;
  const live = state === "published";
  return (
    <SDialog open={open} width={430} hook="publish-dialog">
      <DialogTitle id="publish">{live ? D.publishedTitle : D.title}</DialogTitle>
      <div className="px-[24px] pb-[20px] pt-[8px]">
        <div className="flex gap-[11px]">
          <span className={`mt-[2px] flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full transition-colors ${live ? "bg-[#E6F4EA] text-[#188038]" : "bg-[#EEF3FD] text-[#2B6FEB]"}`}>
            <Icon name="slPublish" size={17} />
          </span>
          <div>
            <p className="text-[10.5px] leading-[15px] text-[#1f2430]">{live ? D.publishedIntro : D.intro}</p>
            {!live && <p className="mt-[5px] text-[9px] leading-[13px] text-[#6b7280]">{D.note}</p>}
          </div>
        </div>
        {live && (
          <div data-tl="publish-link" className="mt-[12px] flex h-[34px] items-center justify-between rounded-[7px] border border-[#DADCE0] bg-[#FAFBFC] pl-[11px] pr-[4px] text-[10.5px] text-[#1f2430]">
            {D.link}
            <span data-tl="publish-copy" className="flex h-[26px] items-center gap-[4px] rounded-[5px] bg-[#EEF3FD] px-[10px] text-[9.5px] font-medium text-[#1A73E8] transition-colors data-[hover=true]:bg-[#E1EAFB]">
              <Icon name="copy" size={11} />
              {D.copy}
            </span>
          </div>
        )}
        <div className="mt-[20px] flex items-center justify-end gap-[8px]">
          {live ? (
            <>
              <span data-tl="publish-stop" className="mr-auto flex h-[30px] items-center rounded-[6px] px-[8px] text-[10.5px] font-medium text-[#C0272D] transition-colors data-[hover=true]:bg-[#FDEEEE]">{D.stop}</span>
              <PrimaryButton hook="publish-done">{D.done}</PrimaryButton>
            </>
          ) : (
            <>
              <GhostButton hook="publish-cancel">{D.cancel}</GhostButton>
              <PrimaryButton hook="publish-ok">{D.publish}</PrimaryButton>
            </>
          )}
        </div>
      </div>
    </SDialog>
  );
}

/**
 * File > Email > Email this file. Fields `to`, `subject`, `msg` (typed with tl.typeText("email-to", ...) etc.), scene variable
 * `emailAttach` (PDF | PPTX). Hooks: email-dialog, field-email-to, field-email-subject, field-email-msg, email-attach-<fmt>, email-send, email-cancel, email-close.
 */
export function EmailFileDialog({ tl, title }: { tl: Timeline; title: string }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "emailFile";
  const attach = useTimelineVar(tl, "emailAttach", EMAIL.formats[0]);
  return (
    <SDialog open={open} width={470} hook="email-dialog">
      <DialogTitle id="email">{EMAIL.fileTitle}</DialogTitle>
      <div className="space-y-[11px] px-[24px] pb-[20px] pt-[12px]">
        <div>
          <FieldLabel>{EMAIL.to}</FieldLabel>
          <SField tl={tl} id="email-to" placeholder="name@example.com" />
        </div>
        <div>
          <FieldLabel>{EMAIL.subject}</FieldLabel>
          <SField tl={tl} id="email-subject" placeholder={title} />
        </div>
        <div>
          <FieldLabel>{EMAIL.message}</FieldLabel>
          <SField tl={tl} id="email-msg" placeholder="Add a message" multi className="h-[66px]" />
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-[9.5px] font-medium text-[#5F6368]">{EMAIL.attachAs}</span>
          <span className="flex overflow-hidden rounded-[6px] border border-[#DADCE0] text-[10px]">
            {EMAIL.formats.map((f) => (
              <span
                key={f}
                data-tl={`email-attach-${f.toLowerCase()}`}
                className={`flex h-[26px] items-center px-[14px] transition-colors ${attach === f ? "bg-[#E8F0FE] font-medium text-[#1A73E8]" : "text-[#4b5060] data-[hover=true]:bg-[#F5F6F8]"}`}
              >
                {f}
              </span>
            ))}
          </span>
        </div>
        <div className="flex justify-end gap-[8px] pt-[8px]">
          <GhostButton hook="email-cancel">{EMAIL.cancel}</GhostButton>
          <PrimaryButton hook="email-send">{EMAIL.send}</PrimaryButton>
        </div>
      </div>
    </SDialog>
  );
}

/**
 * File > Email > Email collaborators. Scene variable `collabChecked` (ids of ticked people).
 * Hooks: collab-dialog, collab-person-<id>, field-collab-msg, collab-send, collab-cancel, collab-close.
 */
export function EmailCollabDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "emailCollab";
  const checked = useTimelineVar<string[]>(tl, "collabChecked", NONE);
  return (
    <SDialog open={open} width={470} hook="collab-dialog">
      <DialogTitle id="collab">{EMAIL.collabTitle}</DialogTitle>
      <div className="px-[24px] pb-[20px] pt-[10px]">
        <FieldLabel>{EMAIL.collaborators}</FieldLabel>
        <ul className="rounded-[7px] border border-[#E3E5EA]">
          {EMAIL.people.map((p, i) => (
            <li
              key={p.id}
              data-tl={`collab-person-${p.id}`}
              className={`flex h-[40px] items-center gap-[10px] px-[11px] transition-colors data-[hover=true]:bg-[#F5F8FE] ${i > 0 ? "border-t border-[#F0F1F4]" : ""}`}
            >
              <Tick on={checked.includes(p.id)} />
              <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#E3ECFB] text-[9.5px] font-medium text-[#2F62C8]">{p.name[0]}</span>
              <span className="leading-[13px]">
                <span className="block text-[10px] font-medium text-[#1f2430]">{p.name}</span>
                <span className="block text-[8.5px] text-[#6b7280]">{p.email}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-[11px]">
          <FieldLabel>{EMAIL.message}</FieldLabel>
          <SField tl={tl} id="collab-msg" placeholder="Add a message" multi className="h-[58px]" />
        </div>
        <div className="mt-[16px] flex justify-end gap-[8px]">
          <GhostButton hook="collab-cancel">{EMAIL.cancel}</GhostButton>
          <PrimaryButton hook="collab-send">{EMAIL.send}</PrimaryButton>
        </div>
      </div>
    </SDialog>
  );
}

const NONE: string[] = [];

/**
 * File > Move: a folder picker. Scene variable `moveChoice` (the folder id that is selected).
 * Hooks: move-dialog, move-folder-<id>, move-new-folder, move-ok, move-cancel, move-close.
 */
export function MoveDialog({ tl, title }: { tl: Timeline; title: string }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "move";
  const choice = useTimelineVar(tl, "moveChoice", "");
  const here = useTimelineVar(tl, "moveCurrent", "all");
  return (
    <SDialog open={open} width={430} hook="move-dialog">
      <DialogTitle id="move">{MOVE_DIALOG.title(title)}</DialogTitle>
      <div className="px-[24px] pb-[20px] pt-[8px]">
        <p className="mb-[7px] text-[9.5px] text-[#6b7280]">
          {MOVE_DIALOG.current}: <span className="font-medium text-[#1f2430]">{MOVE_DIALOG.folders.find((f) => f.id === here)?.label}</span>
        </p>
        <ul className="rounded-[7px] border border-[#E3E5EA]">
          {MOVE_DIALOG.folders.map((f, i) => (
            <li
              key={f.id}
              data-tl={`move-folder-${f.id}`}
              className={`flex h-[36px] items-center gap-[10px] px-[11px] text-[10.5px] transition-colors data-[hover=true]:bg-[#F5F8FE] ${i > 0 ? "border-t border-[#F0F1F4]" : ""} ${choice === f.id ? "bg-[#E8F0FE] font-medium text-[#1A73E8]" : "text-[#1f2430]"}`}
            >
              <Icon name="folder" size={14} className={choice === f.id ? "text-[#1A73E8]" : "text-[#6b7280]"} />
              {f.label}
              {choice === f.id && <Icon name="check" size={11} className="ml-auto" />}
            </li>
          ))}
        </ul>
        <span data-tl="move-new-folder" className="mt-[9px] flex h-[26px] w-fit items-center gap-[5px] rounded-[5px] px-[6px] text-[10px] font-medium text-[#1A73E8] transition-colors data-[hover=true]:bg-[#F2F7FE]">
          <Icon name="plus" size={11} />
          {MOVE_DIALOG.newFolder}
        </span>
        <div className="mt-[16px] flex justify-end gap-[8px]">
          <GhostButton hook="move-cancel">{MOVE_DIALOG.cancel}</GhostButton>
          <PrimaryButton hook="move-ok">{MOVE_DIALOG.move}</PrimaryButton>
        </div>
      </div>
    </SDialog>
  );
}
