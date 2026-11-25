
import { useState } from "react";
import { Outlet } from "react-router";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dashboard-layout responsive-dashboard">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      <main className="dashboard-main">
        <div className="mobile-menu-bar">
          <button
            className="mobile-menu-button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={23} />
          </button>

          <div className="mobile-menu-brand">
            <ShoppingBagIcon />
            <strong>PRO SHOP</strong>
          </div>
        </div>

        <Navbar />

        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function ShoppingBagIcon() {
  return <span className="mobile-brand-icon">P</span>;
}

export default DashboardLayout;
