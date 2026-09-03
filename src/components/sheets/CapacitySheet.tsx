import React from 'react';
import { Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { ModelCalculatedResults, ModelInputs } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface CapacitySheetProps {
  inputs: ModelInputs;
  results: ModelCalculatedResults;
  onUpdateAvailableFTE: (monthIndex: number, newFTE: number) => void;
}

export const CapacitySheet: React.FC<CapacitySheetProps> = ({
  inputs,
  results,
  onUpdateAvailableFTE,
}) => {
  const { months, capacity } = results;
  const { qualifierHoursPerOpp, identifierHoursPerOrder, monthlyStdHours, productiveUtilization } =
    inputs.laborStandards;
  const effectiveHoursPerFTE = monthlyStdHours * productiveUtilization;

  const hasDeficitMonths = capacity.some((c) => c.capacityGap < 0);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="pb-2 border-b border-[#E8E8E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#051C2C] tracking-tight">
            Sheet 4: Delivery Capacity & Labor Planning
          </h1>
          <p className="text-[13px] text-[#888888] mt-1">
            Workload-driven headcount model translating commercial opportunity qualification and project execution hours into Required FTEs.
          </p>
        </div>

        {hasDeficitMonths ? (
          <div className="badge-pill bg-[rgba(211,47,47,0.08)] text-[#D32F2F] text-[11px] px-3 py-1 font-semibold border border-[rgba(211,47,47,0.2)]">
            <AlertTriangle size={14} className="text-[#D32F2F]" />
            <span>Staffing Overload Warning</span>
          </div>
        ) : (
          <div className="badge-pill bg-[rgba(0,200,83,0.08)] text-[#00C853] text-[11px] px-3 py-1 font-semibold border border-[rgba(0,200,83,0.2)]">
            <CheckCircle size={14} className="text-[#00C853]" />
            <span>Capacity Buffer Healthy</span>
          </div>
        )}
      </div>

      {/* Standards Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card-elevation p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Qualifier Standard
          </div>
          <div className="font-display text-[24px] font-bold text-[#051C2C] my-1">
            {qualifierHoursPerOpp.toFixed(1)} <span className="text-[14px] font-normal text-[#888888]">Hrs/Opp</span>
          </div>
          <div className="text-[11px] text-[#888888]">Pre-sale technical qualification</div>
        </div>

        <div className="card-elevation p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Identifier Standard
          </div>
          <div className="font-display text-[24px] font-bold text-[#051C2C] my-1">
            {identifierHoursPerOrder.toFixed(1)} <span className="text-[14px] font-normal text-[#888888]">Hrs/Order</span>
          </div>
          <div className="text-[11px] text-[#888888]">Field execution & certification</div>
        </div>

        <div className="card-elevation p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Effective Monthly Yield
          </div>
          <div className="font-display text-[24px] font-bold text-[#2251FF] my-1">
            {effectiveHoursPerFTE.toFixed(1)} <span className="text-[14px] font-normal text-[#888888]">Hrs/FTE</span>
          </div>
          <div className="text-[11px] text-[#888888]">
            {monthlyStdHours}h @ {(productiveUtilization * 100).toFixed(0)}% Util
          </div>
        </div>

        <div className="card-elevation p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Max Labor Deficit
          </div>
          <div
            className={`font-display text-[24px] font-bold my-1 ${
              hasDeficitMonths ? 'text-[#D32F2F]' : 'text-[#051C2C]'
            }`}
          >
            {results.year1.peakCapacityDeficit > 0
              ? `-${results.year1.peakCapacityDeficit.toFixed(1)} FTE`
              : '0.0 FTE'}
          </div>
          <div className="text-[11px] text-[#888888]">Peak monthly shortage</div>
        </div>
      </div>

      {/* Main Capacity Roll-Forward Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Monthly Workload Breakdown & Headcount Requirement
            </h3>
            <p className="text-[11px] text-[#888888]">
              Yellow cells permit active staffing roster adjustments across forecast periods
            </p>
          </div>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] sticky left-0 bg-[#F7F7F6] z-10 w-[240px]">
                  Capacity Metric
                </th>
                {months.map((m) => (
                  <th
                    key={m}
                    className="text-right py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] min-w-[85px]"
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Qualifier Hours */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10">
                  Qualifier Total Hours Required
                </td>
                {capacity.map((c, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    {formatNumber(c.qualifierHours, 0)}
                  </td>
                ))}
              </tr>

              {/* Identifier Hours */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10">
                  Identifier Total Hours Required
                </td>
                {capacity.map((c, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    {formatNumber(c.identifierHours, 0)}
                  </td>
                ))}
              </tr>

              {/* Required Qualifier FTE */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#051C2C] sticky left-0 bg-white z-10">
                  Required Qualifier Headcount (FTE)
                </td>
                {capacity.map((c, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    {c.requiredQualifierFTE.toFixed(1)}
                  </td>
                ))}
              </tr>

              {/* Required Identifier FTE */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#051C2C] sticky left-0 bg-white z-10">
                  Required Identifier Headcount (FTE)
                </td>
                {capacity.map((c, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    {c.requiredIdentifierFTE.toFixed(1)}
                  </td>
                ))}
              </tr>

              {/* Total Required FTE */}
              <tr className="border-b-2 border-[rgba(5,28,44,0.1)] font-semibold bg-[rgba(5,28,44,0.02)]">
                <td className="py-2.5 px-3 text-[#051C2C] sticky left-0 bg-[#F9FAF8] z-10">
                  Total Required Field FTE
                </td>
                {capacity.map((c, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    {c.totalRequiredFTE.toFixed(1)}
                  </td>
                ))}
              </tr>

              {/* Active Available FTE (Editable) */}
              <tr className="border-b border-[#E8E8E6] bg-[rgba(255,253,231,0.4)] hover:bg-[rgba(255,253,231,0.7)] font-medium">
                <td className="py-2.5 px-3 text-[#051C2C] sticky left-0 bg-[#FFFEEB] z-10">
                  Active Staff On-Roster (Editable)
                </td>
                {capacity.map((c, i) => (
                  <td key={i} className="text-right py-1 px-1.5">
                    <input
                      type="number"
                      step="0.5"
                      value={c.availableFTE}
                      onChange={(e) =>
                        onUpdateAvailableFTE(i, parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right w-16"
                    />
                  </td>
                ))}
              </tr>

              {/* Capacity Gap / Surplus */}
              <tr className="font-bold bg-[rgba(5,28,44,0.03)] border-t-2 border-[rgba(5,28,44,0.15)]">
                <td className="py-3 px-3 text-[#051C2C] uppercase tracking-[0.06em] sticky left-0 bg-[#F5F7F8] z-10">
                  Capacity Balance (Gap / Surplus)
                </td>
                {capacity.map((c, i) => {
                  const isDeficit = c.capacityGap < 0;
                  return (
                    <td
                      key={i}
                      className={`text-right py-3 px-3 font-mono ${
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
