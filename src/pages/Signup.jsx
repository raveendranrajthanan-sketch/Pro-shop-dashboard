
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Package,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword } = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const result = signup(
      name.trim(),
      email.trim(),
      password
    );

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess("Account created successfully! Redirecting to login...");

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1200);
  };

  return (
    <div className="auth-page">

      {/* BRAND SECTION */}
      <div className="auth-brand-panel">
        <div className="auth-brand-content">

          <div className="auth-logo">
            <div className="auth-logo-icon">
              <Package size={25} />
            </div>

            <span>PRO<span>SHOP</span></span>
          </div>

          <div className="auth-brand-message">
            <span className="auth-brand-tag">
              JOIN THE ADMIN WORKSPACE
            </span>

            <h1>
              Start Managing.
              <br />
              <span>Build Something Great.</span>
            </h1>

            <p>
              Create your administrator account and access
              your store management workspace.
            </p>
          </div>

          <div className="auth-brand-footer">
            <ShieldCheck size={17} />
            Pro Shop Administration Portal
          </div>

        </div>
      </div>

      {/* SIGNUP FORM */}
      <div className="auth-form-panel">

        <div className="auth-form-container">

          <div className="auth-mobile-logo">
            <div className="auth-logo-icon">
              <Package size={22} />
            </div>
            <strong>PRO SHOP</strong>
          </div>

          <div className="auth-heading">
            <span>CREATE YOUR ACCOUNT</span>
            <h2>Sign Up</h2>
            <p>
              Enter your details to create your admin account.
            </p>
          </div>

          {error && (
            <div className="auth-error-message">
              <AlertCircle size={17} />
              {error}
            </div>
          )}

          {success && (
            <div className="auth-success-message">
              <CheckCircle2 size={17} />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">

            {/* NAME */}
            <div className="auth-input-group">
              <label htmlFor="signup-name">Full Name</label>

              <div className="auth-input-wrapper">
                <User size={18} />

                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="auth-input-group">
              <label htmlFor="signup-email">Email Address</label>

              <div className="auth-input-wrapper">
                <Mail size={18} />

                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="auth-input-group">
              <label htmlFor="signup-password">Password</label>

              <div className="auth-input-wrapper">
                <Lock size={18} />

                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="auth-input-group">
              <label htmlFor="signup-confirm-password">
                Confirm Password
              </label>

              <div className="auth-input-wrapper">
                <Lock size={18} />

                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading || !!success}
            >
              {loading ? "Creating Account..." : "Create Account"}
              <ArrowRight size={18} />
            </button>

          </form>

          <div className="auth-switch-text">
            Already have an account?
            <Link to="/login">Sign In</Link>
          </div>

          <div className="auth-bottom-note">
            <ShieldCheck size={15} />
            Pro Shop Dashboard · Admin Portal
          </div>

        </div>
      </div>

    </div>
  );
}

export default Signup;
