
import { useEffect, useMemo, useRef, useState } from "react";
import {Search,Bell,Sun,Moon,ChevronDown,X,User,Settings,LogOut,Check,Package,Tags,LoaderCircle,} from "lucide-react";

import { useNavigate } from "react-router";
import { getProducts, getCategories } from "../services/api";

function Navbar() {
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    () =>
      localStorage.getItem("dashboard-theme") === "dark" ||
      document.body.classList.contains("dark-mode")
  );

  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  // DARK MODE
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem(
      "dashboard-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // LOAD SEARCH DATA
  useEffect(() => {
    if (!searchOpen) return;

    let active = true;

    const loadSearchData = async () => {
      try {
        setSearchLoading(true);
        setSearchError("");

        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        if (!active) return;

        setProducts(productData.products || []);
        setCategories(categoryData || []);
      } catch (error) {
        if (active) {
          setSearchError("Unable to load search data. Please try again.");
        }
      } finally {
        if (active) {
          setSearchLoading(false);
        }
      }
    };

    loadSearchData();

    return () => {
      active = false;
    };
  }, [searchOpen]);

  // OUTSIDE CLICK AND ESCAPE KEY
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
        setNotificationOpen(false);
        setProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // CLOSE OTHER POPUPS
  const closePanels = () => {
    setNotificationOpen(false);
    setProfileOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    closePanels();
  };

  const toggleNotifications = () => {
    setNotificationOpen((prev) => !prev);
    setSearchOpen(false);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
    setSearchOpen(false);
    setNotificationOpen(false);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    closePanels();
  };

  // GLOBAL SEARCH RESULTS
  const searchResults = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return { products: [], categories: [] };
    }

    const matchedProducts = products
      .filter((product) =>
        [
          product.title,
          product.brand,
          product.category,
          product.description,
          String(product.id),
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(query)
          )
      )
      .slice(0, 5);

    const matchedCategories = categories
      .filter((category) =>
        String(category).toLowerCase().includes(query)
      )
      .slice(0, 4);

    return {
      products: matchedProducts,
      categories: matchedCategories,
    };
  }, [searchText, products, categories]);

  // SEARCH SUBMIT
  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();
    if (!query) return;

    setSearchOpen(false);
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const openProductSearch = (product) => {
    setSearchOpen(false);
    navigate(
      `/products?search=${encodeURIComponent(product.title)}`
    );
  };

  const openCategorySearch = (category) => {
    setSearchOpen(false);
    navigate(
      `/categories?search=${encodeURIComponent(category)}`
    );
  };

  // LOGOUT DEMO
  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmed) {
      navigate("/dashboard");
      setProfileOpen(false);
      alert("Demo logout completed.");
    }
  };

  return (
    <header
      ref={navbarRef}
      className="navbar-dashboard responsive-navbar"
    >
      <div className="navbar-left">
        <div className="navbar-heading">
          <h3>Overview</h3>
          <p>Welcome back! Here's your store performance.</p>
        </div>
      </div>

      <div className="navbar-actions">
        {/* SEARCH BUTTON */}
        <button
          className="navbar-icon"
          aria-label="Search"
          onClick={toggleSearch}
          title="Search"
        >
          {searchOpen ? <X size={19} /> : <Search size={19} />}
        </button>

        {/* NOTIFICATIONS BUTTON */}
        <button
          className="navbar-icon notification-button"
          aria-label="Notifications"
          onClick={toggleNotifications}
          title="Notifications"
        >
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        {/* THEME BUTTON */}
        <button
          className="navbar-icon"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {darkMode ? <Moon size={19} /> : <Sun size={19} />}
        </button>

        <div className="navbar-divider"></div>

        {/* PROFILE BUTTON */}
        <button
          className="profile-section"
          aria-label="Admin profile"
          onClick={toggleProfile}
        >
          <div className="profile-avatar">RR</div>

          <div className="profile-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown
            className="profile-chevron"
            size={17}
            style={{
              transform: profileOpen
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </button>

        {/* GLOBAL SEARCH POPUP */}
        {searchOpen && (
          <div className="navbar-popup search-popup global-search-popup">
            <form onSubmit={handleSearch}>
              <Search size={19} />

              <input
                type="search"
                placeholder="Search products, brands, categories..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoFocus
              />

              {searchText && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchText("")}
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}

              <button type="submit">Search</button>
            </form>

            <div className="global-search-results">
              {!searchText.trim() ? (
                <div className="search-empty-message">
                  <Search size={25} />
                  <p>Start typing to search your store.</p>
                  <span>Products · Brands · Categories</span>
                </div>
              ) : searchLoading ? (
                <div className="search-empty-message">
                  <LoaderCircle size={24} className="search-loader" />
                  <p>Searching your store...</p>
                </div>
              ) : searchError ? (
                <div className="search-empty-message">
                  <p>{searchError}</p>
                </div>
              ) : (
                <>
                  {searchResults.products.length > 0 && (
                    <div className="global-search-section">
                      <h4>
                        <Package size={15} />
                        Products
                      </h4>

                      {searchResults.products.map((product) => (
                        <button
                          className="global-search-item"
                          key={product.id}
                          onClick={() => openProductSearch(product)}
                        >
                          <span className="global-search-item-icon">
                            <Package size={17} />
                          </span>

                          <span className="global-search-item-info">
                            <strong>{product.title}</strong>
                            <small>
                              {product.brand || "Product"} ·{" "}
                              {product.category}
                            </small>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchResults.categories.length > 0 && (
                    <div className="global-search-section">
                      <h4>
                        <Tags size={15} />
                        Categories
                      </h4>

                      {searchResults.categories.map((category) => (
                        <button
                          className="global-search-item"
                          key={category}
                          onClick={() => openCategorySearch(category)}
                        >
                          <span className="global-search-item-icon">
                            <Tags size={17} />
                          </span>

                          <span className="global-search-item-info">
                            <strong>{category}</strong>
                            <small>View category collection</small>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchResults.products.length === 0 &&
                    searchResults.categories.length === 0 && (
                      <div className="search-empty-message">
                        <Search size={25} />
                        <p>No results found</p>
                        <span>
                          Try another product or category name.
                        </span>
                      </div>
                    )}

                  <button
                    type="button"
                    className="global-search-view-all"
                    onClick={handleSearch}
                  >
                    View all search results
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* NOTIFICATION POPUP */}
        {notificationOpen && (
          <div className="navbar-popup notification-popup">
            <div className="popup-heading">
              <strong>Notifications</strong>

              <button
                onClick={() => setNotificationOpen(false)}
                aria-label="Close notifications"
              >
                <X size={17} />
              </button>
            </div>

            <div className="notification-item">
              <span className="notification-icon">
                <Check size={17} />
              </span>

              <div>
                <strong>Dashboard Ready</strong>
                <p>Your store dashboard is up to date.</p>
              </div>
            </div>

            <div className="notification-item">
              <span className="notification-icon">
                <Bell size={17} />
              </span>

              <div>
                <strong>Welcome Admin!</strong>
                <p>Welcome to your admin dashboard.</p>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE POPUP */}
        {profileOpen && (
          <div className="navbar-popup profile-popup">
            <div className="profile-popup-header">
              <div className="profile-avatar">RR</div>

              <div>
                <strong>Admin User</strong>
                <p>Administrator</p>
              </div>
            </div>

            <button
              className="profile-menu-item"
              onClick={() => {
                navigate("/profile");
                setProfileOpen(false);
              }}
            >
              <User size={17} />
              My Profile
            </button>

            <button
              className="profile-menu-item"
              onClick={() => {
                navigate("/settings");
                setProfileOpen(false);
              }}
            >
              <Settings size={17} />
              Settings
            </button>

            <button
              className="profile-menu-item logout-item"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
