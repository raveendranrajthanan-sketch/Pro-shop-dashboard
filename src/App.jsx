
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";

import DashboardLayout from "./components/DashboardLayout";

// Lazy loaded pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Categories = lazy(() => import("./pages/Categories"));
const Analytics = lazy(() => import("./pages/Analytics"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="page-loading">
          <div className="loading-spinner"></div>
          <p>Loading Dashboard...</p>
        </div>
      }
    >
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
