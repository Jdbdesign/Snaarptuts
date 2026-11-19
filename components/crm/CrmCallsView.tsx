'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import { CALLS_RECENT_LIST, SMS_CONVERSATIONS } from './crm-data';
import { pushCrmToast } from './crm-timeline';

interface Props {
  tl: Timeline;
  onOpenCallerId?: () => void;
  onOpenVoicemail?: () => void;
  onOpenRingStrategy?: () => void;
  onOpenBusinessHours?: () => void;
  onOpenProviders?: () => void;
}

export function CrmCallsView({
  tl,
  onOpenCallerId,
  onOpenVoicemail,
  onOpenRingStrategy,
  onOpenBusinessHours,
  onOpenProviders,
}: Props) {
  const callsTab = useTimelineVar<'phone' | 'sms' | 'numbers'>(tl, 'crm:callsTab', 'phone');
  const phoneCenterSubtab = useTimelineVar<'keypad' | 'recent' | 'favorites'>(tl, 'crm:phoneCenterSubtab', 'keypad');
  const dialNumber = useTimelineVar<string>(tl, 'crm:dialNumber', '555 345 6789');

  const handleDialClick = (digit: string) => {
    tl.setVar('crm:dialNumber', (dialNumber || '') + digit);
  };

  const handleWhatsAppClick = () => {
    pushCrmToast(tl, 'Opening WhatsApp chat for +44 7700 900111...');
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto" data-tl="crm-calls-view">
      {/* Top Header */}
      <div className="px-8 pt-6 pb-4 bg-white border-b border-gray-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#111111]" data-tl="crm-calls-title">
              Calls
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Make calls, send WhatsApp messages, and manage calling providers
            </p>
          </div>

          {/* Top Right Controls */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1.5 px-3 py-1 bg-[#FEE2E2] border border-[#FECACA] rounded-full text-xs font-bold text-[#DC2626]"
              data-tl="crm-calls-credit"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>2.32 CREDIT</span>
            </div>

            <button
              type="button"
              onClick={onOpenProviders}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
              data-tl="crm-calls-providers-btn"
            >
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Providers</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center bg-[#F3F4F6] rounded-full p-1 border border-gray-200 text-xs">
            <button
              type="button"
              onClick={() => tl.setVar('crm:callsTab', 'phone')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold transition-all ${
                callsTab === 'phone'
                  ? 'bg-[#7014D9] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              data-tl="crm-calls-tab-phone"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Cloud Phone</span>
            </button>

            <button
              type="button"
              onClick={() => tl.setVar('crm:callsTab', 'sms')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold transition-all ${
                callsTab === 'sms'
                  ? 'bg-[#7014D9] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              data-tl="crm-calls-tab-sms"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>SMS</span>
            </button>

            <button
              type="button"
              onClick={() => tl.setVar('crm:callsTab', 'numbers')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold transition-all ${
                callsTab === 'numbers'
                  ? 'bg-[#7014D9] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              data-tl="crm-calls-tab-numbers"
            >
              <span className="font-mono">#</span>
              <span>Phone Numbers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* ===================== TAB 1: CLOUD PHONE ===================== */}
        {callsTab === 'phone' && (
          <div className="flex gap-6 items-start" data-tl="crm-cloud-phone-view">
            {/* Left Column: My Numbers & Call Settings */}
            <div className="w-72 shrink-0 flex flex-col gap-5">
              {/* My Numbers Card */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs" data-tl="crm-my-numbers-card">
                <h3 className="text-xs font-bold text-gray-900 mb-3">My Numbers</h3>
                <div className="p-3.5 rounded-xl bg-[#FAF5FF] border border-[#DDD6FE]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">+44 7700 900123</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold">
                      ✓ Active
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">Sales</p>

                  <div className="flex items-center gap-3 mt-3 text-gray-500 pt-2 border-t border-purple-100">
                    <button type="button" className="hover:text-gray-900"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></button>
                    <button type="button" className="hover:text-gray-900"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg></button>
                    <button type="button" className="hover:text-gray-900"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" /></svg></button>
                    <button type="button" className="hover:text-gray-900"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                  </div>
                </div>

                <button type="button" className="w-full text-left text-xs text-gray-600 hover:text-gray-900 font-medium mt-3 flex items-center justify-between">
                  <span>View all numbers (1)</span>
                  <span className="text-gray-400">&gt;</span>
                </button>
              </div>

              {/* Call Settings */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs" data-tl="crm-call-settings-card">
                <h3 className="text-xs font-bold text-gray-900 mb-3">Call Settings</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Dialer & Keypad Sound</span>
                    <span className="text-[11px] text-gray-400">Configured</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Call Forwarding</span>
                    <span className="text-[11px] text-gray-400">Off</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Do Not Disturb</span>
                    <span className="text-[11px] text-gray-400">Off</span>
                  </div>
                  <button
                    type="button"
                    data-tl="crm-call-setting-voicemail"
                    onClick={onOpenVoicemail}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-[#7014D9] text-left transition-colors cursor-pointer"
                  >
                    <span>Voicemail Greeting</span>
                    <span className="text-[11px] text-[#7014D9] font-medium">Custom greeting &gt;</span>
                  </button>
                  <button
                    type="button"
                    data-tl="crm-call-setting-ring-strategy"
                    onClick={onOpenRingStrategy}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-[#7014D9] text-left transition-colors cursor-pointer"
                  >
                    <span>Ring Strategy</span>
                    <span className="text-[11px] text-[#7014D9] font-medium">Ring all devices &gt;</span>
                  </button>
                  <button
                    type="button"
                    data-tl="crm-call-setting-business-hours"
                    onClick={onOpenBusinessHours}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-[#7014D9] text-left transition-colors cursor-pointer"
                  >
                    <span>Business Hours</span>
                    <span className="text-[11px] text-gray-500">Mon - Fri &gt;</span>
                  </button>
                  <button
                    type="button"
                    data-tl="crm-call-setting-caller-id"
                    onClick={onOpenCallerId}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-[#7014D9] text-left transition-colors cursor-pointer"
                  >
                    <span>Caller ID</span>
                    <span className="text-[11px] text-[#7014D9] font-medium">Custom Name &gt;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Center: Metrics & Keypad */}
            <div className="flex-1 flex flex-col gap-6">
              {/* 5 Metrics Row */}
              <div className="grid grid-cols-5 gap-3">
                <div className="bg-white rounded-xl border border-gray-200/80 p-3 flex flex-col">
                  <span className="text-[11px] text-gray-500 font-medium">Total Calls</span>
                  <span className="text-xl font-bold text-gray-900 mt-1">4</span>
                </div>
                <div className="bg-white rounded-xl border border-gray-200/80 p-3 flex flex-col">
                  <span className="text-[11px] text-gray-500 font-medium">Inbound Calls</span>
                  <span className="text-xl font-bold text-gray-900 mt-1">2</span>
                </div>
                <div className="bg-white rounded-xl border border-gray-200/80 p-3 flex flex-col">
                  <span className="text-[11px] text-gray-500 font-medium">Outbound Calls</span>
                  <span className="text-xl font-bold text-gray-900 mt-1">2</span>
                </div>
                <div className="bg-white rounded-xl border border-gray-200/80 p-3 flex flex-col">
                  <span className="text-[11px] text-gray-500 font-medium">Missed Calls</span>
                  <span className="text-xl font-bold text-[#DC2626] mt-1">2</span>
                </div>
                <div className="bg-white rounded-xl border border-gray-200/80 p-3 flex flex-col">
                  <span className="text-[11px] text-gray-500 font-medium">Avg. Call Duration</span>
                  <span className="text-xl font-bold text-gray-900 mt-1">00:02</span>
                </div>
              </div>

              {/* Keypad Container */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 flex flex-col items-center shadow-2xs" data-tl="crm-keypad-card">
                {/* Subtabs */}
                <div className="w-full flex items-center justify-start gap-6 border-b border-gray-100 pb-3 mb-6 text-xs font-semibold">
                  <button
                    type="button"
                    data-tl="crm-subtab-keypad"
                    onClick={() => tl.setVar('crm:phoneCenterSubtab', 'keypad')}
                    className={`pb-3 -mb-3 transition-colors ${
                      phoneCenterSubtab === 'keypad'
                        ? 'text-[#7014D9] border-b-2 border-[#7014D9]'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Keypad
                  </button>
                  <button
                    type="button"
                    data-tl="crm-subtab-recent"
                    onClick={() => tl.setVar('crm:phoneCenterSubtab', 'recent')}
                    className={`pb-3 -mb-3 transition-colors ${
                      phoneCenterSubtab === 'recent'
                        ? 'text-[#7014D9] border-b-2 border-[#7014D9]'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Recent Calls
                  </button>
                  <button
                    type="button"
                    data-tl="crm-subtab-favorites"
                    onClick={() => tl.setVar('crm:phoneCenterSubtab', 'favorites')}
                    className={`pb-3 -mb-3 transition-colors ${
                      phoneCenterSubtab === 'favorites'
                        ? 'text-[#7014D9] border-b-2 border-[#7014D9]'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Favorites
                  </button>
                </div>

                {phoneCenterSubtab === 'keypad' && (
                  <>
                    {/* Input box */}
                    <div className="w-full max-w-[340px] flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 mb-2">
                      <span className="text-xs font-semibold text-gray-600 mr-2 border-r border-gray-200 pr-2">GB +44</span>
                      <input
                        type="text"
                        value={dialNumber}
                        readOnly
                        className="flex-1 bg-transparent text-sm font-bold text-gray-900 tracking-wider outline-hidden"
                        data-tl="crm-keypad-input"
                      />
                      <button
                        type="button"
                        onClick={() => tl.setVar('crm:dialNumber', '')}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-7.172a2 2 0 00-1.414.586L3 12z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 mb-6">Add number or search contact...</p>

                    {/* Dial Pad Grid */}
                    <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
                      {[
                        { num: '1', sub: '' },
                        { num: '2', sub: 'ABC' },
                        { num: '3', sub: 'DEF' },
                        { num: '4', sub: 'GHI' },
                        { num: '5', sub: 'JKL' },
                        { num: '6', sub: 'MNO' },
                        { num: '7', sub: 'PQRS' },
                        { num: '8', sub: 'TUV' },
                        { num: '9', sub: 'WXYZ' },
                        { num: '*', sub: '' },
                        { num: '0', sub: '+' },
                        { num: '#', sub: '' },
                      ].map((btn) => (
                        <button
                          key={btn.num}
                          type="button"
                          onClick={() => handleDialClick(btn.num)}
                          className="w-16 h-16 rounded-full bg-[#F8FAFC] hover:bg-[#F3E8FF] border border-gray-100 flex flex-col items-center justify-center transition-all mx-auto active:scale-95 shadow-2xs cursor-pointer"
                          data-tl={`crm-keypad-btn-${btn.num === '*' ? 'star' : btn.num === '#' ? 'hash' : btn.num}`}
                        >
                          <span className="text-base font-bold text-gray-900 leading-tight">{btn.num}</span>
                          {btn.sub && <span className="text-[9px] font-bold text-gray-400">{btn.sub}</span>}
                        </button>
                      ))}
                    </div>

                    {/* Bottom Call Button */}
                    <div className="flex items-center justify-center gap-6 mt-6">
                      <button type="button" className="w-10 h-10 rounded-full text-gray-400 hover:text-gray-600 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => pushCrmToast(tl, `Calling ${dialNumber}...`)}
                        className="w-14 h-14 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                        data-tl="crm-keypad-call-btn"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </button>

                      <button type="button" className="w-10 h-10 rounded-full text-gray-400 hover:text-gray-600 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}

                {phoneCenterSubtab === 'recent' && (
                  <div className="w-full py-2 flex flex-col gap-2">
                    {CALLS_RECENT_LIST.map((call) => (
                      <div key={call.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 text-[#7014D9] font-bold text-xs flex items-center justify-center">
                            {call.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{call.name}</p>
                            <p className="text-[11px] text-gray-500">{call.number} · {call.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] font-semibold text-gray-700">{call.duration ?? 'Missed'}</p>
                          <p className="text-[10px] text-gray-400">{call.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {phoneCenterSubtab === 'favorites' && (
                  <div className="w-full py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-50 text-[#7014D9] flex items-center justify-center text-lg mb-3">
                      ★
                    </div>
                    <p className="text-xs font-bold text-gray-800">No favorites yet</p>
                    <p className="text-[11px] text-gray-500 mt-1 max-w-[260px]">
                      Star frequent contacts from your directory to reach them quickly.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Recent Calls & Voicemails */}
            <div className="w-80 shrink-0 flex flex-col gap-5">
              <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs" data-tl="crm-recent-calls-card">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                  <h3 className="text-xs font-bold text-gray-900">Recent Calls</h3>
                  <button type="button" className="text-xs text-[#7014D9] hover:underline font-semibold">View all</button>
                </div>

                <div className="space-y-3">
                  {CALLS_RECENT_LIST.map((c) => (
                    <div key={c.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-[10px]">
                          S
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{c.name}</div>
                          <div className="text-[11px] text-gray-400">
                            {c.number} · {c.duration ?? 'Missed'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                        <span>{c.date}</span>
                        <svg className="w-3 h-3 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Voicemails Card */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                  <h3 className="text-xs font-bold text-gray-900">Voicemails</h3>
                  <button type="button" className="text-xs text-[#7014D9] hover:underline font-semibold">View all</button>
                </div>
                <div className="py-6 flex flex-col items-center justify-center text-center text-gray-400">
                  <svg className="w-8 h-8 text-gray-300 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                  <span className="text-xs font-medium">No voicemails</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: SMS ===================== */}
        {callsTab === 'sms' && (
          <div className="flex flex-col gap-6" data-tl="crm-sms-view">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-5 gap-3">
              <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium">Total Messages</span>
                <span className="text-xl font-bold text-gray-900 mt-1">1</span>
                <span className="text-[10px] text-[#DC2626] font-medium mt-0.5">↓ 50.0% vs last 7 days</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium">Sent</span>
                <span className="text-xl font-bold text-gray-900 mt-1">0</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium">Received</span>
                <span className="text-xl font-bold text-gray-900 mt-1">1</span>
                <span className="text-[10px] text-[#DC2626] font-medium mt-0.5">↓ 50.0% vs last 7 days</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium">Delivered</span>
                <span className="text-xl font-bold text-gray-900 mt-1">1</span>
                <span className="text-[10px] text-[#DC2626] font-medium mt-0.5">↓ 50.0% vs last 7 days</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 flex flex-col">
                <span className="text-[11px] text-gray-500 font-medium">Failed</span>
                <span className="text-xl font-bold text-gray-900 mt-1">0</span>
              </div>
            </div>

            {/* 3 Sections: Conversations / Message Pane / Contact Panel */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden flex min-h-[500px]">
              {/* Section 1: Conversations List */}
              <div className="w-72 border-r border-gray-100 flex flex-col p-4">
                <h3 className="text-xs font-bold text-gray-900 mb-3">Conversations</h3>
                <div className="relative mb-3">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-700 outline-hidden"
                    data-tl="crm-sms-search"
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-1.5 mb-3 text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#7014D9] font-semibold">All 9</span>
                  <span className="px-2 py-0.5 rounded-full text-gray-500 hover:bg-gray-100">Unread 0</span>
                  <span className="px-2 py-0.5 rounded-full text-gray-500 hover:bg-gray-100">Draft 0</span>
                </div>

                {/* List */}
                <div className="flex-1 space-y-2 overflow-y-auto">
                  {SMS_CONVERSATIONS.map((conv) => (
                    <div
                      key={conv.id}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        conv.id === 'sms-1'
                          ? 'bg-[#FAF5FF] border-[#DDD6FE]'
                          : 'border-transparent hover:bg-gray-50'
                      }`}
                      data-tl={`crm-sms-item-${conv.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900">{conv.name}</span>
                        <span className="text-[10px] text-gray-400">{conv.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">{conv.preview}</p>
                    </div>
                  ))}
                </div>

                <button type="button" className="text-xs text-[#7014D9] hover:underline font-semibold pt-3 border-t border-gray-100 text-center">
                  View all conversations
                </button>
              </div>

              {/* Section 2: Middle Chat Area & Composer */}
              <div className="flex-1 flex flex-col border-r border-gray-100 bg-[#FAFBFD]">
                {/* Header */}
                <div className="px-5 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs">
                      <span>U</span>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">+44 7700 900111</div>
                      <div className="text-[10px] text-gray-400">0 messages</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <button type="button" className="hover:text-gray-600 p-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    <button type="button" className="hover:text-gray-600 p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Conversation Area */}
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                  <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-[10px] font-semibold text-gray-500 shadow-2xs mb-6">
                    SMS Conversation
                  </span>

                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 text-gray-400 flex items-center justify-center mb-2 shadow-2xs">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800">No messages yet</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Type a message below or pick a template to start chatting.
                  </p>
                </div>

                {/* Bottom Composer */}
                <div className="p-4 bg-white border-t border-gray-100 flex flex-col gap-2">
                  <div className="flex items-center gap-4 text-xs font-semibold border-b border-gray-100 pb-2">
                    <span className="text-[#7014D9] border-b-2 border-[#7014D9] pb-2 -mb-2 cursor-pointer">SMS Compose</span>
                    <span className="text-gray-400 hover:text-gray-600 cursor-pointer">Templates 5</span>
                  </div>

                  <div className="relative">
                    <textarea
                      rows={3}
                      placeholder="Type message to +44 7700 900111... (or pick a template above)"
                      className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 outline-hidden focus:border-[#7014D9] resize-none"
                      data-tl="crm-sms-textarea"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400">0/160</span>
                      <button
                        type="button"
                        onClick={() => pushCrmToast(tl, 'Message sent')}
                        className="px-5 py-1.5 bg-[#7014D9] hover:bg-[#5810B0] text-white rounded-full text-xs font-semibold shadow-xs"
                        data-tl="crm-sms-send-btn"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Contact Sidebar */}
              <div className="w-72 p-5 flex flex-col items-center text-center">
                <div className="relative w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#10B981] border-2 border-white" />
                </div>

                <h4 className="text-sm font-bold text-gray-900">+44 7700 900111</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 mb-4">0 messages exchanged</p>

                {/* Quick Actions */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <button type="button" className="flex flex-col items-center gap-1 group">
                    <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">Call</span>
                  </button>

                  <button type="button" className="flex flex-col items-center gap-1 group">
                    <div className="w-8 h-8 rounded-full bg-[#F3E8FF] text-[#7014D9] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">Message</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="flex flex-col items-center gap-1 group"
                    data-tl="crm-sms-whatsapp-btn"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">WhatsApp</span>
                  </button>

                  <button type="button" className="flex flex-col items-center gap-1 group">
                    <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">Email</span>
                  </button>

                  <button type="button" className="flex flex-col items-center gap-1 group">
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">More</span>
                  </button>
                </div>

                {/* Contact Information */}
                <div className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl p-3 text-left">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200/60">
                    <span className="text-[11px] font-bold text-gray-900">Contact Information</span>
                    <button type="button" className="text-[10px] text-[#7014D9] font-medium hover:underline">Edit</button>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Phone Number</span>
                      <span className="text-gray-800 font-medium">+44 7700 900111</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Email</span>
                      <span className="text-gray-400">―</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Company</span>
                      <span className="text-gray-400">―</span>
                    </div>
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
