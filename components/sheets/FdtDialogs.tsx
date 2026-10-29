"use client";

import { Icon, ProductLogo } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ABOUT, ACCESS, CUSTOM_COPY, CUSTOM_FMT, FILTER, MACRO, NAMED, NOTIF, PALETTE, PROTECT, SHORTCUTS, SPELL } from "./fdt-data";
import { applyPattern } from "./fdt-state";
import { MENUS } from "./edit-view-data";
import { BlueButton, CloseX, FieldLabel, ShDialog, ShField, TextButton, Tick } from "./parts";

/* The dialogs of the Format, Data, Tools and Help menus. Each opens from the scene variable `dialog`. Hooks are named in each header. */

const useDialog = (tl: Timeline, id: string) => useTimelineVar<string>(tl, "dialog", "") === id;

function Head({ title, id, sub }: { title: string; id: string; sub?: string }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-[15px] font-semibold text-[#1f2430]">{title}</h2>
        {sub && <p className="mt-[3px] text-[12px] leading-[17px] text-[#5F6368]">{sub}</p>}
      </div>
      <CloseX id={id} />
    </div>
  );
}

function Foot({ children }: { children: React.ReactNode }) {
  return <div className="mt-[16px] flex items-center justify-end gap-[8px]">{children}</div>;
}

export function Switch({ on, hook }: { on: boolean; hook: string }) {
  return (
    <span data-tl={hook} className={`relative h-[20px] w-[36px] shrink-0 rounded-full transition-colors duration-200 motion-reduce:transition-none ${on ? "bg-[#2563EB]" : "bg-[#C9CDD3]"}`}>
      <i className={`absolute top-[2px] h-[16px] w-[16px] rounded-full bg-white shadow transition-[left] duration-200 motion-reduce:transition-none ${on ? "left-[18px]" : "left-[2px]"}`} />
    </span>
  );
}

/** Format > Number > Custom ...: a preset list and a pattern box. Variables: `customKind`, `customPick`, `field:custom-input`, `customCell` (the number the preview shows). Hooks: custom-dialog, custom-preset-<n>, field-custom-input, custom-cancel, custom-apply. */
export function CustomFormatDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "custom");
  const kind = useTimelineVar<string>(tl, "customKind", "custom-currency");
  const text = useTimelineVar(tl, "field:custom-input", "");
  const n = useTimelineVar(tl, "customNum", 1234.5);
  const pick = useTimelineVar(tl, "customPick", -1);
  const D = CUSTOM_FMT[kind] ?? CUSTOM_FMT["custom-currency"];
  return (
    <ShDialog open={open} width={380} hook="custom-dialog">
      <div className="p-[20px]">
        <Head title={D.title} id="custom" sub={D.hint} />
        <div className="mt-[14px] flex flex-col gap-[4px]">
          {D.presets.map((p, i) => (
            <div key={p} data-tl={`custom-preset-${i}`} className={`flex items-center justify-between rounded-[7px] px-[11px] py-[7px] text-[13px] transition-colors ${pick === i ? "bg-[#E8F0FE] text-[#1C3F94]" : "data-[hover=true]:bg-[#F1F3F4]"}`}>
              <span>{p}</span>
              <span className="text-[12px] text-[#80868B]">{applyPattern(n, p)}</span>
            </div>
          ))}
        </div>
        <div className="mt-[14px]">
          <ShField tl={tl} id="custom-input" placeholder={D.placeholder} />
        </div>
        <p className="mt-[8px] text-[12px] text-[#5F6368]">{CUSTOM_COPY.preview}: <b className="font-medium text-[#1f2430]">{text ? applyPattern(n, text) : "—"}</b></p>
        <Foot>
          <TextButton hook="custom-cancel">{CUSTOM_COPY.cancel}</TextButton>
          <BlueButton hook="custom-apply" disabled={!text}>{CUSTOM_COPY.apply}</BlueButton>
        </Foot>
      </div>
    </ShDialog>
  );
}

