import { useLocation, useNavigate } from "react-router-dom";
import "./styles/FlightDetails.css";

function FlightDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="flight-details-page">
        <div className="details-card">
          <h2>No Flight Selected</h2>

          <p>
            Please select a flight to view its details.
          </p>

          <button
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const baseFare =
    Number(
      String(state.price || "₹0").replace(/[^\d]/g, "")
    ) || 0;

  const convenienceFee = 299;
  const totalAmount = baseFare + convenienceFee;

  return (
    <div className="flight-details-page">
      <div className="details-card">

        {/* Header */}
        <div className="top-section">
          <div>
            <h1>{state.airline || "Airline"}</h1>
            <p>Flight Details</p>
          </div>

          <h2>₹{baseFare.toLocaleString("en-IN")}</h2>
        </div>

        {/* Travel Information */}
        <div className="travel-info">
          <p>
            <strong>Travel Date:</strong>{" "}
            {state.date || "Not Selected"}
          </p>

          <p>
            <strong>Passengers:</strong>{" "}
            {state.passengers || "1"}
          </p>
        </div>

        {/* Route */}
        <div className="route-box">

          <div className="city">
            <h2>{state.from || "Mumbai"}</h2>

            <p>Departure</p>

            <h3>
              {state.departure || "07:00 AM"}
            </h3>
          </div>

          <div className="middle">
            <h3>
              {state.duration || "2h 10m"}
            </h3>

            <p>
              ──────── ✈️ ────────
            </p>

            <span>Non Stop</span>
          </div>

          <div className="city">
            <h2>{state.to || "Delhi"}</h2>

            <p>Arrival</p>

            <h3>
              {state.arrival || "09:10 AM"}
            </h3>
          </div>

        </div>

        {/* Flight Information */}
        <div className="info-grid">

          <div className="info-card">
            <h3>Aircraft</h3>
            <p>
              {state.aircraft || "Not Available"}
            </p>
          </div>

          <div className="info-card">
            <h3>Terminal</h3>
            <p>
              {state.terminal || "Not Available"}
            </p>
          </div>

          <div className="info-card">
            <h3>Gate</h3>
            <p>
              {state.gate || "Not Available"}
            </p>
          </div>

          <div className="info-card">
            <h3>Baggage</h3>
            <p>
              {state.baggage || "Not Available"}
            </p>
          </div>

          <div className="info-card">
            <h3>Meal</h3>
            <p>
              {state.meal || "Not Available"}
            </p>
          </div>

          <div className="info-card">
            <h3>Travel Class</h3>
            <p>
              {state.classType || "Economy"}
            </p>
          </div>

        </div>

        {/* Fare Summary */}
        <div className="fare-box">

          <h2>Fare Summary</h2>

          <div className="fare-row">
            <span>Base Fare</span>

            <span>
              ₹{baseFare.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="fare-row">
            <span>Convenience Fee</span>

            <span>₹299</span>
          </div>

          <div className="fare-row">
            <span>GST</span>

            <span>Included</span>
          </div>

          <hr />

          <div className="fare-total">
            <span>Total Amount</span>

            <span>
              ₹{totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

        </div>

        {/* Highlights */}
        <div className="highlights">

          <h2>Flight Highlights</h2>

          <ul>
            <li>✔ Instant Ticket Confirmation</li>
            <li>✔ Secure Online Payment</li>
            <li>✔ Web Check-in Available</li>
            <li>✔ Free Cancellation (Selected Fare)</li>
            <li>✔ Customer Support 24×7</li>
          </ul>

        </div>

        {/* Actions */}
        <div className="flight-details-actions">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button
            className="continue-btn"
            onClick={() =>
              navigate("/passenger", {
                state: state,
              })
            }
          >
            Continue to Passenger Details
          </button>

        </div>

      </div>
    </div>
  );
}

export default FlightDetails;