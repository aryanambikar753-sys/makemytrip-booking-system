import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Payment.css";

function Payment() {
  const navigate = useNavigate();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const flight =
    JSON.parse(localStorage.getItem("selectedFlight")) || {};

  const selectedSeat =
    localStorage.getItem("selectedSeat") || "";

  const baseFare = Number(
    String(flight.price || "4299").replace(/[^\d]/g, "")
  );

  const seatFee = selectedSeat ? 350 : 0;
  const convenienceFee = 199;
  const totalFare = baseFare + seatFee + convenienceFee;

  const handlePayment = () => {
    const cleanCardNumber = cardNumber.replace(/\s/g, "");

    if (!cardName.trim() || !cleanCardNumber || !expiry || !cvv) {
      alert("Please fill all payment details.");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(cardName.trim())) {
      alert("Please enter a valid card holder name.");
      return;
    }

    if (!/^\d{16}$/.test(cleanCardNumber)) {
      alert("Card number must contain exactly 16 digits.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV must contain exactly 3 digits.");
      return;
    }

    const [year, month] = expiry.split("-").map(Number);
    const expiryDate = new Date(year, month, 1);
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    if (!year || !month || expiryDate <= currentMonth) {
      alert("Please enter a valid future expiry date.");
      return;
    }

    const passenger =
      JSON.parse(localStorage.getItem("passenger")) || {};

    const bookingId = "MMT" + Date.now();
    const bookingDate = new Date().toLocaleString();

    const booking = {
      bookingId,
      bookingDate,
      status: "Confirmed",
      passengerName: passenger.name || "Guest",
      email: passenger.email || "",
      mobile: passenger.mobile || "",
      airline: flight.airline || "IndiGo",
      from: flight.from || "Mumbai",
      to: flight.to || "Delhi",
      departure: flight.departure || "07:00 AM",
      arrival: flight.arrival || "09:10 AM",
      price: `₹${totalFare}`,
      baseFare: `₹${baseFare}`,
      seatFee: `₹${seatFee}`,
      convenienceFee: `₹${convenienceFee}`,
      selectedSeat: selectedSeat || "Not Selected",
    };

    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    const oldNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    const newNotifications = [
      {
        id: Date.now(),
        title: "Payment Successful",
        message: `Your payment of ₹${totalFare} for ${flight.airline || "IndiGo"} flight ${flight.from || "Mumbai"} → ${flight.to || "Delhi"} was successful.`,
        type: "success",
        read: false,
        date: bookingDate,
      },
      {
        id: Date.now() + 1,
        title: "Booking Confirmed",
        message: `Your flight booking ${bookingId} is confirmed. Seat: ${selectedSeat || "Not Selected"}.`,
        type: "success",
        read: false,
        date: bookingDate,
      },
    ];

    localStorage.setItem(
      "notifications",
      JSON.stringify([...newNotifications, ...oldNotifications])
    );

    window.dispatchEvent(new Event("notificationsUpdated"));

    navigate("/success");
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <div className="payment-icon">🔒</div>
          <p className="payment-eyebrow">SECURE CHECKOUT</p>
          <h2>Complete Your Payment</h2>
          <p className="payment-subtitle">
            Review your fare and enter your payment details.
          </p>
        </div>

        <div className="payment-layout">
          <section className="fare-summary">
            <div className="fare-heading">
              <div>
                <span className="section-label">YOUR BOOKING</span>
                <h3>Fare Summary</h3>
              </div>
              <span className="fare-badge">✈ Flight</span>
            </div>

            <div className="fare-row">
              <span>Base Fare</span>
              <span>₹{baseFare.toLocaleString("en-IN")}</span>
            </div>

            <div className="fare-row">
              <span>
                Seat Fee {selectedSeat && `(${selectedSeat})`}
              </span>
              <span>₹{seatFee.toLocaleString("en-IN")}</span>
            </div>

            <div className="fare-row">
              <span>Convenience Fee</span>
              <span>₹{convenienceFee.toLocaleString("en-IN")}</span>
            </div>

            <div className="fare-divider" />

            <div className="fare-total">
              <span>Total Fare</span>
              <strong>₹{totalFare.toLocaleString("en-IN")}</strong>
            </div>

            <div className="payment-security-note">
              <span>🛡️</span>
              <p>Your payment details are validated in this demo.</p>
            </div>
          </section>

          <section className="payment-card">
            <div className="payment-card-heading">
              <div>
                <span className="section-label">PAYMENT METHOD</span>
                <h3>Card Details</h3>
              </div>
              <span className="card-symbol">💳</span>
            </div>

            <form
              className="payment-form"
              onSubmit={(e) => {
                e.preventDefault();
                handlePayment();
              }}
            >
              <div className="payment-field">
                <label htmlFor="cardName">Cardholder Name</label>
                <input
                  id="cardName"
                  type="text"
                  placeholder="Name on card"
                  autoComplete="cc-name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>

              <div className="payment-field">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  id="cardNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="16-digit card number"
                  maxLength={16}
                  autoComplete="cc-number"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(e.target.value.replace(/\D/g, ""))
                  }
                  required
                />
              </div>

              <div className="payment-input-row">
                <div className="payment-field">
                  <label htmlFor="expiry">Expiry Date</label>
                  <input
                    id="expiry"
                    type="month"
                    autoComplete="cc-exp"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    required
                  />
                </div>

                <div className="payment-field">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    id="cvv"
                    type="password"
                    inputMode="numeric"
                    placeholder="3 digits"
                    maxLength={3}
                    autoComplete="cc-csc"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, ""))
                    }
                    required
                  />
                </div>
              </div>

              <button type="submit" className="pay-now-btn">
                Pay ₹{totalFare.toLocaleString("en-IN")}
                <span>→</span>
              </button>

              <button
                type="button"
                className="payment-back-btn"
                onClick={() => navigate("/seatselection")}
              >
                ← Back to Seat Selection
              </button>

              <p className="payment-demo-note">
                Demo checkout only — no real payment is processed.
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Payment;