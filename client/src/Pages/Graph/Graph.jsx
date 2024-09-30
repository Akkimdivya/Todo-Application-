import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import './Graph.css'

function Graph() {
  // State hooks for data and loading/error status
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data preparation function
  const prepareData = (tasks) => {
    const priorityCount = {};
    const statusCount = {};

    // Count priorities and statuses in the data
    tasks.forEach(task => {
      // Count priorities
      priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
      // Count statuses
      statusCount[task.status] = (statusCount[task.status] || 0) + 1;
    });

    // Convert counts to arrays of objects for the charts
    const priorityData = Object.entries(priorityCount).map(([key, value]) => ({
      priority: key,
      count: value,
    }));

    const statusData = Object.entries(statusCount).map(([key, value]) => ({
      status: key,
      count: value,
    }));

    return { priorityData, statusData };
  };

  // Fetch data from the API
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("https://taskmanager-xxs2.onrender.com/all-tasks/");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Prepare data for charts
  const { priorityData, statusData } = prepareData(data);

  const COLORS = ["#4d70d0", "#c17439", "#4ea452", "#a43c3c"];

  return (
    <main className="main-container">

      <div className="charts">
        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={priorityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="priority" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4d70d0" name="Priority" />
          </BarChart>
        </ResponsiveContainer>

        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={statusData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        
      </div>
    </main>
  );
}

export default Graph;
