
import { useEffect, useMemo, useState } from "react";

import {
  Package,
  Tags,
  Warehouse,
  AlertTriangle,
  RefreshCw,
  PackageX,
  TrendingUp,
  Activity,
  CheckCircle2,
  Boxes,
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

  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalCategories = categories.length;

    const totalStock = products.reduce(
      (total, product) => total + Number(product.stock || 0),
      0
    );

    const lowStockProducts = products.filter(
      (product) => Number(product.stock) > 0 && Number(product.stock) <= 10
    );

    const outOfStockProducts = products.filter(
      (product) => Number(product.stock) === 0
    );

    const healthyProducts = products.filter(
      (product) => Number(product.stock) > 10
    );

    const averagePrice =
      totalProducts > 0
        ? products.reduce(
            (total, product) => total + Number(product.price || 0),
            0
          ) / totalProducts
        : 0;

    const inventoryHealth =
      totalProducts > 0
        ? Math.round((healthyProducts.length / totalProducts) * 100)
        : 0;

    return {
      totalProducts,
      totalCategories,
      totalStock,
      lowStock: lowStockProducts.length,
      outOfStock: outOfStockProducts.length,
      averagePrice,
      inventoryHealth,
      lowStockProducts,
      healthyProducts: healthyProducts.length,
    };
  }, [products, categories]);

  const stats = [
    {
      title: "Total Products",
      value: metrics.totalProducts,
      icon: Package,
      color: "blue",
    },
    {
      title: "Categories",
      value: metrics.totalCategories,
      icon: Tags,
      color: "purple",
    },
    {
      title: "Total Stock",
      value: metrics.totalStock.toLocaleString(),
      icon: Warehouse,
      color: "green",
    },
    {
      title: "Low Stock",
      value: metrics.lowStock,
      icon: AlertTriangle,
      color: "orange",
    },
  ];

  const categorySummary = categories.map((category) => {
    const categoryName =
      typeof category === "string"
        ? category
        : category.name || category.slug || "Other";

    const count = products.filter(
      (product) =>
        product.category?.toLowerCase() === categoryName.toLowerCase()
    ).length;

    return {
      name: categoryName,
      count,
    };
  });

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
    <div className="dashboard-page premium-dashboard">

      {/* PAGE HEADER */}
      <div className="page-heading dashboard-page-heading">
        <div>
          <span className="dashboard-eyebrow">
            <Activity size={14} />
            ADMIN CONTROL CENTER
          </span>

          <h2>Store Overview</h2>
          <p>
            Monitor your inventory, product performance and store health.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchDashboardData}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh Data
        </button>
      </div>

      {/* STATISTICS */}
      <div className="stats-grid responsive-stats-grid">
        {stats.map((item) => (
          <DashboardCard key={item.title} {...item} />
        ))}
      </div>

      {/* INVENTORY OVERVIEW */}
      <div className="inventory-overview-grid">

        <div className="inventory-overview-card">
          <div className="overview-card-heading">
            <div className="overview-icon blue-overview-icon">
              <Boxes size={20} />
            </div>

            <div>
              <h3>Inventory Health</h3>
              <p>Current product stock condition</p>
            </div>
          </div>

          <div className="inventory-health-number">
            <strong>{metrics.inventoryHealth}%</strong>
            <span>Healthy products</span>
          </div>

          <div className="inventory-progress-track">
            <div
              className="inventory-progress-fill"
              style={{ width: `${metrics.inventoryHealth}%` }}
            />
          </div>

          <div className="inventory-health-details">
            <span>
              <CheckCircle2 size={14} />
              Healthy: {metrics.healthyProducts}
            </span>

            <span>
              <AlertTriangle size={14} />
              Low: {metrics.lowStock}
            </span>

            <span>
              <PackageX size={14} />
              Out: {metrics.outOfStock}
            </span>
          </div>
        </div>

        <div className="inventory-overview-card">
          <div className="overview-card-heading">
            <div className="overview-icon purple-overview-icon">
              <TrendingUp size={20} />
            </div>

            <div>
              <h3>Product Insights</h3>
              <p>Overview of your product catalog</p>
            </div>
          </div>

          <div className="product-insight-value">
            Rs. {metrics.averagePrice.toLocaleString("en-LK", {
              maximumFractionDigits: 2,
            })}
          </div>

          <p className="product-insight-label">
            Average product price
          </p>

          <div className="product-insight-footer">
            <span>
              <Package size={15} />
              {metrics.totalProducts} products
            </span>

            <span>
              <Tags size={15} />
              {metrics.totalCategories} categories
            </span>
          </div>
        </div>

      </div>

      {/* CHART */}
      <div className="dashboard-chart-section responsive-dashboard-section">
        <ChartCard products={products} />
      </div>

      {/* CATEGORY SUMMARY */}
      <div className="dashboard-extra-grid">

        <div className="dashboard-extra-card">
          <div className="dashboard-section-heading">
            <div>
              <h3>Category Overview</h3>
              <p>Products grouped by category</p>
            </div>

            <Tags size={19} />
          </div>

          <div className="category-summary-list">
            {categorySummary.map((category) => (
              <div className="category-summary-item" key={category.name}>
                <div>
                  <span>{category.name}</span>
                  <strong>{category.count}</strong>
                </div>

                <div className="category-summary-track">
                  <div
                    className="category-summary-fill"
                    style={{
                      width: `${
                        metrics.totalProducts > 0
                          ? (category.count / metrics.totalProducts) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}

            {categorySummary.length === 0 && (
              <p className="dashboard-no-data">
                No category data available.
              </p>
            )}
          </div>
        </div>

        {/* LOW STOCK ALERTS */}
        <div className="dashboard-extra-card">
          <div className="dashboard-section-heading">
            <div>
              <h3>Low Stock Alerts</h3>
              <p>Products that need attention</p>
            </div>

            <AlertTriangle size={19} />
          </div>

          <div className="low-stock-list">
            {metrics.lowStockProducts.slice(0, 5).map((product) => (
              <div className="low-stock-item" key={product.id}>
                <div className="low-stock-product-icon">
                  <Package size={17} />
                </div>

                <div className="low-stock-product-info">
                  <strong>{product.title}</strong>
                  <span>Product ID: {product.id}</span>
                </div>

                <span className="low-stock-quantity">
                  {product.stock} left
                </span>
              </div>
            ))}

            {metrics.lowStockProducts.length === 0 && (
              <div className="dashboard-no-alerts">
                <CheckCircle2 size={25} />
                <p>All products have sufficient stock!</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* PRODUCT TABLE */}
      <div className="dashboard-table-section responsive-dashboard-section">
        <ProductTable products={products.slice(0, 8)} />
      </div>

      {/* DASHBOARD FOOTER */}
      <div className="dashboard-data-footer">
        <span>
          <Activity size={13} />
          Dashboard connected to DummyJSON API
        </span>

        <span>
          <CheckCircle2 size={13} />
          Data loaded successfully
        </span>
      </div>

    </div>
  );
}

export default Dashboard;
