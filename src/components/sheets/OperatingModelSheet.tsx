import React from 'react';
import { ModelCalculatedResults } from '../../types';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface OperatingModelSheetProps {
  results: ModelCalculatedResults;
}

export const OperatingModelSheet: React.FC<OperatingModelSheetProps> = ({ results }) => {
  const { months, operatingModel } = results;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="pb-2 border-b border-[#E8E8E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#051C2C] tracking-tight">
            Sheet 6: Operating Model & Unit Economics (P&L Driver)
          </h1>
          <p className="text-[13px] text-[#888888] mt-1">
            End-to-end operational cost dynamics: Direct Materials + Capacity-Restrained Delivery Labor $\rightarrow$ Gross Profit $\rightarrow$ Scalable Opex $\rightarrow$ EBITDA.
          </p>
        </div>
      </div>

      {/* Main Operating Statement Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Monthly Operational P&L Driver Breakdown
            </h3>
            <p className="text-[11px] text-[#888888]">
              Direct Materials and Labor driven by volume and staffing standards
            </p>
          </div>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] sticky left-0 bg-[#F7F7F6] z-10 w-[240px]">
                  P&L Line Item
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
              {/* Gross Revenue */}
              <tr className="border-b border-[#E8E8E6] font-semibold bg-[rgba(5,28,44,0.015)]">
                <td className="py-2.5 px-3 text-[#051C2C] sticky left-0 bg-[#FAFAF8] z-10">
                  Gross Recognized Revenue
                </td>
                {operatingModel.map((op, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    {formatCurrency(op.revenue, 0)}
                  </td>
                ))}
              </tr>

              {/* Direct Materials COGS */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10 pl-6">
                  Direct Materials & Consumables COGS
                </td>
                {operatingModel.map((op, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    ({formatCurrency(op.directMaterialsCOGS, 0)})
                  </td>
                ))}
              </tr>

              {/* Direct Labor COGS */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10 pl-6">
                  Direct Delivery Personnel Payroll
                </td>
                {operatingModel.map((op, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    ({formatCurrency(op.directLaborCOGS, 0)})
                  </td>
                ))}
              </tr>

              {/* Total COGS */}
              <tr className="border-b border-[#E8E8E6] font-medium bg-[rgba(5,28,44,0.02)]">
                <td className="py-2.5 px-3 text-[#051C2C] sticky left-0 bg-[#F9FAF8] z-10">
                  Total Cost of Goods Sold (COGS)
                </td>
                {operatingModel.map((op, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    ({formatCurrency(op.totalCOGS, 0)})
                  </td>
                ))}
              </tr>

              {/* Gross Profit */}
              <tr className="border-b-2 border-[rgba(5,28,44,0.1)] font-bold bg-[rgba(34,81,255,0.03)]">
                <td className="py-2.5 px-3 text-[#2251FF] sticky left-0 bg-[#F4F7FF] z-10">
                  Gross Profit
                </td>
                {operatingModel.map((op, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#2251FF]">
                    {formatCurrency(op.grossProfit, 0)}
                  </td>
                ))}
              </tr>

              {/* Gross Margin % */}
              <tr className="border-b border-[#E8E8E6] text-[11px] text-[#888888]">
                <td className="py-2 px-3 sticky left-0 bg-white z-10">Gross Profit Margin %</td>
                {operatingModel.map((op, i) => (
                  <td key={i} className="text-right py-2 px-3 font-mono">
                    {formatPercent(op.grossMarginPct)}
                  </td>
                ))}
              </tr>

              {/* Sales & Marketing */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10 pl-6">
                  Sales & Marketing (Lead-driven)
                </td>
                {operatingModel.map((op, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    ({formatCurrency(op.salesMarketingOpex, 0)})
                  </td>
                ))}
              </tr>

              {/* General & Administrative */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10 pl-6">
                  General & Administrative (Fixed Base)
                </td>
                {operatingModel.map((op, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    ({formatCurrency(op.generalAdminOpex, 0)})
                  </td>
                ))}
              </tr>

              {/* Total Opex */}
              <tr className="border-b border-[#E8E8E6] font-medium bg-[rgba(5,28,44,0.02)]">
                <td className="py-2.5 px-3 text-[#051C2C] sticky left-0 bg-[#F9FAF8] z-10">
                  Total Operating Expenses (Opex)
                </td>
                {operatingModel.map((op, i) => (
                  <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    ({formatCurrency(op.totalOpex, 0)})
                  </td>
                ))}
              </tr>

              {/* Operating EBITDA */}
              <tr className="font-bold bg-[rgba(5,28,44,0.05)] border-t-2 border-[rgba(5,28,44,0.2)]">
                <td className="py-3 px-3 text-[#051C2C] uppercase tracking-[0.06em] sticky left-0 bg-[#F5F7F8] z-10">
                  Operating EBITDA
                </td>
                {operatingModel.map((op, i) => (
                  <td key={i} className="text-right py-3 px-3 font-mono text-[#051C2C]">
                    {formatCurrency(op.ebitda, 0)}
                  </td>
                ))}
              </tr>

              {/* EBITDA Margin % */}
              <tr className="border-b border-[#E8E8E6] text-[11px] text-[#888888]">
                <td className="py-2 px-3 sticky left-0 bg-white z-10">EBITDA Margin %</td>
                {operatingModel.map((op, i) => (
                  <td key={i} className="text-right py-2 px-3 font-mono">
                    {formatPercent(op.ebitdaMarginPct)}
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
