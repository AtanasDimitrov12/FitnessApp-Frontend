import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Tooltip as PieTooltip, ResponsiveContainer as PieContainer } from "recharts";
import "./AdminMonitoringPage.css";
import { getCompletedExercisesPerMuscleGroup } from "../../repositories/ExerciseRepo";

// Colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#A28DD6"];

const AdminMonitoringPage = () => {
  const [completedExercises, setCompletedExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedExercises = async () => {
      try {
        const fetchedExercise = await getCompletedExercisesPerMuscleGroup();
        if (fetchedExercise) {
          setCompletedExercises(fetchedExercise);
        } else {
          setError("Failed to fetch completed exercises.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletedExercises();
  }, []);

  // Render loading or error messages
  if (isLoading) {
    return <div className="loading">Loading statistics...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-monitoring-page">
      <h1>Admin Monitoring Page</h1>

      <div className="chart-container">
        <PieChartSection data={completedExercises} />
        <LineChartSection />
      </div>
    </div>
  );
};

const PieChartSection = ({ data }) => (
  <div className="chart">
    <h2>Completed Exercises by Muscle Group</h2>
    <PieContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="exerciseCount"
          nameKey="muscleGroup"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label={({ name }) => name}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <PieTooltip />
      </PieChart>
    </PieContainer>
  </div>
);

const LineChartSection = () => (
  <div className="chart">
    <h2>Workout Completion Trends</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={[
          { week: "Week 1", workouts: 10 },
          { week: "Week 2", workouts: 15 },
          { week: "Week 3", workouts: 20 },
        ]}
      >
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="workouts" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default AdminMonitoringPage;
