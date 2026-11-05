"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Check } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksImagePickerModal({ tl }: Props) {
  const isOpen = useTimelineVar(tl, "booksImagePickerOpen", false);

  if (!isOpen) return null;

  return (
    <div
      data-tl="books-image-picker-modal"
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-100"
    >
      <div
        data-tl="image-picker-card"
        className="w-[440px] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-base font-semibold text-gray-900">Choose Image</h3>
          <button
            type="button"
            data-tl="btn-close-image-picker"
            onClick={() => tl.setVar("booksImagePickerOpen", false)}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div
            data-tl="sample-image-produce"
            onClick={() => {
              tl.setVar("booksFormImage", "/drive-photos/photo-01.jpg");
              tl.setVar("booksImagePickerOpen", false);
            }}
            className="group relative rounded-xl border-2 border-blue-500 overflow-hidden bg-gray-50 cursor-pointer p-1"
          >
            <div className="h-28 w-full rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/drive-photos/photo-01.jpg')" }} />
            <div className="p-2">
              <p className="text-xs font-semibold text-gray-900 truncate">fresh-produce.jpg</p>
              <p className="text-[10px] text-gray-500">187 KB · 1200×800</p>
            </div>
            <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
              <Check size={12} />
            </span>
          </div>

          <div
            data-tl="sample-image-grains"
            onClick={() => {
              tl.setVar("booksFormImage", "/drive-photos/photo-02.jpg");
              tl.setVar("booksImagePickerOpen", false);
            }}
            className="group relative rounded-xl border border-gray-200 hover:border-gray-300 overflow-hidden bg-gray-50 cursor-pointer p-1 transition-colors"
          >
            <div className="h-28 w-full rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/drive-photos/photo-02.jpg')" }} />
            <div className="p-2">
              <p className="text-xs font-semibold text-gray-900 truncate">farm-harvest.jpg</p>
              <p className="text-[10px] text-gray-500">165 KB · 1200×800</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2.5">
          <button
            type="button"
            data-tl="btn-cancel-image-picker"
            onClick={() => tl.setVar("booksImagePickerOpen", false)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-choose-image-file"
            onClick={() => {
              tl.setVar("booksFormImage", "/drive-photos/photo-01.jpg");
              tl.setVar("booksImagePickerOpen", false);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Select Image
          </button>
        </div>
      </div>
    </div>
  );
}
