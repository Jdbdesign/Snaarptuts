'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import {
  INITIAL_CONVERSATIONS,
  type CrmConversationItem,
} from './crm-data';
import {
  Search,
  SlidersHorizontal,
  Send,
  MessageSquare,
  Phone,
  Mail,
  Settings,
  ArrowLeft,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface Props {
  tl: Timeline;
  onOpenConnectEmail?: () => void;
}

export type CrmChannelView = 'inbox' | 'facebook' | 'instagram' | 'whatsapp' | 'telegram';

export function CrmMessagesView({ tl, onOpenConnectEmail }: Props) {
  const channelView = useTimelineVar<CrmChannelView>(tl, 'crm:channelView', 'inbox');
  const activeChannelFilter = useTimelineVar<string>(tl, 'crm:activeChannelFilter', 'all');
  const selectedConvId = useTimelineVar<string>(tl, 'crm:selectedConvId', 'conv-whatsapp');
  const isFbManualOpen = useTimelineVar<boolean>(tl, 'crm:isFbManualOpen', false);

  const selectedConv: CrmConversationItem =
    INITIAL_CONVERSATIONS.find((c) => c.id === selectedConvId) ?? INITIAL_CONVERSATIONS[0];

  const handleSelectFilter = (filter: string) => {
    tl.setVar('crm:activeChannelFilter', filter);
    if (filter === 'facebook') {
      tl.setVar('crm:channelView', 'facebook');
      tl.setUrl('crm.snaarp.com/messages/facebook');
    } else if (filter === 'instagram') {
      tl.setVar('crm:channelView', 'instagram');
      tl.setUrl('crm.snaarp.com/messages/instagram');
    } else if (filter === 'whatsapp-setup') {
      tl.setVar('crm:channelView', 'whatsapp');
      tl.setUrl('crm.snaarp.com/messages/whatsapp');
    } else if (filter === 'telegram') {
      tl.setVar('crm:channelView', 'telegram');
      tl.setUrl('crm.snaarp.com/messages/telegram');
    } else if (filter === 'email') {
      if (onOpenConnectEmail) onOpenConnectEmail();
    } else {
      tl.setVar('crm:channelView', 'inbox');
      tl.setUrl('crm.snaarp.com/messages');
    }
  };

  const handleBackToMessages = () => {
    tl.setVar('crm:channelView', 'inbox');
    tl.setVar('crm:activeChannelFilter', 'all');
    tl.setUrl('crm.snaarp.com/messages');
  };

  return (
    <div
      data-tl="crm-messages-view"
      className="flex-1 flex min-w-0 bg-white overflow-hidden"
    >
      {/* Left Panel: Conversations list (always persistent) */}
      <aside className="w-[300px] shrink-0 border-r border-[#ECECF1] flex flex-col bg-white">
        {/* Search Bar */}
        <div className="p-3 border-b border-[#ECECF1] flex items-center gap-2">
          <div className="flex-1 flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700">
            <Search size={14} className="text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              readOnly
              placeholder="Search conversations..."
              className="w-full bg-transparent outline-none placeholder:text-gray-400 text-xs"
              data-tl="crm-conv-search"
            />
          </div>
          <button
            type="button"
            data-tl="crm-conv-filter"
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            title="Filters"
          >
            <SlidersHorizontal size={15} />
          </button>
        </div>

        {/* Conversation Items */}
        <div data-tl="crm-conv-list" className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {INITIAL_CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              type="button"
              data-tl={`crm-conv-item-${conv.id}`}
              onClick={() => {
                tl.setVar('crm:selectedConvId', conv.id);
                tl.setVar('crm:channelView', 'inbox');
                tl.setVar('crm:activeChannelFilter', 'all');
              }}
              className={`w-full text-left p-3.5 flex flex-col gap-1 transition-colors cursor-pointer ${
                selectedConvId === conv.id && channelView === 'inbox'
                  ? 'bg-[#F3ECFC]'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900">{conv.title}</span>
                <span className="text-[10px] text-gray-400 font-mono">{conv.date}</span>
              </div>
              <p className="text-[11px] text-gray-500 truncate">{conv.preview}</p>
            </button>
          ))}
        </div>
      </aside>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col bg-white min-w-0 overflow-hidden">
        {/* Top Channel Toolbar (always persistent) */}
        <header className="h-13 px-4 border-b border-[#ECECF1] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-1.5 text-xs">
            {/* All Filter Pill */}
            <button
              type="button"
              data-tl="crm-channel-filter-all"
              onClick={() => handleSelectFilter('all')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                activeChannelFilter === 'all'
                  ? 'bg-[#F3ECFC] text-[#7014D9] border border-[#DDD6FE]'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare size={13} />
              <span>All</span>
            </button>

            {/* Facebook Messenger */}
            <button
              type="button"
              data-tl="crm-channel-filter-facebook"
              onClick={() => handleSelectFilter('facebook')}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                activeChannelFilter === 'facebook' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-blue-50'
              }`}
              title="Facebook Messenger"
            >
              <div className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-[10px]">
                f
              </div>
            </button>

            {/* Instagram */}
            <button
              type="button"
              data-tl="crm-channel-filter-instagram"
              onClick={() => handleSelectFilter('instagram')}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                activeChannelFilter === 'instagram' ? 'ring-2 ring-pink-500 bg-pink-50' : 'hover:bg-pink-50'
              }`}
              title="Instagram"
            >
              <div className="w-5 h-5 rounded-full bg-linear-to-tr from-amber-500 via-pink-500 to-purple-600 text-white flex items-center justify-center text-[10px]">
                📷
              </div>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              data-tl="crm-channel-filter-whatsapp-setup"
              onClick={() => handleSelectFilter('whatsapp-setup')}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                activeChannelFilter === 'whatsapp-setup' ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:bg-emerald-50'
              }`}
              title="WhatsApp"
            >
              <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[10px]">
                <Phone size={10} />
              </div>
            </button>

            {/* Telegram */}
            <button
              type="button"
              data-tl="crm-channel-filter-telegram"
              onClick={() => handleSelectFilter('telegram')}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                activeChannelFilter === 'telegram' ? 'ring-2 ring-sky-500 bg-sky-50' : 'hover:bg-sky-50'
              }`}
              title="Telegram"
            >
              <div className="w-5 h-5 rounded-full bg-[#229ED9] text-white flex items-center justify-center text-[10px]">
                ✈
              </div>
            </button>

            {/* SMS */}
            <button
              type="button"
              data-tl="crm-channel-filter-sms"
              onClick={() => handleSelectFilter('sms')}
              className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              title="SMS"
            >
              <div className="w-5 h-5 rounded-full bg-gray-600 text-white flex items-center justify-center text-[10px]">
                💬
              </div>
            </button>

            {/* Email */}
            <button
              type="button"
              data-tl="crm-channel-filter-email"
              onClick={() => handleSelectFilter('email')}
              className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Email"
            >
              <Mail size={16} className="text-gray-500" />
            </button>
          </div>

          <button
            type="button"
            data-tl="crm-messages-settings"
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings size={16} />
          </button>
        </header>

        {/* Content Area depending on channelView */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* ================= INBOX VIEW ================= */}
          {channelView === 'inbox' && (
            <div className="flex-1 flex flex-col min-w-0 bg-white">
              {/* Conversation Header */}
              <div className="px-6 py-3 border-b border-gray-100 bg-white flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-gray-900">{selectedConv.title}</h2>
                  <p className="text-[11px] text-gray-400">{selectedConv.via}</p>
                </div>
              </div>

              {/* Message Thread Body */}
              <div
                data-tl="crm-messages-chat-thread"
                className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/40"
              >
                {selectedConv.messages.map((msg) => (
                  <div key={msg.id} className="flex flex-col items-start max-w-[480px]">
                    <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs text-xs text-gray-800 leading-relaxed">
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 ml-1 font-mono">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Unknown Contact Warning Banner */}
              {selectedConv.isUnknownContact && (
                <div
                  data-tl="crm-unknown-contact-banner"
                  className="px-6 py-2.5 bg-[#FEF9C3] border-t border-b border-[#FEF08A] flex items-center justify-between text-xs text-[#854D0E]"
                >
                  <span>Unknown contact — not linked in your CRM</span>
                  <button
                    type="button"
                    data-tl="crm-create-contact-from-msg"
                    className="font-semibold text-amber-800 hover:text-amber-950 hover:underline cursor-pointer"
                  >
                    + Create Contact
                  </button>
                </div>
              )}

              {/* Message Composer */}
              <div className="p-3 border-t border-gray-100 bg-white flex items-center gap-3">
                <input
                  type="text"
                  readOnly
                  placeholder="Type a message..."
                  data-tl="crm-message-composer-input"
                  className="flex-1 bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-800 placeholder:text-gray-400 outline-none"
                />
                <button
                  type="button"
                  data-tl="crm-message-send-btn"
                  className="w-8 h-8 rounded-full bg-[#7014D9] text-white flex items-center justify-center shadow-xs hover:bg-[#5E11B8] transition-colors cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}

          {/* ================= CHANNEL SETUP: FACEBOOK ================= */}
          {channelView === 'facebook' && (
            <div data-tl="crm-facebook-setup" className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Facebook</h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Connect your Facebook Page to send and receive messages in the inbox
                  </p>
                </div>
                <button
                  type="button"
                  data-tl="crm-channel-back-btn"
                  onClick={handleBackToMessages}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowLeft size={14} />
                  <span>Back to messages</span>
                </button>
              </div>

              {/* Status Card */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-4 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1877F2] font-bold text-base flex items-center justify-center">
                    f
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-gray-900">Facebook messaging</h3>
                    <p className="text-[11px] text-gray-400">Not connected yet</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold">
                  INACTIVE
                </span>
              </div>

              {/* Setup steps */}
              <div data-tl="crm-fb-setup-steps" className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Setup steps</h3>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#7014D9] flex items-center gap-1 hover:underline">
                    <span>Meta dashboard</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                <ol className="space-y-2 text-gray-600 text-xs">
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                    <span>Use a Facebook Page. Personal profiles cannot be connected for Messenger.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                    <span>Use hosted Meta OAuth when it is ready. The flow grants Pages and subscribes each Page to messaging webhooks.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                    <span>Advanced manual setup accepts a Page ID and Page access token. The server validates both with Meta before saving.</span>
                  </li>
                </ol>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">OAuth callback URL</label>
                    <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-600">
                      <span className="flex-1 font-mono text-[11px]">https://crm.example.com/api/v1/messages/oauth/callback</span>
                      <Copy size={13} className="text-gray-400 cursor-pointer" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Webhook URL</label>
                    <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-600">
                      <span className="flex-1 font-mono text-[11px]">https://crm.example.com/api/v1/messages/webhook</span>
                      <Copy size={13} className="text-gray-400 cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-[11px] text-gray-400 border-t border-gray-100">
                  <div className="space-y-0.5">
                    <p>App secret: <span className="text-emerald-600 font-semibold">configured</span></p>
                    <p>Dedicated encryption key: <span className="text-emerald-600 font-semibold">configured</span></p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p>Verify token: <span className="text-emerald-600 font-semibold">configured</span></p>
                    <p>OAuth scopes: pages_messaging, pages_manage_metadata, pages_show_list, instagram_basic</p>
                  </div>
                </div>
              </div>

              {/* Add a Facebook channel */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4">
                <h3 className="font-bold text-xs text-gray-900">Add a Facebook channel</h3>

                <button
                  type="button"
                  className="w-full py-2.5 bg-[#1877F2] text-white font-semibold text-xs rounded-xl shadow-xs hover:bg-[#166FE5] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Connect with Meta</span>
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    data-tl="crm-fb-manual-toggle"
                    onClick={() => tl.setVar('crm:isFbManualOpen', !isFbManualOpen)}
                    className="text-xs font-semibold text-[#7014D9] hover:underline cursor-pointer"
                  >
                    + Advanced: connect manually
                  </button>
                </div>

                {isFbManualOpen && (
                  <div data-tl="crm-fb-manual-form" className="space-y-3 pt-3 border-t border-gray-100 text-xs">
                    <p className="text-[11px] text-gray-500">
                      The server checks the supplied ID and token against Meta Graph v18 before encrypted persistence. Invalid or mismatched credentials are rejected.
                    </p>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Page ID</label>
                      <input
                        type="text"
                        readOnly
                        placeholder="e.g. 1029384756"
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Display name (Meta name will be used)</label>
                      <input
                        type="text"
                        readOnly
                        placeholder="e.g. Acme Support"
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Access token</label>
                      <input
                        type="text"
                        readOnly
                        placeholder="Page / account access token"
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      className="w-full py-2 bg-[#DDD6FE] text-[#7014D9] font-semibold text-xs rounded-xl cursor-not-allowed"
                    >
                      Connect channel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= CHANNEL SETUP: INSTAGRAM ================= */}
          {channelView === 'instagram' && (
            <div data-tl="crm-instagram-setup" className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Instagram</h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Connect your Instagram account to send and receive messages in the inbox
                  </p>
                </div>
                <button
                  type="button"
                  data-tl="crm-channel-back-btn"
                  onClick={handleBackToMessages}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowLeft size={14} />
                  <span>Back to messages</span>
                </button>
              </div>

              {/* Status Card */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-4 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 font-bold text-base flex items-center justify-center">
                    📷
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-gray-900">Instagram messaging</h3>
                    <p className="text-[11px] text-gray-400">Not connected yet</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold">
                  INACTIVE
                </span>
              </div>

              {/* Setup steps */}
              <div data-tl="crm-ig-setup-steps" className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4 text-xs">
                <h3 className="font-bold text-gray-900">Setup steps</h3>
                <ol className="space-y-2 text-gray-600 text-xs">
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                    <span>Use an Instagram Business or Creator account linked to a Facebook Page.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                    <span>Hosted Meta OAuth discovers the linked professional account and subscribes its Facebook Page for messaging events.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                    <span>Advanced manual setup accepts the professional account ID and a token. The server validates the identity before saving.</span>
                  </li>
                </ol>
              </div>

              {/* Add Instagram channel */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4 text-xs">
                <h3 className="font-bold text-gray-900">Add an Instagram channel</h3>
                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-blue-800 text-[11px]">
                  Instagram DMs connect through the Facebook Page they&apos;re linked to. Use Connect with Meta (same flow as Facebook) and any Instagram account linked to a granted Page is added automatically.
                </div>

                <button
                  type="button"
                  className="w-full py-2.5 bg-[#1877F2] text-white font-semibold text-xs rounded-xl shadow-xs hover:bg-[#166FE5] transition-colors"
                >
                  Connect with Meta (via Facebook)
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#7014D9] hover:underline cursor-pointer"
                  >
                    + Advanced: connect manually
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= CHANNEL SETUP: WHATSAPP ================= */}
          {channelView === 'whatsapp' && (
            <div data-tl="crm-whatsapp-setup" className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">WhatsApp</h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Connect your WhatsApp number to send and receive messages in the inbox
                  </p>
                </div>
                <button
                  type="button"
                  data-tl="crm-channel-back-btn"
                  onClick={handleBackToMessages}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowLeft size={14} />
                  <span>Back to messages</span>
                </button>
              </div>

              {/* Status Card */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-4 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#25D366] font-bold text-base flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-gray-900">WhatsApp messaging</h3>
                    <p className="text-[11px] text-gray-400">Not connected yet</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold">
                  INACTIVE
                </span>
              </div>

              {/* Setup steps */}
              <div data-tl="crm-wa-setup-steps" className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4 text-xs">
                <h3 className="font-bold text-gray-900">Setup steps</h3>
                <ol className="space-y-2 text-gray-600 text-xs">
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                    <span>Add WhatsApp to your Meta app and copy the Phone Number ID, not the displayed phone number.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                    <span>Create a permanent system-user access token with WhatsApp messaging permissions. Temporary dashboard tokens expire.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                    <span>Register the webhook URL below and subscribe the WhatsApp product to the messages field.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
                    <span>Free-form replies are limited to the 24-hour customer-service window. Outside it, send an approved template.</span>
                  </li>
                </ol>
              </div>

              {/* Add a WhatsApp channel */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4 text-xs">
                <h3 className="font-bold text-gray-900">Add a WhatsApp channel</h3>
                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-emerald-800 text-[11px]">
                  WhatsApp Business uses a Phone Number ID and a permanent system-user token. There is no hosted OAuth flow. Register the webhook and subscribe to messages; free-form replies are limited to 24 hours after the customer&apos;s last message, otherwise use an approved template.
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#7014D9] hover:underline cursor-pointer"
                  >
                    + Connect with Phone Number ID
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= CHANNEL SETUP: TELEGRAM ================= */}
          {channelView === 'telegram' && (
            <div data-tl="crm-telegram-setup" className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Telegram</h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Connect your Telegram bot to send and receive messages in the inbox
                  </p>
                </div>
                <button
                  type="button"
                  data-tl="crm-channel-back-btn"
                  onClick={handleBackToMessages}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowLeft size={14} />
                  <span>Back to messages</span>
                </button>
              </div>

              {/* Status Card */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-4 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#229ED9] font-bold text-base flex items-center justify-center">
                    ✈
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-gray-900">Telegram messaging</h3>
                    <p className="text-[11px] text-gray-400">Not connected yet</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold">
                  INACTIVE
                </span>
              </div>

              {/* Setup steps */}
              <div data-tl="crm-tg-setup-steps" className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4 text-xs">
                <h3 className="font-bold text-gray-900">Setup steps</h3>
                <ol className="space-y-2 text-gray-600 text-xs">
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                    <span>Create a Telegram bot with BotFather and copy its token.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                    <span>Paste the token below. The server validates the bot and registers a secure webhook automatically.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-purple-100 text-[#7014D9] text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                    <span>Start the bot from a Telegram account or add it to a group before expecting messages in CRM.</span>
                  </li>
                </ol>
              </div>

              {/* Add Telegram channel */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs space-y-4 text-xs">
                <h3 className="font-bold text-gray-900">Add a Telegram channel</h3>
                <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-xl text-sky-800 text-[11px]">
                  Telegram uses a BotFather token. The server validates the bot, registers a secure webhook, and stores the token encrypted. After connecting, start the bot or add it to a group to receive messages.
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#7014D9] hover:underline cursor-pointer"
                  >
                    + Advanced: connect manually
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
