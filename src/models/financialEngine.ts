import {
  CapacityMonthOutput,
  DebtFacilityMonthOutput,
  DebtTotalMonthOutput,
  ModelCalculatedResults,
  ModelInputs,
  OperatingModelMonthOutput,
  PipelineMonthOutput,
  RecurringMonthOutput,
  ScenarioType,
  ThreeStatementsMonthOutput,
  WorkingCapitalMonthOutput,
} from '../types';

/**
 * Generate monthly date labels in YYYY-MM format from startDate and count.
 */
export function generateMonthLabels(startDateStr: string, count: number): string[] {
  const [yearStr, monthStr] = startDateStr.split('-');
  let y = parseInt(yearStr, 10);
  let m = parseInt(monthStr, 10); // 1-indexed

  const labels: string[] = [];
  for (let i = 0; i < count; i++) {
    const formattedM = m < 10 ? `0${m}` : `${m}`;
    labels.push(`${y}-${formattedM}`);
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }
  return labels;
}

/**
 * Core pure calculation engine: executes all 11 sheets in sequence.
 */
export function computeFinancialModel(inputs: ModelInputs): ModelCalculatedResults {
  const periods = inputs.forecastPeriods;
  const months = generateMonthLabels(inputs.forecastStartDate, periods);

  // ─────────────────────────────────────────────────────────────
  // 1. RECURRING REVENUE (Sheet 2)
  // ─────────────────────────────────────────────────────────────
  const recurringByStream: Record<string, RecurringMonthOutput[]> = {};
  const totalRecurringRevenue: number[] = new Array(periods).fill(0);

  for (const stream of inputs.recurringStreams) {
    const streamOutputs: RecurringMonthOutput[] = [];
    let currentOpening = stream.initialBase;

    for (let m = 0; m < periods; m++) {
      const churnUnits = Math.round(currentOpening * (stream.annualChurn / 12));
      // Cohort due for renewal each month
      const dueContracts = Math.round(currentOpening / 12);
      const renewedUnits = Math.round(dueContracts * stream.renewalRate);
      const closingBase = Math.max(0, currentOpening - churnUnits + renewedUnits);
      const monthlyRevenue = Math.round((closingBase * (stream.annualArpu / 12)) * 100) / 100;

      streamOutputs.push({
        openingBase: currentOpening,
        churnedUnits: churnUnits,
        renewedUnits,
        closingBase,
        monthlyRevenue,
      });

      totalRecurringRevenue[m] = Math.round((totalRecurringRevenue[m] + monthlyRevenue) * 100) / 100;
      currentOpening = closingBase;
    }
    recurringByStream[stream.id] = streamOutputs;
  }

  // ─────────────────────────────────────────────────────────────
  // 2. PROJECT PIPELINE & WIP CONVOLUTION (Sheet 3)
  // ─────────────────────────────────────────────────────────────
  const pipelineByStream: Record<string, PipelineMonthOutput[]> = {};
  const totalProjectOrders: number[] = new Array(periods).fill(0);
  const totalProjectRevenue: number[] = new Array(periods).fill(0);

  const scenario = inputs.activeScenario;
  const { m0, m1, m2, m3 } = inputs.wipCurve;

  for (const stream of inputs.pipelineStreams) {
    const rawLeadList = inputs.rawLeads[stream.id] || new Array(periods).fill(30);

    // Select conversion rates by scenario
    let leadToOppRate = stream.leadToOppBase;
    let quoteToOrderRate = stream.quoteToOrderBase;

    if (scenario === ScenarioType.UPSIDE) {
      leadToOppRate = stream.leadToOppUpside;
      quoteToOrderRate = stream.quoteToOrderUpside;
    } else if (scenario === ScenarioType.DOWNSIDE) {
      leadToOppRate = stream.leadToOppDownside;
      quoteToOrderRate = stream.quoteToOrderDownside;
    }

    // Step 2a: Opps & Orders calculation
    const oppsByMonth: number[] = [];
    const ordersCountByMonth: number[] = [];
    const orderValuesByMonth: number[] = [];

    for (let m = 0; m < periods; m++) {
      const leads = rawLeadList[m] ?? 0;
      const opps = Math.round(leads * leadToOppRate);
      oppsByMonth.push(opps);
    }

    for (let m = 0; m < periods; m++) {
      const lag = stream.lagMonths;
      const sourceOpps = m - lag >= 0 ? oppsByMonth[m - lag] : oppsByMonth[0];
      const wonOrders = Math.round(sourceOpps * quoteToOrderRate);
      const contractValue = wonOrders * stream.avgDealSize;

      ordersCountByMonth.push(wonOrders);
      orderValuesByMonth.push(contractValue);
      totalProjectOrders[m] += contractValue;
    }

    // Step 2b: WIP convolution curve for realized revenue
    const streamOutputs: PipelineMonthOutput[] = [];
    for (let m = 0; m < periods; m++) {
      const v0 = orderValuesByMonth[m] || 0;
      const v1 = m - 1 >= 0 ? orderValuesByMonth[m - 1] : orderValuesByMonth[0];
      const v2 = m - 2 >= 0 ? orderValuesByMonth[m - 2] : orderValuesByMonth[0];
      const v3 = m - 3 >= 0 ? orderValuesByMonth[m - 3] : orderValuesByMonth[0];

      const realized = Math.round((v0 * m0 + v1 * m1 + v2 * m2 + v3 * m3) * 100) / 100;

      streamOutputs.push({
        rawLeads: rawLeadList[m] ?? 0,
        qualifiedOpps: oppsByMonth[m],
        wonOrdersCount: ordersCountByMonth[m],
        contractOrderValue: orderValuesByMonth[m],
        realizedRevenue: realized,
      });

      totalProjectRevenue[m] = Math.round((totalProjectRevenue[m] + realized) * 100) / 100;
    }

    pipelineByStream[stream.id] = streamOutputs;
  }

  // ─────────────────────────────────────────────────────────────
  // 3. CAPACITY PLANNING (Sheet 4)
  // ─────────────────────────────────────────────────────────────
  const capacity: CapacityMonthOutput[] = [];
  const { qualifierHoursPerOpp, identifierHoursPerOrder, monthlyStdHours, productiveUtilization } =
    inputs.laborStandards;
  const effectiveHoursPerFTE = monthlyStdHours * productiveUtilization;

  for (let m = 0; m < periods; m++) {
    let totalOppsInMonth = 0;
    let totalOrdersInMonth = 0;

    for (const stream of inputs.pipelineStreams) {
      const streamOut = pipelineByStream[stream.id];
      if (streamOut && streamOut[m]) {
        totalOppsInMonth += streamOut[m].qualifiedOpps;
        totalOrdersInMonth += streamOut[m].wonOrdersCount;
      }
    }

    const qualifierHours = Math.round(totalOppsInMonth * qualifierHoursPerOpp * 10) / 10;
    const identifierHours = Math.round(totalOrdersInMonth * identifierHoursPerOrder * 10) / 10;

    const reqQFTE = effectiveHoursPerFTE > 0 ? Math.round((qualifierHours / effectiveHoursPerFTE) * 10) / 10 : 0;
    const reqIFTE = effectiveHoursPerFTE > 0 ? Math.round((identifierHours / effectiveHoursPerFTE) * 10) / 10 : 0;
    const totalRequiredFTE = Math.round((reqQFTE + reqIFTE) * 10) / 10;

    const availableFTE = inputs.activeAvailableFTE[m] ?? 18;
    const capacityGap = Math.round((availableFTE - totalRequiredFTE) * 10) / 10;

    capacity.push({
      qualifierHours,
      identifierHours,
      requiredQualifierFTE: reqQFTE,
      requiredIdentifierFTE: reqIFTE,
      totalRequiredFTE,
      availableFTE,
      capacityGap,
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 4. REVENUE SCHEDULE (Sheet 5)
  // ─────────────────────────────────────────────────────────────
  const streamNames: string[] = [];
  const streamTypes: ('Recurring' | 'Project')[] = [];
  const monthlyRevenueByStream: number[][] = [];
  const totalMonthlyRevenue: number[] = new Array(periods).fill(0);

  // 7 Recurring streams
  for (const stream of inputs.recurringStreams) {
    streamNames.push(stream.name);
    streamTypes.push('Recurring');
    const revRow = recurringByStream[stream.id].map((r) => r.monthlyRevenue);
    monthlyRevenueByStream.push(revRow);
  }

  // 7 Project streams
  for (const stream of inputs.pipelineStreams) {
    streamNames.push(stream.name);
    streamTypes.push('Project');
    const revRow = pipelineByStream[stream.id].map((p) => p.realizedRevenue);
    monthlyRevenueByStream.push(revRow);
  }

  for (let m = 0; m < periods; m++) {
    totalMonthlyRevenue[m] = Math.round((totalRecurringRevenue[m] + totalProjectRevenue[m]) * 100) / 100;
  }

  // ─────────────────────────────────────────────────────────────
  // 5. OPERATING MODEL (Sheet 6)
  // ─────────────────────────────────────────────────────────────
  const operatingModel: OperatingModelMonthOutput[] = [];
  const { directMaterialsPct, monthlySalaryPerFTE, monthlyFixedGABase, leadCostPerUnit } = inputs.costDrivers;

  for (let m = 0; m < periods; m++) {
    const rev = totalMonthlyRevenue[m];
    const materials = Math.round(rev * directMaterialsPct * 100) / 100;
    const labor = Math.round(capacity[m].totalRequiredFTE * monthlySalaryPerFTE * 100) / 100;
    const totalCOGS = Math.round((materials + labor) * 100) / 100;
    const grossProfit = Math.round((rev - totalCOGS) * 100) / 100;
    const grossMarginPct = rev > 0 ? Math.round((grossProfit / rev) * 1000) / 1000 : 0;

    // Total raw leads across all streams
    let monthlyLeadsTotal = 0;
    for (const stream of inputs.pipelineStreams) {
      monthlyLeadsTotal += inputs.rawLeads[stream.id]?.[m] || 0;
    }

    const salesMarketing = Math.round((monthlyLeadsTotal * leadCostPerUnit + 15000) * 100) / 100;
    const generalAdmin = monthlyFixedGABase;
    const totalOpex = Math.round((salesMarketing + generalAdmin) * 100) / 100;
    const ebitda = Math.round((grossProfit - totalOpex) * 100) / 100;
    const ebitdaMarginPct = rev > 0 ? Math.round((ebitda / rev) * 1000) / 1000 : 0;

    operatingModel.push({
      revenue: rev,
      directMaterialsCOGS: materials,
      directLaborCOGS: labor,
      totalCOGS,
      grossProfit,
      grossMarginPct,
      salesMarketingOpex: salesMarketing,
      generalAdminOpex: generalAdmin,
      totalOpex,
      ebitda,
      ebitdaMarginPct,
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 6. WORKING CAPITAL (Sheet 7)
  // ─────────────────────────────────────────────────────────────
  const workingCapital: WorkingCapitalMonthOutput[] = [];
  const { debtorDays, creditorDays, inventoryDays } = inputs.wcDays;

  // Track cumulative project orders and revenue for WIP Asset
  let cumulativeOrders = inputs.initialBS.wip;
  let cumulativeProjectRev = 0;

  const initialNWC =
    inputs.initialBS.ar + inputs.initialBS.inventory + inputs.initialBS.wip - inputs.initialBS.ap;
  let prevNWC = initialNWC;

  for (let m = 0; m < periods; m++) {
    const rev = totalMonthlyRevenue[m];
    const matCost = operatingModel[m].directMaterialsCOGS;

    const ar = Math.round(rev * (debtorDays / 30) * 100) / 100;
    const inventory = Math.round(matCost * (inventoryDays / 30) * 100) / 100;

    cumulativeOrders += totalProjectOrders[m];
    cumulativeProjectRev += totalProjectRevenue[m];
    const wipAsset = Math.max(0, Math.round((cumulativeOrders - cumulativeProjectRev) * 100) / 100);

    const ap = Math.round(matCost * (creditorDays / 30) * 100) / 100;

    const totalNWC = Math.round((ar + inventory + wipAsset - ap) * 100) / 100;
    const deltaNWC = Math.round((totalNWC - prevNWC) * 100) / 100;

    workingCapital.push({
      ar,
      inventory,
      wipAsset,
      ap,
      totalNWC,
      deltaNWC,
    });

    prevNWC = totalNWC;
  }

  // ─────────────────────────────────────────────────────────────
  // 7. DEBT SCHEDULE (Sheet 8)
  // ─────────────────────────────────────────────────────────────
  const debtByFacility: Record<string, DebtFacilityMonthOutput[]> = {};
  const debtTotal: DebtTotalMonthOutput[] = [];

  for (const fac of inputs.debtFacilities) {
    const facOutputs: DebtFacilityMonthOutput[] = [];
    let currentOpening = fac.openingPrincipal;
    const monthlyPrincipalRate = fac.tenorMonths > 0 ? fac.openingPrincipal / fac.tenorMonths : 0;

    for (let m = 0; m < periods; m++) {
      const monthNum = m + 1;
      const drawdown = fac.drawdownMonth === monthNum ? fac.drawdownAmount : 0;
      const writeoff = fac.writeoffMonth === monthNum ? fac.writeoffAmount : 0;

      const principalRepayment =
        currentOpening > 0 ? Math.min(currentOpening, Math.round(monthlyPrincipalRate * 100) / 100) : 0;
      const closing = Math.max(0, Math.round((currentOpening + drawdown - principalRepayment - writeoff) * 100) / 100);
      const avgDebt = (currentOpening + closing) / 2;
      const interestExpense = Math.round(avgDebt * (fac.annualInterestRate / 12) * 100) / 100;

      facOutputs.push({
        openingBalance: currentOpening,
        drawdown,
        principalRepayment,
        writeoff,
        closingBalance: closing,
        interestExpense,
      });

      currentOpening = closing;
    }
    debtByFacility[fac.id] = facOutputs;
  }

  // Aggregate across all debt facilities
  for (let m = 0; m < periods; m++) {
    let tOpening = 0;
    let tDrawdown = 0;
    let tRepayment = 0;
    let tWriteoff = 0;
    let tClosing = 0;
    let tInterest = 0;

    for (const fac of inputs.debtFacilities) {
      const out = debtByFacility[fac.id][m];
      tOpening += out.openingBalance;
      tDrawdown += out.drawdown;
      tRepayment += out.principalRepayment;
      tWriteoff += out.writeoff;
      tClosing += out.closingBalance;
      tInterest += out.interestExpense;
    }

    debtTotal.push({
      totalOpening: Math.round(tOpening * 100) / 100,
      totalDrawdown: Math.round(tDrawdown * 100) / 100,
      totalRepayment: Math.round(tRepayment * 100) / 100,
      totalWriteoff: Math.round(tWriteoff * 100) / 100,
      totalClosing: Math.round(tClosing * 100) / 100,
      totalInterest: Math.round(tInterest * 100) / 100,
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 8. THREE STATEMENTS & BS SELF-BALANCE CHECK (Sheet 9)
  // ─────────────────────────────────────────────────────────────
  const threeStatements: ThreeStatementsMonthOutput[] = [];
  const taxRate = inputs.wcDays.taxRate;
  const depreciationMonthly = 8500; // Straight line fixed monthly D&A

  let currentCash = inputs.initialBS.cash;
  let currentPPE = inputs.initialBS.ppe;
  let currentRetainedEarnings = inputs.initialBS.retainedEarnings;
  let currentShareCapital = inputs.initialBS.shareCapital;

  for (let m = 0; m < periods; m++) {
    // 8a. P&L
    const op = operatingModel[m];
    const revenue = op.revenue;
    const cogs = op.totalCOGS;
    const grossProfit = op.grossProfit;
    const opex = op.totalOpex;
    const ebitda = op.ebitda;
    const depreciation = depreciationMonthly;
    const ebit = Math.round((ebitda - depreciation) * 100) / 100;
    const interestExpense = debtTotal[m].totalInterest;
    const ebt = Math.round((ebit - interestExpense) * 100) / 100;
    const incomeTax = ebt > 0 ? Math.round(ebt * taxRate * 100) / 100 : 0;
    const netIncome = Math.round((ebt - incomeTax) * 100) / 100;

    // 8b. Cash Flow Statement
    const deltaNWC = workingCapital[m].deltaNWC;
    const cashFromOps = Math.round((netIncome + depreciation - deltaNWC) * 100) / 100;

    const capex = inputs.monthlyCapex[m] || 6000;
    const cashFromInv = -capex;

    const drawdown = debtTotal[m].totalDrawdown;
    const principalRepay = debtTotal[m].totalRepayment;
    const cashFromFin = Math.round((drawdown - principalRepay) * 100) / 100;

    const netCashMovement = Math.round((cashFromOps + cashFromInv + cashFromFin) * 100) / 100;
    currentCash = Math.round((currentCash + netCashMovement) * 100) / 100;

    // 8c. Balance Sheet Assets
    const bsCash = currentCash;
    const bsAR = workingCapital[m].ar;
    const bsInventory = workingCapital[m].inventory;
    const bsWIP = workingCapital[m].wipAsset;

    currentPPE = Math.round((currentPPE + capex - depreciation) * 100) / 100;
    const bsPPE = currentPPE;
    const totalAssets = Math.round((bsCash + bsAR + bsInventory + bsWIP + bsPPE) * 100) / 100;

    // 8d. Balance Sheet Liabilities
    const bsAP = workingCapital[m].ap;
    const bsDebt = debtTotal[m].totalClosing;
    const totalLiabilities = Math.round((bsAP + bsDebt) * 100) / 100;

    // 8e. Balance Sheet Equity
    // Writeoff of debt credits capital reserve / equity
    const writeoff = debtTotal[m].totalWriteoff;
    currentShareCapital = Math.round((currentShareCapital + writeoff) * 100) / 100;
    currentRetainedEarnings = Math.round((currentRetainedEarnings + netIncome) * 100) / 100;

    const totalEquity = Math.round((currentShareCapital + currentRetainedEarnings) * 100) / 100;
    const totalLiabAndEquity = Math.round((totalLiabilities + totalEquity) * 100) / 100;

    const diff = Math.round((totalAssets - totalLiabAndEquity) * 100) / 100;
    const isBalanced = Math.abs(diff) < 0.05;

    threeStatements.push({
      revenue,
      cogs,
      grossProfit,
      opex,
      ebitda,
      depreciation,
      ebit,
      interestExpense,
      ebt,
      incomeTax,
      netIncome,
      cashFromOps,
      cashFromInv,
      cashFromFin,
      netCashMovement,
      endingCash: currentCash,
      bsCash,
      bsAR,
      bsInventory,
      bsWIP,
      bsPPE,
      totalAssets,
      bsAP,
      bsDebt,
      totalLiabilities,
      bsShareCapital: currentShareCapital,
      bsRetainedEarnings: currentRetainedEarnings,
      totalEquity,
      totalLiabAndEquity,
      balanceSheetCheckDiff: diff,
      isBalanced,
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 9. HIGH-LEVEL AGGREGATES & RATIOS (Year 1)
  // ─────────────────────────────────────────────────────────────
  const y1Slice = 12;
  const y1Rev = threeStatements.slice(0, y1Slice).reduce((acc, cur) => acc + cur.revenue, 0);
  const y1Recurring = totalRecurringRevenue.slice(0, y1Slice).reduce((acc, cur) => acc + cur, 0);
  const y1Project = totalProjectRevenue.slice(0, y1Slice).reduce((acc, cur) => acc + cur, 0);
  const y1Ebitda = threeStatements.slice(0, y1Slice).reduce((acc, cur) => acc + cur.ebitda, 0);
  const y1NetIncome = threeStatements.slice(0, y1Slice).reduce((acc, cur) => acc + cur.netIncome, 0);
  const y1GrossProfit = operatingModel.slice(0, y1Slice).reduce((acc, cur) => acc + cur.grossProfit, 0);

  const avgGrossMarginPct = y1Rev > 0 ? Math.round((y1GrossProfit / y1Rev) * 1000) / 10 : 0;
  const recurringPct = y1Rev > 0 ? Math.round((y1Recurring / y1Rev) * 1000) / 10 : 0;
  const endingCashY1 = threeStatements[y1Slice - 1]?.endingCash || 0;

  // Monthly burn calculation for cash runway
  const negativeNetCashFlows = threeStatements
    .slice(0, y1Slice)
    .map((s) => s.netCashMovement)
    .filter((n) => n < 0);
  const avgMonthlyBurn =
    negativeNetCashFlows.length > 0
      ? Math.abs(negativeNetCashFlows.reduce((a, b) => a + b, 0) / negativeNetCashFlows.length)
      : 0;

  const minRunwayMonths =
    avgMonthlyBurn > 0 ? Math.round((endingCashY1 / avgMonthlyBurn) * 10) / 10 : 36.0;

  let peakCapacityDeficit = 0;
  for (let m = 0; m < y1Slice; m++) {
    if (capacity[m].capacityGap < peakCapacityDeficit) {
      peakCapacityDeficit = capacity[m].capacityGap;
    }
  }

  return {
    months,
    recurringByStream,
    totalRecurringRevenue,
    pipelineByStream,
    totalProjectOrders,
    totalProjectRevenue,
    capacity,
    revenueSchedule: {
      streamNames,
      streamTypes,
      monthlyRevenueByStream,
      totalMonthlyRevenue,
    },
    operatingModel,
    workingCapital,
    debtByFacility,
    debtTotal,
    threeStatements,
    year1: {
      revenue: Math.round(y1Rev),
      recurringRev: Math.round(y1Recurring),
      recurringPct,
      projectRev: Math.round(y1Project),
      ebitda: Math.round(y1Ebitda),
      netIncome: Math.round(y1NetIncome),
      endingCash: Math.round(endingCashY1),
      minRunwayMonths,
      avgGrossMarginPct,
      peakCapacityDeficit: Math.abs(peakCapacityDeficit),
    },
  };
}

/**
 * 2D Sensitivity Matrix Generator:
 * Generates Year 1 EBITDA for combinations of Deal Conversion Delta vs Price Delta.
 */
export interface SensitivityPoint {
  conversionDeltaPct: number; // e.g. -0.20 to +0.20
  priceDeltaPct: number;      // e.g. -0.15 to +0.15
  year1Ebitda: number;
}

export function computeSensitivityMatrix(
  baseInputs: ModelInputs,
  conversionDeltas: number[] = [-0.2, -0.1, 0, 0.1, 0.2],
  priceDeltas: number[] = [-0.15, -0.075, 0, 0.075, 0.15]
): {
  conversionDeltas: number[];
  priceDeltas: number[];
  matrix: number[][]; // [convIdx][priceIdx]
} {
  const baseResult = computeFinancialModel(baseInputs);
  const baseEbitda = baseResult.year1.ebitda;

  // Elasticity multipliers
  const convElasticity = 1.35;
  const priceElasticity = 1.0;

  const matrix: number[][] = [];
  for (let r = 0; r < conversionDeltas.length; r++) {
    const row: number[] = [];
    const dConv = conversionDeltas[r];
    for (let c = 0; c < priceDeltas.length; c++) {
      const dPrice = priceDeltas[c];
      const adjustedEbitda = Math.round(
        baseEbitda * (1 + dConv * convElasticity) * (1 + dPrice * priceElasticity)
      );
      row.push(adjustedEbitda);
    }
    matrix.push(row);
  }

  return {
    conversionDeltas,
    priceDeltas,
    matrix,
  };
}
