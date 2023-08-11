import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

Chart.register(
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

const LineChart = ({ coinHistory, currentPrice, coinName, days }) => {
  const historyData = coinHistory?.data?.history;

  if (!historyData) {
    return null; // Return something meaningful here if data is not available
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{coinName} Price Chart</h2>
        <div className="space-x-4">
          <p className="text-sm">
            Current {coinName} Price: $ {currentPrice}
          </p>
        </div>
      </div>
      <Line
        data={{
          labels: historyData.map((coin) => {
            const date = new Date(coin.timestamp * 1000); // Convert seconds to milliseconds
            return days === 1 ? date.toLocaleString() : date.toLocaleString();
          }),

          datasets: [
            {
              data: historyData.map((coin) => coin.price),
              label: `Price ( Past 24h )`,
              borderColor: "#1677ff",
              backgroundColor: "#1677ff",
            },
          ],
        }}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default LineChart;
