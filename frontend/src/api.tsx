import axios from "axios";
import {
  CompanySearch,
  CompanyProfile,
  CompanyKeyMetrics,
} from "./company";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1";

const auth = () => {
  if (!API_KEY) console.error("REACT_APP_API_KEY não definida!");
  return `token=${API_KEY}`;
};

const get = async <T>(path: string): Promise<T | null> => {
  try {
    const { data } = await axios.get<T>(`${BASE_URL}${path}&${auth()}`);
    return data;
  } catch (err) {
    console.error(`Finnhub error [${path}]:`, err);
    return null;
  }
};

// ─── Search ───────────────────────────────────────────────────────────────────
export const searchCompanies = async (query: string): Promise<CompanySearch[]> => {
  const data = await get<{ result: any[] }>(`/search?q=${query}`);
  if (!data?.result) return [];

  return data.result.map((item) => ({
    description: item.description ?? "",
    displaySymbol: item.displaySymbol ?? "",
    symbol: item.symbol ?? "",
    type: item.type ?? "",
    name: item.description ?? item.symbol,
    currency: "",
    exchangeShortName: "",
    stockExchange: item.type ?? "",
  }));
};

// ─── Company Profile ──────────────────────────────────────────────────────────
export const getCompanyProfile = async (symbol: string): Promise<CompanyProfile | null> => {
  const [profile, quote] = await Promise.all([
    get<any>(`/stock/profile2?symbol=${symbol}`),
    get<any>(`/quote?symbol=${symbol}`),
  ]);

  if (!profile?.name) return null;

  return {
    name: profile.name,
    ticker: profile.ticker ?? symbol,
    exchange: profile.exchange ?? "",
    ipo: profile.ipo ?? "",
    marketCapitalization: profile.marketCapitalization ?? 0,
    logo: profile.logo ?? "",
    weburl: profile.weburl ?? "",
    currency: profile.currency ?? "",
    country: profile.country ?? "",
    industry: profile.finnhubIndustry ?? "",
    // aliases para CompanyPage
    companyName: profile.name,
    symbol: profile.ticker ?? symbol,
    price: quote?.c ?? 0,
    dcf: 0,
    sector: profile.finnhubIndustry ?? "",
    description: profile.weburl
      ? `Website: ${profile.weburl}`
      : "Sem descrição disponível",
  };
};

// ─── Key Metrics (único endpoint gratuito com dados financeiros) ───────────────
// Usado por: CompanyProfile, IncomeStatement, BalanceSheet e CashflowStatement
export const getKeyMetrics = async (symbol: string): Promise<CompanyKeyMetrics | null> => {
  const data = await get<{ metric: any }>(`/stock/metric?symbol=${symbol}&metric=all`);
  if (!data?.metric) return null;

  const m = data.metric;

  return {
    // --- Valuation / CompanyProfile ---
    marketCapTTM: m.marketCapitalization ?? 0,
    currentRatioTTM: m.currentRatioTTM ?? m.currentRatioAnnual ?? 0,
    roeTTM: m.roeTTM ?? m.roeRfy ?? 0,
    returnOnTangibleAssetsTTM: m.roaTTM ?? m.roaRfy ?? 0,
    freeCashFlowPerShareTTM: m.freeCashFlowPerShareTTM ?? 0,
    bookValuePerShareTTM: m.bookValuePerShareAnnual ?? 0,
    dividendYieldTTM: m.dividendYieldIndicatedAnnual ?? 0,
    capexPerShareTTM: m.capitalExpenditureAnnual ?? 0,
    grahamNumberTTM: 0, // não disponível no Finnhub
    peRatioTTM: m.peNormalizedAnnual ?? m.peTTM ?? 0,

    // --- Income Statement ---
    epsTTM: m.epsTTM ?? 0,
    epsGrowthTTMYoy: m.epsGrowthTTMYoy ?? 0,
    revenuePerShareTTM: m.revenuePerShareTTM ?? 0,
    revenueGrowthTTMYoy: m.revenueGrowthTTMYoy ?? 0,
    grossMarginTTM: m.grossMarginTTM ?? 0,
    operatingMarginTTM: m.operatingMarginTTM ?? 0,
    netProfitMarginTTM: m.netProfitMarginTTM ?? 0,
    ebitdaPerShareTTM: m.ebitdaPerShareTTM ?? 0,

    // --- Balance Sheet ---
    totalDebtToEquityAnnual: m.totalDebtToEquityAnnual ?? 0,
    longTermDebtToEquityAnnual: m.longTermDebtToEquityAnnual ?? 0,
    currentRatioAnnual: m.currentRatioAnnual ?? 0,
    quickRatioAnnual: m.quickRatioAnnual ?? 0,
    tangibleBookValuePerShareAnnual: m.tangibleBookValuePerShareAnnual ?? 0,
    totalDebtToTotalAssetAnnual: m.totalDebtToTotalAssetAnnual ?? 0,

    // --- Cash Flow ---
    freeCashFlowTTM: m.freeCashFlowTTM ?? 0,
    freeCashFlowYield: m.freeCashFlowYieldTTM ?? 0,
    cashFlowPerShareTTM: m.cashFlowPerShareTTM ?? 0,
    cashFlowPerShareGrowthTTMYoy: m.cashFlowPerShareGrowthTTMYoy ?? 0,
    capexToSalesAnnual: m.capexToSalesAnnual ?? 0,
    capexToOperatingCashFlowAnnual: m.capexToOperatingCashFlowAnnual ?? 0,
  };
};