import React from "react";
import { useGetExchangesQuery } from "../services/cryptoApi";

const Exchanges = () => {
  const { data } = useGetExchangesQuery();
  console.log(data);

  return <div className="exchanges"></div>;
};

export default Exchanges;
