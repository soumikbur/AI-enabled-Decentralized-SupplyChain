import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SupplierPerformanceChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchSupplierPerformance = async () => {
      try {
        const response = await axios.get(
          "https://your-backend-api.com/suppliers/performance"
        );
        const data = response.data;

        // Format data for the chart
        const labels = data.map((supplier) => supplier.name);
        const metrics = data.map((supplier) => supplier.performanceScore);

        setChartData({
          labels,
          datasets: [
            {
              label: "Performance Score",
              data: metrics,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching supplier performance data:", error);
      }
    };

    fetchSupplierPerformance();
  }, []);

  return (
    <div className="supplier-performance-chart">
      <h2>Supplier Performance</h2>
      {chartData ? (
        <Bar
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

export default SupplierPerformanceChart;
