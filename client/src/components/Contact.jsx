import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Contact.css";

function Contact() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !message) {
      alert("Please fill all contact details.");
      return;
    }

    setSent(true);

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-icon">✈️</div>

        <h2>Contact Us</h2>

        <p className="contact-subtitle">
          Have a question? We’re here to help you with your travel plans.
        </p>

        {sent && (
          <p className="success-message">
            ✓ Message Sent Successfully!
          </p>
        )}

        <div className="contact-field">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="contact-field">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="contact-field">
          <label>Your Message</label>
          <textarea
            placeholder="Enter your message..."
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button className="send-btn" onClick={handleSubmit}>
          Send Message
        </button>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default Contact;