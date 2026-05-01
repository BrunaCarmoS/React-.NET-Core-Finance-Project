import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CompanyKeyMetrics } from "../../company";
import { getKeyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinners/Spinner";
import {
  formatLargeNonMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(company.marketCapTTM),
    subTitle: "Valor total de todas as ações da empresa",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.currentRatioTTM),
    subTitle: "Capacidade de pagar dívidas de curto prazo",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => formatRatio(company.roeTTM),
    subTitle: "Lucro líquido dividido pelo patrimônio dos acionistas",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle: "Eficiência da empresa em usar seus ativos",
  },
  {
    label: "Free Cashflow Per Share",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.freeCashFlowPerShareTTM),
    subTitle: "Fluxo de caixa livre por ação",
  },
  {
    label: "Book Value Per Share",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.bookValuePerShareTTM),
    subTitle: "Valor patrimonial líquido por ação",
  },
  {
    label: "Dividend Yield",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.dividendYieldTTM),
    subTitle: "Quanto a empresa paga em dividendos em relação ao preço",
  },
  {
    label: "CapEx Per Share",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.capexPerShareTTM),
    subTitle: "Investimento em ativos físicos por ação",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) =>
      company.grahamNumberTTM ? formatRatio(company.grahamNumberTTM) : "N/A",
    subTitle: "Teto de preço para investidor defensivo (não disponível no Finnhub)",
  },
  {
    label: "PE Ratio",
    render: (company: CompanyKeyMetrics) => formatRatio(company.peRatioTTM),
    subTitle: "Preço da ação dividido pelo lucro por ação",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      // getKeyMetrics agora retorna CompanyKeyMetrics | null diretamente
      const value = await getKeyMetrics(ticker);
      setCompanyData(value);
    };
    fetchMetrics();
  }, [ticker]);

  return (
    <>
      {companyData ? (
        <RatioList config={tableConfig} data={companyData} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyProfile;