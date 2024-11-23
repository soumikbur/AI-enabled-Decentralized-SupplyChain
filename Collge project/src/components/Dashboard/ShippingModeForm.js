import React, { useState } from "react";
import axios from "axios";

const ShippingModeForm = () => {
  const [formData, setFormData] = useState({
    destination: "",
    weight: "",
    urgency: "standard",
  });
  const [suggestion, setSuggestion] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://your-backend-api.com/shipping/suggest",
        formData
      );
      setSuggestion(response.data.suggestion);
    } catch (error) {
      console.error("Error fetching shipping suggestion:", error);
    }
  };

  return (
    <div className="shipping-mode-form">
      <h2>Shipping Mode Suggestions</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            required
          />
        </div>
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Enter weight"
            required
          />
        </div>
        <div>
          <label>Urgency:</label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option value="standard">Standard</option>
            <option value="express">Express</option>
            <option value="overnight">Overnight</option>
          </select>
        </div>
        <button type="submit">Get Suggestion</button>
      </form>
      {suggestion && (
        <div className="suggestion">
          <h3>Suggested Shipping Mode:</h3>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default ShippingModeForm;
