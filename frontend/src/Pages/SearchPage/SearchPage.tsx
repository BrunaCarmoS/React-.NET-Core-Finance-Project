import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { PortfolioGet } from "../../Models/Portfolio";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "../../Services/PortfolioService";

const SearchPage = () => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[]>([]);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const result = await portfolioGetAPI();
      if (result?.data) setPortfolioValues(result.data);
    };
    fetchPortfolio();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPortfolioCreate = async (e: any) => {
    e.preventDefault();
    const symbol = e.target[0].value;
    if (!symbol) return;

    const exists = portfolioValues.find((v) => v.symbol === symbol);
    if (exists) return;

    await portfolioAddAPI(symbol);
    const updated = await portfolioGetAPI();
    if (updated?.data) setPortfolioValues(updated.data);
  };

  const onPortfolioDelete = async (e: any) => {
    e.preventDefault();
    const symbol = e.target[0].value;

    await portfolioDeleteAPI(symbol);
    const updated = await portfolioGetAPI();
    if (updated?.data) setPortfolioValues(updated.data);
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