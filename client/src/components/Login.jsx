import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const loggedInUser = userCredential.user;

      const savedUser =
        JSON.parse(localStorage.getItem("user")) || {};

      const updatedUser = {
        ...savedUser,
        email: loggedInUser.email,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          setMessage("Invalid email or password.");
          break;
        case "auth/user-not-found":
          setMessage("No account found. Please register first.");
          break;
        case "auth/wrong-password":
          setMessage("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setMessage("Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          setMessage("Too many attempts. Please try again later.");
          break;
        default:
          setMessage("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-container">
        <Link to="/" className="auth-brand">
          <span className="auth-brand-icon">✈</span>
          <span>
            <strong>MakeMyTrip</strong>
            <small>TRAVEL WITH CONFIDENCE</small>
          </span>
        </Link>

        <div className="auth-heading">
          <span className="auth-eyebrow">WELCOME BACK</span>
          <h1>Login to your account</h1>
          <p>Sign in to continue your journey with us.</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="auth-password-heading">
            <label htmlFor="login-password">Password</label>
          </div>

          <div className="auth-password-field">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="auth-show-password"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {message && (
            <p className="auth-message auth-message-error" role="alert">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
            {!loading && <span> →</span>}
          </button>
        </form>

        <div className="auth-divider">
          <span>YOUR NEXT JOURNEY STARTS HERE</span>
        </div>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Create account</Link>
        </p>

        <Link to="/" className="auth-home-link">
          ← Back to home
        </Link>

        <p className="auth-security-note">
          🔒 Your account details are securely handled by Firebase.
        </p>
      </section>
    </main>
  );
}

export default Login;