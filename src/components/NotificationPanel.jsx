
import { useEffect, useState } from "react";
import {
  Bell,
  X,
  AlertTriangle,
  PackageX,
  Check,
  CheckCheck,
  Trash2,
  RefreshCw,
  Package,
} from "lucide-react";

import { getProducts } from "../services/api";

const STORAGE_KEY = "pro-shop-notifications";

function NotificationPanel({ open, onClose, onUnreadCountChange }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load saved notification states
  const getSavedNotifications = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  };

  // Generate notifications from product data
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();
      const products = data.products || [];
      const saved = getSavedNotifications();

      const generated = [];

      products.forEach((product) => {
        if (product.stock === 0) {
          generated.push({
            id: `out-${product.id}`,
            type: "out",
            title: "Out of Stock",
            message: `${product.title} is currently out of stock.`,
            productId: product.id,
            read: saved[`out-${product.id}`]?.read || false,
            time: "Inventory alert",
          });
        } else if (product.stock <= 10) {
          generated.push({
            id: `low-${product.id}`,
            type: "low",
            title: "Low Stock Warning",
            message: `${product.title} has only ${product.stock} items remaining.`,
            productId: product.id,
            read: saved[`low-${product.id}`]?.read || false,
            time: "Inventory alert",
          });
        }
      });

      setNotifications(generated);
    } catch (err) {
      console.error("Notification Error:", err);
      setError("Unable to load notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load when popup opens
  useEffect(() => {
    if (open) {
      fetchNotifications();
    }
  }, [open]);

  // Update unread counter
  useEffect(() => {
    const unread = notifications.filter(
      (item) => !item.read
    ).length;

    onUnreadCountChange?.(unread);
  }, [notifications, onUnreadCountChange]);

  // Save read states
  const saveNotificationStates = (updated) => {
    const saved = {};

    updated.forEach((item) => {
      saved[item.id] = { read: item.read };
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(saved)
    );

    setNotifications(updated);
  };

  // Mark one as read
  const markAsRead = (id) => {
    const updated = notifications.map((item) =>
      item.id === id
        ? { ...item, read: true }
        : item
    );

    saveNotificationStates(updated);
  };

  // Mark all as read
  const markAllAsRead = () => {
    const updated = notifications.map((item) => ({
      ...item,
      read: true,
    }));

    saveNotificationStates(updated);
  };

  // Clear all notifications
  const clearAll = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    setNotifications([]);
  };

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  if (!open) return null;

  return (
    <div className="navbar-popup notification-popup advanced-notification-popup">

      {/* Header */}
      <div className="notification-header">
        <div>
          <h3>Notifications</h3>
          <span>
            {unreadCount} unread notifications
          </span>
        </div>

        <button
          className="notification-close"
          onClick={onClose}
          aria-label="Close notifications"
        >
          <X size={19} />
        </button>
      </div>

      {/* Actions */}
      <div className="notification-actions">
        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <CheckCheck size={15} />
          Mark all read
        </button>

        <button
          onClick={clearAll}
          disabled={notifications.length === 0}
        >
          <Trash2 size={15} />
          Clear all
        </button>
      </div>

      {/* Content */}
      <div className="notification-list">

        {loading ? (
          <div className="notification-empty">
            <RefreshCw size={25} className="notification-loader" />
            <p>Loading notifications...</p>
          </div>
        ) : error ? (
          <div className="notification-empty">
            <p>{error}</p>
            <button onClick={fetchNotifications}>
              Try Again
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="notification-empty">
            <Bell size={32} />
            <h4>You're all caught up!</h4>
            <p>No inventory alerts at the moment.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              className={`advanced-notification-item ${
                item.read ? "notification-read" : "notification-unread"
              }`}
              key={item.id}
            >
              <div
                className={`advanced-notification-icon ${
                  item.type === "out"
                    ? "notification-out-icon"
                    : "notification-low-icon"
                }`}
              >
                {item.type === "out" ? (
                  <PackageX size={19} />
                ) : (
                  <AlertTriangle size={19} />
                )}
              </div>

              <div className="advanced-notification-content">
                <div className="advanced-notification-title">
                  <strong>{item.title}</strong>
                  {!item.read && (
                    <span className="notification-unread-dot"></span>
                  )}
                </div>

                <p>{item.message}</p>

                <small>
                  <Package size={12} />
                  Product ID: {item.productId}
                  {" · "}
                  {item.time}
                </small>

                {!item.read && (
                  <button
                    className="notification-read-button"
                    onClick={() => markAsRead(item.id)}
                  >
                    <Check size={14} />
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))
        )}

      </div>

      {/* Footer */}
      <div className="notification-footer">
        <span>
          {notifications.length} inventory alerts
        </span>
      </div>

    </div>
  );
}

export default NotificationPanel;
