import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getKeyMetrics } from "../../api";
import { CompanyKeyMetrics } from "../../company";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinners/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";

type Props = {};

const configs = [
  {
    label: "EPS (TTM)",
    render: (m: CompanyKeyMetrics) => formatRatio(m.epsTTM),
    subTitle: "Lucro por ação nos últimos 12 meses",
  },
  {
    label: "EPS Growth YoY (TTM)",
    render: (m: CompanyKeyMetrics) => formatRatio(m.epsGrowthTTMYoy) + "%",
    subTitle: "Crescimento do lucro por ação ano a ano",
  },
  {
    label: "Revenue Per Share (TTM)",
    render: (m: CompanyKeyMetrics) =>
      formatLargeMonetaryNumber(m.revenuePerShareTTM),
    subTitle: "Receita por ação nos últimos 12 meses",
  },
  {
    label: "Revenue Growth YoY (TTM)",
    render: (m: CompanyKeyMetrics) => formatRatio(m.revenueGrowthTTMYoy) + "%",
    subTitle: "Crescimento da receita ano a ano",
  },
  {
    label: "Gross Margin (TTM)",
    render: (m: CompanyKeyMetrics) => formatRatio(m.grossMarginTTM) + "%",
    subTitle: "Margem bruta nos últimos 12 meses",
  },
  {
    label: "Operating Margin (TTM)",
    render: (m: CompanyKeyMetrics) => formatRatio(m.operatingMarginTTM) + "%",
    subTitle: "Margem operacional nos últimos 12 meses",
  },
  {
    label: "Net Profit Margin (TTM)",
    render: (m: CompanyKeyMetrics) => formatRatio(m.netProfitMarginTTM) + "%",
    subTitle: "Margem líquida nos últimos 12 meses",
  },
  {
    label: "EBITDA Per Share (TTM)",
    render: (m: CompanyKeyMetrics) =>
      formatLargeMonetaryNumber(m.ebitdaPerShareTTM),
    subTitle: "EBITDA por ação nos últimos 12 meses",
  },
];

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [metrics, setMetrics] = useState<CompanyKeyMetrics | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getKeyMetrics(ticker!);
      setMetrics(result);
    };
    fetchData();
  }, [ticker]);

  return (
    <>
      {metrics ? (
        <>
          <p className="text-xs text-gray-400 ml-4 mt-2 w-full">
            * Dados TTM (Trailing Twelve Months) — Finnhub plano gratuito
          </p>
          <RatioList config={configs} data={metrics} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default IncomeStatement;