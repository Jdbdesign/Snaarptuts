'use client';

import React, { useState } from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import { AUTOMATION_EMAIL_TEMPLATES } from './crm-data';
import { pushCrmToast } from './crm-timeline';
import {
  Play,
  Mail,
  Square,
  Sparkles,
  Save,
  Plus,
  Minus,
  Maximize2,
  Lock,
  ChevronDown,
  Layers,
  Zap,
  Clock,
  GitBranch,
  Tag,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  tl: Timeline;
}

export function CrmAutomationsView({ tl }: Props) {
  const workflowName = useTimelineVar<string>(tl, 'crm:workflowName', 'New Contact Follow-up');
  const selectedNodeId = useTimelineVar<string>(tl, 'crm:selectedNodeId', 'send-email');
  const selectedTemplate = useTimelineVar<string>(
    tl,
    'crm:selectedAutomationTemplate',
    'Email 3 — Understand customer needs'
  );
  const isWorkflowSaved = useTimelineVar<boolean>(tl, 'crm:isWorkflowSaved', false);

  const [scope, setScope] = useState<string>('My contacts (safe default)');
  const [module, setModule] = useState<string>('Contacts');

  const handleSaveWorkflow = () => {
    tl.setVar('crm:isWorkflowSaved', true);
    pushCrmToast(tl, 'Workflow saved successfully');
  };

  const handleSelectNode = (nodeId: string) => {
    tl.setVar('crm:selectedNodeId', nodeId);
  };

  const handleSelectTemplate = (tmpl: string) => {
    tl.setVar('crm:selectedAutomationTemplate', tmpl);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-hidden text-[#111111]" data-tl="crm-automations-view">
      {/* Top Builder Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-[#ECECF1] z-10 shrink-0">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={workflowName}
            onChange={(e) => tl.setVar('crm:workflowName', e.target.value)}
            className="font-semibold text-sm text-[#111111] bg-transparent border border-transparent hover:border-[#E5E7EB] focus:border-[#7014D9] rounded px-2 py-1 focus:outline-none transition-colors"
            data-tl="crm-workflow-name-input"
            placeholder="Workflow Name"
          />

          <div className="h-4 w-px bg-[#E5E7EB]" />

          {/* Scope Select */}
          <div className="relative">
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="appearance-none bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-2.5 py-1 pr-6 text-xs text-[#374151] font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer"
              data-tl="crm-workflow-scope-select"
            >
              <option>My contacts (safe default)</option>
              <option>All organization contacts</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#6B7280] absolute right-2 top-2 pointer-events-none" />
          </div>

          {/* Module Select */}
          <div className="relative">
            <select
              value={module}
              onChange={(e) => setModule(e.target.value)}
              className="appearance-none bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-2.5 py-1 pr-6 text-xs text-[#374151] font-medium focus:outline-none focus:border-[#7014D9] cursor-pointer"
              data-tl="crm-workflow-module-select"
            >
              <option>Contacts</option>
              <option>Companies</option>
              <option>Deals</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#6B7280] absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs font-medium text-[#374151] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            data-tl="crm-ai-automation-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7014D9]" />
            <span>AI Automation</span>
          </button>

          <button
            onClick={handleSaveWorkflow}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer shadow-xs ${
              isWorkflowSaved ? 'bg-emerald-600' : 'bg-[#7014D9] hover:bg-[#5E10B8]'
            }`}
            data-tl="crm-save-workflow-btn"
          >
            {isWorkflowSaved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Workflow</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Node Library */}
        <div className="w-52 bg-white border-r border-[#ECECF1] p-3 overflow-y-auto space-y-4 shrink-0 text-xs select-none">
          {/* TRIGGERS */}
          <div>
            <div className="font-bold text-[10px] tracking-wider text-[#9CA3AF] uppercase mb-2 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Triggers</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium cursor-grab active:cursor-grabbing hover:bg-emerald-100 transition-colors">
                <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>Record Created</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-[#E5E7EB] text-[#4B5563] cursor-grab hover:bg-gray-100 transition-colors">
                <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Record Updated</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-[#E5E7EB] text-[#4B5563] cursor-grab hover:bg-gray-100 transition-colors">
                <Tag className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Tag Added</span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div>
            <div className="font-bold text-[10px] tracking-wider text-[#9CA3AF] uppercase mb-2 flex items-center gap-1">
              <Layers className="w-3 h-3" />
              <span>Actions</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-medium cursor-grab active:cursor-grabbing hover:bg-blue-100 transition-colors">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Send Email</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-[#E5E7EB] text-[#4B5563] cursor-grab hover:bg-gray-100 transition-colors">
                <span>Send SMS</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-[#E5E7EB] text-[#4B5563] cursor-grab hover:bg-gray-100 transition-colors">
                <span>Send WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-[#E5E7EB] text-[#4B5563] cursor-grab hover:bg-gray-100 transition-colors">
                <span>Create Task</span>
              </div>
            </div>
          </div>

          {/* CONTROL */}
          <div>
            <div className="font-bold text-[10px] tracking-wider text-[#9CA3AF] uppercase mb-2 flex items-center gap-1">
              <GitBranch className="w-3 h-3" />
              <span>Control</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-[#E5E7EB] text-[#4B5563] cursor-grab hover:bg-gray-100 transition-colors">
                <span>Condition (If / Else)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-[#E5E7EB] text-[#4B5563] cursor-grab hover:bg-gray-100 transition-colors">
                <span>Wait / Delay</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 font-medium cursor-grab active:cursor-grabbing hover:bg-rose-100 transition-colors">
                <Square className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                <span>End</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Canvas */}
        <div
          className="flex-1 relative overflow-auto p-8 flex flex-col items-center justify-start select-none"
          style={{
            backgroundImage: 'radial-gradient(#CBD5E1 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
          data-tl="crm-automations-canvas"
        >
          {/* Node Graph Column */}
          <div className="w-[260px] flex flex-col items-center pt-2">
            {/* Node 1: Record Created */}
            <div
              onClick={() => handleSelectNode('record-created')}
              className={`w-full bg-[#10B981] text-white rounded-2xl p-3.5 shadow-lg relative cursor-pointer transition-transform hover:scale-[1.02] ${
                selectedNodeId === 'record-created' ? 'ring-2 ring-[#7014D9] ring-offset-2' : ''
              }`}
              data-tl="crm-node-record-created"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                  <span className="font-semibold text-xs tracking-wide">Record Created</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-white/20">
                  Trigger
                </span>
              </div>
              <div className="text-[11px] text-emerald-100 pl-8">
                Scope: <span className="font-medium text-white">Contacts</span>
              </div>

              {/* Bottom Port Circle */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-emerald-600 shadow-xs" />
            </div>

            {/* Connecting SVG 1 */}
            <div className="h-12 w-full flex items-center justify-center relative my-0.5">
              <svg width="24" height="48" className="overflow-visible">
                <line
                  x1="12"
                  y1="0"
                  x2="12"
                  y2="44"
                  stroke="#7014D9"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <polygon points="8,40 16,40 12,46" fill="#7014D9" />
              </svg>
            </div>

            {/* Node 2: Send Email */}
            <div
              onClick={() => handleSelectNode('send-email')}
              className={`w-full bg-[#3B82F6] text-white rounded-2xl p-3.5 shadow-lg relative cursor-pointer transition-transform hover:scale-[1.02] ${
                selectedNodeId === 'send-email' ? 'ring-2 ring-[#7014D9] ring-offset-2' : ''
              }`}
              data-tl="crm-node-send-email"
            >
              {/* Top Port Circle */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-blue-600 shadow-xs" />

              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-semibold text-xs tracking-wide">Send Email</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-white/20">
                  Action
                </span>
              </div>
              <div className="text-[11px] text-blue-100 pl-8">
                To: <span className="font-medium text-white">{`{contact.email}`}</span>
              </div>

              {/* Bottom Port Circle */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-blue-600 shadow-xs" />
            </div>

            {/* Connecting SVG 2 */}
            <div className="h-12 w-full flex items-center justify-center relative my-0.5">
              <svg width="24" height="48" className="overflow-visible">
                <line
                  x1="12"
                  y1="0"
                  x2="12"
                  y2="44"
                  stroke="#7014D9"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <polygon points="8,40 16,40 12,46" fill="#7014D9" />
              </svg>
            </div>

            {/* Node 3: End */}
            <div
              onClick={() => handleSelectNode('end')}
              className={`w-[160px] bg-[#EF4444] text-white rounded-2xl p-3 shadow-lg relative cursor-pointer transition-transform hover:scale-[1.02] ${
                selectedNodeId === 'end' ? 'ring-2 ring-[#7014D9] ring-offset-2' : ''
              }`}
              data-tl="crm-node-end"
            >
              {/* Top Port Circle */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-rose-600 shadow-xs" />

              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center">
                  <Square className="w-3 h-3 fill-white text-white" />
                </div>
                <span className="font-semibold text-xs tracking-wide">End Workflow</span>
              </div>
            </div>
          </div>

          {/* Zoom & Canvas Controls */}
          <div className="absolute bottom-4 left-4 bg-white border border-[#E5E7EB] rounded-xl shadow-md p-1 flex items-center gap-1 text-[#4B5563]">
            <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-[#E5E7EB]" />
            <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mini-map */}
          <div className="absolute bottom-4 right-4 w-28 h-20 bg-white/90 backdrop-blur-xs border border-[#E5E7EB] rounded-xl shadow-md p-2 flex flex-col items-center justify-center gap-1.5">
            <div className="w-10 h-2.5 bg-emerald-400 rounded-xs" />
            <div className="w-0.5 h-2 bg-purple-300" />
            <div className="w-10 h-2.5 bg-blue-400 rounded-xs" />
            <div className="w-0.5 h-2 bg-purple-300" />
            <div className="w-6 h-2 bg-rose-400 rounded-xs" />
          </div>
        </div>

        {/* Right Node Config Panel */}
        <div
          className="w-72 bg-white border-l border-[#ECECF1] p-4 flex flex-col justify-between overflow-y-auto text-xs shrink-0"
          data-tl="crm-node-config-panel"
        >
          {selectedNodeId === 'send-email' ? (
            <div className="space-y-4">
              <div>
                <div className="font-bold text-[10px] tracking-wider text-[#9CA3AF] uppercase mb-1">
                  Node Config
                </div>
                <h3 className="font-semibold text-sm text-[#111111] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Send Email</span>
                </h3>
              </div>

              {/* Template selector */}
              <div>
                <label className="block font-medium text-[#374151] mb-1">Email Template</label>
                <div className="relative">
                  <select
                    value={selectedTemplate}
                    onChange={(e) => handleSelectTemplate(e.target.value)}
                    className="w-full appearance-none px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9] cursor-pointer pr-7"
                    data-tl="crm-automation-template-select"
                  >
                    {AUTOMATION_EMAIL_TEMPLATES.map((tmpl) => (
                      <option key={tmpl} value={tmpl}>
                        {tmpl}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Recipient */}
              <div>
                <label className="block font-medium text-[#374151] mb-1">Recipient</label>
                <div className="relative">
                  <select
                    defaultValue="Contact Email ({contact.email})"
                    className="w-full appearance-none px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9] cursor-pointer pr-7"
                    data-tl="crm-automation-recipient-select"
                  >
                    <option>Contact Email ({`{contact.email}`})</option>
                    <option>Account Owner</option>
                    <option>Custom Address...</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
                <p className="text-[11px] text-[#6B7280] mt-1">
                  Will send to: <code className="text-[#7014D9]">{`{contact.email}`}</code>
                </p>
              </div>

              {/* Subject */}
              <div>
                <label className="block font-medium text-[#374151] mb-1">Subject</label>
                <input
                  type="text"
                  defaultValue="A question about {{company}}"
                  className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9]"
                  data-tl="crm-automation-subject-input"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block font-medium text-[#374151] mb-1">Message Body</label>
                <textarea
                  rows={4}
                  defaultValue={`Hi {{first_name}},\n\nI noticed your team at {{company}} is actively scaling. I would love to learn more about your current process and see if Snaarp can help streamline your workflows.\n\nBest,\nJane`}
                  className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#7014D9] font-sans resize-none"
                  data-tl="crm-automation-body-input"
                />
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  className="text-xs text-[#7014D9] font-medium hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Insert event variable...</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="font-bold text-[10px] tracking-wider text-[#9CA3AF] uppercase mb-1">
                  Node Config
                </div>
                <h3 className="font-semibold text-sm text-[#111111]">
                  {selectedNodeId === 'record-created' ? 'Record Created' : 'End Workflow'}
                </h3>
              </div>
              <p className="text-xs text-[#6B7280]">
                {selectedNodeId === 'record-created'
                  ? 'Fires when a new contact record is created in the CRM.'
                  : 'Stops workflow execution for this record.'}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-[#F3F4F6]">
            <p className="text-[10px] text-[#9CA3AF] text-center">
              Isolated tutorial automation environment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
