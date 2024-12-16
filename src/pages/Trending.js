import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { TrendingContext } from "../context/TrendingContext";
import TrendingCoin from "./../components/TrendingCoin";

const Trending = () => {
  const { trendData } = useContext(TrendingContext);

  return (
    <section className="w-full h-full flex flex-col mt-8 mb-16 px-2 md:px-8 lg:px-16">
      {/* Trending coins container */}
      <div className="w-full min-h-[60vh]  py-6 flex flex-wrap px-6 md:px-10  justify-evenly gap-4 border border-gray-100 rounded-lg relative">
        {trendData &&
          trendData.map((coin) => (
            <TrendingCoin key={coin.item.coin_id} data={coin.item} className="md:mx-30 min-w-[300vh]" />
          ))}
        {/* Reset button */}
       
      </div>
      {/* Outlet component for routing */}
      <Outlet />
    </section>
  );
};
export default Trending;
