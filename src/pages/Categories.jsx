
import { useEffect, useMemo, useState } from "react";

import {Tags,Package,RefreshCw,Search,Smartphone,Shirt,Home,Sparkles,Car,Utensils,Laptop,Watch,Dumbbell,Baby,Gem,ShoppingBasket,CircleHelp,ArrowUpRight,Boxes,TrendingUp} from "lucide-react";

import { getProducts, getCategories } from "../services/api";
import { useSearchParams } from "react-router";

function Categories() {
  // URL Search Parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // States
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState(
    () => searchParams.get("search") || ""
  );

  // Fetch Categories and Products
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const [categoryData, productData] = await Promise.all([
        getCategories(),
        getProducts(),
      ]);

      setCategories(categoryData);
      setProducts(productData.products || []);
    } catch (err) {
      console.error("Categories API Error:", err);
      setError("Unable to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial Data Loading
  useEffect(() => {
    fetchCategories();
  }, []);

  // Sync Search with URL
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearch(urlSearch);
  }, [searchParams]);

  // Update Search
  const handleSearchChange = (value) => {
    setSearch(value);

    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  // Clear Search
  const clearSearch = () => {
    setSearch("");
    setSearchParams({});
  };

  // Category Product Count
  const getCategoryCount = (category) =>
    products.filter(
      (product) => product.category === category
    ).length;

  // Category Icons
  const getCategoryIcon = (category) => {
    const name = category.toLowerCase();

    if (name.includes("beauty") || name.includes("skin"))
      return Sparkles;

    if (name.includes("phone") || name.includes("mobile"))
      return Smartphone;

    if (name.includes("laptop") || name.includes("computer"))
      return Laptop;

    if (name.includes("fashion") || name.includes("shirt"))
      return Shirt;

    if (name.includes("home") || name.includes("furniture"))
      return Home;

    if (name.includes("food") || name.includes("groceries"))
      return ShoppingBasket;

    if (name.includes("vehicle") || name.includes("car"))
      return Car;

    if (name.includes("watch"))
      return Watch;

    if (name.includes("jewel"))
      return Gem;

    if (name.includes("sport") || name.includes("fitness"))
      return Dumbbell;

    if (name.includes("baby") || name.includes("toy"))
      return Baby;

    if (name.includes("kitchen"))
      return Utensils;

    return CircleHelp;
  };

  // Filter Categories
  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [categories, search]);

  // Largest Category
  const largestCategory = categories.reduce(
    (largest, category) =>
      getCategoryCount(category) > getCategoryCount(largest)
        ? category
        : largest,
    categories[0] || ""
  );

  // Format Category Name
  const formatCategory = (category) =>
    category
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");

  // Loading State
  if (loading) {
    return (
      <div className="categories-loading">
        <div className="categories-loader"></div>
        <h3>Loading Categories</h3>
        <p>Preparing your category dashboard...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="categories-error">
        <Package size={35} />
        <h3>Something went wrong</h3>
        <p>{error}</p>

        <button onClick={fetchCategories}>
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="categories-page premium-categories-page">

      {/* Page Header */}
      <div className="categories-hero">
        <div>
          <span className="categories-eyebrow">
            INVENTORY MANAGEMENT
          </span>

          <h2>Category Management</h2>

          <p>
            Organize, explore and monitor your entire product
            collection from one place.
          </p>
        </div>

        <button
          className="categories-refresh-btn"
          onClick={fetchCategories}
        >
          <RefreshCw size={16} />
          Refresh Data
        </button>
      </div>

      {/* Overview Cards */}
      <div className="category-stats-grid">

        {/* Total Categories */}
        <div className="category-stat-card">
          <div className="category-stat-icon purple">
            <Tags size={23} />
          </div>

          <div>
            <span>Total Categories</span>
            <h3>{categories.length}</h3>
            <small>Available collections</small>
          </div>

          <div className="category-stat-decoration">
            <Tags size={65} />
          </div>
        </div>

        {/* Total Products */}
        <div className="category-stat-card">
          <div className="category-stat-icon blue">
            <Boxes size={23} />
          </div>

          <div>
            <span>Total Products</span>
            <h3>{products.length}</h3>
            <small>Across all categories</small>
          </div>

          <div className="category-stat-decoration">
            <Boxes size={65} />
          </div>
        </div>

        {/* Largest Category */}
        <div className="category-stat-card">
          <div className="category-stat-icon green">
            <TrendingUp size={23} />
          </div>

          <div>
            <span>Largest Category</span>

            <h3 className="largest-category-value">
              {largestCategory
                ? formatCategory(largestCategory)
                : "N/A"}
            </h3>

            <small>
              {largestCategory
                ? `${getCategoryCount(largestCategory)} products`
                : "No data available"}
            </small>
          </div>

          <div className="category-stat-decoration">
            <TrendingUp size={65} />
          </div>
        </div>

      </div>

      {/* Category Section */}
      <div className="category-section">

        <div className="category-section-heading">
          <div>
            <h3>Explore Categories</h3>
            <p>Browse your store's product collections.</p>
          </div>

          <span className="category-total-badge">
            {filteredCategories.length} Collections
          </span>
        </div>

        {/* Category Search */}
        <div className="category-search-wrapper">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) =>
              handleSearchChange(e.target.value)
            }
          />

          {search && (
            <button onClick={clearSearch}>
              Clear
            </button>
          )}
        </div>

        {/* Category Cards */}
        <div className="premium-category-grid">

          {filteredCategories.length > 0 ? (

            filteredCategories.map((category, index) => {
              const Icon = getCategoryIcon(category);
              const count = getCategoryCount(category);

              const percentage =
                products.length > 0
                  ? Math.round(
                      (count / products.length) * 100
                    )
                  : 0;

              return (
                <div
                  className="premium-category-card"
                  key={category}
                >

                  <div className="premium-category-top">
                    <div
                      className={`premium-category-icon category-color-${index % 5}`}
                    >
                      <Icon size={25} />
                    </div>

                    <span className="premium-category-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="premium-category-content">
                    <span className="premium-category-label">
                      PRODUCT COLLECTION
                    </span>

                    <h3>{formatCategory(category)}</h3>

                    <div className="premium-category-count">
                      <Package size={16} />
                      <strong>{count}</strong>
                      <span>Products</span>
                    </div>
                  </div>

                  <div className="category-progress-area">
                    <div className="category-progress-info">
                      <span>Product Distribution</span>
                      <strong>{percentage}%</strong>
                    </div>

                    <div className="category-progress-track">
                      <div
                        className={`category-progress-fill category-color-${index % 5}`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="premium-category-footer">
                    <span>Collection Overview</span>
                    <ArrowUpRight size={18} />
                  </div>

                </div>
              );
            })

          ) : (

            <div className="category-empty-state">
              <Search size={35} />

              <h3>No categories found</h3>

              <p>
                Try searching with another category name.
              </p>

              <button onClick={clearSearch}>
                Clear Search
              </button>
            </div>

          )}

        </div>
      </div>
    </div>
  );
}

export default Categories;
