
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Package,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const result = login(
      formData.email.trim(),
      formData.password
    );

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="auth-page">

      {/* LEFT BRAND SECTION */}
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
              ADMIN CONTROL CENTER
            </span>

            <h1>
              Manage Your Store.
              <br />
              <span>Grow Your Business.</span>
            </h1>

            <p>
              Everything you need to manage products,
              inventory and store performance in one place.
            </p>
          </div>

          <div className="auth-brand-footer">
            <ShieldCheck size={17} />
            Secure Admin Workspace
          </div>

        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="auth-form-panel">

        <div className="auth-form-container">

          <div className="auth-mobile-logo">
            <div className="auth-logo-icon">
              <Package size={22} />
            </div>
            <strong>PRO SHOP</strong>
          </div>

          <div className="auth-heading">
            <span>WELCOME BACK</span>
            <h2>Login</h2>
            <p>
              Enter your account details to access your dashboard.
            </p>
          </div>

          {error && (
            <div className="auth-error-message">
              <AlertCircle size={17} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="auth-input-group">
              <label htmlFor="login-email">Email Address</label>

              <div className="auth-input-wrapper">
                <Mail size={18} />

                <input
                  id="login-email"
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

            <div className="auth-input-group">
              <label htmlFor="login-password">Password</label>

              <div className="auth-input-wrapper">
                <Lock size={18} />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
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
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login Now"}
              <ArrowRight size={18} />
            </button>

          </form>

          <div className="auth-switch-text">
            Don't have an account?
            <Link to="/signup">Sign Up</Link>
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

export default Login;
