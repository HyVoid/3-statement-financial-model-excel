import React, { useMemo } from 'react';
import { Layers, Grid, Sliders, CheckCircle2 } from 'lucide-react';
import { ModelInputs, ScenarioType } from '../../types';
import { computeFinancialModel, computeSensitivityMatrix } from '../../models/financialEngine';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface SensitivitySheetProps {
  inputs: ModelInputs;
  onSelectScenario: (scenario: ScenarioType) => void;
}

export const SensitivitySheet: React.FC<SensitivitySheetProps> = ({ inputs, onSelectScenario }) => {
  // Compute parallel scenario outputs
  const scenarioResults = useMemo(() => {
    const baseInputs = { ...inputs, activeScenario: ScenarioType.BASE };
    const upsideInputs = { ...inputs, activeScenario: ScenarioType.UPSIDE };
    const downsideInputs = { ...inputs, activeScenario: ScenarioType.DOWNSIDE };

    return {
      base: computeFinancialModel(baseInputs),
      upside: computeFinancialModel(upsideInputs),
      downside: computeFinancialModel(downsideInputs),
    };
  }, [inputs]);

  // Compute 2D Sensitivity Matrix
  const sensitivityData = useMemo(() => {
    return computeSensitivityMatrix(inputs);
  }, [inputs]);

  const { base, upside, downside } = scenarioResults;
  const { conversionDeltas, priceDeltas, matrix } = sensitivityData;

  // Flatten matrix to find max and min for color intensity mapping
  const flatValues = matrix.flat();
  const minVal = Math.min(...flatValues);
  const maxVal = Math.max(...flatValues);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="pb-2 border-b border-[#E8E8E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#051C2C] tracking-tight">
            Sheet 10: Scenario Modeling & 2D Sensitivity Matrix
          </h1>
          <p className="text-[13px] text-[#888888] mt-1">
            Comparative outcome projections across Base / Upside / Downside cases alongside multidimensional EBITDA sensitivity to sales conversion and contract price shifts.
          </p>
        </div>
      </div>

      {/* Scenario Comparison Cards Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Scenario Comparative Summary Matrix
            </h3>
            <p className="text-[11px] text-[#888888]">
              Click on any scenario card to activate it globally across the workbook
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Base Case Card */}
          <div
            onClick={() => onSelectScenario(ScenarioType.BASE)}
            className={`p-5 rounded-[12px] border transition-all cursor-pointer ${
              inputs.activeScenario === ScenarioType.BASE
                ? 'bg-[rgba(34,81,255,0.03)] border-[#2251FF] shadow-sm'
                : 'bg-white border-[#E8E8E6] hover:border-[#888888]'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(5,28,44,0.08)]">
              <span className="font-bold text-[14px] text-[#051C2C]">Base Case (1)</span>
              {inputs.activeScenario === ScenarioType.BASE && (
                <span className="badge-pill bg-[#2251FF] text-white text-[10px] px-2 py-0.5">
                  Active
                </span>
              )}
            </div>
            <div className="mt-3 space-y-2 text-[12px]">
              <div className="flex justify-between">
                <span className="text-[#888888]">Year 1 Turnover:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(base.year1.revenue, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Year 1 EBITDA:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(base.year1.ebitda, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Year 1 Net Income:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(base.year1.netIncome, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Month 12 Cash:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(base.year1.endingCash, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Recurring Mix:</span>
                <span className="font-mono font-semibold text-[#2251FF]">
                  {base.year1.recurringPct.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Upside Case Card */}
          <div
            onClick={() => onSelectScenario(ScenarioType.UPSIDE)}
            className={`p-5 rounded-[12px] border transition-all cursor-pointer ${
              inputs.activeScenario === ScenarioType.UPSIDE
                ? 'bg-[rgba(34,81,255,0.03)] border-[#2251FF] shadow-sm'
                : 'bg-white border-[#E8E8E6] hover:border-[#888888]'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(5,28,44,0.08)]">
              <span className="font-bold text-[14px] text-[#051C2C]">Upside Case (2)</span>
              {inputs.activeScenario === ScenarioType.UPSIDE && (
                <span className="badge-pill bg-[#2251FF] text-white text-[10px] px-2 py-0.5">
                  Active
                </span>
              )}
            </div>
            <div className="mt-3 space-y-2 text-[12px]">
              <div className="flex justify-between">
                <span className="text-[#888888]">Year 1 Turnover:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(upside.year1.revenue, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Year 1 EBITDA:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(upside.year1.ebitda, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Year 1 Net Income:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(upside.year1.netIncome, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Month 12 Cash:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(upside.year1.endingCash, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Recurring Mix:</span>
                <span className="font-mono font-semibold text-[#2251FF]">
                  {upside.year1.recurringPct.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Downside Case Card */}
          <div
            onClick={() => onSelectScenario(ScenarioType.DOWNSIDE)}
            className={`p-5 rounded-[12px] border transition-all cursor-pointer ${
              inputs.activeScenario === ScenarioType.DOWNSIDE
                ? 'bg-[rgba(34,81,255,0.03)] border-[#2251FF] shadow-sm'
                : 'bg-white border-[#E8E8E6] hover:border-[#888888]'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(5,28,44,0.08)]">
              <span className="font-bold text-[14px] text-[#051C2C]">Downside Case (3)</span>
              {inputs.activeScenario === ScenarioType.DOWNSIDE && (
                <span className="badge-pill bg-[#2251FF] text-white text-[10px] px-2 py-0.5">
                  Active
                </span>
              )}
            </div>
            <div className="mt-3 space-y-2 text-[12px]">
              <div className="flex justify-between">
                <span className="text-[#888888]">Year 1 Turnover:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(downside.year1.revenue, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Year 1 EBITDA:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(downside.year1.ebitda, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Year 1 Net Income:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(downside.year1.netIncome, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Month 12 Cash:</span>
                <span className="font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(downside.year1.endingCash, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Recurring Mix:</span>
                <span className="font-mono font-semibold text-[#2251FF]">
                  {downside.year1.recurringPct.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2D Sensitivity Grid: Deal Conversion Rate vs Contract Price */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E8E6]">
          <div>
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              2D Sensitivity Matrix — Year 1 Operating EBITDA Impact
            </h3>
            <p className="text-[11px] text-[#888888]">
              Hover over matrix cells to inspect scale dynamics. Center cell represents current benchmark assumption.
            </p>
          </div>
          <div className="text-[11px] text-[#888888]">
            Row: Pipeline Conversion Delta ($\Delta$Conv) | Col: Pricing Delta ($\Delta$Price)
          </div>
        </div>

        <div className="overflow-x-auto table-scrollbar pt-2">
          <table className="w-full border-collapse text-[12px] max-w-4xl mx-auto">
            <thead>
              <tr>
                <th className="p-3 text-left font-bold text-[#051C2C] text-[11px] uppercase tracking-[0.06em] bg-[rgba(5,28,44,0.06)] border border-[#E8E8E6]">
                  $\Delta$ Conv Rate \ $\Delta$ Price
                </th>
                {priceDeltas.map((dp) => (
                  <th
                    key={dp}
                    className="p-3 text-center font-bold text-[#051C2C] text-[11px] uppercase tracking-[0.06em] bg-[rgba(5,28,44,0.04)] border border-[#E8E8E6] min-w-[130px]"
                  >
                    {dp > 0 ? `+${(dp * 100).toFixed(1)}%` : `${(dp * 100).toFixed(1)}%`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {conversionDeltas.map((dConv, rIdx) => (
                <tr key={dConv}>
                  <td className="p-3 font-semibold text-[#051C2C] bg-[rgba(5,28,44,0.03)] border border-[#E8E8E6] whitespace-nowrap">
                    {dConv > 0 ? `+${(dConv * 100).toFixed(0)}%` : `${(dConv * 100).toFixed(0)}%`} Conversion
                  </td>
                  {matrix[rIdx].map((ebitdaVal, cIdx) => {
                    const isCenter = dConv === 0 && priceDeltas[cIdx] === 0;
                    // Compute opacity relative to range
                    const normalized = maxVal > minVal ? (ebitdaVal - minVal) / (maxVal - minVal) : 0.5;
                    const bgAlpha = 0.02 + normalized * 0.12;

                    return (
                      <td
                        key={cIdx}
                        className="interactive-cell p-3 text-center font-mono text-[13px] border border-[#E8E8E6] relative group"
                        style={{
                          backgroundColor: isCenter ? 'rgba(34, 81, 255, 0.12)' : `rgba(5, 28, 44, ${bgAlpha})`,
                        }}
                      >
                        <span
                          className={`font-semibold ${
                            isCenter ? 'text-[#2251FF] font-bold' : 'text-[#051C2C]'
                          }`}
                        >
                          {formatCurrency(ebitdaVal, 0)}
                        </span>
                        {isCenter && (
                          <div className="text-[9px] font-sans text-[#2251FF] uppercase font-bold tracking-wider">
                            Base Case
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
