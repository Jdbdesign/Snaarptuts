"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DialogTitle, GhostButton, PrimaryButton, SDialog } from "./parts";
import type { ChartEl, ChartKind } from "./slide-elements";
import { CHART_PANEL, IMAGE_PICKER } from "./slide-elements-data";
import { insertImage, setChartType } from "./slides-edit";

/**
 * Insert > Image: a simple in-app picker with three sample images (the recording shows the computer's file window, which is left out).
 * Scene variables: `dialog` = "insertImage" and `imagePick` (the chosen image id). The clicks do what they say: a card picks, Insert puts
 * the picture on the slide. Hooks: insert-image-dialog, img-pick-<id>, img-insert, img-cancel, insert-image-close.
 */
export function InsertImageDialog({ tl }: { tl: Timeline }) {
  const open = useTimelineVar<string>(tl, "dialog", "") === "insertImage";
  const pick = useTimelineVar<string>(tl, "imagePick", "");
  const D = IMAGE_PICKER;
  const close = () => {
    tl.setVar("dialog", "");
    tl.setVar("imagePick", "");
  };
  return (
    <SDialog open={open} width={540} hook="insert-image-dialog">
      <DialogTitle id="insert-image">{D.title}</DialogTitle>
      <div className="px-[24px] pb-[20px] pt-[6px]">
        <p className="text-[10px] text-[#6b7280]">{D.intro}</p>
        <div className="mt-[12px] grid grid-cols-3 gap-[12px]">
          {D.images.map((img) => (
            <div
              key={img.id}
              data-tl={`img-pick-${img.id}`}
              onClick={() => tl.setVar("imagePick", img.id)}
              className={`overflow-hidden rounded-[8px] border-2 bg-white transition-[border-color,box-shadow] duration-150 data-[hover=true]:border-[#9DB7FF] ${pick === img.id ? "border-[#1A73E8] shadow-[0_0_0_2px_rgba(26,115,232,0.18)]" : "border-[#E3E6EC]"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.name} draggable={false} className="block aspect-[3/2] w-full object-cover" />
              <div className="flex items-center justify-between px-[8px] py-[6px] text-[9.5px] text-[#1f2430]">
                {img.name}
                {pick === img.id && <Icon name="check" size={10} className="text-[#1A73E8]" />}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[18px] flex justify-end gap-[8px]">
          <span onClick={close}>
            <GhostButton hook="img-cancel">{D.cancel}</GhostButton>
          </span>
          <span
            onClick={() => {
              const chosen = D.images.find((i) => i.id === pick);
              if (!chosen) return;
              close();
              insertImage(tl, chosen.id, chosen.name);
            }}
          >
            <PrimaryButton hook="img-insert" className={pick ? "" : "opacity-50"}>
              {D.insert}
            </PrimaryButton>
          </span>
        </div>
      </div>
    </SDialog>
  );
}

/**
 * The "Chart properties" panel on the right while a chart is selected: its title, a Bar / Line / Pie switch and the data. The switch
 * really changes the chart. Hooks: chart-panel, chart-title-field, chart-type-<id>, chart-data-row-<n>.
 */
export function ChartPanel({ tl, chart }: { tl: Timeline; chart: ChartEl }) {
  const P = CHART_PANEL;
  return (
    <div data-tl="chart-panel" className="absolute inset-0 overflow-hidden bg-white">
      <h3 className="h-[30px] border-b border-[#F0F1F4] px-[12px] text-[10.5px] font-semibold leading-[30px] text-[#1f2430]">{P.title}</h3>
      <div className="space-y-[11px] px-[12px] pt-[10px]">
        <div>
          <p className="mb-[4px] text-[8.5px] font-medium text-[#5F6368]">{P.titleLabel}</p>
          <div data-tl="chart-title-field" className="flex h-[26px] items-center rounded-[6px] border border-[#DADCE0] px-[8px] text-[9.5px] text-[#1f2430]">
            <span className="truncate">{chart.title}</span>
          </div>
        </div>
        <div>
          <p className="mb-[4px] text-[8.5px] font-medium text-[#5F6368]">{P.typeLabel}</p>
          <div className="flex overflow-hidden rounded-[6px] border border-[#DADCE0]">
            {P.types.map((t, i) => (
              <span
                key={t.id}
                data-tl={`chart-type-${t.id}`}
                onClick={() => setChartType(tl, t.id as ChartKind)}
                className={`flex h-[26px] flex-1 items-center justify-center text-[9.5px] transition-[background,transform] data-[pressed=true]:scale-95 data-[hover=true]:bg-[#F1F2F5] ${i > 0 ? "border-l border-[#DADCE0]" : ""} ${
                  chart.chart === t.id ? "bg-[#DCE9FC] font-medium text-[#1A5FD0]" : "text-[#1f2430]"
                }`}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-[4px] text-[8.5px] font-medium text-[#5F6368]">{P.dataLabel}</p>
          <div className="overflow-hidden rounded-[6px] border border-[#E3E6EC] text-[9px]">
            <div className="flex h-[20px] items-center bg-[#F5F6F9] font-medium text-[#6b7280]">
              <span className="w-1/2 px-[8px]">{P.columns[0]}</span>
              <span className="w-1/2 px-[8px]">{P.columns[1]}</span>
            </div>
            {chart.data.map((d, i) => (
              <div key={d.label} data-tl={`chart-data-row-${i}`} className="flex h-[19px] items-center border-t border-[#F0F1F4] text-[#1f2430]">
                <span className="w-1/2 px-[8px]">{d.label}</span>
                <span className="w-1/2 px-[8px]">{d.value.toLocaleString("en-GB")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
