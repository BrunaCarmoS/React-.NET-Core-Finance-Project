export interface FinnhubSearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface FinnhubCompanyProfile {
  name: string;
  ticker: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  logo: string;
  weburl: string;
}

export interface FinnhubMetrics {
  peNormalizedAnnual?: number;
  pbAnnual?: number;
  psAnnual?: number;
  dividendYieldIndicatedAnnual?: number;
}

export interface FinnhubFinancialReport {
  endDate: string;
  report: {
    ic?: any;
    bs?: any;
    cf?: any;
  };
}