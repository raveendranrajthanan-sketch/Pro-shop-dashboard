
import { useEffect, useState } from "react";

import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Monitor,
  Palette,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

const THEME_KEY = "dashboard-theme";
const NOTIFICATION_KEY = "pro-shop-notifications-enabled";

function Settings() {
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem(THEME_KEY) === "dark" ||
      document.body.classList.contains("dark-mode")
    );
  });

  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem(NOTIFICATION_KEY) !== "false";
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  const changeTheme = () => {
    setDarkMode((previous) => !previous);
    setSaved(false);
  };

  const changeNotifications = (enabled) => {
    setNotifications(enabled);
    localStorage.setItem(
      NOTIFICATION_KEY,
      enabled ? "true" : "false"
    );
    setSaved(true);
  };

  const resetSettings = () => {
    const defaultTheme = "light";
    const defaultNotifications = true;

    setDarkMode(false);
    setNotifications(defaultNotifications);

    localStorage.setItem(THEME_KEY, defaultTheme);
    localStorage.setItem(NOTIFICATION_KEY, "true");

    setSaved(true);
  };

  return (
    <div className="dashboard-content premium-settings">

      {/* HEADER */}
      <div className="page-heading settings-page-heading">
        <div>
          <span className="settings-eyebrow">
            <SettingsIcon size={14} />
            PREFERENCES & CONFIGURATION
          </span>

          <h2>Settings</h2>

          <p>
            Manage your dashboard appearance and notification preferences.
          </p>
        </div>

        <div className="settings-status">
          <CheckCircle2 size={16} />
          Preferences
        </div>
      </div>

      {/* SETTINGS CONTENT */}
      <div className="settings-layout">

        <div className="settings-main">

          {/* APPEARANCE */}
          <section className="settings-page-card">
            <div className="settings-card-heading">
              <div className="settings-heading-icon appearance-icon">
                <Palette size={20} />
              </div>

              <div>
                <h3>Appearance</h3>
                <p>Customize how your dashboard looks.</p>
              </div>
            </div>

            <div className="settings-option">
              <div className="settings-option-info">
                <div className="settings-option-icon">
                  {darkMode ? (
                    <Moon size={19} />
                  ) : (
                    <Sun size={19} />
                  )}
                </div>

                <div>
                  <strong>Dark Mode</strong>
                  <p>
                    Switch between light and dark dashboard themes.
                  </p>
                </div>
              </div>

              <button
                className={`settings-theme-button ${
                  darkMode ? "theme-active" : ""
                }`}
                onClick={changeTheme}
              >
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                {darkMode ? "Dark" : "Light"}
              </button>
            </div>

            <div className="settings-current-theme">
              <Monitor size={15} />
              Current appearance: {darkMode ? "Dark Mode" : "Light Mode"}
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <section className="settings-page-card">
            <div className="settings-card-heading">
              <div className="settings-heading-icon notification-setting-icon">
                <Bell size={20} />
              </div>

              <div>
                <h3>Notifications</h3>
                <p>Manage your dashboard notification preference.</p>
              </div>
            </div>

            <div className="settings-option">
              <div className="settings-option-info">
                <div className="settings-option-icon">
                  <Bell size={19} />
                </div>

                <div>
                  <strong>Enable Notifications</strong>
                  <p>
                    Save your preference for inventory notifications.
                  </p>
                </div>
              </div>

              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(event) =>
                    changeNotifications(event.target.checked)
                  }
                />

                <span className="settings-switch-slider"></span>
              </label>
            </div>

            <div className="settings-preference-status">
              <span
                className={`settings-status-dot ${
                  notifications ? "status-enabled" : "status-disabled"
                }`}
              />

              Notifications preference:{" "}
              {notifications ? "Enabled" : "Disabled"}
            </div>
          </section>

          {/* SECURITY */}
          <section className="settings-page-card">
            <div className="settings-card-heading">
              <div className="settings-heading-icon security-setting-icon">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h3>Security & Privacy</h3>
                <p>Information about your dashboard preferences.</p>
              </div>
            </div>

            <div className="settings-security-info">
              <ShieldCheck size={19} />

              <div>
                <strong>Local Preferences</strong>
                <p>
                  Your appearance and notification preferences are
                  stored in this browser using localStorage.
                </p>
              </div>
            </div>
          </section>

          {/* RESET */}
          <section className="settings-reset-card">
            <div>
              <h3>Reset Preferences</h3>
              <p>
                Restore the default light theme and enable notifications.
              </p>
            </div>

            <button
              className="settings-reset-button"
              onClick={resetSettings}
            >
              <RotateCcw size={16} />
              Reset Settings
            </button>
          </section>

          {saved && (
            <div className="settings-saved-message">
              <CheckCircle2 size={16} />
              Preference saved successfully.
            </div>
          )}

        </div>

        {/* SIDE INFORMATION */}
        <aside className="settings-sidebar-card">
          <div className="settings-sidebar-icon">
            <SettingsIcon size={27} />
          </div>

          <h3>Dashboard Preferences</h3>

          <p>
            Personalize your Pro Shop Dashboard to make your
            administration experience easier.
          </p>

          <div className="settings-sidebar-divider"></div>

          <div className="settings-sidebar-detail">
            <span>Appearance</span>
            <strong>{darkMode ? "Dark" : "Light"}</strong>
          </div>

          <div className="settings-sidebar-detail">
            <span>Notifications</span>
            <strong>{notifications ? "Enabled" : "Disabled"}</strong>
          </div>

          <div className="settings-sidebar-footer">
            <CheckCircle2 size={15} />
            Settings are stored locally
          </div>
        </aside>

      </div>
    </div>
  );
}

export default Settings;
