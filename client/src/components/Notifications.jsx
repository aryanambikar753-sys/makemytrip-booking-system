import { useState } from "react";
import "./styles/Notifications.css";

function Notifications() {
  const defaultNotifications = [
    {
      id: 1,
      title: "Welcome to MakeMyTrip",
      message:
        "Your travel journey starts here. Explore flights and book your next trip.",
      type: "info",
      read: false,
      date: new Date().toLocaleString(),
    },
    {
      id: 2,
      title: "Payment Successful",
      message:
        "Your recent flight payment was successfully completed.",
      type: "success",
      read: false,
      date: new Date().toLocaleString(),
    },
    {
      id: 3,
      title: "Flight Reminder",
      message:
        "Remember to check your flight status before departure.",
      type: "warning",
      read: true,
      date: new Date().toLocaleString(),
    },
  ];

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultNotifications;
      }
    }

    localStorage.setItem(
      "notifications",
      JSON.stringify(defaultNotifications)
    );

    return defaultNotifications;
  });

  const saveNotifications = (updatedNotifications) => {
    setNotifications(updatedNotifications);

    localStorage.setItem(
      "notifications",
      JSON.stringify(updatedNotifications)
    );

    window.dispatchEvent(
      new Event("notificationsUpdated")
    );
  };

  const markAsRead = (id) => {
    const updated = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, read: true }
        : notification
    );

    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));

    saveNotifications(updated);
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(
      (notification) => notification.id !== id
    );

    saveNotifications(updated);
  };

  const clearAll = () => {
    saveNotifications([]);
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="notifications-page">
      <div className="notifications-container">

        {/* Header */}
        <div className="notifications-header">
          <div>
            <h2>🔔 Notifications</h2>

            <p>
              {unreadCount > 0
                ? `${unreadCount} unread notification${
                    unreadCount > 1 ? "s" : ""
                  }`
                : "You're all caught up"}
            </p>
          </div>

          {notifications.length > 0 && (
            <div className="notification-actions">
              <button onClick={markAllAsRead}>
                Mark All as Read
              </button>

              <button
                className="clear-btn"
                onClick={clearAll}
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {notifications.length === 0 ? (
          <div className="empty-notifications">
            <div className="empty-icon">🔔</div>

            <h3>No Notifications</h3>

            <p>
              You don't have any notifications right now.
            </p>
          </div>
        ) : (
          <div className="notification-list">

            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-card ${
                  !notification.read ? "unread" : ""
                }`}
              >

                {/* Icon */}
                <div className="notification-icon">
                  {notification.type === "success"
                    ? "✅"
                    : notification.type === "warning"
                    ? "⚠️"
                    : "ℹ️"}
                </div>

                {/* Content */}
                <div className="notification-content">

                  <div className="notification-title-row">
                    <h3>{notification.title}</h3>

                    {!notification.read && (
                      <span className="unread-dot"></span>
                    )}
                  </div>

                  <p>{notification.message}</p>

                  {/* Booking Details */}
                  {notification.bookingId && (
                    <div className="notification-booking-details">

                      <div>
                        <span>Booking ID</span>
                        <strong>
                          {notification.bookingId}
                        </strong>
                      </div>

                      {notification.amount && (
                        <div>
                          <span>Amount</span>
                          <strong>
                            {notification.amount}
                          </strong>
                        </div>
                      )}

                      {notification.route && (
                        <div>
                          <span>Route</span>
                          <strong>
                            {notification.route}
                          </strong>
                        </div>
                      )}

                      {notification.seat && (
                        <div>
                          <span>Seat</span>
                          <strong>
                            {notification.seat}
                          </strong>
                        </div>
                      )}
                    </div>
                  )}

                  <small>{notification.date}</small>

                  {/* Buttons */}
                  <div className="notification-buttons">

                    {!notification.read && (
                      <button
                        onClick={() =>
                          markAsRead(notification.id)
                        }
                      >
                        Mark as Read
                      </button>
                    )}

                    <button
                      className="delete-notification"
                      onClick={() =>
                        deleteNotification(notification.id)
                      }
                    >
                      Delete
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;