import React from "react";
import { useSelector } from "react-redux";
import { getFavorites } from "../../store/actions/ToggleFav";
import Product from "../../components/Product/Product";
import Loader from "../../components/Loader/Loader";
import "./Wishlist.css";

const WishlistPage = () => {
  const favorites = useSelector(getFavorites);

  return (
    <main>
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <div className="title-md">
                <h3 style={{ color: "white" }}>Wishlist</h3>
              </div>
              {favorites.length > 0 ? (
                <div className="product-list">
                  {favorites.map((product) => (
                    <Product className="product-item" key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p>Your wishlist is empty.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WishlistPage;
