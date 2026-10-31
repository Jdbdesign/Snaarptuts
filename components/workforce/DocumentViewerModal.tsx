"use client";

import { Icon } from "@/components/icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type?: "policy" | "certificate";
  fileName?: string;
};

export function DocumentViewerModal({
  isOpen,
  onClose,
  type = "policy",
  fileName = "engineering-policy.pdf",
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      data-tl="doc-viewer-overlay"
      className="absolute inset-0 z-50 flex flex-col bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Dark Toolbar */}
      <div className="flex h-12 items-center justify-between px-6 bg-[#1F2937] text-white border-b border-gray-700 select-none">
        <div className="flex items-center gap-3">
          <Icon name="docFile" size={18} className="text-[#A855F7]" />
          <span data-tl="doc-viewer-title" className="text-xs font-medium tracking-wide">
            {type === "certificate"
              ? "Certificate of completion - Engineering course"
              : fileName}
          </span>
        </div>

        {type === "policy" && (
          <div className="flex items-center gap-4 text-xs text-gray-300">
            <span data-tl="doc-viewer-pages" className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700">
              1 / 2
            </span>
            <span className="text-gray-400">100%</span>
          </div>
        )}

        <button
          type="button"
          data-tl="doc-viewer-close"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
          title="Close viewer"
        >
          <Icon name="x" size={18} />
        </button>
      </div>

      {/* Viewer Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {type === "policy" ? (
          <>
            {/* Left Thumbnail Strip */}
            <div className="w-48 bg-[#111827] border-r border-gray-800 p-4 flex flex-col gap-4 overflow-y-auto select-none">
              <div className="flex flex-col gap-1 items-center">
                <div className="w-32 h-44 bg-white rounded border-2 border-[#7014D9] p-2 flex flex-col gap-1 shadow">
                  <div className="h-2 w-16 bg-gray-300 rounded" />
                  <div className="h-1.5 w-24 bg-gray-200 rounded mt-1" />
                  <div className="h-1 w-20 bg-gray-200 rounded" />
                  <div className="h-1 w-22 bg-gray-200 rounded" />
                  <div className="h-1 w-18 bg-gray-200 rounded" />
                </div>
                <span className="text-[10px] text-gray-400">Page 1</span>
              </div>
              <div className="flex flex-col gap-1 items-center opacity-60">
                <div className="w-32 h-44 bg-white rounded border border-gray-700 p-2 flex flex-col gap-1 shadow">
                  <div className="h-1.5 w-20 bg-gray-300 rounded" />
                  <div className="h-1 w-24 bg-gray-200 rounded mt-1" />
                  <div className="h-1 w-22 bg-gray-200 rounded" />
                </div>
                <span className="text-[10px] text-gray-400">Page 2</span>
              </div>
            </div>

            {/* Main Policy Document Page */}
            <div
              data-tl="doc-viewer-canvas"
              data-scroller="doc-viewer"
              className="flex-1 overflow-y-auto p-8 flex justify-center bg-[#374151]"
            >
              <div className="w-[620px] min-h-[780px] bg-white rounded-lg shadow-2xl p-12 text-[#111827] flex flex-col justify-between">
                <div>
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <div className="text-[10px] uppercase font-semibold text-[#7014D9] tracking-wider mb-1">
                      Snaarp Engineering Department
                    </div>
                    <h1 className="text-xl font-bold text-[#111827]">Engineering Policy</h1>
                    <div className="text-xs text-gray-500 mt-1">Version 1.0 · Approved 30/10/2026</div>
                  </div>

                  <div className="text-xs text-gray-700 leading-relaxed space-y-4">
                    <div>
                      <h2 className="text-xs font-semibold text-[#111827] uppercase tracking-wide mb-1.5">
                        1. Purpose & Scope
                      </h2>
                      <p>
                        This policy establishes mandatory operational and architectural standards
                        for all software engineering activities across engineering teams at Snaarp.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xs font-semibold text-[#111827] uppercase tracking-wide mb-1.5">
                        2. Code Review & Verification
                      </h2>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>All production code must be reviewed by at least one peer engineer.</li>
                        <li>Automated CI/CD test suites must pass before merge.</li>
                        <li>Security and dependency vulnerabilities must be resolved prior to release.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-xs font-semibold text-[#111827] uppercase tracking-wide mb-1.5">
                        3. Compliance & Audit
                      </h2>
                      <p>
                        Department policies are reviewed quarterly by department leads. Non-compliance
                        will trigger an immediate remediation plan overseen by Engineering HR.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-between text-[11px] text-gray-400">
                  <span>Page 1 of 2</span>
                  <span>Confidential · Snaarp Ltd</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Certificate Canvas */
          <div
            data-tl="doc-viewer-canvas"
            className="flex-1 overflow-y-auto p-8 flex items-center justify-center bg-[#374151]"
          >
            <div
              data-tl="certificate-card"
              className="w-[640px] bg-white rounded-xl shadow-2xl p-10 border-4 border-[#7014D9]/20 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#7014D9] text-white flex items-center justify-center font-bold text-base shadow-sm">
                    W
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#111827] leading-tight">Workforce</div>
                    <div className="text-[10px] text-gray-500">Learning Hub</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#7014D9] bg-[#F3E8FF] px-2.5 py-1 rounded-full border border-purple-200">
                  COURSE COMPLETED
                </span>
              </div>

              {/* Certificate Body */}
              <div className="my-8 text-center flex flex-col items-center">
                <div className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-1">
                  Certificate of completion
                </div>
                <div className="text-xs text-gray-500 mb-3">Awarded to</div>
                <h2 className="text-2xl font-bold text-[#7014D9] tracking-tight">Alex Morgan</h2>
                <div className="w-16 h-0.5 bg-[#7014D9]/30 my-4" />
                <div className="text-xs text-gray-500 mb-1">for completing</div>
                <div className="text-base font-bold text-[#111827]">Engineering course</div>
                <div className="text-xs text-gray-400 mt-2">Issued by Acme Ltd</div>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs">
                <div>
                  <div className="text-[10px] uppercase font-semibold text-gray-400">COMPLETED</div>
                  <div className="font-semibold text-gray-700">30 October 2026</div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#7014D9] text-white flex items-center justify-center shadow-md">
                    <Icon name="check" size={18} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
