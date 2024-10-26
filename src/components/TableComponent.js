import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CryptoContext } from "./../context/CryptoContext";
import Pagination from "./Pagination";
import { StorageContext } from "./../context/StorageContext";

const SaveBtn = ({ data }) => {
  const { saveCoin, allCoins, removeCoin } = useContext(StorageContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (allCoins.includes(data.id)) {
      removeCoin(data.id);
    } else {
      saveCoin(data.id);
    }
  };

  return (
    <button
      className="outline-0 border-0 bg-none cursor-pointer"
      onClick={(e) => handleClick(e)}
    >
      <svg
        className={`w-[1.5rem] ml-1.5 ${
          allCoins.includes(data.id) ? "fill-cyan" : "fill-gray-100"
        } hover:fill-cyan`}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="cyan"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG Path */}
      </svg>
    </button>
  );
};

const formatNumber = (num) => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  } else {
    return num;
  }
};

const TableComponent = () => {
  const { cryptoData, currency, error } = useContext(CryptoContext);

  return (
    <>
      <div className="flex flex-col mt-9 border border-gray-100 rounded">
        {cryptoData ? (
          <table className="w-full table-auto">
            <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
              <tr>
                <th className="py-1">asset</th>
                <th className="py-1">name</th>
                <th className="py-1">price</th>
                <th className="py-1 lg:table-cell hidden">total volume</th>
                <th className="py-1 lg:table-cell hidden">market cap change</th>
                <th className="py-1 lg:table-cell hidden">1H</th>
                <th className="py-1 lg:table-cell hidden">24H</th>
                <th className="py-1 lg:table-cell hidden">7D</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((data) => (
                <tr
                  key={data.id}
                  className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
                >
                  <td className="py-4 flex items-center uppercase">
                    <SaveBtn data={data} />
                    <img
                      className="w-[1.2rem] h-[1.2rem] mx-1.5"
                      src={data.image}
                      alt={data.name}
                    />
                    <span>
                      <Link to={`/${data.id}`} className="cursor-pointer">
                        {data.symbol}
                      </Link>
                    </span>
                  </td>
                  <td className="py-4">
                    <Link to={`/${data.id}`} className="cursor-pointer">
                      {data.name}
                    </Link>
                  </td>
                  <td className="py-4">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                    }).format(data.current_price)}
                  </td>
                  <td className="py-4 lg:table-cell hidden">
                    {formatNumber(data.total_volume)}
                  </td>
                  <td className="py-4 lg:table-cell hidden">
                    {data.market_cap_change_percentage_24h}%
                  </td>
                  <td
                    className={`py-4 ${
                      data.price_change_percentage_1h_in_currency > 0
                        ? "text-green"
                        : "text-red"
                    } lg:table-cell hidden`}
                  >
                    {data.price_change_percentage_1h_in_currency.toFixed(2)}
                  </td>
                  <td
                    className={`py-4 ${
                      data.price_change_percentage_24h_in_currency > 0
                        ? "text-green"
                        : "text-red"
                    } lg:table-cell hidden`}
                  >
                    {data.price_change_percentage_24h_in_currency.toFixed(2)}
                  </td>
                  <td
                    className={`py-4 ${
                      data.price_change_percentage_7d_in_currency > 0
                        ? "text-green"
                        : "text-red"
                    } lg:table-cell hidden`}
                  >
                    {data.price_change_percentage_7d_in_currency.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : !error.data && !error.search ? (
          <div className="w-full min-h-[50vh] flex justify-center items-center">
            <div
              className="w-8 h-8 border-4 border-solid border-cyan rounded-full border-b-gray-200 animate-spin"
              role="status"
            />
            <span className="text-base ml-2">please wait...</span>
          </div>
        ) : (
          <h1 className="min-h-[60vh] text-lg text-red flex items-center justify-center ">
            {error.data || error.search || "Something unexpected happened!"}
          </h1>
        )}
      </div>
      <div className="flex items-center justify-between mt-4 capitalize h-[2rem]">
        <span>
          Data provided by{" "}
          <a
            className="text-cyan"
            href="http://www.coingecko.com"
            rel="noreferrer"
            target="_blank"
          >
            CoinGecko
          </a>
        </span>
        <Pagination />
      </div>
    </>
  );
};

export default TableComponent;
