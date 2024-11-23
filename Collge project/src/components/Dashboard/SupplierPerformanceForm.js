import React, { useState } from "react";
import axios from "axios";

const SupplierPerformanceForm = () => {
  const [supplierName, setSupplierName] = useState("");
  const [metrics, setMetrics] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://your-backend-api.com/suppliers/${supplierName}/metrics`
      );
      setMetrics(response.data);
    } catch (error) {
      console.error("Error fetching supplier metrics:", error);
    }
  };

  return (
    <div className="supplier-performance-form">
      <h2>Supplier Performance Evaluation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Supplier Name:</label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            placeholder="Enter supplier name"
            required
          />
        </div>
        <button type="submit">View Metrics</button>
      </form>
      {metrics && (
        <div className="metrics">
          <h3>Performance Metrics for {supplierName}:</h3>
          <ul>
            <li>Timeliness: {metrics.timeliness}%</li>
            <li>Quality: {metrics.quality}/10</li>
            <li>Cost Efficiency: {metrics.costEfficiency}/10</li>
            <li>Overall Rating: {metrics.overallRating}/10</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SupplierPerformanceForm;