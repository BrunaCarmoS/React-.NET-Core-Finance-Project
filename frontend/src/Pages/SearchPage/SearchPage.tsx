import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const value = e.target[0].value;

    if (!value) return;

    const exists = portfolioValues.find((v) => v === value);
    if (exists) return;

    setPortfolioValues([...portfolioValues, value]);
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const value = e.target[0].value;

    const updated = portfolioValues.filter((v) => v !== value);
    setPortfolioValues(updated);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const result = await searchCompanies(search);

    if (Array.isArray(result)) {
      setSearchResult(result);
      setServerError(null);
    } else {
      setServerError("Erro ao buscar empresas");
      setSearchResult([]);
    }
  };

  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />

      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />

      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />

      {serverError && <div>Unable to connect to API</div>}
    </>
  );
};

export default SearchPage;