import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';


const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  if (isFetching) return <div className="spinner"></div>;

  return (
    <>
    {!simplified && (
      <div className="px-8 flex flex-col sm:flex-row sm:justify-between items-center mb-[20px] w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center">Popular Cryptocurrencies Stats</h2>
        <div className='relative'>
          <input
              type="text"
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value.toLowerCase())}}
              placeholder="Search cryptocurrencies..."
              className="w-[250px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>
    )}

    <div className="flex justify-around flex-wrap gap-x-[40px] gap-y-[20px]">
      {cryptos?.map((currency) => (
        <Link
          to={`/crypto/${currency.uuid}`}
          key={currency.uuid}
          className="block w-[200px] sm:w-[250px]"
        >
          <div className="rounded-lg shadow-md p-4 mb-6 block hover:border hover:border-gray-300 transition-all duration-300 h-[220px] bg-white">
            <div className="flex items-center justify-between mb-[40px]">
                    <h3 className="text-lg font-semibold">{`${currency.rank}. ${currency.name}`}</h3>
                    <img
                        className="w-8 h-8"
                        src={currency.iconUrl}
                        alt={`${currency.name} Icon`}
                    />
                    </div>
                    <div className="space-y-1">
                    <p className="text-sm">Price: {millify(currency.price)}</p>
                    <p className="text-sm">Market Cap: {millify(currency.marketCap)}</p>
                    <p className="text-sm">Daily Change: {currency.change}%</p>
                </div>
          </div>
        </Link>
      ))}
    </div>
    </>
  );
};

export default Cryptocurrencies;
