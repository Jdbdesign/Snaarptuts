import React, { useRef } from "react";
import {
  ArrowLeft,
  Columns,
  MousePointer,
  Move,
  Undo2,
  Redo2,
  Type,
  Edit,
  Eraser,
  EyeOff,
  Highlighter,
  Pencil,
  Image as ImageIcon,
  Circle,
  X as CrossIcon,
  Check as CheckIcon,
  PenTool,
  MessageSquare,
  Link as LinkIcon,
  Layout,
  Layers,
  Droplet,
  Share2,
  Languages,
  Stamp,
  Shapes,
  Square,
  ArrowRight,
  HelpCircle,
  Star,
} from "lucide-react";
import {
  EDITOR_TOOLS,
  type EditorToolId,
  STAMP_ITEMS,
  ANNOTATION_SHAPES,
} from "./pdf-data";
import { PdfSamplePage, type TextStyleState } from "./PdfSamplePage";
import { PdfRedactBanner } from "./PdfRedactBanner";
import { PdfPageLayoutPanel } from "./PdfPageLayoutPanel";
import { PdfWatermarkPanel } from "./PdfWatermarkPanel";

interface Props {
  editorPage: number;
  activeTool: EditorToolId;
  zoom: number;
  // Option bar states
  textStyle: TextStyleState;
  isRedactBannerOpen: boolean;
  highlightColor: string;
  highlightWidth: string;
  // Canvas states
  hasTextAdded: boolean;
  textInputVisible: boolean;
  textInputValue: string;
  isTextSelected: boolean;
  hasRedactions: boolean;
  hasHighlights: boolean;
  hasPencilBlack: boolean;
  hasPencilRed: boolean;
  hasImage: boolean;
  isImageSelected: boolean;
  hasEllipses: boolean;
  hasCross: boolean;
  hasCheck: boolean;
  hasDrawSig: boolean;
  hasImageSig: boolean;
  hasTypeSig: boolean;
  sigColor: string;
  // Annotations
  annotSubtool?: "stamps" | "highlight" | "pencil" | "shapes" | null;
  isStampsOpen?: boolean;
  selectedStamp?: string | null;
  hasApprovedStamp?: boolean;
  isShapesOpen?: boolean;
  selectedShape?: string | null;
  hasCheckShape?: boolean;
  hasCircleShape?: boolean;
  // Links & Layout
  linksViewMode?: "single" | "two-page";
  linksLineThickness?: number;
  isPageLayoutOpen?: boolean;
  pageLayoutMode?: "single" | "twopage";
  pageLayoutTransition?: "vertical" | "horizontal";
  pageRotation?: number;
  // Watermark
  isWatermarkOpen?: boolean;
  watermarkText?: string;
  watermarkOpacity?: number;
  watermarkRotation?: number;
  watermarkSize?: number;
  watermarkColor?: string;
  watermarkApplyTo?: "all" | "specific";
  hasWatermarkApplied?: boolean;
  // Event handlers
  onBackClick?: () => void;
  onDoneClick?: () => void;
  onSelectTool?: (tool: EditorToolId) => void;
  onSelectPage?: (page: number) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitWidth?: () => void;
  onTextStyleChange?: (style: Partial<TextStyleState>) => void;
  onHighlightColorChange?: (color: string) => void;
  onHighlightWidthChange?: (width: string) => void;
  onTextSpotClick?: () => void;
  onPlacedTextClick?: () => void;
  onDeleteImage?: () => void;
  onImageHandleDrag?: () => void;
  onCanvasClick?: (e: React.MouseEvent) => void;
  // Annotations handlers
  onToggleStamps?: () => void;
  onSelectStamp?: (stampId: string) => void;
  onToggleShapes?: () => void;
  onSelectShape?: (shapeId: string) => void;
  onSelectAnnotSubtool?: (subtool: "stamps" | "highlight" | "pencil" | "shapes") => void;
  onDeleteStamp?: () => void;
  // Links & Layout handlers
  onLinksViewModeChange?: (mode: "single" | "two-page") => void;
  onLinksLineThicknessChange?: (thickness: number) => void;
  onPageLayoutModeChange?: (mode: "single" | "twopage") => void;
  onPageLayoutTransitionChange?: (transition: "vertical" | "horizontal") => void;
  onRotateCCW?: () => void;
  onRotateCW?: () => void;
  onClosePageLayout?: () => void;
  // Watermark handlers
  onWatermarkTextChange?: (text: string) => void;
  onWatermarkOpacityChange?: (opacity: number) => void;
  onWatermarkRotationChange?: (rotation: number) => void;
  onSizeChange?: (size: number) => void;
  onWatermarkColorChange?: (color: string) => void;
  onWatermarkApplyToChange?: (applyTo: "all" | "specific") => void;
  onApplyWatermark?: () => void;
  onRemoveWatermark?: () => void;
  onCloseWatermark?: () => void;
}

