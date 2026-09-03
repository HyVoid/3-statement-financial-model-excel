import React, { useState } from 'react';
import { Layers, TrendingUp, Calendar } from 'lucide-react';
import { ModelCalculatedResults, ModelInputs, ScenarioType } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { InlineDataBar } from '../InlineDataBar';

interface PipelineSheetProps {
  inputs: ModelInputs;
  results: ModelCalculatedResults;
  onUpdateRawLead: (streamId: string, monthIndex: number, newLeadValue: number) => void;
}

export const PipelineSheet: React.FC<PipelineSheetProps> = ({
  inputs,
  results,
  onUpdateRawLead,
}) => {
  const [selectedStreamId, setSelectedStreamId] = useState<string>(inputs.pipelineStreams[0].id);

  const { months, pipelineByStream, totalProjectOrders, totalProjectRevenue } = results;
  const maxProjectRev = Math.max(...totalProjectRevenue, 1);

  const selectedStream =
    inputs.pipelineStreams.find((s) => s.id === selectedStreamId) || inputs.pipelineStreams[0];
  const streamData = pipelineByStream[selectedStream.id] || [];

  const scenarioTag =
    inputs.activeScenario === ScenarioType.UPSIDE
      ? 'Upside'
      : inputs.activeScenario === ScenarioType.DOWNSIDE
      ? 'Downside'
      : 'Base';

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="pb-2 border-b border-[#E8E8E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-[28px] font-bold text-[#051C2C] tracking-tight">
              Sheet 3: Project Pipeline & WIP Realization Engine
            </h1>
            <span className="badge-pill bg-[rgba(34,81,255,0.08)] text-[#2251FF] text-[11px] font-semibold border border-[rgba(34,81,255,0.2)]">
              {scenarioTag} Funnel
            </span>
          </div>
          <p className="text-[13px] text-[#888888] mt-1">
            Raw Marketing Leads $\rightarrow$ Qualified Opps $\rightarrow$ Won Orders (Lag Adjusted) $\rightarrow$ WIP 4-Month Realization Convolution.
          </p>
        </div>

        {/* Stream Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto table-scrollbar max-w-full pb-1">
          {inputs.pipelineStreams.map((stream) => {
            const isSelected = stream.id === selectedStream.id;
            return (
              <button
                key={stream.id}
                onClick={() => setSelectedStreamId(stream.id)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-[6px] transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#051C2C] text-white font-semibold shadow-xs'
                    : 'bg-white text-[#888888] hover:text-[#051C2C] border border-[#E8E8E6]'
                }`}
              >
                {stream.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stream Funnel Diagnostic & Monthly Input Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              {selectedStream.name} — Monthly Sales Funnel & WIP Flow
            </h3>
            <p className="text-[11px] text-[#888888]">
              Avg Deal Size: {formatCurrency(selectedStream.avgDealSize, 0)} | Sales Cycle Lag: {selectedStream.lagMonths} Months | Lead$\rightarrow$Opp: {(
                (inputs.activeScenario === ScenarioType.UPSIDE
                  ? selectedStream.leadToOppUpside
                  : inputs.activeScenario === ScenarioType.DOWNSIDE
                  ? selectedStream.leadToOppDownside
                  : selectedStream.leadToOppBase) * 100
              ).toFixed(0)}%
            </p>
          </div>
          <span className="text-[11px] text-[#888888] italic">
            Edit Raw Inflow Leads directly in the yellow cells
          </span>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] sticky left-0 bg-[#F7F7F6] z-10 w-[210px]">
                  Funnel Stage
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
              {/* Raw Leads Inflow - EDITABLE */}
              <tr className="border-b border-[#E8E8E6] bg-[rgba(255,253,231,0.4)] hover:bg-[rgba(255,253,231,0.7)]">
                <td className="py-2.5 px-3 font-medium text-[#051C2C] sticky left-0 bg-[#FFFEEB] z-10">
                  Raw Inflow Leads (Editable)
                </td>
                {streamData.map((d, idx) => (
                  <td key={idx} className="text-right py-1.5 px-1.5">
                    <input
                      type="number"
                      value={d.rawLeads}
                      onChange={(e) =>
                        onUpdateRawLead(selectedStream.id, idx, parseInt(e.target.value, 10) || 0)
                      }
                      className="editable-cell-input text-right w-16"
                    />
                  </td>
                ))}
              </tr>

              {/* Qualified Opps */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10">
                  Qualified Opportunities
                </td>
                {streamData.map((d, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    {formatNumber(d.qualifiedOpps)}
                  </td>
                ))}
              </tr>

              {/* Won Orders Count (with Lag) */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10">
                  Won Orders (Lag Offset)
                </td>
                {streamData.map((d, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    {formatNumber(d.wonOrdersCount)}
                  </td>
                ))}
              </tr>

              {/* Contract Booked Value */}
              <tr className="border-b border-[#E8E8E6] font-semibold bg-[rgba(5,28,44,0.015)] hover:bg-white">
                <td className="py-2.5 px-3 text-[#051C2C] sticky left-0 bg-[#FAFAF8] z-10">
                  Contract Orders Booked ($)
                </td>
                {streamData.map((d, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    {formatCurrency(d.contractOrderValue, 0)}
                  </td>
                ))}
              </tr>

              {/* Realized Revenue via WIP Curve */}
              <tr className="border-b border-[#E8E8E6] font-bold bg-[rgba(34,81,255,0.03)] hover:bg-white">
                <td className="py-2.5 px-3 text-[#2251FF] sticky left-0 bg-[#F4F7FF] z-10">
                  WIP Realized Revenue ($)
                </td>
                {streamData.map((d, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#2251FF]">
                    {formatCurrency(d.realizedRevenue, 0)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Aggregate Project Realized Revenue by Stream Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              All 7 Project Lines — Monthly Realized Revenue Summary
            </h3>
            <p className="text-[11px] text-[#888888]">
              Cross-month delivery convolution flowing to company-wide P&L (Sheet 5)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] sticky left-0 bg-[#F7F7F6] z-10 w-[240px]">
                  Project Pipeline Engineering Line
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
              {inputs.pipelineStreams.map((stream) => {
                const streamRevs = pipelineByStream[stream.id] || [];
                return (
                  <tr key={stream.id} className="border-b border-[#E8E8E6] hover:bg-white">
                    <td className="py-2.5 px-3 font-medium text-[#051C2C] sticky left-0 bg-white z-10">
                      {stream.name}
                    </td>
                    {streamRevs.map((s, idx) => (
                      <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                        {formatCurrency(s.realizedRevenue, 0)}
                      </td>
                    ))}
                  </tr>
                );
              })}

              {/* Total Project Orders Booked */}
              <tr className="font-semibold bg-[rgba(5,28,44,0.02)] border-t border-[#E8E8E6]">
                <td className="py-2.5 px-3 text-[#888888] sticky left-0 bg-[#F8F9FA] z-10">
                  Total Project Booked Orders ($)
                </td>
                {totalProjectOrders.map((tot, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    {formatCurrency(tot, 0)}
                  </td>
                ))}
              </tr>

              {/* Total Project Realized Revenue */}
              <tr className="font-bold bg-[rgba(5,28,44,0.04)] border-t-2 border-[rgba(5,28,44,0.15)]">
                <td className="py-3 px-3 text-[#051C2C] uppercase tracking-[0.06em] sticky left-0 bg-[#F5F7F8] z-10">
                  Total Project Realized P&L Revenue
                </td>
                {totalProjectRevenue.map((tot, idx) => (
                  <td key={idx} className="text-right py-3 px-3 font-mono text-[#051C2C]">
                    <div className="flex items-center justify-end">
                      <span>{formatCurrency(tot, 0)}</span>
                      <InlineDataBar value={tot} max={maxProjectRev} width="40px" />
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
