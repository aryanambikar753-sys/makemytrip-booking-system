import { useLocation, useNavigate } from "react-router-dom";
import "./styles/FlightResults.css";

function FlightResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchData =
    location.state ||
    JSON.parse(localStorage.getItem("flightSearch")) ||
    null;

  const flights = [
    {
      id: 1,
      airline: "IndiGo",
      from: "Mumbai",
      to: "Delhi",
      departure: "07:00 AM",
      arrival: "09:10 AM",
      duration: "2h 10m",
      price: "₹4,299",
      terminal: "T2",
      gate: "A12",
      baggage: "15 Kg Check-in + 7 Kg Cabin",
      meal: "Snack Included",
      aircraft: "Airbus A320",
    },
    {
      id: 2,
      airline: "Air India",
      from: "Mumbai",
      to: "Delhi",
      departure: "09:30 AM",
      arrival: "11:45 AM",
      duration: "2h 15m",
      price: "₹4,850",
      terminal: "T2",
      gate: "B05",
      baggage: "20 Kg Check-in + 7 Kg Cabin",
      meal: "Meal Included",
      aircraft: "Airbus A321",
    },
    {
      id: 3,
      airline: "Akasa Air",
      from: "Mumbai",
      to: "Delhi",
      departure: "01:15 PM",
      arrival: "03:25 PM",
      duration: "2h 10m",
      price: "₹4,120",
      terminal: "T1",
      gate: "C08",
      baggage: "15 Kg Check-in + 7 Kg Cabin",
      meal: "Available on Purchase",
      aircraft: "Boeing 737 MAX",
    },
    {
      id: 4,
      airline: "SpiceJet",
      from: "Mumbai",
      to: "Delhi",
      departure: "06:40 PM",
      arrival: "08:55 PM",
      duration: "2h 15m",
      price: "₹3,999",
      terminal: "T1",
      gate: "D03",
      baggage: "15 Kg Check-in + 7 Kg Cabin",
      meal: "Available on Purchase",
      aircraft: "Boeing 737",
    },
  ];

  if (!searchData) {
    return (
      <div className="flight-container">
        <h2 className="heading">Search Flights</h2>
        <p>Please go back to the home page and search for a flight.</p>

        <button
          className="book-btn"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    );
  }

  const filteredFlights = flights.filter(
    (flight) =>
      flight.from.toLowerCase() ===
        searchData.from.toLowerCase() &&
      flight.to.toLowerCase() ===
        searchData.to.toLowerCase()
  );

  return (
    <div className="flight-container">
      <h2 className="heading">
        Flights from {searchData.from} to {searchData.to}
      </h2>

      <p>
        Departure Date: {searchData.date}
      </p>

      <p>
        Passengers: {searchData.passengers || "1"}
      </p>

      {filteredFlights.length === 0 ? (
        <div>
          <h3>No Flights Available</h3>

          <p>
            No flights were found for the selected route.
          </p>

          <button
            className="book-btn"
            onClick={() => navigate("/")}
          >
            Search Again
          </button>
        </div>
      ) : (
        filteredFlights.map((flight) => (
          <div
            className="flight-card"
            key={flight.id}
          >
            <div className="flight-left">
              <h3>{flight.airline}</h3>

              <p className="route">
                {flight.from} → {flight.to}
              </p>

              <p>
                ✈️ {flight.aircraft}
              </p>
            </div>

            <div className="flight-middle">
              <div>
                <h3>{flight.departure}</h3>
                <span>Departure</span>
              </div>

              <div>
                <h3>{flight.duration}</h3>
                <small>Duration</small>
              </div>

              <div>
                <h3>{flight.arrival}</h3>
                <span>Arrival</span>
              </div>
            </div>

            <div className="flight-right">
              <h2>{flight.price}</h2>

              <p>
                🧳 {flight.baggage}
              </p>

              <p>
                🍴 {flight.meal}
              </p>

              <button
                className="book-btn"
                onClick={() =>
                  navigate("/flightdetails", {
                    state: {
                      ...flight,
                      date: searchData.date,
                      passengers:
                        searchData.passengers || "1",
                    },
                  })
                }
              >
                View Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FlightResults;