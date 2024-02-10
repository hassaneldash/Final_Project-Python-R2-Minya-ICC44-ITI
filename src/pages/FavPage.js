import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/fav/favoritesActions';

const FavPage = () => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="shadow p-3 mb-5 bg-body rounded">
            {favorites.length === 0 ? (
              <p className="text-center">Your favorites list is empty.</p>
            ) : (
              <div>
                {favorites.map(item => (
                  <div key={item.id} className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={item.images[0]} alt={item.title} className="img-fluid" />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">Price: ${item.price}</p>
                          <p className="card-text">Category: {item.category}</p>
                          <button className="btn btn-danger" onClick={() => handleRemoveFromFavorites(item.id)}>
                            Remove from Favorites
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavPage;
