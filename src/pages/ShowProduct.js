import React, { useEffect, useState } from "react";
import axios from "axios";
import "./productStyle.css";

const BASE_URL = "http://127.0.0.1:8000/products/";

function ShowProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center text-dark">Product Details</h1>
      {products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} className="cards container">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <div className="cards-body">
              <h5 className="cards-title">{product.title}</h5>
              <p className="cards-text">{product.description}</p>
              <p className="cards-text">Price: ${product.price}</p>
              <p className="cards-text">
                Discount Percentage: {product.discountPercentage}%
              </p>
              <p className="cards-text">Brand: {product.brand}</p>
              <p className="cards-text">Category: {product.category}</p>
              <div className="thumbnail-container">
                {product.images &&
                  product.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Thumbnail ${imgIndex}`}
                      className="thumbnail"
                    />
                  ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ShowProduct;
