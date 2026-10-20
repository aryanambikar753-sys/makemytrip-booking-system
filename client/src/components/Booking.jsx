import { useNavigate } from "react-router-dom";
import "./styles/BookingSuccess.css";

function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <h1>🎉 Booking Successful!</h1>

        <p>
          Your flight ticket has been booked successfully.
        </p>

        <h3>Thank You for Booking with Make My Trip</h3>

        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default BookingSuccess;