/** Data > Named ranges, first dialog. Variables: `nrStart` (the cell the range starts at), `field:nr-name`. Hooks: nr-dialog, field-nr-name, nr-cancel, nr-ok. */
export function NameRangeDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "nameRange");
  const start = useTimelineVar(tl, "nrStart", NAMED.start);
  return (
    <ShDialog open={open} width={340} hook="nr-dialog">
      <div className="p-[20px]">
        <h2 className="text-[15px] font-semibold text-[#1f2430]">{NAMED.nameTitle}</h2>
        <p className="mb-[6px] mt-[12px] text-[12px] text-[#5F6368]">{NAMED.nameLabel(start.toUpperCase())}</p>
        <ShField tl={tl} id="nr-name" placeholder="" />
        <Foot>
          <TextButton hook="nr-cancel">{NAMED.cancel}</TextButton>
          <BlueButton hook="nr-ok">{NAMED.name}</BlueButton>
        </Foot>
      </div>
    </ShDialog>
  );
}

/** Data > Named ranges, second dialog. Hooks: re-dialog, field-nr-end, re-cancel, re-ok. */
export function RangeEndDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "rangeEnd");
  return (
    <ShDialog open={open} width={340} hook="re-dialog">
      <div className="p-[20px]">
        <h2 className="text-[15px] font-semibold text-[#1f2430]">{NAMED.endTitle}</h2>
        <p className="mb-[6px] mt-[12px] text-[12px] text-[#5F6368]">{NAMED.endLabel}</p>
        <ShField tl={tl} id="nr-end" placeholder={NAMED.endPlaceholder} />
        <Foot>
          <TextButton hook="re-cancel">{NAMED.cancel}</TextButton>
          <BlueButton hook="re-ok">{NAMED.ok}</BlueButton>
        </Foot>
      </div>
    </ShDialog>
  );
}

/** Data > Protected sheets and ranges. Hooks: pr-dialog, field-pr-choice, pr-cancel, pr-next. */
export function ProtectDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "protect");
  return (
    <ShDialog open={open} width={360} hook="pr-dialog">
      <div className="p-[20px]">
        <h2 className="text-[15px] font-semibold text-[#1f2430]">{PROTECT.title}</h2>
        <p className="mt-[4px] text-[12px] leading-[17px] text-[#5F6368]">{PROTECT.sub}</p>
        <p className="mb-[6px] mt-[12px] text-[12px] font-medium text-[#5F6368]">{PROTECT.label}</p>
        <ShField tl={tl} id="pr-choice" placeholder="" />
        <Foot>
          <TextButton hook="pr-cancel">{PROTECT.cancel}</TextButton>
          <BlueButton hook="pr-next">{PROTECT.next}</BlueButton>
        </Foot>
      </div>
    </ShDialog>
  );
}

/** The small message beside a cell of a protected sheet. Hook: protect-msg. */
export function ProtectMessage() {
  return (
    <div data-tl="protect-msg" className="flex w-[210px] items-start gap-[8px] rounded-[8px] border border-[#F2B8B5] bg-[#FDECEA] px-[11px] py-[8px] shadow-[0_6px_16px_-4px_rgba(17,24,39,0.25)]">
      <Icon name="lock" size={14} className="mt-[1px] shrink-0 text-[#C5221F]" />
      <span className="text-[12px] leading-[16px] text-[#3C4043]"><b className="block font-medium text-[#C5221F]">{PROTECT.blocked}</b>{PROTECT.blockedSub}</span>
    </div>
  );
}

export type Macro = { id: string; name: string; desc: string; steps: string[] };

