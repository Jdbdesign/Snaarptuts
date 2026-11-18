import React from "react";
import { FileText, Upload } from "lucide-react";

interface Props {
  isDropzoneHovered: boolean;
  isStorageUploading: boolean;
  storageUploadPercent: number;
  onDropzoneClick?: () => void;
  onUploadBtnClick?: () => void;
}

export function PdfUploadView({
  isDropzoneHovered,
  isStorageUploading,
  storageUploadPercent,
  onDropzoneClick,
  onUploadBtnClick,
}: Props) {
  return (
    <div data-tl="pdf-upload-view" className="max-w-4xl mx-auto flex flex-col gap-6 pt-4">
      {/* Title & Description */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Upload PDF</h1>
        <p className="text-xs text-gray-500 mt-1">
          Upload PDF files to view, edit, and manage them.
        </p>
      </div>

      {/* Dashed Dropzone */}
      <div
        data-tl="upload-dropzone"
        onClick={onDropzoneClick}
        className={`border-2 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[360px] transition-all cursor-pointer ${
          isStorageUploading
            ? "border-purple-300 bg-[#FAF5FF]"
            : isDropzoneHovered
            ? "border-purple-400 bg-[#F5F3FF]"
            : "border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50/50"
        }`}
      >
        {isStorageUploading ? (
          /* Uploading state */
          <div data-tl="upload-progress-container" className="flex flex-col items-center w-full max-w-md gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 mb-1">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-gray-900">Uploading to storage...</p>

            <div className="w-full flex flex-col gap-1.5 mt-2">
              <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
                <span>Uploading to storage...</span>
                <span>{storageUploadPercent}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7014D9] rounded-full transition-all duration-300"
                  style={{ width: `${storageUploadPercent}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mt-1">
              Please do not close this page during upload.
            </p>
          </div>
        ) : (
          /* Idle state */
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
              <FileText className="w-7 h-7" />
            </div>
            <p className="text-base font-bold text-gray-900">Drop PDF Files Here</p>
            <p className="text-xs text-gray-400 mb-3">or click to browse your files</p>

            <button
              type="button"
              data-tl="upload-to-edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                onUploadBtnClick?.();
              }}
              className="bg-[#7014D9] hover:bg-[#5E10B8] text-white font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-wider shadow-sm transition-all"
            >
              UPLOAD PDF TO EDIT
            </button>

            <span className="text-[11px] text-gray-400 mt-3">
              Maximum file size: 100MB
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
