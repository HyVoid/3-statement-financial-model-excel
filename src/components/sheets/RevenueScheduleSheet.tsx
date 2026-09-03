import React from 'react';
import { ModelCalculatedResults } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { InlineDataBar } from '../InlineDataBar';

interface RevenueScheduleSheetProps {
  results: ModelCalculatedResults;
}

export const RevenueScheduleSheet: React.FC<RevenueScheduleSheetProps> = ({ results }) => {
  const { months, revenueSchedule } = results;
  const { streamNames, streamTypes, monthlyRevenueByStream, totalMonthlyRevenue } = revenueSchedule;

  const maxTotalRev = Math.max(...totalMonthlyRevenue, 1);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="pb-2 border-b border-[#E8E8E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#051C2C] tracking-tight">
            Sheet 5: Standardized Revenue Schedule (14 Business Streams)
          </h1>
          <p className="text-[13px] text-[#888888] mt-1">
            Company-wide consolidated recognized revenue ledger bridging heterogeneous recurring compliance retainers and milestone-based project construction.
          </p>
        </div>
      </div>

      {/* Main Revenue Matrix Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Monthly P&L Recognized Turnover Ledger
            </h3>
            <p className="text-[11px] text-[#888888]">
              Accrual accounting basis (GAAP/IFRS standard)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] sticky left-0 bg-[#F7F7F6] z-10 w-[240px]">
                  Revenue Stream
                </th>
                <th className="text-left py-2.5 px-2 font-semibold uppercase tracking-[0.06em] text-[#888888] w-[90px]">
                  Category
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
              {/* Category 1: Recurring Services (Streams 0..6) */}
              <tr className="bg-[rgba(5,28,44,0.02)] border-y border-[#E8E8E6]">
                <td colSpan={months.length + 2} className="py-2 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#2251FF]">
                  Section I: Compliance & Recurring Maintenance Contracts (7 Streams)
                </td>
              </tr>
              {streamNames.slice(0, 7).map((name, idx) => (
                <tr key={idx} className="border-b border-[#E8E8E6] hover:bg-white">
                  <td className="py-2.5 px-3 font-medium text-[#051C2C] sticky left-0 bg-white z-10">
                    {name}
                  </td>
                  <td className="py-2.5 px-2 text-[#888888] text-[11px]">Recurring</td>
                  {monthlyRevenueByStream[idx].map((rev, mIdx) => (
                    <td key={mIdx} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                      {formatCurrency(rev, 0)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Category 2: Project Pipeline Lines (Streams 7..13) */}
              <tr className="bg-[rgba(5,28,44,0.02)] border-y border-[#E8E8E6]">
                <td colSpan={months.length + 2} className="py-2 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#2251FF]">
                  Section II: Engineering Installation & Project Pipeline (7 Streams)
                </td>
              </tr>
              {streamNames.slice(7, 14).map((name, relIdx) => {
                const globalIdx = relIdx + 7;
                return (
                  <tr key={globalIdx} className="border-b border-[#E8E8E6] hover:bg-white">
                    <td className="py-2.5 px-3 font-medium text-[#051C2C] sticky left-0 bg-white z-10">
                      {name}
                    </td>
                    <td className="py-2.5 px-2 text-[#888888] text-[11px]">Project WIP</td>
                    {monthlyRevenueByStream[globalIdx].map((rev, mIdx) => (
                      <td key={mIdx} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                        {formatCurrency(rev, 0)}
                      </td>
                    ))}
                  </tr>
                );
              })}

              {/* Company Total Monthly Turnover */}
              <tr className="font-bold bg-[rgba(5,28,44,0.04)] border-t-2 border-[rgba(5,28,44,0.18)]">
                <td className="py-3 px-3 text-[#051C2C] uppercase tracking-[0.06em] sticky left-0 bg-[#F5F7F8] z-10">
                  Total Monthly Revenue
                </td>
                <td className="py-3 px-2 text-[#051C2C] text-[11px] uppercase tracking-wider">All</td>
                {totalMonthlyRevenue.map((tot, idx) => (
                  <td key={idx} className="text-right py-3 px-3 font-mono text-[#051C2C]">
                    <div className="flex items-center justify-end">
                      <span>{formatCurrency(tot, 0)}</span>
                      <InlineDataBar value={tot} max={maxTotalRev} width="40px" />
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
