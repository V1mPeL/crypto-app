import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { BsCoin } from "react-icons/bs";
import {
  AiOutlineThunderbolt,
  AiOutlineTrophy,
  AiOutlineFund,
  AiOutlineMoneyCollect,
  AiOutlineCheck,
} from "react-icons/ai";
import { LiaHashtagSolid } from "react-icons/lia";
import { GoStop } from "react-icons/go";
import { CiCircleAlert } from "react-icons/ci";

import LineChart from "./LineChart";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
  });
  const cryptoDetails = data?.data?.coin;
  console.log(cryptoDetails);

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <BsCoin />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <LiaHashtagSolid /> },
    {
      title: "24h Change",
      value: `${cryptoDetails?.change}%`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <BsCoin />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <AiOutlineTrophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <AiOutlineFund />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails?.supply?.confirmed ? <AiOutlineCheck /> : <GoStop />,
      icon: <CiCircleAlert />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <CiCircleAlert />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <CiCircleAlert />,
    },
  ];

  console.log("coinHistory");
  console.log(coinHistory);

  if (isFetching) return <div className="spinner"></div>;

  return (
    <div className="px-8">
      <div className="">
        <h2 className="text-center font-bold text-3xl text-[#1677ff]">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </h2>
        <p className="text-gray-500 text-center">
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </div>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
      />
      <div className="mt-8 flex flex-col items-center md:flex-row md:justify-around">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-center ">
            {cryptoDetails.name} Value Statistics
          </h3>
          {stats.map(({ icon, title, value }) => (
            <div
              className={`hover:bg-white transition duration-300 rounded-md shadow-md px-4 flex items-center justify-between py-2 mb-1 w-[300px]`}
              key={title}
            >
              <div className="flex items-center">
                {icon}
                <span className="ml-2">{title}</span>
              </div>
              {title === "24h Change" ? (
                <p
                  className={`ml-4 ${
                    parseFloat(cryptoDetails?.change) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {value}
                </p>
              ) : (
                <p className="ml-4">{value}</p>
              )}
            </div>
          ))}
        </div>
        <div className="">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Other Stats Info
          </h3>
          {genericStats.map(({ icon, title, value }) => (
            <div
              className="hover:bg-white transition duration-300 rounded-md shadow-md px-4 flex items-center justify-between py-2 mb-1 w-[300px]"
              key={title}
            >
              <div className="flex items-center">
                {icon}
                <span className="ml-2">{title}</span>
              </div>
              <p className="ml-4">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <div className="">
          <h3 className="text-xl font-semibold mb-2">
            What is {cryptoDetails.name}?
          </h3>
          {HTMLReactParser(cryptoDetails.description)}
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold mb-2">
            {cryptoDetails.name} Links
          </h3>
          {cryptoDetails.links?.map((link) => (
            <div
              className="hover:bg-white transition duration-300 rounded-md shadow-md flex py-2 px-4 items-center justify-between mb-2 w-[270px] md:w-[450px]"
              key={link.name}
            >
              <div className="flex items-center justify-between w-full">
                <h5 className="text-md md:text-lg font-semibold">
                  {link.type}
                </h5>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline ml-2 text-sm md:text-md"
                >
                  {link.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
