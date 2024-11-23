import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch inventory alerts from the backend API
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(
          "https://your-backend-api.com/inventory/alerts"
        );
        setAlerts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inventory alerts:", error);
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="inventory-alerts">
      <h2>Inventory Alerts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : alerts.length > 0 ? (
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>
              <strong>{alert.itemName}</strong>: {alert.message}
            </li>
          ))}
        </ul>
      ) : (
        <p>No alerts at the moment.</p>
      )}
    </div>
  );
};

export default InventoryAlerts;

/*
// Ensure your backend API endpoint /inventory/alerts returns data in this format:
[
  { "itemName": "Widget A", "message": "Low stock: Only 10 units left." },
  { "itemName": "Gadget B", "message": "Out of stock. Reorder now!" }
]
*/
