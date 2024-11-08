import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const DailyCaloriesChart = ({ dailyCalories, mealCalories }) => {
  const data = [
    { name: 'Meal Calories', value: mealCalories },
    { name: 'Remaining Calories', value: dailyCalories - mealCalories },
  ];

  const COLORS = ['#8884d8', '#cccccc'];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DailyCaloriesChart;
