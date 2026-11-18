import React from "react";
import { X, Check } from "lucide-react";
import { RESUME_DATA } from "./pdf-data";

export interface TextStyleState {
  font: string;
  size: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string;
}

interface Props {
  pageNumber: number;
  // Modifications state
  hasTextAdded?: boolean;
  textInputVisible?: boolean;
  textInputValue?: string;
  textStyle?: TextStyleState;
  isTextSelected?: boolean;
  hasRedactions?: boolean;
  hasHighlights?: boolean;
  highlightColor?: string;
  hasPencilBlack?: boolean;
  hasPencilRed?: boolean;
  hasImage?: boolean;
  isImageSelected?: boolean;
  hasEllipses?: boolean;
  hasCross?: boolean;
  hasCheck?: boolean;
  hasDrawSig?: boolean;
  hasImageSig?: boolean;
  hasTypeSig?: boolean;
  sigColor?: string;
  onPageClick?: (e: React.MouseEvent) => void;
  onTextSpotClick?: () => void;
  onPlacedTextClick?: () => void;
  onDeleteImage?: () => void;
  onImageHandleDrag?: () => void;
}

export function PdfSamplePage({
  pageNumber,
  hasTextAdded = false,
  textInputVisible = false,
  textInputValue = "Sign here",
  textStyle = {
    font: "Helvetica",
    size: 16,
    bold: false,
    italic: false,
    underline: false,
    color: "#000000",
  },
  isTextSelected = false,
  hasRedactions = false,
  hasHighlights = false,
  highlightColor = "#FEF08A",
  hasPencilBlack = false,
  hasPencilRed = false,
  hasImage = false,
  isImageSelected = true,
  hasEllipses = false,
  hasCross = false,
  hasCheck = false,
  hasDrawSig = false,
  hasImageSig = false,
  hasTypeSig = false,
  sigColor = "#000000",
  onPageClick,
  onTextSpotClick,
  onPlacedTextClick,
  onDeleteImage,
  onImageHandleDrag,
}: Props) {
  return (
    <div
      data-tl={`pdf-page-${pageNumber}`}
      onClick={onPageClick}
      className="relative w-[620px] min-h-[877px] bg-white text-gray-900 shadow-xl rounded-sm p-10 font-sans select-none overflow-hidden my-6 mx-auto"
      style={{
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* ================= PAGE 1 ================= */}
      {pageNumber === 1 && (
        <div className="flex flex-col gap-5 text-left text-[11px] leading-relaxed relative">
          {/* Header */}
          <div className="relative text-center pb-2">
            <h2 className="text-xl font-extrabold tracking-widest uppercase text-gray-950">
              {RESUME_DATA.name}
            </h2>
            <p className="text-[10px] font-semibold text-gray-700 mt-1">
              {RESUME_DATA.subtitle}
            </p>
            <p className="text-[9px] text-gray-500 mt-0.5">
              <span>{RESUME_DATA.email}</span> •{" "}
              {RESUME_DATA.links.map((lnk, i) => (
                <span key={lnk.label}>
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    {lnk.label}
                  </span>
                  {i < RESUME_DATA.links.length - 1 ? " • " : ""}
                </span>
              ))}
            </p>

            {/* Redaction 1: Over Name */}
            {hasRedactions && (
              <div
                data-tl="redact-box-name"
                className="absolute inset-x-12 top-0 h-8 bg-black z-20 rounded-xs"
              />
            )}
          </div>

          <div className="w-full h-px bg-gray-900" />

          {/* Professional Summary */}
          <div className="relative">
            <h3 className="font-bold text-[10px] uppercase tracking-wider text-gray-950 mb-1">
              Professional Summary
            </h3>
            <p className="text-gray-700 text-[9.5px] leading-relaxed text-justify">
              {RESUME_DATA.summary}
            </p>

            {/* Redaction 2: Over summary phrase */}
            {hasRedactions && (
              <div
                data-tl="redact-box-summary"
                className="absolute left-1/3 top-6 w-32 h-4 bg-black z-20 rounded-xs"
              />
            )}
            {/* Redaction 3: Over summary detail */}
            {hasRedactions && (
              <div
                data-tl="redact-box-detail"
                className="absolute left-20 top-11 w-24 h-3.5 bg-black z-20 rounded-xs"
              />
            )}

            {/* Highlight Rectangle over Summary & Experience */}
            {hasHighlights && (
              <div
                data-tl="highlight-rect-summary"
                className="absolute -inset-x-2 -top-1 bottom-0 z-10 pointer-events-none rounded opacity-60"
                style={{ backgroundColor: highlightColor }}
              />
            )}
          </div>

          <div className="w-full h-px bg-gray-200" />

          {/* Work Experience */}
          <div className="relative">
            <h3 className="font-bold text-[10px] uppercase tracking-wider text-gray-950 mb-2">
              Work Experience
            </h3>

            <div className="flex flex-col gap-3">
              {RESUME_DATA.experience.map((job) => (
                <div key={job.role} className="flex flex-col">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-gray-900">{job.role}</span>
                    <span className="italic text-gray-500 text-[9px]">{job.period}</span>
                  </div>
                  <span className="text-[9px] text-gray-600 font-medium mb-1">
                    {job.company}
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-gray-700 text-[9px]">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Area: Sign here spot */}
          <div
            data-tl="page-text-spot-p1"
            onClick={onTextSpotClick}
            className="mt-6 pt-4 border-t border-dashed border-gray-200 relative min-h-[50px] cursor-text"
          >
            {/* Placed Text "Sign here" */}
            {hasTextAdded && (
              <div
                data-tl="placed-text-sign-here"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlacedTextClick?.();
                }}
                className={`inline-block px-2 py-0.5 relative cursor-pointer select-none transition-all ${
                  isTextSelected
                    ? "border border-blue-500 bg-blue-50/20"
                    : "hover:outline hover:outline-1 hover:outline-blue-300"
                }`}
                style={{
                  fontFamily: textStyle.font,
                  fontSize: `${textStyle.size}px`,
                  fontWeight: textStyle.bold ? "bold" : "normal",
                  fontStyle: textStyle.italic ? "italic" : "normal",
                  textDecoration: textStyle.underline ? "underline" : "none",
                  color: textStyle.color,
                }}
              >
                <span>{textInputValue || "Sign here"}</span>
                {isTextSelected && (
                  <>
                    <span className="absolute -top-1 -left-1 w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-600 rounded-full" />
                  </>
                )}
              </div>
            )}

            {/* Floating Text Input Box when Add Text clicked */}
            {textInputVisible && (
              <div
                data-tl="text-input-box"
                onClick={(e) => e.stopPropagation()}
                className="absolute left-28 top-0 z-30 w-44 bg-white border border-blue-400 rounded-lg shadow-lg overflow-hidden animate-in zoom-in-95 duration-100"
              >
                <div className="bg-blue-600 px-3 py-1 flex items-center justify-between text-white text-[10px] font-semibold">
                  <span>Text</span>
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div className="p-2">
                  <span className="text-gray-800 text-xs font-medium">
                    {textInputValue || "Sign here"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= PAGE 2 ================= */}
      {pageNumber === 2 && (
        <div className="flex flex-col gap-6 text-left text-[11px] leading-relaxed">
          <h3 className="font-bold text-[11px] uppercase tracking-wider text-gray-950 pb-1 border-b border-gray-900">
            Selected Projects
          </h3>

          <div className="flex flex-col gap-6">
            {RESUME_DATA.projects.map((proj) => (
              <div key={proj.title} className="flex flex-col">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-gray-950">{proj.title}</span>
                  <span className="italic text-gray-500 text-[9.5px]">{proj.date}</span>
                </div>
                <span className="text-[9.5px] text-gray-500 font-medium mb-1.5">
                  {proj.tags}
                </span>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-[9.5px]">
                  {proj.bullets.map((b, bi) => (
                    <li key={bi} className="leading-snug">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= PAGE 3 ================= */}
      {pageNumber === 3 && (
        <div className="flex flex-col gap-6 text-left text-[11px] leading-relaxed relative">
          {/* Skills */}
          <div>
            <h3 className="font-bold text-[11px] uppercase tracking-wider text-gray-950 pb-1 border-b border-gray-900 mb-2">
              Skills
            </h3>
            <div className="flex flex-col gap-1.5 text-[9.5px]">
              {RESUME_DATA.skills.map((s) => (
                <div key={s.category}>
                  <span className="font-bold text-gray-900">{s.category}: </span>
                  <span className="text-gray-700">{s.items}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-bold text-[11px] uppercase tracking-wider text-gray-950 pb-1 border-b border-gray-900 mb-2">
              Education
            </h3>
            <div className="flex items-center justify-between text-[10px]">
              <div>
                <p className="font-bold text-gray-900">{RESUME_DATA.education.degree}</p>
                <p className="text-gray-600 text-[9px]">{RESUME_DATA.education.institution}</p>
              </div>
              <span className="italic text-gray-500 text-[9px]">{RESUME_DATA.education.year}</span>
            </div>
          </div>

          {/* Profiles & Portfolio */}
          <div>
            <h3 className="font-bold text-[11px] uppercase tracking-wider text-gray-950 pb-1 border-b border-gray-900 mb-2">
              Profiles &amp; Portfolio
            </h3>
            <div className="flex flex-col gap-1 text-[9.5px]">
              {RESUME_DATA.portfolio.map((p) => (
                <div key={p.label} className="flex items-center gap-1">
                  <span className="font-medium text-gray-700">{p.label}:</span>
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    {p.url}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Modifications on Page 3: Placed Items Area */}
          <div className="relative min-h-[220px] mt-4">
            {/* 1. Placed Image */}
            {hasImage && (
              <div
                data-tl="placed-image-card"
                className={`absolute left-4 top-2 w-28 h-36 bg-gray-100 border rounded shadow-md flex flex-col items-center justify-center p-2 transition-all ${
                  isImageSelected
                    ? "border-2 border-dashed border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-300"
                }`}
              >
                {/* Red delete circle top-right */}
                <button
                  type="button"
                  data-tl="image-delete-circle"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteImage?.();
                  }}
                  className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md cursor-pointer z-30"
                >
                  <X className="w-3.5 h-3.5 stroke-[3]" />
                </button>

                {/* Resize handle bottom-right */}
                <div
                  data-tl="image-handle-bottom-right"
                  onClick={onImageHandleDrag}
                  className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-blue-600 border-2 border-white rounded-full cursor-se-resize shadow-xs"
                />

                {/* Sketch style neutral placeholder icon */}
                <div className="w-full h-full border border-gray-300 rounded bg-white flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-[9px] font-bold text-gray-400">SITE PHOTO</span>
                  <svg width="40" height="40" viewBox="0 0 40 40" className="mt-1">
                    <circle cx="20" cy="18" r="8" fill="none" stroke="#6B7280" strokeWidth="1.5" />
                    <path d="M10 32 Q 20 22 30 32" fill="none" stroke="#6B7280" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            )}

            {/* 2. Ellipses (Red ovals) */}
            {hasEllipses && (
              <>
                <svg
                  data-tl="canvas-ellipse-1"
                  className="absolute left-36 top-4 w-28 h-16 pointer-events-none"
                  viewBox="0 0 120 70"
                >
                  <ellipse
                    cx="60"
                    cy="35"
                    rx="50"
                    ry="28"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2.5"
                  />
                </svg>
                <svg
                  data-tl="canvas-ellipse-2"
                  className="absolute left-64 top-6 w-24 h-14 pointer-events-none"
                  viewBox="0 0 100 60"
                >
                  <ellipse
                    cx="50"
                    cy="30"
                    rx="42"
                    ry="22"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                  />
                </svg>
              </>
            )}

            {/* 3. Cross (Red X) */}
            {hasCross && (
              <div
                data-tl="canvas-cross"
                className="absolute left-48 top-8 text-red-600 font-extrabold text-2xl select-none"
              >
                ✕
              </div>
            )}

            {/* 4. Check (Green checkmark) */}
            {hasCheck && (
              <div
                data-tl="canvas-check"
                className="absolute left-52 top-18 text-emerald-600 font-extrabold text-2xl select-none"
              >
                ✓
              </div>
            )}

            {/* 5. Pencil strokes */}
            {hasPencilBlack && (
              <svg
                data-tl="canvas-pencil-stroke-black"
                className="absolute left-40 top-24 w-24 h-16 pointer-events-none"
                viewBox="0 0 100 60"
              >
                <path
                  d="M 10 30 C 25 10, 45 50, 70 20 S 90 45, 80 50"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {hasPencilRed && (
              <svg
                data-tl="canvas-pencil-stroke-red"
                className="absolute left-68 top-24 w-24 h-16 pointer-events-none"
                viewBox="0 0 100 60"
              >
                <path
                  d="M 10 25 C 20 5, 45 45, 65 15 S 85 40, 75 45"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {/* 6. Drawn Signature on Page */}
            {hasDrawSig && (
              <div
                data-tl="placed-draw-sig"
                className="absolute left-10 top-36 w-36 h-16 border-2 border-dashed border-blue-500 rounded p-1 flex items-center justify-center relative bg-white/40"
              >
                <button
                  type="button"
                  data-tl="sig-placed-delete-btn"
                  className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow"
                >
                  <X className="w-3 h-3 stroke-[3]" />
                </button>
                <svg viewBox="0 0 120 50" className="w-full h-full pointer-events-none">
                  <path
                    d="M 10 35 Q 25 10 50 30 T 80 25 T 105 30"
                    fill="none"
                    stroke={sigColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}

            {/* 7. Image Signature on Page */}
            {hasImageSig && (
              <div
                data-tl="placed-image-sig"
                className="absolute left-52 top-36 w-20 h-24 border border-gray-300 bg-white rounded shadow-sm p-1 flex flex-col items-center justify-center"
              >
                <span className="text-[8px] text-gray-400 font-bold mb-1">IMAGE SIG</span>
                <svg width="40" height="30" viewBox="0 0 40 30">
                  <path d="M5 20 Q 20 5 35 15" fill="none" stroke="#1E3A8A" strokeWidth="2" />
                </svg>
              </div>
            )}

            {/* 8. Typed Signature on Page */}
            {hasTypeSig && (
              <div
                data-tl="placed-type-sig"
                className="absolute left-80 top-40 px-3 py-1 border border-transparent hover:border-blue-300 rounded font-serif italic text-2xl font-bold tracking-tight"
                style={{ color: sigColor }}
              >
                JD
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
