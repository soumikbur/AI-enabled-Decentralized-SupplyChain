import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnomalyDetectionChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const response = await axios.get(
          "https://your-backend-api.com/anomalies"
        );
        const data = response.data;

        // Format data for the chart
        const labels = data.map((entry) => entry.date);
        const values = data.map((entry) => entry.value);

        setChartData({
          labels,
          datasets: [
            {
              label: "Detected Anomalies",
              data: values,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching anomaly data:", error);
      }
    };

    fetchAnomalies();
  }, []);

  return (
    <div className="anomaly-detection-chart">
      <h2>Anomaly Detection</h2>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default AnomalyDetectionChart;
