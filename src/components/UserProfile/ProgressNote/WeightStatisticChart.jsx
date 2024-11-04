import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import { formatDate } from './FormatDate'; // Adjust path as needed
import 'react-datepicker/dist/react-datepicker.css';
import './Progress.css';

const WeightStatisticChart = ({ data }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Format data dates to ensure consistency and sort in ascending order
  const formattedData = data
    .map(entry => ({
      ...entry,
      date: formatDate(entry.date)
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date in ascending order

  // Filter data based on selected date range
  const filteredData = formattedData.filter((entry) => {
    const entryDate = new Date(entry.date);
    return (!startDate || entryDate >= new Date(formatDate(startDate))) &&
           (!endDate || entryDate <= new Date(formatDate(endDate)));
  });

  // Calculate y-axis range
  const weights = filteredData.map(entry => entry.weight);
  const maxWeight = Math.ceil((Math.max(...weights) + 5) / 10) * 10; // Round up to nearest 10
  const minWeight = Math.floor((Math.min(...weights) - 5) / 10) * 10; // Round down to nearest 10

  return (
    <div className="weight-statistic-chart">
      <h3>Weight Statistic</h3>

      {/* Date Picker for selecting range */}
      <div className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          dateFormat="yyyy-MM-dd"
          className="date-picker"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          dateFormat="yyyy-MM-dd"
          className="date-picker"
        />
      </div>

      {/* Responsive Chart Container */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={[minWeight, maxWeight]} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="weight" stroke="#7BB601" strokeWidth={2} dot={{ r: 5, fill: "#333" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Custom tooltip for Recharts
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { date, weight } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>{`Date: ${date}`}</p>
        <p>{`Weight: ${weight} kg`}</p>
      </div>
    );
  }
  return null;
};

export default WeightStatisticChart;
