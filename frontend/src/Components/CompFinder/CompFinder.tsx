import React, { useEffect, useState } from "react";
import CompFinderItem from "./CompFinderItem/CompFinderItem";
import { getCompData } from "../../api";
import Spinner from "../Spinners/Spinner";

type Props = {
  ticker: string;
};

const CompFinder = ({ ticker }: Props) => {
  // Finnhub /stock/peers retorna string[] diretamente
  const [peers, setPeers] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchPeers = async () => {
      const value = await getCompData(ticker);
      setPeers(value);
    };
    fetchPeers();
  }, [ticker]);

  return (
    <div className="inline-flex rounded-md shadow-sm m-4" role="group">
      {peers ? (
        peers.map((peerTicker) => (
          <CompFinderItem key={peerTicker} ticker={peerTicker} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CompFinder;