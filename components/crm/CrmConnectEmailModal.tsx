'use client';

import React, { useState } from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import { DEFAULT_EMAIL_CONFIG, type CrmEmailConfig } from './crm-data';
import { pushCrmToast } from './crm-timeline';
import { X } from 'lucide-react';

interface Props {
  tl: Timeline;
  isOpen: boolean;
  onClose: () => void;
}

export function CrmConnectEmailModal({ tl, isOpen, onClose }: Props) {
  const [config, setConfig] = useState<CrmEmailConfig>(DEFAULT_EMAIL_CONFIG);
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const isTesting = useTimelineVar<boolean>(tl, 'crm:isTestingEmail', false);

  if (!isOpen) return null;

  const handleTestConnection = () => {
    tl.setVar('crm:isTestingEmail', true);
    pushCrmToast(tl, 'Connection tested successfully');
    setTimeout(() => {
      tl.setVar('crm:isTestingEmail', false);
    }, 1500);
  };

  const handleConnect = () => {
    pushCrmToast(tl, 'Email account connected');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      data-tl="crm-connect-email-modal"
    >
      <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-[540px] max-h-[90vh] flex flex-col overflow-hidden text-[#111111] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F4F6]">
          <div>
            <h2 className="font-semibold text-base text-[#111111]">Connect Email Account</h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Add your SMTP and IMAP credentials to send and receive emails
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            data-tl="crm-email-close-btn"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-xs">
          {/* Display Name & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-[#374151] mb-1">Display name</label>
              <input
                type="text"
                value={config.displayName}
                onChange={(e) => setConfig({ ...config, displayName: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9]"
                data-tl="crm-email-display-name"
                placeholder="Work Email"
              />
            </div>
            <div>
              <label className="block font-medium text-[#374151] mb-1">Email</label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9]"
                data-tl="crm-email-address"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          {/* OUTGOING (SMTP) */}
          <div className="pt-2 border-t border-[#F3F4F6] space-y-2.5">
            <div className="font-semibold text-[11px] tracking-wider text-[#6B7280] uppercase">
              Outgoing (SMTP)
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block font-medium text-[#374151] mb-1">Host</label>
                <input
                  type="text"
                  value={config.smtpHost}
                  onChange={(e) => setConfig({ ...config, smtpHost: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9]"
                  data-tl="crm-email-smtp-host"
                  placeholder="smtp.example.com"
                />
              </div>
              <div>
                <label className="block font-medium text-[#374151] mb-1">Port</label>
                <input
                  type="text"
                  value={config.smtpPort}
                  onChange={(e) => setConfig({ ...config, smtpPort: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9]"
                  data-tl="crm-email-smtp-port"
                  placeholder="587"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-[#374151] mb-1">Username</label>
                <input
                  type="text"
                  value={config.smtpUsername}
                  onChange={(e) => setConfig({ ...config, smtpUsername: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9]"
                  data-tl="crm-email-smtp-user"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block font-medium text-[#374151] mb-1">Password</label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={config.smtpPassword ?? '••••••••••••'}
                  onChange={(e) => setConfig({ ...config, smtpPassword: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9]"
                  data-tl="crm-email-smtp-pass"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={config.smtpSsl}
                onChange={(e) => setConfig({ ...config, smtpSsl: e.target.checked })}
                className="rounded border-[#D1D5DB] text-[#7014D9] focus:ring-[#7014D9]"
                data-tl="crm-email-smtp-ssl"
              />
              <span className="text-xs text-[#374151]">Use SSL / TLS</span>
            </label>
          </div>

          {/* INCOMING (IMAP) */}
          <div className="pt-2 border-t border-[#F3F4F6] space-y-2.5">
            <div className="font-semibold text-[11px] tracking-wider text-[#6B7280] uppercase">
              Incoming (IMAP)
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block font-medium text-[#374151] mb-1">Host</label>
                <input
                  type="text"
                  value={config.imapHost}
                  onChange={(e) => setConfig({ ...config, imapHost: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9]"
                  data-tl="crm-email-imap-host"
                  placeholder="imap.example.com"
                />
              </div>
              <div>
                <label className="block font-medium text-[#374151] mb-1">Port</label>
                <input
                  type="text"
                  value={config.imapPort}
                  onChange={(e) => setConfig({ ...config, imapPort: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9]"
                  data-tl="crm-email-imap-port"
                  placeholder="993"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-[#374151] mb-1">Username</label>
                <input
                  type="text"
                  value={config.imapUsername}
                  onChange={(e) => setConfig({ ...config, imapUsername: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9]"
                  data-tl="crm-email-imap-user"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block font-medium text-[#374151] mb-1">Password</label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={config.imapPassword ?? '••••••••••••'}
                  onChange={(e) => setConfig({ ...config, imapPassword: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9]"
                  data-tl="crm-email-imap-pass"
                  placeholder="••••••••••••"
                />
              </div>
            </div>
          </div>

          {/* SIGNATURE */}
          <div className="pt-2 border-t border-[#F3F4F6] space-y-1.5">
            <label className="block font-medium text-[#374151]">Signature</label>
            <p className="text-[11px] text-[#6B7280]">
              Appended to the bottom of every email sent from this account.
            </p>
            <textarea
              rows={3}
              value={config.signature}
              onChange={(e) => setConfig({ ...config, signature: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9] font-mono"
              data-tl="crm-email-signature"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#F3F4F6] bg-[#FAFAFA]">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#4B5563]">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e.target.checked)}
              className="rounded border-[#D1D5DB] text-[#7014D9] focus:ring-[#7014D9]"
              data-tl="crm-email-show-passwords"
            />
            <span>Show passwords</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-3.5 py-1.5 bg-white border border-[#E5E7EB] text-[#374151] text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              data-tl="crm-email-test-btn"
            >
              {isTesting ? 'Testing...' : 'Test Connection'}
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-[#6B7280] font-medium hover:text-[#111111] transition-colors cursor-pointer"
              data-tl="crm-email-cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleConnect}
              className="px-4 py-1.5 bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              data-tl="crm-email-submit-btn"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
