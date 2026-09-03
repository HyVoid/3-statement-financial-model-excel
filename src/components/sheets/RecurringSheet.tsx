import React, { useState } from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { ModelCalculatedResults, ModelInputs } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { InlineDataBar } from '../InlineDataBar';

interface RecurringSheetProps {
  inputs: ModelInputs;
  results: ModelCalculatedResults;
  onUpdateInitialBase: (streamIndex: number, newBase: number) => void;
}

export const RecurringSheet: React.FC<RecurringSheetProps> = ({
  inputs,
  results,
  onUpdateInitialBase,
}) => {
  const [selectedStreamId, setSelectedStreamId] = useState<string>(inputs.recurringStreams[0].id);

  const { months, recurringByStream, totalRecurringRevenue } = results;
  const maxTotalRev = Math.max(...totalRecurringRevenue, 1);

  const selectedStream = inputs.recurringStreams.find((s) => s.id === selectedStreamId) || inputs.recurringStreams[0];
  const selectedStreamIndex = inputs.recurringStreams.findIndex((s) => s.id === selectedStream.id);
  const streamData = recurringByStream[selectedStream.id] || [];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="pb-2 border-b border-[#E8E8E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#051C2C] tracking-tight">
            Sheet 2: Recurring Service Contracts & Roll-Forward Engine
          </h1>
          <p className="text-[13px] text-[#888888] mt-1">
            Dynamic monthly customer base evolution (Opening - Churn + Renewals = Closing) driving predictable P&L recognized service revenues.
          </p>
        </div>

        {/* Stream Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto table-scrollbar max-w-full pb-1">
          {inputs.recurringStreams.map((stream) => {
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

      {/* Selected Stream Deep Dive Roll-Forward Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              {selectedStream.name} — Monthly Contract Roll-Forward
            </h3>
            <p className="text-[11px] text-[#888888]">
              Annual ARPU: {formatCurrency(selectedStream.annualArpu, 0)} | Annual Churn: {(selectedStream.annualChurn * 100).toFixed(1)}% | Renewal Rate: {(selectedStream.renewalRate * 100).toFixed(1)}%
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#888888]">Initial Base:</span>
            <input
              type="number"
              value={selectedStream.initialBase}
              onChange={(e) =>
                onUpdateInitialBase(selectedStreamIndex, parseInt(e.target.value, 10) || 0)
              }
              className="editable-cell-input w-20 text-right"
              title="Edit starting contract base"
            />
            <span className="text-[11px] text-[#888888]">units</span>
          </div>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] sticky left-0 bg-[#F7F7F6] z-10 w-[180px]">
                  Roll-Forward Metric
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
              {/* Opening Base */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10">
                  Opening Contract Base
                </td>
                {streamData.map((d, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    {formatNumber(d.openingBase)}
                  </td>
                ))}
              </tr>

              {/* Churned Units */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10">
                  Monthly Churned Units (-)
                </td>
                {streamData.map((d, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    {d.churnedUnits > 0 ? `-${d.churnedUnits}` : '0'}
                  </td>
                ))}
              </tr>

              {/* Renewed Units */}
              <tr className="border-b border-[#E8E8E6] hover:bg-white">
                <td className="py-2.5 px-3 font-medium text-[#888888] sticky left-0 bg-white z-10">
                  Monthly Renewals (+)
                </td>
                {streamData.map((d, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#888888]">
                    +{d.renewedUnits}
                  </td>
                ))}
              </tr>

              {/* Closing Base */}
              <tr className="border-b border-[#E8E8E6] font-semibold bg-[rgba(5,28,44,0.015)] hover:bg-white">
                <td className="py-2.5 px-3 text-[#051C2C] sticky left-0 bg-[#FAFAF8] z-10">
                  Closing In-Force Base
                </td>
                {streamData.map((d, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                    {formatNumber(d.closingBase)}
                  </td>
                ))}
              </tr>

              {/* Recognized Monthly Revenue */}
              <tr className="border-b border-[#E8E8E6] font-bold bg-[rgba(34,81,255,0.03)] hover:bg-white">
                <td className="py-2.5 px-3 text-[#2251FF] sticky left-0 bg-[#F4F7FF] z-10">
                  P&L Recognized Revenue ($)
                </td>
                {streamData.map((d, idx) => (
                  <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#2251FF]">
                    {formatCurrency(d.monthlyRevenue, 0)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Aggregate All 7 Recurring Streams Monthly Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              All 7 Recurring Streams — Monthly Revenue Aggregation
            </h3>
            <p className="text-[11px] text-[#888888]">
              Standardized recognized revenue flowing to unified Revenue Schedule (Sheet 5)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] sticky left-0 bg-[#F7F7F6] z-10 w-[220px]">
                  Recurring Service Stream
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
              {inputs.recurringStreams.map((stream) => {
                const streamRevs = recurringByStream[stream.id] || [];
                return (
                  <tr key={stream.id} className="border-b border-[#E8E8E6] hover:bg-white">
                    <td className="py-2.5 px-3 font-medium text-[#051C2C] sticky left-0 bg-white z-10">
                      {stream.name}
                    </td>
                    {streamRevs.map((s, idx) => (
                      <td key={idx} className="text-right py-2.5 px-3 font-mono text-[#051C2C]">
                        {formatCurrency(s.monthlyRevenue, 0)}
                      </td>
                    ))}
                  </tr>
                );
              })}

              {/* Total Row */}
              <tr className="font-bold bg-[rgba(5,28,44,0.04)] border-t-2 border-[rgba(5,28,44,0.15)]">
                <td className="py-3 px-3 text-[#051C2C] uppercase tracking-[0.06em] sticky left-0 bg-[#F5F7F8] z-10">
                  Total Recurring P&L Revenue
                </td>
                {totalRecurringRevenue.map((tot, idx) => (
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
