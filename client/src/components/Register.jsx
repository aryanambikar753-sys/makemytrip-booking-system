import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import "./styles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });

      setMessage("Registration successful! Your account has been created.");
      setMessageType("success");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("This email is already registered. Please login instead.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setMessage("Password must be at least 6 characters.");
      } else {
        setMessage(error.code + ": " + error.message);
      }

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-container">
        <Link to="/" className="register-brand">
          <span className="register-brand-icon">✈</span>
          <span>
            <strong>MakeMyTrip</strong>
            <small>TRAVEL WITH CONFIDENCE</small>
          </span>
        </Link>

        <div className="register-heading">
          <span className="register-eyebrow">JOIN OUR JOURNEY</span>
          <h1>Create your account</h1>
          <p>Sign up to make your next trip easier.</p>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <label htmlFor="register-name">Full name</label>
          <input
            id="register-name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="register-password">Password</label>
          <div className="register-password-field">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />

            <button
              type="button"
              className="register-show-password"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label htmlFor="register-confirm-password">
            Confirm password
          </label>
          <div className="register-password-field">
            <input
              id="register-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter your password again"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="register-show-password"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {message && (
            <p
              className={`register-message register-message-${messageType}`}
              role={messageType === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="register-submit-btn"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <span> →</span>}
          </button>
        </form>

        <div className="register-divider">
          <span>YOUR NEXT ADVENTURE AWAITS</span>
        </div>

        <p className="register-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <Link to="/" className="register-home-link">
          ← Back to home
        </Link>

        <p className="register-security-note">
          🔒 Your account is managed securely using Firebase.
        </p>
      </section>
    </main>
  );
}

export default Register;