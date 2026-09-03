import React, { useState, useEffect, useMemo } from 'react';
import { Menu, ShieldCheck, AlertCircle, FileSpreadsheet, Download } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { BrandLogo } from './components/BrandLogo';
import { CsvImportModal } from './components/CsvImportModal';
import { DashboardSheet } from './components/sheets/DashboardSheet';
import { ControlSheet } from './components/sheets/ControlSheet';
import { RecurringSheet } from './components/sheets/RecurringSheet';
import { PipelineSheet } from './components/sheets/PipelineSheet';
import { CapacitySheet } from './components/sheets/CapacitySheet';
import { RevenueScheduleSheet } from './components/sheets/RevenueScheduleSheet';
import { OperatingModelSheet } from './components/sheets/OperatingModelSheet';
import { WorkingCapitalSheet } from './components/sheets/WorkingCapitalSheet';
import { DebtScheduleSheet } from './components/sheets/DebtScheduleSheet';
import { ThreeStatementsSheet } from './components/sheets/ThreeStatementsSheet';
import { SensitivitySheet } from './components/sheets/SensitivitySheet';

import { ModelInputs, ScenarioType } from './types';
import {
  loadStoredModelInputs,
  saveStoredModelInputs,
  resetStoredModelInputs,
  exportModelBackup,
} from './utils/storage';
import { computeFinancialModel } from './models/financialEngine';

const SHEET_METADATA: Record<string, { title: string; sheetNo: string; group: string }> = {
  dashboard: { title: 'Executive Management Dashboard', sheetNo: 'S11', group: 'Executive' },
  control: { title: 'Assumptions & Model Control', sheetNo: 'S01', group: 'Commercial & Operations' },
  recurring: { title: 'Recurring Revenue Streams', sheetNo: 'S02', group: 'Commercial & Operations' },
  pipeline: { title: 'Sales Pipeline & Deal Flow', sheetNo: 'S03', group: 'Commercial & Operations' },
  capacity: { title: 'Capacity & Labor Demand', sheetNo: 'S04', group: 'Commercial & Operations' },
  revenue: { title: 'Revenue Schedule (WIP Realization)', sheetNo: 'S05', group: 'Financial Schedules' },
  operating: { title: 'Operating Model (P&L)', sheetNo: 'S06', group: 'Financial Schedules' },
  working_capital: { title: 'Working Capital Dynamics', sheetNo: 'S07', group: 'Financial Schedules' },
  workingCapital: { title: 'Working Capital Dynamics', sheetNo: 'S07', group: 'Financial Schedules' },
  debt: { title: 'Debt Schedule & Amortization', sheetNo: 'S08', group: 'Financial Schedules' },
  three_statements: { title: 'Three Integrated Financial Statements', sheetNo: 'S09', group: 'Reporting & Analysis' },
  threeStatements: { title: 'Three Integrated Financial Statements', sheetNo: 'S09', group: 'Reporting & Analysis' },
  sensitivity: { title: 'Scenario Sensitivity Heatmap', sheetNo: 'S10', group: 'Reporting & Analysis' },
};

