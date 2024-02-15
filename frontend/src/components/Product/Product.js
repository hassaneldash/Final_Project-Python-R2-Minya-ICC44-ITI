import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import {formatPrice} from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../store/actions/ToggleFav';
import "./Product.css";

const Product = ({product}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isMovieInFavorites = () => {
    return favorites.some((favMovie) => favMovie.id === product?.id);
  };

  const handleToggleFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMovieInFavorites()) {
      dispatch(removeFromFavorites(product?.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  

  return (
    <Link to = {`/product/${product?.id}`} key = {product?.id}>
      <div className='product-item bg-white'>
        <div className='category'>{product?.category}</div>
        <button
          className="star-button standard__badge badge "
          onClick={handleToggleFavorites}
        >
          {isMovieInFavorites() ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/754px-Star_full.svg.png"
              alt="Filled Star"
              height={24}
            />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/2048px-Empty_Star.svg.png"
              alt="Empty Star"
              height={24}
            />
          )}
        </button>

        <div className='product-item-img img-fluid'>
          <img className='img-cover img-fluid' src = {product?.images[0]} alt = {product.title} />
        </div>
        <div className='product-item-info fs-14'>
          <div className='title py-2' style={{height : '60px'}}>
            {product?.title}
          </div>
          <div className='brand' style={{height : '40px'}} >
            <span>Brand: </span>
            <span className='fw-7'>{product?.brand}</span>
          </div>
          <div className='price flex align-center justify-center'>
            <span className='old-price'>
              {formatPrice(product?.price)}
            </span>
            <span className='new-price'>
              {formatPrice(product?.discountedPrice)}
            </span>
            <span className='discount fw-6'>
              ({product?.discountedPercentage}% Off)
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product