
import { Settings as SettingsIcon, Moon, Sun, Bell } from "lucide-react";
import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  const changeTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.body.classList.toggle("dark-mode", next);
    localStorage.setItem("dashboardTheme", next ? "dark" : "light");
  };

  return (
    <div className="dashboard-content">
      <div className="page-heading">
        <div>
          <h2>Settings</h2>
          <p>Customize your dashboard preferences.</p>
        </div>
      </div>

      <div className="settings-page-card">
        <h3><SettingsIcon size={20} /> General Settings</h3>

        <div className="settings-option">
          <div>
            <strong>Dark Mode</strong>
            <p>Change dashboard appearance.</p>
          </div>
          <button onClick={changeTheme}>
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            {darkMode ? "Dark" : "Light"}
          </button>
        </div>

        <div className="settings-option">
          <div>
            <strong>Notifications</strong>
            <p>Enable or disable dashboard notifications.</p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
