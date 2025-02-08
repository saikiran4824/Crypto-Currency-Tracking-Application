import React, { useLayoutEffect, useState, useContext } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CryptoContext } from './../context/CryptoContext';

function CustomTooltip({ payload, label, active, currency = 'usd' }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat(
          'en-IN',
          {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 5,
          }
        ).format(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
}

const ChartComponent = ({ data, currency, type, chartType }) => {
  return (
    <ResponsiveContainer width="100%" height={'90%'}>
      {chartType === 'line' ? (
        <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
          <Line
            type="monotone"
            dataKey={type}
            stroke="#2ecc71"
            strokeWidth={2}
            dot={false}
          />
          <CartesianGrid stroke="#323232" strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            stroke="#2ecc71"
            tick={{ fill: '#2ecc71', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
          />
          <YAxis
            stroke="#2ecc71"
            tick={false} // Removes Y-axis tick coordinates
            domain={['auto', 'auto']}
          />
          <Tooltip
            content={<CustomTooltip />}
            currency={currency}
            cursor={{ stroke: '#2ecc71', strokeWidth: 2 }}
            wrapperStyle={{
              outline: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '5px',
            }}
          />
          <Legend wrapperStyle={{ color: '#2ecc71' }} verticalAlign="top" iconType="circle" />
        </LineChart>
      ) : chartType === 'bar' ? (
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
          <Bar dataKey={type} fill="#2ecc71" barSize={6} />
          <CartesianGrid stroke="#323232" />
          <XAxis dataKey="date" stroke="#2ecc71" tick={{ fill: '#2ecc71', fontSize: 12 }} />
          <YAxis dataKey={type} stroke="#2ecc71" tick={false} domain={['auto', 'auto']} />
          <Tooltip
            content={<CustomTooltip />}
            currency={currency}
            cursor={false}
            wrapperStyle={{
              outline: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '5px',
            }}
          />
          <Legend />
        </BarChart>
      ) : chartType === 'area' ? (
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
          <Area type="monotone" dataKey={type} stroke="#2ecc71" fill="#2ecc71" fillOpacity={0.3} />
          <CartesianGrid stroke="#323232" />
          <XAxis dataKey="date" stroke="#2ecc71" tick={{ fill: '#2ecc71', fontSize: 12 }} />
          <YAxis dataKey={type} stroke="#2ecc71" tick={false} domain={['auto', 'auto']} />
          <Tooltip
            content={<CustomTooltip />}
            currency={currency}
            cursor={false}
            wrapperStyle={{
              outline: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '5px',
            }}
          />
          <Legend />
        </AreaChart>
      ) : null}
    </ResponsiveContainer>
  );
};

const Chart = ({ id }) => {
  const [chartData, setChartData] = useState();
  let { currency } = useContext(CryptoContext);
  const [type, setType] = useState('prices');
  const [days, setDays] = useState(7);
  const [chartType, setChartType] = useState('line'); // Default to 'line'

  useLayoutEffect(() => {
    const getChartData = async (id) => {
      try {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        )
          .then((res) => res.json())
          .then((json) => json);

        let convertedData = data[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            [type]: item[1],
          };
        });

        setChartData(convertedData);
      } catch (error) {
        console.log(error);
      }
    };

    getChartData(id);
  }, [id, type, days]);

  return (
    <div className="flex w-full h-[90%]"> {/* Flex container for side by side layout */}
      {/* Chart Container */}
      <div className="w-3/4 p-4"> {/* 75% width for the chart */}
        <ChartComponent data={chartData} currency={currency} type={type} chartType={chartType} />
      </div>

      {/* Buttons Container */}
      <div className="w-1/4 p-4 flex flex-col space-y-4"> {/* 25% width for the buttons */}
        {/* Chart Type Buttons */}
        <div className="flex flex-col space-y-4">
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              chartType === 'line' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'
            }`}
            onClick={() => setChartType('line')}
          >
            Line Chart
          </button>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              chartType === 'bar' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'
            }`}
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </button>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              chartType === 'area' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'
            }`}
            onClick={() => setChartType('area')}
          >
            Area Chart
          </button>
        </div>

        {/* Data Type Buttons */}
        <div className="flex flex-col space-y-4">
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              type === 'prices' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'
            }`}
            onClick={() => setType('prices')}
          >
            Price
          </button>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              type === 'market_caps' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'
            }`}
            onClick={() => setType('market_caps')}
          >
            Market Caps
          </button>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              type === 'total_volumes' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'
            }`}
            onClick={() => setType('total_volumes')}
          >
            Total Volumes
          </button>
        </div>

        {/* Timeframe Buttons */}
        <div className="hidden lg:flex lg:flex-col space-y-4">
        <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              days === 7 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'
            }`}
            onClick={() => setDays(7)}
          >
            7d
          </button>

          <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              days === 30 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'
            }`}
            onClick={() => setDays(30)}
          >
            30d
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chart;
