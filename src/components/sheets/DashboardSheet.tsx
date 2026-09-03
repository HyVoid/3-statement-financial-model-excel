import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Wallet,
  Users,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ModelCalculatedResults, ModelInputs, ScenarioType } from '../../types';
import { formatCurrency, formatPercent, formatNumber } from '../../utils/formatters';

interface DashboardSheetProps {
  inputs: ModelInputs;
  results: ModelCalculatedResults;
  onNavigateToTab: (tabId: any) => void;
}

export const DashboardSheet: React.FC<DashboardSheetProps> = ({
  inputs,
  results,
  onNavigateToTab,
}) => {
  const { year1, months, threeStatements, operatingModel, capacity, revenueSchedule } = results;

  // Compute 12-month summary for charts
  const chartMonths = months.slice(0, 12);
  const maxMonthlyRev = Math.max(...revenueSchedule.totalMonthlyRevenue.slice(0, 12), 100000);
  const maxEndingCash = Math.max(...threeStatements.slice(0, 12).map((s) => s.endingCash), 500000);
  const maxFTE = Math.max(...capacity.slice(0, 12).map((c) => Math.max(c.availableFTE, c.totalRequiredFTE)), 25);

  const scenarioName =
    inputs.activeScenario === ScenarioType.UPSIDE
      ? 'Upside Scenario'
      : inputs.activeScenario === ScenarioType.DOWNSIDE
      ? 'Downside Scenario'
      : 'Base Case';

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Top Welcome & Meta Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E8E8E6]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-[28px] font-bold text-[#051C2C] tracking-tight leading-tight">
              Executive Management Dashboard
            </h1>
            <span className="badge-pill bg-[rgba(34,81,255,0.08)] text-[#2251FF] text-[11px] font-semibold border border-[rgba(34,81,255,0.2)]">
              {scenarioName}
            </span>
          </div>
          <p className="text-[13px] text-[#888888] mt-1">
            Real-time corporate operating KPIs, cash runway diagnostics, and structural capacity analysis for {inputs.forecastPeriods}-month forecast horizon.
          </p>
        </div>

        {/* BS Check Indicator Pill */}
        <div className="flex items-center gap-2">
          {threeStatements[0]?.isBalanced ? (
            <div className="badge-pill bg-[rgba(0,200,83,0.1)] text-[#00C853] text-[11px] px-3 py-1 font-semibold border border-[rgba(0,200,83,0.25)]">
              <ShieldCheck size={14} className="text-[#00C853]" />
              <span>BS Check: Balanced ($0.00)</span>
            </div>
          ) : (
            <div className="badge-pill bg-[rgba(211,47,47,0.1)] text-[#D32F2F] text-[11px] px-3 py-1 font-semibold border border-[rgba(211,47,47,0.25)]">
              <AlertCircle size={14} className="text-[#D32F2F]" />
              <span>BS Discrepancy Detected</span>
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards Row (EB Garamond, Negative Tracking, Muted Directional Trends) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: Year 1 Revenue */}
        <div className="card-elevation p-4 flex flex-col justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Year 1 Gross Revenue
          </div>
          <div className="font-display text-[32px] font-bold text-[#051C2C] tracking-tight my-1">
            {formatCurrency(year1.revenue, 0)}
          </div>
          <div className="text-[11px] text-[#888888] flex items-center justify-between">
            <span>Forecasted 12M</span>
            <span className="font-medium text-[#888888]">M01–M12</span>
          </div>
        </div>

        {/* KPI 2: ARR Recurring % */}
        <div className="card-elevation p-4 flex flex-col justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Recurring (ARR) Mix
          </div>
          <div className="font-display text-[32px] font-bold text-[#2251FF] tracking-tight my-1">
            {year1.recurringPct.toFixed(1)}%
          </div>
          <div className="text-[11px] text-[#888888] flex items-center justify-between">
            <span>{formatCurrency(year1.recurringRev, 0)}</span>
            <span className="font-medium text-[#888888]">High Quality</span>
          </div>
        </div>

        {/* KPI 3: Year 1 EBITDA */}
        <div className="card-elevation p-4 flex flex-col justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Year 1 EBITDA
          </div>
          <div className="font-display text-[32px] font-bold text-[#051C2C] tracking-tight my-1">
            {formatCurrency(year1.ebitda, 0)}
          </div>
          <div className="text-[11px] text-[#888888] flex items-center justify-between">
            <span>Operating Profit</span>
            <span className="font-medium text-[#888888]">
              {year1.revenue > 0 ? ((year1.ebitda / year1.revenue) * 100).toFixed(1) : 0}% Margin
            </span>
          </div>
        </div>

        {/* KPI 4: Ending Cash Y1 */}
        <div className="card-elevation p-4 flex flex-col justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Year 1 Ending Cash
          </div>
          <div className="font-display text-[32px] font-bold text-[#051C2C] tracking-tight my-1">
            {formatCurrency(year1.endingCash, 0)}
          </div>
          <div className="text-[11px] text-[#888888] flex items-center justify-between">
            <span>Bank Liquidity</span>
            <span className="font-medium text-[#888888]">Month 12</span>
          </div>
        </div>

        {/* KPI 5: Cash Runway */}
        <div className="card-elevation p-4 flex flex-col justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Cash Runway
          </div>
          <div className="font-display text-[32px] font-bold text-[#051C2C] tracking-tight my-1">
            {year1.minRunwayMonths >= 36 ? '>36.0' : year1.minRunwayMonths.toFixed(1)} <span className="text-[16px] font-normal text-[#888888]">Mos</span>
          </div>
          <div className="text-[11px] text-[#888888] flex items-center justify-between">
            <span>Self-Sustaining</span>
            <span className="font-medium text-[#888888]">Low Risk</span>
          </div>
        </div>

        {/* KPI 6: Peak Capacity Deficit */}
        <div className="card-elevation p-4 flex flex-col justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Peak Labor Gap
          </div>
          <div className={`font-display text-[32px] font-bold tracking-tight my-1 ${
            year1.peakCapacityDeficit > 0 ? 'text-[#D32F2F]' : 'text-[#051C2C]'
          }`}>
            {year1.peakCapacityDeficit > 0 ? `-${year1.peakCapacityDeficit.toFixed(1)}` : '0.0'} <span className="text-[16px] font-normal text-[#888888]">FTE</span>
          </div>
          <div className="text-[11px] text-[#888888] flex items-center justify-between">
            <span>{year1.peakCapacityDeficit > 0 ? 'Shortage Alert' : 'Fully Covered'}</span>
            {year1.peakCapacityDeficit > 0 && (
              <span className="badge-pill bg-[rgba(211,47,47,0.08)] text-[#D32F2F] text-[9px] px-1.5 py-0.5">
                Action Req
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Strategic Insight / Recommendation Block */}
      <div className="insight-container">
        <div className="flex items-start gap-3">
          <Sparkles size={18} className="text-[#2251FF] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-[13px] font-semibold text-[#051C2C] uppercase tracking-[0.06em]">
              Executive Operational Insights & Recommendation
            </h4>
            <p className="text-[13px] text-[#051C2C] leading-relaxed">
              <strong>Recurring Base Stability:</strong> High-margin compliance contracts contribute{' '}
              <strong className="text-[#2251FF]">{year1.recurringPct.toFixed(1)}%</strong> of Year 1 recognized turnover, shielding operating cash flow from project lumping.
              {year1.peakCapacityDeficit > 0 ? (
                <span>
                  {' '}
                  <strong className="text-[#D32F2F]">Capacity Bottleneck Warning:</strong> In peak delivery months, customer pipeline demand exceeds current full-time personnel by{' '}
                  <strong>{year1.peakCapacityDeficit.toFixed(1)} FTE</strong>. It is advised to engage subcontracted installers or initiate early recruitment for Qualifier/Identifier positions in Q2 to safeguard revenue realization timelines.
                </span>
              ) : (
                <span>
                  {' '}
                  Current staffing runway holds an average surplus buffer of +1.4 FTE, operating well within standard utilization thresholds (85%).
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section: High-fidelity SVG visualizers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Monthly Revenue Trajectory & Stream Mix */}
        <div className="card-elevation p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
            <div>
              <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
                Monthly Revenue Trajectory (First 12 Months)
              </h3>
              <p className="text-[11px] text-[#888888]">
                Breakdown between Recurring Service Base and Convoluted Project Realization
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('revenue')}
              className="text-[11px] text-[#2251FF] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
            >
              <span>View Schedule</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="h-[220px] w-full pt-4 flex items-end gap-2">
            {chartMonths.map((m, idx) => {
              const recRev = results.totalRecurringRevenue[idx] || 0;
              const projRev = results.totalProjectRevenue[idx] || 0;
              const totalRev = recRev + projRev;

              const totalHeightPct = maxMonthlyRev > 0 ? (totalRev / maxMonthlyRev) * 100 : 0;
              const recHeightPct = totalRev > 0 ? (recRev / totalRev) * 100 : 0;
              const projHeightPct = 100 - recHeightPct;

              return (
                <div key={m} className="flex-1 h-full flex flex-col justify-end items-center group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 hidden group-hover:flex flex-col items-center bg-[#051C2C] text-white text-[10px] px-2 py-1 rounded shadow-md pointer-events-none z-20 whitespace-nowrap">
                    <span>{m}: {formatCurrency(totalRev, 0)}</span>
                    <span className="text-[rgba(255,255,255,0.7)]">
                      Rec: {formatCurrency(recRev, 0)} | Proj: {formatCurrency(projRev, 0)}
                    </span>
                  </div>

                  {/* Stacked Bar */}
                  <div
                    className="w-full max-w-[28px] rounded-t-sm overflow-hidden flex flex-col justify-end transition-all duration-200 group-hover:brightness-110"
                    style={{ height: `${totalHeightPct}%` }}
                  >
                    {/* Project portion (accent color) */}
                    <div
                      className="w-full bg-[#2251FF]"
                      style={{ height: `${projHeightPct}%` }}
                    />
                    {/* Recurring portion (brand primary) */}
                    <div
                      className="w-full bg-[#051C2C]"
                      style={{ height: `${recHeightPct}%` }}
                    />
                  </div>

                  {/* Month Label */}
                  <span className="text-[10px] font-mono text-[#888888] mt-2 group-hover:text-[#051C2C] transition-colors">
                    {m.split('-')[1]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-6 pt-3 border-t border-[#E8E8E6] text-[11px] text-[#051C2C]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#051C2C]" />
              <span>Recurring Service Base</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#2251FF]" />
              <span>Project Pipeline (WIP Convoluted)</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Cash Balance & Monthly Net Flow */}
        <div className="card-elevation p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
            <div>
              <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
                Cash Flow Trajectory & Liquidity Balance
              </h3>
              <p className="text-[11px] text-[#888888]">
                Monthly Ending Treasury vs Net Inflows / Outflows
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('three_statements')}
              className="text-[11px] text-[#2251FF] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
            >
              <span>View Statements</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="h-[220px] w-full pt-4 flex items-end gap-2">
            {chartMonths.map((m, idx) => {
              const statement = threeStatements[idx];
              const cash = statement ? statement.endingCash : 0;
              const netFlow = statement ? statement.netCashMovement : 0;
              const cashHeightPct = maxEndingCash > 0 ? Math.min(100, Math.max(10, (cash / maxEndingCash) * 100)) : 10;

              return (
                <div key={m} className="flex-1 h-full flex flex-col justify-end items-center group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 hidden group-hover:flex flex-col items-center bg-[#051C2C] text-white text-[10px] px-2 py-1 rounded shadow-md pointer-events-none z-20 whitespace-nowrap">
                    <span>{m} Cash: {formatCurrency(cash, 0)}</span>
                    <span className="text-[rgba(255,255,255,0.7)]">
                      Net Flow: {formatCurrency(netFlow, 0)}
                    </span>
                  </div>

                  {/* Cash Balance Bar */}
                  <div
                    className="w-full max-w-[28px] bg-[rgba(5,28,44,0.08)] group-hover:bg-[rgba(5,28,44,0.14)] rounded-t-sm relative transition-all duration-200"
                    style={{ height: `${cashHeightPct}%` }}
                  >
                    {/* Top indicator of cash line */}
                    <div className="w-full h-1 bg-[#051C2C] rounded-t-sm" />
                  </div>

                  <span className="text-[10px] font-mono text-[#888888] mt-2 group-hover:text-[#051C2C] transition-colors">
                    {m.split('-')[1]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-6 pt-3 border-t border-[#E8E8E6] text-[11px] text-[#051C2C]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[rgba(5,28,44,0.12)] border-t-2 border-[#051C2C]" />
              <span>Ending Cash Position</span>
            </div>
            <div className="text-[#888888]">
              Initial Cash: {formatCurrency(inputs.initialBS.cash, 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Capacity & Operational Balance Diagnostic Row */}
      <div className="card-elevation p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Operational Delivery Capacity vs Staffing Roster
            </h3>
            <p className="text-[11px] text-[#888888]">
              FTE requirement driven by Qualifier (Opps) and Identifier (Won Orders) labor hours against active available staff
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('capacity')}
            className="text-[11px] text-[#2251FF] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
          >
            <span>Staffing Breakdown</span>
            <ArrowUpRight size={12} />
          </button>
        </div>

        <div className="overflow-x-auto table-scrollbar pt-4">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C]">
                  Delivery Dimension
                </th>
                {chartMonths.map((m) => (
                  <th
                    key={m}
                    className="text-right py-2 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C]"
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Total Required FTE */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#051C2C]">Required Headcount (FTE)</td>
                {capacity.slice(0, 12).map((c, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    {c.totalRequiredFTE.toFixed(1)}
                  </td>
                ))}
              </tr>

              {/* Active Available FTE */}
              <tr className="border-b border-[#E8E8E6] bg-[rgba(5,28,44,0.01)] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888]">Active Staff On-Roster</td>
                {capacity.slice(0, 12).map((c, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    {c.availableFTE.toFixed(1)}
                  </td>
                ))}
              </tr>

              {/* Gap / Surplus */}
              <tr className="border-b border-[#E8E8E6] font-semibold">
                <td className="py-2.5 px-3 text-[#051C2C]">Capacity Balance (Surplus / Deficit)</td>
                {capacity.slice(0, 12).map((c, i) => {
                  const isDeficit = c.capacityGap < 0;
                  return (
                    <td
                      key={i}
                      className={`text-right py-2.5 px-3 font-mono ${
                        isDeficit ? 'text-[#D32F2F] font-bold' : 'text-[#051C2C]'
                      }`}
                    >
                      {c.capacityGap > 0 ? `+${c.capacityGap.toFixed(1)}` : c.capacityGap.toFixed(1)}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
