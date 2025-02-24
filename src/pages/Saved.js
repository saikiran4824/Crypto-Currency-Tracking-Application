import React, { useContext } from 'react';
import { StorageContext } from '../context/StorageContext';
import { CryptoContext } from './../context/CryptoContext';
import { Link } from 'react-router-dom';

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
    <button className="outline-0 border-0 bg-none cursor-pointer" onClick={handleClick}>
      <svg
        className={`w-6 h-6 ml-1.5 ${allCoins.includes(data.id) ? 'fill-cyan' : ''} hover:fill-cyan`}
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

const RemoveBtn = ({ data }) => {
  const { removeCoin } = useContext(StorageContext);

  return (
    <button
      className="ml-2 p-1 rounded border border-transparent hover:border-green-500"
      onClick={() => removeCoin(data.id)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#2ecc71"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 2L9 3H3v2h1.109l1.783 15.256c.131.987.988 1.744 1.983 1.744h8.248c.995 0 1.852-.757 1.983-1.744L19.891 5H21V3h-6l-1-1h-4z" />
      </svg>
    </button>
  );
};

const Saved = () => {
  const { savedData } = useContext(StorageContext);
  let { currency } = useContext(CryptoContext);

  return (
    <section className="w-full md:w-[80%] mx-auto mt-16 mb-24">
      <h1 className="text-2xl font-semibold text-center mb-6">Saved Cryptocurrencies</h1>
      {savedData && savedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedData.map((data) => (
            <div key={data.id} className="border border-cyan shadow-md rounded-lg p-6 flex flex-col items-center">
              <div className="flex w-full justify-between">
              
              <img src={data.image} alt={data.id} className="w-10 h-10" />
              <SaveBtn data={data} />
              <RemoveBtn data={data} />
              </div>
              <Link to={`/${data.id}`} className="text-lg font-semibold text-blue-600">{data.symbol.toUpperCase()}</Link>
              <h2 className="text-xl font-semibold mt-2">{data.name}</h2>
              <p className="text-gray-600 text-lg mt-1">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: currency,
                }).format(data.current_price)}
              </p>
              <div className="flex justify-between w-full mt-4 text-sm">
                <div className="text-center">
                  <span className="text-gray-500">1H</span>
                  <p className={data.price_change_percentage_1h_in_currency < 0 ? 'text-red-500' : 'text-green-500'}>
                    {Number(data.price_change_percentage_1h_in_currency).toFixed(2)}%
                  </p>
                </div>
                <div className="text-center">
                  <span className="text-gray-500">24H</span>
                  <p className={data.price_change_percentage_24h_in_currency < 0 ? 'text-red-500' : 'text-green-500'}>
                    {Number(data.price_change_percentage_24h_in_currency).toFixed(2)}%
                  </p>
                </div>
                <div className="text-center">
                  <span className="text-gray-500">7D</span>
                  <p className={data.price_change_percentage_7d_in_currency < 0 ? 'text-red-500' : 'text-green-500'}>
                    {Number(data.price_change_percentage_7d_in_currency).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-lg text-cyan">No saved data to show</h1>
      )}
    </section>
  );
};

export default Saved;
