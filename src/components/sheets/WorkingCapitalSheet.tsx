import React from 'react';
import { ModelCalculatedResults } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface WorkingCapitalSheetProps {
  results: ModelCalculatedResults;
}

export const WorkingCapitalSheet: React.FC<WorkingCapitalSheetProps> = ({ results }) => {
  const { months, workingCapital } = results;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="pb-2 border-b border-[#E8E8E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#051C2C] tracking-tight">
            Sheet 7: Working Capital & Cash Flow Conversion
          </h1>
          <p className="text-[13px] text-[#888888] mt-1">
            DSO (Debtors), DIO (Inventory), WIP Asset timing, and DPO (Creditors) determining the net balance sheet capital tied up and monthly cash absorption ($\Delta$NWC).
          </p>
        </div>
      </div>

      {/* Main Working Capital Ledger Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Monthly Working Capital Schedule
            </h3>
            <p className="text-[11px] text-[#888888]">
              Directly drives non-cash operating adjustments on the Cash Flow Statement
            </p>
          </div>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] sticky left-0 bg-[#F7F7F6] z-10 w-[240px]">
                  Working Capital Asset / Liab
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
              {/* Accounts Receivable (AR) */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#051C2C] sticky left-0 bg-white z-10">
                  Accounts Receivable (Debtors, DSO 60d)
                </td>
                {workingCapital.map((wc, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    {formatCurrency(wc.ar, 0)}
                  </td>
                ))}
              </tr>

              {/* Raw Materials Inventory */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#051C2C] sticky left-0 bg-white z-10">
                  Inventory Hold (DIO 30d)
                </td>
                {workingCapital.map((wc, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    {formatCurrency(wc.inventory, 0)}
                  </td>
                ))}
              </tr>

              {/* Work in Progress (WIP Asset) */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#051C2C] sticky left-0 bg-white z-10">
                  Work In Progress (WIP Asset)
                </td>
                {workingCapital.map((wc, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    {formatCurrency(wc.wipAsset, 0)}
                  </td>
                ))}
              </tr>

              {/* Accounts Payable (AP) */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10">
                  Accounts Payable (Creditors, DPO 45d) (-)
                </td>
                {workingCapital.map((wc, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    ({formatCurrency(wc.ap, 0)})
                  </td>
                ))}
              </tr>

              {/* Total Non-Cash NWC */}
              <tr className="border-b-2 border-[rgba(5,28,44,0.1)] font-semibold bg-[rgba(5,28,44,0.02)]">
                <td className="py-2.5 px-3 text-[#051C2C] sticky left-0 bg-[#F9FAF8] z-10">
                  Total Non-Cash NWC (Net Capital Tied Up)
                </td>
                {workingCapital.map((wc, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    {formatCurrency(wc.totalNWC, 0)}
                  </td>
                ))}
              </tr>

              {/* Delta NWC (Cash Flow Impact) */}
              <tr className="font-bold bg-[rgba(34,81,255,0.03)] border-t-2 border-[rgba(34,81,255,0.18)]">
                <td className="py-3 px-3 text-[#2251FF] uppercase tracking-[0.06em] sticky left-0 bg-[#F4F7FF] z-10">
                  $\Delta$NWC Impact on Operating Cash Flow
                </td>
                {workingCapital.map((wc, i) => (
                  <td key={i} className="text-right py-3 px-3 font-mono text-[#2251FF]">
                    {wc.deltaNWC > 0
                      ? `(${formatCurrency(wc.deltaNWC, 0)})`
                      : formatCurrency(Math.abs(wc.deltaNWC), 0)}
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
