/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import { CryptoContext } from "../context/CryptoContext";
import Chart from "./Chart";

const HighLowIndicator = ({ currentPrice, high, low }) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, high, low]);

  return (
    <>
      <span
        className="bg-red h-1.5 rounded-l-lg w-[50%]"
        style={{ width: `${100 - green}%` }}
      >
        &nbsp;
      </span>
      <span
        className="bg-green h-1.5 rounded-r-lg w-[50%]"
        style={{ width: `${green}%` }}
      >
        &nbsp;
      </span>
    </>
  );
};

const CryptoDetails = () => {
  let { coinId } = useParams();
  let navigate = useNavigate();
  let { getCoinData, coinData: data, currency } = useContext(CryptoContext);

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  const close = () => {
    navigate("..");
  };

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 w-full h-full bg-gray-200 bg-opacity-30 first-letter:
    backdrop-blur-sm flex items-center justify-center font-nunito overflow-y-auto
    "
      onClick={close}
    >
      <div
        className="w-[95%] md:w-[65%] h-[95%] max-h-screen overflow-auto bg-gray-300 bg-opacity-75 rounded-lg text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        {data ? (
          <div className="flex  items-center md:justify-center h-full p-4">
            <div className=" flex-col md:w-[45%] h-full pr-2 ">
              <div className="flex w-full items-center justify-center">
                <img
                  className="md:w-[3rem] w-6 h-6 md:h-[3rem] mx-1.5"
                  src={data.image.large}
                  alt={data.id}
                />
                <h1 className="text-sm md:text-xl capitalize font-medium">{data.name}</h1>
                <span
                  className="text-xs
        py-0.5  ml-2 bg-cyan text-cyan bg-opacity-25
        rounded uppercase
        ">
                  {data.symbol}
                </span>
              </div>
              <div className="flex  h-full pl-3 mt-3 ">
              <Chart id={data.id} />
            </div>
                <div className="flex w-full mt-2">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <span className="text-sm capitalize text-gray-100">
                      Price
                    </span>
                    <div
                      className={`text-sm px-1 ml-2 font-medium flex items-center
                        rounded uppercase bg-opacity-25
           ${
            data.market_data.price_change_percentage_24h > 0
              ? "bg-green text-green"
              : "bg-red text-red"
           }
          `}
                    >
                      <span>
                        {Number(
                          data.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`
                        w-[1rem] ml-0.5
                        ${
                          data.market_data.price_change_percentage_24h > 0
                            ? "fill-green rotate-180"
                            : "fill-red"
                        }
                        `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      maximumSignificantDigits: 5,
                    }).format(data.market_data.current_price[currency])}
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    Market Cap
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.market_cap[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    fully diluted valuation
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      notation: "compact",
                    }).format(
                      data.market_data.fully_diluted_valuation[currency]
                    )}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col w-full mt-4 justify-between">
                <span className="text-sm capitalize text-gray-100">
                  total volume
                </span>
                <h2 className="text-base font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 0,
                  }).format(data.market_data.total_volume[currency])}
                </h2>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <HighLowIndicator
                  currentPrice={data.market_data.current_price[currency]}
                  high={data.market_data.high_24h[currency]}
                  low={data.market_data.low_24h[currency]}
                />
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    Low 24H
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(data.market_data.low_24h[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    high 24H
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(data.market_data.high_24h[currency])}
                  </h2>
                </div>
              </div>

              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    max supply
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.max_supply)}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-gray-100">
                    circulating supply
                  </span>
                  <h2 className="text-base font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.circulating_supply)}
                  </h2>
                  
                </div> 
               
              </div>
              <h3 className="text-white py-1">
                  <span className="text-gray-100 capitalize mr-1">
                    market cap rank:{" "}
                  </span>{" "}
                  {data.market_cap_rank}{" "}
                </h3> 
                
            
            </div>
            

            
          </div>
        ) : (
          <div
            className="w-full min-h-[60vh] h-full flex justify-center items-center
             "
          >
            <div
              className="w-8 h-8 border-4 border-cyan rounded-full
             border-b-gray-200 animate-spin 
             "
              role="status"
            />
            <span className="ml-2">please wait...</span>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("model")
  );
};

export default CryptoDetails;
