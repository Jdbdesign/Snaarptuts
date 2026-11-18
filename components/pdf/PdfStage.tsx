"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CheckCircle2, Info } from "lucide-react";
import { PdfShell, type PdfNav } from "./PdfShell";
import { PdfFilesView } from "./PdfFilesView";
import { PdfUploadView } from "./PdfUploadView";
import { PdfFilePickerModal } from "./PdfFilePickerModal";
import { PdfProcessing } from "./PdfProcessing";
import { PdfEditor } from "./PdfEditor";
import { PdfSignatureDialog, type SigTab } from "./PdfSignatureDialog";
import { PdfManagePagesView } from "./PdfManagePagesView";
import { PdfExportModal } from "./PdfExportModal";
import {
  INITIAL_FILES,
  type EditorToolId,
  type PdfFileItem,
  type PickerFile,
} from "./pdf-data";
import { pushPdfToast, type PdfToast } from "./pdf-timeline";
import type { TextStyleState } from "./PdfSamplePage";

interface Props {
  tl: Timeline;
}

export function PdfStage({ tl }: Props) {
  // Top-level navigation & views
  const view = useTimelineVar<"files" | "upload" | "editor">(tl, "pdf:view", "files");
  const activeNav = useTimelineVar<PdfNav>(tl, "pdf:activeNav", "my-files");

  // Files view states
  const files = useTimelineVar<PdfFileItem[]>(tl, "pdf:files", INITIAL_FILES);
  const filterTab = useTimelineVar<"all" | "pdf">(tl, "pdf:filterTab", "all");
  const viewMode = useTimelineVar<"list" | "grid">(tl, "pdf:viewMode", "list");
  const typedSearch = useTimelineVar<string>(tl, "field:files-search-input", "");
  const baseSearch = useTimelineVar<string>(tl, "pdf:searchQuery", "");
  const searchQuery = typedSearch || baseSearch;
  const isUploading = useTimelineVar<boolean>(tl, "pdf:isUploading", false);

  // File Picker Modal
  const isPickerOpen = useTimelineVar<boolean>(tl, "pdf:isPickerOpen", false);
  const pickerSelectedFile = useTimelineVar<string | null>(tl, "pdf:pickerSelectedFile", null);

  // Upload View states
  const isDropzoneHovered = useTimelineVar<boolean>(tl, "pdf:isDropzoneHovered", false);
  const isStorageUploading = useTimelineVar<boolean>(tl, "pdf:isStorageUploading", false);
  const storageUploadPercent = useTimelineVar<number>(tl, "pdf:storageUploadPercent", 0);

  // Processing Modal
  const isProcessing = useTimelineVar<boolean>(tl, "pdf:isProcessing", false);
  const processingPercent = useTimelineVar<number>(tl, "pdf:processingPercent", 0);

  // Editor states
  const editorPage = useTimelineVar<number>(tl, "pdf:editorPage", 1);
  const activeTool = useTimelineVar<EditorToolId>(tl, "pdf:activeTool", "select");
  const zoom = useTimelineVar<number>(tl, "pdf:zoom", 100);

  // Text tool
  const hasTextAdded = useTimelineVar<boolean>(tl, "pdf:hasTextAdded", false);
  const textInputVisible = useTimelineVar<boolean>(tl, "pdf:textInputVisible", false);
  const textInputValue = useTimelineVar<string>(tl, "pdf:textInputValue", "Sign here");
  const isTextSelected = useTimelineVar<boolean>(tl, "pdf:isTextSelected", false);
  const textStyle = useTimelineVar<TextStyleState>(tl, "pdf:textStyle", {
    font: "Helvetica",
    size: 16,
    bold: false,
    italic: false,
    underline: false,
    color: "#000000",
  });

  // Redaction
  const hasRedactions = useTimelineVar<boolean>(tl, "pdf:hasRedactions", false);
  const isRedactBannerOpen = useTimelineVar<boolean>(tl, "pdf:isRedactBannerOpen", false);

  // Highlight & Pencil
  const hasHighlights = useTimelineVar<boolean>(tl, "pdf:hasHighlights", false);
  const highlightColor = useTimelineVar<string>(tl, "pdf:highlightColor", "#FEF08A");
  const highlightWidth = useTimelineVar<string>(tl, "pdf:highlightWidth", "14px");
  const hasPencilBlack = useTimelineVar<boolean>(tl, "pdf:hasPencilBlack", false);
  const hasPencilRed = useTimelineVar<boolean>(tl, "pdf:hasPencilRed", false);

  // Image & Shapes
  const hasImage = useTimelineVar<boolean>(tl, "pdf:hasImage", false);
  const isImageSelected = useTimelineVar<boolean>(tl, "pdf:isImageSelected", false);
  const hasEllipses = useTimelineVar<boolean>(tl, "pdf:hasEllipses", false);
  const hasCross = useTimelineVar<boolean>(tl, "pdf:hasCross", false);
  const hasCheck = useTimelineVar<boolean>(tl, "pdf:hasCheck", false);

  // Signature Modal & Placed Signatures
  const isSigModalOpen = useTimelineVar<boolean>(tl, "pdf:isSigModalOpen", false);
  const sigTab = useTimelineVar<SigTab>(tl, "pdf:sigTab", "draw");
  const sigColor = useTimelineVar<string>(tl, "pdf:sigColor", "#000000");
  const typedSig = useTimelineVar<string>(tl, "field:sig-type-input", "");
  const baseSig = useTimelineVar<string>(tl, "pdf:sigTypeInput", "");
  const sigTypeInput = typedSig || baseSig;
  const sigTypeStyleIndex = useTimelineVar<number>(tl, "pdf:sigTypeStyleIndex", 0);
  const sigImageUploaded = useTimelineVar<boolean>(tl, "pdf:sigImageUploaded", false);
  const hasDrawSig = useTimelineVar<boolean>(tl, "pdf:hasDrawSig", false);
  const hasImageSig = useTimelineVar<boolean>(tl, "pdf:hasImageSig", false);
  const hasTypeSig = useTimelineVar<boolean>(tl, "pdf:hasTypeSig", false);

  // Annotations
  const annotSubtool = useTimelineVar<"stamps" | "highlight" | "pencil" | "shapes" | null>(tl, "pdf:annotSubtool", null);
  const isStampsOpen = useTimelineVar<boolean>(tl, "pdf:isStampsOpen", false);
  const selectedStamp = useTimelineVar<string | null>(tl, "pdf:selectedStamp", null);
  const hasApprovedStamp = useTimelineVar<boolean>(tl, "pdf:hasApprovedStamp", false);
  const isShapesOpen = useTimelineVar<boolean>(tl, "pdf:isShapesOpen", false);
  const selectedShape = useTimelineVar<string | null>(tl, "pdf:selectedShape", null);
  const hasCheckShape = useTimelineVar<boolean>(tl, "pdf:hasCheckShape", false);
  const hasCircleShape = useTimelineVar<boolean>(tl, "pdf:hasCircleShape", false);

  // Links & Layout
  const linksViewMode = useTimelineVar<"single" | "two-page">(tl, "pdf:linksViewMode", "single");
  const linksLineThickness = useTimelineVar<number>(tl, "pdf:linksLineThickness", 2);
  const isPageLayoutOpen = useTimelineVar<boolean>(tl, "pdf:isPageLayoutOpen", false);
  const pageLayoutMode = useTimelineVar<"single" | "twopage">(tl, "pdf:pageLayoutMode", "single");
  const pageLayoutTransition = useTimelineVar<"vertical" | "horizontal">(tl, "pdf:pageLayoutTransition", "vertical");
  const pageRotation = useTimelineVar<number>(tl, "pdf:pageRotation", 0);

  // Manage Pages
  const isManagePagesOpen = useTimelineVar<boolean>(tl, "pdf:isManagePagesOpen", false);

  // Watermark
  const isWatermarkOpen = useTimelineVar<boolean>(tl, "pdf:isWatermarkOpen", false);
  const typedWatermark = useTimelineVar<string>(tl, "field:watermark-text-input", "");
  const baseWatermark = useTimelineVar<string>(tl, "pdf:watermarkText", "");
  const watermarkText = typedWatermark || baseWatermark;
  const watermarkOpacity = useTimelineVar<number>(tl, "pdf:watermarkOpacity", 50);
  const watermarkRotation = useTimelineVar<number>(tl, "pdf:watermarkRotation", 45);
  const watermarkSize = useTimelineVar<number>(tl, "pdf:watermarkSize", 48);
  const watermarkColor = useTimelineVar<string>(tl, "pdf:watermarkColor", "#9CA3AF");
  const watermarkApplyTo = useTimelineVar<"all" | "specific">(tl, "pdf:watermarkApplyTo", "all");
  const hasWatermarkApplied = useTimelineVar<boolean>(tl, "pdf:hasWatermarkApplied", false);

  // Export
  const isExportOpen = useTimelineVar<boolean>(tl, "pdf:isExportOpen", false);
  const exportFormat = useTimelineVar<string>(tl, "pdf:exportFormat", "pdf");
  const typedExportFileName = useTimelineVar<string>(tl, "field:export-filename-input", "");
  const baseExportFileName = useTimelineVar<string>(tl, "pdf:exportFileName", "Personal File");
  const exportFileName = typedExportFileName || baseExportFileName;

  // Toasts
  const toasts = useTimelineVar<PdfToast[]>(tl, "pdf:toasts", []);

  // Event Handlers that sync with timeline state
  const handleSelectNav = (nav: PdfNav) => {
    tl.setVar("pdf:activeNav", nav);
    if (nav === "my-files") {
      tl.setVar("pdf:view", "files");
    } else if (nav === "upload") {
      tl.setVar("pdf:view", "upload");
    }
  };

  const handleUploadClick = () => {
    tl.setVar("pdf:isPickerOpen", true);
    tl.setVar("pdf:pickerAction", "upload");
  };

  const handlePickerSelect = (file: PickerFile) => {
    tl.setVar("pdf:pickerSelectedFile", file.id);
  };

  const handlePickerConfirm = () => {
    tl.setVar("pdf:isPickerOpen", false);
    const action = tl.getVar<string>("pdf:pickerAction", "upload");
    if (action === "upload") {
      tl.setVar("pdf:isUploading", true);
    } else if (action === "edit") {
      tl.setVar("pdf:isStorageUploading", true);
    } else if (action === "image") {
      tl.setVar("pdf:hasImage", true);
      tl.setVar("pdf:isImageSelected", true);
    } else if (action === "sig-image") {
      tl.setVar("pdf:sigImageUploaded", true);
    }
  };

  const handlePickerCancel = () => {
    tl.setVar("pdf:isPickerOpen", false);
  };

  const handleSelectTool = (toolId: EditorToolId) => {
    if (toolId !== "undo" && toolId !== "redo") {
      tl.setVar("pdf:activeTool", toolId);
    }
    if (toolId === "redact") {
      tl.setVar("pdf:isRedactBannerOpen", !isRedactBannerOpen);
    } else if (toolId === "sign") {
      tl.setVar("pdf:isSigModalOpen", true);
    } else if (toolId === "image") {
      tl.setVar("pdf:isPickerOpen", true);
      tl.setVar("pdf:pickerAction", "image");
    } else if (toolId === "annotations") {
      tl.setVar("pdf:isStampsOpen", false);
      tl.setVar("pdf:isShapesOpen", false);
    } else if (toolId === "pageLayout") {
      tl.setVar("pdf:isPageLayoutOpen", !isPageLayoutOpen);
    } else if (toolId === "managePages") {
      tl.setVar("pdf:isManagePagesOpen", true);
    } else if (toolId === "watermark") {
      tl.setVar("pdf:isWatermarkOpen", !isWatermarkOpen);
    } else if (toolId === "undo") {
      pushPdfToast(tl, "Action undone", "info");
    }
  };

  const handleSelectPage = (page: number) => {
    tl.setVar("pdf:editorPage", page);
    const el = document.getElementById(`canvas-page-${page}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePrevPage = () => {
    if (editorPage > 1) {
      handleSelectPage(editorPage - 1);
    }
  };

  const handleNextPage = () => {
    if (editorPage < 3) {
      handleSelectPage(editorPage + 1);
    }
  };

  const handleZoomIn = () => {
    tl.setVar("pdf:zoom", Math.min(zoom + 10, 200));
  };

  const handleZoomOut = () => {
    tl.setVar("pdf:zoom", Math.max(zoom - 10, 50));
  };

  const handleFitWidth = () => {
    tl.setVar("pdf:zoom", 100);
  };

  const handleDownloadRow = () => {
    pushPdfToast(tl, "Download started");
  };

  const handleCanvasClick = () => {
    if (isTextSelected) {
      tl.setVar("pdf:isTextSelected", false);
    }
    // Step 13 stamp placement
    if (activeTool === "annotations" && selectedStamp === "approved") {
      tl.setVar("pdf:hasApprovedStamp", true);
      tl.setVar("pdf:isStampsOpen", false);
    }
  };

  return (
    <div data-scroller data-tl="pdf-stage" className="relative h-full w-full overflow-hidden select-none">
      {/* View Switcher: Editor takes full stage, otherwise render inside PdfShell */}
      {view === "editor" ? (
        <PdfEditor
          editorPage={editorPage}
          activeTool={activeTool}
          zoom={zoom}
          textStyle={textStyle}
          isRedactBannerOpen={isRedactBannerOpen}
          highlightColor={highlightColor}
          highlightWidth={highlightWidth}
          hasTextAdded={hasTextAdded}
          textInputVisible={textInputVisible}
          textInputValue={textInputValue}
          isTextSelected={isTextSelected}
          hasRedactions={hasRedactions}
          hasHighlights={hasHighlights}
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
          annotSubtool={annotSubtool}
          isStampsOpen={isStampsOpen}
          selectedStamp={selectedStamp}
          hasApprovedStamp={hasApprovedStamp}
          isShapesOpen={isShapesOpen}
          selectedShape={selectedShape}
          hasCheckShape={hasCheckShape}
          hasCircleShape={hasCircleShape}
          linksViewMode={linksViewMode}
          linksLineThickness={linksLineThickness}
          isPageLayoutOpen={isPageLayoutOpen}
          pageLayoutMode={pageLayoutMode}
          pageLayoutTransition={pageLayoutTransition}
          pageRotation={pageRotation}
          isWatermarkOpen={isWatermarkOpen}
          watermarkText={watermarkText}
          watermarkOpacity={watermarkOpacity}
          watermarkRotation={watermarkRotation}
          watermarkSize={watermarkSize}
          watermarkColor={watermarkColor}
          watermarkApplyTo={watermarkApplyTo}
          hasWatermarkApplied={hasWatermarkApplied}
          onBackClick={() => {
            tl.setVar("pdf:view", "files");
            tl.setVar("pdf:activeNav", "my-files");
          }}
          onDoneClick={() => {
            const stepId = tl.getVar<string>("step:id", "");
            if (stepId === "pdf-export" || stepId === "pdf-finish") {
              tl.setVar("pdf:isExportOpen", true);
            } else {
              tl.setVar("pdf:isProcessing", true);
              tl.setVar("pdf:processingPercent", 0);
            }
          }}
          onSelectTool={handleSelectTool}
          onSelectPage={handleSelectPage}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onFitWidth={handleFitWidth}
          onTextStyleChange={(st) => {
            tl.setVar("pdf:textStyle", { ...textStyle, ...st });
          }}
          onHighlightColorChange={(c) => tl.setVar("pdf:highlightColor", c)}
          onHighlightWidthChange={(w) => tl.setVar("pdf:highlightWidth", w)}
          onTextSpotClick={() => {
            tl.setVar("pdf:textInputVisible", true);
          }}
          onPlacedTextClick={() => {
            tl.setVar("pdf:isTextSelected", true);
          }}
          onDeleteImage={() => {
            tl.setVar("pdf:hasImage", false);
          }}
          onImageHandleDrag={() => {
            // resize feedback
          }}
          onCanvasClick={handleCanvasClick}
          onToggleStamps={() => tl.setVar("pdf:isStampsOpen", !isStampsOpen)}
          onSelectStamp={(stampId) => {
            tl.setVar("pdf:selectedStamp", stampId);
            tl.setVar("pdf:annotSubtool", "stamps");
          }}
          onToggleShapes={() => tl.setVar("pdf:isShapesOpen", !isShapesOpen)}
          onSelectShape={(shapeId) => {
            tl.setVar("pdf:selectedShape", shapeId);
            tl.setVar("pdf:annotSubtool", "shapes");
            if (shapeId === "check") {
              tl.setVar("pdf:hasCheckShape", true);
              tl.setVar("pdf:isShapesOpen", false);
            }
          }}
          onSelectAnnotSubtool={(subtool) => {
            tl.setVar("pdf:annotSubtool", subtool);
            if (subtool === "highlight") {
              tl.setVar("pdf:hasHighlights", true);
            } else if (subtool === "pencil") {
              tl.setVar("pdf:hasPencilRed", true);
            }
          }}
          onDeleteStamp={() => tl.setVar("pdf:hasApprovedStamp", false)}
          onLinksViewModeChange={(m) => tl.setVar("pdf:linksViewMode", m)}
          onLinksLineThicknessChange={(th) => tl.setVar("pdf:linksLineThickness", th)}
          onPageLayoutModeChange={(m) => tl.setVar("pdf:pageLayoutMode", m)}
          onPageLayoutTransitionChange={(tr) => tl.setVar("pdf:pageLayoutTransition", tr)}
          onRotateCCW={() => tl.setVar("pdf:pageRotation", pageRotation - 90)}
          onRotateCW={() => tl.setVar("pdf:pageRotation", pageRotation + 90)}
          onClosePageLayout={() => tl.setVar("pdf:isPageLayoutOpen", false)}
          onWatermarkTextChange={(t) => tl.setVar("pdf:watermarkText", t)}
          onWatermarkOpacityChange={(op) => tl.setVar("pdf:watermarkOpacity", op)}
          onWatermarkRotationChange={(r) => tl.setVar("pdf:watermarkRotation", r)}
          onSizeChange={(s) => tl.setVar("pdf:watermarkSize", s)}
          onWatermarkColorChange={(c) => tl.setVar("pdf:watermarkColor", c)}
          onWatermarkApplyToChange={(ap) => tl.setVar("pdf:watermarkApplyTo", ap)}
          onApplyWatermark={() => {
            tl.setVar("pdf:hasWatermarkApplied", true);
            pushPdfToast(tl, "Watermark applied successfully");
          }}
          onRemoveWatermark={() => {
            tl.setVar("pdf:hasWatermarkApplied", false);
            pushPdfToast(tl, "Watermark removed", "info");
          }}
          onCloseWatermark={() => tl.setVar("pdf:isWatermarkOpen", false)}
        />
      ) : (
        <PdfShell activeNav={activeNav} onSelectNav={handleSelectNav}>
          {view === "upload" ? (
            <PdfUploadView
              isDropzoneHovered={isDropzoneHovered}
              isStorageUploading={isStorageUploading}
              storageUploadPercent={storageUploadPercent}
              onDropzoneClick={() => {
                tl.setVar("pdf:isPickerOpen", true);
                tl.setVar("pdf:pickerAction", "edit");
              }}
              onUploadBtnClick={() => {
                tl.setVar("pdf:isPickerOpen", true);
                tl.setVar("pdf:pickerAction", "edit");
              }}
            />
          ) : (
            <PdfFilesView
              files={files}
              filterTab={filterTab}
              viewMode={viewMode}
              searchQuery={searchQuery}
              isUploading={isUploading}
              onUploadClick={handleUploadClick}
              onFilterTabChange={(tab) => tl.setVar("pdf:filterTab", tab)}
              onViewModeChange={(mode) => tl.setVar("pdf:viewMode", mode)}
              onSearchChange={(q) => tl.setVar("pdf:searchQuery", q)}
              onDownloadRow={handleDownloadRow}
            />
          )}
        </PdfShell>
      )}

      {/* In-app File Picker Modal */}
      <PdfFilePickerModal
        isOpen={isPickerOpen}
        selectedFileId={pickerSelectedFile}
        onSelectFile={handlePickerSelect}
        onConfirm={handlePickerConfirm}
        onCancel={handlePickerCancel}
      />

      {/* Processing Card Modal */}
      <PdfProcessing isOpen={isProcessing} percent={processingPercent} />

      {/* Signature Dialog */}
      <PdfSignatureDialog
        isOpen={isSigModalOpen}
        activeTab={sigTab}
        sigColor={sigColor}
        typeInput={sigTypeInput}
        typeStyleIndex={sigTypeStyleIndex}
        hasImageUploaded={sigImageUploaded}
        hasDrawnPath={hasDrawSig}
        onTabChange={(tab) => tl.setVar("pdf:sigTab", tab)}
        onColorChange={(c) => tl.setVar("pdf:sigColor", c)}
        onTypeInputChange={(v) => tl.setVar("pdf:sigTypeInput", v)}
        onTypeStyleChange={(idx) => tl.setVar("pdf:sigTypeStyleIndex", idx)}
        onImageAreaClick={() => {
          tl.setVar("pdf:isPickerOpen", true);
          tl.setVar("pdf:pickerAction", "sig-image");
        }}
        onRemoveImage={() => tl.setVar("pdf:sigImageUploaded", false)}
        onClearDraw={() => tl.setVar("pdf:hasDrawSig", false)}
        onDone={() => {
          tl.setVar("pdf:isSigModalOpen", false);
          if (sigTab === "draw") tl.setVar("pdf:hasDrawSig", true);
          if (sigTab === "image") tl.setVar("pdf:hasImageSig", true);
          if (sigTab === "type") tl.setVar("pdf:hasTypeSig", true);
        }}
        onCancel={() => tl.setVar("pdf:isSigModalOpen", false)}
      />

      {/* Manage Pages View Overlay */}
      <PdfManagePagesView
        isOpen={isManagePagesOpen}
        onCancel={() => tl.setVar("pdf:isManagePagesOpen", false)}
        onSave={() => {
          tl.setVar("pdf:isManagePagesOpen", false);
          pushPdfToast(tl, "Pages saved");
        }}
      />

      {/* Export Modal */}
      <PdfExportModal
        isOpen={isExportOpen}
        selectedFormat={exportFormat}
        fileName={exportFileName}
        onSelectFormat={(f) => tl.setVar("pdf:exportFormat", f)}
        onFileNameChange={(name) => tl.setVar("pdf:exportFileName", name)}
        onCancel={() => tl.setVar("pdf:isExportOpen", false)}
        onDownload={() => {
          tl.setVar("pdf:isExportOpen", false);
          pushPdfToast(tl, "Export started");
        }}
      />

      {/* Toasts Overlay */}
      {toasts.length > 0 && (
        <div data-tl="pdf-toasts" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              data-tl="pdf-toast"
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold animate-in slide-in-from-bottom-2 duration-150 ${
                toast.type === "info"
                  ? "bg-gray-800 text-white"
                  : toast.type === "error"
                  ? "bg-red-600 text-white"
                  : "bg-emerald-600 text-white"
              }`}
            >
              {toast.type === "info" ? (
                <Info className="w-4 h-4 shrink-0 text-white" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
              )}
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
