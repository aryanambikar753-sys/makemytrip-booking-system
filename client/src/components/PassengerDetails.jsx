import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/PassengerDetails.css";

function PassengerDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const flight = location.state || null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");

  const handleContinue = () => {
    if (!name || !email || !mobile || !age) {
      alert("Please fill all passenger details.");
      return;
    }

    const passenger = {
      name,
      email,
      mobile,
      age,
      gender,
    };

    localStorage.setItem("passenger", JSON.stringify(passenger));

    navigate("/seatselection", {
      state: flight,
    });
  };

  return (
    <div className="passenger-page">
      <div className="passenger-container">
        <div className="passenger-header">
          <div className="passenger-icon">👤</div>

          <h2>Passenger Details</h2>

          <p>
            Enter passenger information to continue with your booking.
          </p>
        </div>

        {flight && (
          <div className="flight-summary">
            <div className="summary-header">
              <h3>✈️ Selected Flight</h3>
              <span>Selected</span>
            </div>

            <div className="summary-airline">
              {flight.airline || "Airline"}
            </div>

            <div className="summary-route">
              <div>
                <strong>{flight.from || "Mumbai"}</strong>
                <small>{flight.departure || "07:00 AM"}</small>
              </div>

              <div className="summary-arrow">→</div>

              <div>
                <strong>{flight.to || "Delhi"}</strong>
                <small>{flight.arrival || "09:10 AM"}</small>
              </div>
            </div>

            <div className="summary-details">
              <div>
                <span>Travel Date</span>
                <strong>{flight.date || "Not Selected"}</strong>
              </div>

              <div>
                <span>Passengers</span>
                <strong>{flight.passengers || "1"}</strong>
              </div>

              <div>
                <span>Fare</span>
                <strong>{flight.price || "₹0"}</strong>
              </div>
            </div>
          </div>
        )}

        <form
          className="passenger-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter passenger name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mobile Number</label>

              <input
                type="tel"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Age</label>

              <input
                type="number"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Gender</label>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="passenger-actions">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>

            <button
              type="button"
              className="continue-btn"
              onClick={handleContinue}
            >
              Continue to Seat Selection →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PassengerDetails;