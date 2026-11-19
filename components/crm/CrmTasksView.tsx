'use client';

import React from 'react';
import {
  List,
  LayoutGrid,
  Plus,
  Search,
  ChevronDown,
  X,
  Calendar as CalendarIcon,
  CheckCircle2,
} from 'lucide-react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import {
  type CrmTaskItem,
  INITIAL_TASKS,
  NEW_TASK_TEMPLATE,
} from './crm-data';
import { pushCrmToast } from './crm-timeline';

interface Props {
  tl: Timeline;
}

export function CrmTasksView({ tl }: Props) {
  const viewMode = useTimelineVar<'board' | 'list'>(tl, 'crm:tasksViewMode', 'board');
  const isAddInlineOpen = useTimelineVar<boolean>(tl, 'crm:isAddTaskInlineOpen', false);
  const tasks = useTimelineVar<CrmTaskItem[]>(tl, 'crm:tasks', INITIAL_TASKS);
  const selectedTaskId = useTimelineVar<string | null>(tl, 'crm:selectedTaskId', null);

  // Form field variables for inline task creation
  const formTitle = useTimelineVar<string>(tl, 'field:crm_new_task_title', '');
  const formPriority = useTimelineVar<string>(tl, 'field:crm_new_task_priority', 'Medium');
  const formDate = useTimelineVar<string>(tl, 'field:crm_new_task_date', 'mm/dd/yyyy');

  const selectedTask = tasks.find((t: CrmTaskItem) => t.id === selectedTaskId) || (selectedTaskId ? NEW_TASK_TEMPLATE : null);

  const todoTasks = tasks.filter((t: CrmTaskItem) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t: CrmTaskItem) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t: CrmTaskItem) => t.status === 'done');

  const handleAddSubmit = () => {
    const newTask: CrmTaskItem = {
      ...NEW_TASK_TEMPLATE,
      title: formTitle || 'Call The Client before the end of work',
      priority: (formPriority.toLowerCase() as CrmTaskItem['priority']) || 'high',
      dueDate: formDate !== 'mm/dd/yyyy' ? formDate : '11/19/2026',
    };
    const updated = [newTask, ...tasks];
    tl.setVar('crm:tasks', updated);
    tl.setVar('crm:isAddTaskInlineOpen', false);
    pushCrmToast(tl, 'Task created');
  };

  const handleStatusChange = (newStatus: 'todo' | 'in_progress' | 'done' | 'cancelled') => {
    if (!selectedTaskId) return;
    const updated = tasks.map((t: CrmTaskItem) =>
      t.id === selectedTaskId ? { ...t, status: newStatus } : t
    );
    tl.setVar('crm:tasks', updated);
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto bg-[#F8F9FA] p-6 text-[#111111]" data-tl="crm-tasks-view">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[20px] font-bold text-[#111111]">Tasks</h1>
          <span className="text-[12.5px] text-[#6B7280]">{tasks.length} total tasks</span>
        </div>

        {/* View Switcher and Add Task */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl bg-[#F3F4F6] p-1 border border-[#E5E7EB]">
            <button
              type="button"
              data-tl="crm-tasks-view-list"
              onClick={() => tl.setVar('crm:tasksViewMode', 'list')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-[#EDE9FE] text-[#7014D9] shadow-2xs'
                  : 'text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              <List size={14} />
              <span>List</span>
            </button>
            <button
              type="button"
              data-tl="crm-tasks-view-board"
              onClick={() => tl.setVar('crm:tasksViewMode', 'board')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${
                viewMode === 'board'
                  ? 'bg-[#EDE9FE] text-[#7014D9] shadow-2xs'
                  : 'text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              <LayoutGrid size={14} />
              <span>Board</span>
            </button>
          </div>

          <button
            type="button"
            data-tl="crm-btn-add-task"
            onClick={() => tl.setVar('crm:isAddTaskInlineOpen', !isAddInlineOpen)}
            className="flex items-center gap-1.5 h-9 rounded-full bg-[#7014D9] px-4 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90 shadow-2xs"
          >
            <Plus size={15} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-3 pb-5">
        <div className="flex flex-1 max-w-[360px] items-center rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-[#6B7280] shadow-2xs">
          <Search size={15} className="mr-2 text-[#9CA3AF]" />
          <input
            type="text"
            readOnly
            placeholder="Search tasks..."
            className="w-full bg-transparent text-[13px] text-[#111111] placeholder-[#9CA3AF] outline-none"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#374151] shadow-2xs cursor-pointer">
            <span>All statuses</span>
            <ChevronDown size={14} className="text-[#9CA3AF]" />
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#374151] shadow-2xs cursor-pointer">
            <span>All priorities</span>
            <ChevronDown size={14} className="text-[#9CA3AF]" />
          </div>
        </div>
      </div>

      {/* Inline Add Task Form */}
      {isAddInlineOpen && (
        <div
          data-tl="crm-inline-add-task-panel"
          className="flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm mb-6 animate-in fade-in zoom-in-98 duration-150"
        >
          {/* Row 1: Title, Priority, Date */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              readOnly
              data-tl="crm-inline-task-title"
              placeholder="Task title"
              value={formTitle}
              className="flex-1 h-10 rounded-xl border border-[#E5E7EB] px-3.5 text-[13px] text-[#111111] placeholder-[#9CA3AF] outline-none focus:border-[#7014D9]"
            />

            <div
              data-tl="crm-inline-task-priority"
              className="flex h-10 min-w-[120px] items-center justify-between rounded-xl border border-[#E5E7EB] px-3 text-[13px] text-[#374151] bg-white cursor-pointer hover:border-[#7014D9]"
            >
              <span>{formPriority}</span>
              <ChevronDown size={14} className="text-[#9CA3AF]" />
            </div>

            <div
              data-tl="crm-inline-task-date"
              className="flex h-10 min-w-[140px] items-center justify-between rounded-xl border border-[#E5E7EB] px-3 text-[13px] text-[#374151] bg-white cursor-pointer hover:border-[#7014D9]"
            >
              <span className={formDate === 'mm/dd/yyyy' ? 'text-[#9CA3AF]' : 'text-[#111111]'}>{formDate}</span>
              <CalendarIcon size={14} className="text-[#9CA3AF]" />
            </div>
          </div>

          {/* Row 2: Description */}
          <input
            type="text"
            readOnly
            data-tl="crm-inline-task-desc"
            placeholder="Description (optional)"
            className="h-10 rounded-xl border border-[#E5E7EB] px-3.5 text-[13px] text-[#111111] placeholder-[#9CA3AF] outline-none focus:border-[#7014D9]"
          />

          {/* Row 3: Link to contact */}
          <div
            data-tl="crm-inline-task-contact"
            className="flex h-10 items-center justify-between rounded-xl border border-[#E5E7EB] px-3.5 text-[13px] text-[#9CA3AF] bg-white cursor-pointer hover:border-[#7014D9]"
          >
            <span>Link to contact (optional)</span>
            <ChevronDown size={14} className="text-[#9CA3AF]" />
          </div>

          {/* Row 4: Buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              data-tl="crm-submit-add-task"
              onClick={handleAddSubmit}
              className="h-9 rounded-full bg-[#7014D9] px-5 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Add Task
            </button>
            <button
              type="button"
              data-tl="crm-cancel-add-task"
              onClick={() => tl.setVar('crm:isAddTaskInlineOpen', false)}
              className="px-3 py-1.5 text-[12.5px] font-medium text-[#6B7280] hover:text-[#111111]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Board View */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-3 gap-5 items-start" data-tl="crm-tasks-board">
          {/* Column 1: To Do */}
          <div
            data-tl="crm-col-todo"
            className="flex flex-col gap-3 rounded-2xl bg-[#F9FAFB] p-3.5 border border-[#ECECF1] min-h-[360px]"
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
                <span className="text-[13px] font-bold text-[#111111]">To Do</span>
              </div>
              <span className="text-[12px] font-semibold text-[#6B7280]">{todoTasks.length}</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {todoTasks.map((t: CrmTaskItem) => (
                <div
                  key={t.id}
                  data-tl={`crm-task-card-${t.id}`}
                  onClick={() => tl.setVar('crm:selectedTaskId', t.id)}
                  className="flex flex-col gap-2 rounded-xl border border-[#E5E7EB] bg-white p-3.5 shadow-2xs hover:border-[#DDD6FE] transition-all cursor-pointer"
                >
                  <span className="text-[13px] font-semibold text-[#111111] leading-snug">{t.title}</span>
                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex rounded-md bg-[#FEF3C7] px-2 py-0.5 text-[10.5px] font-bold capitalize text-[#D97706]">
                      {t.priority}
                    </span>
                    {t.dueDate && t.dueDate !== '—' && (
                      <span className="text-[11px] text-[#6B7280]">{t.dueDate}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div
            data-tl="crm-col-in-progress"
            className="flex flex-col gap-3 rounded-2xl bg-[#F9FAFB] p-3.5 border border-[#ECECF1] min-h-[360px]"
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                <span className="text-[13px] font-bold text-[#111111]">In Progress</span>
              </div>
              <span className="text-[12px] font-semibold text-[#6B7280]">{inProgressTasks.length}</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {inProgressTasks.map((t: CrmTaskItem) => (
                <div
                  key={t.id}
                  data-tl={`crm-task-card-${t.id}`}
                  onClick={() => tl.setVar('crm:selectedTaskId', t.id)}
                  className="flex flex-col gap-2 rounded-xl border border-[#E5E7EB] bg-white p-3.5 shadow-2xs hover:border-[#DDD6FE] transition-all cursor-pointer"
                >
                  <span className="text-[13px] font-semibold text-[#111111] leading-snug">{t.title}</span>
                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex rounded-md bg-[#FEF3C7] px-2 py-0.5 text-[10.5px] font-bold capitalize text-[#D97706]">
                      {t.priority}
                    </span>
                    {t.dueDate && t.dueDate !== '—' && (
                      <span className="text-[11px] text-[#6B7280]">{t.dueDate}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Done */}
          <div
            data-tl="crm-col-done"
            className="flex flex-col gap-3 rounded-2xl bg-[#F9FAFB] p-3.5 border border-[#ECECF1] min-h-[360px]"
          >
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                <span className="text-[13px] font-bold text-[#111111]">Done</span>
              </div>
              <span className="text-[12px] font-semibold text-[#6B7280]">{doneTasks.length}</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {doneTasks.map((t: CrmTaskItem) => (
                <div
                  key={t.id}
                  data-tl={`crm-task-card-${t.id}`}
                  onClick={() => tl.setVar('crm:selectedTaskId', t.id)}
                  className="flex flex-col gap-2 rounded-xl border border-[#E5E7EB] bg-white p-3.5 shadow-2xs hover:border-[#DDD6FE] transition-all cursor-pointer"
                >
                  <span className="text-[13px] font-semibold text-[#111111] leading-snug">{t.title}</span>
                  <div className="flex items-center justify-between pt-1">
                    <span
                      className={`inline-flex rounded-md px-2 py-0.5 text-[10.5px] font-bold capitalize ${
                        t.priority === 'high'
                          ? 'bg-[#FEF3C7] text-[#D97706]'
                          : 'bg-[#EFF6FF] text-[#2563EB]'
                      }`}
                    >
                      {t.priority}
                    </span>
                    {t.dueDate && t.dueDate !== '—' && (
                      <span className="text-[11px] text-[#6B7280]">{t.dueDate}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="rounded-2xl border border-[#ECECF1] bg-white overflow-hidden shadow-xs">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#ECECF1] bg-[#F9FAFB] text-[11px] font-semibold tracking-wider text-[#6B7280]">
                <th className="py-3 px-5">TITLE</th>
                <th className="py-3 px-4">PRIORITY</th>
                <th className="py-3 px-4">DUE DATE</th>
                <th className="py-3 px-5">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECECF1]">
              {tasks.map((t: CrmTaskItem) => (
                <tr
                  key={t.id}
                  onClick={() => tl.setVar('crm:selectedTaskId', t.id)}
                  className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-5 font-semibold text-[#111111]">{t.title}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex rounded-md px-2 py-0.5 text-[10.5px] font-bold capitalize ${
                        t.priority === 'high' ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#EFF6FF] text-[#2563EB]'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#6B7280]">{t.dueDate}</td>
                  <td className="py-3 px-5">
                    <span className="capitalize text-[#374151] font-medium">{t.status.replace('_', ' ')}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Task Details Slide-Over Panel */}
      {selectedTask && (
        <div
          data-tl="crm-task-details-panel"
          className="fixed top-0 right-0 z-40 h-full w-[400px] border-l border-[#ECECF1] bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
        >
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-1 border-b border-[#F3F4F6]">
              <h2 className="text-[16px] font-bold text-[#111111]">Task Details</h2>
              <button
                type="button"
                data-tl="crm-task-details-close"
                onClick={() => tl.setVar('crm:selectedTaskId', null)}
                className="p-1 rounded-lg text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F3F4F6]"
              >
                <X size={18} />
              </button>
            </div>

            {/* TITLE */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">Title</label>
              <div
                data-tl="crm-task-details-title"
                className="rounded-xl border border-[#E5E7EB] p-3 text-[13px] font-medium text-[#111111] bg-white"
              >
                {selectedTask.title}
              </div>
            </div>

            {/* STATUS (2x2 grid) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">Status</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'todo' as const, label: 'To Do', sel: 'crm-status-todo' },
                  { id: 'in_progress' as const, label: 'In Progress', sel: 'crm-status-in-progress' },
                  { id: 'done' as const, label: 'Done', sel: 'crm-status-done' },
                  { id: 'cancelled' as const, label: 'Cancelled', sel: 'crm-status-cancelled' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    data-tl={s.sel}
                    onClick={() => handleStatusChange(s.id)}
                    className={`h-9 rounded-xl border text-[12px] font-semibold transition-all ${
                      selectedTask.status === s.id
                        ? 'border-[#7014D9] bg-[#F3ECFC] text-[#7014D9]'
                        : 'border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PRIORITY (4 in row) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">Priority</label>
              <div className="grid grid-cols-4 gap-2">
                {['Low', 'Medium', 'High', 'Urgent'].map((p) => {
                  const isCurrent = selectedTask.priority.toLowerCase() === p.toLowerCase();
                  return (
                    <button
                      key={p}
                      type="button"
                      data-tl={`crm-priority-${p.toLowerCase()}`}
                      className={`h-8 rounded-xl border text-[11.5px] font-semibold transition-all ${
                        isCurrent
                          ? 'border-[#F59E0B] bg-[#FEF3C7] text-[#D97706]'
                          : 'border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DUE DATE */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">Due Date</label>
              <div className="flex h-10 items-center justify-between rounded-xl border border-[#E5E7EB] px-3.5 text-[13px] text-[#111111] bg-white">
                <span>{selectedTask.dueDate || '11/19/2026'}</span>
                <CalendarIcon size={14} className="text-[#9CA3AF]" />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">Description</label>
              <div className="min-h-[70px] rounded-xl border border-[#E5E7EB] p-3 text-[13px] text-[#9CA3AF] bg-white">
                {selectedTask.description || 'Add a description...'}
              </div>
            </div>

            {/* EMAIL REMINDERS */}
            <div className="rounded-xl border border-[#E5E7EB] p-3.5 flex items-start gap-3 bg-[#F9FAFB]">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#7014D9] text-white">
                <CheckCircle2 size={13} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[12.5px] font-semibold text-[#111111]">Email reminders</span>
                <span className="text-[11px] text-[#6B7280] leading-relaxed">
                  Send email notifications for this task when it&apos;s urgent. Uncheck to only show the in-app reminder.
                </span>
              </div>
            </div>

            {/* LINKED CONTACT */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-wider text-[#6B7280] uppercase">Linked Contact</label>
              <div className="flex h-10 items-center justify-between rounded-xl border border-[#E5E7EB] px-3.5 text-[13px] text-[#4B5563] bg-white cursor-pointer">
                <span>{selectedTask.linkedContact || 'No contact linked'}</span>
                <ChevronDown size={14} className="text-[#9CA3AF]" />
              </div>
            </div>

            {/* CREATED */}
            <div className="flex items-center justify-between text-[12px] text-[#6B7280] pt-1">
              <span>Created</span>
              <span>{selectedTask.createdDate || '11/19/2026'}</span>
            </div>
          </div>

          {/* Delete Task */}
          <div className="pt-6 border-t border-[#F3F4F6]">
            <button
              type="button"
              data-tl="crm-btn-delete-task"
              className="w-full h-10 rounded-xl border border-[#FECACA] bg-[#FEF2F2] text-[13px] font-semibold text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
            >
              Delete Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
