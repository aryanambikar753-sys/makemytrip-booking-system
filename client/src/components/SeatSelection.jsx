import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/SeatSelection.css";

function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();

  const flight =
    location.state ||
    JSON.parse(localStorage.getItem("selectedFlight")) ||
    null;

  const savedSeat = localStorage.getItem("selectedSeat");

  const [selectedSeat, setSelectedSeat] = useState(savedSeat || "");

  const seats = [
    "1A", "1B", "1C", "1D",
    "2A", "2B", "2C", "2D",
    "3A", "3B", "3C", "3D",
    "4A", "4B", "4C", "4D",
    "5A", "5B", "5C", "5D",
    "6A", "6B", "6C", "6D",
  ];

  const occupiedSeats = ["1B", "2C", "4A", "5D"];

  const handleSeatSelect = (seat) => {
    if (occupiedSeats.includes(seat)) {
      alert("This seat is already occupied.");
      return;
    }

    setSelectedSeat(seat);
    localStorage.setItem("selectedSeat", seat);
  };

  const handleContinue = () => {
    if (!selectedSeat) {
      alert("Please select a seat.");
      return;
    }

    localStorage.setItem("selectedSeat", selectedSeat);

    navigate("/payment", {
      state: {
        ...flight,
        selectedSeat: selectedSeat,
      },
    });
  };

  return (
    <div className="seat-page">
      <div className="seat-container">

        <h2>Select Your Seat</h2>

        <p>Choose an available seat for your flight</p>

        {flight && (
          <div className="selected-flight-summary">
            <h3>✈️ Selected Flight</h3>

            <p>
              <strong>Airline:</strong>{" "}
              {flight.airline || "Not Available"}
            </p>

            <p>
              <strong>Route:</strong>{" "}
              {flight.from || "N/A"} → {flight.to || "N/A"}
            </p>

            <p>
              <strong>Departure:</strong>{" "}
              {flight.departure || "N/A"}
            </p>

            <p>
              <strong>Arrival:</strong>{" "}
              {flight.arrival || "N/A"}
            </p>

            {flight.date && (
              <p>
                <strong>Travel Date:</strong> {flight.date}
              </p>
            )}

            {flight.passengers && (
              <p>
                <strong>Passengers:</strong> {flight.passengers}
              </p>
            )}

            {flight.price && (
              <p>
                <strong>Fare:</strong> ₹{flight.price}
              </p>
            )}
          </div>
        )}

        <div className="seat-legend">
          <span>
            <b className="legend available"></b>
            Available
          </span>

          <span>
            <b className="legend selected"></b>
            Selected
          </span>

          <span>
            <b className="legend occupied"></b>
            Occupied
          </span>
        </div>

        <div className="seat-grid">
          {seats.map((seat) => {
            const isOccupied = occupiedSeats.includes(seat);
            const isSelected = selectedSeat === seat;

            return (
              <button
                key={seat}
                disabled={isOccupied}
                className={`seat ${
                  isOccupied
                    ? "occupied"
                    : isSelected
                    ? "selected"
                    : "available"
                }`}
                onClick={() => handleSeatSelect(seat)}
              >
                {seat}
              </button>
            );
          })}
        </div>

        <div className="selected-info">
          {selectedSeat ? (
            <p>
              Selected Seat: <strong>{selectedSeat}</strong>
            </p>
          ) : (
            <p>Please select a seat</p>
          )}
        </div>

        <div className="seat-actions">
          <button
            className="back-seat"
            onClick={() => navigate("/passenger", {
              state: flight,
            })}
          >
            Back
          </button>

          <button
            className="continue-seat"
            onClick={handleContinue}
          >
            Continue to Payment
          </button>
        </div>

      </div>
    </div>
  );
}

export default SeatSelection;