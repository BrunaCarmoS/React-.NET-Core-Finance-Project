import React, { useEffect, useState } from "react";
import { CompanyTenK } from "../../company";
import { getTenK } from "../../api";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinners/Spinner";

type Props = {
  ticker: string;
};

const TenKFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyTenK[] | null>(null);

  useEffect(() => {
    const fetchTenK = async () => {
      const value = await getTenK(ticker);
      setCompanyData(value);
    };
    fetchTenK();
  }, [ticker]);

  return (
    <div className="inline-flex rounded-md shadow-sm m-4" role="group">
      {companyData ? (
        companyData.slice(0, 5).map((tenK) => (
          <TenKFinderItem key={tenK.fillingDate} tenK={tenK} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TenKFinder;