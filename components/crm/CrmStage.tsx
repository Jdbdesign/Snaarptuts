'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';
import { CrmShell, type CrmNavId } from './CrmShell';
import { CrmHomeView } from './CrmHomeView';
import { CrmDashboardsView } from './CrmDashboardsView';
import { CrmProspectsView } from './CrmProspectsView';
import { CrmNewDashboardModal } from './CrmNewDashboardModal';
import { CrmAddWidgetsModal } from './CrmAddWidgetsModal';
import { CrmShareDashboardModal } from './CrmShareDashboardModal';
import { CrmTvModeView } from './CrmTvModeView';
import { INITIAL_DASHBOARDS, type CrmDashboardItem } from './crm-data';
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

        {(activeNav === 'sales' || activeNav === 'prospects') && <CrmProspectsView tl={tl} />}
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
    </div>
  );
}
