import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, FileText, CheckCircle } from 'lucide-react';
import { ModelCalculatedResults } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface ThreeStatementsSheetProps {
  results: ModelCalculatedResults;
}

export const ThreeStatementsSheet: React.FC<ThreeStatementsSheetProps> = ({ results }) => {
  const [statementView, setStatementView] = useState<'all' | 'pnl' | 'cfs' | 'bs'>('all');
  const { months, threeStatements } = results;

  const allBalanced = threeStatements.every((s) => s.isBalanced);
  const maxVariance = Math.max(...threeStatements.map((s) => Math.abs(s.balanceSheetCheckDiff)));

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="pb-2 border-b border-[#E8E8E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#051C2C] tracking-tight">
            Sheet 9: Three Statements & Automated Balance Sheet Audit
          </h1>
          <p className="text-[13px] text-[#888888] mt-1">
            Fully dynamic Income Statement (P&L), Indirect Cash Flow Statement (CFS), and Balance Sheet (BS) with penny-perfect self-balance verification.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-[rgba(5,28,44,0.05)] p-0.5 rounded-[6px]">
          {[
            { id: 'all', label: 'All Statements' },
            { id: 'pnl', label: 'Income (P&L)' },
            { id: 'cfs', label: 'Cash Flow (CFS)' },
            { id: 'bs', label: 'Balance Sheet' },
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setStatementView(view.id as any)}
              className={`px-3 py-1 text-[12px] font-medium rounded-[5px] transition-all cursor-pointer ${
                statementView === view.id
                  ? 'bg-white text-[#051C2C] font-semibold shadow-xs'
                  : 'text-[#888888] hover:text-[#051C2C]'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* Balance Sheet Verification Banner */}
      <div
        className={`p-4 rounded-[12px] flex items-center justify-between border ${
          allBalanced
            ? 'bg-[rgba(0,200,83,0.04)] border-[rgba(0,200,83,0.25)] text-[#051C2C]'
            : 'bg-[rgba(211,47,47,0.04)] border-[rgba(211,47,47,0.25)] text-[#D32F2F]'
        }`}
      >
        <div className="flex items-center gap-3">
          {allBalanced ? (
            <ShieldCheck size={24} className="text-[#00C853] shrink-0" />
          ) : (
            <AlertCircle size={24} className="text-[#D32F2F] shrink-0" />
          )}
          <div>
            <h4 className="font-semibold text-[14px]">
              {allBalanced
                ? 'Automated Balance Sheet Self-Audit: 100% Balanced ($0.00)'
                : 'Warning: Balance Sheet Out of Balance'}
            </h4>
            <p className="text-[12px] text-[#888888] mt-0.5">
              {allBalanced
                ? 'Every forecast period strictly satisfies: Total Assets ≡ Total Liabilities + Total Shareholder Equity ($0.00 delta).'
                : `Maximum discrepancy detected: ${formatCurrency(maxVariance, 2)}. Check initial equity or cash roll-forward.`}
            </p>
          </div>
        </div>

        <span
          className={`badge-pill text-[11px] font-bold px-3 py-1 ${
            allBalanced
              ? 'bg-[rgba(0,200,83,0.12)] text-[#00C853]'
              : 'bg-[rgba(211,47,47,0.12)] text-[#D32F2F]'
          }`}
        >
          {allBalanced ? '✅ PASSED ($0.00)' : '❌ ERROR'}
        </span>
      </div>

      {/* Statements Table */}
      <div className="card-elevation p-5 space-y-6">
        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] sticky left-0 bg-[#F7F7F6] z-10 w-[240px]">
                  Financial Statement Line Item
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
              {/* ──────────────────────────────────────────────── */}
              {/* STATEMENT 1: INCOME STATEMENT (P&L) */}
              {/* ──────────────────────────────────────────────── */}
              {(statementView === 'all' || statementView === 'pnl') && (
                <>
                  <tr className="bg-[rgba(5,28,44,0.03)] border-y border-[#E8E8E6]">
                    <td colSpan={months.length + 1} className="py-2.5 px-3 font-bold uppercase tracking-[0.06em] text-[#051C2C] text-[12px]">
                      Part I: Income Statement (P&L)
                    </td>
                  </tr>

                  <tr className="border-b border-[#E8E8E6] font-semibold hover:bg-white">
                    <td className="py-2 px-3 text-[#051C2C] sticky left-0 bg-white z-10">
                      Operating Revenue
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono text-[#051C2C]">
                        {formatCurrency(s.revenue, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Cost of Goods Sold (COGS) (-)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        ({formatCurrency(s.cogs, 0)})
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] font-semibold bg-[rgba(5,28,44,0.015)]">
                    <td className="py-2 px-3 text-[#051C2C] sticky left-0 bg-[#FAFAF8] z-10">
                      Gross Profit
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono text-[#051C2C]">
                        {formatCurrency(s.grossProfit, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Operating Expenses (Opex) (-)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        ({formatCurrency(s.opex, 0)})
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] font-bold text-[#051C2C]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10">
                      EBITDA
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.ebitda, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Depreciation & Amortization (-)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        ({formatCurrency(s.depreciation, 0)})
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] font-medium text-[#051C2C]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10">
                      Operating Profit (EBIT)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.ebit, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Net Financing Interest Expense (-)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        ({formatCurrency(s.interestExpense, 0)})
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Income Tax Expense (25%) (-)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        ({formatCurrency(s.incomeTax, 0)})
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b-2 border-[rgba(5,28,44,0.15)] font-bold bg-[rgba(34,81,255,0.03)] text-[#2251FF]">
                    <td className="py-2.5 px-3 sticky left-0 bg-[#F4F7FF] z-10">
                      Net Income (Profit After Tax)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono">
                        {formatCurrency(s.netIncome, 0)}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* ──────────────────────────────────────────────── */}
              {/* STATEMENT 2: CASH FLOW STATEMENT (CFS) */}
              {/* ──────────────────────────────────────────────── */}
              {(statementView === 'all' || statementView === 'cfs') && (
                <>
                  <tr className="bg-[rgba(5,28,44,0.03)] border-y border-[#E8E8E6]">
                    <td colSpan={months.length + 1} className="py-2.5 px-3 font-bold uppercase tracking-[0.06em] text-[#051C2C] text-[12px]">
                      Part II: Cash Flow Statement (CFS - Indirect Method)
                    </td>
                  </tr>

                  <tr className="border-b border-[#E8E8E6] font-medium hover:bg-white">
                    <td className="py-2 px-3 text-[#051C2C] sticky left-0 bg-white z-10 pl-4">
                      Cash Flow from Operating Activities (OCF)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono text-[#051C2C]">
                        {formatCurrency(s.cashFromOps, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-4">
                      Cash Flow from Investing Activities (Capex) (ICF)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        ({formatCurrency(Math.abs(s.cashFromInv), 0)})
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-4">
                      Cash Flow from Financing Activities (FCF)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {s.cashFromFin < 0 ? `(${formatCurrency(Math.abs(s.cashFromFin), 0)})` : formatCurrency(s.cashFromFin, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] font-semibold bg-[rgba(5,28,44,0.015)] text-[#051C2C]">
                    <td className="py-2 px-3 sticky left-0 bg-[#FAFAF8] z-10">
                      Net Periodic Cash Movement
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {s.netCashMovement < 0 ? `(${formatCurrency(Math.abs(s.netCashMovement), 0)})` : formatCurrency(s.netCashMovement, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b-2 border-[rgba(5,28,44,0.15)] font-bold text-[#051C2C] bg-[rgba(5,28,44,0.02)]">
                    <td className="py-2.5 px-3 sticky left-0 bg-[#F5F7F8] z-10">
                      Closing Cash & Bank Equivalents
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                        {formatCurrency(s.endingCash, 0)}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* ──────────────────────────────────────────────── */}
              {/* STATEMENT 3: BALANCE SHEET (BS) & CHECK */}
              {/* ──────────────────────────────────────────────── */}
              {(statementView === 'all' || statementView === 'bs') && (
                <>
                  <tr className="bg-[rgba(5,28,44,0.03)] border-y border-[#E8E8E6]">
                    <td colSpan={months.length + 1} className="py-2.5 px-3 font-bold uppercase tracking-[0.06em] text-[#051C2C] text-[12px]">
                      Part III: Balance Sheet (BS) & Balance Audit Check
                    </td>
                  </tr>

                  {/* Assets */}
                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Cash & Cash Equivalents
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.bsCash, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Accounts Receivable (Debtors)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.bsAR, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Raw Materials Inventory
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.bsInventory, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Work In Progress (WIP Asset)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.bsWIP, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Net Fixed Assets (PP&E)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.bsPPE, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b-2 border-[#E8E8E6] font-bold bg-[rgba(5,28,44,0.02)] text-[#051C2C]">
                    <td className="py-2.5 px-3 sticky left-0 bg-[#F9FAF8] z-10">
                      Total Assets
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono">
                        {formatCurrency(s.totalAssets, 0)}
                      </td>
                    ))}
                  </tr>

                  {/* Liabilities & Equity */}
                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Accounts Payable (Creditors)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.bsAP, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Total Outstanding Debt Obligations
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.bsDebt, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] font-medium text-[#051C2C]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-4">
                      Total Liabilities
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.totalLiabilities, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Contributed Share Capital
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.bsShareCapital, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] hover:bg-white text-[#888888]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-6">
                      Accumulated Retained Earnings
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.bsRetainedEarnings, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#E8E8E6] font-medium text-[#051C2C]">
                    <td className="py-2 px-3 sticky left-0 bg-white z-10 pl-4">
                      Total Shareholder Equity
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2 px-3 font-mono">
                        {formatCurrency(s.totalEquity, 0)}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-b-2 border-[#E8E8E6] font-bold bg-[rgba(5,28,44,0.02)] text-[#051C2C]">
                    <td className="py-2.5 px-3 sticky left-0 bg-[#F9FAF8] z-10">
                      Total Liabilities & Shareholder Equity
                    </td>
                    {threeStatements.map((s, i) => (
                      <td key={i} className="text-right py-2.5 px-3 font-mono">
                        {formatCurrency(s.totalLiabAndEquity, 0)}
                      </td>
                    ))}
                  </tr>

                  {/* ──────────────────────────────────────────────── */}
                  {/* AUTOMATED BALANCE SHEET CHECK LINE */}
                  {/* ──────────────────────────────────────────────── */}
                  <tr className="font-bold bg-[rgba(5,28,44,0.04)] border-t-2 border-[rgba(5,28,44,0.2)]">
                    <td className="py-3 px-3 uppercase tracking-[0.06em] sticky left-0 bg-[#F5F7F8] z-10 text-[#051C2C]">
                      BS Check Variance (Assets - Liab - Equity)
                    </td>
                    {threeStatements.map((s, i) => (
                      <td
                        key={i}
                        className={`text-right py-3 px-3 font-mono text-[11px] ${
                          s.isBalanced ? 'text-[#00C853] font-bold' : 'text-[#D32F2F] font-bold'
                        }`}
                      >
                        {s.isBalanced ? '✅ $0.00' : `❌ ${formatCurrency(s.balanceSheetCheckDiff, 2)}`}
                      </td>
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
