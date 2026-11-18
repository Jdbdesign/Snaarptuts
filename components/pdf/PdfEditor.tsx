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
} from "lucide-react";
import { EDITOR_TOOLS, type EditorToolId } from "./pdf-data";
import { PdfSamplePage, type TextStyleState } from "./PdfSamplePage";
import { PdfRedactBanner } from "./PdfRedactBanner";

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
}: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Icon mapping for all 23 tools
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
            Untitled Document
          </span>
        </div>

        <button
          type="button"
          data-tl="editor-done-btn"
          onClick={onDoneClick}
          className="bg-[#DC2626] hover:bg-red-700 text-white font-semibold text-xs px-5 py-1.5 rounded-lg shadow-sm transition-all"
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

      {/* Redact Yellow Banner */}
      {isRedactBannerOpen && <PdfRedactBanner isOpen={true} />}

      {/* Highlight & Pencil Option Bar */}
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
            data-tl="editor-page-canvas"
            className="flex flex-col items-center gap-8 transition-transform origin-top"
            style={{ transform: `scale(${zoom / 100})` }}
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
                  onTextSpotClick={onTextSpotClick}
                  onPlacedTextClick={onPlacedTextClick}
                  onDeleteImage={onDeleteImage}
                  onImageHandleDrag={onImageHandleDrag}
                />
              </div>
            ))}
          </div>
        </main>

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
