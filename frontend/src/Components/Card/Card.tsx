// ─── Card.tsx ─────────────────────────────────────────────────────────────────
import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";

interface CardProps {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

export const Card: React.FC<CardProps> = ({ id, searchResult, onPortfolioCreate }) => {
  return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={id}
      id={id}
    >
      <Link
        to={`/company/${searchResult.symbol}/company-profile`}
        className="font-bold text-center text-veryDarkViolet md:text-left"
      >
        {/* Finnhub usa description como nome da empresa */}
        {searchResult.name || searchResult.description} ({searchResult.symbol})
      </Link>

      {/* Finnhub não retorna currency/exchange no search – exibimos o type */}
      <p className="text-veryDarkBlue">{searchResult.type || "—"}</p>

      <p className="font-bold text-veryDarkBlue">
        {searchResult.displaySymbol}
      </p>

      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  );
};

export default Card;