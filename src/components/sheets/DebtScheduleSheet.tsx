import React from 'react';
import { ModelCalculatedResults, ModelInputs } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface DebtScheduleSheetProps {
  inputs: ModelInputs;
  results: ModelCalculatedResults;
}

export const DebtScheduleSheet: React.FC<DebtScheduleSheetProps> = ({ inputs, results }) => {
  const { months, debtByFacility, debtTotal } = results;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="pb-2 border-b border-[#E8E8E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#051C2C] tracking-tight">
            Sheet 8: Debt Schedule & Debt Service Engine
          </h1>
          <p className="text-[13px] text-[#888888] mt-1">
            Tracking loan tranches, amortizing principal repayments, drawdown cash inflows, intercompany write-downs, and monthly interest expense.
          </p>
        </div>
      </div>

      {/* Main Debt Ledger Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Monthly Debt Facilities Amortization Ledger
            </h3>
            <p className="text-[11px] text-[#888888]">
              Tranches mapped to Senior Bank facilities and Shareholder loans
            </p>
          </div>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] sticky left-0 bg-[#F7F7F6] z-10 w-[240px]">
                  Debt Facility / Metric
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
              {inputs.debtFacilities.map((fac) => {
                const facData = debtByFacility[fac.id] || [];
                return (
                  <React.Fragment key={fac.id}>
                    {/* Facility Section Title */}
                    <tr className="bg-[rgba(5,28,44,0.02)] border-y border-[#E8E8E6]">
                      <td colSpan={months.length + 1} className="py-2 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#2251FF]">
                        {fac.name} ({(fac.annualInterestRate * 100).toFixed(2)}% p.a., {fac.tenorMonths}M Tenor)
                      </td>
                    </tr>

                    {/* Opening Balance */}
                    <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                      <td className="py-2 px-3 pl-6 sticky left-0 bg-white z-10">
                        Opening Principal
                      </td>
                      {facData.map((d, i) => (
                        <td key={i} className="text-right py-2 px-3 font-mono">
                          {formatCurrency(d.openingBalance, 0)}
                        </td>
                      ))}
                    </tr>

                    {/* Principal Repayment */}
                    <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                      <td className="py-2 px-3 pl-6 sticky left-0 bg-white z-10">
                        Amortization Repayment (-)
                      </td>
                      {facData.map((d, i) => (
                        <td key={i} className="text-right py-2 px-3 font-mono">
                          {d.principalRepayment > 0 ? `(${formatCurrency(d.principalRepayment, 0)})` : '$0'}
                        </td>
                      ))}
                    </tr>

                    {/* Closing Balance */}
                    <tr className="border-b border-[#E8E8E6] font-semibold hover:bg-white text-[#051C2C]">
                      <td className="py-2 px-3 pl-6 sticky left-0 bg-white z-10">
                        Closing Principal Balance
                      </td>
                      {facData.map((d, i) => (
                        <td key={i} className="text-right py-2 px-3 font-mono">
                          {formatCurrency(d.closingBalance, 0)}
                        </td>
                      ))}
                    </tr>

                    {/* Interest Expense */}
                    <tr className="border-b-2 border-[#E8E8E6] hover:bg-white text-[#888888]">
                      <td className="py-2 px-3 pl-6 sticky left-0 bg-white z-10">
                        Accrued Interest Expense
                      </td>
                      {facData.map((d, i) => (
                        <td key={i} className="text-right py-2 px-3 font-mono">
                          {formatCurrency(d.interestExpense, 0)}
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                );
              })}

              {/* Total Summary Rows */}
              <tr className="font-semibold bg-[rgba(5,28,44,0.02)] border-t border-[#E8E8E6]">
                <td className="py-2.5 px-3 text-[#051C2C] sticky left-0 bg-[#F9FAF8] z-10">
                  Total Monthly Principal Repayment (Financing CFS Outflow)
                </td>
                {debtTotal.map((tot, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    ({formatCurrency(tot.totalRepayment, 0)})
                  </td>
                ))}
              </tr>

              <tr className="font-semibold bg-[rgba(5,28,44,0.02)] border-t border-[#E8E8E6]">
                <td className="py-2.5 px-3 text-[#051C2C] sticky left-0 bg-[#F9FAF8] z-10">
                  Total Monthly Accrued Interest Expense (P&L Financial Cost)
                </td>
                {debtTotal.map((tot, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    ({formatCurrency(tot.totalInterest, 0)})
                  </td>
                ))}
              </tr>

              <tr className="font-bold bg-[rgba(5,28,44,0.05)] border-t-2 border-[rgba(5,28,44,0.2)]">
                <td className="py-3 px-3 text-[#051C2C] uppercase tracking-[0.06em] sticky left-0 bg-[#F5F7F8] z-10">
                  Total Closing Debt Liabilities
                </td>
                {debtTotal.map((tot, idx) => (
                  <td key={idx} className="text-right py-3 px-3 font-mono text-[#051C2C]">
                    {formatCurrency(tot.totalClosing, 0)}
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
