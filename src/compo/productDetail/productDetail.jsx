import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./productDetail.css";
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <img src={product.images[0]} alt={product.title} />
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          <p className="category">Category: {product.category.name}</p>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
