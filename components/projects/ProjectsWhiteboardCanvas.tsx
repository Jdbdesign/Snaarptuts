"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ArrowLeft,
  MousePointer,
  Hand,
  Square,
  Circle as CircleIcon,
  Diamond,
  MoveRight,
  Pencil,
  Type,
  StickyNote,
  Image as ImageIcon,
  Undo2,
  Redo2,
  Minus,
  Plus,
  Maximize2,
  Edit2,
} from "lucide-react";
import { PROJECTS_URLS, type WhiteboardItem } from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsWhiteboardCanvas({ tl }: Props) {
  const activeBoardId = useTimelineVar<string | null>(
    tl,
    "activeWhiteboardId",
    "wb-sales"
  );
  const whiteboards = useTimelineVar<WhiteboardItem[]>(
    tl,
    "whiteboardsList",
    []
  );
  const activeTool = useTimelineVar<string>(tl, "wbActiveTool", "select");
  const activeTooltip = useTimelineVar<string | null>(
    tl,
    "wbActiveTooltip",
    null
  );
  const selectedShapeId = useTimelineVar<string | null>(
    tl,
    "wbSelectedShapeId",
    null
  );
  const textEditing = useTimelineVar<boolean>(tl, "wbTextEditing", false);
  const textValue = useTimelineVar<string>(tl, "wbTextValue", "");
  const hasDrawnDiamond1 = useTimelineVar<boolean>(
    tl,
    "hasDrawnDiamond1",
    false
  );
  const hasDrawnDiamond2 = useTimelineVar<boolean>(
    tl,
    "hasDrawnDiamond2",
    false
  );
  const hasDrawnArrow = useTimelineVar<boolean>(tl, "hasDrawnArrow", false);
  const hasPlacedText = useTimelineVar<boolean>(tl, "hasPlacedText", false);
  const isDraggingShape = useTimelineVar<boolean>(
    tl,
    "isDraggingWbShape",
    false
  );
  const dragPos = useTimelineVar<{ x: number; y: number } | null>(
    tl,
    "dragCursorPos",
    null
  );

  const currentBoard = whiteboards.find((w) => w.id === activeBoardId);
  const title = currentBoard ? currentBoard.title : "Whiteboard";
  const isSalesBoard = activeBoardId === "wb-sales";
  const isResearchBoard =
    activeBoardId === "wb-research" || title === "Research Product";

  const handleBack = () => {
    tl.setVar("projectsView", "whiteboards");
    tl.setUrl(PROJECTS_URLS.whiteboards);
  };

  const handleSave = () => {
    pushProjectsToast(tl, "Whiteboard saved");
  };

  return (
    <div
      data-tl="whiteboard-canvas-root"
      className="relative w-full h-full flex flex-col font-sans select-none overflow-hidden bg-[#FAF9FD]"
    >
      {/* 1. Canvas Top Bar */}
      <header
        data-tl="wb-canvas-header"
        className="h-12 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 flex items-center justify-between shrink-0 z-20"
      >
        {/* Left: Back button + Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="wb-back-btn"
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to whiteboards</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <h2
              data-tl="wb-canvas-title"
              className="text-xs font-bold text-gray-900"
            >
              {title}
            </h2>
            <Edit2 className="w-3 h-3 text-gray-400" />
          </div>
        </div>

        {/* Right: Online presence badge + Save button */}
        <div className="flex items-center gap-3">
          <div
            data-tl="wb-online-badge"
            className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1 text-[11px] font-semibold text-gray-600 shadow-2xs"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="w-4 h-4 rounded-full bg-[#7014D9] text-white flex items-center justify-center text-[8px] font-bold">
              J
            </div>
            <span>1 online</span>
          </div>

          <button
            type="button"
            data-tl="wb-save-btn"
            onClick={handleSave}
            className="bg-[#7014D9] hover:bg-[#5E10B7] text-white font-semibold text-xs px-4 py-1.5 rounded-xl shadow-xs transition-colors"
          >
            Save
          </button>
        </div>
      </header>

      {/* 2. Canvas Area */}
      <div
        data-tl="wb-canvas-surface"
        onClick={() => {
          if (activeTool === "select") {
            tl.setVar("wbSelectedShapeId", null);
          }
        }}
        className="flex-1 relative overflow-hidden bg-dot-pattern cursor-default"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D1D5DB 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* ============================================================ */}
        {/* Step 16: Sales & Marketing Canvas Content                    */}
        {/* ============================================================ */}
        {isSalesBoard && (
          <div className="absolute inset-0">
            {/* Rectangle shape */}
            <div
              data-tl="wb-shape-rect-1"
              style={{ left: "28%", top: "25%", width: "160px", height: "110px" }}
              className="absolute border-2 border-gray-400 bg-white/70 rounded-lg shadow-sm"
            />

            {/* Circle shape */}
            <div
              data-tl="wb-shape-circle-1"
              onClick={(e) => {
                e.stopPropagation();
                tl.setVar("wbSelectedShapeId", "circle-1");
              }}
              style={{ left: "44%", top: "32%", width: "130px", height: "130px" }}
              className="absolute border-2 border-gray-400 bg-white/70 rounded-full shadow-sm cursor-pointer hover:border-purple-400 transition-colors"
            >
              {/* Selection Box on Circle */}
              {selectedShapeId === "circle-1" && (
                <div
                  data-tl="wb-selection-box"
                  className="absolute -inset-2 border-2 border-blue-500 rounded-full pointer-events-none"
                >
                  {/* Corner & side handles */}
                  <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -top-1 -left-1 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -top-1 -right-1 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -bottom-1 -left-1 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -bottom-1 -right-1 rounded-sm" />
                </div>
              )}
            </div>

            {/* Yellow Sticky Note */}
            <div
              data-tl="wb-shape-sticky-1"
              style={{ left: "60%", top: "28%", width: "130px", height: "130px" }}
              className="absolute bg-amber-100 border border-amber-200 rounded-md shadow-md p-3 text-xs text-amber-900 font-sans leading-relaxed"
            >
              Double-click to edit
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* Step 17: Research Product Canvas Content (Flow Drawing)      */}
        {/* ============================================================ */}
        {isResearchBoard && (
          <div className="absolute inset-0">
            {/* Diamond 1 */}
            {hasDrawnDiamond1 && (
              <div
                data-tl="wb-shape-diamond-1"
                style={{
                  left: "32%",
                  top: "35%",
                  width: "110px",
                  height: "110px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  tl.setVar("wbSelectedShapeId", "diamond-1");
                }}
                className="absolute border-2 border-[#7014D9] bg-purple-50/80 rotate-45 flex items-center justify-center shadow-sm cursor-pointer"
              >
                {/* Text Label on Diamond 1 */}
                {(hasPlacedText || textEditing) && (
                  <div
                    data-tl="wb-shape-text-1"
                    className="-rotate-45 text-center font-bold text-xs text-[#7014D9]"
                  >
                    {textEditing ? (
                      <input
                        type="text"
                        autoFocus
                        data-tl="wb-text-editor-input"
                        value={textValue}
                        onChange={(e) => tl.setVar("wbTextValue", e.target.value)}
                        className="bg-transparent border-none text-center font-bold text-xs text-[#7014D9] focus:outline-none w-24"
                      />
                    ) : (
                      textValue || "Home Screen"
                    )}
                  </div>
                )}

                {/* Selection Box */}
                {selectedShapeId === "diamond-1" && !textEditing && (
                  <div
                    data-tl="wb-selection-box"
                    className="absolute -inset-2 border-2 border-blue-500 pointer-events-none"
                  >
                    <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -top-1 -left-1 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -top-1 -right-1 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -bottom-1 -left-1 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -bottom-1 -right-1 rounded-sm" />
                  </div>
                )}
              </div>
            )}

            {/* Connecting Arrow between Diamond 1 and Diamond 2 */}
            {hasDrawnArrow && (
              <div
                data-tl="wb-shape-arrow-1"
                style={{
                  left: "44%",
                  top: "42%",
                  width: "130px",
                  height: "2px",
                }}
                className="absolute bg-[#7014D9] flex items-center"
              >
                {/* Arrowhead pointing right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-[#7014D9]" />
              </div>
            )}

            {/* Diamond 2 */}
            {hasDrawnDiamond2 && (
              <div
                data-tl="wb-shape-diamond-2"
                style={{
                  left: "56%",
                  top: "35%",
                  width: "110px",
                  height: "110px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  tl.setVar("wbSelectedShapeId", "diamond-2");
                }}
                className="absolute border-2 border-[#7014D9] bg-purple-50/80 rotate-45 flex items-center justify-center shadow-sm cursor-pointer"
              >
                {selectedShapeId === "diamond-2" && (
                  <div
                    data-tl="wb-selection-box"
                    className="absolute -inset-2 border-2 border-blue-500 pointer-events-none"
                  >
                    <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -top-1 -left-1 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -top-1 -right-1 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -bottom-1 -left-1 rounded-sm" />
                    <div className="w-2.5 h-2.5 bg-white border-2 border-blue-500 absolute -bottom-1 -right-1 rounded-sm" />
                  </div>
                )}
              </div>
            )}

            {/* Drag preview while drawing diamond */}
            {isDraggingShape && dragPos && (
              <div
                className="fixed pointer-events-none z-50 border-2 border-dashed border-[#7014D9] bg-purple-100/50 rotate-45 w-24 h-24 -translate-x-1/2 -translate-y-1/2 shadow-lg"
                style={{ left: dragPos.x, top: dragPos.y }}
              />
            )}
          </div>
        )}
      </div>

      {/* 3. Floating Bottom Toolbar */}
      <div
        data-tl="wb-floating-toolbar"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl shadow-xl px-2.5 py-1.5 flex items-center gap-1 z-30 select-none max-w-[95vw] overflow-x-auto no-scrollbar"
      >
        {/* Select */}
        <button
          type="button"
          data-tl="wb-tool-select"
          onClick={() => tl.setVar("wbActiveTool", "select")}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            activeTool === "select"
              ? "bg-[#7014D9] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <MousePointer className="w-4 h-4" />
        </button>

        {/* Hand */}
        <button
          type="button"
          data-tl="wb-tool-hand"
          onClick={() => tl.setVar("wbActiveTool", "hand")}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            activeTool === "hand"
              ? "bg-[#7014D9] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Hand className="w-4 h-4" />
        </button>

        {/* Rectangle */}
        <button
          type="button"
          data-tl="wb-tool-rect"
          onClick={() => tl.setVar("wbActiveTool", "rect")}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            activeTool === "rect"
              ? "bg-[#7014D9] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Square className="w-4 h-4" />
        </button>

        {/* Circle */}
        <button
          type="button"
          data-tl="wb-tool-circle"
          onClick={() => tl.setVar("wbActiveTool", "circle")}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            activeTool === "circle"
              ? "bg-[#7014D9] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <CircleIcon className="w-4 h-4" />
        </button>

        {/* Diamond */}
        <div className="relative">
          <button
            type="button"
            data-tl="wb-tool-diamond"
            onClick={() => tl.setVar("wbActiveTool", "diamond")}
            onMouseEnter={() => tl.setVar("wbActiveTooltip", "diamond")}
            onMouseLeave={() => tl.setVar("wbActiveTooltip", null)}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              activeTool === "diamond"
                ? "bg-[#7014D9] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Diamond className="w-4 h-4" />
          </button>
          {activeTooltip === "diamond" && (
            <div
              data-tl="wb-tooltip-diamond"
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] font-semibold rounded-md shadow-md whitespace-nowrap animate-in fade-in"
            >
              Diamond (D)
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="relative">
          <button
            type="button"
            data-tl="wb-tool-arrow"
            onClick={() => tl.setVar("wbActiveTool", "arrow")}
            onMouseEnter={() => tl.setVar("wbActiveTooltip", "arrow")}
            onMouseLeave={() => tl.setVar("wbActiveTooltip", null)}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              activeTool === "arrow"
                ? "bg-[#7014D9] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <MoveRight className="w-4 h-4" />
          </button>
          {activeTooltip === "arrow" && (
            <div
              data-tl="wb-tooltip-arrow"
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] font-semibold rounded-md shadow-md whitespace-nowrap animate-in fade-in"
            >
              Arrow (A)
            </div>
          )}
        </div>

        {/* Pen */}
        <button
          type="button"
          data-tl="wb-tool-pen"
          onClick={() => tl.setVar("wbActiveTool", "pen")}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            activeTool === "pen"
              ? "bg-[#7014D9] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Pencil className="w-4 h-4" />
        </button>

        {/* Text */}
        <div className="relative">
          <button
            type="button"
            data-tl="wb-tool-text"
            onClick={() => tl.setVar("wbActiveTool", "text")}
            onMouseEnter={() => tl.setVar("wbActiveTooltip", "text")}
            onMouseLeave={() => tl.setVar("wbActiveTooltip", null)}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              activeTool === "text"
                ? "bg-[#7014D9] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Type className="w-4 h-4" />
          </button>
          {activeTooltip === "text" && (
            <div
              data-tl="wb-tooltip-text"
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] font-semibold rounded-md shadow-md whitespace-nowrap animate-in fade-in"
            >
              Text (T)
            </div>
          )}
        </div>

        {/* Sticky note */}
        <button
          type="button"
          data-tl="wb-tool-sticky"
          onClick={() => tl.setVar("wbActiveTool", "sticky")}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            activeTool === "sticky"
              ? "bg-[#7014D9] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <StickyNote className="w-4 h-4" />
        </button>

        {/* Image */}
        <button
          type="button"
          data-tl="wb-tool-image"
          className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        {/* Color Stroke Dot */}
        <div
          data-tl="wb-tool-color"
          className="w-7 h-7 flex items-center justify-center cursor-pointer"
        >
          <div className="w-4 h-4 rounded-full bg-[#7014D9] ring-2 ring-gray-200" />
        </div>

        {/* Fill Circle */}
        <div
          data-tl="wb-tool-fill"
          className="w-7 h-7 flex items-center justify-center cursor-pointer"
        >
          <div className="w-4 h-4 rounded-full bg-purple-100 border border-purple-300" />
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Undo */}
        <button
          type="button"
          data-tl="wb-tool-undo"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>

        {/* Redo */}
        <button
          type="button"
          data-tl="wb-tool-redo"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>

        {/* Zoom Controls */}
        <button
          type="button"
          data-tl="wb-tool-zoom-out"
          className="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          <Minus className="w-3 h-3" />
        </button>

        <span
          data-tl="wb-tool-zoom-level"
          className="text-[11px] font-bold text-gray-700 px-1"
        >
          100%
        </span>

        <button
          type="button"
          data-tl="wb-tool-zoom-in"
          className="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          <Plus className="w-3 h-3" />
        </button>

        {/* Fullscreen */}
        <button
          type="button"
          data-tl="wb-tool-fullscreen"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 ml-0.5"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
