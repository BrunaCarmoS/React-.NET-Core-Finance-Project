import React from "react";
import { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  portfolioValues: PortfolioGet[];
  onPortfolioDelete: (e: React.SyntheticEvent) => void;
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: Props) => {
  return (
    <div>
      <form onSubmit={onPortfolioDelete}>
        <ul>
          {portfolioValues.map((value) => (
            <li key={value.id}>
              {value.symbol}
              <button type="submit" value={value.symbol}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default ListPortfolio;