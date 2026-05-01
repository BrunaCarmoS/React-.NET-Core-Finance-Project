// ─── Search ───────────────────────────────────────────────────────────────────
export interface CompanySearch {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
  name: string;
  currency: string;
  exchangeShortName: string;
  stockExchange: string;
}

// ─── Company Profile ──────────────────────────────────────────────────────────
export interface CompanyProfile {
  name: string;
  ticker: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  logo: string;
  weburl: string;
  currency: string;
  country: string;
  industry: string;
  // aliases para CompanyPage
  companyName: string;
  symbol: string;
  price: number;
  dcf: number;
  sector: string;
  description: string;
}

// ─── Key Metrics ──────────────────────────────────────────────────────────────
export interface CompanyKeyMetrics {
  // Valuation / CompanyProfile
  marketCapTTM: number;
  currentRatioTTM: number;
  roeTTM: number;
  returnOnTangibleAssetsTTM: number;
  freeCashFlowPerShareTTM: number;
  bookValuePerShareTTM: number;
  dividendYieldTTM: number;
  capexPerShareTTM: number;
  grahamNumberTTM: number;
  peRatioTTM: number;
  // Income Statement
  epsTTM: number;
  epsGrowthTTMYoy: number;
  revenuePerShareTTM: number;
  revenueGrowthTTMYoy: number;
  grossMarginTTM: number;
  operatingMarginTTM: number;
  netProfitMarginTTM: number;
  ebitdaPerShareTTM: number;
  // Balance Sheet
  totalDebtToEquityAnnual: number;
  longTermDebtToEquityAnnual: number;
  currentRatioAnnual: number;
  quickRatioAnnual: number;
  tangibleBookValuePerShareAnnual: number;
  totalDebtToTotalAssetAnnual: number;
  // Cash Flow
  freeCashFlowTTM: number;
  freeCashFlowYield: number;
  cashFlowPerShareTTM: number;
  cashFlowPerShareGrowthTTMYoy: number;
  capexToSalesAnnual: number;
  capexToOperatingCashFlowAnnual: number;
}

// ─── Ten-K Filing ─────────────────────────────────────────────────────────────
export interface CompanyTenK {
  symbol: string;
  fillingDate: string;  // mantido igual ao original para não quebrar TenKFinderItem
  finalLink: string;    // mantido igual ao original
  form: string;
  reportUrl: string;
}