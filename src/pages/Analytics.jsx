
import { useEffect, useMemo, useState } from "react";
import {
  Package,
  Layers,
  DollarSign,
  TrendingUp,
  Boxes,
  AlertTriangle,
  ShoppingBag,
  RefreshCw,
  BarChart3,
  Award,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { getProducts, getCategories } from "../services/api.js";

const COLORS = [
  "#6366f1",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
  "#f97316",
];

function Analytics() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
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
      console.error(err);
      setError("Unable to load analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const analytics = useMemo(() => {
    const totalProducts = products.length;

    const catalogValue = products.reduce(
      (total, product) => total + Number(product.price || 0),
      0
    );

    const averagePrice = totalProducts
      ? catalogValue / totalProducts
      : 0;

    const totalStock = products.reduce(
      (total, product) => total + Number(product.stock || 0),
      0
    );

    const lowStock = products.filter(
      (product) => product.stock > 0 && product.stock < 10
    ).length;

    const outOfStock = products.filter(
      (product) => product.stock === 0
    ).length;

    const inStock = products.filter(
      (product) => product.stock >= 10
    ).length;

    return {
      totalProducts,
      catalogValue,
      averagePrice,
      totalStock,
      lowStock,
      outOfStock,
      inStock,
    };
  }, [products]);

  const categoryData = useMemo(() => {
    return categories
      .map((category) => ({
        name: category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        products: products.filter(
          (product) => product.category === category
        ).length,
      }))
      .sort((a, b) => b.products - a.products);
  }, [categories, products]);

  const stockData = [
    { name: "In Stock", value: analytics.inStock },
    { name: "Low Stock", value: analytics.lowStock },
    { name: "Out of Stock", value: analytics.outOfStock },
  ];

  const stockColors = ["#10b981", "#f59e0b", "#ef4444"];

  const topProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
  }, [products]);

  const formatMoney = (value) =>
    `$${Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="analytics-spinner"></div>
        <h3>Preparing Analytics</h3>
        <p>Collecting your store performance data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-error">
        <BarChart3 size={35} />
        <h3>Analytics unavailable</h3>
        <p>{error}</p>
        <button onClick={fetchAnalytics}>
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="analytics-page premium-analytics">
      {/* Header */}
      <div className="analytics-hero">
        <div>
          <span className="analytics-eyebrow">
            BUSINESS INTELLIGENCE
          </span>
          <h2>Analytics Overview</h2>
          <p>
            Track inventory performance and discover insights
            about your product catalog.
          </p>
        </div>

        <button
          className="analytics-refresh-btn"
          onClick={fetchAnalytics}
        >
          <RefreshCw size={16} />
          Refresh Data
        </button>
      </div>

      {/* Main Statistics */}
      <div className="analytics-stats-grid">
        <div className="analytics-stat-card">
          <div className="analytics-stat-top">
            <div className="analytics-stat-icon purple">
              <Package size={22} />
            </div>
            <span className="analytics-stat-tag">PRODUCTS</span>
          </div>
          <h3>{analytics.totalProducts}</h3>
          <p>Total Products</p>
          <small>Products available in catalog</small>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-top">
            <div className="analytics-stat-icon blue">
              <Layers size={22} />
            </div>
            <span className="analytics-stat-tag">CATEGORIES</span>
          </div>
          <h3>{categories.length}</h3>
          <p>Total Categories</p>
          <small>Product collection groups</small>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-top">
            <div className="analytics-stat-icon green">
              <DollarSign size={22} />
            </div>
            <span className="analytics-stat-tag">CATALOG VALUE</span>
          </div>
          <h3>{formatMoney(analytics.catalogValue)}</h3>
          <p>Total Product Value</p>
          <small>Sum of listed product prices</small>
        </div>

        <div className="analytics-stat-card">
          <div className="analytics-stat-top">
            <div className="analytics-stat-icon orange">
              <TrendingUp size={22} />
            </div>
            <span className="analytics-stat-tag">AVERAGE</span>
          </div>
          <h3>{formatMoney(analytics.averagePrice)}</h3>
          <p>Average Product Price</p>
          <small>Average listed price per product</small>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="analytics-inventory-strip">
        <div>
          <div className="inventory-strip-icon">
            <Boxes size={21} />
          </div>
          <section>
            <span>Total Stock Units</span>
            <strong>{analytics.totalStock.toLocaleString()}</strong>
          </section>
        </div>

        <div>
          <div className="inventory-strip-icon green">
            <ShoppingBag size={21} />
          </div>
          <section>
            <span>In Stock</span>
            <strong>{analytics.inStock}</strong>
          </section>
        </div>

        <div>
          <div className="inventory-strip-icon orange">
            <AlertTriangle size={21} />
          </div>
          <section>
            <span>Low Stock</span>
            <strong>{analytics.lowStock}</strong>
          </section>
        </div>

        <div>
          <div className="inventory-strip-icon red">
            <Package size={21} />
          </div>
          <section>
            <span>Out of Stock</span>
            <strong>{analytics.outOfStock}</strong>
          </section>
        </div>
      </div>

      {/* Charts */}
      <div className="analytics-chart-grid">
        <div className="analytics-panel category-analytics-panel">
          <div className="analytics-panel-heading">
            <div>
              <h3>Category Performance</h3>
              <p>Number of products in each category</p>
            </div>
            <div className="analytics-heading-icon">
              <BarChart3 size={20} />
            </div>
          </div>

          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 15, right: 10, left: -15, bottom: 55 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#edf0f5"
                />
                <XAxis
                  dataKey="name"
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  tick={{ fill: "#8994a6", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#8994a6", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#f5f5ff" }}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #edf0f5",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="products"
                  name="Products"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-panel stock-analytics-panel">
          <div className="analytics-panel-heading">
            <div>
              <h3>Stock Distribution</h3>
              <p>Current inventory status</p>
            </div>
            <div className="analytics-heading-icon">
              <Boxes size={20} />
            </div>
          </div>

          <div className="stock-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="48%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {stockData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={stockColors[index]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #edf0f5",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="stock-chart-center">
              <strong>{analytics.totalProducts}</strong>
              <span>Products</span>
            </div>
          </div>

          <div className="stock-chart-legend">
            {stockData.map((item, index) => (
              <div key={item.name}>
                <span
                  className="stock-legend-dot"
                  style={{ background: stockColors[index] }}
                ></span>
                <span>{item.name}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="analytics-panel top-products-panel">
        <div className="analytics-panel-heading">
          <div>
            <h3>Top 5 Premium Products</h3>
            <p>Products with the highest listed prices</p>
          </div>
          <div className="analytics-heading-icon gold">
            <Award size={20} />
          </div>
        </div>

        <div className="top-products-list">
          {topProducts.map((product, index) => (
            <div className="top-product-row" key={product.id}>
              <span className="top-product-rank">
                {String(index + 1).padStart(2, "0")}
              </span>

              <img
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
              />

              <div className="top-product-info">
                <strong>{product.title}</strong>
                <span>
                  {product.brand || "Unknown Brand"} · {product.category}
                </span>
              </div>

              <div className="top-product-price">
                {formatMoney(product.price)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-disclaimer">
        <BarChart3 size={16} />
        <p>
          Analytics are calculated from the DummyJSON product catalog.
          Product value is not actual sales revenue, and stock figures
          represent listed inventory quantities.
        </p>
      </div>
    </div>
  );
}

export default Analytics;
