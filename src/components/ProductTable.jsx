
import { useState, useEffect } from "react";
import {
  Package,
  Boxes,
  ImageOff,
  Eye,
  X,
  Star,
  Tag,
  Warehouse,
  ShoppingBag,
  BadgePercent,
  ShieldCheck,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function ProductTable({ products = [] }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const getStockStatus = (stock) => {
    if (stock === 0)
      return { label: "Out of Stock", className: "status-out" };

    if (stock < 10)
      return { label: "Low Stock", className: "status-low" };

    return { label: "In Stock", className: "status-active" };
  };

  const formatPrice = (price) =>
    `$${Number(price || 0).toFixed(2)}`;

  const openProduct = (product) => {
    setSelectedProduct(product);
    setActiveImage(0);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setActiveImage(0);
  };

  const images = selectedProduct
    ? selectedProduct.images?.length
      ? selectedProduct.images
      : selectedProduct.thumbnail
        ? [selectedProduct.thumbnail]
        : []
    : [];

  useEffect(() => {
    if (!selectedProduct) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") closeProduct();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedProduct]);

  const originalPrice = selectedProduct
    ? selectedProduct.price /
      (1 - (selectedProduct.discountPercentage || 0) / 100)
    : 0;

  return (
    <>
      <div className="product-table-card">
        <div className="table-heading">
          <div>
            <h3>Recent Products</h3>
            <p>Monitor your latest store inventory</p>
          </div>

          <span className="product-count">
            <Package size={15} />
            {products.length} Products
          </span>
        </div>

        <div className="table-responsive">
          <table className="table product-table align-middle">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                products.map((product) => {
                  const status = getStockStatus(product.stock);

                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="product-info">
                          {product.thumbnail ? (
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              loading="lazy"
                            />
                          ) : (
                            <div className="product-image-fallback">
                              <ImageOff size={20} />
                            </div>
                          )}

                          <div className="product-details">
                            <strong>{product.title}</strong>
                            <small>Product ID: #{product.id}</small>

                            <button
                              type="button"
                              className="view-product-btn"
                              onClick={() => openProduct(product)}
                            >
                              <Eye size={13} />
                              View Details
                            </button>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="category-badge">
                          {product.category}
                        </span>
                      </td>

                      <td className="product-price">
                        {formatPrice(product.price)}
                      </td>

                      <td>
                        <div className="stock-quantity">
                          <Boxes size={15} />
                          <span>{product.stock}</span>
                        </div>
                      </td>

                      <td>
                        <span className={`stock-status ${status.className}`}>
                          <span className="status-dot"></span>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="empty-table">
                    <Package size={30} />
                    <strong>No products found</strong>
                    <p>Products will appear here when available.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          Showing {products.length} products
        </div>
      </div>

      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={closeProduct}
        >
          <div
            className="product-details-modal premium-product-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            <div className="product-modal-header">
              <div>
                <span className="modal-eyebrow">
                  PRODUCT INFORMATION
                </span>
                <h2 id="product-modal-title">
                  Product Details
                </h2>
              </div>

              <button
                className="modal-close-btn"
                onClick={closeProduct}
                aria-label="Close"
              >
                <X size={21} />
              </button>
            </div>

            <div className="premium-modal-body">
              {/* Image Gallery */}
              <div className="premium-gallery">
                <div className="premium-main-image">
                  {images.length > 0 ? (
                    <img
                      src={images[activeImage]}
                      alt={selectedProduct.title}
                    />
                  ) : (
                    <ImageOff size={45} />
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        className="gallery-arrow gallery-prev"
                        onClick={() =>
                          setActiveImage(
                            (activeImage - 1 + images.length) %
                              images.length
                          )
                        }
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        className="gallery-arrow gallery-next"
                        onClick={() =>
                          setActiveImage(
                            (activeImage + 1) % images.length
                          )
                        }
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="premium-thumbnails">
                    {images.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        className={
                          activeImage === index ? "active" : ""
                        }
                        onClick={() => setActiveImage(index)}
                        aria-label={`View image ${index + 1}`}
                      >
                        <img src={image} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Information */}
              <div className="premium-product-info">
                <div className="premium-product-tags">
                  <span className="modal-category">
                    {selectedProduct.category}
                  </span>

                  <span
                    className={`stock-status ${
                      getStockStatus(selectedProduct.stock).className
                    }`}
                  >
                    <span className="status-dot"></span>
                    {getStockStatus(selectedProduct.stock).label}
                  </span>
                </div>

                <h3>{selectedProduct.title}</h3>

                <div className="premium-rating">
                  <Star size={17} fill="#f59e0b" color="#f59e0b" />
                  <strong>
                    {selectedProduct.rating || "N/A"}
                  </strong>
                  <span> / 5 Customer Rating</span>
                </div>

                <p className="modal-description">
                  {selectedProduct.description ||
                    "No description available."}
                </p>

                {/* Price */}
                <div className="premium-price-card">
                  <div>
                    <span>Current Price</span>
                    <strong className="premium-current-price">
                      {formatPrice(selectedProduct.price)}
                    </strong>

                    {selectedProduct.discountPercentage > 0 && (
                      <del>
                        {formatPrice(originalPrice)}
                      </del>
                    )}
                  </div>

                  {selectedProduct.discountPercentage > 0 && (
                    <span className="premium-discount">
                      <BadgePercent size={19} />
                      {Number(
                        selectedProduct.discountPercentage
                      ).toFixed(1)}% OFF
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="premium-detail-grid">
                  <div className="premium-detail-item">
                    <ShoppingBag size={19} />
                    <div>
                      <span>Brand</span>
                      <strong>
                        {selectedProduct.brand || "N/A"}
                      </strong>
                    </div>
                  </div>

                  <div className="premium-detail-item">
                    <Tag size={19} />
                    <div>
                      <span>Category</span>
                      <strong>{selectedProduct.category}</strong>
                    </div>
                  </div>

                  <div className="premium-detail-item">
                    <Warehouse size={19} />
                    <div>
                      <span>Available Stock</span>
                      <strong>
                        {selectedProduct.stock} Units
                      </strong>
                    </div>
                  </div>

                  <div className="premium-detail-item">
                    <Package size={19} />
                    <div>
                      <span>Product ID</span>
                      <strong>#{selectedProduct.id}</strong>
                    </div>
                  </div>

                  <div className="premium-detail-item">
                    <ShieldCheck size={19} />
                    <div>
                      <span>Warranty</span>
                      <strong>
                        {selectedProduct.warrantyInformation || "N/A"}
                      </strong>
                    </div>
                  </div>

                  <div className="premium-detail-item">
                    <Truck size={19} />
                    <div>
                      <span>Shipping</span>
                      <strong>
                        {selectedProduct.shippingInformation || "N/A"}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="premium-stock-note">
                  <Boxes size={17} />
                  <span>
                    {selectedProduct.stock > 0
                      ? `${selectedProduct.stock} units currently available`
                      : "This product is currently unavailable"}
                  </span>
                </div>
              </div>
            </div>

            <div className="product-modal-footer">
              <button
                className="modal-done-btn"
                onClick={closeProduct}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductTable;
