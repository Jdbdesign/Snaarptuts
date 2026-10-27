"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DialogTitle, GhostButton, PrimaryButton, SDialog, SField } from "./parts";
import { closeExplore, insertExploreImage, insertExploreLayout, insertExploreTopic, savePreferences } from "./slides-tools";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { DISPLAY_OPTIONS, EXPLORE, MEETING, PREFERENCES } from "./slides-tools-data";
import { THEMES, type ThemeId } from "./slides-toolbar-data";

/**
 * Tools > Explore: a panel on the right (it takes the place of the "Select an element" text) with a search box and three kinds of suggestion.
 * Scene variables: `explore` (open), `field:explore` (the search text) and `exploreDone` (the search has been run: suggestions show).
 * Clicking a suggestion puts it on the slide. Hooks: explore-panel, explore-heading, explore-close, field-explore, explore-layout-<id>, explore-image-<id>,
 * explore-topic-<id>.
 */
export function ExplorePanel({ tl }: { tl: Timeline }) {
  const done = useTimelineVar(tl, "exploreDone", false);
  const query = useTimelineVar(tl, "field:explore", "");
  const E = EXPLORE;
  const heading = "mb-[6px] mt-[12px] text-[8.5px] font-semibold uppercase tracking-[0.06em] text-[#6b7280]";
  return (
    <div data-tl="explore-panel" className="absolute inset-0 overflow-hidden bg-white">
      <div data-tl="explore-heading" className="flex h-[30px] items-center justify-between border-b border-[#F0F1F4] px-[12px]">
        <h3 className="text-[10.5px] font-semibold text-[#1f2430]">{E.title}</h3>
        <span data-tl="explore-close" onClick={() => closeExplore(tl)} className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-[#4b5060] data-[hover=true]:bg-[#F1F3F4]">
          <Icon name="x" size={10} />
        </span>
      </div>
      <div className="px-[12px] pt-[10px]">
        <SField tl={tl} id="explore" placeholder={E.placeholder} />
        {done && query ? (
          <div data-tl="explore-results">
            <p className={heading}>{E.layoutsHeading}</p>
            <div className="grid grid-cols-2 gap-[8px]">
              {E.layouts.map((l) => (
                <div
                  key={l.id}
                  data-tl={`explore-layout-${l.id}`}
                  onClick={() => insertExploreLayout(tl, l.id)}
                  className="rounded-[7px] border border-[#E3E6EC] bg-[#F9FAFC] p-[8px] transition-[border-color,transform] data-[hover=true]:border-[#9DB7FF] data-[pressed=true]:scale-95"
                >
                  <p className="text-[9px] leading-[12px] text-[#1f2430]" style={{ fontStyle: l.fmt.italic ? "italic" : "normal", fontWeight: l.fmt.bold ? 700 : 400 }}>
                    {l.text}
                  </p>
                  <p className="mt-[5px] text-[7.5px] text-[#6b7280]">{l.label}</p>
                </div>
              ))}
            </div>
            <p className={heading}>{E.imagesHeading}</p>
            <div className="grid grid-cols-3 gap-[7px]">
              {E.images.map((img) => (
                <div
                  key={img.id}
                  data-tl={`explore-image-${img.id}`}
                  onClick={() => insertExploreImage(tl, img.id)}
                  className="overflow-hidden rounded-[6px] border border-[#E3E6EC] transition-[border-color,transform] data-[hover=true]:border-[#9DB7FF] data-[pressed=true]:scale-95"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.name} draggable={false} className="block aspect-[3/2] w-full object-cover" />
                </div>
              ))}
            </div>
            <p className={heading}>{E.topicsHeading}</p>
            <div className="flex flex-wrap gap-[6px]">
              {E.topics.map((t) => (
                <span
                  key={t.id}
                  data-tl={`explore-topic-${t.id}`}
                  onClick={() => insertExploreTopic(tl, t.id)}
                  className="rounded-full border border-[#DADCE0] px-[9px] py-[4px] text-[9px] text-[#1f2430] transition-[background,transform] data-[hover=true]:bg-[#F1F2F5] data-[pressed=true]:scale-95"
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-[16px] text-[9.5px] leading-[13px] text-[#6b7280]">{E.hint}</p>
        )}
      </div>
    </div>
  );
}

const Switch = ({ on }: { on: boolean }) => (
  <span className={`relative h-[16px] w-[28px] shrink-0 rounded-full transition-colors duration-200 ${on ? "bg-[#1A73E8]" : "bg-[#BDC1C6]"}`}>
    <i className={`absolute top-[2px] block h-[12px] w-[12px] rounded-full bg-white shadow transition-[left] duration-200 ${on ? "left-[14px]" : "left-[2px]"}`} />
  </span>
);

/**
 * Tools > Preferences: three settings and Save. Scene variables: `dialog` = "preferences", `pref:spell` and `pref:ruler` (the switches),
 * `prefTheme` (the Default theme) and `prefMenu` (its list is open). Hooks: preferences-dialog, pref-spell, pref-ruler, pref-theme,
 * pref-theme-<id>, pref-save, pref-cancel, preferences-close.
 */
export function PreferencesDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "preferences";
  const spell = useTimelineVar(tl, "pref:spell", false);
  const ruler = useTimelineVar(tl, "pref:ruler", false);
  const theme = useTimelineVar<ThemeId>(tl, "prefTheme", "simple-light");
  const menu = useTimelineVar(tl, "prefMenu", false);
  const P = PREFERENCES;
  const row = "flex min-h-[48px] items-center gap-[12px] border-b border-[#F0F1F4] py-[8px]";
  const label = (t: { label: string; hint: string }) => (
    <span className="flex-1 leading-[14px]">
      <span className="block text-[10.5px] font-medium text-[#1f2430]">{t.label}</span>
      <span className="block text-[9px] text-[#6b7280]">{t.hint}</span>
    </span>
  );
  return (
    <SDialog open={open} width={440} hook="preferences-dialog">
      <DialogTitle id="preferences">{P.title}</DialogTitle>
      <div className="px-[24px] pb-[20px] pt-[6px]">
        <div data-tl="pref-spell" onClick={() => tl.setVar("pref:spell", !spell)} className={`${row} cursor-default`}>
          {label(P.spellCheck)}
          <Switch on={spell} />
        </div>
        <div data-tl="pref-ruler" onClick={() => tl.setVar("pref:ruler", !ruler)} className={`${row} cursor-default`}>
          {label(P.rulerOnOpen)}
          <Switch on={ruler} />
        </div>
        <div className={`${row} border-b-0`}>
          {label(P.defaultTheme)}
          <div className="relative">
            <span
              data-tl="pref-theme"
              onClick={() => tl.setVar("prefMenu", !menu)}
              className="flex h-[28px] w-[118px] items-center justify-between rounded-[6px] border border-[#DADCE0] px-[9px] text-[10px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F6F7F9]"
            >
              {THEMES.find((t) => t.id === theme)?.label}
              <Icon name="chevronDown" size={9} />
            </span>
            <div className={`absolute right-0 top-[31px] z-10 w-[118px] rounded-[8px] border border-[#E6E8EC] bg-white py-[4px] shadow-[0_8px_26px_-6px_rgba(17,24,39,0.25)] transition-opacity duration-150 ${menu ? "opacity-100" : "pointer-events-none opacity-0"}`}>
              {THEMES.map((t) => (
                <div
                  key={t.id}
                  data-tl={`pref-theme-${t.id}`}
                  onClick={() => {
                    tl.setVar("prefTheme", t.id);
                    tl.setVar("prefMenu", false);
                  }}
                  className={`flex h-[24px] items-center gap-[6px] px-[10px] text-[10px] transition-colors data-[hover=true]:bg-[#F1F2F5] ${theme === t.id ? "text-[#1A73E8]" : "text-[#1f2430]"}`}
                >
                  <i className="block h-[9px] w-[9px] rounded-[2px] border border-[#D5D8E0]" style={{ background: t.swatch }} />
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[14px] flex justify-end gap-[8px]">
          <span onClick={() => tl.setVar("dialog", "")}>
            <GhostButton hook="pref-cancel">{P.cancel}</GhostButton>
          </span>
          <span onClick={() => savePreferences(tl)}>
            <PrimaryButton hook="pref-save">{P.save}</PrimaryButton>
          </span>
        </div>
      </div>
    </SDialog>
  );
}

/**
 * Slideshow > Presentation display options: which screen the show opens on, and the laser pointer switch. Scene variables: `dialog` =
 * "displayOptions", `displayMonitor` (screen1 | screen2) and `laser`. The recording shows only the menu row, so the panel is built from the
 * brief. Hooks: display-options-dialog, disp-monitor-<id>, disp-laser, disp-done, display-options-close.
 */
export function DisplayOptionsDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "displayOptions";
  const monitor = useTimelineVar(tl, "displayMonitor", "screen1");
  const laser = useTimelineVar(tl, "laser", false);
  const D = DISPLAY_OPTIONS;
  return (
    <SDialog open={open} width={420} hook="display-options-dialog">
      <DialogTitle id="display-options">{D.title}</DialogTitle>
      <div className="px-[24px] pb-[20px] pt-[8px]">
        <p className="mb-[8px] text-[9.5px] font-medium text-[#5F6368]">{D.monitorLabel}</p>
        <div className="space-y-[6px]">
          {D.monitors.map((m) => (
            <div
              key={m.id}
              data-tl={`disp-monitor-${m.id}`}
              onClick={() => tl.setVar("displayMonitor", m.id)}
              className={`flex h-[36px] items-center gap-[10px] rounded-[8px] border px-[12px] text-[10.5px] transition-[border-color,background] data-[hover=true]:bg-[#F6F7F9] ${monitor === m.id ? "border-[#1A73E8] bg-[#F4F8FE]" : "border-[#E3E6EC]"}`}
            >
              <Icon name="slMonitor" size={14} className="text-[#4b5060]" />
              <span className="flex-1">{m.label}</span>
              <span className={`flex h-[14px] w-[14px] items-center justify-center rounded-full border-2 ${monitor === m.id ? "border-[#1A73E8]" : "border-[#9AA0A6]"}`}>
                {monitor === m.id && <i className="block h-[6px] w-[6px] rounded-full bg-[#1A73E8]" />}
              </span>
            </div>
          ))}
        </div>
        <div data-tl="disp-laser" onClick={() => tl.setVar("laser", !laser)} className="mt-[14px] flex min-h-[44px] items-center gap-[12px] border-t border-[#F0F1F4] pt-[10px]">
          <span className="flex-1 leading-[14px]">
            <span className="block text-[10.5px] font-medium text-[#1f2430]">{D.laser.label}</span>
            <span className="block text-[9px] text-[#6b7280]">{D.laser.hint}</span>
          </span>
          <Switch on={laser} />
        </div>
        <div className="mt-[14px] flex justify-end">
          <span onClick={() => tl.setVar("dialog", "")}>
            <PrimaryButton hook="disp-done">{D.done}</PrimaryButton>
          </span>
        </div>
      </div>
    </SDialog>
  );
}

/**
 * Meeting icon > Use a meeting code: "Have a meeting code?" with a text box (field `meetcode`), Cancel and Continue. Scene variable `dialog` =
 * "meetCode". Continue closes it and a toast says the (sample) meeting is joining. Hooks: meeting-code-dialog, field-meetcode, meet-continue,
 * meet-cancel, meeting-code-close.
 */
export function MeetingCodeDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "meetCode";
  const code = useTimelineVar(tl, "field:meetcode", "");
  const D = MEETING.codeDialog;
  return (
    <SDialog open={open} width={400} hook="meeting-code-dialog">
      <DialogTitle id="meeting-code">{D.title}</DialogTitle>
      <div className="px-[24px] pb-[20px] pt-[6px]">
        <p className="mb-[10px] text-[10px] leading-[14px] text-[#6b7280]">{D.hint}</p>
        <SField tl={tl} id="meetcode" placeholder={D.placeholder} />
        <div className="mt-[18px] flex justify-end gap-[8px]">
          <span onClick={() => tl.setVar("dialog", "")}>
            <GhostButton hook="meet-cancel">{D.cancel}</GhostButton>
          </span>
          <span
            onClick={() => {
              if (!code) return;
              tl.setVar("dialog", "");
              showDocToast(tl, MEETING.joinToast, "success", 3200);
            }}
          >
            <PrimaryButton hook="meet-continue" className={code ? "" : "opacity-50"}>
              {D.continue}
            </PrimaryButton>
          </span>
        </div>
      </div>
    </SDialog>
  );
}
