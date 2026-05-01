// ─── CardList.tsx ─────────────────────────────────────────────────────────────
import React, { SyntheticEvent, JSX } from "react";
import Card from "../Card/Card";
import { CompanySearch } from "../../company";
import { v4 as uuidv4 } from "uuid";

interface CardListProps {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

export const CardList: React.FC<CardListProps> = ({ searchResults, onPortfolioCreate }): JSX.Element => {
  return (
    <>
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <Card
            id={result.symbol}
            key={uuidv4()}
            searchResult={result}
            onPortfolioCreate={onPortfolioCreate}
          />
        ))
      ) : (
        <h1>No results!</h1>
      )}
    </>
  );
};

export default CardList;