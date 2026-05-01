import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinners/Spinner";
import CompFinder from "../../Components/CompFinder/CompFinder";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";

interface Props {}

const CompanyPage = (props: Props) => {
  const { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile | null>(null);

  useEffect(() => {
    if (!ticker) return;
    const init = async () => {
      // getCompanyProfile agora retorna CompanyProfile | null diretamente
      const result = await getCompanyProfile(ticker);
      setCompany(result);
    };
    init();
  }, [ticker]);

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company.companyName} />
            <Tile title="Price" subTitle={"$" + company.price.toFixed(2)} />
            {/* Finnhub não fornece DCF no plano gratuito */}
            <Tile title="DCF" subTitle={company.dcf ? "$" + company.dcf.toFixed(2) : "N/A"} />
            <Tile title="Sector" subTitle={company.sector || "—"} />
            {company.logo && (
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 flex items-center">
                <img
                  src={company.logo}
                  alt={company.companyName}
                  className="h-16 rounded shadow"
                />
              </div>
            )}
            <CompFinder ticker={company.symbol} />
            <TenKFinder ticker={company.symbol} />
            <p className="bg-white shadow rounded text-medium font-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyPage;