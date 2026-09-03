import React, { useRef } from 'react';
import {
  LayoutDashboard,
  Sliders,
  Repeat,
  Briefcase,
  Users,
  CalendarCheck2,
  BarChart3,
  Landmark,
  Coins,
  FileSpreadsheet,
  Activity,
  Download,
  Upload,
  RotateCcw,
  Clock,
  ShieldCheck,
  AlertCircle,
  X,
} from 'lucide-react';
import { ScenarioType, SheetTabId } from '../types';
import { BrandLogo } from './BrandLogo';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: SheetTabId) => void;
  activeScenario: ScenarioType;
  onScenarioChange: (scenario: ScenarioType) => void;
  lastSaved: string;
  isBsBalanced?: boolean;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onExportBackup: () => void;
  onOpenCsvModal: () => void;
  onImportBackup: (file: File) => void;
  onResetData: () => void;
}

interface NavItem {
  id: SheetTabId;
  label: string;
  sheetNo: string;
  icon: React.ElementType;
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupName: 'Executive',
    items: [
      { id: 'dashboard', label: 'Executive Dashboard', sheetNo: 'S11', icon: LayoutDashboard },
    ],
  },
  {
    groupName: 'Commercial & Operations',
    items: [
      { id: 'control', label: 'Assumptions & Control', sheetNo: 'S01', icon: Sliders },
      { id: 'recurring', label: 'Recurring Revenue', sheetNo: 'S02', icon: Repeat },
      { id: 'pipeline', label: 'Project Pipeline', sheetNo: 'S03', icon: Briefcase },
      { id: 'capacity', label: 'Capacity & Labor', sheetNo: 'S04', icon: Users },
    ],
  },
  {
    groupName: 'Financial Schedules',
    items: [
      { id: 'revenue', label: 'Revenue Schedule (WIP)', sheetNo: 'S05', icon: CalendarCheck2 },
      { id: 'operating', label: 'Operating Model (P&L)', sheetNo: 'S06', icon: BarChart3 },
      { id: 'working_capital', label: 'Working Capital', sheetNo: 'S07', icon: Landmark },
      { id: 'debt', label: 'Debt Schedule', sheetNo: 'S08', icon: Coins },
    ],
  },
  {
    groupName: 'Reporting & Analysis',
    items: [
      { id: 'three_statements', label: 'Three Statements', sheetNo: 'S09', icon: FileSpreadsheet },
      { id: 'sensitivity', label: 'Scenario Sensitivity', sheetNo: 'S10', icon: Activity },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  activeScenario,
  onScenarioChange,
  lastSaved,
  isBsBalanced = true,
  isOpenMobile,
  onCloseMobile,
  onExportBackup,
  onOpenCsvModal,
  onImportBackup,
  onResetData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const isTabActive = (tabId: SheetTabId) => {
    if (activeTab === tabId) return true;
    if (tabId === 'working_capital' && activeTab === 'workingCapital') return true;
    if (tabId === 'three_statements' && activeTab === 'threeStatements') return true;
    return false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-[#051C2C]/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#E8E8E6] flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0 shrink-0 select-none ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-[#E8E8E6] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#051C2C] flex items-center justify-center text-white shadow-xs p-1 shrink-0 mt-0.5">
              <BrandLogo size={32} className="text-[#F5F5F2]" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-[13px] font-bold text-[#051C2C] tracking-tight leading-snug">
                Operational Business Financial Forecasting &amp; Three-Statement Model
              </h1>
              <p className="text-[10px] text-[#888888] font-medium tracking-wide uppercase mt-1 flex items-center gap-1.5">
                <span>Theseus Workshop</span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#2251FF]" />
                <span className="text-[#2251FF] font-semibold">Enterprise SaaS</span>
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-[#888888] hover:text-[#051C2C] rounded-md transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scenario Switcher Block */}
        <div className="px-4 py-3.5 border-b border-[#E8E8E6] bg-[#FAFAF8] shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
              Active Scenario
            </span>
            <div className="flex items-center gap-1 text-[10px] text-[#00C853] font-medium">
              {isBsBalanced ? (
                <>
                  <ShieldCheck size={11} className="text-[#00C853]" />
                  <span>BS: $0.00</span>
                </>
              ) : (
                <>
                  <AlertCircle size={11} className="text-[#D32F2F]" />
                  <span className="text-[#D32F2F]">BS Mismatch</span>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-lg border border-[#E8E8E6]">
            {[
              { type: ScenarioType.BASE, label: 'Base' },
              { type: ScenarioType.UPSIDE, label: 'Upside' },
              { type: ScenarioType.DOWNSIDE, label: 'Downside' },
            ].map((sc) => {
              const isSelected = activeScenario === sc.type;
              return (
                <button
                  key={sc.type}
                  onClick={() => onScenarioChange(sc.type)}
                  className={`py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer text-center ${
                    isSelected
                      ? 'bg-[#051C2C] text-white font-semibold shadow-xs'
                      : 'text-[#666666] hover:text-[#051C2C] hover:bg-[#F5F5F2]'
                  }`}
                >
                  {sc.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-[13px] table-scrollbar">
          {NAV_GROUPS.map((group) => (
            <div key={group.groupName} className="space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#999999]">
                {group.groupName}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isTabActive(item.id);
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        onCloseMobile();
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer group ${
                        active
                          ? 'bg-[rgba(34,81,255,0.08)] text-[#2251FF] font-semibold'
                          : 'text-[#444444] hover:bg-[rgba(5,28,44,0.03)] hover:text-[#051C2C]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          size={16}
                          className={`shrink-0 transition-colors ${
                            active
                              ? 'text-[#2251FF]'
                              : 'text-[#777777] group-hover:text-[#051C2C]'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono shrink-0 px-1.5 py-0.5 rounded text-right transition-colors ${
                          active
                            ? 'bg-[rgba(34,81,255,0.14)] text-[#2251FF] font-bold'
                            : 'text-[#999999] group-hover:text-[#666666]'
                        }`}
                      >
                        {item.sheetNo}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom System Actions & Persistence Info */}
        <div className="p-3.5 border-t border-[#E8E8E6] bg-[#FAFAF8] shrink-0 space-y-3">
          {/* Last Saved Stamp */}
          <div
            className="flex items-center justify-between text-[11px] text-[#777777] px-1"
            title="All changes are automatically saved to your browser's local storage"
          >
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#888888]" />
              <span>Status</span>
            </div>
            <span className="font-medium text-[#051C2C] truncate max-w-[150px] text-right">
              {lastSaved}
            </span>
          </div>

          {/* Action Button Grid */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={onOpenCsvModal}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-[#051C2C] bg-white hover:bg-[#F0F0EE] border border-[#E8E8E6] rounded-md transition-colors cursor-pointer shadow-2xs"
              title="Bulk import CSV data"
            >
              <FileSpreadsheet size={13} className="text-[#2251FF]" />
              <span>CSV Import</span>
            </button>

            <button
              onClick={onExportBackup}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-[#051C2C] bg-white hover:bg-[#F0F0EE] border border-[#E8E8E6] rounded-md transition-colors cursor-pointer shadow-2xs"
              title="Download JSON backup"
            >
              <Download size={13} className="text-[#051C2C]" />
              <span>Export</span>
            </button>

            {/* Hidden JSON file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-[#051C2C] bg-white hover:bg-[#F0F0EE] border border-[#E8E8E6] rounded-md transition-colors cursor-pointer shadow-2xs"
              title="Restore model from JSON backup"
            >
              <Upload size={13} className="text-[#051C2C]" />
              <span>Restore</span>
            </button>

            <button
              onClick={onResetData}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-[#777777] hover:text-[#D32F2F] hover:bg-[rgba(211,47,47,0.06)] border border-[#E8E8E6] rounded-md transition-colors cursor-pointer shadow-2xs"
              title="Reset all inputs back to benchmark model defaults"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>

          <div className="text-[10px] text-[#999999] italic text-center leading-tight">
            Local browser storage only; zero data telemetry.
          </div>
        </div>
      </aside>
    </>
  );
};
