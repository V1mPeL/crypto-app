import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import moment from "moment";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptosList } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  console.log(cryptosList);
  console.log(cryptoNews);

  useEffect(() => {
    if (selectedOption) {
      setNewsCategory(selectedOption.value);
    }
  }, [selectedOption]);

  const options = cryptosList?.data?.coins?.map((value) => ({
    value: value.name,
    label: value.name.toUpperCase(), // Capitalize the first letter
  }));

  if (!cryptoNews?.value) return <div className="spinner"></div>;

  return (
    <div>
      {!simplified && (
        <div className="px-8 flex flex-col sm:flex-row sm:justify-between items-center mb-[20px] w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Latest Cryptocurrencies News
          </h2>
          <div className="relative">
            <Select
              defaultValue="Cryptocurrency"
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
              className="w-[250px]"
            />
          </div>
        </div>
      )}

      <div className="flex justify-around flex-wrap gap-x-4 gap-y-4">
        {cryptoNews.value.map((newsItem, i) => (
          <div key={i} className="w-[300px] sm:w-[350px]">
            <a href={newsItem.url} target="_blank" rel="noreferrer">
              <div className="rounded-lg shadow-md p-4 mb-6 hover:border hover:border-gray-300 transition-all duration-300 bg-white">
                <div className="flex items-center justify-between mb-3 gap-1">
                  <h3 className="text-lg font-semibold">{newsItem.name}</h3>
                  <img
                    className="w-50 h-50"
                    src={newsItem.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                  />
                </div>
                <p className="mb-4">
                  {newsItem.description.length > 150
                    ? `${newsItem.description.substring(0, 150)}...`
                    : newsItem.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 rounded-full mr-2"
                      src={
                        newsItem.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <p className="text-sm">{newsItem.providerName}</p>
                  </div>
                  <p className="text-sm">
                    {moment(newsItem.datePublished).startOf("ss").fromNow()}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
