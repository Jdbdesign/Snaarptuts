'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import { CrmShell, type CrmNavId } from './CrmShell';
import { CrmHomeView } from './CrmHomeView';
import { CrmDashboardsView } from './CrmDashboardsView';
import { CrmProspectsView } from './CrmProspectsView';
import { CrmCallsView } from './CrmCallsView';
import { CrmNewDashboardModal } from './CrmNewDashboardModal';
import { CrmAddWidgetsModal } from './CrmAddWidgetsModal';
import { CrmShareDashboardModal } from './CrmShareDashboardModal';
import { CrmTvModeView } from './CrmTvModeView';
import { CrmImportModal } from './CrmImportModal';
import { CrmAddContactModal } from './CrmAddContactModal';
import { CrmTaskReminderModal } from './CrmTaskReminderModal';
import { CrmAddCommentModal } from './CrmAddCommentModal';
import { CrmViewCommentsModal } from './CrmViewCommentsModal';
import { CrmEditClientModal } from './CrmEditClientModal';
import { CrmCloseWonModal } from './CrmCloseWonModal';
import { CrmForecastsView } from './CrmForecastsView';
import { CrmDealsView } from './CrmDealsView';
import { CrmTasksView } from './CrmTasksView';
import { CrmCalendarView } from './CrmCalendarView';
import { CrmNewTargetModal } from './CrmNewTargetModal';
import { CrmCallerIdModal } from './CrmCallerIdModal';
import { CrmVoicemailModal } from './CrmVoicemailModal';
import { CrmRingStrategyModal } from './CrmRingStrategyModal';
import { CrmBusinessHoursModal } from './CrmBusinessHoursModal';
import { CrmCallingProvidersModal } from './CrmCallingProvidersModal';
import { CrmAddContactDrawer } from './CrmAddContactDrawer';
import { CrmContactsDirectoryView } from './CrmContactsDirectoryView';
import { CrmContactProfileView } from './CrmContactProfileView';
import { CrmCompanyProfileView } from './CrmCompanyProfileView';
import { CrmMessagesView } from './CrmMessagesView';
import { CrmConnectEmailModal } from './CrmConnectEmailModal';
import { CrmAutomationsView } from './CrmAutomationsView';
import { CrmAnalyticsView } from './CrmAnalyticsView';
import {
  INITIAL_DASHBOARDS,
  POST_IMPORT_PROSPECTS,
  INITIAL_TARGETS,
  INITIAL_DIRECTORY_CONTACTS,
  type CrmDashboardItem,
  type ProspectItem,
  type TargetItem,
  type CrmDirectoryContact,
} from './crm-data';
import { pushCrmToast } from './crm-timeline';

interface CrmStageProps {
  tl: Timeline;
}

