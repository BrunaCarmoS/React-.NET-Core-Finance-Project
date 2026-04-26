import axios from "axios";
import { CompanySearch } from "./company";

interface SearchResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  try {
    const response = await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return response.data;
  } catch (error: any) {
    if (error && error.message) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error has occurred.";
    }
  }
};