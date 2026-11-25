
import { useEffect, useState } from "react";

import {
  Package,
  Tags,
  Warehouse,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

import { getProducts, getCategories } from "../services/api.js";

import DashboardCard from "../components/DashboardCard.jsx";
import ProductTable from "../components/ProductTable.jsx";
import ChartCard from "../components/ChartCard.jsx";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productData, categoryData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      setProducts(productData.products || []);
      setCategories(categoryData || []);
    } catch (err) {
      console.error("Dashboard API Error:", err);
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalProducts = products.length;
  const totalCategories = categories.length;

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0
  );

  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock < 10
  ).length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "blue",
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: Tags,
      color: "purple",
    },
    {
      title: "Total Stock",
      value: totalStock.toLocaleString(),
      icon: Warehouse,
      color: "green",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      color: "orange",
    },
  ];

  if (loading) {
    return (
      <div className="loading-state">
        <RefreshCw className="loading-spinner" size={24} />
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <AlertTriangle size={25} />
        <p>{error}</p>

        <button onClick={fetchDashboardData}>
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-page responsive-dashboard-page">
      <div className="page-heading dashboard-page-heading">
        <div>
          <h2>Store Overview</h2>
          <p>Monitor your store performance at a glance.</p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchDashboardData}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="stats-grid responsive-stats-grid">
        {stats.map((item) => (
          <DashboardCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      <div className="dashboard-chart-section responsive-dashboard-section">
        <ChartCard products={products} />
      </div>

      <div className="dashboard-table-section responsive-dashboard-section">
        <ProductTable products={products.slice(0, 8)} />
      </div>
    </div>
  );
}

export default Dashboard;
