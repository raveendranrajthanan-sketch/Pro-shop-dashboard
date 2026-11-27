
import { useEffect, useState } from "react";
import {Search,Bell, Sun, Moon,ChevronDown, X,User,Settings,LogOut,Check,} from "lucide-react";
import { useNavigate } from "react-router";

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [darkMode]);

  const closePanels = () => {
    setNotificationOpen(false);
    setProfileOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    closePanels();
  };

  const toggleNotifications = () => {
    setNotificationOpen((prev) => !prev);
    setSearchOpen(false);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
    setSearchOpen(false);
    setNotificationOpen(false);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    closePanels();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    window.find(searchText);
  };

  const navigate = useNavigate();

    const handleLogout = () => {
      const confirmed = window.confirm("Are you sure you want to logout?");

      if (confirmed) {
        navigate("/dashboard");
        setProfileOpen(false);
        alert("Demo logout completed.");
      }
    };

  return (
    <header className="navbar-dashboard responsive-navbar">
      <div className="navbar-left">
        <div className="navbar-heading">
          <h3>Overview</h3>
          <p>Welcome back! Here's your store performance.</p>
        </div>
      </div>

      <div className="navbar-actions">
        {/* Search */}
        <button
          className="navbar-icon"
          aria-label="Search"
          onClick={toggleSearch}
          title="Search"
        >
          {searchOpen ? <X size={19} /> : <Search size={19} />}
        </button>

        {/* Notifications */}
        <button
          className="navbar-icon notification-button"
          aria-label="Notifications"
          onClick={toggleNotifications}
          title="Notifications"
        >
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        {/* Theme */}
        <button
          className="navbar-icon"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {darkMode ? <Moon size={19} /> : <Sun size={19} />}
        </button>

        <div className="navbar-divider"></div>

        {/* Profile */}
        <button
          className="profile-section"
          aria-label="Admin profile"
          onClick={toggleProfile}
        >
          <div className="profile-avatar">RR</div>

          <div className="profile-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown
            className="profile-chevron"
            size={17}
            style={{
              transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </button>

        {/* Search Panel */}
        {searchOpen && (
          <div className="navbar-popup search-popup">
            <form onSubmit={handleSearch}>
              <Search size={18} />
              <input
                type="search"
                placeholder="Search dashboard..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoFocus
              />
              <button type="submit">Search</button>
            </form>
          </div>
        )}

        {/* Notification Panel */}
        {notificationOpen && (
          <div className="navbar-popup notification-popup">
            <div className="popup-heading">
              <strong>Notifications</strong>
              <button
                onClick={() => setNotificationOpen(false)}
                aria-label="Close notifications"
              >
                <X size={17} />
              </button>
            </div>

            <div className="notification-item">
              <span className="notification-icon">
                <Check size={17} />
              </span>
              <div>
                <strong>Dashboard Ready</strong>
                <p>Your store dashboard is up to date.</p>
              </div>
            </div>

            <div className="notification-item">
              <span className="notification-icon">
                <Bell size={17} />
              </span>
              <div>
                <strong>Welcome Admin!</strong>
                <p>Welcome to your admin dashboard.</p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Dropdown */}
        {profileOpen && (
          <div className="navbar-popup profile-popup">
            <div className="profile-popup-header">
              <div className="profile-avatar">RR</div>
              <div>
                <strong>Admin User</strong>
                <p>Administrator</p>
              </div>
            </div>

            <button className="profile-menu-item"
              onClick={() => {
                navigate("/profile");
                setProfileOpen(false);
              }}
            >
              <User size={17} />
              My Profile
            </button>

            <button
              className="profile-menu-item"
              onClick={() => {
                navigate("/settings");
                setProfileOpen(false);
              }}
            >
              <Settings size={17} />
              Settings
            </button>

            <button
              className="profile-menu-item logout-item"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
