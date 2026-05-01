import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1";

const authParams = () => {
  if (!API_KEY) {
    console.error("API KEY not defined!");
  }
  return `token=${API_KEY}`;
};

export const searchCompanies = async (query: string) => {
  try {
    const { data } = await axios.get<{ result: any[] }>(
      `${BASE_URL}/search?q=${query}&${authParams()}`
    );

    return data.result ?? [];
  } catch (error) {
    console.log("Search error:", error);
    return [];
  }
};

export const getCompanyProfile = async (symbol: string) => {
  try {
    const { data } = await axios.get<any>(
      `${BASE_URL}/stock/profile2?symbol=${symbol}&${authParams()}`
    );

    return data ?? null;
  } catch (error) {
    console.log("Profile error:", error);
    return null;
  }
};

export const getKeyMetrics = async (symbol: string) => {
  try {
    const { data } = await axios.get<{ metric: any }>(
      `${BASE_URL}/stock/metric?symbol=${symbol}&metric=all&${authParams()}`
    );

    return data.metric ?? null;
  } catch (error) {
    console.log("Metrics error:", error);
    return null;
  }
};

export const getIncomeStatement = async (symbol: string) => {
  try {
    const { data } = await axios.get<{ data: any[] }>(
      `${BASE_URL}/stock/financials-reported?symbol=${symbol}&${authParams()}`
    );

    return (data.data ?? []).map((item) => ({
      date: item.endDate,
      income: item.report?.ic ?? null,
    }));
  } catch (error) {
    console.log("Income error:", error);
    return [];
  }
};

export const getBalanceSheet = async (symbol: string) => {
  try {
    const { data } = await axios.get<{ data: any[] }>(
      `${BASE_URL}/stock/financials-reported?symbol=${symbol}&${authParams()}`
    );
    
    return (data.data ?? []).map((item) => ({
      date: item.endDate,
      balance: item.report?.bs ?? null,
    }));
  } catch (error) {
    console.log("Balance error:", error);
    return [];
  }
};