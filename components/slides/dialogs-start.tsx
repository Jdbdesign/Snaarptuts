"use client";

import { Icon, ProductLogo } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DialogTitle, GhostButton, SDialog, Spinner } from "./parts";
import { HOME_TEMPLATES, IMPORT_DIALOG, OPEN_DIALOG, START_DIALOG, TEMPLATES_DIALOG } from "./slides-data";

/** The "Let's start creating" chooser. Hooks: start-dialog, start-card-<id>, start-close. */
export function StartDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "start";
  return (
    <SDialog open={open} width={540} hook="start-dialog">
      <div className="px-[22px] pb-[22px] pt-[18px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[7px] text-[11.5px]">
            <ProductLogo name="presentation" size={20} className="rounded-[5px]" />
            <span className="text-[#6b7280]">{START_DIALOG.brand}</span>
            <span className="font-medium text-[#2F62C8]">{START_DIALOG.hello}</span>
            <span className="text-[#1f2430]">{START_DIALOG.lead}</span>
          </div>
          <span data-tl="start-close" className="flex h-[22px] w-[22px] items-center justify-center text-[#4b5060]"><Icon name="x" size={12} /></span>
        </div>
        <div className="mt-[16px] grid grid-cols-3 gap-[9px]">
          {START_DIALOG.cards.map((c) => (
            <div
              key={c.id}
              data-tl={`start-card-${c.id}`}
              className={`group overflow-hidden rounded-[10px] border border-[#E6E8EC] bg-white transition-[border-color,box-shadow] data-[hover=true]:border-[#2B6FEB] data-[hover=true]:shadow-[0_0_0_1px_#2B6FEB] ${c.faded ? "opacity-45" : ""}`}
            >
              <CardArt id={c.id} />
              <div className={`px-[10px] pb-[10px] pt-[9px] ${c.id === "blank" ? "border-t border-[#EEEEF1]" : ""}`}>
                <p className="flex items-center gap-[5px] text-[10px] font-medium text-[#1f2430] group-data-[hover=true]:text-[#2F62C8]">
                  {c.title}
                  {c.badge && <span className="rounded-[3px] bg-[#9DBFF5] px-[4px] py-[1px] text-[6.5px] font-semibold text-white">{c.badge}</span>}
                </p>
                {c.text && <p className="mt-[4px] text-[8.5px] leading-[12px] text-[#6b7280]">{c.text}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SDialog>
  );
}

function CardArt({ id }: { id: string }) {
  const frame = "flex h-[78px] items-center justify-center";
  if (id === "slides")
    return (
      <div className={frame} style={{ background: "linear-gradient(135deg,#EE8F89,#F0A39E)" }}>
        <span className="rounded-[6px] bg-white/25 px-[12px] py-[6px] text-[9px] font-bold text-white">Product Launch</span>
      </div>
    );
  if (id === "images")
    return (
      <div className={`${frame} bg-[#FFF8E6]`}>
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden><path d="M5 17c6 3 13-1 14-9-4 3-9 3-14 9Z" fill="#F5C242" /></svg>
      </div>
    );
  if (id === "infographics")
    return (
      <div className={`${frame} items-end gap-[4px] bg-[#EEF7F0] pb-[17px]`}>
        {[["#7BC58A", 30], ["#F5C242", 22], ["#6E9BEE", 28], ["#E97C74", 17]].map(([c, h]) => (
          <i key={String(c)} className="block w-[8px] rounded-[2px]" style={{ background: String(c), height: Number(h) }} />
        ))}
      </div>
    );
  if (id === "templates")
    return (
      <div className={frame} style={{ background: "linear-gradient(135deg,#E3F0FD,#BFDCFA)" }}>
        <div className="grid grid-cols-2 gap-[3px]">
          {["#1E6FE0", "#4285F4", "#2FA55A", "#F6BC04"].map((c) => (
            <i key={c} className="block h-[16px] w-[26px] rounded-[2px]" style={{ background: c }} />
          ))}
        </div>
      </div>
    );
  if (id === "import")
    return (
      <div className={`${frame} bg-[#EEF0F4]`}>
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-[#374151]"><Icon name="upload" size={14} /></span>
      </div>
    );
  return (
    <div className={`${frame} bg-white`}>
      <Icon name="plus" size={20} className="text-[#374151]" />
    </div>
  );
}

/** The template chooser (File > New > From template). Hooks: templates-dialog, templates-card-<id>, templates-close. */
export function TemplatesDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "templates";
  return (
    <SDialog open={open} width={540} hook="templates-dialog">
      <DialogTitle id="templates">{TEMPLATES_DIALOG.title}</DialogTitle>
      <p className="px-[24px] pt-[3px] text-[10px] text-[#6b7280]">{TEMPLATES_DIALOG.intro}</p>
      <div className="grid grid-cols-3 gap-[10px] px-[24px] pb-[16px] pt-[14px]">
        {HOME_TEMPLATES.map((t) => (
          <div key={t.id} data-tl={`templates-card-${t.id}`} className="group">
            <div
              className="flex h-[70px] flex-col items-center justify-center rounded-[6px] border border-[#E5E7EB] transition-shadow group-data-[hover=true]:shadow-[0_0_0_2px_#7B4DF0]"
              style={{ background: t.bg, color: t.fg }}
            >
              <span className="text-[10px] font-bold" style={{ fontFamily: "Georgia, serif" }}>{t.name}</span>
              <i className="mt-[4px] block h-[2px] w-[24px] rounded-full" style={{ background: t.accent }} />
            </div>
            <p className="mt-[5px] text-center text-[9.5px] text-[#1f2430]">{t.name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end border-t border-[#EEEEF1] px-[24px] py-[12px]">
        <GhostButton hook="templates-cancel">{TEMPLATES_DIALOG.cancel}</GhostButton>
      </div>
    </SDialog>
  );
}

/**
 * File > Open: six tabs (scene variable `openTab`; `openLoading` shows the spinner on Recent; `openPicked` marks a file).
 * Hooks: open-dialog, open-tab-<id>, open-file-<n>, open-connect, open-select-device, open-browse, open-close.
 */
export function OpenDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "open";
  const tab = useTimelineVar<string>(tl, "openTab", "recent");
  const loading = useTimelineVar(tl, "openLoading", false);
  const picked = useTimelineVar(tl, "openPicked", -1);
  return (
    <SDialog open={open} width={540} hook="open-dialog">
      <DialogTitle id="open" pad="px-[22px] pt-[17px]">{OPEN_DIALOG.title}</DialogTitle>
      <div className="mt-[10px] flex border-b border-[#EEEEF1] px-[10px]">
        {OPEN_DIALOG.tabs.map((t) => (
          <span
            key={t.id}
            data-tl={`open-tab-${t.id}`}
            className={`flex h-[34px] items-center gap-[5px] border-b-2 px-[11px] text-[9.5px] transition-colors ${
              tab === t.id ? "border-[#1A73E8] font-medium text-[#1A73E8]" : "border-transparent text-[#4b5060] data-[hover=true]:text-[#1f2430]"
            }`}
          >
            <Icon name={t.icon} size={11} />
            {t.label}
          </span>
        ))}
      </div>
      <div className="h-[212px] overflow-hidden px-[22px]">
        {tab === "recent" &&
          (loading ? (
            <div className="flex h-full flex-col items-center justify-center gap-[7px] text-[9px] text-[#6b7280]">
              <Spinner size={20} />
              {OPEN_DIALOG.loading}
            </div>
          ) : (
            <ul className="pt-[10px]">
              {OPEN_DIALOG.files.map((f, i) => (
                <li
                  key={f.name}
                  data-tl={`open-file-${i + 1}`}
                  className={`flex h-[44px] items-center gap-[11px] rounded-[6px] border-b border-[#F0F1F4] px-[6px] transition-colors data-[hover=true]:bg-[#F5F8FE] ${picked === i ? "bg-[#E8F0FE]" : ""}`}
                >
                  <span className="text-[#2B6FEB]"><Icon name="docFile" size={15} /></span>
                  <span className="leading-[13px]">
                    <span className="block text-[10px] font-medium text-[#1f2430]">{f.name}</span>
                    <span className="block text-[8.5px] text-[#6b7280]">{f.opened}</span>
                  </span>
                </li>
              ))}
            </ul>
          ))}
        {tab === "drive" && (
          <Empty icon="slDrive" heading={OPEN_DIALOG.drive.heading} note={OPEN_DIALOG.drive.note}>
            <span data-tl="open-connect" className="mt-[11px] flex h-[28px] items-center rounded-[5px] bg-[#7FA8EE] px-[15px] text-[10px] font-medium text-white">{OPEN_DIALOG.drive.button}</span>
          </Empty>
        )}
        {tab === "shared" && <Empty icon="users" heading={OPEN_DIALOG.shared.heading} note={OPEN_DIALOG.shared.note} />}
        {tab === "starred" && <Empty icon="star" heading={OPEN_DIALOG.starred.heading} note={OPEN_DIALOG.starred.note} />}
        {tab === "computer" && (
          <Empty icon="slMonitor" heading={OPEN_DIALOG.computer.heading}>
            <span data-tl="open-select-device" className="mt-[11px] flex h-[28px] items-center rounded-[5px] bg-[#1A73E8] px-[15px] text-[10px] font-medium text-white">{OPEN_DIALOG.computer.button}</span>
          </Empty>
        )}
        {tab === "upload" && (
          <div className="mt-[10px] flex h-[190px] flex-col items-center justify-center rounded-[6px] border border-dashed border-[#C9CDD4] text-[9px] text-[#4b5060]">
            <Icon name="upload" size={20} className="text-[#6b7280]" />
            <p className="mt-[6px] font-medium">{OPEN_DIALOG.upload.drag}</p>
            <p className="mt-[3px] text-[#6b7280]">{OPEN_DIALOG.upload.or}</p>
            <span data-tl="open-browse" className="mt-[7px] flex h-[24px] items-center rounded-[4px] bg-[#1A73E8] px-[13px] text-[9.5px] font-medium text-white">{OPEN_DIALOG.upload.browse}</span>
          </div>
        )}
      </div>
    </SDialog>
  );
}

function Empty({ icon, heading, note, children }: { icon: "slDrive" | "users" | "star" | "slMonitor"; heading: string; note?: string; children?: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <Icon name={icon} size={30} className="text-[#C3C8D0]" />
      <p className="mt-[10px] text-[9.5px] text-[#1f2430]">{heading}</p>
      {children}
      {note && <p className="mt-[8px] text-[8.5px] text-[#80868B]">{note}</p>}
    </div>
  );
}

/**
 * File > Import slides. Scene variables: `importTab` (from | upload) and `importPhase` (idle | chosen | uploading | processing | complete).
 * Hooks: import-dialog, import-tab-<id>, import-zone, import-browse, import-file, import-footer, import-close.
 */
export function ImportDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "import";
  const tab = useTimelineVar<string>(tl, "importTab", "from");
  const phase = useTimelineVar<string>(tl, "importPhase", "idle");
  const D = IMPORT_DIALOG;
  const busy = phase === "uploading" || phase === "processing" || phase === "complete";
  return (
    <SDialog open={open} width={520} hook="import-dialog">
      <DialogTitle id="import" pad="px-[22px] pt-[17px]">{D.title}</DialogTitle>
      <div className="mt-[10px] flex border-b border-[#EEEEF1] px-[14px]">
        {D.tabs.map((t) => (
          <span
            key={t.id}
            data-tl={`import-tab-${t.id}`}
            className={`flex h-[32px] items-center border-b-2 px-[10px] text-[9.5px] transition-colors ${
              tab === t.id ? "border-[#1A73E8] font-medium text-[#1A73E8]" : "border-transparent text-[#4b5060] data-[hover=true]:text-[#1f2430]"
            }`}
          >
            {t.label}
          </span>
        ))}
      </div>

      {tab === "from" && (
        <div className="flex h-[180px] text-[9.5px] text-[#4b5060]">
          <div className="flex w-1/2 items-center justify-center border-r border-[#EEEEF1]">{D.noneFound}</div>
          <div className="flex w-1/2 items-center justify-center">{D.selectOne}</div>
        </div>
      )}

      {tab === "upload" && (
        <>
          {phase === "processing" ? (
            <div className="flex h-[134px] flex-col items-center justify-center px-[18px] text-center">
              <Spinner size={24} />
              <p className="mt-[10px] text-[9.5px] font-medium text-[#1f2430]">{D.processing}</p>
              <p className="mt-[3px] text-[8.5px] text-[#6b7280]">{D.processingNote}</p>
            </div>
          ) : (
            <div className="px-[18px] pb-[14px] pt-[16px]">
              <div
                data-tl="import-zone"
                className="flex h-[104px] flex-col items-center justify-center rounded-[6px] border border-dashed border-[#C9CDD4] text-center transition-colors data-[hover=true]:border-[#1A73E8] data-[hover=true]:bg-[#F2F7FE]"
              >
                <Icon name="upload" size={20} className="text-[#6b7280]" />
                <p data-tl="import-browse" className="mt-[7px] text-[9px] font-medium text-[#1f2430]">{D.dropHere}</p>
                <p className="mt-[3px] text-[8px] text-[#80868B]">{D.supports}</p>
              </div>
              {(phase === "chosen" || phase === "uploading") && (
                <div data-tl="import-file" className="mt-[9px] flex h-[32px] items-center gap-[8px] rounded-[6px] border border-[#E3E5EA] bg-[#FAFBFC] px-[10px] text-[9.5px]">
                  <span className="text-[#D24726]"><Icon name="slFilePptx" size={15} /></span>
                  <span className="font-medium text-[#1f2430]">{D.file.name}</span>
                  <span className="ml-auto text-[#80868B]">{D.file.size}</span>
                </div>
              )}
            </div>
          )}
          {busy && (
            <div data-tl="import-footer" className="flex h-[30px] items-center gap-[7px] border-t border-[#EEEEF1] px-[18px] text-[9px] text-[#4b5060]">
              <Spinner size={10} />
              {phase === "uploading" && D.uploading(D.file.name)}
              {phase === "processing" && (
                <>
                  {D.importing} <span>{D.almost}</span>
                </>
              )}
              {phase === "complete" && D.complete}
            </div>
          )}
        </>
      )}
    </SDialog>
  );
}
