
import {
  Search,
  Bell,
  Sun,
  ChevronDown,
} from "lucide-react";

function Navbar() {
  return (
    <header className="navbar-dashboard responsive-navbar">
      <div className="navbar-left">
        <div className="navbar-heading">
          <h3>Overview</h3>
          <p>Welcome back! Here's your store performance.</p>
        </div>
      </div>

      <div className="navbar-actions">
        <button className="navbar-icon" aria-label="Search">
          <Search size={19} />
        </button>

        <button
          className="navbar-icon notification-button"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        <button className="navbar-icon" aria-label="Theme">
          <Sun size={19} />
        </button>

        <div className="navbar-divider"></div>

        <button className="profile-section" aria-label="Admin profile">
          <div className="profile-avatar">RR</div>

          <div className="profile-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown className="profile-chevron" size={17} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
