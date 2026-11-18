import type { Timeline } from "@/lib/timeline";
import {
  INITIAL_FILES,
  type EditorToolId,
  type PdfFileItem,
} from "./pdf-data";

export interface PdfToast {
  id: string;
  message: string;
  type?: "success" | "info" | "error";
}

let toastSeq = 0;

export function pushPdfToast(
  tl: Timeline,
  message: string,
  type: "success" | "info" | "error" = "success"
) {
  toastSeq += 1;
  const newToast: PdfToast = {
    id: `toast-${toastSeq}`,
    message,
    type,
  };
  const current = tl.getVar<PdfToast[]>("pdf:toasts", []);
  tl.setVar("pdf:toasts", [...current, newToast]);
}

export interface BeginPdfOptions {
  view?: "files" | "upload" | "editor";
  activeNav?: "my-files" | "upload" | "tools" | "ai-tools" | "operations";
  files?: PdfFileItem[];
  filterTab?: "all" | "pdf";
  viewMode?: "list" | "grid";
  searchQuery?: string;
  editorPage?: number;
  activeTool?: EditorToolId;
  zoom?: number;
  hasTextAdded?: boolean;
  hasRedactions?: boolean;
  hasHighlights?: boolean;
  hasPencilBlack?: boolean;
  hasPencilRed?: boolean;
  hasImage?: boolean;
  hasEllipses?: boolean;
  hasCross?: boolean;
  hasCheck?: boolean;
  hasDrawSig?: boolean;
  hasImageSig?: boolean;
  hasTypeSig?: boolean;
}

export function beginPdf(
  tl: Timeline,
  _stepId: string,
  opts: BeginPdfOptions = {}
) {
  // Mandatory: place cursor at clean initial spot
  tl.placeCursor(0.2, 0.15);

  // Top level view & nav
  tl.setVar("pdf:view", opts.view ?? "files");
  tl.setVar("pdf:activeNav", opts.activeNav ?? "my-files");

  // Files view states
  tl.setVar("pdf:files", opts.files ?? INITIAL_FILES);
  tl.setVar("pdf:filterTab", opts.filterTab ?? "all");
  tl.setVar("pdf:viewMode", opts.viewMode ?? "list");
  tl.setVar("pdf:searchQuery", opts.searchQuery ?? "");
  tl.setVar("pdf:isUploading", false);

  // Modals & pickers
  tl.setVar("pdf:isPickerOpen", false);
  tl.setVar("pdf:pickerSelectedFile", null);
  tl.setVar("pdf:pickerAction", "upload");

  // Upload view & progress
  tl.setVar("pdf:isDropzoneHovered", false);
  tl.setVar("pdf:isStorageUploading", false);
  tl.setVar("pdf:storageUploadPercent", 0);
  tl.setVar("pdf:isProcessing", false);
  tl.setVar("pdf:processingPercent", 0);

  // Editor states
  tl.setVar("pdf:editorPage", opts.editorPage ?? 1);
  tl.setVar("pdf:activeTool", opts.activeTool ?? "select");
  tl.setVar("pdf:zoom", opts.zoom ?? 100);

  // Text tool
  tl.setVar("pdf:hasTextAdded", opts.hasTextAdded ?? false);
  tl.setVar("pdf:textInputVisible", false);
  tl.setVar("pdf:textInputValue", "");
  tl.setVar("pdf:textStyle", {
    font: "Helvetica",
    size: 16,
    bold: false,
    italic: false,
    underline: false,
    color: "#000000",
  });
  tl.setVar("pdf:isTextSelected", false);

  // Redaction
  tl.setVar("pdf:hasRedactions", opts.hasRedactions ?? false);
  tl.setVar("pdf:isRedactBannerOpen", false);

  // Highlight & Pencil
  tl.setVar("pdf:hasHighlights", opts.hasHighlights ?? false);
  tl.setVar("pdf:highlightColor", "#FEF08A");
  tl.setVar("pdf:highlightWidth", "14px");
  tl.setVar("pdf:hasPencilBlack", opts.hasPencilBlack ?? false);
  tl.setVar("pdf:hasPencilRed", opts.hasPencilRed ?? false);

  // Image & Shapes
  tl.setVar("pdf:hasImage", opts.hasImage ?? false);
  tl.setVar("pdf:isImageSelected", false);
  tl.setVar("pdf:hasEllipses", opts.hasEllipses ?? false);
  tl.setVar("pdf:hasCross", opts.hasCross ?? false);
  tl.setVar("pdf:hasCheck", opts.hasCheck ?? false);

  // Signature
  tl.setVar("pdf:isSigModalOpen", false);
  tl.setVar("pdf:sigTab", "draw");
  tl.setVar("pdf:sigColor", "#000000");
  tl.setVar("pdf:sigTypeInput", "");
  tl.setVar("pdf:sigTypeStyleIndex", 0);
  tl.setVar("pdf:sigImageUploaded", false);
  tl.setVar("pdf:hasDrawSig", opts.hasDrawSig ?? false);
  tl.setVar("pdf:hasImageSig", opts.hasImageSig ?? false);
  tl.setVar("pdf:hasTypeSig", opts.hasTypeSig ?? false);

  // Toasts
  tl.setVar("pdf:toasts", []);
}

export async function finishPdf(tl: Timeline) {
  await tl.wait(1500);
}
