import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CryptoContext } from './../context/CryptoContext';
import Pagination from './Pagination';
import { StorageContext } from './../context/StorageContext';
import Footer from './Footer';

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
  onClick={(e) => handleClick(e)}>
  <svg
    className={`w-[1.5rem] ml-1.5 transition-colors 
                ${allCoins.includes(data.id) ? 'fill-green-500' : 'fill-gray-100'} 
                hover:fill-green-500`}
    width="30"
    height="30"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill={allCoins.includes(data.id) ? "green" : "gray"} 
  >
    <path d="M6 2C4.84 2 4 2.97 4 4v18.04l8-2.97 8 2.97V20.6V4c0-.52-.19-1.05-.57-1.43C19.05 2.19 18.52 2 18 2H6zM6 4h12v15.16l-6-2.23-6 2.23V4z"></path>
  </svg>
</button>

  );
  
  
};

const TableComponent = () => {
  let { cryptoData, currency, error } = useContext(CryptoContext);

  return (
    <>
      <div className="flex flex-col mt-9 border rounded overflow-x-auto container mx-auto">
  {cryptoData ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cryptoData.map((data) => (
        <div
          key={data.id}
          className=" p-4 rounded-lg shadow-md border border-cyan hover:shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <SaveBtn data={data} />
              <img
                className="w-[2rem] h-[2rem] mx-2"
                src={data.image}
                alt={data.name}
              />
              <Link to={`/${data.id}`} className="font-semibold text-lg">
                {data.symbol}
              </Link>
            </div>
            <div>
              <Link to={`/${data.id}`} className="text-sm text-cyan-500">
                {data.name}
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Price:</span>
              <span>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: currency,
                }).format(data.current_price)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Total Volume:</span>
              <span>{data.total_volume}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Market Cap Change:</span>
              <span>{data.market_cap_change_percentage_24h}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>1H:</span>
              <span
                className={
                  data.price_change_percentage_1h_in_currency > 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>24H:</span>
              <span
                className={
                  data.price_change_percentage_24h_in_currency > 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>7D:</span>
              <span
                className={
                  data.price_change_percentage_7d_in_currency > 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : !error.data && !error.search ? (
    <div className="w-full min-h-[50vh] flex justify-center items-center">
      <div
        className="w-8 h-8 border-4 border-solid border-cyan rounded-full border-b-gray-200 animate-spin"
        role="status"
      />
      <span className="text-base ml-2">please wait...</span>
    </div>
  ) : error.data || error.search ? (
    <h1 className="min-h-[60vh] text-lg text-red flex items-center justify-center">
      {error.data
        ? error.data
        : error.search
        ? error.search
        : 'Something unexpected happened!'}
    </h1>
  ) : null}
</div>   
      <Pagination />
      <Footer />
    </>
  );
};

export default TableComponent;
