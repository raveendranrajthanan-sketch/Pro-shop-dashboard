
import { useEffect, useState } from "react";
import {
  Package,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Download,
  Boxes,
  AlertTriangle,
  Filter,
} from "lucide-react";

import { getProducts, getCategories } from "../services/api";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/Categoryfilter";
import ProductTable from "../components/ProductTable";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStock, setSelectedStock] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const [productData, categoryData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      setProducts(productData.products || []);
      setCategories(categoryData || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Products API Error:", err);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Stock Summary
  const inStockCount = products.filter(
    (product) => product.stock >= 10
  ).length;

  const lowStockCount = products.filter(
    (product) => product.stock > 0 && product.stock < 10
  ).length;

  const outOfStockCount = products.filter(
    (product) => product.stock === 0
  ).length;

  // Search, Category and Stock Filter
  const filteredProducts = products.filter((product) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      String(product.id).includes(search) ||
      (product.title || "").toLowerCase().includes(search) ||
      (product.brand || "").toLowerCase().includes(search) ||
      (product.category || "").toLowerCase().includes(search) ||
      (product.description || "").toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const matchesStock =
      selectedStock === "all" ||
      (selectedStock === "in-stock" && product.stock >= 10) ||
      (selectedStock === "low-stock" &&
        product.stock > 0 &&
        product.stock < 10) ||
      (selectedStock === "out-of-stock" && product.stock === 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Product Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-az":
        return a.title.localeCompare(b.title);
      case "name-za":
        return b.title.localeCompare(a.title);
      case "stock-low":
        return a.stock - b.stock;
      default:
        return 0;
    }
  });

  // Export CSV
  const exportProducts = () => {
    if (sortedProducts.length === 0) {
      alert("No products available to export.");
      return;
    }

    const headers = [
      "Product ID",
      "Product Name",
      "Category",
      "Brand",
      "Price",
      "Stock",
      "Stock Status",
      "Rating",
      "Discount Percentage",
      "Description",
    ];

    const escapeCSV = (value) => {
      const text = String(value ?? "");
      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = sortedProducts.map((product) => {
      const stockStatus =
        product.stock === 0
          ? "Out of Stock"
          : product.stock < 10
            ? "Low Stock"
            : "In Stock";

      return [
        product.id,
        product.title,
        product.category,
        product.brand || "N/A",
        product.price,
        product.stock,
        stockStatus,
        product.rating || 0,
        product.discountPercentage || 0,
        product.description || "",
      ];
    });

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\r\n");

    const blob = new Blob(
      ["\uFEFF" + csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "pro-shop-products.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // Pagination
  const totalPages = Math.ceil(
    sortedProducts.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = sortedProducts.slice(
    startIndex,
    endIndex
  );

  const startPage = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - 4)
  );

  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => startPage + index
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStock("all");
    setSortOption("default");
    setCurrentPage(1);
  };

  return (
    <div className="products-page">
      <div className="page-heading">
        <div>
          <h2>Product Management</h2>
          <p>Manage and monitor all your store products.</p>
        </div>

        <div className="products-header-actions">
          <button
            className="export-button"
            onClick={exportProducts}
            disabled={loading || sortedProducts.length === 0}
          >
            <Download size={16} />
            Export CSV
          </button>

          <button
            className="refresh-button"
            onClick={fetchProducts}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stock Summary */}
      <div className="stock-summary-grid">
        <div className="stock-summary-card">
          <div className="stock-summary-icon stock-icon-total">
            <Package size={21} />
          </div>
          <div>
            <span>Total Products</span>
            <h3>{products.length}</h3>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon stock-icon-in">
            <Boxes size={21} />
          </div>
          <div>
            <span>In Stock</span>
            <h3>{inStockCount}</h3>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon stock-icon-low">
            <AlertTriangle size={21} />
          </div>
          <div>
            <span>Low Stock</span>
            <h3>{lowStockCount}</h3>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon stock-icon-out">
            <Package size={21} />
          </div>
          <div>
            <span>Out of Stock</span>
            <h3>{outOfStockCount}</h3>
          </div>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="products-toolbar">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Stock Filter and Sorting */}
      <div className="products-filter-row">
        <div className="stock-filter">
          <Filter size={17} />

          <label htmlFor="stockFilter">Stock Status:</label>

          <select
            id="stockFilter"
            value={selectedStock}
            onChange={(e) => {
              setSelectedStock(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Stock</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        <div className="products-sorting">
          <div className="sorting-label">
            <ArrowUpDown size={18} />
            <span>Sort Products:</span>
          </div>

          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Sort products"
          >
            <option value="default">Default Order</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-az">Name: A to Z</option>
            <option value="name-za">Name: Z to A</option>
            <option value="stock-low">Stock: Low to High</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading products...</div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchProducts}>Try Again</button>
        </div>
      ) : (
        <>
          <div className="search-results-heading">
            <div>
              <h3>Product Results</h3>
              <p>
                Found <strong>{sortedProducts.length}</strong> products
                {searchTerm && (
                  <> for "<strong>{searchTerm}</strong>"</>
                )}
              </p>
            </div>

            {(searchTerm ||
              selectedCategory !== "all" ||
              selectedStock !== "all" ||
              sortOption !== "default") && (
              <button
                className="clear-results-btn"
                onClick={resetFilters}
              >
                Clear Filters
              </button>
            )}
          </div>

          {sortedProducts.length > 0 ? (
            <ProductTable products={currentProducts} />
          ) : (
            <div className="no-results-card">
              <div className="no-results-icon">
                <Package size={35} />
              </div>

              <h3>No Products Found</h3>
              <p>
                No products match the selected filters.
                Try changing your search or stock status.
              </p>

              <button onClick={resetFilters}>
                <RefreshCw size={15} />
                Reset Filters
              </button>
            </div>
          )}

          {sortedProducts.length > 0 && (
            <div className="products-pagination">
              <div className="pagination-left">
                <div className="pagination-info">
                  Showing <strong>{startIndex + 1}</strong>
                  {" - "}
                  <strong>
                    {Math.min(endIndex, sortedProducts.length)}
                  </strong>
                  {" of "}
                  <strong>{sortedProducts.length}</strong> products
                </div>

                <div className="items-per-page">
                  <label htmlFor="itemsPerPage">Show:</label>

                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>

                  <span>per page</span>
                </div>
              </div>

              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={17} />
                  Previous
                </button>

                {visiblePages.map((page) => (
                  <button
                    key={page}
                    className={`pagination-number ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage === totalPages ||
                    totalPages === 0
                  }
                >
                  Next
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
