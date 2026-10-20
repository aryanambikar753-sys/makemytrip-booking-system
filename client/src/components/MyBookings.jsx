import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles/MyBookings.css";

function MyBookings() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings")) || []
  );

  const [filter, setFilter] = useState("All");

  const [selectedBookingId, setSelectedBookingId] = useState(
    state?.bookingId ||
      bookings[bookings.length - 1]?.bookingId ||
      null
  );

  const [showCancelBox, setShowCancelBox] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const selectedBooking =
    bookings.find(
      (item) => item.bookingId === selectedBookingId
    ) || state;

  const confirmedCount = bookings.filter(
    (item) => item.status !== "Cancelled"
  ).length;

  const cancelledCount = bookings.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const filteredBookings = bookings.filter((item) => {
    if (filter === "Confirmed") {
      return item.status !== "Cancelled";
    }

    if (filter === "Cancelled") {
      return item.status === "Cancelled";
    }

    return true;
  });

  if (!bookings.length && !state) {
    return (
      <div className="my-bookings-page">
        <div className="booking-card">
          <h2>No Booking Found</h2>

          <p>
            You don't have any flight booking to display.
          </p>

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            Search Flights
          </button>
        </div>
      </div>
    );
  }

  const booking = selectedBooking;

  const totalPrice =
    parseInt(
      String(booking?.price || "0").replace(/[^\d]/g, ""),
      10
    ) || 0;

  const baseFare =
    Number(booking?.baseFare) ||
    Math.max(totalPrice - 350 - 199, 0);

  const seatFee =
    Number(booking?.seatFee) ||
    (booking?.selectedSeat ? 350 : 0);

  const convenienceFee =
    Number(booking?.convenienceFee) || 199;

  const totalFare =
    Number(booking?.price)
      ? totalPrice
      : baseFare + seatFee + convenienceFee;

  // Print / Save Ticket as PDF
  const handlePrintTicket = () => {
    window.print();
  };

  const handleCancelBooking = () => {
    if (!cancelReason) {
      alert("Please select a cancellation reason.");
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    const priceNumber =
      parseInt(
        String(booking.price).replace(/[^\d]/g, ""),
        10
      ) || 0;

    const cancellationFee = Math.round(
      priceNumber * 0.2
    );

    const refundAmount =
      priceNumber - cancellationFee;

    const updatedBooking = {
      ...booking,
      status: "Cancelled",
      cancellationReason: cancelReason,
      cancellationFee: `₹${cancellationFee}`,
      refundAmount: `₹${refundAmount}`,
      refundStatus: "Processing",
    };

    const updatedBookings = bookings.map((item) =>
      item.bookingId === booking.bookingId
        ? updatedBooking
        : item
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

    setBookings(updatedBookings);

    alert(
      `Booking cancelled successfully.\nRefund Amount: ₹${refundAmount}`
    );

    setShowCancelBox(false);
    setCancelReason("");
    setSelectedBookingId(updatedBooking.bookingId);
  };

  return (
    <div className="my-bookings-page">

      {/* Booking List */}
      <div className="booking-list">

        <h1>My Bookings</h1>

        {/* Booking Summary */}
        <div className="booking-summary">

          <div className="summary-box">
            <span>Total Bookings</span>
            <strong>{bookings.length}</strong>
          </div>

          <div className="summary-box">
            <span>Confirmed</span>
            <strong>{confirmedCount}</strong>
          </div>

          <div className="summary-box">
            <span>Cancelled</span>
            <strong>{cancelledCount}</strong>
          </div>

        </div>

        {/* Filter Buttons */}
        <div className="booking-filters">

          <button
            className={
              filter === "All"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={
              filter === "Confirmed"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("Confirmed")}
          >
            Confirmed
          </button>

          <button
            className={
              filter === "Cancelled"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("Cancelled")}
          >
            Cancelled
          </button>

        </div>

        {/* Booking Buttons */}
        {filteredBookings.length > 0 ? (
          filteredBookings.map((item) => (
            <button
              key={item.bookingId}
              className={
                item.bookingId === selectedBookingId
                  ? "booking-select-btn selected"
                  : "booking-select-btn"
              }
              onClick={() => {
                setSelectedBookingId(item.bookingId);
                setShowCancelBox(false);
                setCancelReason("");
              }}
            >
              {item.airline || "Flight"} —{" "}
              {item.from || "Mumbai"} →{" "}
              {item.to || "Delhi"}{" "}
              ({item.status || "Confirmed"})
            </button>
          ))
        ) : (
          <p className="no-filter-booking">
            No {filter.toLowerCase()} bookings found.
          </p>
        )}

      </div>

      {/* Selected Booking */}
      {booking && (
        <div className="booking-card">

          {/* Booking Header */}
          <div className="booking-header">

            <div>
              <h1>{booking.airline || "Flight"}</h1>
              <p>Flight Booking</p>
            </div>

            <span className="booking-status">
              {booking.status || "Confirmed"}
            </span>

          </div>

          {/* Booking ID */}
          <div className="booking-id-box">
            <span>Booking ID</span>
            <strong>
              {booking.bookingId || "Not Available"}
            </strong>
          </div>

          <hr />

          {/* Flight Route */}
          <div className="flight-route">

            <div>
              <h2>{booking.from || "Mumbai"}</h2>
              <p>Departure</p>
              <h3>{booking.departure || "Not Available"}</h3>
            </div>

            <div className="flight-arrow">
              ✈️
              <p>{booking.duration || "2h 10m"}</p>
              <span>Non Stop</span>
            </div>

            <div>
              <h2>{booking.to || "Delhi"}</h2>
              <p>Arrival</p>
              <h3>{booking.arrival || "Not Available"}</h3>
            </div>

          </div>

          {/* Booking Info */}
          <div className="booking-info">

            <div>
              <span>Date</span>
              <strong>
                {booking.date ||
                  booking.bookingDate ||
                  "Not Available"}
              </strong>
            </div>

            <div>
              <span>Travellers</span>
              <strong>
                {booking.travellers || 1}
              </strong>
            </div>

            <div>
              <span>Class</span>
              <strong>
                {booking.classType || "Economy"}
              </strong>
            </div>

            <div>
              <span>Seat</span>
              <strong>
                {booking.selectedSeat || "Not Selected"}
              </strong>
            </div>

            <div>
              <span>Aircraft</span>
              <strong>
                {booking.aircraft || "Not Available"}
              </strong>
            </div>

            <div>
              <span>Terminal</span>
              <strong>
                {booking.terminal || "Not Available"}
              </strong>
            </div>

            <div>
              <span>Gate</span>
              <strong>
                {booking.gate || "Not Available"}
              </strong>
            </div>

          </div>

          {/* Passenger Details */}
          <div className="passenger-section">

            <h2>Passenger Details</h2>

            <p>
              <strong>Name:</strong>{" "}
              {booking.name ||
                booking.passengerName ||
                "Passenger"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {booking.email || "Not Available"}
            </p>

            <p>
              <strong>Mobile:</strong>{" "}
              {booking.mobile || "Not Available"}
            </p>

            <p>
              <strong>Baggage:</strong>{" "}
              {booking.baggage || "Not Available"}
            </p>

            <p>
              <strong>Meal:</strong>{" "}
              {booking.meal || "Not Available"}
            </p>

          </div>

          {/* Fare Summary */}
          <div className="fare-summary">

            <h2>Fare Summary</h2>

            <div className="fare-row">
              <span>Base Fare</span>
              <span>₹{baseFare}</span>
            </div>

            <div className="fare-row">
              <span>
                Seat Fee
                {booking.selectedSeat
                  ? ` (${booking.selectedSeat})`
                  : ""}
              </span>

              <span>₹{seatFee}</span>
            </div>

            <div className="fare-row">
              <span>Convenience Fee</span>
              <span>₹{convenienceFee}</span>
            </div>

            <div className="fare-row total">
              <span>Total Amount</span>
              <span>₹{totalFare}</span>
            </div>

          </div>

          {/* Cancellation & Refund */}
          {booking.status === "Cancelled" && (
            <div className="refund-section">

              <h2>Cancellation & Refund</h2>

              <p>
                <strong>Reason:</strong>{" "}
                {booking.cancellationReason}
              </p>

              <p>
                <strong>Cancellation Fee:</strong>{" "}
                {booking.cancellationFee}
              </p>

              <p>
                <strong>Refund Amount:</strong>{" "}
                {booking.refundAmount}
              </p>

              <p>
                <strong>Refund Status:</strong>{" "}
                {booking.refundStatus}
              </p>

            </div>
          )}

          {/* Cancellation Box */}
          {showCancelBox &&
            booking.status !== "Cancelled" && (
              <div className="cancel-section">

                <h3>
                  Why are you cancelling?
                </h3>

                <select
                  value={cancelReason}
                  onChange={(e) =>
                    setCancelReason(e.target.value)
                  }
                >

                  <option value="">
                    Select cancellation reason
                  </option>

                  <option value="Change of travel plans">
                    Change of travel plans
                  </option>

                  <option value="Found another flight">
                    Found another flight
                  </option>

                  <option value="Change in schedule">
                    Change in schedule
                  </option>

                  <option value="Personal reasons">
                    Personal reasons
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

                <button
                  className="cancel-confirm-btn"
                  onClick={handleCancelBooking}
                >
                  Confirm Cancellation
                </button>

              </div>
            )}

          {/* Actions */}
          <div className="booking-actions">

            <button
              className="home-btn"
              onClick={() => navigate("/")}
            >
              Book Another Flight
            </button>

            <button
              className="details-btn"
              onClick={() =>
                navigate("/flightdetails", {
                  state: booking,
                })
              }
            >
              View Flight Details
            </button>

            {/* Print Ticket */}
            <button
              className="ticket-btn"
              onClick={handlePrintTicket}
            >
              🧾 Print / Save Ticket
            </button>

            {!showCancelBox &&
              booking.status !== "Cancelled" && (
                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowCancelBox(true)
                  }
                >
                  Cancel Booking
                </button>
              )}

          </div>

        </div>
      )}

    </div>
  );
}

export default MyBookings;