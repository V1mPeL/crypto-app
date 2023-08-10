import React from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import {
  FaCoins,
  FaExchangeAlt,
  FaDollarSign,
  FaChartLine,
  FaGlobe,
} from "react-icons/fa";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;


  if (isFetching) return <div className="spinner"></div>;

  return (
    <div className="px-8 mt-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto mb-[50px]">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">Global Cryptocurrency Stats</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaGlobe className="text-green-500 text-lg sm:text-2xl md:text-3xl lg:text-4xl mr-3" />
              <p className="font-semibold text-sm md:text-lg lg:text-xl">Total Cryptocurrencies</p>
            </div>
            <p className="font-semibold text-sm md:text-xl">
              {millify(globalStats.total)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaExchangeAlt className="text-green-500 text-lg sm:text-2xl md:text-3xl lg:text-4xl mr-3" />
              <p className="font-semibold text-sm md:text-lg lg:text-xl">Total Exchanges</p>
            </div>
            <p className="font-semibold text-sm md:text-xl">
              {millify(globalStats.totalExchanges)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaDollarSign className="text-green-500 text-lg sm:text-2xl md:text-3xl lg:text-4xl mr-3" />
              <p className="font-semibold text-sm md:text-lg lg:text-xl">Total Market Cap</p>
            </div>
            <p className="font-semibold text-sm md:text-xl">
              ${millify(globalStats.totalMarketCap)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaChartLine className="text-green-500 text-lg sm:text-2xl md:text-3xl lg:text-4xl mr-3" />
              <p className="font-semibold text-sm md:text-lg lg:text-xl">Total 24h Volume</p>
            </div>
            <p className="font-semibold text-sm md:text-xl">
              ${millify(globalStats.total24hVolume)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaCoins className="text-green-500 text-lg sm:text-2xl md:text-3xl lg:text-4xl mr-3" />
              <p className="font-semibold text-sm md:text-lg lg:text-xl">Total Markets</p>
            </div>
            <p className="font-semibold text-sm md:text-xl">
              {millify(globalStats.totalMarkets)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-[20px]">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Top 10 Cryptocurrencies Stats</h2>
        <Link to="/cryptocurrencies" className="text-[#1677ff] font-bold text-xl md:text-2xl flex md:flex">
          Show More
        </Link>
      </div>

      <Cryptocurrencies simplified/>



      <div className="flex justify-between items-center mb-[20px]">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Latest Cryptocurrency News</h2>
        <Link to="/news" className="text-[#1677ff] font-bold text-xl md:text-2xl">
          Show More
        </Link>
      </div>

      <News simplified/>

    </div>
  );
};

export default HomePage;
