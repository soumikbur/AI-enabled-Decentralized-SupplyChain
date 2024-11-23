import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

// Import Chart.js modules
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const DemandForecastView = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://your-backend-api.com/forecast"
        );
        const { data } = response;

        // Format the data for the chart
        const labels = data.map((item) => item.date); // Replace 'date' with the actual key from your API
        const values = data.map((item) => item.demand); // Replace 'demand' with the actual key from your API

        setChartData({
          labels,
          datasets: [
            {
              label: "Demand Forecast",
              data: values,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              pointRadius: 4,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="demand-forecast-view">
      <h2>Demand Forecast</h2>
      {loading ? (
        <p>Loading...</p>
      ) : chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                mode: "index",
                intersect: false,
              },
              legend: {
                position: "top",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Demand",
                },
              },
            },
          }}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default DemandForecastView;
