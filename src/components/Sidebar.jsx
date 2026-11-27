
import { NavLink } from "react-router";

import {
  LayoutDashboard,
  Package,
  Tags,
  ChartNoAxesCombined,
  Settings,
  ShoppingBag,
  Store,
  X,
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/products",
      icon: Package,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: Tags,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: ChartNoAxesCombined,
    },
  ];

  return (
    <>
      <aside
        className={`sidebar responsive-sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Sidebar Brand */}
        <div className="sidebar-brand">
          <div className="brand-icon">
            <ShoppingBag size={23} />
          </div>

          <div>
            <h4>PRO SHOP</h4>
            <span>ADMIN PANEL</span>
          </div>

          <button
            className="mobile-sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Main Menu */}
        <p className="sidebar-label">MAIN MENU</p>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                onClick={onClose}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Settings */}
        <div className="sidebar-bottom">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `sidebar-link settings-sidebar-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={onClose}
          >
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <Store size={18} />
          <span>Pro Shop Dashboard</span>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={onClose}
        />
      )}
    </>
  );
}

export default Sidebar;
