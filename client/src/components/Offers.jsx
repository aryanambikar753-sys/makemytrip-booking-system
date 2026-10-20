import "./styles/Offers.css";

function Offers() {
  return (
    <div className="offers">
      <h2>Offers</h2>

      <div className="offer-cards">
        <div className="card">
          <h3>Flights</h3>
          <p>Up to ₹2000 OFF</p>
        </div>

        <div className="card">
          <h3>Hotels</h3>
          <p>Flat 40% OFF</p>
        </div>

        <div className="card">
          <h3>Trains</h3>
          <p>Save up to ₹500</p>
        </div>
      </div>
    </div>
  );
}

export default Offers;