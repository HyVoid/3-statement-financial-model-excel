import { ModelInputs, ScenarioType } from '../types';

export const INITIAL_RECURRING_STREAMS = [
  { id: 'rec_p26', name: 'Project 26 Routine Compliance', annualChurn: 0.08, renewalRate: 0.90, annualArpu: 5200, initialBase: 120 },
  { id: 'rec_y1', name: 'Year-1 Extended Maintenance', annualChurn: 0.15, renewalRate: 0.82, annualArpu: 4800, initialBase: 95 },
  { id: 'rec_esl', name: 'ESL Rigging & Anchor Safety', annualChurn: 0.10, renewalRate: 0.88, annualArpu: 3600, initialBase: 140 },
  { id: 'rec_tf', name: 'Technical Files Certification', annualChurn: 0.06, renewalRate: 0.92, annualArpu: 2400, initialBase: 210 },
  { id: 'rec_rust', name: 'Periodic Rust Treatment Service', annualChurn: 0.12, renewalRate: 0.85, annualArpu: 6500, initialBase: 60 },
  { id: 'rec_tens', name: 'Lifeline Tensioners Recalibration', annualChurn: 0.14, renewalRate: 0.80, annualArpu: 4200, initialBase: 75 },
  { id: 'rec_att', name: 'Safety Attach/Upsell Retrofits', annualChurn: 0.18, renewalRate: 0.75, annualArpu: 1800, initialBase: 160 },
];

export const INITIAL_PIPELINE_STREAMS = [
  {
    id: 'pipe_abseil',
    name: 'Industrial Abseil Systems',
    leadToOppBase: 0.28,
    leadToOppUpside: 0.35,
    leadToOppDownside: 0.20,
    quoteToOrderBase: 0.32,
    quoteToOrderUpside: 0.40,
    quoteToOrderDownside: 0.24,
    lagMonths: 1,
    avgDealSize: 28000,
  },
  {
    id: 'pipe_hsafety',
    name: 'Height Safety Engineering',
    leadToOppBase: 0.30,
    leadToOppUpside: 0.38,
    leadToOppDownside: 0.22,
    quoteToOrderBase: 0.35,
    quoteToOrderUpside: 0.42,
    quoteToOrderDownside: 0.25,
    lagMonths: 1,
    avgDealSize: 35000,
  },
  {
    id: 'pipe_haccess',
    name: 'Building Height Access Infrastructure',
    leadToOppBase: 0.25,
    leadToOppUpside: 0.32,
    leadToOppDownside: 0.18,
    quoteToOrderBase: 0.28,
    quoteToOrderUpside: 0.35,
    quoteToOrderDownside: 0.20,
    lagMonths: 2,
    avgDealSize: 45000,
  },
  {
    id: 'pipe_blinds',
    name: 'Architectural Blinds & Facades',
    leadToOppBase: 0.35,
    leadToOppUpside: 0.42,
    leadToOppDownside: 0.26,
    quoteToOrderBase: 0.40,
    quoteToOrderUpside: 0.48,
    quoteToOrderDownside: 0.30,
    lagMonths: 1,
    avgDealSize: 18000,
  },
  {
    id: 'pipe_consult',
    name: 'Structural Safety Consultancy',
    leadToOppBase: 0.40,
    leadToOppUpside: 0.50,
    leadToOppDownside: 0.30,
    quoteToOrderBase: 0.45,
    quoteToOrderUpside: 0.55,
    quoteToOrderDownside: 0.32,
    lagMonths: 1,
    avgDealSize: 15000,
  },
  {
    id: 'pipe_int_sales',
    name: 'Direct Internal Commercial Sales',
    leadToOppBase: 0.45,
    leadToOppUpside: 0.55,
    leadToOppDownside: 0.35,
    quoteToOrderBase: 0.50,
    quoteToOrderUpside: 0.60,
    quoteToOrderDownside: 0.38,
    lagMonths: 1,
    avgDealSize: 22000,
  },
  {
    id: 'pipe_ext_sales',
    name: 'External Agency & Distributor Sales',
    leadToOppBase: 0.22,
    leadToOppUpside: 0.30,
    leadToOppDownside: 0.15,
    quoteToOrderBase: 0.25,
    quoteToOrderUpside: 0.32,
    quoteToOrderDownside: 0.18,
    lagMonths: 2,
    avgDealSize: 52000,
  },
];