/** Tools > Create new macro. Variables: `macRec` (idle | rec | done), `macShown` (how many recorded steps are listed), fields `mac-name`, `mac-desc`, `mac-key`. Hooks: mac-dialog, field-mac-*, mac-record, mac-steps, mac-step-<n>, mac-cancel, mac-save. */
export function MacroDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "macroNew");
  const rec = useTimelineVar<string>(tl, "macRec", "idle");
  const shown = useTimelineVar(tl, "macShown", 0);
  const name = useTimelineVar(tl, "field:mac-name", "");
  return (
    <ShDialog open={open} width={400} hook="mac-dialog">
      <div className="p-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-[8px] text-[15px] font-semibold text-[#1f2430]"><Icon name="imCode" size={16} className="text-[#5F6368]" />{MACRO.title}</h2>
          <CloseX id="mac" />
        </div>
        <div className="mt-[14px] flex flex-col gap-[11px]">
          <div><FieldLabel>{MACRO.name}</FieldLabel><ShField tl={tl} id="mac-name" placeholder={MACRO.namePlaceholder} className="!h-[34px]" /></div>
          <div><FieldLabel>{MACRO.desc}</FieldLabel><ShField tl={tl} id="mac-desc" placeholder={MACRO.descPlaceholder} className="!h-[34px]" /></div>
          <div><FieldLabel>{MACRO.key}</FieldLabel><ShField tl={tl} id="mac-key" placeholder={MACRO.keyPlaceholder} className="!h-[34px]" /></div>
          <div>
            <FieldLabel>{MACRO.record}</FieldLabel>
            <div data-tl="mac-box" className="rounded-[8px] border border-dashed border-[#DADCE0] bg-[#FAFBFC] px-[12px] py-[12px]">
              {rec === "idle" ? (
                <div className="flex flex-col items-center gap-[10px] py-[4px]">
                  <p className="text-[12px] text-[#80868B]">{MACRO.idle}</p>
                  <span data-tl="mac-record" className="flex h-[30px] items-center gap-[6px] rounded-[7px] bg-[#E5484D] px-[14px] text-[12.5px] font-medium text-white transition-[transform,filter] data-[hover=true]:brightness-90 data-[pressed=true]:scale-95"><i className="h-[8px] w-[8px] rounded-full bg-white" />{MACRO.start}</span>
                </div>
              ) : (
                <div>
                  <div className="mb-[8px] flex items-center justify-between">
                    <span className="flex items-center gap-[6px] text-[12px] font-medium text-[#C5221F]">{rec === "rec" && <i className="h-[8px] w-[8px] animate-pulse rounded-full bg-[#E5484D]" />}{MACRO.recording}</span>
                    <span data-tl="mac-record" className="flex h-[24px] items-center gap-[5px] rounded-[6px] border border-[#DADCE0] bg-white px-[9px] text-[12px] text-[#3C4043] data-[hover=true]:bg-[#F1F3F4]"><i className="h-[8px] w-[8px] rounded-[2px] bg-[#5F6368]" />{MACRO.stop}</span>
                  </div>
                  <ol data-tl="mac-steps" className="flex flex-col gap-[3px] text-[12.5px] text-[#3C4043]">
                    {MACRO.steps.slice(0, shown).map((s, i) => (
                      <li key={s} data-tl={`mac-step-${i + 1}`} className="flex gap-[8px] rounded-[5px] bg-white px-[8px] py-[4px]"><span className="w-[14px] text-[#80868B]">{i + 1}.</span>{s}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
        <Foot>
          <TextButton hook="mac-cancel">{MACRO.cancel}</TextButton>
          <BlueButton hook="mac-save" disabled={!name}>{MACRO.save}</BlueButton>
        </Foot>
      </div>
    </ShDialog>
  );
}

/** Tools > Manage macros. Variable `macros` (the saved list). Hooks: man-dialog, man-row-<id>, man-run-<id>, man-del-<id>, man-cancel. */
export function ManageMacrosDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "macroManage");
  const macros = useTimelineVar<Macro[]>(tl, "macros", []);
  return (
    <ShDialog open={open} width={400} hook="man-dialog">
      <div className="p-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-[8px] text-[15px] font-semibold text-[#1f2430]"><Icon name="imCode" size={16} className="text-[#5F6368]" />{MACRO.manageTitle}</h2>
          <CloseX id="man" />
        </div>
        {macros.length === 0 ? (
          <div className="flex flex-col items-center gap-[4px] py-[26px] text-center">
            <Icon name="imCode" size={24} className="text-[#C9CFD8]" />
            <p className="mt-[6px] text-[13px] text-[#80868B]">{MACRO.none}</p>
            <p className="text-[11.5px] text-[#9AA0A6]">{MACRO.noneSub}</p>
          </div>
        ) : (
          <div className="mt-[14px] flex flex-col gap-[8px]">
            {macros.map((m) => (
              <div key={m.id} data-tl={`man-row-${m.id}`} className="flex items-center justify-between rounded-[8px] border border-[#E3E5EA] px-[12px] py-[10px]">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-[#1f2430]">{m.name}</p>
                  <p className="truncate text-[11.5px] text-[#5F6368]">{m.desc}</p>
                  <p className="mt-[2px] flex items-center gap-[4px] text-[11px] text-[#9AA0A6]"><Icon name="clock" size={11} />{MACRO.date} · {MACRO.stepCount(m.steps.length)}</p>
                </div>
                <div className="flex items-center gap-[4px]">
                  <span data-tl={`man-run-${m.id}`} className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] text-[#1E8E3E] transition-colors data-[hover=true]:bg-[#E6F4EA]"><Icon name="play" size={15} /></span>
                  <span data-tl={`man-del-${m.id}`} className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] text-[#C5221F] transition-colors data-[hover=true]:bg-[#FCE8E6]"><Icon name="trash" size={15} /></span>
                </div>
              </div>
            ))}
          </div>
        )}
        <Foot>
          <TextButton hook="man-cancel">{MACRO.cancel}</TextButton>
        </Foot>
      </div>
    </ShDialog>
  );
}

/** Tools > Spelling. Variable `spell` ("fix" = a suggestion, "done" = the finished message). Hooks: spell-dialog, spell-change, spell-ignore, spell-done. */
export function SpellingDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "spelling");
  const mode = useTimelineVar<string>(tl, "spell", "fix");
  return (
    <ShDialog open={open} width={330} hook="spell-dialog">
      <div className="p-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-[8px] text-[15px] font-semibold text-[#1f2430]"><Icon name="tlSpell" size={16} className="text-[#5F6368]" />{SPELL.title}</h2>
          <CloseX id="spell" />
        </div>
        {mode === "done" ? (
          <div className="flex flex-col items-center gap-[4px] py-[18px] text-center">
            <Icon name="circleCheck" size={34} className="text-[#1E8E3E]" />
            <p className="mt-[6px] text-[14px] font-medium text-[#1f2430]">{SPELL.doneTitle}</p>
            <p className="text-[12px] text-[#5F6368]">{SPELL.doneSub}</p>
            <span className="mt-[12px]"><BlueButton hook="spell-done">{SPELL.done}</BlueButton></span>
          </div>
        ) : (
          <>
            <p className="mt-[14px] text-[11px] font-medium uppercase tracking-wide text-[#80868B]">{SPELL.notIn}</p>
            <p className="mt-[3px] text-[15px] font-medium text-[#C5221F]"><span data-tl="spell-word">{SPELL.word}</span></p>
            <p className="mt-[12px] text-[11px] font-medium uppercase tracking-wide text-[#80868B]">Suggestion</p>
            <p data-tl="spell-suggestion" className="mt-[4px] rounded-[7px] bg-[#E8F0FE] px-[11px] py-[7px] text-[13px] text-[#1C3F94]">{SPELL.suggestion}</p>
            <Foot>
              <TextButton hook="spell-ignore">{SPELL.ignore}</TextButton>
              <BlueButton hook="spell-change">{SPELL.change}</BlueButton>
            </Foot>
          </>
        )}
      </div>
    </ShDialog>
  );
}

export type NotifState = { email: boolean; replies: boolean; mentions: boolean; edits: boolean; sharing: boolean; freq: string };
export const DEFAULT_NOTIF: NotifState = { email: true, replies: true, mentions: true, edits: false, sharing: true, freq: "instant" };

/** Tools > Notification settings. Variable `notif`. Hooks: notif-dialog, notif-toggle-<id>, notif-freq-<id>, notif-cancel, notif-save. */
export function NotificationDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "notif");
  const st = useTimelineVar<NotifState>(tl, "notif", DEFAULT_NOTIF);
  return (
    <ShDialog open={open} width={420} hook="notif-dialog">
      <div className="p-[20px]">
        <Head title={NOTIF.title} id="notif" sub={NOTIF.intro} />
        <div className="mt-[10px] flex flex-col">
          {NOTIF.rows.map((r) => (
            <div key={r.id} data-tl={`notif-row-${r.id}`} className="flex items-center justify-between border-b border-[#F0F1F3] py-[10px] last:border-0">
              <div>
                <p className="text-[13px] font-medium text-[#1f2430]">{r.label}</p>
                <p className="text-[11.5px] text-[#80868B]">{r.sub}</p>
              </div>
              <Switch on={st[r.id as keyof NotifState] as boolean} hook={`notif-toggle-${r.id}`} />
            </div>
          ))}
        </div>
        <p className="mb-[6px] mt-[12px] text-[12px] font-medium text-[#5F6368]">{NOTIF.freqLabel}</p>
        <div data-tl="notif-freq" className="grid grid-cols-4 gap-[4px] rounded-[9px] bg-[#F1F3F4] p-[3px]">
          {NOTIF.freqs.map((f) => (
            <span key={f.id} data-tl={`notif-freq-${f.id}`} className={`flex h-[28px] items-center justify-center rounded-[7px] text-[12.5px] transition-colors ${st.freq === f.id ? "bg-white font-medium text-[#1C3F94] shadow-sm" : "text-[#5F6368]"}`}>{f.label}</span>
          ))}
        </div>
        <Foot>
          <TextButton hook="notif-cancel">{NOTIF.cancel}</TextButton>
          <BlueButton hook="notif-save">{NOTIF.save}</BlueButton>
        </Foot>
      </div>
    </ShDialog>
  );
}

