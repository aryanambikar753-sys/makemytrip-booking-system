import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./styles/Navbar.css";

function Navbar() {
  const user = auth.currentUser;

  const [unreadCount, setUnreadCount] = useState(() => {
    const notifications =
      JSON.parse(localStorage.getItem("notifications") || "[]");

    return notifications.filter(
      (notification) => !notification.read
    ).length;
  });

  useEffect(() => {
    const updateUnreadCount = () => {
      const notifications =
        JSON.parse(localStorage.getItem("notifications") || "[]");

      const unread = notifications.filter(
        (notification) => !notification.read
      ).length;

      setUnreadCount(unread);
    };

    updateUnreadCount();

    window.addEventListener(
      "notificationsUpdated",
      updateUnreadCount
    );

    window.addEventListener(
      "storage",
      updateUnreadCount
    );

    return () => {
      window.removeEventListener(
        "notificationsUpdated",
        updateUnreadCount
      );

      window.removeEventListener(
        "storage",
        updateUnreadCount
      );
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("user");
      localStorage.removeItem("passenger");

      alert("Logout Successful");

      window.location.href = "/";
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        MakeMyTrip
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        <span>Flights</span>
        <span>Hotels</span>
        <span>Trains</span>
        <span>Buses</span>

        <Link to="/mybookings">
          My Bookings
        </Link>

        <Link
          to="/notifications"
          className="notification-link"
        >
          🔔 Notifications

          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount}
            </span>
          )}
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <Link to="/contact">
          Contact
        </Link>
      </div>

      <div className="navbar-buttons">
        {user ? (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="register-btn">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;