// Generate 24 months of raw leads baseline for 7 streams
const generateBenchmarkRawLeads = (): Record<string, number[]> => {
  const basePatterns: Record<string, number[]> = {
    pipe_abseil:   [42, 45, 48, 52, 55, 58, 60, 62, 65, 68, 70, 72, 74, 76, 78, 80, 82, 85, 88, 90, 92, 95, 98, 100],
    pipe_hsafety:  [35, 38, 40, 42, 45, 48, 50, 52, 54, 56, 58, 60, 62, 64, 65, 68, 70, 72, 75, 78, 80, 82, 85, 88],
    pipe_haccess:  [22, 24, 25, 28, 30, 32, 34, 35, 36, 38, 40, 42, 43, 45, 46, 48, 50, 52, 54, 55, 56, 58, 60, 62],
    pipe_blinds:   [50, 52, 55, 58, 60, 64, 66, 68, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95, 98, 100, 102, 105, 108],
    pipe_consult:  [30, 32, 34, 35, 38, 40, 42, 44, 45, 48, 50, 52, 54, 55, 56, 58, 60, 62, 64, 65, 68, 70, 72, 75],
    pipe_int_sales:[28, 30, 32, 35, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 55, 58, 60, 62, 64, 65, 68, 70, 72, 75],
    pipe_ext_sales:[18, 20, 22, 24, 25, 26, 28, 30, 32, 34, 35, 36, 38, 40, 42, 44, 45, 46, 48, 50, 52, 54, 55, 58],
  };
  return basePatterns;
};

export const getDefaultModelInputs = (): ModelInputs => {
  const periods = 24;
  
  // Available FTE ramping smoothly from 14 to 26
  const activeAvailableFTE = [
    14.0, 14.5, 15.0, 15.5, 16.0, 16.5, 17.5, 18.0, 18.5, 19.5, 20.0, 21.0,
    21.5, 22.0, 22.5, 23.0, 23.5, 24.0, 24.5, 25.0, 25.5, 26.0, 26.5, 27.0,
  ];

  // Capex maintenance schedule ($5,000 to $12,000/mo)
  const monthlyCapex = [
    6000, 6000, 8000, 5000, 5000, 12000, 7000, 7000, 9000, 6000, 6000, 15000,
    7000, 7000, 8000, 6000, 6000, 10000, 8000, 8000, 9000, 7000, 7000, 14000,
  ];

  return {
    activeScenario: ScenarioType.BASE,
    forecastStartDate: '2027-01-01',
    forecastPeriods: periods,
    recurringStreams: JSON.parse(JSON.stringify(INITIAL_RECURRING_STREAMS)),
    pipelineStreams: JSON.parse(JSON.stringify(INITIAL_PIPELINE_STREAMS)),
    wipCurve: {
      m0: 0.20,
      m1: 0.40,
      m2: 0.30,
      m3: 0.10,
    },
    laborStandards: {
      qualifierHoursPerOpp: 4.5,
      identifierHoursPerOrder: 16.0,
      monthlyStdHours: 160,
      productiveUtilization: 0.85,
    },
    wcDays: {
      debtorDays: 60,
      creditorDays: 45,
      inventoryDays: 30,
      taxRate: 0.25,
    },
    debtFacilities: [
      {
        id: 'fac_a',
        name: 'Facility A: Commercial Senior Loan',
        openingPrincipal: 500000,
        annualInterestRate: 0.065,
        tenorMonths: 36,
        drawdownMonth: 0,
        drawdownAmount: 0,
        writeoffMonth: 0,
        writeoffAmount: 0,
      },
      {
        id: 'fac_b',
        name: 'Facility B: Shareholder Subordinated Loan',
        openingPrincipal: 250000,
        annualInterestRate: 0.040,
        tenorMonths: 48,
        drawdownMonth: 0,
        drawdownAmount: 0,
        writeoffMonth: 0,
        writeoffAmount: 0,
      },
      {
        id: 'fac_c',
        name: 'Facility C: Working Capital Revolver',
        openingPrincipal: 100000,
        annualInterestRate: 0.075,
        tenorMonths: 24,
        drawdownMonth: 0,
        drawdownAmount: 0,
        writeoffMonth: 0,
        writeoffAmount: 0,
      },
    ],
    costDrivers: {
      directMaterialsPct: 0.35,
      monthlySalaryPerFTE: 5500,
      monthlyFixedGABase: 45000,
      leadCostPerUnit: 45,
    },
    rawLeads: generateBenchmarkRawLeads(),
    activeAvailableFTE,
    monthlyCapex,
    initialBS: {
      cash: 380000,
      ar: 420000,
      inventory: 85000,
      wip: 165000,
      ppe: 350000,
      ap: 145000,
      debt: 850000,
      shareCapital: 200000,
      retainedEarnings: 205000,
    },
  };
};
