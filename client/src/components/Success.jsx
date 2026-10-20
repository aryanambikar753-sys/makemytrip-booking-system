import { useNavigate } from "react-router-dom";
import "./styles/Success.css";

function Success() {
  const navigate = useNavigate();

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const booking = bookings.length > 0 ? bookings[bookings.length - 1] : null;

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">
          <span>✓</span>
        </div>

        <p className="success-label">PAYMENT COMPLETED</p>

        <h1>Payment Successful!</h1>

        <p className="success-message">
          Congratulations! Your flight has been booked successfully.
          Get ready for your next journey.
        </p>

        <div className="success-status">
          <span className="status-dot"></span>
          Booking Confirmed
        </div>

        {booking && (
          <div className="success-booking-details">
            <div className="success-details-heading">
              <h2>Booking Details</h2>
              <span>✈ Flight</span>
            </div>

            <div className="success-booking-id">
              <span>Booking ID</span>
              <strong>{booking.bookingId}</strong>
            </div>

            <div className="success-route">
              <div className="success-city">
                <strong>{booking.from || "Mumbai"}</strong>
                <span>{booking.departure || "07:00 AM"}</span>
              </div>

              <div className="success-route-line">
                <span>✈</span>
                <div></div>
              </div>

              <div className="success-city success-city-right">
                <strong>{booking.to || "Delhi"}</strong>
                <span>{booking.arrival || "09:10 AM"}</span>
              </div>
            </div>

            <div className="success-info-grid">
              <div>
                <span>Airline</span>
                <strong>{booking.airline || "IndiGo"}</strong>
              </div>

              <div>
                <span>Passenger</span>
                <strong>{booking.passengerName || "Guest"}</strong>
              </div>

              <div>
                <span>Seat</span>
                <strong>{booking.selectedSeat || "Not Selected"}</strong>
              </div>

              <div>
                <span>Total Paid</span>
                <strong>{booking.price || "—"}</strong>
              </div>
            </div>
          </div>
        )}

        <div className="success-actions">
          <button
            className="success-primary-btn"
            onClick={() => navigate("/mybookings")}
          >
            View My Bookings →
          </button>

          <button
            className="success-secondary-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>

        <p className="success-footer">
          Thank you for booking with MakeMyTrip!
        </p>
      </div>
    </div>
  );
}

export default Success;