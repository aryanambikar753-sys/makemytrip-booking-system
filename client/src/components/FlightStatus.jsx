import { useState } from "react";
import "./styles/FlightStatus.css";

function FlightStatus() {
  const [flightNumber, setFlightNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    if (!flightNumber.trim()) {
      alert("Please enter flight number.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const apiKey = import.meta.env.VITE_AVIATIONSTACK_API_KEY;

      const response = await fetch(
        `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber.toUpperCase()}`
      );

      const data = await response.json();

      if (data.error) {
        setStatus({
          status: "API Error",
          message: data.error.message || "Unable to fetch flight data.",
        });
        return;
      }

      if (!data.data || data.data.length === 0) {
        setStatus({
          status: "Flight Not Found",
        });
        return;
      }

      const flight = data.data[0];

      setStatus({
        airline: flight.airline?.name || "Unknown Airline",
        from:
          flight.departure?.airport ||
          flight.departure?.iata ||
          "Unknown",
        to:
          flight.arrival?.airport ||
          flight.arrival?.iata ||
          "Unknown",
        departure:
          flight.departure?.scheduled || "Not Available",
        arrival:
          flight.arrival?.scheduled || "Not Available",
        status:
          flight.flight_status
            ? flight.flight_status
                .replace("_", " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())
            : "Unknown",
      });
    } catch (error) {
      console.error("Flight API Error:", error);

      setStatus({
        status: "Error",
        message: "Unable to connect to flight service.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flight-status-container">
      <h2>Live Flight Status</h2>

      <p className="status-subtitle">
        Check the latest status of your flight
      </p>

      <div className="status-search">
        <input
          type="text"
          placeholder="Enter Flight Number e.g. 6E101"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />

        <button onClick={checkStatus} disabled={loading}>
          {loading ? "Checking..." : "Check Status"}
        </button>
      </div>

      {status && (
        <div className="status-card">
          {status.status === "Flight Not Found" ? (
            <h3>❌ Flight Not Found</h3>
          ) : status.status === "API Error" ? (
            <>
              <h3>⚠️ API Error</h3>
              <p>{status.message}</p>
            </>
          ) : status.status === "Error" ? (
            <>
              <h3>⚠️ Connection Error</h3>
              <p>{status.message}</p>
            </>
          ) : (
            <>
              <h3>{status.airline}</h3>

              <div className="route">
                <div>
                  <strong>{status.from}</strong>
                  <span>{status.departure}</span>
                </div>

                <div className="arrow">✈️ →</div>

                <div>
                  <strong>{status.to}</strong>
                  <span>{status.arrival}</span>
                </div>
              </div>

              <div className="flight-info">
                <p>
                  <strong>Flight:</strong>{" "}
                  {flightNumber.toUpperCase()}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="status-text">
                    {status.status}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default FlightStatus;