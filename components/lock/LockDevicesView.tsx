"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Monitor, Smartphone, AlertTriangle, Trash2, ArrowLeft } from "lucide-react";
import { type DeviceSession, INITIAL_DEVICES, LOCK_URLS } from "./lock-data";

interface Props {
  tl: Timeline;
}

export function LockDevicesView({ tl }: Props) {
  const devices = useTimelineVar<DeviceSession[]>(tl, "lockDevices", INITIAL_DEVICES);
  const hasInactive = devices.some((d) => !d.active);

  const handleBack = () => {
    tl.setVar("lockView", "dashboard");
    tl.setUrl(LOCK_URLS.dashboard);
  };

  const handleRevokeOne = (id: string) => {
    tl.setVar(
      "lockDevices",
      devices.filter((d) => d.id !== id)
    );
    tl.setVar("lockToast", "Device session revoked");
  };

  const handleRevokeAll = () => {
    tl.setVar(
      "lockDevices",
      devices.filter((d) => d.active)
    );
    tl.setVar("lockToast", "Device session revoked");
  };

  return (
    <div
      className="flex-1 p-8 overflow-y-auto no-scrollbar select-none"
      data-tl="devices-view-root"
      data-lock-scroll="true"
    >
      <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
        {/* Top Header */}
        <div className="flex items-start justify-between" data-tl="devices-header">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="p-1.5 -ml-1 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              title="Back to Dashboard"
              data-tl="btn-devices-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-[20px] font-bold text-gray-900 tracking-tight" data-tl="devices-title">
                Devices
              </h1>
              <p className="text-[13px] text-gray-500 mt-0.5" data-tl="devices-subtitle">
                Manage active sessions and connected devices
              </p>
            </div>
          </div>

          {hasInactive && (
            <button
              type="button"
              onClick={handleRevokeAll}
              className="flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium text-red-500 bg-white border border-red-200 hover:bg-red-50 hover:border-red-300 rounded-lg shadow-2xs transition-colors"
              data-tl="btn-revoke-all-others"
            >
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>Revoke All Others</span>
            </button>
          )}
        </div>

        {/* Devices List */}
        <div className="flex flex-col gap-3 max-w-xl" data-tl="devices-list">
          {devices.map((dev, idx) => (
            <div
              key={dev.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200/80 rounded-xl shadow-2xs transition-all hover:border-gray-300"
              data-tl={`device-card-${idx + 1}`}
              data-device-id={dev.id}
            >
              <div className="flex items-center gap-3.5">
                {/* Icon Tile */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    dev.active
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : "bg-slate-100 text-slate-500 border border-slate-200/60"
                  }`}
                  data-tl={`dev-icon-${idx + 1}`}
                >
                  {dev.os.toLowerCase().includes("android") || dev.os.toLowerCase().includes("ios") ? (
                    <Smartphone className="w-5 h-5" />
                  ) : (
                    <Monitor className="w-5 h-5" />
                  )}
                </div>

                {/* Text Info */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-gray-900" data-tl={`dev-name-${idx + 1}`}>
                      {dev.name}
                    </span>
                    {dev.active ? (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        data-tl="badge-device-active"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-500"
                        data-tl={`badge-device-inact-${idx + 1}`}
                      >
                        Inactive
                      </span>
                    )}
                  </div>

                  <div className="text-[12px] text-gray-500 mt-0.5" data-tl={`dev-meta-${idx + 1}`}>
                    {dev.browser} • {dev.os} • {dev.ip}
                  </div>

                  <div className="text-[11px] text-gray-400 mt-0.5" data-tl={`dev-time-${idx + 1}`}>
                    Last active: {dev.lastActive}
                  </div>
                </div>
              </div>

              {/* Revoke Button */}
              <button
                type="button"
                onClick={() => handleRevokeOne(dev.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                data-tl={`btn-revoke-${idx + 1}`}
                title="Revoke session"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Revoke</span>
              </button>
            </div>
          ))}

          {devices.length === 0 && (
            <div className="p-8 text-center bg-white border border-gray-200 rounded-xl text-gray-500 text-sm">
              No connected devices found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
