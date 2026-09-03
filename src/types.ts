export enum ScenarioType {
  BASE = 1,
  UPSIDE = 2,
  DOWNSIDE = 3,
}

export type SheetTabId =
  | 'dashboard'
  | 'control'
  | 'recurring'
  | 'pipeline'
  | 'capacity'
  | 'revenue'
  | 'operating'
  | 'working_capital'
  | 'debt'
  | 'three_statements'
  | 'sensitivity';

export interface RecurringStreamAssumption {
  id: string;
  name: string;
  annualChurn: number; // e.g. 0.12 (12%)
  renewalRate: number; // e.g. 0.85 (85%)
  annualArpu: number;  // e.g. 4800 ($)
  initialBase: number; // initial opening contracts count
}

export interface PipelineStreamAssumption {
  id: string;
  name: string;
  leadToOppBase: number;
  leadToOppUpside: number;
  leadToOppDownside: number;
  quoteToOrderBase: number;
  quoteToOrderUpside: number;
  quoteToOrderDownside: number;
  lagMonths: number;
  avgDealSize: number;
}

export interface WIPRealizationCurve {
  m0: number; // e.g. 0.20
  m1: number; // e.g. 0.40
  m2: number; // e.g. 0.30
  m3: number; // e.g. 0.10
}

export interface LaborEffortStandard {
  qualifierHoursPerOpp: number; // e.g. 4.5 hrs
  identifierHoursPerOrder: number; // e.g. 18.0 hrs
  monthlyStdHours: number; // 160 hrs
  productiveUtilization: number; // 0.85 (85%)
}

export interface WorkingCapitalDays {
  debtorDays: number;   // DSO e.g. 60
  creditorDays: number; // DPO e.g. 45
  inventoryDays: number;// DIO e.g. 30
  taxRate: number;      // 0.25 (25%)
}

export interface DebtFacility {
  id: string;
  name: string;
  openingPrincipal: number;
  annualInterestRate: number; // e.g. 0.065
  tenorMonths: number;       // e.g. 36
  drawdownMonth: number;     // 0 = none, 1..N
  drawdownAmount: number;
  writeoffMonth: number;     // 0 = none, 1..N
  writeoffAmount: number;
}

export interface CostDrivers {
  directMaterialsPct: number;    // 0.35 (35%)
  monthlySalaryPerFTE: number;   // $5,500
  monthlyFixedGABase: number;    // $45,000
  leadCostPerUnit: number;       // $45
}

export interface InitialBalanceSheet {
  cash: number;
  ar: number;
  inventory: number;
  wip: number;
  ppe: number;
  ap: number;
  debt: number;
  shareCapital: number;
  retainedEarnings: number;
}

export interface ModelInputs {
  activeScenario: ScenarioType;
  forecastStartDate: string; // '2027-01-01'
  forecastPeriods: number;   // 24
  recurringStreams: RecurringStreamAssumption[];
  pipelineStreams: PipelineStreamAssumption[];
  wipCurve: WIPRealizationCurve;
  laborStandards: LaborEffortStandard;
  wcDays: WorkingCapitalDays;
  debtFacilities: DebtFacility[];
  costDrivers: CostDrivers;
  rawLeads: Record<string, number[]>; // streamId -> number[] of length forecastPeriods
  activeAvailableFTE: number[];       // number[] of length forecastPeriods
  monthlyCapex: number[];             // number[] of length forecastPeriods
  initialBS: InitialBalanceSheet;
}

// ── Computed Output Interfaces ──

export interface RecurringMonthOutput {
  openingBase: number;
  churnedUnits: number;
  renewedUnits: number;
  closingBase: number;
  monthlyRevenue: number;
}

export interface PipelineMonthOutput {
  rawLeads: number;
  qualifiedOpps: number;
  wonOrdersCount: number;
  contractOrderValue: number;
  realizedRevenue: number;
}

export interface CapacityMonthOutput {
  qualifierHours: number;
  identifierHours: number;
  requiredQualifierFTE: number;
  requiredIdentifierFTE: number;
  totalRequiredFTE: number;
  availableFTE: number;
  capacityGap: number; // available - required. Negative means shortage/overload
}

export interface OperatingModelMonthOutput {
  revenue: number;
  directMaterialsCOGS: number;
  directLaborCOGS: number;
  totalCOGS: number;
  grossProfit: number;
  grossMarginPct: number;
  salesMarketingOpex: number;
  generalAdminOpex: number;
  totalOpex: number;
  ebitda: number;
  ebitdaMarginPct: number;
}

export interface WorkingCapitalMonthOutput {
  ar: number;
  inventory: number;
  wipAsset: number;
  ap: number;
  totalNWC: number;
  deltaNWC: number; // NWC_t - NWC_{t-1}
}

export interface DebtFacilityMonthOutput {
  openingBalance: number;
  drawdown: number;
  principalRepayment: number;
  writeoff: number;
  closingBalance: number;
  interestExpense: number;
}

export interface DebtTotalMonthOutput {
  totalOpening: number;
  totalDrawdown: number;
  totalRepayment: number;
  totalWriteoff: number;
  totalClosing: number;
  totalInterest: number;
}

export interface ThreeStatementsMonthOutput {
  // P&L
  revenue: number;
  cogs: number;
  grossProfit: number;
  opex: number;
  ebitda: number;
  depreciation: number;
  ebit: number;
  interestExpense: number;
  ebt: number;
  incomeTax: number;
  netIncome: number;

  // CFS
  cashFromOps: number;
  cashFromInv: number;
  cashFromFin: number;
  netCashMovement: number;
  endingCash: number;

  // Balance Sheet
  bsCash: number;
  bsAR: number;
  bsInventory: number;
  bsWIP: number;
  bsPPE: number;
  totalAssets: number;

  bsAP: number;
  bsDebt: number;
  totalLiabilities: number;

  bsShareCapital: number;
  bsRetainedEarnings: number;
  totalEquity: number;

  totalLiabAndEquity: number;
  balanceSheetCheckDiff: number; // Assets - (Liab + Equity)
  isBalanced: boolean;
}

export interface ModelCalculatedResults {
  months: string[]; // YYYY-MM
  recurringByStream: Record<string, RecurringMonthOutput[]>;
  totalRecurringRevenue: number[];
  pipelineByStream: Record<string, PipelineMonthOutput[]>;
  totalProjectOrders: number[];
  totalProjectRevenue: number[];
  capacity: CapacityMonthOutput[];
  revenueSchedule: {
    streamNames: string[];
    streamTypes: ('Recurring' | 'Project')[];
    monthlyRevenueByStream: number[][]; // [streamIndex][monthIndex]
    totalMonthlyRevenue: number[];
  };
  operatingModel: OperatingModelMonthOutput[];
  workingCapital: WorkingCapitalMonthOutput[];
  debtByFacility: Record<string, DebtFacilityMonthOutput[]>;
  debtTotal: DebtTotalMonthOutput[];
  threeStatements: ThreeStatementsMonthOutput[];
  
  // High-level aggregates
  year1: {
    revenue: number;
    recurringRev: number;
    recurringPct: number;
    projectRev: number;
    ebitda: number;
    netIncome: number;
    endingCash: number;
    minRunwayMonths: number;
    avgGrossMarginPct: number;
    peakCapacityDeficit: number;
  };
}
