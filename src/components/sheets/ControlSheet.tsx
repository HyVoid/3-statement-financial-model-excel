import React from 'react';
import { Sliders, Layers, DollarSign, Clock, Users, Building, ShieldAlert } from 'lucide-react';
import { ModelInputs, ScenarioType } from '../../types';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface ControlSheetProps {
  inputs: ModelInputs;
  onUpdateInputs: (updater: (prev: ModelInputs) => ModelInputs) => void;
}

export const ControlSheet: React.FC<ControlSheetProps> = ({ inputs, onUpdateInputs }) => {
  const handleScenarioChange = (s: ScenarioType) => {
    onUpdateInputs((prev) => ({ ...prev, activeScenario: s }));
  };

  const handleRecurringChange = (
    index: number,
    field: 'annualChurn' | 'renewalRate' | 'annualArpu' | 'initialBase',
    value: number
  ) => {
    onUpdateInputs((prev) => {
      const updated = [...prev.recurringStreams];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, recurringStreams: updated };
    });
  };

  const handlePipelineChange = (
    index: number,
    field:
      | 'leadToOppBase'
      | 'leadToOppUpside'
      | 'leadToOppDownside'
      | 'quoteToOrderBase'
      | 'quoteToOrderUpside'
      | 'quoteToOrderDownside'
      | 'lagMonths'
      | 'avgDealSize',
    value: number
  ) => {
    onUpdateInputs((prev) => {
      const updated = [...prev.pipelineStreams];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, pipelineStreams: updated };
    });
  };

  const handleWipChange = (field: 'm0' | 'm1' | 'm2' | 'm3', value: number) => {
    onUpdateInputs((prev) => ({
      ...prev,
      wipCurve: { ...prev.wipCurve, [field]: value },
    }));
  };

  const handleLaborChange = (
    field: 'qualifierHoursPerOpp' | 'identifierHoursPerOrder' | 'monthlyStdHours' | 'productiveUtilization',
    value: number
  ) => {
    onUpdateInputs((prev) => ({
      ...prev,
      laborStandards: { ...prev.laborStandards, [field]: value },
    }));
  };

  const handleWcChange = (
    field: 'debtorDays' | 'creditorDays' | 'inventoryDays' | 'taxRate',
    value: number
  ) => {
    onUpdateInputs((prev) => ({
      ...prev,
      wcDays: { ...prev.wcDays, [field]: value },
    }));
  };

  const handleCostDriversChange = (
    field: 'directMaterialsPct' | 'monthlySalaryPerFTE' | 'monthlyFixedGABase' | 'leadCostPerUnit',
    value: number
  ) => {
    onUpdateInputs((prev) => ({
      ...prev,
      costDrivers: { ...prev.costDrivers, [field]: value },
    }));
  };

  const handleDebtChange = (
    index: number,
    field: 'openingPrincipal' | 'annualInterestRate' | 'tenorMonths' | 'drawdownAmount' | 'drawdownMonth' | 'writeoffAmount' | 'writeoffMonth',
    value: number
  ) => {
    onUpdateInputs((prev) => {
      const updated = [...prev.debtFacilities];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, debtFacilities: updated };
    });
  };

  const wipSum = inputs.wipCurve.m0 + inputs.wipCurve.m1 + inputs.wipCurve.m2 + inputs.wipCurve.m3;
  const isWipSumValid = Math.abs(wipSum - 1.0) < 0.001;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header section */}
      <div className="pb-2 border-b border-[#E8E8E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-bold text-[#051C2C] tracking-tight">
            Sheet 1: Control & Central Assumptions
          </h1>
          <p className="text-[13px] text-[#888888] mt-1">
            Global model drivers, macro toggles, scenario parameters, and operational cost standards.
            All edits propagate immediately through JavaScript calculation logic.
          </p>
        </div>

        {/* Global Scenario Selector Switch */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-[10px] shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888]">
            Active Scenario:
          </span>
          <div className="flex bg-[rgba(5,28,44,0.05)] p-0.5 rounded-[6px]">
            {[
              { type: ScenarioType.BASE, label: 'Base (1)' },
              { type: ScenarioType.UPSIDE, label: 'Upside (2)' },
              { type: ScenarioType.DOWNSIDE, label: 'Downside (3)' },
            ].map((sc) => (
              <button
                key={sc.type}
                onClick={() => handleScenarioChange(sc.type)}
                className={`px-3 py-1 text-[12px] font-medium rounded-[5px] transition-all cursor-pointer ${
                  inputs.activeScenario === sc.type
                    ? 'bg-white text-[#051C2C] font-bold shadow-xs'
                    : 'text-[#888888] hover:text-[#051C2C]'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Control Blocks */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Block A: Model Horizon & Core Control */}
        <div className="card-elevation p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E8E8E6]">
            <Sliders size={16} className="text-[#2251FF]" />
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Block A: Horizon & General Control
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-[12px]">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888] mb-1">
                Forecast Start Date
              </label>
              <input
                type="text"
                value={inputs.forecastStartDate}
                onChange={(e) =>
                  onUpdateInputs((prev) => ({ ...prev, forecastStartDate: e.target.value }))
                }
                className="editable-cell-input text-left"
                placeholder="2027-01-01"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888888] mb-1">
                Forecast Horizon (Periods)
              </label>
              <input
                type="number"
                value={inputs.forecastPeriods}
                onChange={(e) =>
                  onUpdateInputs((prev) => ({
                    ...prev,
                    forecastPeriods: Math.min(36, Math.max(12, parseInt(e.target.value, 10) || 24)),
                  }))
                }
                className="editable-cell-input text-right"
              />
            </div>
          </div>
        </div>

        {/* Block E: WIP Realization Schedule */}
        <div className="card-elevation p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E6]">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#2251FF]" />
              <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
                Block E: WIP Revenue Release Schedule
              </h3>
            </div>
            {!isWipSumValid && (
              <span className="badge-pill bg-[rgba(211,47,47,0.1)] text-[#D32F2F] text-[10px]">
                Must sum to 100% (Current: {(wipSum * 100).toFixed(0)}%)
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-3 text-[12px]">
            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                M0 (Signing)
              </label>
              <input
                type="number"
                step="0.05"
                value={inputs.wipCurve.m0}
                onChange={(e) => handleWipChange('m0', parseFloat(e.target.value) || 0)}
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">
                {(inputs.wipCurve.m0 * 100).toFixed(0)}%
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                M1 (Month 1)
              </label>
              <input
                type="number"
                step="0.05"
                value={inputs.wipCurve.m1}
                onChange={(e) => handleWipChange('m1', parseFloat(e.target.value) || 0)}
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">
                {(inputs.wipCurve.m1 * 100).toFixed(0)}%
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                M2 (Month 2)
              </label>
              <input
                type="number"
                step="0.05"
                value={inputs.wipCurve.m2}
                onChange={(e) => handleWipChange('m2', parseFloat(e.target.value) || 0)}
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">
                {(inputs.wipCurve.m2 * 100).toFixed(0)}%
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                M3 (Handover)
              </label>
              <input
                type="number"
                step="0.05"
                value={inputs.wipCurve.m3}
                onChange={(e) => handleWipChange('m3', parseFloat(e.target.value) || 0)}
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">
                {(inputs.wipCurve.m3 * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Block F: Delivery Labor & Capacity Standards */}
        <div className="card-elevation p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E8E8E6]">
            <Users size={16} className="text-[#2251FF]" />
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Block F: Delivery Labor Standards & Utilization
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px]">
            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                Qualifier Effort
              </label>
              <input
                type="number"
                step="0.5"
                value={inputs.laborStandards.qualifierHoursPerOpp}
                onChange={(e) =>
                  handleLaborChange('qualifierHoursPerOpp', parseFloat(e.target.value) || 0)
                }
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">Hrs / Opp</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                Identifier Effort
              </label>
              <input
                type="number"
                step="1"
                value={inputs.laborStandards.identifierHoursPerOrder}
                onChange={(e) =>
                  handleLaborChange('identifierHoursPerOrder', parseFloat(e.target.value) || 0)
                }
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">Hrs / Won Order</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                Monthly Std Hours
              </label>
              <input
                type="number"
                value={inputs.laborStandards.monthlyStdHours}
                onChange={(e) =>
                  handleLaborChange('monthlyStdHours', parseFloat(e.target.value) || 160)
                }
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">Hrs / FTE</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                Productive Util %
              </label>
              <input
                type="number"
                step="0.05"
                value={inputs.laborStandards.productiveUtilization}
                onChange={(e) =>
                  handleLaborChange('productiveUtilization', parseFloat(e.target.value) || 0.85)
                }
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">
                {(inputs.laborStandards.productiveUtilization * 100).toFixed(0)}% Util
              </span>
            </div>
          </div>
        </div>

        {/* Block G: Working Capital Credit Terms & Tax */}
        <div className="card-elevation p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E8E8E6]">
            <Building size={16} className="text-[#2251FF]" />
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Block G: Working Capital Credit Terms & Tax
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px]">
            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                Debtor Days (DSO)
              </label>
              <input
                type="number"
                value={inputs.wcDays.debtorDays}
                onChange={(e) => handleWcChange('debtorDays', parseInt(e.target.value, 10) || 0)}
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">Days sales uncollected</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                Creditor Days (DPO)
              </label>
              <input
                type="number"
                value={inputs.wcDays.creditorDays}
                onChange={(e) => handleWcChange('creditorDays', parseInt(e.target.value, 10) || 0)}
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">Days vendor credit</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                Inventory Days (DIO)
              </label>
              <input
                type="number"
                value={inputs.wcDays.inventoryDays}
                onChange={(e) => handleWcChange('inventoryDays', parseInt(e.target.value, 10) || 0)}
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">Days inventory hold</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#888888] mb-1">
                Income Tax Rate
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.wcDays.taxRate}
                onChange={(e) => handleWcChange('taxRate', parseFloat(e.target.value) || 0)}
                className="editable-cell-input text-right"
              />
              <span className="text-[10px] text-[#888888] block text-right mt-0.5">
                {(inputs.wcDays.taxRate * 100).toFixed(0)}% Rate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Block B: Recurring Service Assumptions Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E6]">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-[#2251FF]" />
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Block B: Recurring Service Contracts Drivers (7 Service Streams)
            </h3>
          </div>
          <span className="text-[11px] text-[#888888]">
            Yellow cells indicates editable driver values
          </span>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C]">
                  Service Line Name
                </th>
                <th className="text-right py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] w-[140px]">
                  Opening Base (Units)
                </th>
                <th className="text-right py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] w-[140px]">
                  Annual Churn (%)
                </th>
                <th className="text-right py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] w-[140px]">
                  Renewal Rate (%)
                </th>
                <th className="text-right py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] w-[160px]">
                  Annual ARPU ($)
                </th>
              </tr>
            </thead>
            <tbody>
              {inputs.recurringStreams.map((stream, idx) => (
                <tr key={stream.id} className="border-b border-[#E8E8E6] hover:bg-white">
                  <td className="py-2.5 px-3 font-medium text-[#051C2C]">{stream.name}</td>
                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      value={stream.initialBase}
                      onChange={(e) =>
                        handleRecurringChange(idx, 'initialBase', parseInt(e.target.value, 10) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="0.01"
                      value={stream.annualChurn}
                      onChange={(e) =>
                        handleRecurringChange(idx, 'annualChurn', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="0.01"
                      value={stream.renewalRate}
                      onChange={(e) =>
                        handleRecurringChange(idx, 'renewalRate', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="100"
                      value={stream.annualArpu}
                      onChange={(e) =>
                        handleRecurringChange(idx, 'annualArpu', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Block C & D: Project Pipeline Funnel Conversion Rates Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E6]">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-[#2251FF]" />
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Block C & D: Project Pipeline Conversion Rates & Deal Matrix (7 Pipeline Streams)
            </h3>
          </div>
          <span className="text-[11px] text-[#888888]">
            Multi-Scenario Funnel & Lag Parameters
          </span>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th rowSpan={2} className="text-left py-2 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C]">
                  Pipeline Engineering Line
                </th>
                <th colSpan={3} className="text-center py-1.5 px-2 font-semibold uppercase tracking-[0.06em] text-[#051C2C] border-b border-[rgba(5,28,44,0.1)]">
                  Lead $\rightarrow$ Opp Conv Rate (%)
                </th>
                <th colSpan={3} className="text-center py-1.5 px-2 font-semibold uppercase tracking-[0.06em] text-[#051C2C] border-b border-[rgba(5,28,44,0.1)]">
                  Quote $\rightarrow$ Order Conv Rate (%)
                </th>
                <th rowSpan={2} className="text-right py-2 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] w-[90px]">
                  Lag (M)
                </th>
                <th rowSpan={2} className="text-right py-2 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] w-[130px]">
                  Avg Deal ($)
                </th>
              </tr>
              <tr className="bg-[rgba(5,28,44,0.02)] border-b border-[rgba(5,28,44,0.12)] text-[10px] text-[#888888]">
                <th className="py-1 px-2 text-right">Base</th>
                <th className="py-1 px-2 text-right">Upside</th>
                <th className="py-1 px-2 text-right">Downside</th>
                <th className="py-1 px-2 text-right">Base</th>
                <th className="py-1 px-2 text-right">Upside</th>
                <th className="py-1 px-2 text-right">Downside</th>
              </tr>
            </thead>
            <tbody>
              {inputs.pipelineStreams.map((stream, idx) => (
                <tr key={stream.id} className="border-b border-[#E8E8E6] hover:bg-white">
                  <td className="py-2.5 px-3 font-medium text-[#051C2C]">{stream.name}</td>

                  {/* Lead -> Opp rates */}
                  <td className="py-1.5 px-1.5 text-right w-[75px]">
                    <input
                      type="number"
                      step="0.01"
                      value={stream.leadToOppBase}
                      onChange={(e) =>
                        handlePipelineChange(idx, 'leadToOppBase', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                  <td className="py-1.5 px-1.5 text-right w-[75px]">
                    <input
                      type="number"
                      step="0.01"
                      value={stream.leadToOppUpside}
                      onChange={(e) =>
                        handlePipelineChange(idx, 'leadToOppUpside', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                  <td className="py-1.5 px-1.5 text-right w-[75px]">
                    <input
                      type="number"
                      step="0.01"
                      value={stream.leadToOppDownside}
                      onChange={(e) =>
                        handlePipelineChange(idx, 'leadToOppDownside', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>

                  {/* Quote -> Order rates */}
                  <td className="py-1.5 px-1.5 text-right w-[75px]">
                    <input
                      type="number"
                      step="0.01"
                      value={stream.quoteToOrderBase}
                      onChange={(e) =>
                        handlePipelineChange(idx, 'quoteToOrderBase', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                  <td className="py-1.5 px-1.5 text-right w-[75px]">
                    <input
                      type="number"
                      step="0.01"
                      value={stream.quoteToOrderUpside}
                      onChange={(e) =>
                        handlePipelineChange(idx, 'quoteToOrderUpside', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                  <td className="py-1.5 px-1.5 text-right w-[75px]">
                    <input
                      type="number"
                      step="0.01"
                      value={stream.quoteToOrderDownside}
                      onChange={(e) =>
                        handlePipelineChange(idx, 'quoteToOrderDownside', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>

                  {/* Lag */}
                  <td className="py-1.5 px-1.5 text-right">
                    <input
                      type="number"
                      value={stream.lagMonths}
                      onChange={(e) =>
                        handlePipelineChange(idx, 'lagMonths', parseInt(e.target.value, 10) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>

                  {/* Avg Deal Size */}
                  <td className="py-1.5 px-2 text-right">
                    <input
                      type="number"
                      step="1000"
                      value={stream.avgDealSize}
                      onChange={(e) =>
                        handlePipelineChange(idx, 'avgDealSize', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Block H: Debt Contracts & Facilities Table */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E6]">
          <div className="flex items-center gap-2">
            <Building size={16} className="text-[#2251FF]" />
            <h3 className="font-display text-[18px] font-bold text-[#051C2C] tracking-tight">
              Block H: Debt Facilities & Capital Repayment Terms
            </h3>
          </div>
          <span className="text-[11px] text-[#888888]">
            Senior Bank & Shareholder Loans
          </span>
        </div>

        <div className="overflow-x-auto table-scrollbar">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.04)] border-b-2 border-[rgba(5,28,44,0.12)] text-[11px]">
                <th className="text-left py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C]">
                  Facility Instrument Name
                </th>
                <th className="text-right py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] w-[150px]">
                  Opening Principal ($)
                </th>
                <th className="text-right py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] w-[130px]">
                  Annual Rate (%)
                </th>
                <th className="text-right py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] w-[110px]">
                  Tenor (Months)
                </th>
                <th className="text-right py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] w-[140px]">
                  Drawdown ($)
                </th>
                <th className="text-right py-2.5 px-3 font-semibold uppercase tracking-[0.06em] text-[#051C2C] w-[140px]">
                  Writeoff / Relief ($)
                </th>
              </tr>
            </thead>
            <tbody>
              {inputs.debtFacilities.map((fac, idx) => (
                <tr key={fac.id} className="border-b border-[#E8E8E6] hover:bg-white">
                  <td className="py-2.5 px-3 font-medium text-[#051C2C]">{fac.name}</td>
                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="10000"
                      value={fac.openingPrincipal}
                      onChange={(e) =>
                        handleDebtChange(idx, 'openingPrincipal', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="0.005"
                      value={fac.annualInterestRate}
                      onChange={(e) =>
                        handleDebtChange(idx, 'annualInterestRate', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      value={fac.tenorMonths}
                      onChange={(e) =>
                        handleDebtChange(idx, 'tenorMonths', parseInt(e.target.value, 10) || 1)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="5000"
                      value={fac.drawdownAmount}
                      onChange={(e) =>
                        handleDebtChange(idx, 'drawdownAmount', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <input
                      type="number"
                      step="5000"
                      value={fac.writeoffAmount}
                      onChange={(e) =>
                        handleDebtChange(idx, 'writeoffAmount', parseFloat(e.target.value) || 0)
                      }
                      className="editable-cell-input text-right"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
