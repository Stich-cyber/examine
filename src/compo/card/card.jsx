import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";

function Card() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=30")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      <div className="product-grid">
        {data.map((product) => (
          <div
            className="product-card fade-in"
            key={product.id}
            onClick={() => handleProductClick(product.id)}
          >
            <div className="product-badge">NEW</div>
            <img
              className="product-image"
              src={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "/placeholder.jpg"
              }
              alt={product.title || "Product"}
              onError={(e) => {
                e.target.src = "/placeholder.jpg";
              }}
            />
            <h3 className="product-title">
              {product.title || "Untitled Product"}
            </h3>
            <p className="product-description">
              {product.description || "No description available"}
            </p>
            <div className="product-price">${product.price || "0.00"}</div>
            {product.discountPercentage && (
              <div className="product-discount">
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
