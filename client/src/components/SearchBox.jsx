import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/SearchBox.css";

function SearchBox() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please select From, To and Date.");
      return;
    }

    if (from.toLowerCase() === to.toLowerCase()) {
      alert("From and To cities cannot be same.");
      return;
    }

    const searchData = {
      from,
      to,
      date,
      passengers,
    };

    localStorage.setItem("flightSearch", JSON.stringify(searchData));

    navigate("/flightresults", {
      state: searchData,
    });
  };

  return (
    <div className="search-box">
      <h2>Search Flights</h2>

      <div className="search-fields">
        <div className="search-field">
          <label>From</label>
          <input
            type="text"
            placeholder="Enter departure city"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label>To</label>
          <input
            type="text"
            placeholder="Enter destination city"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label>Departure Date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label>Passengers</label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          >
            <option value="1">1 Passenger</option>
            <option value="2">2 Passengers</option>
            <option value="3">3 Passengers</option>
            <option value="4">4 Passengers</option>
            <option value="5">5 Passengers</option>
            <option value="6">6 Passengers</option>
            <option value="7">7 Passengers</option>
            <option value="8">8 Passengers</option>
            <option value="9">9 Passengers</option>
          </select>
        </div>

        <button className="search-button" onClick={handleSearch}>
          🔍 Search Flights
        </button>
      </div>
    </div>
  );
}

export default SearchBox;