export function CrmStage({ tl }: CrmStageProps) {
  const activeNav = useTimelineVar<CrmNavId>(tl, 'crm:activeNav', 'home');

  // Modals state
  const isNewModalOpen = useTimelineVar<boolean>(tl, 'crm:isNewModalOpen', false);
  const isAddWidgetsOpen = useTimelineVar<boolean>(tl, 'crm:isAddWidgetsOpen', false);
  const isShareModalOpen = useTimelineVar<boolean>(tl, 'crm:isShareModalOpen', false);
  const isTvMode = useTimelineVar<boolean>(tl, 'crm:isTvMode', false);

  // Part 2 Modals state
  const isImportOpen = useTimelineVar<boolean>(tl, 'crm:isImportOpen', false);
  const isAddContactOpen = useTimelineVar<boolean>(tl, 'crm:isAddContactOpen', false);
  const isTaskReminderOpen = useTimelineVar<boolean>(tl, 'crm:isTaskReminderOpen', false);
  const isAddCommentOpen = useTimelineVar<boolean>(tl, 'crm:isAddCommentOpen', false);
  const isViewCommentsOpen = useTimelineVar<boolean>(tl, 'crm:isViewCommentsOpen', false);
  const isEditClientOpen = useTimelineVar<boolean>(tl, 'crm:isEditClientOpen', false);
  const isCloseWonOpen = useTimelineVar<boolean>(tl, 'crm:isCloseWonOpen', false);

  // Part 3 Modals state
  const isNewTargetOpen = useTimelineVar<boolean>(tl, 'crm:isNewTargetOpen', false);

  // Part 4 Modals & Views state
  const isCallerIdOpen = useTimelineVar<boolean>(tl, 'crm:isCallerIdOpen', false);
  const isVoicemailModalOpen = useTimelineVar<boolean>(tl, 'crm:isVoicemailModalOpen', false);
  const isRingStrategyModalOpen = useTimelineVar<boolean>(tl, 'crm:isRingStrategyModalOpen', false);
  const isBusinessHoursModalOpen = useTimelineVar<boolean>(tl, 'crm:isBusinessHoursModalOpen', false);
  const isCallingProvidersOpen = useTimelineVar<boolean>(tl, 'crm:isCallingProvidersOpen', false);
  const isAddContactDrawerOpen = useTimelineVar<boolean>(tl, 'crm:isAddContactDrawerOpen', false);
  const directoryContacts = useTimelineVar<CrmDirectoryContact[]>(tl, 'crm:directoryContacts', INITIAL_DIRECTORY_CONTACTS);

  // Part 5 Modals state
  const isConnectEmailOpen = useTimelineVar<boolean>(tl, 'crm:isConnectEmailOpen', false);

  // Dashboards list
  const dashboards = useTimelineVar<CrmDashboardItem[]>(tl, 'crm:dashboards', INITIAL_DASHBOARDS);
  const customWidgets = useTimelineVar<string[]>(tl, 'crm:customDashboardWidgets', []);

  const handleCreateDashboard = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newDash: CrmDashboardItem = {
      id: 'client-leads',
      name: trimmed,
      widgetCount: 0,
      lastUpdated: '11/19/2026',
      isCustom: true,
    };
    const next = [...dashboards.filter((d) => d.id !== 'client-leads'), newDash];
    tl.setVar('crm:dashboards', next);
    tl.setVar('crm:activeDashboardId', 'client-leads');
    tl.setVar('crm:isNewModalOpen', false);
    pushCrmToast(tl, 'Dashboard created successfully');
  };

  const handleAddWidgets = (selectedIds: string[]) => {
    const updated = Array.from(new Set([...customWidgets, ...selectedIds]));
    tl.setVar('crm:customDashboardWidgets', updated);
    tl.setVar('crm:selectedWidgets', []);
    tl.setVar('crm:isAddWidgetsOpen', false);
  };

  const handleSaveDashboard = () => {
    tl.setVar('crm:isCustomSaved', true);
    pushCrmToast(tl, 'Dashboard saved successfully');
  };

  const handleSaveShare = (role: string) => {
    tl.setVar('crm:shareRole', role);
    tl.setVar('crm:isShareModalOpen', false);
    pushCrmToast(tl, 'Sharing updated');
  };

  const handleFinishImport = () => {
    tl.setVar('crm:hasImported', true);
    tl.setVar('crm:isImportOpen', false);
    pushCrmToast(tl, 'Imported 5 prospects');
  };

  const handleAddContactSubmit = () => {
    tl.setVar('crm:isAddContactOpen', false);
    pushCrmToast(tl, 'Contact added successfully');
  };

  const handleCloseWonConfirm = () => {
    const currentList = tl.getVar<ProspectItem[]>('crm:prospects', POST_IMPORT_PROSPECTS);
    const updated = currentList.map((p) =>
      p.id === 'prospect-alex' ? { ...p, status: 'won' as const } : p
    );
    tl.setVar('crm:prospects', updated);
    tl.setVar('crm:isCloseWonOpen', false);
    pushCrmToast(tl, 'Deal closed as won');
  };

  const handleCreateTarget = () => {
    const currentTargets = tl.getVar<TargetItem[]>('crm:targets', INITIAL_TARGETS);
    const newTarget: TargetItem = {
      id: `target-${Date.now()}`,
      scope: 'Organization',
      period: 'Monthly 2026 · M11',
      revenueTarget: '£20.0k',
      dealTarget: '—',
    };
    tl.setVar('crm:targets', [...currentTargets, newTarget]);
    tl.setVar('crm:isNewTargetOpen', false);
    pushCrmToast(tl, 'Sales target created');
  };

  const handleDeleteContact = (id: string) => {
    const nextContacts = directoryContacts.filter((c) => c.id !== id);
    tl.setVar('crm:directoryContacts', nextContacts);
    pushCrmToast(tl, 'Contact deleted');
  };

  const handleSelectContact = (id: string) => {
    if (id === 'contact-alex' || id === 'alex-morgan') {
      tl.setVar('crm:activeNav', 'contact-profile');
      tl.setUrl('crm.snaarp.com/contacts/alex-morgan');
    }
  };

  const handleBackToContacts = () => {
    tl.setVar('crm:activeNav', 'contacts');
    tl.setUrl('crm.snaarp.com/contacts');
  };

  const handleSaveCompany = () => {
    pushCrmToast(tl, 'Company saved');
  };

  return (
    <div
      data-scroller
      data-tl="crm-stage-root"
      className="relative w-full h-full flex flex-col overflow-hidden bg-[#F8F9FA] select-none"
    >
      <CrmShell tl={tl}>
        {activeNav === 'home' && <CrmHomeView tl={tl} />}

        {activeNav === 'dashboards' && (
          <CrmDashboardsView
            tl={tl}
            onOpenNewModal={() => tl.setVar('crm:isNewModalOpen', true)}
            onOpenAddWidgets={() => tl.setVar('crm:isAddWidgetsOpen', true)}
            onOpenShareModal={() => tl.setVar('crm:isShareModalOpen', true)}
            onOpenTvMode={() => tl.setVar('crm:isTvMode', true)}
            onSaveDashboard={handleSaveDashboard}
          />
        )}

        {(activeNav === 'sales' || activeNav === 'prospects') && (
          <CrmProspectsView
            tl={tl}
            onOpenImport={() => tl.setVar('crm:isImportOpen', true)}
            onOpenAddContact={() => tl.setVar('crm:isAddContactOpen', true)}
          />
        )}

        {activeNav === 'calls' && (
          <CrmCallsView
            tl={tl}
            onOpenCallerId={() => tl.setVar('crm:isCallerIdOpen', true)}
            onOpenVoicemail={() => tl.setVar('crm:isVoicemailModalOpen', true)}
            onOpenRingStrategy={() => tl.setVar('crm:isRingStrategyModalOpen', true)}
            onOpenBusinessHours={() => tl.setVar('crm:isBusinessHoursModalOpen', true)}
            onOpenProviders={() => tl.setVar('crm:isCallingProvidersOpen', true)}
          />
        )}

        {activeNav === 'forecasts' && (
          <CrmForecastsView
            tl={tl}
            onOpenNewTarget={() => tl.setVar('crm:isNewTargetOpen', true)}
          />
        )}

        {(activeNav === 'won' || activeNav === 'lost') && (
          <CrmDealsView
            tl={tl}
            mode={activeNav === 'won' ? 'won' : 'lost'}
          />
        )}

        {activeNav === 'tasks' && <CrmTasksView tl={tl} />}

        {activeNav === 'calendar' && <CrmCalendarView tl={tl} />}

        {activeNav === 'contacts' && (
          <CrmContactsDirectoryView
            tl={tl}
            onOpenAddDrawer={() => tl.setVar('crm:isAddContactDrawerOpen', true)}
            onSelectContact={handleSelectContact}
            onDeleteContact={handleDeleteContact}
          />
        )}

        {activeNav === 'contact-profile' && (
          <CrmContactProfileView
            tl={tl}
            onBack={handleBackToContacts}
          />
        )}

        {activeNav === 'companies' && (
          <CrmCompanyProfileView
            tl={tl}
            onBack={handleBackToContacts}
            onSave={handleSaveCompany}
          />
        )}

        {/* Part 5 Views */}
        {activeNav === 'messages' && (
          <CrmMessagesView
            tl={tl}
            onOpenConnectEmail={() => tl.setVar('crm:isConnectEmailOpen', true)}
          />
        )}

        {activeNav === 'automations' && <CrmAutomationsView tl={tl} />}

        {activeNav === 'analytics' && <CrmAnalyticsView tl={tl} />}
      </CrmShell>

      {/* Modals & Presentation Overlays */}
      <CrmNewDashboardModal
        tl={tl}
        isOpen={isNewModalOpen}
        onClose={() => tl.setVar('crm:isNewModalOpen', false)}
        onCreate={handleCreateDashboard}
      />

      <CrmAddWidgetsModal
        tl={tl}
        isOpen={isAddWidgetsOpen}
        onClose={() => tl.setVar('crm:isAddWidgetsOpen', false)}
        onAddWidgets={handleAddWidgets}
      />

      <CrmShareDashboardModal
        tl={tl}
        isOpen={isShareModalOpen}
        onClose={() => tl.setVar('crm:isShareModalOpen', false)}
        onSave={handleSaveShare}
      />

      {isTvMode && (
        <CrmTvModeView
          tl={tl}
          onExit={() => tl.setVar('crm:isTvMode', false)}
        />
      )}

      {/* Part 2 Modals */}
      <CrmImportModal
        tl={tl}
        isOpen={isImportOpen}
        onClose={() => tl.setVar('crm:isImportOpen', false)}
        onFinishImport={handleFinishImport}
      />

      <CrmAddContactModal
        tl={tl}
        isOpen={isAddContactOpen}
        onClose={() => tl.setVar('crm:isAddContactOpen', false)}
        onSubmit={handleAddContactSubmit}
      />

      <CrmTaskReminderModal
        isOpen={isTaskReminderOpen}
        onClose={() => tl.setVar('crm:isTaskReminderOpen', false)}
        onMarkDone={() => {
          tl.setVar('crm:isTaskReminderOpen', false);
          pushCrmToast(tl, 'Task marked as done');
        }}
        prospectName={activeNav === 'tasks' ? 'The Client' : 'Alex Morgan'}
        taskTitle={activeNav === 'tasks' ? 'Call The Client before the end of work' : 'Follow up call'}
      />

      <CrmAddCommentModal
        tl={tl}
        isOpen={isAddCommentOpen}
        onClose={() => tl.setVar('crm:isAddCommentOpen', false)}
        onSubmit={() => {
          tl.setVar('crm:isAddCommentOpen', false);
          pushCrmToast(tl, 'Comment added');
        }}
      />

      <CrmViewCommentsModal
        isOpen={isViewCommentsOpen}
        onClose={() => tl.setVar('crm:isViewCommentsOpen', false)}
        prospectName="Alex Morgan"
      />

      <CrmEditClientModal
        tl={tl}
        isOpen={isEditClientOpen}
        onClose={() => tl.setVar('crm:isEditClientOpen', false)}
        onSave={() => {
          tl.setVar('crm:isEditClientOpen', false);
          pushCrmToast(tl, 'Prospect updated');
        }}
      />

      <CrmCloseWonModal
        isOpen={isCloseWonOpen}
        onClose={() => tl.setVar('crm:isCloseWonOpen', false)}
        onConfirm={handleCloseWonConfirm}
        prospectName="Alex Morgan"
      />

      <CrmNewTargetModal
        tl={tl}
        isOpen={isNewTargetOpen}
        onClose={() => tl.setVar('crm:isNewTargetOpen', false)}
        onCreate={handleCreateTarget}
      />

      {/* Part 4 Modals */}
      <CrmCallerIdModal
        isOpen={isCallerIdOpen}
        onClose={() => tl.setVar('crm:isCallerIdOpen', false)}
      />

      <CrmVoicemailModal
        isOpen={isVoicemailModalOpen}
        onClose={() => tl.setVar('crm:isVoicemailModalOpen', false)}
      />

      <CrmRingStrategyModal
        isOpen={isRingStrategyModalOpen}
        onClose={() => tl.setVar('crm:isRingStrategyModalOpen', false)}
      />

      <CrmBusinessHoursModal
        isOpen={isBusinessHoursModalOpen}
        onClose={() => tl.setVar('crm:isBusinessHoursModalOpen', false)}
      />

      <CrmCallingProvidersModal
        isOpen={isCallingProvidersOpen}
        onClose={() => tl.setVar('crm:isCallingProvidersOpen', false)}
      />

      <CrmAddContactDrawer
        isOpen={isAddContactDrawerOpen}
        onClose={() => tl.setVar('crm:isAddContactDrawerOpen', false)}
        onSubmit={() => {
          tl.setVar('crm:isAddContactDrawerOpen', false);
          pushCrmToast(tl, 'Contact added successfully');
        }}
      />

      {/* Part 5 Modals */}
      <CrmConnectEmailModal
        tl={tl}
        isOpen={isConnectEmailOpen}
        onClose={() => tl.setVar('crm:isConnectEmailOpen', false)}
      />
    </div>
  );
}