export function PdfEditor({
  editorPage,
  activeTool,
  zoom,
  textStyle,
  isRedactBannerOpen,
  highlightColor,
  highlightWidth,
  hasTextAdded,
  textInputVisible,
  textInputValue,
  isTextSelected,
  hasRedactions,
  hasHighlights,
  hasPencilBlack,
  hasPencilRed,
  hasImage,
  isImageSelected,
  hasEllipses,
  hasCross,
  hasCheck,
  hasDrawSig,
  hasImageSig,
  hasTypeSig,
  sigColor,
  annotSubtool = null,
  isStampsOpen = false,
  selectedStamp = null,
  hasApprovedStamp = false,
  isShapesOpen = false,
  selectedShape = null,
  hasCheckShape = false,
  hasCircleShape = false,
  linksViewMode = "single",
  linksLineThickness = 2,
  isPageLayoutOpen = false,
  pageLayoutMode = "single",
  pageLayoutTransition = "vertical",
  pageRotation = 0,
  isWatermarkOpen = false,
  watermarkText = "",
  watermarkOpacity = 50,
  watermarkRotation = 45,
  watermarkSize = 48,
  watermarkColor = "#9CA3AF",
  watermarkApplyTo = "all",
  hasWatermarkApplied = false,
  onBackClick,
  onDoneClick,
  onSelectTool,
  onSelectPage,
  onPrevPage,
  onNextPage,
  onZoomIn,
  onZoomOut,
  onFitWidth,
  onTextStyleChange,
  onHighlightColorChange,
  onHighlightWidthChange,
  onTextSpotClick,
  onPlacedTextClick,
  onDeleteImage,
  onImageHandleDrag,
  onCanvasClick,
  onToggleStamps,
  onSelectStamp,
  onToggleShapes,
  onSelectShape,
  onSelectAnnotSubtool,
  onDeleteStamp,
  onLinksViewModeChange,
  onLinksLineThicknessChange,
  onPageLayoutModeChange,
  onPageLayoutTransitionChange,
  onRotateCCW,
  onRotateCW,
  onClosePageLayout,
  onWatermarkTextChange,
  onWatermarkOpacityChange,
  onWatermarkRotationChange,
  onSizeChange,
  onWatermarkColorChange,
  onWatermarkApplyToChange,
  onApplyWatermark,
  onRemoveWatermark,
  onCloseWatermark,
}: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const getToolIcon = (id: EditorToolId) => {
    switch (id) {
      case "pages": return <Columns className="w-4 h-4" />;
      case "select": return <MousePointer className="w-4 h-4" />;
      case "move": return <Move className="w-4 h-4" />;
      case "undo": return <Undo2 className="w-4 h-4" />;
      case "redo": return <Redo2 className="w-4 h-4" />;
      case "addText": return <Type className="w-4 h-4" />;
      case "editText": return <Edit className="w-4 h-4" />;
      case "eraser": return <Eraser className="w-4 h-4" />;
      case "redact": return <EyeOff className="w-4 h-4" />;
      case "highlight": return <Highlighter className="w-4 h-4" />;
      case "pencil": return <Pencil className="w-4 h-4" />;
      case "image": return <ImageIcon className="w-4 h-4" />;
      case "ellipse": return <Circle className="w-4 h-4" />;
      case "cross": return <CrossIcon className="w-4 h-4" />;
      case "check": return <CheckIcon className="w-4 h-4" />;
      case "sign": return <PenTool className="w-4 h-4" />;
      case "annotations": return <MessageSquare className="w-4 h-4" />;
      case "links": return <LinkIcon className="w-4 h-4" />;
      case "pageLayout": return <Layout className="w-4 h-4" />;
      case "managePages": return <Layers className="w-4 h-4" />;
      case "watermark": return <Droplet className="w-4 h-4" />;
      case "share": return <Share2 className="w-4 h-4" />;
      case "translate": return <Languages className="w-4 h-4" />;
      default: return <MousePointer className="w-4 h-4" />;
    }
  };

  const highlightColors = [
    { hex: "#FEF08A", name: "yellow" },
    { hex: "#FECACA", name: "red" },
    { hex: "#BFDBFE", name: "blue" },
    { hex: "#BBF7D0", name: "green" },
    { hex: "#FED7AA", name: "orange" },
    { hex: "#E9D5FF", name: "purple" },
  ];

  const highlightWidths = ["5px", "8px", "10px", "14px", "20px"];

  const isTwoPageSpread = linksViewMode === "two-page" || pageLayoutMode === "twopage";

  return (
    <div
      data-tl="pdf-editor-root"
      className="relative flex flex-col h-full w-full bg-[#52525B] text-[#111827] select-none overflow-hidden font-sans"
    >
      {/* 1. Header */}
      <header
        data-tl="editor-header"
        className="h-13 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-20 shrink-0"
      >
        <div data-tl="editor-title-group" className="flex items-center gap-3">
          <button
            type="button"
            data-tl="editor-back-btn"
            onClick={onBackClick}
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span
            data-tl="editor-title"
            className="text-xs font-semibold text-gray-800 tracking-tight"
          >
            Acme Resume.pdf
          </span>
        </div>

        <button
          type="button"
          data-tl="editor-done-btn"
          onClick={onDoneClick}
          className="bg-[#DC2626] hover:bg-red-700 text-white font-semibold text-xs px-5 py-1.5 rounded-lg shadow-xs transition-all"
        >
          Done
        </button>
      </header>

      {/* 2. Toolbar */}
      <div
        data-tl="editor-toolbar"
        className="h-16 bg-white border-b border-gray-200 px-3 flex items-center gap-1 overflow-x-auto no-scrollbar z-20 shrink-0"
      >
        {EDITOR_TOOLS.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              type="button"
              data-tl={`tool-${tool.id}`}
              onClick={() => onSelectTool?.(tool.id)}
              className={`flex flex-col items-center justify-center min-w-[50px] py-1 px-2 rounded-xl text-[10.5px] font-medium transition-all shrink-0 ${
                isActive
                  ? "bg-[#F3E8FF] text-[#7014D9] font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="mb-1">{getToolIcon(tool.id)}</div>
              <span className="truncate max-w-[54px]">{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Option Bar (Conditional) */}
      {/* 3a. Add/Edit Text */}
      {(activeTool === "addText" || activeTool === "editText") && (
        <div
          data-tl="editor-option-bar"
          className="h-11 bg-white border-b border-gray-200 px-4 flex items-center gap-4 text-xs z-20 shrink-0"
        >
          {/* Color swatch */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="option-color-swatch"
              onClick={() => onTextStyleChange?.({ color: "#000000" })}
              className="w-5 h-5 rounded border border-gray-300 bg-black flex items-center justify-center text-white text-[9px] font-bold"
            >
              A
            </button>
          </div>

          <div className="h-4 w-px bg-gray-200" />

          {/* Font family */}
          <select
            data-tl="option-font-family"
            value={textStyle.font}
            onChange={(e) => onTextStyleChange?.({ font: e.target.value })}
            className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-gray-700 font-medium focus:outline-none"
          >
            <option value="Helvetica">Helvetica</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>

          {/* Font size */}
          <select
            data-tl="option-font-size"
            value={textStyle.size}
            onChange={(e) => onTextStyleChange?.({ size: Number(e.target.value) })}
            className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-gray-700 font-medium focus:outline-none"
          >
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="24">24</option>
          </select>

          <div className="h-4 w-px bg-gray-200" />

          {/* Bold, Italic, Underline */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              data-tl="option-bold-btn"
              onClick={() => onTextStyleChange?.({ bold: !textStyle.bold })}
              className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                textStyle.bold ? "bg-purple-100 text-purple-700 font-extrabold" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              B
            </button>
            <button
              type="button"
              data-tl="option-italic-btn"
              onClick={() => onTextStyleChange?.({ italic: !textStyle.italic })}
              className={`w-6 h-6 rounded flex items-center justify-center italic text-xs ${
                textStyle.italic ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              I
            </button>
            <button
              type="button"
              data-tl="option-underline-btn"
              onClick={() => onTextStyleChange?.({ underline: !textStyle.underline })}
              className={`w-6 h-6 rounded flex items-center justify-center underline text-xs ${
                textStyle.underline ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              U
            </button>
          </div>

          <div className="h-4 w-px bg-gray-200" />

          <span className="text-[11px] text-gray-400 italic">
            Click text to edit
          </span>
        </div>
      )}

      {/* 3b. Redact Yellow Banner */}
      {isRedactBannerOpen && <PdfRedactBanner isOpen={true} />}

      {/* 3c. Highlight & Pencil Option Bar */}
      {(activeTool === "highlight" || activeTool === "pencil") && (
        <div
          data-tl="editor-option-bar"
          className="h-11 bg-white border-b border-gray-200 px-4 flex items-center gap-4 text-xs z-20 shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-700">Color:</span>
            <div className="flex items-center gap-1.5">
              {highlightColors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  data-tl={`swatch-${c.name}`}
                  onClick={() => onHighlightColorChange?.(c.hex)}
                  className={`w-4 h-4 rounded-full border border-gray-300 transition-transform ${
                    highlightColor === c.hex ? "scale-125 ring-2 ring-purple-600 ring-offset-1" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-gray-200" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-700">Width:</span>
            <div className="flex items-center gap-1">
              {highlightWidths.map((w) => (
                <button
                  key={w}
                  type="button"
                  data-tl={`width-${w}`}
                  onClick={() => onHighlightWidthChange?.(w)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                    highlightWidth === w
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3d. Annotations Option Bar */}
      {activeTool === "annotations" && (
        <div
          data-tl="annotations-option-bar"
          className="relative h-11 bg-white border-b border-gray-200 px-4 flex items-center gap-3 text-xs z-20 shrink-0"
        >
          <button
            type="button"
            data-tl="annot-btn-stamps"
            onClick={onToggleStamps}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-colors ${
              isStampsOpen || annotSubtool === "stamps"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Stamp className="w-3.5 h-3.5" />
            <span>Stamps</span>
          </button>

          <div className="h-4 w-px bg-gray-200" />

          <button
            type="button"
            data-tl="annot-btn-highlight"
            onClick={() => onSelectAnnotSubtool?.("highlight")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-colors ${
              annotSubtool === "highlight"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span>Highlight</span>
          </button>

          <button
            type="button"
            data-tl="annot-btn-pencil"
            onClick={() => onSelectAnnotSubtool?.("pencil")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-colors ${
              annotSubtool === "pencil"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Pencil</span>
          </button>

          <div className="h-4 w-px bg-gray-200" />

          <button
            type="button"
            data-tl="annot-btn-shapes"
            onClick={onToggleShapes}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-colors ${
              isShapesOpen || annotSubtool === "shapes"
                ? "bg-purple-100 text-purple-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Shapes className="w-3.5 h-3.5" />
            <span>Shapes</span>
          </button>

          {/* Stamps Palette Card Dropdown */}
          {isStampsOpen && (
            <div
              data-tl="stamps-palette-card"
              className="absolute top-12 left-4 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 flex flex-col gap-3 z-30 select-none animate-in fade-in zoom-in-95 duration-150"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                ICON STAMPS
              </span>
              <div className="grid grid-cols-3 gap-2">
                {STAMP_ITEMS.filter((s) => s.category === "icon").map((stamp) => (
                  <button
                    key={stamp.id}
                    type="button"
                    data-tl={`stamp-item-${stamp.id}`}
                    onClick={() => onSelectStamp?.(stamp.id)}
                    className="flex items-center justify-center p-2 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-xs font-semibold"
                  >
                    {stamp.id === "arrow" && <ArrowRight className="w-4 h-4 text-red-500" />}
                    {stamp.id === "question" && <HelpCircle className="w-4 h-4 text-amber-500" />}
                    {stamp.id === "star" && <Star className="w-4 h-4 text-amber-500" />}
                  </button>
                ))}
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1">
                TEXT STAMPS
              </span>
              <div className="grid grid-cols-2 gap-2">
                {STAMP_ITEMS.filter((s) => s.category === "text").map((stamp) => {
                  const isSelected = selectedStamp === stamp.id;
                  return (
                    <button
                      key={stamp.id}
                      type="button"
                      data-tl={`stamp-item-${stamp.id}`}
                      onClick={() => onSelectStamp?.(stamp.id)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-bold text-[11px] uppercase tracking-wide transition-transform hover:scale-105 ${
                        isSelected ? "ring-2 ring-purple-600 ring-offset-1" : ""
                      }`}
                      style={{
                        borderColor: stamp.borderColor,
                        color: stamp.color,
                        backgroundColor: stamp.bgColor,
                      }}
                    >
                      {stamp.label}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-400 text-center italic">
                Click on the canvas to place the stamp
              </div>
            </div>
          )}

          {/* Shapes Palette Card Dropdown */}
          {isShapesOpen && (
            <div
              data-tl="shapes-palette-card"
              className="absolute top-12 left-64 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 flex flex-col gap-2 z-30 select-none animate-in fade-in zoom-in-95 duration-150"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
                SHAPES
              </span>
              <div className="grid grid-cols-2 gap-2">
                {ANNOTATION_SHAPES.map((shape) => {
                  const isSelected = selectedShape === shape.id;
                  return (
                    <button
                      key={shape.id}
                      type="button"
                      data-tl={`shape-item-${shape.id}`}
                      onClick={() => onSelectShape?.(shape.id)}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium text-gray-700 transition-colors ${
                        isSelected
                          ? "border-purple-600 bg-purple-50 text-purple-700 font-semibold"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {shape.id === "box" && <Square className="w-4 h-4 text-gray-700" />}
                      {shape.id === "circle" && <Circle className="w-4 h-4 fill-gray-700 text-gray-700" />}
                      {shape.id === "circle-stroke" && <Circle className="w-4 h-4 text-gray-700" />}
                      {shape.id === "cross" && <CrossIcon className="w-4 h-4 text-rose-600" />}
                      {shape.id === "check" && <CheckIcon className="w-4 h-4 text-emerald-600" />}
                      <span>{shape.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3e. Links Option Bar */}
      {activeTool === "links" && (
        <div
          data-tl="links-option-bar"
          className="h-11 bg-white border-b border-gray-200 px-4 flex items-center gap-4 text-xs z-20 shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-700">View:</span>
            <select
              data-tl="links-view-select"
              value={linksViewMode}
              onChange={(e) => onLinksViewModeChange?.(e.target.value as "single" | "two-page")}
              className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-gray-700 font-medium focus:outline-none"
            >
              <option value="single">Single</option>
              <option value="two-page">Two-Page</option>
            </select>
          </div>

          <div className="h-4 w-px bg-gray-200" />

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-gray-700">Zoom:</span>
            <button
              type="button"
              data-tl="links-zoom-out"
              onClick={onZoomOut}
              className="w-5 h-5 rounded border border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <span data-tl="links-zoom-label" className="text-xs font-semibold text-gray-700 px-1">
              {zoom}%
            </span>
            <button
              type="button"
              data-tl="links-zoom-in"
              onClick={onZoomIn}
              className="w-5 h-5 rounded border border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <div className="h-4 w-px bg-gray-200" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-700">Line Thickness:</span>
            <input
              type="range"
              data-tl="links-thickness-slider"
              min="1"
              max="10"
              value={linksLineThickness}
              onChange={(e) => onLinksLineThicknessChange?.(Number(e.target.value))}
              className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <span data-tl="links-thickness-label" className="text-xs font-semibold text-gray-700">
              {linksLineThickness}px
            </span>
          </div>
        </div>
      )}

      {/* 4. Center Workspace (Pages Panel + Main Canvas) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Pages Thumbnail Panel */}
        <aside
          data-tl="editor-pages-panel"
          className="w-40 bg-white border-r border-gray-200 flex flex-col p-3 z-10 shrink-0 overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              PAGES
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((pNum) => {
              const isSelected = editorPage === pNum;
              return (
                <div
                  key={pNum}
                  data-tl={`page-thumb-${pNum}`}
                  onClick={() => onSelectPage?.(pNum)}
                  className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                  <div
                    className={`w-28 h-36 bg-white rounded border p-1 shadow-2xs transition-all overflow-hidden relative ${
                      isSelected
                        ? "border-2 border-purple-600 shadow-md ring-2 ring-purple-200"
                        : "border-gray-200 group-hover:border-gray-300"
                    }`}
                  >
                    {/* Tiny representation of resume */}
                    <div className="w-full h-full bg-gray-50 flex flex-col gap-1 p-1 pointer-events-none opacity-60">
                      <div className="w-3/4 h-1.5 bg-gray-800 rounded-xs mx-auto" />
                      <div className="w-1/2 h-1 bg-gray-400 rounded-xs mx-auto" />
                      <div className="w-full h-px bg-gray-300 my-1" />
                      <div className="w-full h-1 bg-gray-300 rounded-xs" />
                      <div className="w-5/6 h-1 bg-gray-300 rounded-xs" />
                      <div className="w-4/6 h-1 bg-gray-300 rounded-xs" />
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold ${
                      isSelected ? "text-purple-700" : "text-gray-500"
                    }`}
                  >
                    {pNum}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main
          ref={canvasRef}
          onClick={onCanvasClick}
          className="flex-1 overflow-y-auto bg-[#6B7280] p-8 flex flex-col items-center relative"
        >
          <div
            data-tl={isTwoPageSpread ? "canvas-two-page" : "editor-page-canvas"}
            className={`transition-transform origin-top ${
              isTwoPageSpread
                ? "flex flex-row gap-6 items-start justify-center flex-wrap"
                : "flex flex-col items-center gap-8"
            }`}
            style={{
              transform: `scale(${zoom / 100}) rotate(${pageRotation}deg)`,
            }}
          >
            {[1, 2, 3].map((pNum) => (
              <div key={pNum} id={`canvas-page-${pNum}`}>
                <PdfSamplePage
                  pageNumber={pNum}
                  hasTextAdded={hasTextAdded}
                  textInputVisible={textInputVisible}
                  textInputValue={textInputValue}
                  textStyle={textStyle}
                  isTextSelected={isTextSelected}
                  hasRedactions={hasRedactions}
                  hasHighlights={hasHighlights}
                  highlightColor={highlightColor}
                  hasPencilBlack={hasPencilBlack}
                  hasPencilRed={hasPencilRed}
                  hasImage={hasImage}
                  isImageSelected={isImageSelected}
                  hasEllipses={hasEllipses}
                  hasCross={hasCross}
                  hasCheck={hasCheck}
                  hasDrawSig={hasDrawSig}
                  hasImageSig={hasImageSig}
                  hasTypeSig={hasTypeSig}
                  sigColor={sigColor}
                  hasApprovedStamp={hasApprovedStamp}
                  hasCheckShape={hasCheckShape}
                  hasCircleShape={hasCircleShape}
                  watermarkText={watermarkText}
                  watermarkOpacity={watermarkOpacity}
                  watermarkRotation={watermarkRotation}
                  watermarkSize={watermarkSize}
                  watermarkColor={watermarkColor}
                  hasWatermarkApplied={hasWatermarkApplied}
                  onTextSpotClick={onTextSpotClick}
                  onPlacedTextClick={onPlacedTextClick}
                  onDeleteImage={onDeleteImage}
                  onImageHandleDrag={onImageHandleDrag}
                  onDeleteStamp={onDeleteStamp}
                />
              </div>
            ))}
          </div>
        </main>

        {/* Floating Panels on the right */}
        <PdfPageLayoutPanel
          isOpen={isPageLayoutOpen}
          mode={pageLayoutMode}
          transition={pageLayoutTransition}
          onSelectMode={onPageLayoutModeChange}
          onSelectTransition={onPageLayoutTransitionChange}
          onRotateCcw={onRotateCCW}
          onRotateCw={onRotateCW}
          onClose={onClosePageLayout}
        />

        <PdfWatermarkPanel
          isOpen={isWatermarkOpen}
          text={watermarkText}
          opacity={watermarkOpacity}
          rotation={watermarkRotation}
          size={watermarkSize}
          color={watermarkColor}
          applyTo={watermarkApplyTo}
          hasApplied={hasWatermarkApplied}
          onTextChange={onWatermarkTextChange}
          onOpacityChange={onWatermarkOpacityChange}
          onRotationChange={onWatermarkRotationChange}
          onSizeChange={onSizeChange}
          onColorChange={onWatermarkColorChange}
          onApplyToChange={onWatermarkApplyToChange}
          onApply={onApplyWatermark}
          onRemove={onRemoveWatermark}
          onClose={onCloseWatermark}
        />

        {/* 5. Bottom Page / Zoom Dark Floating Capsule */}
        <div
          data-tl="editor-bottom-pill"
          className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#18181B] text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 text-xs z-30 select-none border border-zinc-700/50"
        >
          <span className="text-zinc-400 font-medium">Page:</span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              data-tl="pill-prev-page"
              onClick={onPrevPage}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              &lt;
            </button>
            <span data-tl="pill-page-counter" className="font-semibold text-white px-1">
              {editorPage}/3
            </span>
            <button
              type="button"
              data-tl="pill-next-page"
              onClick={onNextPage}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              &gt;
            </button>
          </div>

          <div className="h-3 w-px bg-zinc-600" />

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-tl="pill-zoom-out"
              onClick={onZoomOut}
              className="text-zinc-400 hover:text-white transition-colors text-sm font-bold"
            >
              -
            </button>
            <span data-tl="pill-zoom-level" className="font-semibold text-white text-[11px]">
              {zoom}%
            </span>
            <button
              type="button"
              data-tl="pill-zoom-in"
              onClick={onZoomIn}
              className="text-zinc-400 hover:text-white transition-colors text-sm font-bold"
            >
              +
            </button>
          </div>

          <div className="h-3 w-px bg-zinc-600" />

          <button
            type="button"
            data-tl="pill-fit-width"
            onClick={onFitWidth}
            className="text-zinc-300 hover:text-white text-[11px] font-medium transition-colors"
          >
            Fit Width
          </button>
        </div>
      </div>
    </div>
  );
}
