import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/fav/favoritesActions';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products per page
  const history = useHistory();
  const dispatch = useDispatch(); // Use useDispatch to get dispatch function
  const favorites = useSelector(state => state.favorites);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        const updatedProducts = response.data.products.map(product => ({
          ...product,
          favorited: favorites.some(favorite => favorite.id === product.id)
        }));
        setProducts(updatedProducts);
      })
      .catch(error => console.error(error));
  }, [favorites]);

  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

  const handleProductClick = productId => {
    history.push(`/product/${productId}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset current page when category changes
  };

  const handleToggleFavorite = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, favorited: !product.favorited }
          : product
      )
    );

    if (favorites.some(item => item.id === productId)) {
      dispatch(removeFromFavorites(productId));
    } else {
      const productToAdd = products.find(product => product.id === productId);
      dispatch(addToFavorites(productToAdd));
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    .filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || product.category.toLowerCase() === selectedCategory.toLowerCase())
    )
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container shadow p-3 mb-5 bg-body rounded">
      <h1 className='heads mb-4 text-center'>The Products</h1>
      <div className="d-flex justify-content-between mb-3" style={{ maxWidth: '1200px' }}>
        <form onSubmit={(event) => event.preventDefault()} className="mr-auto" style={{ width: '45%' }}>
          <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search by name..." className="form-control" />
        </form>
        <div className="ml-auto" style={{ width: '45%' }}>
          <select value={selectedCategory} onChange={handleCategoryChange} className="form-select w-100">
            <option value="">All Categories</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {currentProducts.map(product => (
          <div className="col" key={product.id}>
            <div className="card mb-4 h-100 d-flex align-items-center justify-content-center shadow" onClick={() => handleProductClick(product.id)}>
              <img src={product.images[0]} alt={product.title} className="card-img-top" style={{ height: '200px' }} />
              <div className="card-body text-center">
                <h5 className="card-title text-saddleBrown fw-bold">{product.title}</h5>
                <p className="card-text text-dark">
                  <span className="fw-bold">Price:</span> ${product.price}<br />
                  {/* <span className="fw-bold">Rating:</span> {product.rating}<br /> */}
                </p>
                <button
                  className={`btn btn-${product.favorited ? 'danger' : 'dark'}`} // Change button color based on favorited state
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(product.id);
                  }}
                >
                  {product.favorited ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <ul className="pagination justify-content-center">
        {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
