import React, { useEffect, useState } from "react";
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

const config = [
  {
    label: <div className="font-bold">Free Cash Flow (TTM)</div>,
    render: (m: CompanyKeyMetrics) => formatLargeMonetaryNumber(m.freeCashFlowTTM),
    subTitle: "Fluxo de caixa livre nos últimos 12 meses",
  },
  {
    label: "Free Cash Flow Yield (TTM)",
    render: (m: CompanyKeyMetrics) => formatRatio(m.freeCashFlowYield) + "%",
    subTitle: "FCF dividido pelo valor de mercado",
  },
  {
    label: "Cash Flow Per Share (TTM)",
    render: (m: CompanyKeyMetrics) =>
      formatLargeMonetaryNumber(m.cashFlowPerShareTTM),
    subTitle: "Fluxo de caixa por ação nos últimos 12 meses",
  },
  {
    label: "Cash Flow Per Share Growth YoY (TTM)",
    render: (m: CompanyKeyMetrics) =>
      formatRatio(m.cashFlowPerShareGrowthTTMYoy) + "%",
    subTitle: "Crescimento do fluxo de caixa por ação ano a ano",
  },
  {
    label: "Free Cash Flow Per Share (TTM)",
    render: (m: CompanyKeyMetrics) =>
      formatLargeMonetaryNumber(m.freeCashFlowPerShareTTM),
    subTitle: "FCF por ação nos últimos 12 meses",
  },
  {
    label: "CapEx / Sales (Annual)",
    render: (m: CompanyKeyMetrics) => formatRatio(m.capexToSalesAnnual) + "%",
    subTitle: "Percentual da receita gasto em capital",
  },
  {
    label: "CapEx / Operating Cash Flow (Annual)",
    render: (m: CompanyKeyMetrics) =>
      formatRatio(m.capexToOperatingCashFlowAnnual) + "%",
    subTitle: "Quanto do caixa operacional vai para reinvestimento",
  },
];

const CashflowStatement = (props: Props) => {
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
          <RatioList config={config} data={metrics} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CashflowStatement;