export const App: React.FC = () => {
  // 1. Core Model Input State
  const initialStorage = useMemo(() => loadStoredModelInputs(), []);
  const [inputs, setInputs] = useState<ModelInputs>(initialStorage.inputs);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string>(initialStorage.lastSaved);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 2. Real-time Auto-save Effect
  useEffect(() => {
    saveStoredModelInputs(inputs);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLastSaved(`Saved at ${timeStr}`);
  }, [inputs]);

  // 3. Compute Financial Engine Output (3-Statement + Funnel + WIP + Capacity)
  const results = useMemo(() => {
    return computeFinancialModel(inputs);
  }, [inputs]);

  // 4. Scenario Switcher
  const handleScenarioChange = (scenario: ScenarioType) => {
    setInputs((prev) => ({ ...prev, activeScenario: scenario }));
    const scenarioName =
      scenario === ScenarioType.UPSIDE
        ? 'UPSIDE'
        : scenario === ScenarioType.DOWNSIDE
        ? 'DOWNSIDE'
        : 'BASE';
    showToast(`Switched scenario to ${scenarioName}`);
  };

  // 5. Export Backup
  const handleExportBackup = () => {
    exportModelBackup(inputs);
    showToast('Exported JSON backup successfully');
  };

  // 6. Import Backup (JSON file)
  const handleImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed && parsed.recurringStreams && parsed.pipelineStreams) {
          setInputs(parsed);
          showToast('Model backup restored successfully');
        } else {
          showToast('Invalid backup file format');
        }
      } catch (err) {
        showToast('Error reading backup file');
      }
    };
    reader.readAsText(file);
  };

  // 7. Reset Data
  const handleResetData = () => {
    if (window.confirm('Reset all financial model parameters to initial defaults?')) {
      const defaults = resetStoredModelInputs();
      setInputs(defaults);
      showToast('Model inputs restored to baseline defaults');
    }
  };

  // 8. Bulk CSV Import Applied Handler
  const handleApplyCsv = (targetType: string, parsedData: Record<string, number[]>) => {
    setInputs((prev) => {
      if (targetType === 'recurring_base') {
        const updated = prev.recurringStreams.map((stream) => {
          if (parsedData[stream.id] && parsedData[stream.id].length > 0) {
            return { ...stream, initialBase: parsedData[stream.id][0] };
          }
          return stream;
        });
        return { ...prev, recurringStreams: updated };
      } else if (targetType === 'pipeline_leads') {
        const updated = prev.pipelineStreams.map((stream) => {
          if (parsedData[stream.id]) {
            return { ...stream, monthlyRawLeads: parsedData[stream.id] };
          }
          return stream;
        });
        return { ...prev, pipelineStreams: updated };
      } else if (targetType === 'capacity_fte') {
        const firstKey = Object.keys(parsedData)[0];
        if (firstKey && parsedData[firstKey]) {
          return { ...prev, monthlyAvailableFTE: parsedData[firstKey] };
        }
      }
      return prev;
    });
    showToast(`Bulk CSV imported into ${targetType.replace('_', ' ')} successfully`);
  };

  // Specific sheet mutation helpers
  const handleUpdateInitialBase = (streamIndex: number, newBase: number) => {
    setInputs((prev) => {
      const updated = [...prev.recurringStreams];
      updated[streamIndex] = { ...updated[streamIndex], initialBase: newBase };
      return { ...prev, recurringStreams: updated };
    });
  };

  const handleUpdateRawLead = (streamId: string, monthIndex: number, newLeadValue: number) => {
    setInputs((prev) => {
      const updated = prev.pipelineStreams.map((stream) => {
        if (stream.id === streamId) {
          const leads = [...stream.monthlyRawLeads];
          leads[monthIndex] = newLeadValue;
          return { ...stream, monthlyRawLeads: leads };
        }
        return stream;
      });
      return { ...prev, pipelineStreams: updated };
    });
  };

  const handleUpdateAvailableFTE = (monthIndex: number, newFTE: number) => {
    setInputs((prev) => {
      const fte = [...prev.monthlyAvailableFTE];
      fte[monthIndex] = newFTE;
      return { ...prev, monthlyAvailableFTE: fte };
    });
  };

  const currentSheetInfo = SHEET_METADATA[activeTab] || {
    title: 'Executive Management Dashboard',
    sheetNo: 'S11',
    group: 'Executive',
  };

  const isBalanced = results.threeStatements[0]?.isBalanced ?? true;

  return (
    <div className="min-h-screen bg-[#F5F5F2] flex flex-col md:flex-row text-[#051C2C]">
      {/* Responsive Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
        activeScenario={inputs.activeScenario}
        onScenarioChange={handleScenarioChange}
        lastSaved={lastSaved}
        isBsBalanced={isBalanced}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
        onOpenCsvModal={() => setIsCsvModalOpen(true)}
        onResetData={handleResetData}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar for Desktop & Mobile */}
        <header className="sticky top-0 z-30 h-14 bg-white border-b border-[#E8E8E6] px-4 sm:px-8 flex items-center justify-between shadow-2xs">
          {/* Left: Mobile hamburger toggle & sheet breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-1.5 text-[#051C2C] hover:bg-[rgba(5,28,44,0.05)] rounded-md transition-colors cursor-pointer"
              aria-label="Open navigation sidebar"
            >
              <Menu size={20} />
            </button>

            {/* Mobile-only brand emblem */}
            <div className="md:hidden w-7 h-7 rounded-md bg-[#051C2C] flex items-center justify-center text-white p-0.5 shrink-0">
              <BrandLogo size={22} className="text-[#F5F5F2]" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-[#2251FF] bg-[rgba(34,81,255,0.08)] px-1.5 py-0.5 rounded">
                {currentSheetInfo.sheetNo}
              </span>
              <span className="hidden sm:inline text-[12px] text-[#888888]">
                {currentSheetInfo.group} /
              </span>
              <h2 className="text-[13px] sm:text-[14px] font-bold text-[#051C2C] truncate">
                {currentSheetInfo.title}
              </h2>
            </div>
          </div>

          {/* Right: Balance Pill & Quick Actions */}
          <div className="flex items-center gap-2.5">
            {isBalanced ? (
              <div className="badge-pill bg-[rgba(0,200,83,0.08)] text-[#00C853] text-[11px] px-2.5 py-1 font-semibold border border-[rgba(0,200,83,0.2)]">
                <ShieldCheck size={13} className="text-[#00C853]" />
                <span className="hidden sm:inline">BS Check:</span>
                <span>$0.00</span>
              </div>
            ) : (
              <div className="badge-pill bg-[rgba(211,47,47,0.08)] text-[#D32F2F] text-[11px] px-2.5 py-1 font-semibold border border-[rgba(211,47,47,0.2)]">
                <AlertCircle size={13} className="text-[#D32F2F]" />
                <span>BS Mismatch</span>
              </div>
            )}

            <button
              onClick={() => setIsCsvModalOpen(true)}
              className="hidden lg:flex items-center gap-1 text-[11px] font-medium text-[#051C2C] bg-[rgba(5,28,44,0.04)] hover:bg-[rgba(5,28,44,0.08)] px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
              title="Bulk import monthly CSV data"
            >
              <FileSpreadsheet size={13} className="text-[#2251FF]" />
              <span>CSV</span>
            </button>

            <button
              onClick={handleExportBackup}
              className="hidden lg:flex items-center gap-1 text-[11px] font-medium text-[#051C2C] bg-[rgba(5,28,44,0.04)] hover:bg-[rgba(5,28,44,0.08)] px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
              title="Export complete model backup JSON"
            >
              <Download size={13} />
              <span>Backup</span>
            </button>
          </div>
        </header>

        {/* Main Content Area: Centered, max-w-1400px, 40px horizontal padding */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-8">
          {activeTab === 'dashboard' && (
            <DashboardSheet
              inputs={inputs}
              results={results}
              onNavigateToTab={(tabId) => setActiveTab(tabId)}
            />
          )}

          {activeTab === 'control' && (
            <ControlSheet inputs={inputs} onUpdateInputs={setInputs} />
          )}

          {activeTab === 'recurring' && (
            <RecurringSheet
              inputs={inputs}
              results={results}
              onUpdateInitialBase={handleUpdateInitialBase}
            />
          )}

          {activeTab === 'pipeline' && (
            <PipelineSheet
              inputs={inputs}
              results={results}
              onUpdateRawLead={handleUpdateRawLead}
            />
          )}

          {activeTab === 'capacity' && (
            <CapacitySheet
              inputs={inputs}
              results={results}
              onUpdateAvailableFTE={handleUpdateAvailableFTE}
            />
          )}

          {activeTab === 'revenue' && <RevenueScheduleSheet results={results} />}

          {activeTab === 'operating' && <OperatingModelSheet results={results} />}

          {(activeTab === 'working_capital' || activeTab === 'workingCapital') && (
            <WorkingCapitalSheet results={results} />
          )}

          {activeTab === 'debt' && <DebtScheduleSheet inputs={inputs} results={results} />}

          {(activeTab === 'three_statements' || activeTab === 'threeStatements') && (
            <ThreeStatementsSheet results={results} />
          )}

          {activeTab === 'sensitivity' && (
            <SensitivitySheet
              inputs={inputs}
              onSelectScenario={handleScenarioChange}
            />
          )}
        </main>

        {/* Footer with Mandatory Privacy Notice */}
        <footer className="w-full border-t border-[#E8E8E6] bg-white py-4 mt-auto">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#888888] gap-2">
            <div className="flex items-center gap-2">
              <BrandLogo size={16} className="text-[#051C2C]" />
              <span className="font-semibold text-[#051C2C]">Operational Business Financial Forecasting & Three-Statement Model</span>
              <span className="hidden md:inline text-[#888888]">— Theseus Workshop</span>
            </div>
            <div className="italic text-[#888888]">
              Current tool storage is local-only; no user data is retained by the page.
            </div>
          </div>
        </footer>
      </div>

      {/* Bulk CSV Import Modal */}
      <CsvImportModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onApplyData={handleApplyCsv}
      />

      {/* Ephemeral Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#051C2C] text-white text-[12px] font-medium px-4 py-2.5 rounded-[8px] shadow-lg flex items-center gap-2 z-50 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-[#2251FF]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;

