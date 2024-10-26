import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { TrendingContext } from "../context/TrendingContext";
import TrendingCoin from "./../components/TrendingCoin";

const Trending = () => {
  const { trendData, resetTrendingResult } = useContext(TrendingContext);

  return (
    <section className="w-full max-w-6xl h-full flex flex-col mt-8 mb-16 px-4 md:px-8 lg:px-16">
      {/* Trending coins container */}
      <div className="w-full min-h-[60vh] py-6 flex flex-wrap justify-evenly gap-4 border border-gray-100 rounded-lg">
        {trendData &&
          trendData.map((coin) => (
            <TrendingCoin key={coin.item.coin_id} data={coin.item} />
          ))}
        <button
          className="w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform duration-150
          absolute right-4 top-4 md:right-6 md:top-6 bg-gray-200 rounded-full"
          onClick={resetTrendingResult}
        >
          
        </button>
      </div>
      
      {/* Outlet component for routing */}
      <Outlet />
    </section>
  );
};

export default Trending;
