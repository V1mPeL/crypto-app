import React from 'react';
// import { Line } from 'react-chartjs-2';

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp));
  }

  console.log("coinPrice")
  console.log(coinPrice)
  console.log("coinTimestamp")
  console.log(coinTimestamp)


  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{coinName} Price Chart</h2>
        <div className="space-x-4">
          <p className="text-sm">Current {coinName} Price: $ {currentPrice}</p>
        </div>
      </div>
       {/* <Line
              data={{
                labels: coinTimestamp,
                datasets: [
                  {
                    label: 'Price In USD',
                    data: coinPrice,
                    fill: false,
                    backgroundColor: '#1677ff',
                    borderColor: '#1677ff',
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    type: 'time',
                    time: {
                      unit: 'day',
                      tooltipFormat: 'MMM D, YYYY',
                    },
                    title: {
                      display: true,
                      text: 'Date',
                    },
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Price In USD',
                    },
                  },
                },
              }}
        /> */}
    </div>
  );
};

export default LineChart;
