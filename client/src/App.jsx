import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBox from "./components/SearchBox";
import FlightResults from "./components/FlightResults";
import FlightDetails from "./components/FlightDetails";
import Offers from "./components/Offers";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import PassengerDetails from "./components/PassengerDetails";
import Payment from "./components/Payment";
import Success from "./components/Success";
import MyBookings from "./components/MyBookings";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import Review from "./components/Review";
import SeatSelection from "./components/SeatSelection";
import Recommendations from "./components/Recommendations";
import FlightStatus from "./components/FlightStatus";
import Notifications from "./components/Notifications";

function Home() {
  const [searchData, setSearchData] = useState(null);

  const recommendedFlights = [
    {
      airline: "IndiGo",
      from: "Mumbai",
      to: "Delhi",
      price: "₹4,299",
      time: "07:00 AM - 09:10 AM",
    },
    {
      airline: "Air India",
      from: "Pune",
      to: "Bangalore",
      price: "₹5,199",
      time: "10:30 AM - 12:20 PM",
    },
    {
      airline: "Akasa Air",
      from: "Mumbai",
      to: "Goa",
      price: "₹3,499",
      time: "02:00 PM - 03:10 PM",
    },
  ];

  const flightStatuses = [
    {
      flightNumber: "6E101",
      airline: "IndiGo",
      route: "Mumbai → Delhi",
      status: "On Time",
    },
    {
      flightNumber: "AI202",
      airline: "Air India",
      route: "Delhi → Mumbai",
      status: "Boarding",
    },
    {
      flightNumber: "UK303",
      airline: "Vistara",
      route: "Pune → Delhi",
      status: "Delayed",
    },
  ];

  return (
    <>
      <Navbar />

      <Hero />

      <SearchBox onSearch={setSearchData} />

      {searchData && <FlightResults searchData={searchData} />}

      {/* Recommended Flights */}
      <section className="home-recommendations">
        <div className="home-section-header">
          <h2>✨ Recommended Flights for You</h2>

          <Link to="/recommendations">
            View All Recommendations →
          </Link>
        </div>

        <div className="home-recommendation-grid">
          {recommendedFlights.map((flight, index) => (
            <div className="home-flight-card" key={index}>
              <h3>{flight.airline}</h3>

              <p className="home-flight-route">
                {flight.from} → {flight.to}
              </p>

              <p>{flight.time}</p>

              <strong>{flight.price}</strong>

              <Link
                to="/flightdetails"
                state={{
                  ...flight,
                  date: new Date().toLocaleDateString(),
                  passengers: 1,
                }}
              >
                View Flight
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Flight Status */}
      <section className="home-flight-status">
        <div className="home-section-header">
          <h2>✈️ Flight Status</h2>

          <Link to="/flightstatus">
            Check Flight Status →
          </Link>
        </div>

        <div className="home-status-grid">
          {flightStatuses.map((flight, index) => (
            <div className="home-status-card" key={index}>
              <h3>{flight.flightNumber}</h3>

              <p>{flight.airline}</p>

              <p>{flight.route}</p>

              <span
                className={`status-${flight.status
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {flight.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Offers />

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Flight Search & Booking */}
        <Route path="/flightresults" element={<FlightResults />} />
        <Route path="/flightdetails" element={<FlightDetails />} />
        <Route path="/passenger" element={<PassengerDetails />} />
        <Route path="/seatselection" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />

        {/* User */}
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Review />} />

        {/* Flight Features */}
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/flightstatus" element={<FlightStatus />} />

        {/* Notifications */}
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;