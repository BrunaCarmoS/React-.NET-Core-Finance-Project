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
    label: <div className="font-bold">Debt / Equity (Annual)</div>,
    render: (m: CompanyKeyMetrics) => formatRatio(m.totalDebtToEquityAnnual),
    subTitle: "Dívida total dividida pelo patrimônio líquido",
  },
  {
    label: "Long-Term Debt / Equity (Annual)",
    render: (m: CompanyKeyMetrics) =>
      formatRatio(m.longTermDebtToEquityAnnual),
    subTitle: "Dívida de longo prazo dividida pelo patrimônio líquido",
  },
  {
    label: "Current Ratio (Annual)",
    render: (m: CompanyKeyMetrics) => formatRatio(m.currentRatioAnnual),
    subTitle: "Capacidade de pagar dívidas de curto prazo",
  },
  {
    label: "Quick Ratio (Annual)",
    render: (m: CompanyKeyMetrics) => formatRatio(m.quickRatioAnnual),
    subTitle: "Liquidez imediata excluindo estoques",
  },
  {
    label: "Book Value Per Share (Annual)",
    render: (m: CompanyKeyMetrics) =>
      formatLargeMonetaryNumber(m.bookValuePerShareTTM),
    subTitle: "Valor patrimonial líquido por ação",
  },
  {
    label: "Tangible Book Value Per Share (Annual)",
    render: (m: CompanyKeyMetrics) =>
      formatLargeMonetaryNumber(m.tangibleBookValuePerShareAnnual),
    subTitle: "Valor patrimonial tangível por ação (exclui intangíveis)",
  },
  {
    label: <div className="font-bold">Debt / Total Assets (Annual)</div>,
    render: (m: CompanyKeyMetrics) =>
      formatRatio(m.totalDebtToTotalAssetAnnual),
    subTitle: "Percentual dos ativos financiados por dívida",
  },
];

const BalanceSheet = (props: Props) => {
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
            * Dados anuais — Finnhub plano gratuito
          </p>
          <RatioList config={config} data={metrics} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default BalanceSheet;