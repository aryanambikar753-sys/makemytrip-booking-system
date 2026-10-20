import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Recommendations.css";

function Recommendations() {
  const [selectedTrip, setSelectedTrip] = useState("Popular");
  const navigate = useNavigate();

  const recommendations = {
    Popular: [
      {
        airline: "IndiGo",
        from: "Mumbai",
        to: "Delhi",
        price: "₹4,299",
        time: "07:00 AM - 09:10 AM",
      },
      {
        airline: "Air India",
        from: "Pune",
        to: "Bangalore",
        price: "₹5,199",
        time: "10:30 AM - 12:20 PM",
      },
      {
        airline: "Akasa Air",
        from: "Mumbai",
        to: "Goa",
        price: "₹3,499",
        time: "02:00 PM - 03:10 PM",
      },
    ],

    Budget: [
      {
        airline: "IndiGo",
        from: "Pune",
        to: "Delhi",
        price: "₹3,999",
        time: "06:30 AM - 08:40 AM",
      },
      {
        airline: "Akasa Air",
        from: "Mumbai",
        to: "Ahmedabad",
        price: "₹2,999",
        time: "09:00 AM - 10:15 AM",
      },
      {
        airline: "SpiceJet",
        from: "Mumbai",
        to: "Goa",
        price: "₹3,199",
        time: "04:30 PM - 05:40 PM",
      },
    ],

    Business: [
      {
        airline: "Air India",
        from: "Mumbai",
        to: "Delhi",
        price: "₹7,499",
        time: "08:00 AM - 10:10 AM",
      },
      {
        airline: "Vistara",
        from: "Delhi",
        to: "Bangalore",
        price: "₹8,299",
        time: "11:00 AM - 01:45 PM",
      },
      {
        airline: "IndiGo",
        from: "Mumbai",
        to: "Bangalore",
        price: "₹6,999",
        time: "06:00 PM - 07:40 PM",
      },
    ],
  };

  const handleViewFlight = (flight) => {
    navigate("/flightdetails", {
      state: {
        ...flight,
        date: "17 Sep 2026",
        passengers: 1,
      },
    });
  };

  return (
    <div className="recommendations-container">
      <h2>Personalized Flight Recommendations</h2>

      <p className="recommendation-subtitle">
        Recommended flights based on your travel preferences
      </p>

      <div className="recommendation-tabs">
        <button
          className={selectedTrip === "Popular" ? "active" : ""}
          onClick={() => setSelectedTrip("Popular")}
        >
          Popular
        </button>

        <button
          className={selectedTrip === "Budget" ? "active" : ""}
          onClick={() => setSelectedTrip("Budget")}
        >
          Budget
        </button>

        <button
          className={selectedTrip === "Business" ? "active" : ""}
          onClick={() => setSelectedTrip("Business")}
        >
          Business
        </button>
      </div>

      <div className="recommendation-list">
        {recommendations[selectedTrip].map((flight, index) => (
          <div className="recommendation-card" key={index}>
            <div className="airline-section">
              <h3>{flight.airline}</h3>
              <span>✈️ Recommended</span>
            </div>

            <div className="route-section">
              <div>
                <strong>{flight.from}</strong>
                <small>Departure</small>
              </div>

              <div className="flight-arrow">✈️ →</div>

              <div>
                <strong>{flight.to}</strong>
                <small>Arrival</small>
              </div>
            </div>

            <div className="flight-time">
              {flight.time}
            </div>

            <div className="price-section">
              <span>Starting from</span>
              <strong>{flight.price}</strong>
            </div>

            <button
              className="view-flight-btn"
              onClick={() => handleViewFlight(flight)}
            >
              View Flight
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;