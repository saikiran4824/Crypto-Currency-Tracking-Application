import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { StorageContext } from "../context/StorageContext";
import { CryptoContext } from "./../context/CryptoContext";
import { Link } from "react-router-dom";

const SaveBtn = ({ data }) => {
  const { saveCoin, allCoins, removeCoin } = useContext(StorageContext);

  const handleClick = (e) => {
    e.preventDefault();
    saveCoin(data.id);

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
        className={`w-[1.5rem] ml-1.5 
                      ${allCoins.includes(data.id) ? "fill-cyan" : ""}
                       hover:fill-cyan`}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="cyan"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG content */}
      </svg>
    </button>
  );
};

const Saved = () => {
  const { savedData, resetSavedResult } = useContext(StorageContext);
  let { currency } = useContext(CryptoContext);

  return (
    <section className="w-full md:w-[80%] h-full flex flex-col mx-4 mt-16 mb-24 relative">
      <div className="w-full min-h-[60vh] py-4 border border-gray-100 rounded">
        {savedData ? (
          <div className="hidden lg:block">
            <table className="w-full table-auto">
              <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100 ">
                <tr>
                  <th className="py-1">asset</th>
                  <th className="py-1">name</th>
                  <th className="py-1">price</th>
                  <th className="py-1">total volume</th>
                  <th className="py-1">market cap change</th>
                  <th className="py-1">1H</th>
                  <th className="py-1">24H</th>
                  <th className="py-1">7D</th>
                </tr>
              </thead>
              <tbody>
                {savedData.map((data) => (
                  <tr
                    key={data.id}
                    className="text-center text-base border-b border-gray-100  hover:bg-gray-200"
                  >
                    <td className="py-4 uppercase flex items-center">
                      <SaveBtn data={data} />
                      <img
                        src={data.image}
                        alt={data.id}
                        className="w-[1.2rem] h-[1.2rem] mx-1.5"
                      />
                      <span className="cursor-pointer">
                        <Link to={`${data.id}`} className="cursor-pointer">
                          {data.symbol}
                        </Link>
                      </span>
                    </td>
                    <td className="py-4 cursor-pointer">
                      <Link to={`${data.id}`} className="cursor-pointer">
                        {data.name}
                      </Link>
                    </td>
                    <td className="py-4">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                      }).format(data.current_price)}
                    </td>
                    <td className="py-4">{data.total_volume}</td>
                    <td
                      className={
                        data.market_cap_change_percentage_24h < 0
                          ? "py-4 text-red"
                          : "py-4 text-green"
                      }
                    >
                      {Number(data.market_cap_change_percentage_24h).toFixed(2)}%
                    </td>
                    <td
                      className={
                        data.price_change_percentage_1h_in_currency < 0
                          ? "py-4 text-red"
                          : "py-4 text-green"
                      }
                    >
                      {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}%
                    </td>
                    <td
                      className={
                        data.price_change_percentage_24h_in_currency < 0
                          ? "py-4 text-red"
                          : "py-4 text-green"
                      }
                    >
                      {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}%
                    </td>
                    <td
                      className={
                        data.price_change_percentage_7d_in_currency < 0
                          ? "py-4 text-red"
                          : "py-4 text-green"
                      }
                    >
                      {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1 className="min-h-[60vh] text-lg text-cyan flex items-center justify-center">
            There is no data to display!
          </h1>
        )}

        {/* Mobile View - Cards */}
        <div className="lg:hidden ">
          {savedData ? (
            savedData.map((data) => (
              <div
                key={data.id}
                className=" shadow-lg rounded-lg mb-4 p-4 flex flex-col items-center"
              >
                <div className="flex items-center mb-2">
                  <SaveBtn data={data} />
                  <img
                    src={data.image}
                    alt={data.id}
                    className="w-[1.5rem] h-[1.5rem] mx-2"
                  />
                  <Link
                    to={`${data.id}`}
                    className="text-sm text-blue-600 font-semibold"
                  >
                    {data.symbol}
                  </Link>
                </div>
                <h2 className="text-lg font-semibold mb-2">{data.name}</h2>
                <div className="flex justify-between w-full text-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">Price</span>
                    <span>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                      }).format(data.current_price)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">Market Cap Change</span>
                    <span
                      className={
                        data.market_cap_change_percentage_24h < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {Number(data.market_cap_change_percentage_24h).toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Price change for mobile view */}
                <div className="flex justify-between w-full mt-4 text-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">1H</span>
                    <span
                      className={
                        data.price_change_percentage_1h_in_currency < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">24H</span>
                    <span
                      className={
                        data.price_change_percentage_24h_in_currency < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">7D</span>
                    <span
                      className={
                        data.price_change_percentage_7d_in_currency < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center text-lg text-cyan">
              No saved data to show
            </h1>
          )}
        </div>

        
      </div>
    </section>
  );
};

export default Saved;