export type A11yState = { reader: boolean; announce: boolean; contrast: boolean; large: boolean; motion: boolean; keyboard: boolean };
export const DEFAULT_A11Y: A11yState = { reader: false, announce: true, contrast: false, large: false, motion: false, keyboard: true };

/** Tools > Accessibility: a scrolling panel with pinned header and footer. Variable `a11y`. Hooks: a11y-dialog, a11y-scroll, a11y-section-<n>, a11y-toggle-<id>, a11y-quick, a11y-done. */
export function AccessibilityDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "a11y");
  const st = useTimelineVar<A11yState>(tl, "a11y", DEFAULT_A11Y);
  return (
    <ShDialog open={open} width={420} hook="a11y-dialog">
      <div className="flex max-h-[min(560px,calc(100vh-96px))] flex-col">
        <div className="shrink-0 px-[20px] pb-[8px] pt-[18px]"><Head title={ACCESS.title} id="a11y" sub={ACCESS.intro} /></div>
        <div data-tl="a11y-scroll" className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-[20px] pb-[8px]">
          {ACCESS.sections.map((sec, i) => (
            <div key={sec.label} data-tl={`a11y-section-${i}`} className="mt-[10px]">
              <p className="text-[10.5px] font-semibold tracking-wider text-[#80868B]">{sec.label}</p>
              {sec.rows.map((r) => (
                <div key={r.id} data-tl={`a11y-row-${r.id}`} className="flex items-center justify-between gap-[12px] border-b border-[#F0F1F3] py-[9px] last:border-0">
                  <div>
                    <p className="text-[13px] font-medium text-[#1f2430]">{r.label}</p>
                    <p className="text-[11.5px] leading-[15px] text-[#80868B]">{r.sub}</p>
                  </div>
                  <Switch on={st[r.id as keyof A11yState]} hook={`a11y-toggle-${r.id}`} />
                </div>
              ))}
            </div>
          ))}
          <div data-tl="a11y-quick" className="mt-[14px]">
            <p className="text-[10.5px] font-semibold tracking-wider text-[#80868B]">{ACCESS.quick}</p>
            <div className="mt-[6px] grid grid-cols-2 gap-x-[16px] gap-y-[2px] rounded-[8px] bg-[#F8F9FA] p-[10px] text-[12px]">
              {ACCESS.keys.map(([k, v]) => (
                <span key={k} className="flex items-center justify-between"><span className="text-[#5F6368]">{k}</span><kbd className="rounded-[4px] border border-[#DADCE0] bg-white px-[5px] py-[1px] text-[11px] text-[#3C4043]">{v}</kbd></span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 justify-end border-t border-[#E8EAED] px-[20px] py-[12px]"><BlueButton hook="a11y-done">{ACCESS.done}</BlueButton></div>
      </div>
    </ShDialog>
  );
}

/** Help > Keyboard shortcuts. Field `kb-q` filters the list. Hooks: kb-dialog, kb-scroll, kb-group-<n>, field-kb-q, kb-done. */
export function ShortcutsDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "shortcuts");
  const q = useTimelineVar(tl, "field:kb-q", "").trim().toLowerCase();
  const groups = SHORTCUTS.groups.map((g) => ({ ...g, rows: g.rows.filter(([a]) => a.toLowerCase().includes(q)) })).filter((g) => g.rows.length);
  return (
    <ShDialog open={open} width={420} hook="kb-dialog">
      <div className="flex max-h-[min(540px,calc(100vh-96px))] flex-col">
        <div className="shrink-0 px-[20px] pb-[10px] pt-[18px]">
          <Head title={SHORTCUTS.title} id="kb" />
          <div className="mt-[10px]"><ShField tl={tl} id="kb-q" placeholder={SHORTCUTS.search} className="!h-[34px]" /></div>
        </div>
        <div data-tl="kb-scroll" className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-[20px] pb-[8px]">
          {groups.length === 0 && <p className="py-[18px] text-center text-[12.5px] text-[#80868B]">{SHORTCUTS.empty}</p>}
          {groups.map((g, i) => (
            <div key={g.label} data-tl={`kb-group-${i}`} className="mb-[10px]">
              <p className="mb-[3px] text-[10.5px] font-semibold uppercase tracking-wider text-[#80868B]">{g.label}</p>
              {g.rows.map(([name, key]) => (
                <div key={name} className="flex items-center justify-between border-b border-[#F4F5F7] py-[6px] text-[13px] last:border-0"><span>{name}</span><kbd className="rounded-[4px] border border-[#DADCE0] bg-[#F8F9FA] px-[6px] py-[1px] text-[11.5px] text-[#3C4043]">{key}</kbd></div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex shrink-0 justify-end border-t border-[#E8EAED] px-[20px] py-[12px]"><BlueButton hook="kb-done">{SHORTCUTS.done}</BlueButton></div>
      </div>
    </ShDialog>
  );
}

/** Help > About. Hooks: about-dialog, about-close. */
export function AboutDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "about");
  return (
    <ShDialog open={open} width={330} hook="about-dialog">
      <div className="flex flex-col items-center px-[24px] pb-[18px] pt-[26px] text-center">
        <ProductLogo name="sheet" size={52} className="rounded-[12px]" />
        <h2 className="mt-[12px] text-[16px] font-semibold text-[#1f2430]">{ABOUT.title}</h2>
        <p data-tl="about-version" className="mt-[2px] text-[13px] text-[#5F6368]">{ABOUT.version}</p>
        <p className="mt-[10px] text-[11.5px] text-[#80868B]">{ABOUT.copy}</p>
        <span className="mt-[16px]"><BlueButton hook="about-close">{ABOUT.close}</BlueButton></span>
      </div>
    </ShDialog>
  );
}

/** Help > Search the menus: a search box and the matching menu rows with their path and shortcut. Field `pal-q`. Hooks: pal-dialog, field-pal-q, pal-row-<n>. */
export function PaletteDialog({ tl }: { tl: Timeline }) {
  const open = useDialog(tl, "palette");
  const q = useTimelineVar(tl, "field:pal-q", "").trim().toLowerCase();
  const results = q ? paletteResults(q) : [];
  return (
    <ShDialog open={open} width={460} hook="pal-dialog">
      <div className="p-[14px]">
        <div className="flex items-center gap-[8px]"><Icon name="shSearch" size={16} className="shrink-0 text-[#5F6368]" /><div className="min-w-0 flex-1"><ShField tl={tl} id="pal-q" placeholder={PALETTE.placeholder} className="!h-[36px]" /></div></div>
        <div data-tl="pal-list" className="mt-[8px] min-h-[40px]">
          {q && results.length === 0 && <p className="py-[12px] text-center text-[12.5px] text-[#80868B]">{PALETTE.empty}</p>}
          {results.map((r, i) => (
            <div key={r.id} data-tl={`pal-row-${i}`} className={`flex items-center justify-between rounded-[7px] px-[10px] py-[8px] text-[13px] ${i === 0 ? "bg-[#E8F0FE]" : ""}`}>
              <span className="flex items-center gap-[9px]">{r.icon && <Icon name={r.icon} size={16} className="text-[#5F6368]" />}<span>{r.label}</span><span className="text-[11.5px] text-[#80868B]">{r.menu}</span></span>
              <span className="text-[11.5px] text-[#80868B]">{r.shortcut}</span>
            </div>
          ))}
        </div>
        {results.length > 0 && <p className="mt-[6px] border-t border-[#EEF0F3] pt-[8px] text-[11.5px] text-[#80868B]">{PALETTE.hint}</p>}
      </div>
    </ShDialog>
  );
}

const MENU_NAMES: Record<string, string> = { edit: "Edit", view: "View", insert: "Insert", format: "Format", data: "Data", tools: "Tools", extensions: "Extensions", help: "Help" };

/** Every menu row whose label contains the text, with the menu it lives in. */
export function paletteResults(q: string) {
  return Object.entries(MENUS)
    .flatMap(([menu, groups]) => groups.flat().map((r) => ({ ...r, menu: MENU_NAMES[menu] })))
    .filter((r) => r.label.toLowerCase().includes(q) && !r.disabled)
    .slice(0, 6);
}

/** Data > Create a filter: the value list under a header button. Variables: `fpOff` (unticked values), `fpValues`, `fpCol`. Hooks: filter-pop, field-fp-q, fp-all, fp-clear, fp-val-<value in lower case>, fp-ok, fp-cancel. */
export function FilterPopup({ tl }: { tl: Timeline }) {
  const values = useTimelineVar<string[]>(tl, "fpValues", []);
  const off = useTimelineVar<string[]>(tl, "fpOff", []);
  const q = useTimelineVar(tl, "field:fp-q", "").toLowerCase();
  return (
    <div data-tl="filter-pop" className="w-[220px] rounded-[9px] border border-[#DADCE0] bg-white p-[10px] text-[#1f2430] shadow-[0_10px_30px_-6px_rgba(17,24,39,0.35)]">
      <ShField tl={tl} id="fp-q" placeholder={FILTER.search} className="!h-[30px] !text-[12.5px]" />
      <div className="mb-[4px] mt-[8px] flex items-center gap-[12px] text-[12px] text-[#2563EB]">
        <span data-tl="fp-all" className="data-[hover=true]:underline">{FILTER.all}</span>
        <span data-tl="fp-clear" className="data-[hover=true]:underline">{FILTER.clear}</span>
      </div>
      <div className="max-h-[130px] overflow-y-auto">
        {values.filter((v) => v.toLowerCase().includes(q)).map((v) => (
          <div key={v} data-tl={`fp-val-${v.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center gap-[8px] rounded-[5px] px-[4px] py-[4px] text-[12.5px] data-[hover=true]:bg-[#F1F3F4]"><Tick on={!off.includes(v)} />{v}</div>
        ))}
      </div>
      <div className="mt-[8px] flex justify-end gap-[6px] border-t border-[#EEF0F3] pt-[8px]">
        <TextButton hook="fp-cancel">{FILTER.cancel}</TextButton>
        <BlueButton hook="fp-ok" className="!h-[30px] !px-[14px]">{FILTER.ok}</BlueButton>
      </div>
    </div>
  );
}

/** The bar above the grid while a filter view is open. Variable `fvBar` (the view's name). Hooks: fv-bar, fv-name, fv-close. */
export function FilterViewBar({ name }: { name: string }) {
  return (
    <div data-tl="fv-bar" className="flex h-[30px] shrink-0 items-center gap-[10px] border-b border-[#E3E5EA] bg-[#EEF3FD] px-[12px] text-[12.5px]">
      <Icon name="shFilter" size={14} className="text-[#2563EB]" />
      <span data-tl="fv-name" className="rounded-[5px] bg-white px-[9px] py-[2px] font-medium text-[#1C3F94]">{name}</span>
      <span className="flex-1" />
      <span data-tl="fv-close" className="flex items-center gap-[4px] text-[#5F6368] data-[hover=true]:text-[#1f2430]"><Icon name="x" size={13} />{FILTER.close}</span>
    </div>
  );
}
